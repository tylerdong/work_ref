<template>
  <div class="addInformation">
    <Card shadow>
      <p slot="title">长视频审核</p>
       <Tabs type="card" v-model="component">
      <TabPane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.name"></TabPane>
    </Tabs>
<keep-alive>
      <component v-bind:is="component" ></component>
    </keep-alive>
    </Card>
  </div>
</template>
<script>
import {
  getPreVideoThemeList
} from '@/api/longVideo'
import elements from '@/config/elements'
import dateFns from 'date-fns'
import Theme from '@/view/training/longVideo/audit/theme'
import VideoTab from '@/view/training/longVideo/audit/videoTab'
export default {
  components: {
    'theme': Theme,
    'video-tab': VideoTab
  },
  data () {
    return {
      component: 'theme',
      tabs: [{title: '主内容', name: 'theme'}, {title: '子视频', name: 'video-tab'}]
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
<style lang="less">
.n-table {
  .ivu-form-item {
    margin-bottom: 0;

  }
}
</style>
