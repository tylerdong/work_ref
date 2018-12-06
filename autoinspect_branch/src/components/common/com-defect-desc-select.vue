<template>
  <el-select v-model="value" multiple placeholder="请选择缺陷类型" @change="defectTypeSelected">
    <el-option v-for="(item, index) in options" :key="index" :label="item.key" :value="item.key"></el-option>
  </el-select>
</template>

<script>
import * as api from '../../api/index'
export default {
  name: 'com-defect-desc',
  data () {
    return {
      value: '',
      options: []
    }
  },
  mounted () {
    this.getOptions()
  },
  methods: {
    initValue (val) {
      this.value = val
    },
    getOptions () {
      api.innerDefect.getAllDefectType({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000 && data.data.length > 0) {
          this.options = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      })
    },
    defectTypeSelected (val) {
      this.$emit('defectTypeSelected', val)
    }
  }
}
</script>

<style scoped>
</style>
