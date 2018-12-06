<template>
  <div>
    <div class="title-wrapper">
      <h1 class="tc">版本日志</h1>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="5"><div class="lineX"></div></el-col>
        <el-col :span="3"><p>Release Notes</p></el-col>
        <el-col :span="5"><div class="lineX"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="3">
          <div class="release-box">
            <div class="title">WEB</div>
            <ul>
              <li @click="releaseShow(item.versionContent)" v-for="(item, index) in releaseDate[0].versionInfoBoList">
                {{index + 1}}、{{item.versionTitle}}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="release-box">
            <div class="title">PDA</div>
            <ul>
              <li @click="releaseShow(item.versionContent)" v-for="(item, index) in releaseDate[1].versionInfoBoList">
                {{index + 1}}、{{item.versionTitle}}
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="title-wrapper tc">
      <h1>项目进度</h1>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="5"><div class="lineX"></div></el-col>
        <el-col :span="3"><p>Project Progress</p></el-col>
        <el-col :span="5"><div class="lineX"></div></el-col>
      </el-row>
    </div>
    <div class="tc" style="padding-bottom: 60px"><img style="max-width:95%;margin: 0 auto;" src="./jindu.jpg"/></div>
    <el-dialog title="详细信息" :visible.sync="releaseDialogShow" width="50%">
      <ul>
        <li style="padding-left: 10px" v-for="(item, index) in releaseDetail">{{index + 1}}、{{item}}</li>
      </ul>
    </el-dialog>
    <!--<el-row class="content" :gutter="20"  type="flex" justify="center">-->
      <!--<template  v-for="item in tableRate">-->
        <!--<el-col :span="10">-->
          <!--<div class="box-wrapper">-->
            <!--<h2 class="cf">{{item.title}}<span class="fr">{{item.date}}</span></h2>-->
            <!--<div class="process-wrapper tc">-->
              <!--<el-row class="date-wrapper">-->
                <!--<div class="rate" :style="'width:'+item.rate"></div>-->
                <!--<el-col :span="6"><div class="grid-content">第一个月</div></el-col>-->
                <!--<el-col :span="6"><div class="grid-content">第二个月</div></el-col>-->
                <!--<el-col :span="6"><div class="grid-content">第三个月</div></el-col>-->
                <!--<el-col :span="6"><div class="grid-content">第四个月</div></el-col>-->
              <!--</el-row>-->
              <!--<template v-for="child in item.children">-->
                <!--<el-row class="task-wrapper">-->
                  <!--<el-col :span="child.span" :offset="child.offset"><div class="rate" :style="'width:'+child.rate"></div><div class="grid-content">{{child.title}}</div></el-col>-->
                <!--</el-row>-->
              <!--</template>-->
            <!--</div>-->
          <!--</div>-->
        <!--</el-col>-->
      <!--</template>-->
    <!--</el-row>-->
    <!--<el-row class="content">-->
      <!--<el-col :span="20" :offset="2">-->
        <!--<el-table-->
          <!--:data="tableData"-->
          <!--stripe-->
          <!--style="width: 100%">-->
          <!--<el-table-column-->
            <!--type="index"-->
            <!--label="序号"-->
            <!--width="80">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="title"-->
            <!--label="任务名称"-->
            <!--show-overflow-tooltip>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="name1"-->
            <!--label="集控负责人"-->
            <!--show-overflow-tooltip>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="name2"-->
            <!--label="恒逸负责人"-->
            <!--show-overflow-tooltip>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="date"-->
            <!--label="完工日期"-->
            <!--show-overflow-tooltip>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</el-col>-->
    <!--</el-row>-->

  </div>
</template>

