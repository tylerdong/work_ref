<template>
  <div class="addInformation">
    <Card shadow>
      <p slot="title">新增资讯</p>
      <div class="mb-20 clearfix">
        创建时间：
        <DatePicker :value="[search.startTime,search.endTime]"
                    format="yyyy-MM-dd"
                    transfer=transfer
                    type="daterange"
                    placement="bottom-end"
                    placeholder="选择时间区间"
                    @on-change="handleDateChange"
                    style="margin-top:10px;"
                    class="length-16-6rem m-r-10 mt-10"></DatePicker>
        文章类型：
        <Select v-model="search.type" class="length-16-6rem m-r-10" style="width:100px;" clearable>
          <Option v-for="item in typeList" :value="item.key" :key="item.key">{{ item.content }}</Option>
        </Select>
        文章状态：
        <Select v-model="search.status" class="m-r-10 " style="width:100px;" clearable>
          <Option v-for="item in statusList" :value="item.key" :key="item.key">{{ item.content }}</Option>
        </Select>
        标题搜索：
        <Input type="text" v-model="search.title" style="width:220px;margin-right:10px;"></Input>
        <Button @click="getData" class="getData-btn " type="primary" :loading="loading">搜索</Button>
        <Button type="success" @click="addAirticle" class="fr m-l-10" v-check-promission="elements.information.addInformation.index.create" style="margin-top:10px;">添加文章</Button>
      </div>
      <Table :loading="loading" ref="selection" :data="table.data" :columns="table.columns" class="table-bottom-20"></Table>
      <Page class="page-bottom-1"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          :total="page.total"
          :current="page.current"
          :page-size="page.pageSize"
          :page-size-opts="page.pageSizes"
          show-sizer
          show-total/>
    </Card>
  </div>
</template>
<script>
import { getRelativeTime,getTime } from '@/libs/tools'
import { getAllArticleStatus,getAllArticleType,deletePrePreArticleById,getAllPreArticleForPage,getAllArticleSource } from '@/api/information'
import elements from '@/config/elements'
export default {
  data() {
    return {
      search:{
        startTime:'',
        endTime:'',
        status:'',
        type:'',
        title:'',
        pageIndex:1,
        pageCount:20
      },
      loading: true,
      typeList:[],
      statusList:[],
      sourceList:[],
      table: {
        data: [],
        columns: [
          { title: "序号", width: 100, key: "id", align: "center" },
          { title: "标题", minWidth: 200, key: "title", align: "center" },
          { title: "文章类型", width: 250, key: "type", align: "center",render: (h,params)=>{
              return h('div',
                this.typeList.map((v,i)=>{
                  if(v.key==params.row.type){
                    return v.content
                  }
                })
              )
          }},
          { title: "文章来源", width: 100, key: "source", align: "center",render: (h,params)=>{
              return h('div',
                this.sourceList.map((v,i)=>{
                  if(v.key==params.row.source){
                    return v.content
                  }
                })
              )
          } },
          { title: "创建人", width: 100, key: "creator", align: "center" },
          { title: "更新时间", width: 200, key: "publishTime", align: "center" ,render: (h,params)=>{
              return h('div',
                  getTime(new Date(params.row.gmtModified),'second')
              )
          }},
          { title: "文章状态", width: 100, key: "dateUnit", align: "center",render: (h,params)=>{
              return h('div',
                this.statusList.map((v,i)=>{
                  if(v.key==params.row.status){
                    return v.content
                  }
                })
              )
          } },
          { title: "操作", width: 150, key: "status",fixed: 'right', align: "center",render: (h, params) => {
              if(params.row.status==1){
                return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                            this.$router.push({ path: `audit/${params.row.id}` })
                          }
                      }
                  }, '修改'),
                  h('Button', {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                  }, [h('Poptip', {
                    props: {
                      confirm: true,
                      transfer: true,
                      placement: 'left-end',
                      title: '确定是否删除？',
                      type: 'error',
                      size: 'small',
                      width: '200'
                    },
                    on: { 'on-ok': () => {
                              this.singleDisId=params.row.id
                              deletePrePreArticleById({id:this.singleDisId}).then(res=>{
                                this.getData();
                              })
                            } }
                  }, '删除')])
                ]);
              }else{
                return h('div', [
                  h('Button', {
                      props: {
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                            this.goDetail(params.row.id)
                          }
                      }
                  }, '详情')
                ])}
            }
          }
        ]
      },
      page: { total: 0, current: 1, pageSize: 20, pageSizes: [20, 30, 40, 50] },
      elements:elements
    }
  },
  methods:{
    pageChange(index) {
      this.page.current = index;
      this.search.pageIndex=index;
      this.getData();
    },
    pageSizeChange(size) {
      this.page.pageSize = size;
      this.search.pageCount =size;
      this.search.pageCount=size;
      this.getData();
    },
    handleDateChange(dataArr){
      this.search.startTime=dataArr[0];
      this.search.endTime=dataArr[1];
    },
    getData(){
      // var statusList=''
      // this.search.statusList.forEach((v,i,arr)=>{
      //   if(i!=arr.length-1){
      //     statusList+=v
      //     statusList+=','
      //   }else{
      //     statusList+=v
      //   }
      // })
      let params = {...this.search};
      if(params.productClassName=='全部'){
        params.productClassName=''
      }
      getAllPreArticleForPage(params).then(res=>{
        this.loading=false
        this.table.data=res.data.list;
        this.page.total=res.data.count;
        this.page.current=res.data.pageIndex;
      });
    },
    addAirticle(){
      this.$router.push({ path: 'audit' })
    },
    goDetail(id){
      this.$router.push({ path: `../informationDetail/${id}` })
    },
    getStatus(status){
      switch (status){

      }
    },
  },
  created(){
    Promise.all([getAllArticleSource(),getAllArticleStatus(),getAllArticleType()]).then(res=>{
      let data = []
      for (let i = 0; i < res.length; i++) {
        if (res[i].code === 1000) {
          data = res[i].data
          if (i === 0) this.sourceList=data;
          if (i === 1) this.statusList = data
          if (i === 2) this.typeList = data
        } else {
          if (i === 0) this.sourceList = []
          if (i === 1) this.statusList = []
          if (i === 2) this.typeList = []
        }
      }
      this.getData()
    })
  }
}
</script>
<style lang="less">
  .addInformation{

  }
</style>


