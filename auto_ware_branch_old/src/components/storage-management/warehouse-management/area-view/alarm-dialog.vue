<template>
  <el-dialog title="报警设置" :visible.sync="visible" width="50%">
    <el-select v-model="warehouse" placeholder="请选择仓库">
      <el-option
        v-for="item in warehouseOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <div class="line2">
      <span>库位中含生产日期超出</span>
      <el-input-number :controls="false" style="width: 50px" v-model="day" size="mini" :min="1"></el-input-number>
      <span>天</span>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button :loading="loading.submit" type="primary" @click="comfirm">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    props: ['warehouseOptions'],
    data () {
      return {
        visible: false,
        warehouse: '',
        day: 1,
        loading: {
          submit: false
        }
      }
    },
    methods: {
      open (data) {
        this.warehouse = this.warehouseOptions[0].id
        console.log(data)
        this.day = 1
        this.visible = true
      },
      comfirm () {
        this.loading.submit = true
        api.storage.warehouseManagement.updateWarehouseWarnDay({
          warnDay: this.day,
          wareHouseId: this.warehouse
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.visible = false
            this.$emit('submitSuccess')
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.submit = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .line2{
    margin-top: 20px;
  }
</style>
