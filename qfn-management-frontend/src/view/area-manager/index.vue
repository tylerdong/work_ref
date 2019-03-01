<template>
  <Card shadow>
    <p slot="title">区域管理</p>
    <AreaManagerEntry></AreaManagerEntry>
  </Card>
</template>
<script>
import AreaManagerEntry from '_c/area-manager/area-manager-entry'
export default {
  name: 'area-manager',
  components: {
    AreaManagerEntry
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
