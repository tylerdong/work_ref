<template>
  <Modal v-model="modal.show" :title="modal.title" :draggable="true" @on-visible-change="stopPlay" :mask-closable="false">
    <Form ref="form" :model="form" :rules="rules" :label-width="120">
      <FormItem prop="themeId" label="主题">
        <Select v-model="form.themeId" placeholder="请选择主题" clearable>
          <Option v-for="(item, key) in theme" :value="item.id" :key="key">{{ item.title }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="detailTitle" label="视频标题">
        <Input v-model="form.detailTitle" placeholder="请填写视频标题"/>
      </FormItem>
      <FormItem prop="video" label="视频">
        <div class="fl upload-div">
          <Upload :action="uploadAction"
                  :before-upload="beforUpload"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :on-format-error="formatError"
                  :show-upload-list="false"
                  :format="['aiv','mov','rmvb','rm','flv','mp4','3gp']"
                  :max-size="819200">
            <Button icon="ios-cloud-upload-outline" type="primary" :loading="loading.upload">上传</Button>
          </Upload>
          <video v-if="form.videoFdfsUrl" class="video-in-dialog" :src="form.videoFdfsUrl" controls ref="videoPlayer"></video>
        </div>
      </FormItem>
      <FormItem prop="videoTotalNum" label="当前集数">
        <InputNumber v-model="form.videoCurrentNum" :max="100" :min="1"></InputNumber>
      </FormItem>
      <FormItem prop="status" label="视频是否已完结">
        <Checkbox v-model="form.isFinish" true-value="Y" false-value="N"></Checkbox>
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
  props: ['theme'],
  data () {
    return {
      modal: {show: false, title: '新增'},
      loading: {confirm: false, audit: false, upload: false},
      form: {
        id: '',
        themeId: '',
        detailTitle: '',
        videoFdfsUrl: '',
        videoCurrentNum: 1,
        status: '',
        isFinish: 'N'
      },
      uploadAction: '',
      rules: {
        themeId: [{required: true, type: 'number', message: '请选择主题', trigger: 'blur change'}],
        detailTitle: [{required: true, message: '请填写视频标题', trigger: 'blur change'}]
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
      this.form.videoFdfsUrl = ''
      this.modal.title = data ? '编辑' : '新增'
      if (data) {
        this.form = this.deepClone(data)
      }
    },
    // 上传文件
    beforUpload () {
      this.loading.upload = true
    },
    uploadSuccess (res) {
      this.form.videoFdfsUrl = res.data
      this.$Message.success('上传成功')
      this.loading.upload = false
    },
    uploadError (e, file) {
      this.$Message.error(file.message)
    },
    formatError () {
      this.$Message.error('文件格式不正确')
    },
    // 提交内容
    confirm (status) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.status = status
          if (status === 'TO_BE_EDITED') this.loading.confirm = true
          if (status === 'CHECK_PENDING') this.loading.audit = true
          api.longVideo.editVideoDetailInfo(this.form).then(res => {
            if (res.code === 1000) {
              this.$Message.success(res.message)
              this.modal.show = false
              this.$emit('confirmSuccess')
            } else {
              this.$Message.error(res.message)
            }
          }).catch(e => {
            this.$Message.error({desc: e.message})
          }).finally(() => {
            if (status === 'TO_BE_EDITED') this.loading.confirm = false
            if (status === 'CHECK_PENDING') this.loading.audit = false
          })
        }
      })
    },
    stopPlay (data) {
      if (data === false) {
        this.$refs['videoPlayer'].pause()
      }
    }
  }
}
</script>

<style scoped>
</style>
