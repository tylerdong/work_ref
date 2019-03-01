<template>
  <Card shadow>
    <p slot="title">日志管理</p>
    <dict-manager-audit/>
  </Card>

</template>
<script>
import DictManagerAudit from '_c/dict-manager/dict-manager-audit'
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
