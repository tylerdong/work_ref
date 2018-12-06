<!-- 新增 -->
<template>
  <dialog-side :title="dialog.title" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option v-for="item in plateNumberType" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号" prop="number">
        <el-input v-model="form.number" placeholder="请输入车牌号"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnSave" :loading="loading.btnSave">确定</el-button>
    </div>
  </dialog-side>
</template>
<script>
  import * as api from 'src/api/index'
  import { eventHub } from '../../../../module/eventHub'
  // import storage from 'storage'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {},
    props: ['plateNumberType'],
    data () {
      return {
        dialog: {
          visible: false,
          title: '新增'
        },
        loading: {
          btnSave: false
        },
        form: {
          id: '',
          number: '',
          type: 'WIRE'
        },
        rules: {
          type: [
            {required: true, message: '请选择类型', trigger: 'change blur'}
          ],
          number: [
            {required: true, message: '请输入车牌号', trigger: 'changes blur'}
          ]
        }
      }
    },
    methods: {
      /* 打开 */
      btnOpen (data) {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.dialog.title = data.action === 'add' ? '新增' : '修改'
        this.$refs.form.resetFields()
        if (data.action === 'edit') {
          this.form.id = data.id
          this.form.number = data.number
          this.form.reason = data.reason
        }
      },
      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true
            let param = {
              number: this.form.number,
              type: this.form.type
            }
            if (this.form.id) {
              Object.assign(param, {id: this.form.id})
              api.storage.warehouseMaintain.updatePlateNumber(param).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                  eventHub.$emit('plateNumberUpdate')
                } else {
                  this.$message.error(data.message)
                }
              }).finally(() => {
                this.loading.btnSave = false
              })
            } else {
              api.storage.warehouseMaintain.createPlateNumber(param).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                  eventHub.$emit('plateNumberUpdate')
                } else {
                  this.$message.error(data.message)
                }
              }).finally(() => {
                this.loading.btnSave = false
              })
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
