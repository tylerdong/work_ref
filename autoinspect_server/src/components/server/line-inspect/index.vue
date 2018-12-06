<template>
  <div>
    <el-form :inline="true" label-position="left" class="div-form-container">
      <el-form-item label="数据名称">
        <el-input v-model="search.dataName" clearable placeholder="数据名称"></el-input>
      </el-form-item>
      <el-form-item label="线别">
        <el-select v-model="search.lineCodes" clearable multiple placeholder="请选择线别" class="input-item26">
          <el-option v-for="(item, index) in option.lineCode" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="btnSearch" :loading="loading.search">查找</el-button>
      </el-form-item>
    </el-form>
    <div class="data-async">
      <table class="customized-table" v-if="Array.isArray(tableData) && tableData.length > 0">
        <tr>
          <th style="width: 15%">线别</th>
          <th style="width: 10%">数据名称</th>
          <th>进度</th>
        </tr>
        <template v-for="(data, i) in tableData">
          <tr v-for="(syn, index) in data.synDataInfoBos" :key="i.toString()+index.toString()">
            <td v-if="index === 0" :rowspan="data.synDataInfoBos.length">{{data.lineName}}</td>
            <td>{{syn.dataName}}</td>
            <td class="progress">
              <span>{{syn.earlyMorning}}</span>
              <div>
                <el-progress :percentage="syn.precentage" :status="syn.currentStatus" :text-inside="true" :stroke-width="15" :show-text="true"></el-progress>
              </div>
              <span>{{syn.midnight}}</span>
              <span :style="{left: (syn.precentage - 6) + '%'}">{{syn.synFormatData}}</span>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="page.current"
                   :page-sizes="page.sizes"
                   :page-size="page.size"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="page.total"
                   class="pagenation">
    </el-pagination>
  </div>
</template>

<script>
import * as api from '../../../api/index'
import dateFns from 'date-fns'

export default {
  components: {},
  mounted () {
    this.getLineCode()
    this.btnSearch()
  },
  deactivated () {
    clearInterval(this.timeinter)
  },
  data () {
    return {
      search: {
        dataName: '',
        lineCodes: ''
      },
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      option: {lineCode: [], batch: []},
      tableData: [],
      loading: {search: false},
      timeinter: null
    }
  },
  methods: {
    btnSearch () {
      clearInterval(this.timeinter)
      this.getData()
      this.$nextTick(() => {
        this.timeinter = setInterval(this.getData, 10 * 60 * 60 * 1000)
      })
    },
    getData () {
      this.loading.search = true
      let param = {
        dataName: this.search.dataName,
        lineCodes: Array.isArray(this.search.lineCodes) && this.search.lineCodes.length > 0 ? this.search.lineCodes.join(',') : '',
        pageIndex: this.page.current,
        pageCount: this.page.size
      }
      api.defect.getDataSynStatus(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          data.data.list.forEach(list => {
            list.synDataInfoBos.forEach(syn => {
              let sDate = new Date(syn.synEndDate)
              this.$set(syn, 'currentStatus', dateFns.format(new Date(), 'YYYY-MM-DD') === dateFns.format(sDate, 'YYYY-MM-DD') ? 'success' : 'exception')
              let strDate = dateFns.format(sDate, 'YYYY-MM-DD-HH-mm').split('-')
              let earlyMorning = (new Date(strDate[0], strDate[1], strDate[2], 0, 0, 0)).getTime()
              this.$set(syn, 'earlyMorning', dateFns.format(earlyMorning, 'HH:mm:ss'))
              this.$set(syn, 'midnight', dateFns.format(sDate, '23:59:59'))
              let precentage = ((parseInt(strDate[3]) * 60 * 60 + parseInt(strDate[4]) * 60) / (24 * 60 * 60) * 100).toFixed(2)
              this.$set(syn, 'synFormatData', dateFns.format(syn.synEndDate, 'YYYY-MM-DD HH:mm'))
              this.$set(syn, 'precentage', parseFloat(precentage))
            })
          })
          this.tableData = data.data.list
          this.page.total = data.data.count
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.search = false
      })
    },
    handleSizeChange (size) {
      this.page.size = size
      this.getData()
    },
    handleCurrentChange (current) {
      this.page.current = current
      this.getData()
    },
    getLineCode () {
      api.defect.getLine({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.lineCode = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      })
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    width: 100%;
  }

  table tr td {
    text-align: left;
  }

  table .first-td {
    width: 5%;
  }

  .progress {
    position: relative;
    padding: 10px 3px;
    span {
      font-size: 10px
    }
    span:nth-child(1) {
      position: absolute;
      top: 10px;
    }
    div:nth-child(2) {
      width: 100%;
      padding-top: 15px;
    }
    span:nth-child(3) {
      position: absolute;
      top: 10px;
      right: 0;
    }
    span:nth-child(4) {
      position: absolute;
      top: 10px;
    }
  }
</style>
