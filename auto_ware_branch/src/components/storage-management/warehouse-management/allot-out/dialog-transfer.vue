<template>
  <div>
    <el-dialog title="过账转移" width="80%" :visible.sync="dialogVisible">
      <el-table :data="tableData" border v-loading="loading.table" style="width: 100%">
        <el-table-column class-name="rgb-red" label="交货编号" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip v-if="scope.isEnough" effect="dark" content="提前出库单库存不足" placement="top-start">
              <i class="fa fa-exclamation-triangle" style="color:red" aria-hidden="true"></i>
            </el-tooltip>
            <el-tag v-for="item in scope.row.deliveryNos" :key="item" class="tags">{{ item + ' ' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.customerNames" :key="item" class="tags">{{ item + ' ' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发货日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.outBoundDates" :key="item" class="tags">
              {{ item | timeFormat('YYYY-MM-DD') + ' ' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="同步日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.synDates" :key="item" class="tags">
              {{ item | timeFormat('YYYY-MM-DD') + ' ' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发货仓库" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.loadPointNames" :key="item" class="tags">{{ item + ' ' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">{{scope.row.status | status}}</template>
        </el-table-column>
        <el-table-column width="200" label="操作">
          <template slot-scope="scope">
            <el-button @click="confirm(scope.row)" type="primary">过账转移</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import {requisitionStatus} from 'value-label'
  import storage from '../../../../module/storage'
  export default {
    data () {
      return {
        dialogVisible: false,
        tableData: [],
        originalPrimaryId: '',
        loading: {
          table: false
        }
      }
    },
    filters: {
      status: (value) => {
        for (let item of requisitionStatus) {
          if (value === item.value) {
            return item.label
          }
        }
        return ''
      }
    },
    methods: {
      show (data) {
        this.dialogVisible = true
        this.loading.table = true
        this.originalPrimaryId = data.primaryId
        api.storage.warehouseManagement.getPostTransferList({
          primaryId: data.primaryId,
          isInternalTrade: data.isInternalTrade
        }).then(res => {
          if (res.data.messageType === 1) {
            this.tableData = res.data.data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      confirm (row) {
        api.storage.warehouseManagement.submitPostTransfer({
          originalPrimaryId: this.originalPrimaryId,
          newPrimaryId: row.primaryId,
          operator: storage.getUser().employeeId
        }).then(res => {
          if (res.data.messageType === 1) {
            this.dialogVisible = false
            this.$emit('success')
          }
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }
  .action-bar{
    padding: 10px 0;
  }
  .ml {
    margin-left: 20px;
  }
  .tags {
    margin-right: 10px
  }
  .rgb-red {
    color: red;
  }
</style>
