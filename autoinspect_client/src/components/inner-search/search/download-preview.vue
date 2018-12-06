<template>
  <div class="download-view">
    <div class="div-search-container">
      <el-button type="primary" class="margin-bottom-1" @click="handleExport">导出</el-button>
    </div>
    <div class="div-content-container">
      <table ref="tableException" id="tableException" v-if="Array.isArray(tableData) && tableData.length > 1"
             class="customized-table">
        <tr>
          <td>批次</td>
          <td>规格</td>
          <td>只数</td>
          <td v-if="tableData.length > 0" v-for="(defect, key) in tableData[0].defectTypeSum" :key="key">
            {{defect.key}}
          </td>
        </tr>
        <tr v-for="(item, index) in tableData" v-if="index > 0" :key="index">
          <td>{{item.batch}}</td>
          <td>{{item.spec}}</td>
          <td>{{item.amount}}</td>
          <td v-for="(defect, key) in item.defectTypeSum" :key="key">{{defect.value}}</td>
        </tr>
      </table>
      <div v-else class="no-data">暂无数据</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FileServer from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      search: {
        lineCode: '',
        startTime: '',
        endTime: '',
        batch: ''
      },
      tableData: []
    }
  },
  computed: {},
  watch: {
    '$route':
      {
        immediate: true,
        handler: function (to, from) {
          if (to && to.name && to.name === 'inner-search-download-preview') {
            this.search.startTime = this.$route.params.startTime
            this.search.endTime = this.$route.params.endTime
            this.search.batch = this.$route.params.batch
            this.search.lineCode = this.$route.params.lineCode
            this.getData()
          }
        }
      }
  },
  methods: {
    getData () {
      let param = {
        batch: this.search.batch,
        startTime: this.search.startTime,
        endTime: this.search.endTime
      }
      this.tableData = []
      axios.post(`${this.currentLine().ip}controller/defectInfo/getDefectSumByBatch`, param).then(response => {
        let data = response.data
        if (data.meta.code === 100000 && data.data.length > 1) {
          this.tableData = data.data
        } else {
          console.log(data.meta.message)
        }
      })
    },
    currentLine () {
      let line = this.plConfigs().find(item => item.linecode === this.search.lineCode)
      if (line === undefined) {
        return this.$message({type: 'error', message: `线别编码${this.search.lineCode}不存在`, showClose: true})
      } else {
        return line
      }
    },
    /* 报表导出 */
    handleExport () {
      if (this.tableData.length > 0) {
        let vb = XLSX.utils.table_to_book(document.getElementById('tableException'))
        let vbout = XLSX.write(vb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileServer.saveAs(new Blob([vbout], {
            type: 'application/octet-stream'
          }), '纺丝外观质量（降等）日汇总表.xlsx')
        } catch (e) {
          console.log(e, vbout)
        }
      }
    }
  }
}
</script>

<style scoped>
  .download-view {
    width: 100%;
    overflow-x: auto;
  }
  h4, h5 {
    margin: 0 auto;
    letter-spacing: 3px;
  }
</style>
