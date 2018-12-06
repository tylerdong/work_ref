<template>
  <div>
    <el-form :inline="true" class="div-form-container" label-width="100px">
      <el-form-item label="按时间段查询">
        <el-date-picker v-model="search.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
        至
        <el-date-picker v-model="search.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="批次" label-width="45px">
        <com-batch-select ref="comBatch" @batchSelected="batchSelected"></com-batch-select>
      </el-form-item>
      <el-form-item label="缺陷类型">
        <com-defect-desc-desc ref="comDefectDesc" @defectTypeSelected="defectTypeSelected"></com-defect-desc-desc>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData" :loading="loading.search">查询</el-button>
        <el-button type="primary" icon="el-icon-download" @click="btnDownload" :loading="loading.download">导出
        </el-button>
      </el-form-item>
    </el-form>
    <div class="div-content-container div-loading" id="divLoading" v-loading="loading.table" element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)" :style="{height: loadingHeight}">
      <div class="flxbox">
        <div>
          <el-table :data="tableData" border highlight-current-row @row-click="handleCurrentRow" @sort-change="sortChange">
            <el-table-column label="缺陷号" prop="defectNum" sortable="custom" width="87"></el-table-column>
            <el-table-column label="纱盘号" prop="rfid" sortable="custom" width="87"></el-table-column>
            <el-table-column label="处理状态" sortable="custom" width="101">
              <template slot-scope="scope">{{scope.row.isgood | isgoodStatus}}</template>
            </el-table-column>
            <el-table-column label="缺陷描述" prop="defectDescribe" sortable="custom" width="120"></el-table-column>
            <el-table-column label="采样时间" prop="samplingTime" sortable="custom" width="180"></el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :pager-count="page.pagerCount"
                         :current-page.sync="page.current"
                         :page-sizes="page.sizes"
                         :page-size="page.size"
                         :total="page.total"
                         layout="total, sizes, prev, pager, next, jumper"
                         small
                         class="pagenation">
          </el-pagination>
        </div>
        <div class="content-box">
          <table>
            <tr>
              <td>{{currentRow.samplingTime | timeFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>降等等级：{{currentRow.defectGrade}}</td>
              <td>纱盘号：{{currentRow.rfid}}</td>
            </tr>
            <tr><td colspan="3">物料号：{{currentRow.matName}}</td></tr>
            <tr>
              <td colspan="3">人工复判：
                {{currentRow.isgood === '0' ? '' : (currentRow.manualStatusName === 'wujian' ? '误检':
                currentRow.manualStatusName)}}
              </td>
            </tr>
            <tr v-if="currentRow.silkCode">
              <td colspan="3">丝锭条码：<svg ref="barCode" class="barcode"></svg>[{{currentRow.silkCode}}]</td>
            </tr>
            <tr>
              <td colspan="3">缺陷描述：{{currentRow.defectDescribe}}</td>
            </tr>
            <tr>
              <td colspan="3" class="image-td">
                <PPreview v-if="imageData" :pictureList="imageData"></PPreview>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="liangpin" v-if="currentRow && currentRow.updatable === '1'">
        <el-button v-if="['AAA'].includes(currentRow.grade)"
                   :type="(currentRow.manualStatusName === 'AA')  ? 'success' : ''"
                   @click="btnConfirm('AA')" :loading="loading.AA">AA
        </el-button>

        <el-button v-if="['AAA', 'AA'].includes(currentRow.grade)"
                   :type="(currentRow.manualStatusName === 'A') ? 'success' : ''"
                   @click="btnConfirm('A')" :loading="loading.A">A
        </el-button>

        <el-button v-if="['AAA', 'AA', 'A'].includes(currentRow.grade)"
                   :type="(currentRow.manualStatusName === 'B') ? 'success' : ''"
                   @click="btnConfirm('B')" :loading="loading.B">B
        </el-button>

        <el-button @click="btnConfirm('C')" :type="(currentRow.manualStatusName === 'C') ? 'success' : ''"
                   :loading="loading.C">C
        </el-button>

        <el-button :type="(currentRow.manualStatusName === 'wujian') ? 'success' : ''" @click="btnSetDefect">
          {{defectText}}
        </el-button>
      </div>
    </div>
    <dialog-defect ref="refDialogDefect" @dialogClose="changeDefectTitle"></dialog-defect>
  </div>
</template>

<script>
import axios from 'axios'
import dateFns from 'date-fns'
import PPreview from 'vue-simple-picture-preview'
import {defectChart} from '../../options'
import jsBarcode from 'jsbarcode'
export default {
  components: {
    'dialog-defect': require('./dialog-defect').default,
    'com-batch-select': require('./../../common/com-batch-select').default,
    'com-defect-desc-desc': require('../../common/com-defect-desc-select').default,
    PPreview: PPreview
  },
  data () {
    return {
      search: {
        startTime: '',
        endTime: '',
        batch: '',
        description: [],
        order: '',
        lineCode: ''
      },
      loadingHeight: '',
      defectText: '误检',
      defectChart: defectChart,
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      tableData: [],
      imageData: [],
      currentRow: {},
      loading: { search: false, AAA: false, AA: false, A: false, B: false, C: false, falseDetection: false, download: false, table: false }
    }
  },
  computed: {},
  watch: {
    '$route':
      {
        immediate: true,
        handler: function (to, from) {
          if (to && to.name && to.name === 'inner-search-detail') {
            this.search.startTime = this.$route.params.startTime
            this.search.endTime = this.$route.params.endTime
            this.search.batch = this.$route.params.batch
            this.search.lineCode = this.$route.params.lineCode
            this.$nextTick(() => {
              this.$refs.comBatch.initValue(this.$route.params.batch)
            })
            this.getData()
          }
        }
      }
  },
  mounted () {
    this.loadingHeight = (window.screen.availHeight - document.querySelector('#divLoading').offsetTop - 200) + 'px'
  },
  methods: {
    batchSelected (val) {
      this.search.batch = val
    },
    defectTypeSelected (val) {
      this.search.description = val
    },
    tableRowClassName ({row, index}) {
      if (index === 0) {
        return 'select-current-row'
      }
    },
    getData () {
      let param = {
        pageIndex: this.page.current,
        pageCount: this.page.size,
        batch: this.search.batch,
        defectType: this.search.description.length > 0 ? this.search.description.join(',') : '',
        startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
        endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : '',
        order: this.search.order
      }
      this.imageData = []
      this.currentRow = {}
      this.loading.search = true
      axios.post(`${this.currentLine().ip}controller/defectInfo/getDefectInfoList`, param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.tableData = data.data.list
          this.page.total = data.data.count
          this.page.current = data.data.pageIndex
          if (data.data.list.length > 0) {
            this.handleCurrentRow(data.data.list[0])
          }
        } else {
          console.log(data.meta.message)
        }
      }).finally(() => {
        this.loading.search = false
      })
    },
    sortChange (col, prop, order) {
      if (col.prop) {
        this.search.order = this.defectChart[`${col.prop}`] + ' ' + ((col.order === 'descending') ? 'desc' : 'asc')
      }
      this.getData()
    },
    showBarCode (data) {
      if (data.silkCode) {
        this.$nextTick(() => {
          jsBarcode(this.$refs.barCode, data.silkCode, {height: 20, displayValue: false})
        })
      }
    },
    handleCurrentRow (rowData) {
      this.currentRow = rowData
      this.loading.table = true
      this.imageData = []
      this.getImages(rowData.defectNum).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          let imgLength = data.data
          if (imgLength > 0) {
            let promises = []
            Array(data.data).fill(0).forEach((value, index) => {
              promises.push(this.getImage(index, rowData.defectNum))
            })
            Promise.all(promises).then(response => {
              for (let i = 0; i < imgLength; i++) {
                if (response[i].status === 200 && response[i].data.length > 0) {
                  this.imageData.push(`data:image/jpg;base64,${response[i].data}`)
                } else {
                  this.$message({type: 'error', message: response[i].data.meta.message, showClose: true})
                }
              }
            }).finally(() => {
              this.loading.table = false
            })
          } else {
            this.loading.table = false
          }
        } else {
          this.$message({type: 'error', message: response.data.meta.message, showClose: true})
        }
      })
      this.showBarCode(rowData)
    },
    getImages (defectNum) {
      return axios.post(`${this.currentLine().ip}controller/defectInfo/getImgByDefectId`, {defectId: defectNum, sign: ''})
    },
    getImage (imgIndex, defectNum) {
      return axios.post(`${this.currentLine().ip}controller/defectInfo/getImgByDefectIdAndIndex`, {imgIndex: imgIndex, defectId: defectNum, sign: ''})
    },
    btnSetDefect () {
      this.$refs.refDialogDefect.show({defectNum: this.currentRow.defectNum})
    },
    currentLine () {
      let line = this.plConfigs().find(item => item.linecode === this.search.lineCode)
      if (line === undefined) {
        return this.$message({type: 'error', message: `线别编码${this.search.lineCode}不存在`, showClose: true})
      } else {
        return line
      }
    },
    btnConfirm (grade) {
      if (grade) {
        this.loading[`${grade}`] = true
      } else {
        this.loading.falseDetection = true
      }
      let param = {
        defectNum: this.currentRow.defectNum,
        isgood: grade ? '2' : '1',
        actualGrade: grade !== '' ? grade : this.currentRow.grade
      }
      axios.post(`${this.currentLine().ip}controller/defectInfo/updateDefect`, param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.$message({type: 'success', message: response.data.meta.message})
          this.currentRow = data.data
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].defectNum === data.data.defectNum) {
              this.tableData.splice(i, 1, data.data)
              break
            }
          }
        } else {
          console.log(data.meta.message)
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        if (grade) {
          this.loading[`${grade}`] = false
        } else {
          this.loading.falseDetection = false
        }
      })
    },
    changeDefectTitle (data) {
      this.currentRow = data
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].defectNum === data.defectNum) {
          this.tableData.splice(i, 1, data)
          break
        }
      }
    },
    btnDownload () {
      let param = {
        batch: this.search.batch,
        startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
        endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : ''
      }
      this.loading.download = true
      axios.post(`${this.currentLine().ip}controller/defectInfo/exportDefectExcel`, param).then(response => {
        let data = response.data
        let blob = new Blob([data], {type: 'application/vnd.ms-excel'})
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        a.href = url
        a.download = '缺陷列表.xls'
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }).finally(() => {
        this.loading.download = false
      })
    },
    handleSizeChange (size) {
      this.page.size = size
      this.getData()
    },
    handleCurrentChange (current) {
      this.page.current = current
      this.getData()
    }
  }
}
</script>

<style scoped>
  .flxbox {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .flxbox > div:first-child {
    width: 55%;
  }
  .flxbox > div:last-child {
    margin-left: 10px;
    width: 45%;
  }
  .content-box table {
    width: 100%;
  }
  .content-box table tr:first-child td{
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed #999a9f;
  }
  .content-box table tr:nth-child(2) td {
    padding-top: 0.5rem;
  }
  .content-box table tr td {
    text-align: left;
    width: 33%;
  }
  .liangpin {
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: auto;
    height: 4rem;
    line-height: 4rem;
    border-radius: 3px;
    padding: 1px 10px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 0 6px rgba(65, 166, 211, .12);
    background-color: rgba(156, 213, 222, 0.42);
    z-index: 1000;
  }
  .image-td {
    width: 100%;
  }
  .container {
    list-style: none;
    margin: 0;
    padding: 0;
    width: auto;
    width: 100%;
  }
  .container li{
    float: left;
    width: 30%;
    margin-bottom: 10px;
  }
  .container li:nth-child(3n + 2) {
    margin: 0 24px;
  }
  .container li img {
    width: 100%;
    height: 100px;
  }
  .barcode {
    vertical-align: middle;
  }
</style>
