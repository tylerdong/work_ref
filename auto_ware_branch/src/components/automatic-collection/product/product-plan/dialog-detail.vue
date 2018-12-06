<template>
  <dialog-side width="350px" :title="title" :visible.sync="dialogFormVisible">
    <div>
      <h4>[{{ newInfo.type==='1'?'改批':'样品' }}]<span> {{newInfo.line}}-{{newInfo.batchNo}}</span><span> ({{ newInfo.status==='1'?'未执行':newInfo.status==='2'?'执行中':'已完成' }})</span></h4>
      <ul class="item-wrapper tc">
        <li class="item-info">
          <span class="item">位号</span><span class="status">状态</span><span class="btn-box">操作</span>
        </li>
        <li v-for="item in itemList" class="item-info">
          <span class="item">{{ item.item }}</span>
          <span class="status">{{ item.status==='1'?'未执行':item.status==='2'?'执行中':'已完成' }}</span>
          <span class="btn-box"><el-button
            @click.native.prevent="executePlan(item)"
            type="success"
            size="small" :disabled="item.status==='3'">
                {{ item.status==='1'?'执行':item.status==='2'?'完成':'已完成' }}
              </el-button></span>
        </li>
      </ul>
    </div>
  </dialog-side>
</template>

<script>
  import * as api from '../../../../api/index'
  import storage from '../../../../module/storage'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        title: '生产计划详情',
        dialogFormVisible: false,
        formLabelWidth: '80px',
        itemList: [],
        newInfo: {
          id: '',
          type: '',
          line: '',
          batchNo: '',
          status: ''
        },
        disabled: true
      }
    },
    methods: {
      show (item) {
        this.newInfo.id = item.id
        this.newInfo.type = item.type
        this.newInfo.line = item.line
        this.newInfo.batchNo = item.batchNo
        this.newInfo.status = item.status
        this.dialogFormVisible = true
        this.getData()
      },
      getData () {
        let params = {
          productionPlanId: this.newInfo.id
        }
        api.automatic.productPlan.showPlan(params).then(response => {
          if (response.data.messageType === 1) {
            this.itemList = response.data.data
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      executePlan (item) {
        let params = {
          productionPlanDetailId: item.id
        }
        api.automatic.productPlan.itemDetail(params).then(response => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.getData()
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.item-wrapper{
  .item-info{
    padding: 10px;
    span{display: inline-block}
    .item{width: 30%}
    .status{width: 30%}
    .btn-box{width: 30%}
    &:nth-child(1){
      background-color: rgb(238, 241, 246);
    }
  }
}
</style>
