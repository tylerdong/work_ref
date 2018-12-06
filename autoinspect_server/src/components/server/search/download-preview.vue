<template>
  <div class="download-view" v-loading="loading.table" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.3)" :style="{height: loadingHeight}" id="divLoading">
    <el-tabs type="border-card" v-if="Object.keys(tableData).length > 0">
      <el-tab-pane v-for="key in Object.keys(tableData)" :key="key" :label="key" class="defect-table">
        <el-button type="text" class="btn-download" @click="handleExport(`${key}`)">下载</el-button>
        <div class=" defect-table">
          <table :ref="`${key}`" :id="`${key}`" class="customized-table">
            <tr>
              <td>线别</td>
              <td>批次</td>
              <td>规格</td>
              <td>只数</td>
              <td v-for="defectKey in Object.keys(tableData[key][0].defectTypeSum)" :key="defectKey">{{defectKey}}</td>
            </tr>
            <tr v-for="(value, index) in tableData[key]" :key="index">
              <td>{{value.lineName}}</td>
              <td>{{value.batch}}</td>
              <td>{{value.spec}}</td>
              <td>{{value.amount}}</td>
              <td v-for="(defect, key) in value.defectTypeSum" :key="key">{{defect}}</td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div v-else class="no-data"></div>
  </div>
</template>

<script>
import * as api from '../../../api/index'
import dateFns from 'date-fns'
import FileServer from 'file-saver'
import XLSX from 'xlsx'

export default {
  data () {
    return {
      search: {
        startTime: '',
        endTime: '',
        batch: '',
        lineCode: ''
      },
      tableData: [],
      loading: {table: false},
      loadingHeight: ''
    }
  },
  watch: {
    '$route':
      {
        immediate: true,
        handler: function (to, from) {
          if (to && to.name && to.name === 'search-download-preview') {
            this.search.startTime = this.$route.params.startTime
            this.search.endTime = this.$route.params.endTime
            this.search.batch = this.$route.params.batch
            this.search.lineCode = this.$route.params.lineCode
            this.getData()
          }
        }
      }
  },
  mounted () {
    this.loadingHeight = (window.screen.availHeight - document.querySelector('#divLoading').offsetTop - 125) + 'px'
  },
  methods: {
    getData () {
      this.loading.table = true
      let param = {
        batch: this.search.batch,
        lineCode: this.search.lineCode,
        startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm') : '',
        endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm') : ''
      }
      this.tableData = []
      api.defect.getDefectSumByBatch(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.tableData = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      }).finally(() => {
        this.loading.table = false
      })
    },
    /* 报表导出 */
    handleExport (key) {
      let vb = XLSX.utils.table_to_book(document.getElementById(`${key}`))
      let vbout = XLSX.write(vb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileServer.saveAs(new Blob([vbout], {
          type: 'application/octet-stream'
        }), `纺丝${key}外观质量（降等）日汇总表.xlsx`)
      } catch (e) {
        console.log(e, vbout)
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

  .btn-download {
    margin: 0;
    padding: 5px 0;
  }

  .defect-table {
    width: 100%;
    overflow-x: auto;
  }
</style>
