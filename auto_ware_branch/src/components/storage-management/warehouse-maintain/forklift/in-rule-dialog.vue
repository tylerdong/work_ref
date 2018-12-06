<template>
  <el-dialog title="入库叉车分配规则" :visible.sync="visible" width="30%">
    <el-checkbox v-model="checked">分配给对应车间所有叉车</el-checkbox>
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
        checked: false
      }
    },
    methods: {
      open () {
        this.checked = false
        this.visible = true
      },
      comfirm () {
        api.storage.warehouseMaintain.updateInRule({
          checked: this.checked
        }).finally(() => {
          this.visible = false
        })
      }
    }
  }
</script>
