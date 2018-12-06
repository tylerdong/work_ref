<template>
  <el-select v-model="value" placeholder="请选择批号" @change="batchSelected" clearable>
    <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item">
    </el-option>
  </el-select>
</template>

<script>
import * as api from '../../api/index'

export default {
  name: 'com-batch-select',
  data () {
    return {
      value: '',
      options: []
    }
  },
  mounted () {
    this.getBatches()
  },
  methods: {
    initValue (val) {
      this.value = val
    },
    getBatches () {
      api.innerDefect.getBatches({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000 && data.data.length > 0) {
          this.options = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      })
    },
    batchSelected (val) {
      this.$emit('batchSelected', val)
    }
  }
}
</script>

<style scoped>

</style>
