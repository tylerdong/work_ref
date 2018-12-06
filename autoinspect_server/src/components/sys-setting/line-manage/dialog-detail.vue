<template>
  <el-dialog title="详情" :visible.sync="dialog.visible" width="55%" center>
    <div class="detail">
      <ul>
        <li><label>编号：</label><span>{{detail.code ? detail.code : '未配置'}}</span></li>
        <li><label>公司：</label><span>{{detail.company ? detail.company : '未配置'}}</span></li>
        <li><label>工厂：</label><span>{{detail.factory ? detail.factory : '未配置'}}</span></li>
        <li><label>车间：</label><span>{{detail.workshop ? detail.workshop : '未配置'}}</span></li>
        <li><label>名称：</label><span>{{detail.name ? detail.name : '未配置'}}</span></li>
        <li><label>版本：</label><span>{{detail.pcVersion ? detail.pcVersion : '未配置'}}</span></li>
        <li><label>产品类型：</label><span>{{detail.producttype ? detail.producttype : '未配置'}}</span></li>
        <li><label>班次数：</label><span>{{detail.classesnum ? detail.classesnum : '未配置'}}</span></li>
        <li><label>推送ip：</label><span>{{detail.ipAddr ? detail.ipAddr : '未配置'}}</span></li>
        <li><label>班次开始时间：</label><span>{{detail.classstarttime ? detail.classstarttime : '未配置'}}</span></li>
        <li><label>应用入口：</label><span>{{detail.appentrance ? detail.appentrance : '未配置'}}</span></li>
        <li><label>应用名称：</label><span>{{detail.appname ? detail.appname : '未配置'}}</span></li>
        <li><label>日志上传开始日期：</label><span>{{detail.logUploadStartTime ? detail.logUploadStartTime : '未配置'}}</span></li>
        <li><label>日志上传目录：</label><span>{{detail.logUploadDir ? detail.logUploadDir : '未配置'}}</span></li>
        <li><label>表同步开关：</label><span>{{detail.isayntable | booleanValue}}</span></li>
        <li><label>缺陷图片同步开关：</label><span>{{detail.isayndefectimage  | booleanValue}}</span></li>
        <li><label>截批预警开关：</label><span>{{detail.isabort  | booleanValue}}</span></li>
        <li><label>等外品预警开关：</label><span>{{detail.isshuffs  | booleanValue}}</span></li>
        <li><label>班次汇总预警开关：</label><span>{{detail.isclasscollect  | booleanValue}}</span></li>
        <li><label>创建时间：</label><span>{{detail.gmtCreate  | timeFormat('YYYY-MM-DD HH:mm:ss')}}</span></li>
        <li><label>更新时间：</label><span>{{detail.gmtModified | timeFormat('YYYY-MM-DD HH:mm:ss')}}</span></li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialog.visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      detail: {},
      dialog: {visible: false}
    }
  },
  methods: {
    show (data) {
      this.dialog.visible = true
      console.log(data)
      this.detail = data
    }
  }
}
</script>

<style lang="scss" scoped>
  $li-height: 2rem;
  .detail {
    ul {
      list-style: none;
      li {
        width: 80%;
        height: $li-height;
        line-height: $li-height;
        label {
          display: inline-block;
          width: 43%;
          text-align: right;
          font-weight: 600;
        }
        span {
          padding-left: 1rem;
        }
      }
    }
  }
</style>
