<template>
  <div class="page-wrapper">
    <el-form :inline="true">
      <el-form-item>
        <el-input class="width1" v-model="search.customer" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="search.deliveryNo" placeholder="交货编号" class="width1"></el-input>
      </el-form-item>
      <!--<el-form-item>-->
      <!--<el-select v-model="search.type" placeholder="请选择类型" clearable>-->
      <!--<el-option v-for="item in list.type" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-select v-model="search.productName" clearable placeholder="请选择品名" :loading="loading.productName" class="margin-right-1 margin-bottom-1">
          <el-option v-for="item in list.nameList" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.batchNo" placeholder="请选择批号" :loading="loading.selBatchNo" filterable clearable>
          <el-option v-for="item in list.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="search.status"
          placeholder="请选择状态" clearable>
          <el-option v-for="item in list.statuslist" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入车牌号" v-model="search.plateNumber" class="width1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.startDate" type="date" :picker-options="pickerOptions0" @keyup.enter="searchClick"
                        @change="dtStartChange" placeholder="请选择发货开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.endDate" type="date" :picker-options="pickerOptions1" @keyup.enter="searchClick"
          @change="dtEndChange" placeholder="请选择发货结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchClick" type="primary" icon="el-icon-search" :loading="search.loading"></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border v-loading="loading.table" style="width: 100%" :show-summary=showsummary>
      <el-table-column label="交货编号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.deliveryNos" :key="item" class="tags">{{ item + ' ' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.customers" :key="item" class="tags">{{ item + ' ' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">{{scope.row.type | requisitionType}}</template>
      </el-table-column>
      <el-table-column prop="batchNo" label="批号"></el-table-column>
      <el-table-column label="发货日期">
        <template slot-scope="scope" >{{scope.row.date | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
      <el-table-column prop="boxCount" label="箱数"></el-table-column>
      <el-table-column prop="weight" label="总净重"></el-table-column>
      <!--<el-table-column prop="retrievalPerson" label="发货员"></el-table-column>-->
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">{{scope.row.status | productStatus}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="getRetrievalRecordInfoList(scope.row)">码单明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page.currentPage"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <out-dialog ref="outdetail"></out-dialog>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import {productTypes, yokeTypes, packTypes, storageType} from 'value-label'
  import * as formate from '../../../../module/formatter'
  export default {
    components: {
      'out-dialog': require('./out-detail.vue')
    },
    data () {
      return {
        showsummary: true,
        time: '',
        dtBaseStart: '',
        dtBaseEnd: '',
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.dtBaseStart) {
              return time.getTime() > this.dtBaseStart
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.dtBaseEnd) {
              return time.getTime() < this.dtBaseEnd
            }
          }
        },
        search: {
          loading: false,
          deliveryNo: '',
          status: '',
          customer: '',
          productName: '',
          batchNo: '',
          startDate: '',
          endDate: ''
        },
        list: {
          statuslist: [
            {
              name: '已完成',
              id: 'CHECKED,FINISH'
            },
            {
              name: '已过账',
              id: 'SAP_FINISH'
            }
          ],
          warehouse: [],
          nameList: [],
          batchNo: []
        },
        tableData: [],
        loading: {
          table: false,
          selWarehouse: false,
          selBatchNo: false,
          productName: false
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getAllBatchNo()
      this.getNameList()
    },
    methods: {
      getAllBatchNo () {
        this.loading.selBatchNo = true
        api.storage.warehouseManagement.getAllBatch({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.batchNo = data.data
          }
        }).finally(() => {
          this.loading.selBatchNo = false
        })
      },
      getNameList () {
        this.search.name = true
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.nameList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.search.name = false
        })
      },
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      getData () {
        console.log(storageType)
        this.search.loading = true
        this.loading.table = true
        let param = {
          status: this.search.status ? this.search.status : 'CHECKED,FINISH,SAP_FINISH',
          batchNo: this.search.batchNo,
          productName: this.search.productName,
          type: storageType.REFUND.value,
          customer: this.search.customer,
          deliveryNo: this.search.deliveryNo,
          stockNo: this.search.stockNo,
          plateNumber: this.search.plateNumber,
          startTime: this.search.startDate ? this.search.startDate.getTime() : '',
          endTime: this.search.endDate ? this.search.endDate.getTime() + 86400000 : '',
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.storage.warehouseManagement.getRetrievalRecordInfo(param).then(response => {
          const data = response.data
          if (data.messageType === 1 && data.data && data.data.list) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          } else {
            this.tableData = []
          }
        }).finally(() => {
          this.search.loading = false
          this.loading.table = false
        })
      },
      getRetrievalRecordInfoList (data) {
        this.$refs.outdetail.show(data)
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.search.startDate.getTime()
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.search.endDate.getTime()
        } else {
          this.dtBaseStart = ''
        }
      },
      /* 分页 */
      sizeChange (val) {
        this.page.size = val
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      currentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    },
    filters: {
      time: formate.date,
      productTypes: (val) => {
        if (val) {
          for (let item of productTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      },
      yokeTypes: (val) => {
        if (val) {
          for (let item of yokeTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      },
      packTypes: (val) => {
        if (val) {
          for (let item of packTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-wrapper {
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }

  .action-bar {
    padding: 10px 0;
  }
  .tags {
    margin-right: 10px
  }
</style>
