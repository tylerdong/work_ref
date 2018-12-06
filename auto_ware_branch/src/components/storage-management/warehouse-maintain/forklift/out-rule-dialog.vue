<template>
  <el-dialog title="出库叉车分配规则" :visible.sync="visible" width="30%">
    <el-checkbox v-model="checked1">分配给对应仓库叉车</el-checkbox><br>
    <el-checkbox v-model="checked2">每 <el-input-number :controls="false" style="width: 50px" v-model="count" size="mini"></el-input-number> 吨加一叉车</el-checkbox><br>
    <el-checkbox v-model="checked3">在线按任务数少优先</el-checkbox><br>
    <el-checkbox v-model="checked4">按任务数少优先</el-checkbox><br>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="comfirm">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    data () {
      return {
        visible: false,
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        count: 0
      }
    },
    methods: {
      open () {
        this.checked1 = false
        this.checked2 = false
        this.checked3 = false
        this.checked4 = false
        this.count = 0
        this.visible = true
      },
      comfirm () {
        api.storage.warehouseMaintain.updateOutRule({
          checked1: this.checked1,
          checked2: this.checked2,
          checked3: this.checked3,
          checked4: this.checked4,
          count: this.count
        }).finally(() => {
          this.visible = false
        })
      }
    }
  }
</script>
