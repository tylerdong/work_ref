<!-- 生产查询/丝锭判等明细 -->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf" style="padding-top: 30px !important;">
        <!--查询条件-->
        <el-form :inline="true" :model="search" :rules="rules" ref="search" label-width="100px">
          <el-form-item label="车间">
            <el-select v-model="search.workshopId" @change="getLineList" clearable placeholder="请选择车间" class="input-item-18">
              <el-option v-for="(item, index) in options.workshopList" :key="item.index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="线别">
            <el-select v-model="search.lineId" :loading="search.lineLoading" placeholder="请选择线别"  clearable
                       class="input-item-18">
              <el-option v-for="(item, index) in options.lineList" :key="item.index" :label="item.line" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="机位号">
            <el-input v-model="search.item" placeholder="请输入机位号" clearable class="input-item-18">
            </el-input>
          </el-form-item>

          <el-form-item label="品名">
            <el-select v-model="search.productId" clearable placeholder="请选择品名" class="input-item-18">
              <el-option v-for="(item, index) in options.nameList" :key="item.index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker v-model="search.startDate" type="datetime" placeholder="请选择开始时间" class="input-item-18">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker v-model="search.endDate" type="datetime" placeholder="请选择结束时间" class="input-item-18">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="工艺">
            <el-select v-model="search.processId" placeholder="请选择工艺" clearable @change="getDownGradeReasonList"
                       class="input-item-18">
              <el-option v-for="(item, index) in options.workmanshipOptions" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="异常原因">
            <el-select v-model="search.downGradeReasonId" placeholder="请选择异常原因" clearable filterable class="input-item-18">
              <el-option v-for="(item, index) in options.downGradeReasonOptions" :key="item.index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="操作类别">
            <el-select v-model="search.operateType" placeholder="请选择操作类别" clearable class="input-item-18">
              <el-option v-for="(item, index) in options.operationTypes" :key="index" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="丝锭编码">
            <el-input v-model="search.silkCode" placeholder="请输入丝锭编码" clearable class="input-item-18">
            </el-input>
          </el-form-item>

          <el-form-item label="操作人员">
            <el-select v-model="search.employeeId" placeholder="请输入操作人员" clearable filterable="" class="input-item-18">
              <el-option v-for="(item, index) in options.userList" :key="index" :label="item.employeeName" :value="item.employeeId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="loading.search" @click="getData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--table-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="workshopName" label="车间"></el-table-column>
        <el-table-column prop="lineName" label="线别"></el-table-column>
        <el-table-column prop="item" label="机位"></el-table-column>
        <el-table-column prop="fallNo" label="落次"></el-table-column>
        <el-table-column prop="productName" label="品名"></el-table-column>
        <el-table-column prop="batchNo" label="批次"></el-table-column>
        <el-table-column prop="spec" label="规格"></el-table-column>
        <el-table-column prop="silkCode" label="丝锭编码"></el-table-column>
        <el-table-column prop="processName" label="工艺"></el-table-column>
        <el-table-column label="操作类别">
          <template slot-scope="scope">{{scope.row.operateType | operateType}}</template>
        </el-table-column>
        <el-table-column prop="reasonName" label="异常原因"></el-table-column>
        <el-table-column prop="employeeName" label="操作人"></el-table-column>
        <el-table-column prop="createTimeGmt" label="操作时间"></el-table-column>
      </el-table>

      <el-pagination
        class="fr"
        style="text-align: right;margin-top: 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[15, 30, 50, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>

    <!-- 导出 -->
    <a ref="refDownload" :href="download.href"></a>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import {operateType} from '../../value-label'
  import dateFns from 'date-fns'
  export default {
    mounted () {
      this.getWorkshopList()
      this.getNameList()
      this.getWorkmanshipOptions()
      this.options.operationTypes = operateType
      this.getUserList()
    },
    data () {
      return {
        rules: {
          startDate: [
            {required: true, message: '请选择开始结算日期', trigger: 'blur change'}
          ],
          endDate: [
            {required: true, message: '请选择结束结算日期', trigger: 'blur change'}
          ]
        },
        search: {
          workshopId: '',
          lineId: '',
          item: '',
          productId: '',
          startDate: new Date(new Date(new Date().toLocaleDateString()).getTime()),
          endDate: new Date(),
          processId: '',
          downGradeReasonId: '',
          silkCode: '',
          employeeId: ''
        },
        options: {
          // 车间
          workshopList: [],
          // 线别
          lineList: [],
          // 品名
          nameList: [],
          // 工艺
          workmanshipOptions: [],
          // 异常原因
          downGradeReasonOptions: [],
          // 造作类别
          operationTypes: [],
          // 操作人
          userList: []
        },
        tableData: [],
        loading: { search: false },
        download: { href: '' },
        page: {
          currentPage: 1,
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      /* 获取车间下拉列表 */
      getWorkshopList () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshopList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },

      // 根据车间选择线别
      getLineList (val) {
        this.search.lineId = ''
        if (val) {
          api.automatic.productPlan.getAllLine({
            workShopId: val
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.options.lineList = data.data
            } else {
              this.$message({type: 'error', message: data.message})
            }
          }).finally(() => {
          })
        }
      },

      // 工艺下拉列表
      getWorkmanshipOptions () {
        this.loading.processId = true
        api.automatic.dictionary.getAllProductProcessList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workmanshipOptions = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },

      // 根据工艺选择异常原因
      getDownGradeReasonList (val) {
        this.search.downGradeReasonId = ''
        this.options.downGradeReasonOptions = []
        if (val) {
          let params = { productProcessId: val }
          api.automatic.other.getDownGradeReasonList(params).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.options.downGradeReasonOptions = data.data
            }
          }).catch(e => {
            console.log(e)
          }).finally(() => {
          })
        }
      },

      /* 获取品名下拉列表 (获取所有产品分类) */
      getNameList () {
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.nameList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },

      /* 获取人员下拉列表 */
      getUserList () {
        let param = {workshopId: '', name: '', pageIndex: 1, pageCount: 10000}
        api.automatic.person.getEmployeeList(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.userList = data.data.list
          } else {
            this.$message({ type: 'error', message: data.message })
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {})
      },

      // 查询
      getData () {
        this.$refs.search.validate(valid => {
          if (valid) {
            this.tableData = []
            let params = {
              workshopId: this.search.workshopId,
              lineId: this.search.lineId,
              item: this.search.item,
              productId: this.search.productId,
              startDate: this.search.startDate ? dateFns.format(this.search.startDate, 'YYYY-MM-DD HH:mm') : '',
              endDate: this.search.endDate ? dateFns.format(this.search.endDate, 'YYYY-MM-DD HH:mm') : '',
              processId: this.search.processId,
              downGradeReasonId: this.search.downGradeReasonId,
              operateType: this.search.operateType,
              silkCode: this.search.silkCode,
              employeeId: this.search.employeeId,
              pageIndex: this.page.currentPage,
              pageCount: this.page.size
            }
            api.automatic.statement.getSilkExceptionRecordList(params).then(response => {
              let data = response.data
              if (data.messageType === 1) {
                this.tableData = data.data.list
                this.page.total = data.data.count
              } else {
                this.$message({type: 'error', message: data.message})
              }
            })
          }
        })
      },

      /* 分页 */
      handleSizeChange (size) {
        this.page.pageSize = size
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      handleCurrentChange (currentPage) {
        this.page.currentPage = currentPage
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    background: #fff;
    border: 1px solid #dee4ec;
    margin: 10px 10px;
    padding: 10px;
    border-radius: 0 5px 5px 5px;
  }

  .width-1 {
    width: 240px;
  }

  .margin-right-1 {
    margin-right: 5px;
  }

  .margin-bottom-1 {
    margin-bottom: 5px;
  }
</style>
