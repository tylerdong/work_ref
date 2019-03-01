<template>
  <Modal v-model="modal.show" :title="modal.title" :draggable="true" @on-ok="confirm" :loading="loading.modal">
    <div class="video-div scrolled-modal">
      <table>
        <tbody>
          <template v-for="(item, key) in videoData">
            <tr :key="key">
              <td>
                <video class="video-in-dialog" :src="item.videoFdfsUrl" controls></video>
              </td>
              <td>
                <ul>
                  <li>标题：{{item.detailTitle}}</li>
                  <li>集数：{{item.videoCurrentNum}}</li>
                  <li v-if="item.videoTotalNum">总集数：{{item.videoTotalNum}}</li>
                  <li>上传时间：{{item.gmtCreate | timeFormat('YYYY-MM-DD HH:mm')}}</li>
                  <li>更新时间：{{item.gmtModified | timeFormat('YYYY-MM-DD HH:mm')}}</li>
                  <li>作者：{{item.author}}</li>
                  <li>备注：{{item.remark}}</li>
                </ul>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: {show: false, title: ''},
      videoData: [],
      loading: {modal: false}
    }
  },
  methods: {
    show (data) {
      this.modal.show = true
      this.modal.title = `${data.title}`
      this.videoData = data.data
    },
    confirm () {
      this.modal.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.video-div {
  table {
    width: 100%;
    td {
      text-align: center;
      ul {
        margin: 10px auto;
      }
    }
    td:nth-child(1) {
      width: 50%;
    }
    td:nth-child(2) {
      text-align: left;
      vertical-align: top;
    }
  }
}
ul li {
  list-style: none;
}
</style>
