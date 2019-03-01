<style lang="less" scoped>
.search-bar {
  margin-bottom: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>

<template>
  <div>
    <div>
      <div class="search-bar clearfix">
        菜单管理
        <Select
          v-model="currentSystemId"
          style="width:200px"
        >
          <Option
            v-for="item in systemList"
            :value="item.id"
            :key="item.id"
          >{{ item.name }}</Option>
        </Select>
               添加时间：
        <DatePicker
          :value="[searchParams.startTime,searchParams.endTime]"
          @on-change="dataChange"
          format="yyyy/MM/dd"
          transfer = transfer
          type="daterange"
          placement="bottom-end"
          placeholder="Select date"
          style="width: 200px;margin-right:10px;"
        ></DatePicker>
        <Input
          @on-change="handleClear"
          clearable
          placeholder="输入关键字搜索"
          class="search-input"
          style="width:250px;margin-right:10px;"
          v-model="searchParams.keywords"
        /></Input>
        <Button
          @click="getListData"
          class="search-btn"
          type="primary"
        >搜索</Button>

      </div>
      <div class="mb-20">
        <tables
          ref="tables"
          editable
          v-model="tableData"
          :columns="columns"
          @on-delete="handleDelete"
        />
      </div>
      <Page
        @on-change="changePage"
        :total="totalRecords"
        :current="searchParams.page"
        show-total
      />
    </div>
  </div>
</template>
<script>
import {getLogs,ajaxGetAllSystem} from '../../api/data.js'
import Tables from '_c/tables'
import { getTime } from '@/libs/tools'
export default {
  name: 'dict-manager-audit',
  components: {
    Tables
  },
  data () {
    return {
      searchParams: {
        startTime:'2018-01-01',
        endTime:'2019-02-15',
        field: 'd',
        keywords: '',
        page: 1,
        limit: 10,
        currentSystemId:''
      },
      totalRecords: 0,
      columns: [
        { title: '序号', key: 'id',width:80 },
        { title: '菜单', key: 'menu',minWidth:100 },
        { title: '操作', key: 'opt',minWidth:100 },
        { title: '资源路径', key: 'uri',minWidth:100 },
        { title: '操作时间', key: 'crtTime',minWidth:100 },
        { title: '操作人ID', key: 'crtUser' ,minWidth:100},
        { title: '操作人', key: 'crtName',minWidth:150 },
        { title: '操作主机', key: 'crtHost',minWidth:120 },
      ],
      tableData: [],
      modalshow: false,
      transfer:true,
      currentSystemId:'1',
      systemList:''
    }
  },
  methods: {
    handleDelete (params) {

    },
    handleClear(params){

    },
    dataChange(dataArr){
      this.searchParams.startTime=dataArr[0];
      this.searchParams.endTime=dataArr[1];
    },
    getListData () {
      this.searchParams.currentSystemId=this.currentSystemId;
      getLogs(this.searchParams).then(res => {
        this.tableData = res.data.data
        this.tableData.map((v, i) => {
          v.crtTime = getTime(v.crtTime)
          v.opt = v.opt.toString()
          return v
        })
        this.totalRecords = res.data.totalRecord
      })
    },
    changePage (page) {
      this.searchParams.page = page
      this.getListData()
    },
    changePageSize (size) {
      this.searchParams.page = 1
      this.searchParams.limit = size
      this.getListData()
    },
    // 获取系统列表
    getSystemData () {
      const that = this;
      ajaxGetAllSystem()
        .then(res => {
          that.systemList = res.data;
          that.currentSystemId = res.data[0].id
        })
        .catch(error => {
          Message.error(error);
        });
    },
  },
  mounted () {
   this.getListData()
   this.getSystemData();
  }
}
</script>
