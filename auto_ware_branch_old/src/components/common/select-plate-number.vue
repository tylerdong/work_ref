<template>
  <el-select v-model="thisPlateNumber" :disabled="disabled" @change="plateNumberChange" placeholder="请选择车牌号" clearable>
    <el-option v-for="item in options" :key="item.id" :label="item.number" :value="item.number"></el-option>
  </el-select>
</template>

<script>
  import * as api from 'src/api'
  import { eventHub } from '../../module/eventHub'
  export default {
    data () {
      return {
        options: [],
        thisPlateNumber: this.plateNumber
      }
    },
    props: ['plateNumber', 'disabled'],
    watch: {
      plateNumber (val) {
        this.thisPlateNumber = val
      }
    },
    mounted () {
      this.initData()
      this.emitEvent()
    },
    methods: {
      initData () {
        api.storage.warehouseMaintain.getListByType({type: 'WIRE'}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            if (data.data.length > 0) {
              this.options = data.data
            }
          } else {
            this.$message.error(data.message)
          }
        }).finally(() => {})
      },
      emitEvent () {
        eventHub.$on('plateNumberUpdate', () => {
          this.initData()
        })
      },
      plateNumberChange (val) {
        this.$emit('plateNumberChange', val)
      }
    }
  }
</script>

<style scoped>

</style>
