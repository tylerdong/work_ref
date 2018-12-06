<!-- 丝锭异常状态详情 -->
<template>
  <el-dialog
    width="30%"
    :title="dialog.title"
    :visible.sync="dialog.visible">
    <div class="content-box" v-for="(item,index) in listData" :key="index">
      <div class="static overflow">
        {{item.exception}}
      </div>
      <div class="registrant overflow">
        登记人：{{item.registrant}}
      </div>
      <div class="registrationTime overflow">
        登记时间：{{item.registeredTime | timeFormat('YYYY-MM-DD HH:mm')}}
      </div>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        listData: [],
        dialog: {
          title: '丝锭异常查询',
          visible: false
        }
      }
    },

    methods: {
      handleOpen (scope) {
        this.dialog.visible = true
        this.listData = scope.row.exceptionBoList
        console.log(scope)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    .static {
      flex: 0 1 auto;
    }
    .registrant {
      flex: 0 2 auto;
    }
    .registrationTime {
      flex: 0 3 auto;
    }
  }

  .overflow {
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