<script>
  import * as api from 'src/api/other'
  export default {
    data () {
      return {
        releaseDate: [
          {versionInfoBoList: []},
          {versionInfoBoList: []}
        ],
        releaseDialogShow: false,
        releaseDetail: [],
        tableRate: [{
          id: 1,
          title: '自动化设备集成管理系统',
          date: '2017/5/15—2017/9/15',
          rate: '20%',
          children: [{
            id: 1, title: '项目准备阶段', rate: '95%', span: 5, offset: 0
          }, {
            id: 2, title: '项目方案确定阶段', rate: '70%', span: 7, offset: 0
          }, {
            id: 3, title: '项目开发阶段', rate: '8%', span: 11, offset: 4
          }, {
            id: 4, title: '项目部署测试阶段', rate: '0%', span: 9, offset: 10
          }, {
            id: 5, title: '项目开发阶段', rate: '0%', span: 4, offset: 20
          }]
        }, {
          id: 2,
          title: '产品品质数据库系统',
          date: '2017/5/15—2017/9/15',
          rate: '20%',
          children: [{
            id: 1, title: '项目准备阶段', rate: '95%', span: 5, offset: 0
          }, {
            id: 2, title: '项目方案确定阶段', rate: '70%', span: 7, offset: 0
          }, {
            id: 3, title: '项目开发阶段', rate: '8%', span: 11, offset: 4
          }, {
            id: 4, title: '项目部署测试阶段', rate: '0%', span: 9, offset: 10
          }, {
            id: 5, title: '项目开发阶段', rate: '0%', span: 4, offset: 20
          }]
        }],
        tableData: [{
          date: '2016-05-02',
          title: '产品品质质量数据库管理系统',
          name1: '王小虎',
          name2: '王小虎'
        }, {
          date: '2016-05-02',
          title: '任务一',
          name1: '王小虎',
          name2: '王小虎'
        }, {
          date: '2016-05-02',
          title: '任务一',
          name1: '王小虎',
          name2: '王小虎'
        }, {
          date: '2016-05-02',
          title: '任务一',
          name1: '王小虎',
          name2: '王小虎'
        }, {
          date: '2016-05-02',
          title: '任务一',
          name1: '王小虎',
          name2: '王小虎'
        }]
      }
    },
    mounted () {
//      this.getReleaseData()
    },
    methods: {
      getReleaseData () {
        api.getVersionNoticeList({}).then(response => {
          let data = response.data.data
          if (response.data.messageType === 1) {
            console.log(data)
            this.releaseDate = data
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      releaseShow (detail) {
        this.releaseDetail = detail
        this.releaseDialogShow = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .title-wrapper {
    padding: 50px 0;
    h1{color:#000;font-size: 30px}
    p{color: #929ba4;font-size: 18px;line-height: 40px;}
    .lineX{height:20px;border-bottom: 1px solid #d6d7d7}
  }
  .release-box {
    height: 200px;
    overflow: auto;
    background-color: #f6f7f9;
    padding: 10px;
    .title{
      width: 100px;
      background-color: #3a9dd8;
      color: #fff;
      text-align: center;
      line-height: 34px;
      font-size: 18px;
    }
    li{
      margin-top: 10px;
      margin-left: 8px;
      cursor: pointer;
    }
  }
  .content{
    padding: 0 0 35px 0;
    .box-wrapper{
      background: #f5f7f9;
      height: 330px;
      padding: 0px 15px;
      border: 1px solid #eaeef2;
      h2{
        color: #000;
        font-size: 20px;
        font-weight: bold;
        line-height: 70px;
        margin: 0;
        span{
          font-size: 16px;
          font-weight: normal;
        }
      }
    }
  }

  .process-wrapper{
    color:#fff;
    .el-row {
      margin-bottom: 10px;
      &:last-child {
       margin-bottom: 0px;
     }
    }
    .date-wrapper{
       background: #bcc2c9;
       position: relative;
       .rate{
         width: 0%;
         max-width: 100%;
         height: 100%;
         position: absolute;
         top: 0;
         left: 0;
       }
      .grid-content{
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        border-right: 1px solid #f5f7f9;
        position: relative;
      }
    }
    .task-wrapper{
      .el-col{position: relative;background: #bcc2c9;}
      .rate{
        width: 0%;
        max-width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .grid-content{
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        position: relative;
      }
    }
  }

</style>
