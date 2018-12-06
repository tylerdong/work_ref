<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.toggle" @close="close" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder='请输入角色名称'></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input type="textarea" v-model="form.describe" auto-complete="off" placeholder='请输入角色描述'></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import * as api from 'src/api'
  export default {
    mounted () {
    },
    data () {
      return {
        dialog: {
          title: '',
          toggle: false
        },
        form: {
          id: '',
          name: '',
          describe: ''
        },
        loading: false,
        rules: {
          name: [{required: true, message: '请输入角色名', trigger: 'blur'}]
        }
      }
    },
    methods: {
      close () {
        this.loading = false
        this.$refs.form.resetFields()
      },

      toggle (params) {
        this.dialog = {
          title: params.title,
          toggle: params.toggle
        }
        this.form = {
          id: params.id,
          name: params.name,
          describe: params.describe
        }
      },

      handleConfirm () {
        this.$refs.form.validate(val => {
          if (val) {
            this.loading = true
            if (this.dialog.title === '新增角色') {
              this.add()
              return true
            }
            if (this.dialog.title === '修改角色') {
              this.edit()
              return true
            }
          } else {
            this.$message.error('请检查填选项')
          }
        })
      },

      add () {
        api.marManager.adminRoleAdd({
          name: this.form.name,
          describe: this.form.describe
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.dialog.toggle = false
            this.$emit('callback')
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading = false
        })
      },

      edit () {
        api.marManager.adminModifyRole({
          describe: this.form.describe,
          name: this.form.name,
          id: this.form.id
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.dialog.toggle = false
            this.$emit('callback')
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
