<template>
  <div class="">
    <Card shadow>
      <p slot="title">文章审核</p>
      <div class="mb-20 clearfix">
        <Form :model="form" :rules="rules" ref="form" label-position="right" :label-width="180" class="form">
          <FormItem label="审核不通过备注">
            {{form.examineComment}}
          </FormItem>
          <FormItem label="文章封面">
            <div class="fl upload-div">
              <Upload :action="uploadAction"
                      :on-success="uploadSuccess"
                      :on-error="uploadError"
                      :on-format-error="formatError"
                      :show-upload-list="false"
                      :format="['psd','jpeg', 'jpg','png','gif','webp','tiff','bmp']"
                      :max-size="51200">
                <Button icon="ios-cloud-upload-outline" type="primary">上传</Button>
              </Upload>
              <img class="img-in-dialog clear" :src="form.coverFdfsUrl" alt="封面">
            </div>
          </FormItem>
          <FormItem label="文章标题" prop="title">
            <Input v-model="form.title" placeholder="请输入文章标题"/>
          </FormItem>
          <FormItem label="文章内容">
            <editor ref="content" :value="form.content" @on-change="handleChange"/>
          </FormItem>
          <div class="clearfix">
            <form-item label="文章时间" class="item">{{form.gmtModified | timeFormat('YYYY-MM-DD HH:mm')}}</form-item>
            <form-item label="媒体平台" class="item">{{form.mediaPlatform}}</form-item>
            <form-item label="文章作者" class="item">{{form.author}}</form-item>
          </div>
          <div class="clearfix">
            <Form-item label="厂家标识" class="item">
              <Tag v-if="form.company" v-for="(item, index) in form.company.split(',')" :key="index" color="primary" >{{item}}</Tag>
            </Form-item>
            <Form-item label="文章类型" class="item">{{form.type}}</Form-item>
          </div>
          <div class="clearfix">
            <FormItem label="敏感词提示" class="item">
              <span class="alive" v-if="aliveWord" v-for="(word, index) in aliveWord.split(',')" :key="index">{{word}}</span>
            </FormItem>
            <FormItem class="fr">
              <Button type="primary" @click="checkWord" size="small" :loading="loading.check">敏感词识别</Button>
            </FormItem>
          </div>
          <FormItem label="简讯推荐">
            <RadioGroup v-model="form.isRecommand" class="recommend">
              <Radio label="y">推荐</Radio>
              <Radio label="n">不推荐</Radio>
            </RadioGroup>
            <RadioGroup v-model="form.isGuidance" v-if="form.isRecommand === 'y'">
              <Radio label="n">引导详情内容</Radio>
              <Radio label="y">无引导</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class="short-edi" label="文章摘要">
            <Input v-model="form.summary"  type="textarea" placeholder="请输入文章摘要"/>
          </FormItem>
          <FormItem class="short-edi" label="编辑备注">
            <Input v-model="form.remark"  type="textarea" placeholder="请输入编辑备注"/>
          </FormItem>
          <FormItem style="text-align:center;">
            <Button type="error" @click="btnDiscard" class="m-r-10">废弃</Button>
            <Button type="primary" @click="btnConfirm">确定</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
