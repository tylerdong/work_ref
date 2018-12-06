<!-- 新增 -->
<template>
  <dialog-side title="修改" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="编号" prop="number">
        <el-input v-model="form.number" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="退货原因" prop="reason">
        <el-input v-model="form.reason" placeholder="请输入退货原因"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnSave" :loading="loading.btnSave">确定</el-button>
    </div>
  </dialog-side>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
    },
    props: ['shopList', 'forkliftTypeList'],
    data () {
      return {
        dialog: {
          visible: false
        },
        loading: {
          btnSave: false
        },
        form: {
          id: '',
          number: '',
          reason: ''
        },
        rules: {
          number: [
            {required: true, message: '请输入编号', trigger: 'change blur'}
          ],
          reason: [
            {required: true, message: '请输入退货原因', trigger: 'changes blur'}
          ]
        }
      }
    },
    methods: {
      /* 打开 */
      btnOpen (row) {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.form = {
          id: row.id,
          number: row.number,
          reason: row.reason
        }
      },

      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true
            api.storage.warehouseMaintain.updateReturnReason({
              modifier: storage.getUser().account,
              id: this.form.id,
              number: this.form.number,
              reason: this.form.reason
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialog.visible = false
                this.$emit('submitSuccess')
              }
            }).finally(() => {
              this.loading.btnSave = false
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
