<template>
  <Card shadow>
    <p slot="title">添加长视频</p>
    <Tabs type="card" v-model="component">
      <TabPane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.name"></TabPane>
    </Tabs>
    <keep-alive>
      <component v-bind:is="component" :status="option.status"></component>
    </keep-alive>
  </Card>
</template>
<script>
import api from '@/api/index'
export default {
  components: {
    'main-part': require('./create/main-part').default,
    'sub-video': require('./create/sub-video').default
  },
  data () {
    return {
      component: 'main-part',
      tabs: [{title: '主内容', name: 'main-part'}, {title: '子视频', name: 'sub-video'}],
      option: { status: [] }
    }
  },
  methods: {
  },
  mounted () {
    Promise.all([api.longVideo.getVideoStatusList()]).then(res => {
      this.option.status = res[0].data
    })
  }
}
</script>
<style lang="less">
</style>
