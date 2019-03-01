<template>
  <div class="other-analysis">
    <Card>
      <p slot="title">任务管理</p>
      <tasklist ref="tasklist" @open-model="openModel"></tasklist>
    </Card>
  </div>
</template>

<script>
import tasklist from './tasklist'
export default {
  components: {
    tasklist
  },
  data () {
    return {
      itemForm: {}
    }
  },
  methods: {
    closeModel () {
      this.isshow = false
    },
    openModel (datas) {
      this.isshow = true
      datas.marketPriceDate = new Date(datas.marketPriceDate)
      datas.marketPrice = datas.marketPrice + ''
      this.itemForm = datas
      this.itemForm.isModify = true
    },
    updateTable () {
      this.$refs.promt.getTableDate()
      this.$refs.unpromt.getTableDate()
    }
  }
}
</script>

<style scoped>
</style>
