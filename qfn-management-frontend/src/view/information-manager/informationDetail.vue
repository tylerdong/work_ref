<template>
  <div class="informationDetail">
    <Card>
      <p slot="title">资讯详情</p>
      <div>
        <Button type='primary' @click="goback">返回</Button>
      </div>
      <Form ref="formAudit" :label-width="100" style="width: 750px;margin:0 auto;">
        <FormItem label="文章标题：">
            <p class='border'>{{info.title}}</p>
        </FormItem>
        <FormItem label="文章内容：">
          <div v-html="info.content" class='border'></div>
        </FormItem>
        <div class="clearfix">
          <FormItem label="文章时间：" style="float:left;width:300px;margin-right:10px;">
            <p>{{timeToFormat(info.publishTime)}}</p>
          </FormItem>
          <FormItem label="媒体平台：" style="float:left;width:200px;">
            <p>{{info.mediaPlatform}}</p>
          </FormItem>
          <FormItem label="文章作者：" style="float:right">
            <p>{{info.author}}</p>
          </FormItem>
        </div>
        <FormItem label="简讯推荐：">
          <p class='border'>{{info.isRecommand=='y'?'推荐':'无推荐'}} <span v-if="info.isRecommand=='y'">{{info.is_guidance=='N'?'无引导':'有引导'}}</span></p>
        </FormItem>
        <FormItem label="摘要：" v-if="info.summary">
          <p class='border'>{{info.summary}}</p>
        </FormItem>
        <FormItem label="编辑备注：">
          <p :class="{ 'border': info.remark}">{{info.remark}}</p>
        </FormItem>
        <FormItem label="文章摘要：">
          <p :class="{ 'border': info.summary}">{{info.summary}}</p>
        </FormItem>
        <!-- <div label="文章申明：" class="declares">
          <label class="ivu-form-item-label" style="width: 100px;">文章申明：</label>
          <RadioGroup v-model="info.declareType"  disabled>
              <Radio v-for="(item, index) in declareType" class="radio" :key="index" :label="item.key" style="float:left;">
                <div class="detail">{{item.content}}</div>
              </Radio>
          </RadioGroup>
        </div> -->
        <FormItem label="文章申明">
          <RadioGroup v-model="info.declareType" class="declare">
            <Radio v-for="(item, index) in declareType" class="radio" :key="index" :label="item.key">
              <div class="detail">{{item.content}}</div>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="产品关联属性:" prop="articleType">
        <div :class="{ 'border': info.relatedProduct}">
          <span >{{info.relatedProduct}}</span>
        </div>
        </FormItem>
        <FormItem label="企业关联属性:" prop="articleType">
          <div :class="{ 'border': info.company}">
            <span>{{info.company}}</span>
          </div>
        </FormItem>
        <FormItem label="文章标签:" prop="articleType">
          <div :class="{ 'border': info.tag}">
            <span style="margin-left:5px;padding:5px;">{{info.tag}}</span>
          </div>
        </FormItem>
        <FormItem label="审核状态:" prop="articleType">
        <p :class="{ 'border': getStatus(info.status)}">{{getStatus(info.status)}}</p>
        </FormItem>
        <FormItem label="审核备注:" prop="articleType">
          <p :class="{ 'border': info.examineComment}">{{info.examineComment}}</p>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { getTime } from '@/libs/tools'
import { getPrePreArticleById,getAllArticleStatus,getAllDeclareType } from '@/api/information'
export default {
  data(){
    return{
      info:{},
      statusList:[],
      declareType:[]
    }
  },
  watch: {
    '$route' (to, from) {
        //加判断主要发现这个加载了之后，容易引起其他页面也发送请求，所以加了笨方法，加了条件判断，解决了其他页面请求数据加载的问题
        if(this.$route.params.id){
            getPrePreArticleById({id:this.$route.params.id}).then(res=>{
              this.info=res.data;
            })
        }

    }
  },
  methods:{
    timeToFormat(time){
      return getTime(time,'second')
    },
    getStatus(status){
      for(let v of this.statusList){
        if(v.key==status){
          return v.content
        }
      }
    },
    goback(){
      this.$router.push({path:'../addInformation/index'})
    }
  },
  created(){
    Promise.all([getPrePreArticleById({id:this.$route.params.id}),getAllArticleStatus(),getAllDeclareType()]).then(res=>{
      let data = []
      for (let i = 0; i < res.length; i++) {
        if (res[i].code === 1000) {
          data = res[i].data
          if (i === 0) this.info=data;
          if (i === 1) this.statusList = data
          if (i === 2) this.declareType = data
        }
      }
    })
    // console.log(this.getStatus(2));
  }
}
</script>
<style lang="less">
.informationDetail{
  .form {
    width: 750px;
    margin:0 auto;
    .item {
      float: left;
    }
  }
  .declare {
    width: 100%;
    display: flex;
    flex-direction: row;
    .radio {
      display: flex;
      align-items: start;
      justify-content: space-between;
      div {
        white-space: normal;
        display: inline-block;
        word-wrap: break-word;
        word-break: normal;
        border: 1px solid #e9e9e9;
        padding: 5px;
      }
    }
  }
  .border{
    padding-left: 15px;
    border:1px solid #ccc;
  }
}

</style>
