<template>
  <div>
    <el-form :inline="true" class="div-form-container" label-width="100px">
      <el-form-item label="线别">
        <el-select v-model="search.lineCode" clearable placeholder="请选择线别">
          <el-option v-for="(item, index) in option.lineCode" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="按时间段查询">
        <el-date-picker v-model="search.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
        至
        <el-date-picker v-model="search.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="批次">
        <el-select v-model="search.batchNo" clearable>
          <el-option v-for="(item, index) in option.batch" :key="index" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缺陷类型">
        <el-select v-model="search.defect" multiple clearable placeholder="请选择缺陷类型">
          <el-option v-for="(item, index) in option.defect" :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData" :loading="loading.search">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="div-content-container" id="divLoading" v-loading="loading.table" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.3)" :style="{height: loadingHeight}">
      <div class="flxbox">
        <div>
          <el-table :data="tableData" border highlight-current-row @current-change="handleCurrentRow" @sort-change="sortChange">
            <el-table-column label="线别" prop="lineCode" sortable="custom" width="107"></el-table-column>
            <el-table-column label="批次" prop="batch" sortable="custom" width="87"></el-table-column>
            <el-table-column label="缺陷号" prop="defectid" sortable="custom" width="87"></el-table-column>
            <el-table-column label="纱盘号" prop="trackid" sortable="custom" width="87"></el-table-column>
            <el-table-column label="处理状态" prop="isgood" sortable="custom" width="101">
              <template slot-scope="scope">{{scope.row.isgood | isgoodStatus}}</template>
            </el-table-column>
            <el-table-column label="缺陷描述" prop="description" sortable="custom" width="120"></el-table-column>
            <el-table-column label="采样时间" width="180" sortable="custom">
              <template slot-scope="scope">{{scope.row.ts | timeFormat('YYYY-MM-DD HH:mm:ss')}}</template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="page.current"
                         :page-sizes="page.sizes"
                         :page-size="page.size"
                         :total="page.total"
                         layout="total, sizes, prev, pager, next, jumper"
                         class="pagenation">
          </el-pagination>
        </div>
        <div class="content-box">
          <table>
            <tr>
              <td>{{currentRow.ts | timeFormat('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>降等等级：{{currentRow.grade}}</td>
              <td>流水号：{{currentRow.trackid}}</td>
            </tr>
            <tr>
              <td colspan="3">
                物料号：{{currentRow.matname}}
              </td>
            </tr>
            <tr>
              <td colspan="3">
                缺陷描述：{{currentRow.description}}
              </td>
            </tr>
            <tr>
              <td colspan="3" class="image-td">
                <PPreview v-if="imageData" :pictureList="imageData" :width="170" :height="170"></PPreview>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api/index'
import dateFns from 'date-fns'
import PPreview from 'vue-simple-picture-preview'
export default {
  components: {
    PPreview: PPreview
  },
  data () {
    return {
      search: {
        startTime: '',
        endTime: '',
        lineCode: '',
        batchNo: '',
        defect: [],
        order: ''
      },
      loadingHeight: '',
      option: { lineCode: [], batch: [], defect: [] },
      tableData: [],
      imageData: [],
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      currentRow: {
        ts: '',
        grade: '',
        trackid: '',
        matname: '',
        description: ''
      },
      loading: { search: false, download: false, table: false }
    }
  },
  mounted () {
    this.loadingHeight = (window.screen.availHeight - document.querySelector('#divLoading').offsetTop - 112) + 'px'
    this.getLineCode()
    this.getBatches()
  },
  watch: {
    '$route':
      {
        immediate: true,
        handler: function (to, from) {
          if (to && to.name && to.name === 'search-detail') {
            this.search.startTime = this.$route.params.timestart
            this.search.endTime = this.$route.params.timeend
            this.search.batchNo = this.$route.params.batch
            this.search.lineCode = this.$route.params.lineCode
            this.getAllDefectType(this.$route.params.productName)
            this.getData()
          }
        }
      }
  },
  methods: {
    getLineCode () {
      api.defect.getLine({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.lineCode = data.data
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      })
    },
    getBatches () {
      api.defect.getBatches({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.batch = data.data
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      })
    },
    getAllDefectType (productName) {
      this.option.defect = []
      api.defect.getAllDefectType({productName: productName}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.defect = data.data
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      })
    },
    sortChange ({column, order, prop}) {
      if (prop) {
        this.search.order = prop + ' ' + ((order === 'descending') ? 'desc' : 'asc')
      }
      this.getData()
    },
    getData () {
      let param = {
        pageIndex: this.page.current,
        pageCount: this.page.size,
        lineCode: this.search.lineCode,
        defectType: this.search.defect.length > 0 ? this.search.defect.join(',') : '',
        startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
        endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : '',
        batchNo: this.search.batchNo,
        order: this.search.order
      }
      this.tableData = []
      this.currentRow = {
        ts: '',
        grade: '',
        trackid: '',
        matname: '',
        description: ''
      }
      this.page.total = 0
      api.defect.getDefectList(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          if (data.data.list.length > 0) {
            this.tableData = data.data.list
            this.page.total = data.data.count
            this.page.current = data.data.pageIndex
            this.handleCurrentRow(data.data.list[0])
          }
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      })
    },
    handleCurrentRow (rowData) {
      this.currentRow = rowData
      this.imageData = []
      if (rowData && rowData.id) {
        this.loading.table = true
        this.getImages(rowData.id).then(response => {
          let data = response.data
          if (data.meta.code === 100000) {
            let imgLength = data.data
            if (imgLength > 0) {
              let promises = []
              Array(data.data).fill(0).forEach((value, index) => {
                promises.push(this.getImage(index, rowData.id))
              })
              Promise.all(promises).then(response => {
                for (let i = 0; i < imgLength; i++) {
                  if (response[i].status === 200 && response[i].data.length > 0) {
                    this.imageData.push(`data:image/jpg;base64,${response[i].data}`)
                  } else {
                    this.$message({type: 'error', message: response[i].data.meta.message})
                  }
                }
              }).finally(() => {
                this.loading.table = false
              })
            } else {
              this.loading.table = false
            }
          } else {
            this.$message({type: 'error', message: response.data.meta.message})
          }
        })
      }
    },
    getImages (defectId) {
      return api.defect.getImgByDefectId({defectId: defectId})
    },
    getImage (imgIndex, defectId) {
      return api.defect.getImgByDefectIdAndIndex({imgIndex: imgIndex, defectId: defectId})
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
    width: 60%;
  }
  .flxbox > div:last-child {
    margin-left: 10px;
    width: 40%;
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
</style>
