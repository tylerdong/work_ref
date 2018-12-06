<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.visible"
             :modal-append-to-body="false"
             width="80%"
             size="small">
    <el-row>

      <!-- 组织搜索框 -->
      <el-autocomplete
        class="inline-input margin-bottom-10"
        v-model="search.organization"
        :fetch-suggestions="getOrganizationList"
        placeholder="请输入组织"
      ></el-autocomplete>

      <!-- 姓名搜索框 -->
      <el-autocomplete
        class="inline-input margin-bottom-10"
        v-model="search.name"
        :fetch-suggestions="getNameList"
        placeholder="请输入内容"
      ></el-autocomplete>

      <el-button type="primary" class="margin-bottom-10" @click="getData">搜索</el-button>
    </el-row>

    <el-table ref="refTable"
              style="width: 100%"
              :data="list.table"
              v-loading="loading.table"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column prop="number"
                       label="工号"
                       align="center">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称"
                       align="center">
      </el-table-column>
    </el-table>

    <el-pagination
      class="fr"
      style="text-align: right;margin-top: 20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="page.sizes"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>

    <el-row style="text-align: right; margin-top: 10px;">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
  import * as api from '../../api'
  import storage from 'storage'
  export default {
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        dialog: {
          title: '人员选择',
          visible: false
        },
        userInfo: {},
        timeout: '',
        search: {
          organization: '',
          organizationTimeout: '',
          organizationList: [],
          name: '',
          nameList: [],
          nameTimeout: ''
        },
        list: {
          table: [],
          tempSelectTable: [],
          selectTable: []
        },
        loading: {
          table: false,
          btnSave: false
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      /* 打开组件 */
      open (selectPersonnelList) {
        this.list.selectTable = JSON.parse(JSON.stringify(selectPersonnelList))

        /* 初始化 */
        this.dialog.visible = true
        this.page.currentPage = 1
        this.page.total = 0
        this.search.name = ''
        this.search.organization = ''
        this.getData()
      },

      getData () {
        this.loading.table = true
        api.laboratory.personnelManagement.getPersonListByConditions({
          pageIndex: this.page.currentPage,
          pageCount: this.page.size,
          personName: this.search.name,
          organizationName: this.search.organization
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.table = []
            this.page.currentPage = data.data.pageIndex
            this.page.total = data.data.count
            for (let item of data.data.list) {
              this.list.table.push({
                id: item.id,
                number: item.number,
                name: item.name
              })
            }

            for (let item of this.list.table) {
              let result = this.list.selectTable.some(some => {
                return some.id === item.id
              })
              if (result) {
                item.select = true
              } else {
                item.select = false
              }
            }
            this.selectedData()
          }
        }).finally(() => {
          this.loading.table = false
        })
      },

      /* 模糊搜索 -- 组织 */
      getOrganizationList (val, cb) {
        if (val) {
          clearTimeout(this.search.organizationTimeout)
          this.search.organizationTimeout = setTimeout(() => {
            api.laboratory.personnelManagement.getOrganizationListByName({
              organizationName: val
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.search.organizationList = []
                if (data.data.length) {
                  for (let item of data.data) {
                    this.search.organizationList.push({
                      id: item.id,
                      value: item.name
                    })
                    cb(this.search.organizationList)
                  }
                } else {
                  cb([])
                }
              }
            }).finally(() => {
            })
          }, 800)
        } else {
          cb([])
        }
      },

      /* 模糊搜索 -- 名字 */
      getNameList (val, cb) {
        if (val) {
          clearTimeout(this.search.nameTimeout)
          this.search.nameTimeout = setTimeout(() => {
            this.search.nameList = []
            api.laboratory.personnelManagement.getPersonListByPersonName({
              personName: val
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.search.nameList = []
                if (data.data.length) {
                  for (let item of data.data) {
                    this.search.nameList.push({
                      id: item.id,
                      value: item.name
                    })
                    cb(this.search.nameList)
                  }
                } else {
                  cb([])
                }
              }
            })
          }, 800)
        } else {
          cb([])
        }
      },

      /* 已选中内容勾选 */
      selectedData () {
        this.list.table.forEach((val, index) => {
          if (val.select) {
            this.$nextTick(() => {
              this.$refs.refTable.toggleRowSelection(this.list.table[index])
            })
          }
        })
      },

      /* 表格 checkbox 勾选 */
      handleSelectionChange (selection) {
        /* table数据里的状态 */
        this.list.table.forEach((item) => {
          let result = selection.some(some => {
            return some.id === item.id
          })
          if (result) {
            item.select = true
          } else {
            item.select = false
          }
        })

        this.list.table.forEach(val => {
          /* 当前row是否存在于选中列表中 */
          let exist = this.list.selectTable.some(some => {
            return some.id === val.id
          })
          if (val.select) {
            /* 当前row选中 */
            if (!exist) {
              this.list.selectTable.push(val)
            }
          } else {
            /* 当前row未选中 */
            if (exist) {
              this.list.selectTable = this.list.selectTable.filter(filter => {
                return filter.id !== val.id
              })
            }
          }
        })
      },

      handleSave () {
        this.$emit('callback-select-data', JSON.parse(JSON.stringify(this.list.selectTable)))
        this.dialog.visible = false
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
    }
  }
</script>
<style lang="scss" scoped>
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
</style>

