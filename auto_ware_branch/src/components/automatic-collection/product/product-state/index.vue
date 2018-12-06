<!--组件名-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020510"></main-breadcrumb>-->
    <div class="all-wrapper">
      <div class="action-bar">
        <el-select
          v-model="search.workshop"
          clearable
          placeholder="请选择车间">
          <el-option
            v-for="item in workshopOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select
          v-model="search.time"
          placeholder="请选择时间">
          <el-option
            v-for="item in timeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button @click="getData" type="primary" icon="el-icon-search"></el-button>
      </div>
      <table v-loading="loading.table">
        <tr>
          <td class="td-title">已落筒数量</td>
          <td>{{tableData.doffCount}}锭</td>
          <td class="td-title">已剥丝数量</td>
          <td>{{tableData.wireStrippingCount}}锭</td>
          <td class="td-title">已测纤数量</td>
          <td>{{tableData.testFiberCount}}锭</td>
        </tr>
        <tr>
          <td class="td-title">织袜数量</td>
          <td>{{tableData.knitSocksCount}}锭</td>
          <td class="td-title">染判数量</td>
          <td>{{tableData.wasSentencedCount}}锭</td>
          <td class="td-title">自动包装总量</td>
          <td>{{tableData.autoPackingCount}}锭</td>
        </tr>
        <tr>
          <td class="td-title">人工包装总量</td>
          <td>{{tableData.manualPackingCount}}锭</td>
          <td class="td-title">外观检总量</td>
          <td>{{tableData.observationalCheckCount}}锭</td>
          <td class="td-title">送物检总量</td>
          <td>{{tableData.sendCheckCount}}锭</td>
        </tr>
        <tr>
          <td class="td-title">已打包丝锭数量</td>
          <td>{{tableData.packedSilkCount}}锭</td>
          <td class="td-title">已打包箱锭</td>
          <td>{{tableData.packedBoxCount}}锭</td>
          <td class="td-title">已打印数量</td>
          <td>{{tableData.printedCount}}锭</td>
        </tr>
        <tr>
          <td class="td-title">计划生产数量</td>
          <td>{{tableData.planProductionCount}}锭</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'main-breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        workshopOptions: [],
        timeOptions: [
          { name: '2小时', id: '2' },
          { name: '4小时', id: '4' },
          { name: '6小时', id: '6' }
        ],
        search: {
          workshop: '',
          time: '2'
        },
        tableData: {},
        loading: {
          table: false
        }
      }
    },
    mounted () {
      this.getWorkshopOptions()
    },
    methods: {
      getWorkshopOptions () {
        this.loading.table = true
        api.automatic.dictionary.getAllWorkshopList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.workshopOptions = data.data
            this.search.workshop = this.workshopOptions[0].id
            this.getData()
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getData () {
        this.loading.table = true
        let params = {
          workshopId: this.search.workshop,
          pastTime: this.search.time
        }
        api.automatic.statement.getWorkShopProductResult(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.tableData = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .all-wrapper{
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    border-radius: 3px;
  }
  .el-select{
    margin-right: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  td{
    padding-left: 10px;
    border: 1px solid #d9dfe5;
    width: 12.5%;
  }
  .td-title{
    background-color: #eef2f6;
    height: 42px;
    line-height: 42px;
  }
</style>
