<!--下拉消息框-->
<template>
  <li class="messages-menu">
    <a class="dropdown-toggle" data-toggle="dropdown" @click="show" ref="refMessagesMenu" title="消息查看">
      <i class="fa fa-bell"></i>
      <span class="label label-danger" v-if="items.length">{{items.length}}</span>
    </a>
    <ul class="dropdown-menu message-box" :class="{'active': messageActive}">
      <li v-if="!items.length" class="noMessage tc">暂无未读信息</li>
      <!-- start message -->
      <li v-for="(item,index) in items" @click="btnMessageShow(item)" :key="index">
        <a class="cf message-content">
          <span class="fl theme"><i class="fa" :class="{'fa-volume-up': item.releaseName==='系统消息', 'fa-circle': item.releaseName!=='系统消息'}"></i>{{item.theme}}</span>
          <small class="fr time"><i class="fa fa-clock-o"></i>{{ timeOver(item.time) }}</small>
        </a>
      </li>
      <!-- end message -->
      <li @click="allMessage" class="historical-record tr"><span class="text">查看历史消息 <i class="fa fa-angle-double-right"></i></span></li>
    </ul>
    <dialog-message ref="refDialog"></dialog-message>
  </li>
</template>

<script>
  import * as names from '../../../router/names'
  import * as api from '../../../api'
  import vue from 'vue'
  import storage from '../../../module/storage'
  import {eventHub} from '../../../module/eventHub'
  export default {
    components: {
      'dialog-message': require('./dialog-show.vue')
    },
    data () {
      return {
        items: [],
        messageActive: false,
        dtNow: ''
      }
    },
    computed: {
    },
    created () {
      eventHub.$on('callback-message', () => {
        this.getData()
      })
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.getData()
      $('body').click((event) => {
        if ((event.target.parentNode !== this.$refs.refMessagesMenu && event.target !== this.$refs.refMessagesMenu)) {
          this.messageActive = false
        }
      })
    },
    methods: {
      message () {
        return this.$store.state.count
      },
      getData () {
        let params = {
          userId: this.userInfo.userId
        }
        api.laboratory.notice.getMessageReceiveListByNoRead(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.items = data.data
            return true
          }
        }).finally(() => {
        })
      },
      show () {
        this.messageActive = true
        this.dtNow = new Date().getTime()
        this.getData()
      },
      allMessage () {
        this.$router.push({name: names.LABORATORY_NOTICE})
      },
      timeOver (time) {
        var myFilter = vue.filter('timeOver')
        return myFilter(this.dtNow - time)
      },
      btnMessageShow (item) {
        let params = {
          id: item.id,
          userId: this.userInfo.userId
        }
        this.$refs.refDialog.show('receive', params)
      }
    }
  }
</script>

<style scoped lang="scss">
  .message-badge{
    position: absolute;
    top: 16px;
    right: 12px;
    background-color: #f50000;
    border-radius: 50%;
    width: 7px;
    height: 7px;
  }
  .message-box{
    .message-content{
      line-height: 40px;
      color: #535353;
      .fa{width: 18px;}
      .theme{
        width: 150px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
        .fa-circle{font-size: 12px;}
      }
      .time{font-size: 13px;color: #99a9bf;}
    }
    &.active{display: block;}
    .historical-record .text{
      padding: 5px 20px 20px 20px;
      display: inline-block;
      cursor: pointer;
      color: #3b9dd8;
    }
    .noMessage{
      padding: 20px 0 10px 0;
    }
  }
</style>
