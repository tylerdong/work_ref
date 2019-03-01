<template>
  <Card shadow>
    <p slot="title">字典管理</p>
    <Tabs value="name1" type="card">
      <!-- <TabPane
        label="数据录入"
        name="name1"
      >
      <dict-manager-entry/>
      </TabPane> -->
      <TabPane
        label="数据审核"
        name="name2"
      >
      <dict-manager-audit/>
      </TabPane>
      <!-- <TabPane
        label="数据提交"
        name="name3"
      >数据提交的内容</TabPane>
      <TabPane
        label="显示数据"
        name="name4"
      >显示数据的内容</TabPane> -->
    </Tabs>
  </Card>

</template>
<script>
import DictManagerAudit from '_c/dict-manager/dict-manager-audit'
import { getDicData } from '@/api/data'
export default {
  name: 'dict-manager',
  components: {
    DictManagerAudit
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
