<template>
  <div v-if="classType === 'three'">
    <el-button :class="{hover: timeRange[0]}" class="input-item-l-m" @click="classChange(0, 8)">夜班(00:00-08:00)
    </el-button>
    <el-button :class="{hover: timeRange[1]}" class="input-item-l-m" @click="classChange(8, 16)">早班(08:00-16:00)
    </el-button>
    <el-button :class="{hover: timeRange[2]}" class="input-item-l-m" @click="classChange(16, 24)">中班(16:00-24:00)
    </el-button>
  </div>
  <div v-else>
    <el-button :class="{hover: timeRange[1]}" class="input-item-l-m" @click="classChange(20, 32)">早班(20:00-08:00)
    </el-button>
    <el-button :class="{hover: timeRange[0]}" class="input-item-l-m" @click="classChange(8, 20)">夜班(08:00-20:00)
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'com-class',
  props: ['searchDate'],
  data () {
    return {
      timeRange: [false, false, false]
    }
  },
  computed: {
    classType: function () {
      return (this.$store.state.sysConfig.classesnum === '3') ? 'three' : 'two'
    }
  },
  methods: {
    classChange (start, end) {
      this.timeRange.forEach(item => { item = false })
      this.timeRange[0] = start === 0
      this.timeRange[1] = start === 8
      this.timeRange[2] = start === 16
      this.$emit('classChange', {
        startTime: new Date(this.searchDate.getTime() + start * 60 * 60 * 1000),
        endTime: new Date(this.searchDate.getTime() + end * 60 * 60 * 1000)
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
