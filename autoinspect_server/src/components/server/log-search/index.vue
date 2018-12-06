<template>
  <div>
    <el-form :inline="true" ref="form" :model="search" :rules="rules" label-position="left" class="div-form-container">
      <el-form-item label="线别" prop="lineCode">
        <el-select v-model="search.lineCode" clearable placeholder="请选择线别">
          <el-option v-for="(item, index) in option.lineCode" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="按时间段查询">
        <el-date-picker v-model="search.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
        至
        <el-date-picker v-model="search.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData" :loading="loading.search">查找</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border header-row-class-name="header-style">
      <el-table-column label="文件名" prop="fileName"></el-table-column>
      <el-table-column label="类型" prop="fileType"></el-table-column>
      <el-table-column label="大小" prop="size"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.createDate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="btnDetail(scope.row)" class="inner-button">预览</el-button>
          <el-button type="text" @click="btnDownload(scope.row)" class="inner-button">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  },
  data () {
    return {
      search: {
        startTime: '',
        endTime: '',
        fileName: '',
        lineCode: '',
        order: ''
      },
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      option: { lineCode: [] },
      rules: {
        lineCode: { required: true, message: '请选择线别', trigger: 'blur' }
      },
      tableData: [],
      loading: {search: false}
    }
  },
  methods: {
    btnDetail (data) {
      let param = {lineCode: this.search.lineCode, fileName: data.fileName}
      api.defect.preRead(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          let w = window.open(`${window.global.ajaxDefectUrl}logs/${this.search.lineCode}/${data.data}`)
          console.log(w)
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      })
    },
    getLineCode () {
      api.defect.getLine({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.lineCode = data.data
        } else {
          console.log(data.meta.message)
        }
      })
    },
    btnDownload (data) {
      let param = {
        lineCode: this.search.lineCode,
        fileName: data.fileName
      }
      // api.defect.preRead(param).then(response => {
      //   let data = response.data
      //   if (data.meta.code === 100000) {
      //     fetch(`${window.global.ajaxDefectUrl}logs/${data.data}`).then(res => res.blob().then(bold => {
      //       let a = document.createElement('a')
      //       let url = window.URL.createObjectURL(bold)
      //       let fileName = data.data
      //       a.href = url
      //       a.download = fileName
      //       a.click()
      //       window.URL.revokeObjectURL(url)
      //     }))
      //   }
      // })
      api.defect.downLoadLogFile(param).then(response => {
        let blob = new Blob([response.data], {type: 'octet/stream'})
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        a.href = url
        a.download = param.fileName
        a.click()
        window.URL.revokeObjectURL(url)
      })
    },
    getData () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading.search = true
          let param = {
            pageIndex: this.page.current,
            pageCount: this.page.size,
            lineCode: this.search.lineCode,
            startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
            endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : '',
            fileName: this.search.fileName,
            order: this.search.order
          }
          this.tableData = []
          api.defect.getListByLineCode(param).then(response => {
            let data = response.data
            if (data.meta.code === 100000) {
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
        }
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
  .hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
</style>
