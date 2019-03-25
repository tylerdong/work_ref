<template>
  <Modal v-model="modal.show" :title="modal.title" width="50%" closable footer-hide draggable>
    <div class="scrolled-modal">
      <table class="custom-table">
        <thead>
        <tr><th class="property-length">属性</th><th>值</th></tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in this.props" :key="index">
            <td>{{item.name}}</td>
            <td>
              <img v-if="item.name.indexOf('图片') > -1" :src="item.value" alt="item.name" class="img-in-dialog">
              <span v-else>{{item.value}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </Modal>
</template>

<script>
import dateFns from 'date-fns'
export default {
  props: ['status'],
  data () {
    return {
      modal: {show: false, title: '详情'},
      props: []
    }
  },
  methods: {
    asyncOK () {
      this.modal.show = false
    },
    show (data) {
      this.modal.show = true
      this.props = []
      this.props.push({value: data.id, name: 'ID'})
      this.props.push({value: data.title, name: '标题'})
      this.props.push({value: data.videoAbout, name: '主题'})
      this.props.push({value: data.author, name: '作者'})
      this.props.push({value: this.status.find(s => s.status === data.status).showStatus, name: '状态'})
      this.props.push({value: data.videoCurrentNum, name: '当前集数'})
      this.props.push({value: data.videoTotalNum, name: '总集数'})
      this.props.push({value: data.videoUpdateProgress, name: '上传进度'})
      this.props.push({value: data.authorType, name: '视频提供者类型'})
      this.props.push({value: data.checkPerson, name: '审核人'})
      this.props.push({value: data.coverFdfsUrl, name: '封面图片'})
      this.props.push({value: data.isRecommend === 'Y' ? '是' : '否', name: '是否推荐'})
      this.props.push({value: data.labels, name: '标签'})
      this.props.push({value: data.creator, name: '创建者'})
      this.props.push({value: data.modifier, name: '修改人'})
      this.props.push({value: data.remark, name: '备注'})
      this.props.push({value: data.sourceType, name: '数据来源'})
      this.props.push({value: dateFns.format(data.gmtCreate, 'YYYY-MM-DD HH:mm:ss'), name: '创建时间'})
      this.props.push({value: dateFns.format(data.gmtModified, 'YYYY-MM-DD HH:mm:ss'), name: '更新时间'})
    }
  }
}
</script>

<style scoped>
  .property-length {
    width: 30%;
  }
</style>
