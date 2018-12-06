<template>
  <div>
    <el-form :inline="true" ref="form">
      <el-form-item label="工厂">
        <el-input v-model="form.factory" placeholder="请输入工厂" class="input-item195" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
        <el-button type="primary" @click="btnAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border="">
      <el-table-column label="编号" prop="code" width="150px"></el-table-column>
      <el-table-column label="父编号" prop="parentCode" width="150px"></el-table-column>
      <el-table-column label="公司" prop="company"></el-table-column>
      <el-table-column label="工厂" prop="factory"></el-table-column>
      <el-table-column label="车间" prop="workshop" width="110px"></el-table-column>
      <el-table-column label="名称" prop="name" width="210px"></el-table-column>
      <el-table-column label="版本" prop="pcVersion"></el-table-column>
      <el-table-column label="产品类型" prop="producttype"></el-table-column>
      <el-table-column label="更新时间" prop="gmtModified" width="155px">
        <template slot-scope="scope">{{scope.row.gmtModified | timeFormat('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="btnDetail(scope.row)" class="inner-button">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-user ref="refDialogUser" @confirmSuccess="getData"></dialog-user>
    <dialog-detail ref="refDialogDetail"></dialog-detail>
  </div>
</template>

<script>
import {userType} from '../../options'
import * as api from '../../../api/index'
export default {
  components: {
    'dialog-user': require('./dialog-line').default,
    'dialog-detail': require('./dialog-detail').default
  },
  data () {
    return {
      form: {
        factory: ''
      },
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      loading: { search: false },
      option: { userType: [] },
      tableData: []
    }
  },
  mounted () {
    this.option.userType = userType
    this.getData()
  },
  methods: {
    btnDetail (data) {
      this.$refs.refDialogDetail.show(data)
    },
    getData () {
      this.loading.search = true
      let param = {
        ...this.form,
        pageIndex: this.page.current,
        pageCount: this.page.size
      }
      api.defect.getLine(param).then(response => {
        let data = response.data
        console.log(data)
        if (data.meta.code === 100000) {
          this.tableData = data.data
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.search = false
      })
    },
    btnAdd () {
      this.$refs.refDialogUser.show()
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

</style>
