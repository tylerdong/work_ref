<!--组件名-->
<template>
  <div>
    <jk-dialog
      title="详细信息"
      width="500px"
      :visible.sync="dialogVisible">
      <div v-loading="loading.list">
        <el-row>
          <el-col :span="12">
            <span class="list-label">丝锭编号：</span>
            <span>{{listData.silkCode}}</span>
          </el-col>
          <el-col :span="12">
            <span class="list-label">规格：</span>
            <span>{{listData.silkSpec}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="list-label">批号：</span>
            <span>{{listData.batchNo}}</span>
          </el-col>
          <el-col :span="12">
            <span class="list-label">丝锭等级：</span>
            <span>{{listData.silkGradeName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="list-label">线别：</span>
            <span>{{listData.lineName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="list-label">锭重：</span>
            <span>{{listData.silkWeight}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="list-label">位号：</span>
            <span>{{listData.item}}</span>
          </el-col>
          <el-col :span="12">
            <span class="list-label">当前环节：</span>
            <span>{{listData.productionProcessName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="list-label">班次：</span>
            <span>{{listData.classesName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="list-label">落次：</span>
            <span>{{listData.fallNo}}</span>
          </el-col>
        </el-row>
        <div v-for="(item,index) in listData.silkExceptionRecordBoList" :key="index">
          <span class="list-label">{{item.productionProcessName}}异常：</span>
          <span>{{item.exceptionName}}</span>
        </div>
      </div>
    </jk-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'jk-dialog': require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        listData: {},
        loading: {
          list: false
        }
      }
    },
    mounted () {
    },
    methods: {
      getData (item, all) {
        let params = {silkCode: item.silkCode}
        if (all !== undefined) {
          let preogres = all.filter(item2 => {
            for (let i of item2.silkInfoBoList) {
              if (i === item) {
                return true
              }
            }
          })
          if (preogres.length > 0) {
            Object.assign(params, {productionProcessId: preogres[0].productionProcessId})
          }
          this.loading.list = true
          api.automatic.statement.getSilkInfoHistoryBySilkCode(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              console.log(data)
              this.listData = data.data
            }
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.loading.list = false
          })
        } else {
          api.automatic.statement.getSilkInfoBySilkCode({silkCode: item.silkCode}).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              console.log(data)
              this.listData = data.data
            }
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.loading.list = false
          })
        }
      },
      show (nowItem, all) {
        this.dialogVisible = true
        this.getData(nowItem, all)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .list-label{
    display: inline-block;
    width: 100px;
    text-align: right;
    line-height: 34px;
  }
</style>
