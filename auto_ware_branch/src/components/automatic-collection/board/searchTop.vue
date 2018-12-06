<template>
  <div style="float: left">
  <el-select class="margin-right-10" v-model="search.workshop" @change="getLineOptions" placeholder="请选择车间" clearable>
    <el-option
      v-for="item in workshopOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
    <el-select class="margin-right-10" v-model="search.line" placeholder="请选择线别"
               clearable v-loading="loading.line"  @change="linechange" v-if="isMulti === 'false' ">
      <el-option
        v-for="item in lineOptions"
        :key="item.id"
        :label="item.line"
        :value="item.id">
      </el-option>
    </el-select>
  <el-select class="margin-right-10" v-model="search.line" placeholder="请选择线别"
             clearable v-loading="loading.line"  @change="linechange" multiple ref="Muselect" v-if="isMulti === 'true'">
    <el-option
      v-for="item in lineOptions"
      :key="item.id"
      :label="item.line"
      :value="item.id">
    </el-option>
  </el-select>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    props: ['isMulti'],
    data () {
      return {
        workshopOptions: [],
        search: {
          workshop: '',
          line: []
        },
        lineOptions: [],
        loading: {
          workshop: false,
          showBtn: false
        }
      }
    },
    mounted () {
      this.getAllWorkshopOptions()
    },
    methods: {
      linechange () {
        this.$emit('searchinfo', this.search)
      },
      getAllWorkshopOptions () {
        let params = {}
        api.automatic.dictionary.getAllWorkshopList(params).then(response => {
          if (response.data.messageType === 1) {
            this.workshopOptions = response.data.data
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      getLineOptions () {
        this.$emit('searchinfo', this.search)
        if (this.isMulti === 'true') {
          this.search.line = []
        } else {
          this.search.line = ''
        }
        this.loading.workshop = true
        let params = {
          workShopId: this.search.workshop
        }
        api.automatic.productPlan.getAllLine(params).then(response => {
          if (response.data.messageType === 1) {
            this.lineOptions = response.data.data
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.workshop = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
