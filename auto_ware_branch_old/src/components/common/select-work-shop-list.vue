<template>
  <el-select v-model="thisWorkShopId" :disabled="disabled" @change="workshopIdChange" placeholder="请选择车间" clearable>
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>
<script>
  import * as api from 'src/api'
  import { eventHub } from '../../module/eventHub'
  export default {
    components: {},
    created () {
    },
    data () {
      return {
        options: [],
        thisWorkShopId: this.workshopId,
        loading: false
      }
    },
    props: {
      workshopId: {
        type: [String, Number],
        default: ''
      },
      disabled: {
        type: [String, Boolean],
        default: false
      }
    },
    watch: {
      workshopId (val) {
        this.thisWorkShopId = val
      }
    },
    mounted () {
      this.initData()
      this.emitEvent()
    },
    computed: {},
    methods: {
      /* 获取所有车间信息 */
      initData () {
        this.loading = true
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options = data.data
          } else {
            this.$message.error(data.message)
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading = false
        })
      },
      workshopIdChange (val) {
        this.$emit('workshopIdChange', val)
      },
      emitEvent () {
        eventHub.$on('workShopUpdate', () => {
          this.initData()
        })
      }
    }
  }
</script>
<style scoped>
</style>
