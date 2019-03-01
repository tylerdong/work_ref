<template>
  <Modal v-model="modal.show" :title="modal.title" closable footer-hide draggable>
    <table class="custom-table">
      <thead>
        <tr><th>属性</th><th>值</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.props" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.value}}</td>
        </tr>
      </tbody>
    </table>
  </Modal>
</template>

<script>
import dateFns from 'date-fns'
export default {
  props: ['status'],
  data () {
    return {
      modal: {show: false, title: '详情'},
      props: []
    }
  },
  methods: {
    asyncOK () {
      this.modal.show = false
    },
    show (data) {
      this.modal.show = true
      this.props = []
      this.props.push({name: 'ID', value: data.id})
      this.props.push({name: '品名', value: data.productClassName})
      this.props.push({name: '规格', value: data.spec})
      this.props.push({name: '纤度', value: data.fiberNum})
      this.props.push({name: '光泽', value: data.gloss})
      this.props.push({name: '颜色', value: data.color ? data.color : ''})
      this.props.push({name: '等级', value: data.grade})
      this.props.push({name: '状态', value: this.status.find(item => item.key === data.status).value})
      this.props.push({name: '价格', value: data.price})
      this.props.push({name: '价格单位', value: data.unit})
      this.props.push({name: '价格类型', value: data.priceType})
      this.props.push({name: '价格时间', value: data.priceDate})
      this.props.push({name: '物流方式', value: data.logisticsType})
      this.props.push({name: '结算方式', value: data.settleType ? data.settleType : ''})
      this.props.push({name: '销售区域', value: data.salesArea})
      this.props.push({name: '生产厂家', value: data.groupName ? data.groupName : '' + data.manufacturer})
      this.props.push({name: '提示说明', value: data.resultComment})
      this.props.push({name: '备注', value: data.remark})
      this.props.push({name: '创建人', value: data.creator})
      this.props.push({name: '创建时间', value: dateFns.format(data.gmtCreate, 'YYYY-MM-DD HH:mm')})
      this.props.push({name: '更新时间', value: dateFns.format(data.gmtModified, 'YYYY-MM-DD HH:mm')})
    }
  }
}
</script>

<style scoped>

</style>
