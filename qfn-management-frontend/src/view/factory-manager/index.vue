<template>
  <Card shadow class="card-height">
    <p slot="title">生产厂家</p>
    <Tabs value="factory" type="card" :animated="false">
      <TabPane label="厂家信息维护" name="factory">
        <comp-factory></comp-factory>
      </TabPane>
      <TabPane label="集团信息管理" name="group">
        <comp-group></comp-group>
      </TabPane>
    </Tabs>
  </Card>
</template>
<script>
export default {
  components: {
    'compFactory': require('./factory').default,
    'compGroup': require('./group').default
  },
  data () {
    return {
    }
  },
  methods: {},
  mounted () {
  }
}
</script>
