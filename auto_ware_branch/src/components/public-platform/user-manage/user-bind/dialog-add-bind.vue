<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.toggle" @close="close" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="用户名" prop="userId">
        <el-select v-model="form.userId" filterable placeholder="请选择帐户">
          <el-option
            v-for="item in select.users"
            :label="item.useName"
            :key="item.id"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="员工" prop="personId" filterable>
        <el-select v-model="form.personId" filterable placeholder="请选择员工">
          <el-option
            v-for="item in select.persons"
            :label="item.name"
            :key="item.id"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    mounted () {
      this.userInfo = storage.getUser()
      console.log(this.userInfo)
    },
    data () {
      return {
        dialog: {
          title: '',
          toggle: false
        },
        userInfo: {},
        form: {
          userId: '',
          personId: ''
        },
        select: {
          users: [],
          persons: []
        },
        loading: false,
        rules: {
          userId: [{required: true, message: '请选择用户', trigger: 'blur change'}],
          personId: [{required: true, message: '请选择人员', trigger: 'blur'}]
        }
      }
    },
    methods: {
      close () {
        this.form = {
          userId: '',
          personId: ''
        }
      },

      toggle (params) {
        this.dialog = {
          title: params.title,
          toggle: params.toggle
        }
        this.initSelects()
      },

      handleConfirm () {
        this.$refs.form.validate(val => {
          if (val) {
            this.loading = true
            if (this.dialog.title === '新增绑定') {
              api.userManagerCenter.bandingUserPerson({
                userId: this.form.userId,
                personId: this.form.personId,
                subsystemId: this.userInfo.subsystemId
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
              }).finally(() => {
                this.loading = false
              })
              return true
            }
          } else {
            return false
          }
        })
      },

      initSelects () {
        // 获取用户
        api.userCenter.getUserListByNoPage({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.select.users = []
            this.select.users = data.data.userList
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return true
          }
        }).finally(() => {
          this.loading = false
        })

        // 获取人员
        api.userManagerCenter.getPersonListByNoPage({
          subsystemId: this.userInfo.subsystemId
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.select.persons = []
            this.select.persons = data.data
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return true
          }
        }).finally(() => {
          this.loading = false
        })

        // 初始化子系统
//        this.select.subSystems = []
//        api.superManagerUser.getSubSystemList().then(response => {
//          const data = response.data
//          if (data.messageType === 1) {
//            this.select.subSystems = data.data
//            return true
//          }
//          if (data.messageType === 2) {
//            this.$message.error(data.message)
//            return false
//          }
//        }).catch(error => {
//          console.log(error)
//        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
