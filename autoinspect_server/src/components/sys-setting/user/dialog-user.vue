<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" center>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请填写用户名" class="input-item20" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="form.userType" placeholder="请选择用户类型" class="input-item20" clearable>
          <el-option v-for="type in option.userType" :key="type.value" :label="type.name"
                     :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="form.passWord" placeholder="请填写用户密码" type="password" class="input-item20" clearable></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="repeatPassWord">
        <el-input v-model="form.repeatPassWord" placeholder="请重新填写用户密码" type="password" class="input-item20" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="btnConfirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {userType} from '../../options'
import * as api from '../../../api/index'
export default {
  data () {
    let checkRepeatPassword = (rule, value, callback) => {
      console.log(value, this.form.passWord)
      if (value) {
        if (value !== this.form.passWord) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('密码不能为空'))
      }
    }
    return {
      dialog: {title: '新增', visible: false},
      formData: {},
      form: {
        userName: '',
        userType: '',
        passWord: '',
        repeatPassWord: ''
      },
      option: { userType: [] },
      rules: {
        userName: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 2, max: 11, message: '用户名只能为2-11位数字', trigger: 'blur'}
        ],
        userType: [
          {required: true, message: '请选择用户类型', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 2, max: 50, message: '密码只能为2-50位字符', trigger: 'blur'}
        ],
        repeatPassWord: [
          // {required: true, message: '密码不能为空', trigger: 'blur'},
          // {min: 2, max: 50, message: '密码只能为2-50位字符', trigger: 'blur'},
          {required: true, validator: checkRepeatPassword, trigger: 'blur'}
        ]
      },
      loading: {confirm: false}
    }
  },
  mounted () {
    this.option.userType = userType
  },
  methods: {
    show (data) {
      this.dialog.visible = true
      this.dialog.title = data ? '修改' : '新增'
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        if (data) {
          this.formData = data
          this.form.userName = data.userName
          this.form.userType = data.userType
          this.form.passWord = data.passWord
        }
      })
    },
    btnConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading.confirm = true
          if (this.dialog.title === '新增') {
            api.defect.addSysUser(this.form).then(response => {
              let data = response.data
              if (data.meta.code === 100000) {
                this.dialog.visible = false
                this.$emit('confirmSuccess')
              } else {
                this.$message({type: 'error', message: data.meta.message})
              }
            }).catch(e => {
              this.$message({type: 'error', message: e.response.data.message})
            }).finally(() => {
              this.loading.confirm = false
            })
          } else {
            let param = {...this.form, id: this.formData.id}
            console.log(param)
            api.defect.updateSysUser(param).then(response => {
              let data = response.data
              if (data.meta.code === 100000) {
                this.dialog.visible = false
                this.$emit('confirmSuccess')
              } else {
                this.$message({type: 'error', message: data.meta.message})
              }
            }).catch(e => {
              this.$message({type: 'error', message: e.message})
            }).finally(() => {
              this.loading.confirm = false
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
