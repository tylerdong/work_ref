<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="userInfo" :rules="rules" ref="userInfo" :label-width="formLabelWidth">
      <el-form-item label="账号" prop="account">
        <el-input v-model="userInfo.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="useName">
        <el-input v-model="userInfo.useName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="组织机构" prop="organizationName">
        <input type="text"
               class="organizationInput"
               placeholder="请选择组织机构"
               v-model="userInfo.organizationName"
               :readonly="true"
               @click="showOrganizationManagement" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="userInfo.describe"  placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addUser()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    props: {
      userInfo: {
        type: Object
      }
    },
    data () {
      return {
        title: '新增帐号',
        dialogFormVisible: false,
        rules: {
          account: [
            { required: true, message: '帐号不能为空', trigger: 'blur' },
            { min: 1, max: 18, message: '长度不得超过18个字符', trigger: 'blur change' }
          ],
          useName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 1, max: 18, message: '长度不得超过18个字符', trigger: 'blur change' }
          ],
          organizationName: [
            { required: true, message: '请选择组织结构', trigger: 'blur change' }
          ],
          describe: [
            { min: 1, max: 64, message: '长度不得超过64个字符', trigger: 'change' }
          ]
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      showOrganizationManagement () {
        this.$emit('organization')
      },
      addUser () {
        this.$refs.userInfo.validate(val => {
          if (val) {
            let params = {
              account: this.userInfo.account,
              name: this.userInfo.useName,
              organizationIdList: this.userInfo.organizationIdList,
              describe: this.userInfo.describe
            }
            api.userManagerCenter.adminAddUser(params).then(response => {
              let data = response.data
              if (data.messageType === 1) {
                this.$message({
                  type: 'success',
                  message: data.message
                })
                this.dialogFormVisible = false
                this.$emit('add')
                return true
              } else {
                data = JSON.parse(data.data)
                this.$message({type: 'error', message: data.meta.message})
                return false
              }
            }).catch(error => {
              console.log(error)
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .organizationInput {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: block;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
</style>
