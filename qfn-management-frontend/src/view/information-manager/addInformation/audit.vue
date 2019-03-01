<template>
  <div class="addInformationAudit">
    <Card shadow>
      <p slot="title">新增资讯:编辑</p>
      <div class="mb-20 clearfix">
        <Form ref="formAudit" :model="form" :label-width="80" :rules="ruleCustom" style="width: 750px;margin:0 auto;">
          <FormItem label="文章标题" prop="title">
              <Input v-model="form.title" placeholder="文章标题小于30字"></Input>
          </FormItem>
          <FormItem label="文章内容" prop="content">
            <editor ref="editor" :value="form.content" @on-change="handleChange"/>
          </FormItem>
          <div class="clearfix">
            <FormItem label="敏感词提示" style="float:left;width:400px;">
              <Input v-model="sentensiveWord" placeholder="" disabled></Input>
            </FormItem>
            <FormItem label="敏感词检测" style="float:right">
              <Button type="primary" @click="checkWord">检测</Button>
            </FormItem>
          </div>
          <div class="clearfix">
            <FormItem label="媒体平台" style="float:left" prop="mediaPlatform">
              <Input v-model="form.mediaPlatform" placeholder=""></Input>
            </FormItem>
            <FormItem label="文章作者"  style="float:right" prop="author">
                <Input v-model="form.author" placeholder=""></Input>
            </FormItem>
          </div>
          <FormItem label="文章类型" prop="type" style="width: 250px;">
            <Select v-model="form.type">
              <Option v-for="item in articleType" :value="item.key" :key="item.key">{{ item.content }}</Option>
            </Select>
          </FormItem>
          <FormItem style="text-align:center;">
            <Button @click="handleReset" style="margin-right: 8px">存草稿</Button>
            <Button type="primary" @click="handleSubmit('formAudit')">提交审核</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
import Editor from '_c/editor'
import { getAllArticleType,checkPreArticleInfo,addPreArticleInfo,getPrePreArticleById,updatePreArticleInfo} from '@/api/information'
export default {
  components: {
    Editor
  },
  // props:{
  //   id:{
  //     type:String
  //   }
  // },
  data(){
    return{
      form:{author:"知化",mediaPlatform:"化纤之家"},
      articleType:[],
      ruleCustom:{
        title: [
          { required: true, message: '文章标题为必填项', trigger: 'blur' }
        ],
        mediaPlatform: [
          { required: true, message: '媒体平台为必填项', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '文章作者为必填项', trigger: 'blur' }
        ],
        content:[
          { required: true, message: '文章内容为必填项', trigger: 'blur' }
        ],
        type:[
          { required: true, message: '文章类型为必填项', trigger: 'blur' }
        ]
      },
      content: '',
      sentensiveWord:''
    }
  },
  watch: {
    '$route' (to, from) {
        //加判断主要发现这个加载了之后，容易引起其他页面也发送请求，加了条件判断，解决了其他页面请求数据加载的问题
        if(this.$route.params.id){
            getPrePreArticleById({id:this.$route.params.id}).then(res=>{
              this.form = res.data;
              this.$refs.editor.setHtml(res.data.content);
            })
        }else{
          this.form={author:"知化",mediaPlatform:"化纤之家"}
          this.$refs.editor.setHtml("");
        }

    }
  },
  methods:{
    //提交审核
    handleSubmit (name) {
      let that=this;
      this.$refs[name].validate((valid) => {
          if (valid) {
            this.checkWord('submit')
          }
      })
    },
    //存草稿
    handleReset () {
      let that=this;
      this.$refs.formAudit.validate((valid) => {
          if (valid) {
            this.form.status=1;
            this.updateOrAdd();
          }
      })
    },
    updateOrAdd(){
      if(this.$route.params.id){
        updatePreArticleInfo(this.form).then(res=>{
          if(res.code==1000){
            this.closeCurrent()
          }else{
            this.$Message.error('修改不成功');
          }
        })
      }else{
        addPreArticleInfo(this.form).then(res=>{
          if(res.code==1000){
            this.closeCurrent()
          }else{
            this.$Message.error('添加不成功');
          }
        })
      }
    },
    //处理编辑器变化
    handleChange (html, text) {
      if (html)this.form.content = html
    },
    //敏感词检测
    checkWord(param){
      let that =this;
      checkPreArticleInfo(this.form).then(res=>{
        that.sentensiveWord=res.data;
        if(param =='submit'){
          if(res.data.length==0){
          this.$Modal.confirm({
            title: '提示',
            closable: true,
            content: `是否确定提交`,
            onOk: () => {
              this.form.status=2;
              this.updateOrAdd();
            }
          })
        }else{
          let str=JSON.stringify(res.data)
          this.sentensiveWord=str;
          this.$Modal.confirm({
            title: '提示',
            closable: true,
            content: `当前文章还存在敏感词，是否继续提交`,
            onOk: () => {
              this.form.status=2;
              this.updateOrAdd();
            }
          })
        }
        }
      })
    }
  },
  mounted(){
    if(this.$route.params.id){

    }
  },
  created(){
    getAllArticleType().then(res=>{
      this.articleType=res.data;
    })
    if(this.$route.params.id){
        getPrePreArticleById({id:this.$route.params.id}).then(res=>{
        this.form = res.data;
        this.$refs.editor.setHtml(res.data.content);
      })
    }

  }
}
</script>
<style lang="less">
.addInformationAudit{
  .toolbar {
    border: 1px solid #ccc;
  }
  .editor {
    border: 1px solid #ccc;
    height: 400px;
  }
}
</style>
