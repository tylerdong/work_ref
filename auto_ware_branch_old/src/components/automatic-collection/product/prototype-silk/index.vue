<!-- 标样丝管理 -->
<template>
  <div>
    <!--<breadcrumb name-id="020511"></breadcrumb>-->
    <div class="content">
      <div class="search-box">
        <el-autocomplete
          class="inline-input margin-right-2 margin-bottom-2"
          v-model="search.batchNumber"
          :fetch-suggestions="getBatchNumber"
          placeholder="请输入批号">
        </el-autocomplete>

        <el-autocomplete
          class="inline-input margin-right-2 margin-bottom-2"
          v-model="search.standard"
          :fetch-suggestions="getStandard"
          placeholder="请输入规格">
        </el-autocomplete>

        <el-button class="margin-left-1" type="primary" @click="handleSearch">查询</el-button>
        <el-button class="margin-left-1" type="primary" @click="handleRegister">登记</el-button>
        <el-button class="margin-left-1" type="primary" @click="handleClean">清除</el-button>
      </div>

      <el-table
        :data="table.data"
        stripe
        style="width: 100%"
        v-loading="table.loading"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="changeSelectable"></el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
            <span :style="{color: scope.row.status === '3' ? 'red': ''}">{{scope.row.status | formatterState}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="批号"></el-table-column>
        <el-table-column prop="spec" label="规格"></el-table-column>
        <el-table-column prop="paperTubeName" label="管色"></el-table-column>
        <el-table-column prop="lineName" label="线别"></el-table-column>
        <el-table-column prop="item" label="位号"></el-table-column>
        <el-table-column prop="totalNum" label="总锭数"></el-table-column>
        <el-table-column prop="surplusNum" label="剩余锭数"></el-table-column>
        <el-table-column prop="recordDate" label="日期"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleLook(scope.$index, scope.row)">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
      </div>
    </div>

    <!-- 标样丝登记弹窗 -->
    <dialog-register ref="refDialogRegister" @callback-refresh="getData"></dialog-register>

    <!-- 查看 -->
    <dialog-watch ref="refDialogWatch"></dialog-watch>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    mounted () {
      this.getData()
    },
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'dialog-register': require('./dialog-register.vue'),
      'dialog-watch': require('./dialog-watch.vue')
    },
    data () {
      return {
        search: {
          /* 批号 */
          batchNumber: '',
          batchNumberTimeout: '',
          /* 规格 */
          standard: '',
          standardTimeout: ''
        },

        table: {
          loading: false,
          data: [],
          selection: []
        },

        page: {
          currentPage: 1,
          total: 0,
          size: 15,
          sizes: [15, 30, 50, 100]
        }
      }
    },
    methods: {
      /* 获取表格数据 */
      getData () {
        this.table.loading = true
        api.automatic.statement.getStandardSilkInfoList({
          batchNo: this.search.batchNumber,
          spec: this.search.standard,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.table.data = data.data.list
          }
        }).finally(() => {
          this.table.loading = false
        })
      },

      /* 获取批号下拉列表 */
      getBatchNumber (val, cb) {
        clearTimeout(this.search.batchNumberTimeout)
        this.search.batchNumberTimeout = setTimeout(() => {
          api.automatic.dictionary.fuzzyQueryBatchNo({
            batchNo: val
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              if (data.data.length > 20) {
                data.data = data.data.slice(0, 20)
              }
              let cbList = []
              for (let item of data.data) {
                cbList.push({
                  value: item
                })
              }
              cb(cbList)
            }
          }).catch(e => {
            cb([])
          })
        }, 800)
      },

      /* 获取规格下拉列表 */
      getStandard (val, cb) {
        clearTimeout(this.search.standardTimeout)
        this.search.standardTimeout = setTimeout(() => {
          api.automatic.dictionary.fuzzyQuerySpec({
            spec: val
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              let cbList = []
              for (let item of data.data) {
                cbList.push({
                  value: item
                })
              }
              cb(cbList)
            }
          }).catch(e => {
            cb([])
          })
        }, 800)
      },

      changeSelectable (row, index) {
        return row.status !== '3'
      },

      /* 搜索 */
      handleSearch () {
        this.getData()
      },

      /* 登记 */
      handleRegister () {
        this.$refs.refDialogRegister.handleOpen()
      },

      /* 清除 */
      handleClean () {
        if (this.table.selection.length === 0) {
          this.$message.info('请选择批号')
          return
        }
        this.$confirm(`是否确认清除？`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              let idList = this.table.selection.map(item => item.id)
              api.automatic.statement.clearStandardSilkByIdList({
                idList: idList
              }).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  done()
                  this.getData()
                } else {
                  this.$message.error('错误')
                }
              }).finally(() => {
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).catch(() => {
        })
      },

      /* 查看 */
      handleLook (index, row) {
        this.$refs.refDialogWatch.handleOpen(row.id)
      },

      /* 表格 -- 多选 */
      handleSelectionChange (val) {
        this.table.selection = val
      },

      /* 分页 */
      handleSizeChange (size) {
        this.page.size = size
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },

      handleCurrentChange (currenPage) {
        this.page.currentPage = currenPage
        this.getData()
      }
    },
    filters: {
      /* 格式化表格状态 */
      formatterState (val) {
        let state = Number(val)
        if (state === 1) {
          return '正常'
        }
        if (state === 2) {
          return '已用完'
        }
        if (state === 3) {
          return '已清理'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    margin: 10px;
    padding: 10px;
    background-color: #fff;

    .search-box {
      text-align: right;
    }
  }

  .margin-right-2 {
    margin-right: 10px;
  }

  .margin-bottom-2 {
    margin-bottom: 5px;
  }
</style>
