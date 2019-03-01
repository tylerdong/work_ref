<style lang="less">
</style>
<template>
  <Card shadow>
    <p slot="title">{{pageTitle}}</p>
    <div>
      <Form
        ref="flashNewsForm"
        :rules="rules"
        :model="formData"
        :label-width="180"
      >
        <FormItem
          label="快讯内容"
          prop="flashContent"
        >
          <Input
            v-model="formData.flashContent"
            type="textarea"
            :rows="4"
            placeholder="请输入快讯内容..."
          ></Input>
          <text-count
            :target-str="formData.flashContent"
            :max="255"
          />
        </FormItem>
        <FormItem
          label="快讯时间"
          prop="publishTime"
        >
          <DatePicker
            :value="formData.publishTimeStr"
            type="datetime"
            format="yyyy-MM-dd hh:mm:ss"
            :clearable="false"
            @on-change="formData.publishTimeStr=$event"
            placeholder="请选择快讯时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem
          label="媒体平台"
          prop="mediaPlatform"
        >
          <Input
            style="width:300px"
            v-model="formData.mediaPlatform"
            placeholder="请输入媒体平台"
          ></Input>
        </FormItem>
        <FormItem label="关联资讯内容">
          <RadioGroup v-model="formData.isRelation">
            <Radio label="y">有</Radio>
            <Radio label="n">无</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label=""
          v-if="formData.isRelation==='y'"
        >
          <div>
            <RadioGroup
              @on-change="changeRelationType"
              v-model="formData.relationType"
            >
              <Radio
                class="mr-20"
                label="inline"
              >站内关联原文链接</Radio>
              <Radio label="create">创建详情内容</Radio>
            </RadioGroup>
          </div>
          <div v-if="formData.relationType === 'inline'">
            <Select
              v-model="formData.articleId"
              filterable
              remote
              style="width:400px"
              :remote-method="remoteMethod"
              :loading="loadingNewsList"
            >
              <Option
                v-for="item in newsList"
                :value="item.id"
                :key="item.id"
              >{{item.title}}</Option>
            </Select>
          </div>
          <div v-if="formData.relationType === 'create'">
            <div>
              <p>标题</p>
              <Input
                v-model="formData.title"
                placeholder="请输入快讯标题"
              ></Input>
            </div>
            <div class="mb-10">
              <p>内容</p>
              <editor
                ref="editor"
                v-model="formData.content"
              />
            </div>
          </div>
        </FormItem>
        <FormItem>
          <Button
            :loading="posting"
            type="primary"
            @click="handleSubmit"
          >保存</Button>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>
<script>
import Editor from '_c/editor'
import api from "@/api/information";
import dateFns from 'date-fns'
import textCount from '_c/text-count/text-count'
export default {
  name: 'quickInformation',
  components: {
    Editor,
    textCount
  },
  data () {
    return {
      pageTitle: '新增快讯',
      posting: false,
      searchNewsTitleKeyWords: '',
      newsList: [],
      loadingNewsList: false,
      formData: {
        flashContent: '',
        isRelation: 'n',
        articleId: null,
        title: '',
        content: '',
        publishTime: new Date(),
        publishTimeStr: new Date(),
        source: '手动添加',
        mediaPlatform: '化纤之家',
        relationType: 'inline'
      },
      rules: {
        flashContent: [{ required: true, message: '快讯内容为必填项', trigger: 'blur' }, { max: 255, message: '快讯内容名称最多255个字', trigger: 'blur' }],
        // publishTime: [{ required: true, message: '快讯发布时间为必填项', trigger: 'blur' }],
        mediaPlatform: [{ required: true, message: '媒体平台为必填项', trigger: 'blur' }],
      },
    }
  },
  methods: {
    //提交
    handleSubmit () {
      let that = this;
      this.$refs['flashNewsForm'].validate((valid) => {
        if (valid) {
          // 页面是修改
          if (this.$route.name === 'quickInformation:edit') {
            const id = this.$route.params && this.$route.params.id
            this.putData(id)
          } else {
            this.postData()
          }

        }
      })
    },
    // 发送新增请求
    postData () {
      if (this.formData.relationType === 'inline') {
        delete this.formData.title
        delete this.formData.content
      } else {
        delete this.formData.articleId
      }
      // delete this.formData.relationType
      this.formData.publishTime = (new Date(this.formData.publishTimeStr)).getTime()
      this.posting = true
      api.addPreNewsFlash(this.formData).then(res => {
        if (res.code === 1000) {
          this.$Message.success({            content: res.message, onClose: () => {
              this.closeCurrent()
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      }).catch(err => {
        this.posting = false
        this.$Message.error(res.message);
      })
    },
    changeRelationType (data) {
      console.log('wwww');

      this.formData.relationType = data
    },
    // 发送修改请求
    putData (id) {
      if (this.formData.relationType === 'inline') {
        delete this.formData.title
        delete this.formData.content
      } else {
        delete this.formData.articleId
      }
      // delete this.formData.relationType
      this.formData.publishTime = (new Date(this.formData.publishTime)).getTime()
      this.posting = true
      api.putPreNewsFlash(id, this.formData).then(res => {
        if (res.code === 1000) {
          this.$Message.success({
            content: res.message, onClose: () => {
              this.closeCurrent()
            }          });
        } else {
          this.posting = false
          this.$Message.error(res.message);
        }
      }).catch(err => {
        this.posting = false
        this.$Message.error(res.message);
      })
    },
    // 模糊查询文章
    remoteMethod (query) {
      if (query !== '' && query.length > 2) {
        this.loadingNewsList = true;
        api.getNewsByLikeName({ title: query }).then(res => {
          this.loadingNewsList = false;
          this.newsList = [...res.data]
        })
      } else {
        this.newsList = [];
      }
    },
    // 获取详情信息回填
    renderFormData () {
      const id = this.$route.params && this.$route.params.id
      api.getFlashNewDetail(id).then(res => {
        const data = res.data
        data.relationType = 'inline'
        if (data.isRelation == 'y' && data.articleId) {
          data.relationType = 'inline'

        } else if (data.isRelation == 'y' && !data.articleId) {
          data.relationType = 'create'
        }
        data.publishTimeStr = dateFns.format(new Date(data.publishTime), 'YYYY-mm-DD hh:mm:ss')
        this.formData = JSON.parse(JSON.stringify(data))
        if (this.formData.articleId) {
          this.newsList = [{ title: this.formData.articleTitle, id: this.formData.articleId }]
        } else {
          this.newsList = []
        }

      });
    }
  },
  watch: {
    '$route' (to, from) {
      this.posting = false
      //加判断主要发现这个加载了之后，容易引起其他页面也发送请求，所以加了笨方法，加了条件判断，解决了其他页面请求数据加载的问题
      if (this.$route.params.id) {
        this.renderFormData();
      }
    }
  },
  mounted () {
    // 判断是否是修改
    if (this.$route.name === 'quickInformation:edit') {
      this.pageTitle = '修改快讯'
      this.renderFormData();
    }
  }
}
</script>
