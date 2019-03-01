<template>
  <Card shadow>
    <div slot="title"  style="height:30px;line-height:20px;">数据分析审核
      <Select v-model="priceType"   style="width:100px;margin-left:10px;height:30px;" @on-change="priceChange">
        <Option v-for="(item, index) in $store.state.app.selectPrice" :value="item" :key="index">{{ item }}</Option>
      </Select>
    </div>
    <Tabs type="card" v-model="component" @on-click="tabChange">
      <TabPane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.name"></TabPane>
    </Tabs>
    <keep-alive>
      <component v-bind:is="component" :product="option.product" :status="option.status" :currStatus="tabs.find(t => t.name === component).status" :code="code" :productType="productType" :priceType="priceType"></component>
    </keep-alive>
  </Card>
</template>

<script>
import api from '@/api/data'
import {configurations} from '@/config/option'
export default {
  components: {
    'prompt': require('./prompt').default,
    'un-prompt': require('./un-prompt').default,
    'settle': require('./settle').default
  },
  props: { code: { type: String } },
  data () {
    return {
      proType: {},
      productType: {item: [], columns: []},
      tabs: [
        {title: '系统提示数据', name: 'prompt', status: '4'},
        {title: '未提示数据', name: 'un-prompt', status: '3'},
        {title: '数据结算', name: 'settle', status: ''}
      ],
      option: { product: [], status: [] },
      component: 'prompt',
      priceType: '出厂价'
    }
  },
  watch: {
    '$route' (to, from) {
      this.getConfigs()
    }
  },
  mounted () {
    this.getStatus()
    this.getConfigs()
  },
  methods: {
    getConfigs () {
      this.getProduct()
      configurations(this, this.code).then(res => {
        this.productType = res
        this.setColumns()
      })
    },
    getStatus () {
      api.getAllDataStatus().then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data && Array.isArray(data) && data.length > 0) {
            this.option.status = data
          } else {
            this.option.status = []
          }
        }
      })
    },
    getProduct () {
      if (this.component === 'settle') return
      let curTab = this.tabs.find(t => t.name === this.component)
      api.getAllCondByStatus({status: curTab.status, productClassCode: this.code}).then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data && Array.isArray(data) && data.length > 0) {
            this.option.product = data
          } else {
            this.option.product = []
          }
        } else {
          this.$Message.error(response.exception)
        }
      })
    },
    tabChange () {
      this.getProduct()
    },
    priceChange (value) {
      this.priceType = value
    },
    setColumns () {
      if (this.priceType === '市场价') {
        this.productType.item = this.productType.item2
      } else {
        this.productType.item = this.productType.item1
      }
    }
  }
}
</script>

<style scoped>

</style>
