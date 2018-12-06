<template>
  <div>
    <el-form :inline="true" ref="form">
      <el-form-item label="用户名">
        <el-input v-model="form.userName" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="form.userType" placeholder="请选择用户类型" clearable>
          <el-option v-for="type in option.userType" :key="type.value" :label="type.name"
                     :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData" icon="el-icon-search">查找</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border="">
      <el-table-column label="用户名" prop="userName"></el-table-column>
      <el-table-column label="类型" prop="typeName"></el-table-column>
      <el-table-column fixed="right" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" class="inner-button" @click="btnEdit(scope.row)">编辑</el-button>
          <el-button type="text" class="inner-button" @click="btnDelete(scope.row)">删除</el-button>
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
    <dialog-user ref="refDialogUser" @confirmSuccess="getData"></dialog-user>
  </div>
</template>

<script>
import {userType} from '../../options'
import * as api from '../../../api/index'
export default {
  components: {
    'dialog-user': require('./dialog-user').default
  },
  data () {
    return {
      form: {
        userName: '',
        userType: ''
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
    btnEdit (data) {
      this.$refs.refDialogUser.show(data)
    },
    btnDelete (data) {
      this.$confirm('删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            api.defect.deleteSysUser({id: data.id}).then(response => {
              this.$message({type: 'error', message: response.data.meta.message})
              this.getData()
            }).finally(() => {
              instance.confirmButtonLoading = false
              done()
            })
          } else {
            done()
          }
        }
      })
    },
    getData () {
      this.loading.search = true
      let param = {
        ...this.form,
        pageIndex: this.page.current,
        pageCount: this.page.size
      }
      api.defect.getSysUserList(param).then(response => {
        let data = response.data
        console.log(data)
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