import api from '@/api'
export default {
  components: {
    'editor': require('../../../components/editor/editor').default
  },
  data () {
    return {
      option: {types: []},
      uploadAction: '',
      form: {
        id: '',
        coverFdfsUrl: '',
        title: '',
        content: '',
        gmtModified: '',
        mediaPlatform: '',
        author: '',
        isRecommand: '',
        isGuidance: '',
        summary: '',
        examineComment: '',
        company: '',
        type: '',
        tag: '',
        status: '',
        remark: ''
      },
      aliveWord: '',
      rules: {
        title: [{required: true, message: '请输入文章标题', trigger: 'blur change'}]
      },
      loading: { confirm: false, check: false }
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let baseUrl = this.getCurrentBaseUrl()
    this.uploadAction = `${baseUrl}pretreatment/controller/themevideo/upload`
  },
  methods: {
    getData () {
      Promise.all([api.information.getAllArticleType()]).then(res => {
        let data = []
        for (let i = 0; i < res.length; i++) {
          if (res[i].code === 1000) {
            data = res[i].data
            if (i === 0) this.option.types = data
          }
        }
        this.form.id = this.$route.params.id
        this.getDetail()
      })
    },
    getDetail () {
      api.information.getPrePreArticleById({id: this.form.id}).then(res => {
        if (res.code === 1000) {
          let data = res.data
          this.form.id = data.id
          this.form.title = data.title
          this.form.coverFdfsUrl = data.coverFdfsUrl
          this.$refs.content.setHtml(data.content)
          this.form.content = data.content
          this.form.gmtModified = data.gmtModified
          this.form.mediaPlatform = data.mediaPlatform
          this.form.author = data.author
          this.form.isRecommand = data.isRecommand
          this.form.isGuidance = data.isGuidance
          this.form.summary = data.summary
          this.form.examineComment = data.examineComment
          this.form.type = this.option.types.find(item => item.key === data.type.toString()).content
          this.form.company = data.company ? data.company : ''
          this.form.status = data.status
          this.form.remark = data.remark
        }
      }).catch(e => {
        this.$Message.error(e.message)
      })
    },
    checkWord () {
      let data = {
        title: this.form.title,
        content: this.form.content,
        isRecommand: this.form.isRecommand,
        isGuidance: this.form.isGuidance,
        summary: this.form.summary,
        examineComment: this.form.examineComment
      }
      this.loading.check = true
      api.information.checkPreArticleInfo(data).then(res => {
        if (res.code === 1000) {
          if (res.data) {
            this.aliveWord = res.data
            this.$Message.warning(`标题，内容中有敏感词："${res.data}"`)
          } else {
            this.$Message.warning(`标题，内容中没有有敏感词`)
          }
        } else {
          this.$Message.error(res.message)
        }
      }).catch(e => {
        this.$Message.error(e.response.data.message)
      }).finally(() => {
        this.loading.check = false
      })
    },
    handleChange (html, text) {
      if (html) this.form.content = html
    },
    btnConfirm () {
      if (this.form.isRecommand === 'y' && (this.form.summary === '' || this.form.summary === undefined)) {
        return this.$Message.error('请填写文章摘要')
      }
      let data = {
        id: this.form.id,
        title: this.form.title,
        content: this.form.content,
        isRecommand: this.form.isRecommand,
        isGuidance: this.form.isGuidance,
        summary: this.form.summary,
        examineComment: this.form.examineComment,
        status: this.form.status
      }
      api.information.checkPreArticleInfo(data).then(res => {
        if (res.code === 1000) {
          this.aliveWord = res.data
          if (res.data) {
            this.$Modal.confirm({
              title: '提示',
              closable: true,
              content: `标题，内容中有敏感词："${res.data}"，确定要提交？`,
              onOk: () => { this.confirm(data) }
            })
          } else {
            this.confirm(data)
          }
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    // 废弃
    btnDiscard () {
      this.$Modal.confirm({
        title: '废弃确认',
        content: `确认要废弃资讯<strong style="color:#ff9900">《${this.form.title}》</strong> ，请谨慎操作！`,
        onOk: () => {
          api.information.discardPrePreArticleById({id: this.form.id}).then(response => {
            if (response.code === 1000) {
              this.$Message.success(response.message)
              this.closeCurrent()
              this.goToTab('informationAudit:index')
            } else {
              this.$Message.error(response.message)
            }
          }).catch(e => {
            this.$Message.error(e.message)
          })
        }
      })
    },
    confirm (data) {
      this.loading.confirm = true
      api.information.updatePreArticleInfo(data).then(res => {
        if (res.code === 1000) {
          this.$Message.success(res.message)
          this.closeCurrent()
          this.goToTab('informationAudit:index')
        } else {
          this.$Message.error(res.message)
        }
      }).catch(e => {
        this.$Message.error(e.response.data.message)
      }).finally(() => {
        this.loading.confirm = false
      })
    },
    // 上传文件
    uploadSuccess (res) {
      this.form.coverFdfsUrl = res.data
      this.$Message.success('上传成功')
    },
    uploadError (e, file) {
      this.$Message.error(file.message)
    },
    formatError () {
      this.$Message.error('文件格式不正确')
    }
  }
}
</script>

<style lang="less" scoped>
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

  .short-edi {
    .editor {
      height: 100px !important;
    }
  }
  .recommend {
    margin-right: 2rem;
    label {
      width: 5rem;
    }
  }
  .alive {
    color: red;
    text-decoration: underline;
    margin: 0 2px;
  }
</style>
