<!-- 标样丝登记弹窗 -->
<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="90%">
    <div class="search-box">
      <el-select
        v-model="search.silkCarNumber"
        clearable
        placeholder="请输入丝车号"
        filterable
        remote
        :remote-method="getSilkCarNumber"
        :loading="search.silkCarNumberLoading"
        @change="silkCarNumberChange">
        <el-option
          v-for="item in search.silkCarNumberList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="margin-left-1" type="primary" @click="handleSearch">查询</el-button>
    </div>

    <div v-loading="table.loading">
      <div class="silkCar-info-box">
        <p>批号：{{table.batchNo}}</p>
        <p>规格：{{table.spec}}</p>
        <p>线别：{{table.lineName}}</p>
        <p>位号：{{table.item}}</p>
        <p>生产日期：{{table.productDate}}</p>
        <p>班次：{{table.classesName}}</p>
        <p>落次： {{table.fallNo}}</p>
      </div>
      <el-table :data="table.silkCodeBoList" @selection-change="handleSelectionChange" style="overflow-y: auto; height: 20rem;">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="code" label="条码编号"></el-table-column>
        <el-table-column prop="spindleNo" label="锭号"></el-table-column>
        <el-table-column prop="sentenceStatus" label="染判情况"></el-table-column>
      </el-table>
    </div>


    <div class="form-box">
      <span>登记日期：</span>
      <el-date-picker
        v-model="form.registerTime"
        type="date"
        disabled
        placeholder="选择日期">
      </el-date-picker>
    </div>

    <div class="form-box">
      <span>备注：</span>
      <el-input
        type="textarea"
        :rows="2"
        placeholder=""
        v-model="form.remark">
      </el-input>
    </div>

    <div style="text-align: right">
      <el-button type="primary" :loading="form.submitLoading" @click="handleSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  import dateFns from 'date-fns'
  export default {
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        dialog: {
          title: '标样丝登记',
          visible: false
        },

        userInfo: {},

        table: {
          batchNo: '',
          classesName: '',
          fallNo: '',
          item: '',
          lineName: '',
          productDate: '',
          spec: '',
          silkCodeBoList: [],

          loading: false
        },

        search: {
          /* 丝车编号 */
          silkCarNumber: '',
          silkCarNumberList: [],
          silkCarNumberLoading: false,
          silkCarNumberTimeout: ''
        },

        form: {
          selection: [],
          registerTime: new Date(),
          remark: '',
          submitLoading: false
        }
      }
    },
    methods: {
      /* 打开初始化 */
      handleOpen () {
        this.dialog.visible = true

        this.search.silkCarNumber = ''
        this.search.silkCarNumberList = []

        this.table.batchNo = ''
        this.table.classesName = ''
        this.table.fallNo = ''
        this.table.item = ''
        this.table.lineName = ''
        this.table.productDate = ''
        this.table.spec = ''
        this.table.silkCodeBoList = []

        this.getSilkCarNumber('')
      },

      /* 获取丝锭编号下拉列表 */
      getSilkCarNumber (val) {
        clearTimeout(this.search.silkCarNumberTimeout)
        this.search.silkCarNumberLoading = true
        this.search.silkCarNumberTimeout = setTimeout(() => {
          api.automatic.device.fuzzySearchSilkCarNumber({
            number: val
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.search.silkCarNumberList = []
              for (let item of data.data) {
                this.search.silkCarNumberList.push({
                  value: item.code,
                  label: item.number
                })
              }
            }
          }).catch(e => {
          }).finally(() => {
            this.search.silkCarNumberLoading = false
          })
        }, 800)
      },

      /* 丝锭编号下拉值改变 */
      silkCarNumberChange (val) {
        this.table.batchNo = ''
        this.table.classesName = ''
        this.table.fallNo = ''
        this.table.item = ''
        this.table.lineName = ''
        this.table.productDate = ''
        this.table.spec = ''
        this.table.silkCodeBoList = []
      },

      /* 表格 -- 多选 */
      handleSelectionChange (val) {
        this.form.selection = val
      },

      /* 搜索 */
      handleSearch () {
        if (!this.search.silkCarNumber) {
          this.$message.info('请输入查询条件')
          return
        }

        this.table.loading = true
        api.automatic.statement.getSilkCodeListBoBySilkCarCode({
          silkCarCode: this.search.silkCarNumber
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.table.batchNo = data.data.batchNo
            this.table.classesName = data.data.classesName
            this.table.fallNo = data.data.fallNo
            this.table.item = data.data.item
            this.table.lineName = data.data.lineName
            this.table.productDate = data.data.productDate
            this.table.spec = data.data.spec
            this.table.silkCodeBoList = data.data.silkCodeBoList
          }
        }).finally(() => {
          this.table.loading = false
        })
      },

      /* 提交 */
      handleSubmit () {
        if (this.form.selection.length === 0) {
          this.$message.info('请选择条码编号')
          return
        }

        let selection = this.form.selection.map(item => {
          return {
            silkCode: item.code,
            spindleNo: item.spindleNo
          }
        })
        this.form.submitLoading = true
        api.automatic.statement.registerStandardSilk({
          silkCarCode: this.search.silkCarNumber,
          employeeId: this.userInfo.userId,
          recordDate: dateFns.format(new Date(), 'YYYY-MM-DD'),
          remark: this.form.remark,
          silkCodeList: selection
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$emit('callback-refresh')
            this.dialog.visible = false
          }
        }).finally(() => {
          this.form.submitLoading = false
        })
      }
    }
  }
</script>
<style lang="scss" scpoed>
  .search-box {
  }

  .silkCar-info-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 10px 5px;
    p {
      flex: 0 0 auto;
      width: 50%;
    }
  }

  .table-box {
    height: 200px;
    overflow-y: scroll;
  }

  .form-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    margin: 15px 0;
    span {
      flex: 0 0 auto;
      width: 70px;
    }
  }

  .margin-left-1 {
    margin-left: 10px;
  }
  .main-div {
    height: 60%;
    overflow-y: auto;
  }
</style>
