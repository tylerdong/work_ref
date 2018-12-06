<template>
  <div>
    <div class="div-form-container">
      <el-form :inline="true">
        <el-form-item label="批次">
          <el-input v-model="search.batch" clearable placeholder="请输入批次"></el-input>
        </el-form-item>
        <el-form-item label="管色">
          <el-select v-model="search.tubeColor" multiple clearable filterable placeholder="请选择管色">
            <el-option v-for="(item, index) in option.tubeColor" :key="index" :label="item.colour" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getData" :loading="loading.search">查找</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="btnEdit(null)" :loading="loading.search">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="div-content-container">
      <el-table :data="tableData" border @sort-change="sortChange" :loading="loading.table">
        <el-table-column label="序号" prop="id" sortable="custom" width="100"></el-table-column>
        <el-table-column label="批次" prop="batch" sortable="custom" width="100"></el-table-column>
        <el-table-column label="管色" prop="tubecolourid" sortable="custom">
          <span slot-scope="scope">{{scope.row.colourName}}</span>
        </el-table-column>
        <el-table-column label="修改时间" sortable="custom" prop="gmt_create" width="140">
          <template slot-scope="scope">{{scope.row.gmtModified | timeFormat('YYYY-MM-DD HH:mm')}}</template>
        </el-table-column>
        <el-table-column label="创建时间" sortable="custom" prop="gmt_modified" width="140">
          <template slot-scope="scope">{{scope.row.gmtCreate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
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
    </div>
    <dialog-edit ref="dialogEdit" :tubeColor="option.tubeColor" @confirmSucess="getData"></dialog-edit>
  </div>
</template>

<script>
import * as api from '../../../api/index'
export default {
  name: 'index',
  components: {
    'dialog-edit': require('./dialog-edit').default
  },
  data () {
    return {
      search: {
        batch: '',
        tubeColor: '',
        order: ''
      },
      option: {
        tubeColor: []
      },
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      tableData: [],
      loading: { search: false }
    }
  },
  mounted () {
    this.getAllTbueColour()
    this.getData()
    this.addTobeColorSniff()
  },
  methods: {
    addTobeColorSniff () {
      let {query} = this.$router.currentRoute
      if (query.action === 'add' && query.batch) {
        this.btnEdit({batch: query.batch})
      }
    },
    getAllTbueColour () {
      api.innerDefect.getAllTbueColour({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.tubeColor = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      })
    },
    sortChange ({col, prop, order}) {
      if (prop) {
        this.search.order = prop + ' ' + ((order === 'descending') ? 'desc' : 'asc')
        this.getData()
      }
    },
    getData () {
      let param = {
        batch: this.search.batch,
        tobeColourId: this.search.tubeColor.join(','),
        pageIndex: this.page.current,
        pageCount: this.page.size,
        order: this.search.order
      }
      this.tableData = []
      this.loading.search = true
      api.innerDefect.getAllPcBasicBatch(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.tableData = data.data.list
          this.page.total = data.data.count
        } else {
          console.log(data.meta.message)
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.search = false
      })
    },
    btnEdit (data) {
      this.$refs.dialogEdit.show(data)
    },
    btnDelete (data) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let params = { id: data.id }
            api.innerDefect.deleteBasicBatch(params).then((response) => {
              if (response.meta.data.code === 100000) {
                this.getData()
              }
            }).finally(() => {
              instance.confirmButtonLoading = false
              done()
            })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
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

</style>
