<!--库位视图-->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <div class="fl">
        <span class="warehouse-detail">编号：{{pageData.houseCode}}</span>
        <span class="warehouse-detail">仓库类型：{{pageData.houseType}}</span>
        <span class="warehouse-detail">{{pageData.sumNum}} 箱</span>
        <span class="warehouse-detail">{{pageData.sumWeight}} 吨</span>
        <ul>
          <li class="li">预警:<span style="background-color: #F7BA2A;width: 40px;height: 40px; float:right"></span></li>
          <li class="li">锁定:<span style="background-color: yellow; width: 40px; height: 40px;float:right"></span></li>
          <li class="li">禁用:<span style="background-color: red; width: 40px; height: 40px;float:right"></span></li>
        </ul>
      </div>
      <div class="fr">
        <!--<el-autocomplete-->
          <!--class="inline-input"-->
          <!--v-model="batchNo"-->
          <!--:fetch-suggestions="querySearch"-->
          <!--placeholder="请输入批次号"-->
          <!--@select="handleSelect"-->
        <!--&gt;</el-autocomplete>-->
        <el-select v-model="search.warehouse" placeholder="请选择仓库">
          <el-option
            v-for="item in options.warehouse"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getData" :loading="search.loading"></el-button>
        <el-button type="primary" @click="btnAlarm">报警设置</el-button>
        <el-button type="primary" @click="btnPrint">库位打印</el-button>
      </div>
    </div>
    <div class="list-wrapper" v-loading="loading.list">
      <div v-show="!pageData.listData.length" class="no-data-label">暂无数据</div>
      <ul :style="{width: listBoxWidth + 'px'}" class="list-box cf">
        <li @click="itemClick(item)"
            :class="{warn: isWarn(item), 'lock-red': item.status === 'LOCAKING', red: item.status === 'BAN',shadow: (item.batchNo === batchNo && batchNo !='')}"
            class="list-item" v-for="item in pageData.listData" :key="item.storageId">
          <div>{{item.code}}</div>
          <div v-if="item.status === 'BAN'">{{item.banRemark}}</div>
          <el-tooltip effect="dark" :content="item.batchNoList.join(' ')" placement="top">
            <div class="text-ellipsis" v-if="item.status !== 'BAN'">{{item.batchNoList.join(' ')}}</div>
          </el-tooltip>
          <div v-if="item.status !== 'BAN' && item.productTime !== 32501923200000">{{item.productTime | timeFormat('YYYY.MM.DD')}}</div>
          <div v-if="item.status !== 'BAN' && item.num">库存{{item.num}}</div>
        </li>
      </ul>
    </div>
    <detail-dialog :warehouseId="tempWarehouse" @list-update="getData" ref="detailDialog"></detail-dialog>
    <alarm-dialog :warehouseOptions="options.warehouse" @submitSuccess="getData" ref="alarmDialog"></alarm-dialog>
    <print-dialog ref="printDialog"></print-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'detail-dialog': require('./detail-dialog.vue'),
      'alarm-dialog': require('./alarm-dialog.vue'),
      'print-dialog': require('./dialog-print.vue')
    },
    data () {
      return {
        tempWarehouse: '',
        warnDay: '',
        search: {
          loading: false,
          warehouse: ''
        },
        options: {
          warehouse: []
        },
        loading: {
          warehouse: false,
          list: false
        },
        listBoxWidth: 0,
        pageData: {
          houseCode: '',
          houseType: '',
          listData: [],
          sumNum: 0,
          sumWeight: 0
        },
        batchNo: ''
      }
    },
    mounted () {
      this.getAllWarehouseList()
    },
    methods: {
      getData () {
        this.search.loading = true
        this.loading.list = true
        this.tempWarehouse = this.search.warehouse
        api.storage.warehouseManagement.getAreaView({
          warehouseId: this.search.warehouse
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pageData.sumNum = data.data.totalBoxNum
            this.pageData.sumWeight = data.data.totalWeight
            this.sort(data.data.storageBoList)
            this.pageData.houseCode = data.data.houseCode
            this.pageData.houseType = data.data.houseType
            this.warnDay = data.data.warnDay
          }
        }).finally(() => {
          this.search.loading = false
          this.loading.list = false
        })
      },
      isWarn (val) {
        console.log(this.warnDay)
        let nowTime = new Date().getTime()
        if (nowTime - val.productTime > this.warnDay * 24 * 3600000) {
          return true
        }
        return false
      },
      sort (list) {
        let len = list.length
        let col
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - i - 1; j++) {
            let n1 = list[j]
            let n2 = list[j + 1]
            col = col - n1.areaX > 0 ? col : n1.areaX
            // if n1 > n2  swap
            if (this.compare(n1, n2) > 0) {
              let tmp = n1
              list[j] = n2
              list[j + 1] = tmp
            }
          }
        }
        this.pageData.listData = list
        this.listBoxWidth = col * 80 + 1
      },
      compare (n1, n2) {
        return n1.areaY === n2.areaY ? (n1.areaX - n2.areaX) : (n1.areaY - n2.areaY)
      },
      itemClick (item) {
        this.$refs.detailDialog.show(item)
      },
      getAllWarehouseList () {
        this.loading.warehouse = true
        api.storage.warehouseMaintain.getAllWarehouseList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.warehouse = data.data
            this.search.warehouse = this.options.warehouse[0].id
            this.getData()
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.warehouse = false
        })
      },
      btnAlarm () {
        this.$refs.alarmDialog.open(this.warnDay)
      },
      btnPrint () {
        this.$refs.printDialog.show(this.pageData)
      },
      querySearch (queryString, cb) {
        let list = this.pageData.listData
        list.map((item) => {
          item.value = item.batchNo
          return item
        })
        let results = queryString ? list.filter(this.createFilter(queryString)) : list
        cb(results)
      },
      createFilter (queryString) {
        return (list) => {
          return (list.batchNo.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        // console.log(item)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .li{
    width: 120px;
    height: 50px;
    float: left;
    list-style: none;
    margin-left: 10px;
  }
  .warn{
    background-color: #F7BA2A;
    color: #fff;
  }
  .red{
    background-color: red;
    color: #fff;
  }
  .lock-red{
    background-color: yellow;
    color: #fff;
  }
  .shadow{
   -webkit-box-shadow: rgb(59, 157, 216) 0px 0px 10px inset;
   -moz-box-shadow: rgb(59, 157, 216) 0px 0px 10px inset;
   box-shadow: rgb(59, 157, 216) 0px 0px 10px inset;
  }
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }
  .action-bar{
    padding: 10px 0;
  }
  .no-data-label{
    text-align: center;
    line-height: 100px;
    color: #666;
  }
  .warehouse-detail{
    display: inline-block;
    margin-right: 20px;
    line-height: 36px;
  }
  .list-wrapper{
    overflow-x: auto;
    min-height: 100px;
  }
  .list-box{
    margin: 0 auto;
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
  }
  .list-item{
    cursor: pointer;
    float: left;
    width: 80px;
    height: 90px;
    line-height: 22px;
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .text-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
