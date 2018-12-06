<!--消息详情-->
<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="close"  width="30%" :modal-append-to-body="false">
    <div class="message-content" v-loading="loading">
      <h4 class="tc">{{message.theme}}</h4>
      <div v-html="message.content"></div>
      <div class="tr">
        <p>{{message.personName}}</p>
        <p>{{message.time | timeFormat('YYYY-MM-DD HH:mm:ss')}}</p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import * as api from '../../../api'
  import {eventHub} from '../../../module/eventHub'
  export default {
    data () {
      return {
        title: '通知',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        message: {},
        loading: false
      }
    },
    mounted () {
    },
    methods: {
      getData (type, params) {
        this.loading = true
        switch (type) {
          case 'receive':
            api.laboratory.notice.getMessageReceiveById(params).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.message = response.data.data
                eventHub.$emit('callback-message')
                return true
              }
            }).finally(() => {
              this.loading = false
            })
            break
          case 'deliver':
            api.laboratory.notice.getMessageSenderById(params).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.message = response.data.data
                return true
              }
            }).finally(() => {
              this.loading = false
            })
            break
          default:
            break
        }
      },
      show (type, params) {
        this.dialogFormVisible = true
        this.getData(type, params)
      },
      close () {
        this.message = {
          messageId: '',
          theme: '',
          content: '',
          releaseName: '',
          releaseTime: ''
        }
      }
    }
  }
</script>

<style scoped>
  .message-content{
    max-height: 340px;
    min-height: 150px;
    overflow-y: auto;
  }
</style>
