<template>
  <div class="">
    <Card shadow>
      <p slot="title">文章审核</p>
      <div class="mb-20 clearfix">
        <Form :model="form" :rules="rules" ref="form" label-position="right" :label-width="100" class="form">
          <FormItem label="文章标题">
            <Input v-model="form.title" disabled/>
          </FormItem>
          <FormItem label="文章内容">
            <editor ref="content" :value="form.content"/>
          </FormItem>
          <div class="clearfix inner-item">
            <form-item label="文章时间" class="item">{{form.gmtModified | timeFormat('YYYY-MM-DD HH:mm')}}</form-item>
            <form-item label="媒体平台" class="item">{{form.mediaPlatform}}</form-item>
            <form-item label="文章作者" class="item">{{form.author}}</form-item>
          </div>
          <FormItem label="简讯推荐">
            {{form.isRecommand | recommand}}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{{form.isRecommand | guidance}}
          </FormItem>
          <FormItem class="short-edi" label="编辑备注">
            <Input v-model="form.remark" type="textarea" />
          </FormItem>
          <FormItem class="short-edi" label="文章摘要">
            <Input v-model="form.summary" type="textarea" />
          </FormItem>
          <FormItem label="文章申明">
            <div class="clearfix inner-item">
              <RadioGroup v-model="form.declareType" class="declare">
                <Radio v-for="(item, index) in option.declareType" class="radio" :key="index" :label="item.key">
                  <div class="detail">{{item.content}}</div>
                </Radio>
              </RadioGroup>
            </div>
          </FormItem>
          <FormItem label="产品关联属性">
            <CheckboxGroup>
              <Checkbox v-for="(item, index) in option.product" v-model="item.checked" :key="index" :label="item.content"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="企业关联属性">
            <Select v-model="form.company" clearable multiple class="length-40-5rem">
              <Option v-for="(item, index) in option.group" :value="item.key" :key="index">{{ item.content }}</Option>
            </Select>
          </FormItem>
          <FormItem label="文章类型">
            <Select v-model="form.type" placeholder="请选择文章类型" transfer=transfer clearable class="length-40-5rem">
              <Option v-for="(item, index) in option.types" :value="item.key" :key="index">{{ item.content }}</Option>
            </Select>
          </FormItem>
          <FormItem label="文章标签">
            <Tag v-for="(item, index) in option.tags" :key="index" color="primary">{{item}}</Tag>
            <Button icon="ios-add" type="dashed" size="small" @click="btnAddTag">添加标签</Button>
          </FormItem>
          <FormItem label="审核状态" prop="status">
            <Select v-model="form.status" placeholder="请选择文章状态" transfer=transfer clearable class="length-40-5rem">
              <Option v-for="(item, index) in option.status" :value="item.key" :key="index" v-if="!['1', '2', '3', '8'].includes(item.key)">{{ item.content }}</Option>
            </Select>
            <!--<div>当前状态：{{option.status.find(s => s.key === form.status).content}}</div>-->
          </FormItem>
          <FormItem label="审核备注">
            <Input v-model="form.examineComment" type="textarea" placeholder="请输入备注"/>
          </FormItem>
          <FormItem style="text-align:center;">
            <Button type="primary" @click="btnConfirm" :loading="loading.confirm">确定</Button>
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
      option: {declareType: [], product: [], group: [], types: [], status: [], tags: []},
      form: {
        id: '',
        title: '',
        content: '',
        gmtModified: '',
        mediaPlatform: '',
        author: '',
        examineComment: '',
        summary: '',
        declareType: '',
        relatedProduct: [],
        company: [],
        type: '',
        tag: '',
        status: '',
        remark: ''
      },
      tagValue: '',
      rules: {
        status: [{required: true, message: '请选择审核状态', trigger: 'blur change'}]
      },
      loading: { confirm: false }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      Promise.all([
        api.information.getAllDeclareType(),
        api.information.getAllProductCagetory(),
        api.data.default.getAllGroup(),
        api.information.getAllArticleType(),
        api.information.getAllArticleStatus()
      ]).then(res => {
        let data = []
        for (let i = 0; i < res.length; i++) {
          if (res[i].code === 1000) {
            data = res[i].data
            if (i === 0) this.option.declareType = data
            if (i === 1) {
              data.forEach(item => this.$set(item, 'checked', false))
              this.option.product = data
            }
            if (i === 2) this.option.group = data
            if (i === 3) this.option.types = data
            if (i === 4) this.option.status = data
            // {
            //   data.forEach(status => {
            //     this.$set(status, 'disabled', ['1', '2', '3', '8'].includes(status.key))
            //   })
            //   this.option.status = data
            // }
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
          this.$refs.content.setHtml(res.data.content)
          this.form.gmtModified = data.gmtModified
          this.form.mediaPlatform = data.mediaPlatform
          this.form.author = data.author
          this.form.isRecommand = data.isRecommand
          this.form.remark = data.remark
          this.form.summary = data.summary
          this.form.declareType = data.declareType
          if (data.relatedProduct) {
            this.option.product.forEach(pro => { this.$set(pro, 'checked', data.relatedProduct.includes(pro.value)) })
          }
          this.form.type = data.type
          if (data.company) {
            this.option.group.forEach(gro => { if (data.company.includes(gro.value)) this.form.company.push(gro.key) })
          }
          if (data.tag) this.option.tags = data.tag.split(',')
          this.form.status = data.status
          this.form.examineComment = data.examineComment
        }
      }).catch(e => {
        this.$Message.error(e.message)
      })
    },
    btnAddTag () {
      let tagValue = ''
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {value: tagValue, autofocus: true, placeholder: '请输入标签'},
            on: {input: (val) => { tagValue = val }}
          })
        },
        onOk: () => {
          if (this.option.tags.includes(tagValue)) {
            this.$Message.error(`标签"${tagValue}"已经存在`)
          } else {
            this.option.tags.push(tagValue)
          }
          tagValue = ''
        }
      })
    },
    btnConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            id: this.form.id,
            declareType: this.form.declareType,
            productMap: {},
            companyMap: {},
            type: this.form.type,
            tag: this.option.tags.join(','),
            status: this.form.status,
            examineComment: this.form.examineComment
          }
          this.option.product.filter(pro => pro.checked).forEach(pro => { data.productMap[`${pro.key.toString()}`] = pro.value })
          this.form.company.forEach(com => {
            let group = this.option.group.find(gro => gro.key === com)
            data.companyMap[`${group.key.toString()}`] = group.value
          })
          this.loading.confirm = true
          api.information.auditPreArticleInfo(data).then(res => {
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
        }
      })
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
  .inner-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
