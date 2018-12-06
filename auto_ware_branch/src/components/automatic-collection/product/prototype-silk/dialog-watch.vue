<!-- 标样丝登记弹窗 -->
<template>
  <el-dialog width="90%" :title="dialog.title" :visible.sync="dialog.visible">

    <div v-loading="table.loading">
      <div class="silkCar-info-box">
        <p>
          批号：{{table.batchNo}}
        </p>
        <p>
          规格：{{table.spec}}
        </p>
        <p>
          线别：{{table.lineName}}
        </p>
        <p>
          位号：{{table.item}}
        </p>
        <p>
          生产日期：{{table.productDate}}
        </p>
        <p>
          班次：{{table.classesName}}
        </p>
        <p>
          落次： {{table.fallNo}}
        </p>
      </div>

      <el-table
        :data="table.silkCodeBoList"
        style="width: 100%"
        height="250">
        <el-table-column prop="silkCode" label="条码编号"></el-table-column>
        <el-table-column prop="spindleNo" label="锭号"></el-table-column>
        <el-table-column prop="sentenceStatus" label="染判情况"></el-table-column>
      </el-table>

      <div class="form-box">
        <span>登记日期：</span>
        <el-date-picker
          v-model="table.productDate"
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
          disabled
          placeholder=""
          v-model="table.remark">
        </el-input>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import * as api from 'src/api'
  export default {
    data () {
      return {
        dialog: {
          title: '标样丝登记',
          visible: false
        },

        table: {
          batchNo: '',
          classesName: '',
          fallNo: '',
          item: '',
          lineName: '',
          productDate: '',
          spec: '',
          remark: '',
          silkCodeBoList: [],
          loading: false
        }
      }
    },
    methods: {
      /* 打开初始化 */
      handleOpen (id) {
        this.dialog.visible = true
        this.table.batchNo = ''
        this.table.classesName = ''
        this.table.fallNo = ''
        this.table.item = ''
        this.table.lineName = ''
        this.table.productDate = ''
        this.table.spec = ''
        this.table.remark = ''
        this.table.silkCodeBoList = []
        this.getData(id)
      },

      getData (id) {
        this.table.loading = true
        api.automatic.statement.getStandardSilkInfoBoById({
          id: id
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.table.batchNo = data.data.batchNo
            this.table.classesName = data.data.className
            this.table.fallNo = data.data.fallNo
            this.table.item = data.data.item
            this.table.lineName = data.data.lineName
            this.table.productDate = data.data.productDate
            this.table.spec = data.data.spec
            this.table.remark = data.data.remark
            this.table.silkCodeBoList = data.data.standardSilkDetailInfoBoList
          }
        }).finally(() => {
          this.table.loading = false
        })
      }
    }
  }
</script>
<style lang="scss" scpoed>
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
</style>
