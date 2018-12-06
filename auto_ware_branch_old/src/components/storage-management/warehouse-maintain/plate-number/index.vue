<template>
  <div>
    <!--<breadcrumb nameId="060103"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="search.type" placeholder="请选择类型" clearable="true">
            <el-option v-for="item in options.plateNumberType" :label="item.name" :value="item.value" :key="item.id"></el-option>
          </el-select>
          <el-input v-model="search.number" placeholder="请输入车牌号"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="getData"></el-button>
          <el-button type="primary" @click="btnAdd">新增</el-button>
        </div>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
          <el-table-column label="类型">
            <template slot-scope="scope">{{scope.row.type | plateNumberType}}</template>
          </el-table-column>
          <el-table-column prop="number" label="车牌号"></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="btnEdit(scope.row)">修改</el-button>
              <el-button type="text" size="medium" @click="btnDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="hy-admin__pagination-wrapper">
        <el-pagination
          class="fr"
          style="text-align: right;"
          @size-change="btnSizeChange"
          @current-change="btnCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="pages.sizes"
          :page-size="pages.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total">
        </el-pagination>
      </div>
    </div>
    <dialog-edit ref="refDialogEdit" :plateNumberType="options.plateNumberType" @submitSuccess="getData"></dialog-edit>
  </div>
</template>

<script>
  import * as api from 'src/api/index'
  import {plateNumberType} from '../../value-label'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'dialog-edit': require('./dialog-edit.vue')
    },
    mounted () {
      this.options.plateNumberType = plateNumberType
      this.getData()
    },
    data () {
      return {
        options: {plateNumberType: []},
        tableData: [],
        search: {type: '', number: ''},
        loading: {table: false},
        pages: {currentPage: 1, sizes: [15, 30, 50, 100], size: 15, total: 0}
      }
    },
    methods: {
      getData () {
        this.loading.table = true
        api.storage.warehouseMaintain.selectPlateNumber({
          type: this.search.type,
          number: this.search.number,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.tableData = data.data.list
          }
        }).finally(() => {
          this.loading.table = false
        })
      },
      btnAdd () {
        this.$refs.refDialogEdit.btnOpen({action: 'add'})
      },
      btnEdit (row) {
        this.$refs.refDialogEdit.btnOpen({action: 'edit', ...row})
      },
      btnDelete (row) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              api.storage.warehouseMaintain.deletePlateNumber({id: row.id}).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialogVisible = false
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
      /* 分页 */
      btnSizeChange (size) {
        this.pages.size = size
        if (this.pages.currentPage === 1) {
          this.getData()
        } else {
          this.pages.currentPage = 1
        }
      },

      btnCurrentChange (currenPage) {
        this.pages.currentPage = currenPage
        this.getData()
      }
    }
  }
</script>
