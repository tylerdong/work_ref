<template>
  <dialog-side title="修改" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="装运点名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入装运点名称"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入描述"></el-input>
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
          code: '',
          reason: ''
        },
        rules: {
          code: [
            {required: true, message: '请输入编号', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入装运点名称', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      /* 打开 */
      open (row) {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.form = {
          id: row.id,
          code: row.code,
          name: row.name,
          description: row.description
        }
      },

      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true
            api.storage.warehouseMaintain.updateTransportPoint({
              modifier: storage.getUser().account,
              id: this.form.id,
              code: this.form.code,
              name: this.form.name,
              description: this.form.description
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
