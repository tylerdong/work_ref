<!--组件名-->
<template>
  <div class="welcome-wrapper">
  </div>
</template>
<script>
  import storage from '../module/storage'
  import * as api from '../api'
  //  import {stomp} from '../module/eventHub'
  import * as names from '../router/names'
  export default {
    mounted () {
      this.userInfo = storage.getUser()
      // this.messageTip()
      this.getFactoryConfig()
    },
    data () {
      return {
        userInfo: {}
      }
    },
    methods: {
      getFactoryConfig () {
        api.storage.warehouseMaintain.selectFactory({factoryName: window.global.companyName}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            storage.setFactoryConfig(data.data)
          } else {
            this.$message({type: 'error', message: data.message})
          }
        })
      },
      /* 登录成功，轮询接口 */
      messageTip () {
        let Vm = this
        let haveNotice = false
        if (this.userInfo.moduleList) {
          for (let item of this.userInfo.moduleList) {
            if (item.code === '0204') { // 0204是实验室消息模块的编码
              haveNotice = true
            }
          }
        }
        if (this.userInfo.type === 'A' && haveNotice) {
          this.setIntervalMessageTip()
          api.laboratory.notice.getMessageReceiveListByNoRead({
            userId: this.userInfo.userId
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              if (data.data.length) {
                this.$notify.info({
                  message: `有${data.data.length}条重要消息未读, 请去查看。`,
                  onClick: function () {
                    Vm.$router.push({name: names.LABORATORY_NOTICE})
                  }
                })
              }
            }
          })
        }
      },
      setIntervalMessageTip () {
        setInterval(() => {
          api.laboratory.notice.getMessageReceiveListByNoRead({
            userId: this.userInfo.userId
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              if (data.data.length) {
                this.$notify.info({
                  message: `有${data.data.length}条重要消息未读, 请去查看`
                })
              }
            }
          })
        }, 300000)
      }
      /* 订阅服务 */
//      startSocketService () {
//        stomp.subscribe(`/user/${this.userInfo.userId}/message`, () => {
//          console.log('已经开启监听者模式')
//        })
//      }
    }
  }
</script>
<style lang="scss" scoped>
  .welcome-wrapper {
    padding: 20px;
    font-size: 20px;
  }
</style>
