<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="60%">
    <el-form :rules="rules" :model="form" ref="form" label-width="108px">
      <el-form-item label="人员" prop="userId">
        <el-select v-model="form.userId" clearable class="edit-dialog-template-input">
          <el-option v-for="(item,index) in options.user" :key="item.id" :label="item.useName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="rewardType">
        <el-select v-model="form.rewardType" clearable class="edit-dialog-template-input">
          <el-option v-for="(item,index) in options.rewardTypes" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件" prop="event" required>
        <el-input v-model="form.event" class="edit-dialog-template-input"></el-input>
      </el-form-item>
      <el-form-item label="分值" prop="fraction">
        <el-input v-model="form.fraction" class="edit-dialog-template-input"></el-input>
      </el-form-item>
      <el-form-item label="登记人" prop="registerName">
        <el-input v-model="form.registerName" disabled class="edit-dialog-template-input"></el-input>
      </el-form-item>
      <el-form-item label="登记时间" prop="registerDate">
        <el-date-picker type="datetime" v-model="form.registerDate" disabled class="edit-dialog-template-input"></el-date-picker>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" @click="confirm('form')" :loading="loading.confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    props: ['lecturerOptions'],
    data () {
      return {
        dialogVisible: false,
        title: '',
        options: {user: [], rewardTypes: [{name: '惩罚', value: 'PUNISH'}, {name: '奖励', value: 'REWARD'}]},
        type: '',
        formData: {},
        form: {
          creator: '',
          modifier: '',
          userName: '',
          userId: '',
          rewardType: '',
          event: '',
          fraction: '',
          register: '',
          registerName: '',
          registerDate: ''
        },
        rules: {
          userId: { required: true, message: '请选择人员', trigger: 'blur' },
          rewardType: { required: true, message: '请选择类型', trigger: 'blur' },
          event: { required: true, message: '请填写事件', trigger: 'blur' }
        },
        loading: { confirm: false }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.getUserList()
      this.form.registerName = this.userInfo.name
      this.form.registerDate = new Date()
    },
    methods: {
      show (data) {
        this.dialogVisible = true
        this.type = data.type
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          if (data.type === 'edit') {
            this.formData = data
            this.form.userId = data.userId
            this.form.rewardType = data.rewardType
            this.form.event = data.event
            this.form.fraction = data.fraction
            // this.form.registerName = data.registerName
            this.form.registerDate = data.registerDate
          }
        })
      },
      getUserList () {
        api.chemicalLaboratory.userManagerCenter.normalUserList({pageIndex: 1, pageCount: 10000}).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.options.user = data.data.list
          }
        })
      },
      confirm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading.confirm = true
            let params = this.form
            let selectedUser = this.options.user.find(item => item.id === params.userId)
            params.userName = selectedUser.useName
            if (this.type === 'edit') {
              params.id = this.formData.id
              params.creator = this.formData.creator
              params.modifier = this.userInfo.userId
              params.register = this.formData.register
              params.registerDate = this.formData.registerDate
              api.chemicalLaboratory.labUserRewardsController.updateLabUserRewardsDo(params).then(response => {
                const data = response.data
                if (data.success === true) {
                  this.$emit('success')
                  this.dialogVisible = false
                }
              }).catch(error => {
                console.log(error)
              }).finally(() => {
                this.loading.confirm = false
              })
            } else {
              params.creator = this.userInfo.userId
              params.modifier = this.userInfo.userId
              params.register = this.userInfo.userId
              params.registerDate = new Date()
              api.chemicalLaboratory.labUserRewardsController.createLabUserRewardsDo(params).then(response => {
                const data = response.data
                if (data.success === true) {
                  this.$emit('success')
                  this.dialogVisible = false
                }
              }).catch(error => {
                console.log(error)
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
  .edit-dialog-template-input {
    width: 30rem;
  }
</style>

