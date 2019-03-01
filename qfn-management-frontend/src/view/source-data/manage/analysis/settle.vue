<template>
  <div class="container">
    <Button v-check-promission="elements.sourceData.analysis.settle.confirm"
            :loading="loading.confirm"
            @click="btnConfirm"
            type="success"
            class="btn-confirm">审核通过并提交</Button>
    <Tabs :value="currentName" @on-click="tabChange">
      <TabPane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.name">
        <Table :data="table.data"
               :columns="table.columns"
               class="table-bottom-20"
               :row-class-name="setRowClass"
               :loading="loading.table"
               :disabled-hover="disabledHover"></Table>
      </TabPane>
    </Tabs>

  </div>
</template>

<script>
import api from '@/api/data'
import elements from '@/config/elements'
export default {
  props: ['product', 'status', 'code', 'priceType'],
  data () {
    return {
      elements,
      tabs: [{title: '宏观指数价格', name: 'exponent'}, {title: '规格市场价', name: 'market'}],
      disabledHover: true,
      currentName: 'exponent',
      search: {timeSpan: [undefined, undefined], product: '', status: '4'},
      loading: {table: false, confirm: false},
      table: {
        data: [],
        columns: []
      },
      tabCols: {
        exponent: [
          {title: '品名', key: 'productClassName', align: 'center'},
          {title: '最新价', key: 'newPrice', align: 'center'},
          {title: '较昨日涨跌幅（%）', key: 'upDownRate', align: 'center'},
          {title: '价格时间', key: 'priceDate', align: 'center'}
        ],
        market: [
          {title: '品名', key: 'productClassName', align: 'center'},
          {title: '规格', key: 'spec', align: 'center'},
          {title: '区域', key: 'salesArea', align: 'center'},
          {title: '最新价', key: 'newPrice', align: 'center'},
          {title: '较昨日涨跌幅（%）', key: 'upDownRate', align: 'center'},
          {title: '价格时间', key: 'priceDate', align: 'center'}
        ]
      }
    }
  },
  computed: {
    sCode: function () {
      return this.code
    },
    pPromtPrice: function () {
      return this.priceType
    }
  },
  watch: {
    pPromtPrice: function (newQuestion, oldQuestion) {
      this.getData()
    },
    '$route' (to, from) {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading.table = true
      this.table.columns = this.tabCols[`${this.currentName}`]
      let data = {sign: this.currentName, productClassCode: this.sCode, priceType: this.pPromtPrice}
      api.getAccountData(data).then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data) {
            this.table.data = [...data.currentAccountDataVos.map(item => Object.assign(item, {type: 'current'})),
              ...data.beforeAccountDataVos.map(item => Object.assign(item, {type: 'befor'}))]
          } else {
            this.table.data = []
          }
        } else {
          this.$Message.error(response.exception)
        }
      }).catch(e => {
        this.$Message.error(e.message)
      }).finally(() => {
        this.loading.table = false
      })
    },
    // 审核通过并提交
    btnConfirm () {
      let that = this
      this.$Modal.confirm({
        title: '提示',
        closable: true,
        content: '审核通过提交后将整体提交本次审核后的数据，请确认？',
        onOk: () => {
          this.loading.confirm = true
          api.submitPreManufacturePrice({productClassCode: that.sCode, priceType: that.pPromtPrice}).then(response => {
            if (response.code === 1000) {
              this.$Message.success(response.message)
            } else {
              this.$Message.error(response.message)
            }
          }).catch(e => {
            this.$Message.error(e.response.data.message)
          }).finally(() => {
            this.loading.confirm = false
          })
        }
      })
    },
    tabChange (val) {
      this.currentName = val
      this.getData()
    },
    setRowClass (row, index) {
      return row.type === 'current' ? 'row-background-color' : ''
    }
  }
}
</script>

<style scoped>
  .container {
    position: relative;
  }
  .btn-confirm {
    position: absolute;
    right: 0;
    z-index: 9999;
  }

</style>
