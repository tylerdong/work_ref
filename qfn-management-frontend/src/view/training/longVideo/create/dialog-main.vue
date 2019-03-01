<template>
  <Modal v-model="modal.show" :title="modal.title" :draggable="true" class="pop-modal">
    <Form ref="form" :model="form" :rules="rules" :label-width="120">
      <FormItem prop="title" label="视频标题">
        <Input v-model="form.title" placeholder="请输入视频标题"/>
      </FormItem>
      <FormItem prop="videoAbout" label="视频简介">
        <Input v-model="form.videoAbout" type="textarea" :rows="2" placeholder="请输入视频简介"/>
      </FormItem>
      <FormItem label="视频封面">
        <div class="fl upload-div">
          <Upload :action="uploadAction"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :on-format-error="formatError"
                  :max-size="51200">
            <Button icon="ios-cloud-upload-outline" type="primary">上传</Button>
          </Upload>
          <img v-if="form.coverFdfsUrl" class="img-in-dialog clear" :src="form.coverFdfsUrl" alt="封面">
        </div>
      </FormItem>
      <FormItem prop="sourceType" label="视频来源">
        <Input v-model="form.sourceType" placeholder="请输入视频来源"/>
      </FormItem>
      <FormItem prop="videoTotalNum" label="子视频条数">
        <InputNumber v-model="form.videoTotalNum" :max="100" :min="1"></InputNumber>
      </FormItem>
      <FormItem prop="authorType" label="视频提供者类型">
        <Select placeholder="请选择视频提供者类型" v-model="form.authorType" style="length-16-6rem" clearable>
          <Option v-for="(item, key) in sourceType" :value="item" :key="key">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="author" label="视频提供者">
        <Select placeholder="请选择视频提供者" v-model="form.author" style="length-16-6rem" clearable>
          <Option v-for="(item, key) in userList" :value="item.name" :key="key">{{ item.name }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="modal.show = false">取消</Button>
      <Button type="info" @click="confirm('TO_BE_EDITED')" :loading="loading.confirm">保存草稿</Button>
      <Button type="primary" @click="confirm('CHECK_PENDING')" :loading="loading.audit">提交审核</Button>
    </div>
  </Modal>
</template>

<script>
import api from '@/api/index'
export default {
  props: ['userList', 'sourceType'],
  data () {
    return {
      modal: {show: false, title: '新增'},
      loading: {confirm: false, audit: false},
      uploadAction: '',
      form: {
        id: '',
        title: '',
        videoAbout: '',
        coverFdfsUrl: '',
        sourceType: '',
        videoTotalNum: 1,
        authorType: '',
        author: '',
        status: ''
      },
      rules: {
        title: [{required: true, message: '请填写视频标题', trigger: 'blur'}],
        videoAbout: [{required: true, message: '请填写视频简介', trigger: 'blur'}]
      }
    }
  },
  mounted () {
    let baseUrl = this.getCurrentBaseUrl()
    this.uploadAction = `${baseUrl}pretreatment/controller/themevideo/upload`
  },
  methods: {
    show (data) {
      this.modal.show = true
      this.$refs.form.resetFields()
      this.form.coverFdfsUrl = ''
      this.modal.title = data ? '编辑' : '新增'
      if (data) {
        this.form = data
      }
    },
    // 上传文件
    uploadSuccess (res) {
      this.$Message.success(res.message)
    },
    uploadError (e, file) {
      this.$Message.error(file.message)
    },
    formatError () {
      this.$Message.error('文件格式不正确')
    },
    // 保存草稿
    confirm (status) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (status === 'TO_BE_EDITED') this.loading.confirm = true
          if (status === 'CHECK_PENDING') this.loading.audit = true
          this.form.status = status
          api.longVideo.editVideoThemeInfo(this.form).then(res => {
            if (res.code === 1000) {
              this.$Message.success(res.message)
              this.modal.show = false
              this.$emit('confirmSuccess')
            } else {
              this.$Message.error(res.message)
            }
          }).catch(e => {
            this.$Message.error(e.message)
          }).finally(() => {
            if (status === 'TO_BE_EDITED') this.loading.confirm = false
            if (status === 'CHECK_PENDING') this.loading.audit = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .upload-div {
    display: flex;
    flex-direction: column;
  }
</style>
