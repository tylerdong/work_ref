<template>
  <div>
    <el-button v-for="(item, index) in classPeroid" :key="index" class="input-item-l-m" :class="{hover: timeRange[index]}"
               @click="classChange(index, item.value)">{{item.key}}({{item.value}})
    </el-button>
  </div>
</template>

<script>
import dateFns from 'date-fns'
import { mapGetters } from 'vuex'
export default {
  name: 'com-class',
  props: ['searchDate'],
  data () {
    return {
      timeRange: []
    }
  },
  computed: {
    ...mapGetters(['classPeroid', 'classesnum'])
  },
  methods: {
    classChange (index, timeSpan) {
      this.timeRange = Array(this.classPeroid.length).fill(false)
      this.timeRange[index] = true
      let spanStart = this.classPeroid[0].value.split('-')[0]
      let start = new Date(`${dateFns.format(this.searchDate, 'YYYY-MM-DD')} ${spanStart}`)
      let span = 24 / parseInt(this.classesnum)
      let startTime = start.getTime() + (index * span) * 60 * 60 * 1000
      let endTime = start.getTime() + ((index + 1) * span) * 60 * 60 * 1000
      this.$emit('classChange', {
        startTime: startTime,
        endTime: endTime
      })
    }
  }
}
</script>

<style scoped>
  .hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
</style>
