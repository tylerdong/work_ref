<template>
  <el-dialog title="新增管理员" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="newUserInfo" :rules="rules" ref="newUserInfo" :label-width="formLabelWidth">
      <el-form-item label="账号名称" prop="account">
        <el-input type="number" v-model="newUserInfo.account" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="useName">
        <el-input v-model="newUserInfo.useName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="初始密码" prop="password">
        <el-input v-model="newUserInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="子系统" prop="subSystem">
        <el-select v-model="newUserInfo.subSystem" placeholder="请选择子系统">
          <el-option label="请选择子系统" value=""></el-option>
          <el-option
            v-for="item in select.subSystems"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sureBtn('newUserInfo')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    props: {
      newUserInfo: {
        type: Object
      }
    },
    data () {
      return {
        dialogFormVisible: false,
        rules: {
          account: [
            { required: true, message: '帐号不能为空', trigger: 'blur' },
            { min: 6, max: 11, message: '帐号只能为6-11位数字', trigger: 'blur change' }
          ],
          useName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 1, max: 9, message: '用户名长度为1-9位', trigger: 'blur change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '密码长度为8-16位', trigger: 'blur change' }
          ],
          subSystem: [
            {required: true, message: '子系统不能为空', trigger: 'blur'}
          ]
        },
        select: {
          subSystems: []
        },
        formLabelWidth: '120px'
      }
    },
    mounted () {
      this.initSubsystem()
    },
    methods: {
      sureBtn (newUserInfo) {
        this.$refs[newUserInfo].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.$emit('add')
          } else {
            return false
          }
        })
      },
      initSubsystem () {
        api.superManagerUser.getSubSystemList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.select.subSystems = data.data
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {})
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
