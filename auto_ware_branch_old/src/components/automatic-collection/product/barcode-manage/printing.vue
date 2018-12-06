<!-- 丝锭条码管理 -- 丝锭条码 -- 条码打印 -->
<template>
  <div class="all-wrapper">
    <div class="action-bar">
      <el-checkbox v-model="search.printflag">
        未打印
      </el-checkbox>
      <el-select v-loading="loading.line" v-model="search.line" placeholder="请选择线别" clearable>
        <el-option
          v-for="item in lineOptions"
          :key="item.id"
          :label="item.line"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-loading="loading.batchNum" v-model="search.batchNum" filterable placeholder="请选择批号" clearable>
        <el-option
          v-for="item in batchNumOptions"
          :key="item.batchNo"
          :label="item.batchNo"
          :value="item.batchNo">
        </el-option>
      </el-select>
      <el-select v-loading="loading.classes" v-model="search.classes" placeholder="请选择班次" clearable>
        <el-option
          v-for="item in classOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="search.dateValue"
        type="date"
        placeholder="请选择日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="searchClick" :loading="search.loading"></el-button>
      <div style="display: inline-block;padding-top:10px">
        <el-button type="primary" @click="printingClick">打印</el-button>
        <el-button type="primary" @click="addClick">生成条码</el-button>
        <el-button type="primary" @click="batchUpdateClick">批量修改</el-button>
        <el-button type="primary" @click="selectPrinter">选择打印机</el-button>
      </div>
    </div>
    <div class="main-wrappper">
      <!--<div class="printing-bar">-->
        <!--<el-checkbox @change="allCheckedChange" v-model="allChecked">全选</el-checkbox>-->
      <!--</div>-->
      <el-table
        v-loading="loading.list"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="batchNo"
          label="批号">
        </el-table-column>
        <el-table-column
          prop="spec"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="item"
          label="机台位号">
        </el-table-column>
        <el-table-column
          prop="line"
          label="线别">
        </el-table-column>
        <el-table-column
          label="落筒方式">
          <template slot-scope="scope">
            <span>{{ scope.row.fallType === '1'?'手动落筒':'自动落筒' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fallNo"
          label="落次">
        </el-table-column>
        <el-table-column
          prop="classesName"
          label="班次">
        </el-table-column>
        <el-table-column
          prop="silkNum"
          label="锭数">
        </el-table-column>
        <el-table-column
          prop="num"
          label="总锭数">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="锭重">
        </el-table-column>
        <el-table-column
          label="打印状态">
          <template slot-scope="scope">
            <span>{{ scope.row.printFlag | printFlag }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productDate"
          label="生产日期">
        </el-table-column>
      </el-table>
      <!--<ul v-loading="loading.list">-->
        <!--<li v-if="!tableData.length" class="tc no-data">暂无数据</li>-->
        <!--<li class="list-item" v-for="item in tableData">-->
          <!--<div class="text">-->
            <!--<div class="check-wrapper">-->
              <!--<el-checkbox @change="checkedChange" v-model="item.checked"></el-checkbox>-->
            <!--</div>-->
            <!--<div class="fixation">-->
              <!--<h4>{{item.batchNo}}</h4>-->
              <!--<p class="fixation-box">-->
                <!--<span class="note">规格：</span>{{item.spec}}-->
                <!--<span class="space">|</span>-->
                <!--<span class="note">机台位号：</span>{{item.item}}-->
                <!--<span class="space">|</span>-->
                <!--<span class="note">线别：</span>{{item.line}}-->
                <!--<span class="space">|</span>-->
                <!--<span class="note">落筒方式：</span>{{ item.fallType==='1'?'手动落筒':'自动落筒' }}-->
              <!--</p>-->
              <!--<p class="fixation-box">-->
                <!--<span class="note">落次：</span>{{item.fallNo}}-->
                <!--<span class="space">|</span>-->
                <!--<span class="note">班次：</span>{{item.classesName}}-->
                <!--<span class="space">|</span>-->
                <!--<span class="note">锭数：</span>{{item.silkNum}}-->
                <!--<span class="space">|</span>-->
                <!--<span class="note">总锭数：</span>{{item.num}}-->
                <!--<span class="space">|</span>-->
                <!--<span class="note">锭重：</span>{{ item.weight }}-->
              <!--</p>-->
            <!--</div>-->

            <!--<div class="inner">-->
              <!--<p class="tc"><span class="note">打印状态</span></p>-->
              <!--<p class="tc"><span class="red">{{item.printFlag | printFlag}}</span></p>-->
            <!--</div>-->

            <!--<div class="inner">-->
              <!--<p class="time"><span class="note">生产日期：</span><time>{{item.productDate}}</time></p>-->
            <!--</div>-->

            <!--<div class="btn-box tr">-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
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
    <dialog-printing-add ref="dialogPrintingAdd" @submitSuccess="getData"></dialog-printing-add>
    <dialog-printing-update ref="dialogPrintingUpdate" @submitSuccess="getData"></dialog-printing-update>
    <dialog-printing-select ref="dialogPrintingSelect" @submitSuccess="getData"></dialog-printing-select>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'
  export default {
    components: {
      'dialog-printing-add': require('./dialog-printing-add.vue'),
      'dialog-printing-update': require('./dialog-printing-update.vue'),
      'dialog-printing-select': require('./dialog-printing-select.vue')
    },
    data () {
      return {
        search: {
          loading: false,
          printflag: '',
          batchNum: '',
          dateValue: '',
          line: '',
          classes: ''
        },
        lineOptions: [],
        batchNumOptions: [],
        classOptions: [],
        allChecked: false,
        tableData: [],
        multipleSelection: [],
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          printflag: false,
          list: false,
          batchNum: false,
          line: false,
          classes: false
        }
      }
    },
    mounted () {
      this.getLineOptions()
      this.getBatchNumOptions()
      this.getData()
      this.getTeamOptions()
    },
    filters: {
      printFlag: function (value) {
        if (value === '1') {
          return '未打印'
        }
        if (value === '2') {
          return '已打印'
        }
      }
    },
    methods: {
      batchUpdateClick () {
        if (!this.multipleSelection.length) {
          this.$message({message: '请选择数据'})
          return
        }
        this.$refs.dialogPrintingUpdate.show(this.multipleSelection)
      },
      addClick () {
        if (this.multipleSelection.length > 1) {
          this.$message({message: '只能选择一条数据！'})
        } else if (this.multipleSelection.length === 0) {
          this.$refs.dialogPrintingAdd.show()
        } else {
          this.$refs.dialogPrintingAdd.show(this.multipleSelection[0])
        }
      },
      selectPrinter () {
        this.$refs.dialogPrintingSelect.show()
      },
      getLineOptions () {
        this.loading.line = true
        api.automatic.productPlan.getAllLine({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.lineOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.line = false
        })
      },
      getBatchNumOptions () {
        this.loading.batchNum = true
        api.automatic.dictionary.getAllBatchList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.batchNumOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.batchNum = false
        })
      },
      getTeamOptions () {
        this.loading.classes = true
        api.automatic.dictionary.getAllClassesList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.classOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.classes = false
        })
      },
      printingClick () {
        if (!this.multipleSelection.length) {
          this.$message({message: '请先选择要打印的条码'})
          return
        }
        let silkCodeGroup = this.multipleSelection.map(item => {
          return item.silkCodeGroupId
        })
        if (!localStorage.getItem('printer')) {
          this.$message({message: '请先选择打印机'})
        }
        this.$confirm('是否确认打印?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              let params = {
                silkCodeGroupId: silkCodeGroup,
                printNo: localStorage.getItem('printer')
              }
              api.automatic.barCode.silkCodePrint(params).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  console.log(data)
                  this.$message({
                    message: '打印成功',
                    type: 'success'
                  })
                  this.getData()
                  done()
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                instance.confirmButtonLoading = false
              })
            } else {
              instance.confirmButtonLoading = false
              done()
            }
          }
        })
        console.log('打印')
      },
      searchClick () {
        this.page.current = 1
        this.getData()
      },
      getData () {
        this.search.loading = true
        this.loading.list = true
        let dateValue = ''
        let flag = ''
        if (this.search.dateValue) {
          dateValue = dateFns.format(this.search.dateValue, 'YYYY-MM-DD')
        }
        if (this.search.printflag) {
          flag = 1
        }
        let params = {
          lineId: this.search.line,
          spec: this.search.type,
          classesId: this.search.classes,
          printFlag: flag,
          batchNo: this.search.batchNum,
          productDate: dateValue,
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        console.log(params)
        api.automatic.barCode.getSilkCodeGroupList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.page.total = data.data.count
            for (let item of data.data.list) {
              let machineNumStart = item.item.split('-')[0]
              let machineNumEnd = item.item.split('-')[1]
              let downNumStart = item.fallNo.split('-')[0]
              let downNumEnd = item.fallNo.split('-')[1]
              item.silkNum = parseInt(item.num) / (parseInt(machineNumEnd) - parseInt(machineNumStart) + 1) / (parseInt(downNumEnd) - parseInt(downNumStart) + 1)
              console.log(item.silkNum)
              this.$set(item, 'checked', false)
            }
            this.tableData = data.data.list
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.search.loading = false
          this.loading.list = false
        })
      },
      checkedChange (e) {
        let newAllChecked = true
        for (let item of this.tableData) {
          if (!item.checked) {
            newAllChecked = false
          }
        }
        this.allChecked = newAllChecked
      },
      allCheckedChange (e) {
        for (let item of this.tableData) {
          item.checked = e.target.checked
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
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
  .no-data{
    height: 100px;
    line-height: 100px;
    color: #666;
  }
  .font-bold{
    font-weight: bold;
  }
  .all-wrapper{
    padding: 10px;
  }
  .action-bar{
    padding-bottom: 10px;
    .el-input{
      width: 240px;
      display: inline-block;
      margin-right: 10px;
    }
    .el-select, .el-date-editor{
      width: 160px;
      margin-right: 10px;
    }
  }
  .printing-bar{
    padding-left: 10px;
    .el-button{
      margin-left: 10px;
    }
  }
  .main-wrappper{
    border: 1px solid #efefef;
    border-radius: 4px;
    padding: 10px;
  }
  .list-item {
    padding: 20px 10px 10px 10px;
    border-bottom: 1px dashed #dee4ec;
    .btn-box {
      width: 80px;
    }
    .text {
      display: flex
    }
    .fixation {
      flex: 0 0 600px;
    }
    .check-wrapper {
      flex: 0 0 36px;
      align-items: center;
      display: flex;
    }
    .fixation-box {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: normal;
      white-space: nowrap;
      width: 600px;
    }
    .fixation-jz{
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: normal;
      white-space: nowrap;
      min-width: 100px;
    }
    .time {min-width: 185px}
    .inner {
      flex: 1;
    }
    .mini {
      font-size: 13px;
    }
    .user {
      color: #000;
      font-size: 15px;
    }
    .space {
      font-size: 16px;
      color: #99a9bf;
      margin-left: 10px;
      margin-right: 10px;
    }
    .red {
      color: #f50000;
      margin-right: 5px;
    }

    .person {
      font-size: 16px;
    }

    h4 {
      margin: 0 0 10px;
      font-size: 16px;
      font-weight: bold;
      span {
        font-weight: normal;
        margin-left: 5px;
      }
    }
    .note {
      font-size: 13px;
      color: #99a9bf;
    }
    .notebg{
      color: #99a9bf;
      font-size: 18px;
    }
    .font1 {
      font-size: 16px;
      color: #000;
    }
  }
</style>
