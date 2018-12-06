<!-- 丝锭异常状态 -->
<template>
  <div>
    <!--<breadcrumb name-id="020508"></breadcrumb>-->

    <div class="content">
      <el-row>
        <div class="margin-bottom-1 text-align-right">
          <span v-show="!search.searchMore">
            <el-select
              class="inline-input margin-right-2 margin-bottom-2"
              v-model="search.silkNumber"
              filterable
              clearable
              remote
              placeholder="请输入丝锭编号"
              :remote-method="silkNumberRemote"
              :loading="loading.silkNumber">
              <el-option
                v-for="item in search.silkNumberList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </span>

          <span v-show="search.searchMore">
            <el-select
              class="inline-input margin-right-2 margin-bottom-2"
              v-model="search.batchNumber"
              filterable
              clearable
              remote
              placeholder="请输入批号"
              :remote-method="getBatchNumber"
              :loading="loading.batchNumber">
              <el-option
                v-for="item in search.batchNumberList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>

            <el-input v-model="search.dropNumber" placeholder="请输入落次"></el-input>
            <el-input v-model="search.spindleNo" placeholder="请输入锭号"></el-input>
            <!--<el-select-->
              <!--class="inline-input margin-right-2 margin-bottom-2"-->
              <!--v-model="search.dropNumber"-->
              <!--filterable-->
              <!--clearable-->
              <!--remote-->
              <!--placeholder="请输入落次"-->
              <!--:remote-method="getDropNumber"-->
              <!--:loading="loading.dropNumber">-->
              <!--<el-option-->
                <!--v-for="item in search.dropNumberList"-->
                <!--:key="item.value"-->
                <!--:label="item.value"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->

            <el-select
              class="inline-input margin-right-2 margin-bottom-2"
              v-model="search.placeNumber"
              filterable
              clearable
              remote
              placeholder="请输入位号"
              :remote-method="getPlaceNumber"
              :loading="loading.placeNumber">
              <el-option
                v-for="item in search.placeNumberList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </span>

          <el-button class="margin-left-1" type="primary" @click="handleSearch">查询</el-button>
          <span class="change-search margin-left-1" @click="handleMore">切换查询条件</span>
        </div>
      </el-row>

      <el-table :data="table.data" border style="width: 100%" v-loading="table.loading">
        <el-table-column prop="silkCode" label="丝锭编号"></el-table-column>
        <el-table-column prop="line" label="线别"></el-table-column>
        <el-table-column prop="batchNo" label="批号"></el-table-column>
        <el-table-column prop="spec" label="规格"></el-table-column>
        <el-table-column prop="spindleNo" label="锭号"></el-table-column>
        <el-table-column prop="item" label="位号"></el-table-column>
        <el-table-column prop="classes" label="班次"></el-table-column>
        <el-table-column prop="fallNo" label="落次"></el-table-column>
        <el-table-column prop="grade" label="当前等级"></el-table-column>
        <el-table-column label="是否异常">
          <template slot-scope="scope">
            <span @click="exceptionClick(scope)" :class="{exception: scope.row.exception}">{{scope.row.exceptionLabel}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="锭重"></el-table-column>
        <el-table-column prop="process" label="当前已完成工艺"></el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper cf">
        <el-pagination
          class="fr"
          :current-page="page.current"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
        </el-pagination>
      </div>
    </div>

    <dialog-details ref="dialogDetails"></dialog-details>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    mounted () {
    },
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'dialog-details': require('./dialog-details.vue')
    },
    data () {
      return {
        table: {
          data: [],
          loading: false
        },
        search: {
          searchMore: false,
          silkNumber: '',
          silkNumberList: [],
          silkNumberTimeout: '',

          batchNumber: '',
          batchNumberList: [],
          batchNumberTimeout: '',

          dropNumber: '',
          dropNumberList: [],
          dropNumberTimeout: '',

          placeNumber: '',
          placeNumberList: [],
          placeNumberTimeout: '',
          spindleNo: ''
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          silkNumber: false,
          batchNumber: false,
          dropNumber: false,
          placeNumber: false
        }
      }
    },
    methods: {
      /* 获取丝锭编号下拉列表 */
      silkNumberRemote (val) {
        if (val) {
          clearTimeout(this.search.silkNumberTimeout)
          this.search.silkNumberTimeout = setTimeout(() => {
            this.loading.silkNumber = true
            api.automatic.statement.getSilkCodeSearchList({
              silkCode: val
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                console.log(data)
                let newData = []
                for (let item of data.data) {
                  newData.push({
                    value: item
                  })
                }
                this.search.silkNumberList = newData
              }
            }).catch(e => {
            }).finally(() => {
              this.loading.silkNumber = false
            })
          }, 300)
        }
      },
      /* 获取批号下拉列表 */
      getBatchNumber (val) {
        if (val) {
          clearTimeout(this.search.batchNumberTimeout)
          this.search.batchNumberTimeout = setTimeout(() => {
            this.loading.batchNumber = true
            api.automatic.statement.getBatchNoSearchList({
              batchNo: val
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                let newData = []
                for (let item of data.data) {
                  newData.push({
                    value: item
                  })
                }
                this.search.batchNumberList = newData
              }
            }).catch(e => {
            }).finally(() => {
              this.loading.batchNumber = false
            })
          }, 300)
        }
      },

      /* 获取落次下拉列表 */
