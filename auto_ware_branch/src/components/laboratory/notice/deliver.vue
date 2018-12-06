<!-- 消息--我发布的 -->
<template>
  <div class="content-inner">
    <picker @callback="callback"></picker>
    <ul v-loading="loading">
      <li v-if="!tableData.length" class="tc">暂无数据</li>
      <li v-if="tableData.length">
        <div class="inner">
          <span class="theme">标题</span>
          <span class="name tc">接收人</span>
          <span class="time tc">发布时间</span>
          <div class="tr">操作</div>
        </div>
      </li>
      <li v-for="(item,index) in tableData" :key="index">
        <div class="inner">
          <span class="theme">{{ item.theme }}</span>
          <span class="note name tc">{{ item.recPersonName }}</span>
          <span class="note time tc">{{ item.time | timeFormat('YYYY-MM-DD HH:mm:ss') }}</span>
          <div class="tr">
            <el-button type="primary" size="small" @click="btnCheck(item)">查看</el-button>
          </div>
        </div>
      </li>
    </ul>

    <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <dialog-message ref="refDialog"></dialog-message>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import storage from '../../../module/storage'
  import {eventHub} from '../../../module/eventHub'
  export default {
    components: {
      'picker': require('./notice-picker.vue'),
      'dialog-message': require('./dialog-show.vue')
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.getData()
    },
    beforeDestroy () {
      eventHub.$off('callback-refresh')
    },
    data () {
      return {
        userInfo: '',
        loading: false,
        tableData: [],
        search: {
          startTime: '',
          endTime: '',
          theme: ''
        },
        page: {
          currentPage: 1,
          total: 0,
          pageSize: 15,
          pageSizes: [15, 30, 50, 100]
        }
      }
    },
    created () {
      eventHub.$on('callback-refresh', function () {
        console.log(1)
      })
    },
    methods: {
      btnCheck (item) {
        this.$refs.refDialog.show('deliver', {
          id: item.id,
          userId: this.userInfo.userId
        })
      },
      getData () {
        this.loading = true
        let params = {
          userId: this.userInfo.userId,
          pageIndex: this.page.currentPage,
          pageCount: this.page.pageSize,
          startTime: this.search.startTime,
          endTime: this.search.endTime,
          theme: this.search.theme
        }
        api.laboratory.notice.getMessageSenderList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = []
            for (let item of data.data.list) {
              this.tableData.push(item)
            }
            this.page.total = data.data.count
            return true
          }
        }).finally(() => {
          this.loading = false
        })
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      },
      callback (search) {
        if (search.dtStart) {
          this.search.startTime = search.dtStart.getTime()
        } else {
          this.search.startTime = ''
        }
        if (search.dtEnd) {
          this.search.endTime = search.dtEnd.getTime()
        } else {
          this.search.endTime = ''
        }
        this.search.theme = search.theme
        this.getData()
      }
    },
    filters: {}
  }
</script>

<style scoped lang="scss">
  .content-inner {
    padding: 10px;
    li {
      padding: 10px;
      border-bottom: 1px dashed #dee4ec;
    }
    .inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .theme {
        width: 300px;
      }
      .name {
        width: 180px;
      }
      .time {
        width: 150px;
      }
      .btn {
        width: 80px;
      }
    }
    .red {
      color: #f50000;
    }
    .note {
      font-size: 13px;
      color: #99a9bf;
    }
  }
</style>