//      getDropNumber (val) {
//        if (val) {
//          clearTimeout(this.search.dropNumberTimeout)
//          this.search.dropNumberTimeout = setTimeout(() => {
//            this.loading.dropNumber = true
//            api.automatic.statement.getFallNoSearchList({
//              fallNo: val
//            }).then(response => {
//              const data = response.data
//              if (data.messageType === 1) {
//                let newData = []
//                for (let item of data.data) {
//                  newData.push({
//                    value: item
//                  })
//                }
//                this.search.dropNumberList = newData
//              }
//            }).catch(e => {
//            }).finally(() => {
//              this.loading.dropNumber = false
//            })
//          }, 800)
//        }
//      },

      /* 获取位号下拉列表 */
      getPlaceNumber (val) {
        clearTimeout(this.search.placeNumberTimeout)
        this.search.placeNumberTimeout = setTimeout(() => {
          this.loading.placeNumber = true
          api.automatic.statement.getItemSearchList({
            item: val
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              let newData = []
              for (let item of data.data) {
                newData.push({
                  value: item
                })
              }
              this.search.placeNumberList = newData
            }
          }).catch(e => {
          }).finally(() => {
            this.loading.placeNumber = false
          })
        }, 800)
      },

      handleMore () {
        this.search.searchMore = !this.search.searchMore

        /* 初始化 搜索内容 */
        this.search.silkNumber = ''
        this.search.silkNumberList = []
        this.search.silkNumberTimeout = ''

        this.search.batchNumber = ''
        this.search.batchNumberList = []
        this.search.batchNumberTimeout = ''

        this.search.dropNumber = ''
        this.search.dropNumberList = []
        this.search.dropNumberTimeout = ''

        this.search.placeNumber = ''
        this.search.placeNumberList = []
        this.search.placeNumberTimeout = ''
      },

      handleSearch () {
        if (!this.search.searchMore) { // 丝锭查询
          if (this.search.silkNumber) {
            if (this.search.silkNumberList.some(item => item.value === this.search.silkNumber)) {
              this.request1()
            } else {
              this.$message.info('请选择下拉列表中的查询项')
            }
          } else {
            this.$message.info('查询条件不能为空')
          }
        } else { // 多条件查询
          /* 不能都为空检查 */
          if (!this.search.batchNumber && !this.search.dropNumber && !this.search.placeNumber && !this.search.spindleNo) {
            this.$message.info('查询条件不能都为空')
            return
          }

          let batchState = this.search.batchNumberList.some(item => item.value === this.search.batchNumber)
          let dropState = this.search.dropNumberList.some(item => item.value === this.search.dropNumber)
          let placeState = this.search.placeNumberList.some(item => item.value === this.search.placeNumber)

          /* 批号检查 */
          if (this.search.batchNumber) {
            if (!batchState) {
              this.$message.info('请选择批号下拉列表中的查询项')
              return
            }
          }

          /* 落次检查 */
          if (this.search.dropNumber) {
            if (!dropState) {
              this.$message.info('请选择落次下拉列表中的查询项')
              return
            }
          }

          /* 位号检查 */
          if (this.search.placeNumber) {
            if (!placeState) {
              this.$message.info('请选择位号下拉列表中的查询项')
              return
            }
          }
          this.request2()
        }
      },

      /* 丝锭查询 */
      request1 () {
        this.page.total = 1
        this.page.current = 1
        this.table.loading = true
        api.automatic.statement.getSilkStatusListBySilkCode({
          silkCode: this.search.silkNumber
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            data.data.exceptionLabel = '否'
            if (data.data.exception) {
              data.data.exceptionLabel = '是'
            }
            this.table.data = [data.data]
            console.log(data)
          }
        }).catch(e => {
        }).finally(() => {
          this.table.loading = false
        })
      },

      /* 多条件查询 */
      request2 () {
        this.table.loading = true
        api.automatic.statement.getSilkStatusListByParameters({
          batchNo: this.search.batchNumber,
          spindleNo: this.search.spindleNo,
          fallNo: this.search.dropNumber,
          item: this.search.placeNumber,
          pageIndex: this.page.current,
          pageCount: this.page.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let item of data.data.list) {
              item.exceptionLabel = '否'
              if (item.exception) {
                item.exceptionLabel = '是'
              }
            }
            this.page.total = data.data.count
            this.table.data = data.data.list
            console.log(data)
          }
        }).catch(e => {
        }).finally(() => {
          this.table.loading = false
        })
      },
      exceptionClick (scope) {
        if (scope.row.exception) {
          this.$refs.dialogDetails.handleOpen(scope)
        }
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
  .content {
    margin: 10px;
    padding: 10px;
    background-color: #fff;
  }

  .change-search {
    position: relative;
    top: 7px;
    text-decoration: underline;
    color: #3b9dd8;
    cursor: pointer;
  }

  .margin-left-1 {
    margin-left: 10px;
  }

  .margin-right-1 {
    margin-right: 5px;
  }

  .margin-right-2 {
    margin-right: 10px;
  }

  .margin-bottom-1 {
    margin-bottom: 10px;
  }

  .margin-bottom-2 {
    margin-bottom: 5px;
  }

  .text-align-right {
    text-align: left;
  }
  .exception{
    cursor: pointer;
  }
</style>
