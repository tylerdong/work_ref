<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="60%" append-to-body modal-append-to-body>
    <el-form :model="form" :rules="rules" ref="form" label-width="108px">
      <el-form-item label="培训主题" prop="trainingTile">
        <el-input v-model="form.trainingTile" placeholder="请填写主题" :disabled="formData.type === 'view'"
                  class="edit-dialog-template-input"></el-input>
      </el-form-item>
      <el-form-item label="讲师" prop="lecturer">
        <el-select v-model="form.lecturer" placeholder="请选择讲师" :disabled="formData.type === 'view'"
                   class="edit-dialog-template-input">
          <el-option v-for="(item,index) in option.users" :label="item.useName" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划完成时间" prop="planCompleteDate">
        <el-date-picker type="datetime" v-model="form.planCompleteDate" placeholder="请填写计划完成时间"
                        :disabled="formData.type === 'view'" class="edit-dialog-template-input"></el-date-picker>
      </el-form-item>
      <el-form-item label="计划参与人员" prop="usersArray">
        <el-select v-model="form.usersArray" multiple placeholder="请选择参与人员" :disabled="formData.type === 'view'"
                   class="edit-dialog-template-input">
          <el-option v-for="(item,index) in option.users" :label="item.useName" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请填写备注" :disabled="formData.type === 'view'"
                  class="edit-dialog-template-input"></el-input>
      </el-form-item>
      <!--<el-form-item label="已培训" prop="isAlreadyRegister" true-label="Y" false-label="N">-->
        <!--<el-checkbox v-model="form.isAlreadyRegister" :disabled="formData.type === 'view'"-->
                     <!--class="edit-dialog-template-input"></el-checkbox>-->
      <!--</el-form-item>-->
      <el-form-item label="登记人" prop="registerName">
        <el-input v-model="form.registerName" disabled class="edit-dialog-template-input"></el-input>
      </el-form-item>
      <el-form-item label="登记时间" prop="registerDate">
        <el-date-picker type="datetime" v-model="form.registerDate" disabled class="edit-dialog-template-input"></el-date-picker>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" @click="confirm('form')" :loading="loading.confirm" :disabled="formData.type === 'view'">确认</el-button>
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
        title: '',
        dialogVisible: false,
        userInfo: {},
        loading: {confirm: false},
        option: {users: []},
        formData: {},
        form: {
          creator: '',                  // 创建人
          gmtCreate: new Date(),        // 创建时间
          modifier: '',                 // 更新人
          gmtModified: new Date(),      // 更新时间
          trainingTile: '',             // 培训主题
          usersArray: [],               // 参与人
          users: [],
          lecturer: '',                 // 讲师
          planCompleteDate: '',         // 计划完成时间
          remark: '',                   // 备注
          isAlreadyRegister: 'N',       // 是否已经培训
          register: '',                 // 登记人
          registerName: '',             // 登记人名字
          registerDate: new Date()      // 登记时间
        },
        rules: {
          trainingTile: [{ required: true, message: '请填写主题', trigger: 'blur' }],
          lecturer: [{ required: true, message: '请选择讲师', trigger: 'blur' }],
          usersArray: [{ required: true, type: 'array', message: '请选择参与人', trigger: 'blur' }],
          planCompleteDate: [{ required: true, type: 'date', message: '请选择计划完成时间', trigger: 'blur' }]
        }
      }
    },
    mounted () {
      this.getUserList()
      this.userInfo = storage.getUser()
      this.form.register = this.userInfo.userId
      this.form.registerName = this.userInfo.name
      this.form.registerDate = new Date()
    },
    methods: {
      getUserList () {
        api.chemicalLaboratory.userManagerCenter.normalUserList({pageIndex: 1, pageCount: 10000}).then(response => {
          let data = response.data
          if (data.data && data.data.list && data.data.list.length > 0) {
            this.option.users = data.data.list
          } else {
            this.option.users = []
          }
        })
      },
      show (data) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.formData = data
          console.log(this.formData)
          // if (['edit'].includes(data.type)) {
          //   this.form.trainingTile = data.trainingTile
          //   this.form.lecturer = data.lecturer // TODO
          //   this.form.planCompleteDate = new Date(data.planCompleteDate)
          //   this.form.remark = data.remark
          //   this.form.isAlreadyRegister = data.isAlreadyRegister
          //   this.form.registerName = data.register // TODO
          //   this.form.usersArray = data.users ? data.users.map(item => { return item.id }) : []
          // }
          if (['view', 'edit'].includes(data.type)) {
            api.chemicalLaboratory.labTrainingPlanController.getLabTrainingPlanVoById({id: data.trainingPlanId}).then(response => {
              let data = response.data
              if (data.success) {
                data = data.data
                this.form.trainingTile = data.trainingTile
                this.form.lecturer = data.lecturer
                this.form.planCompleteDate = new Date(data.planCompleteDate)
                this.form.remark = data.remark
                this.form.isAlreadyRegister = data.isAlreadyRegister
                this.form.register = data.register
                this.form.usersArray = data.users ? data.users.map(item => { return item.id }) : []
                this.form.creator = data.creator
                this.form.gmtCreate = data.gmtCreate
                this.form.id = data.id
              }
            })
          }
        })
      },
      confirm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.form.users = this.form.usersArray.map(value => {
              return this.option.users.find(user => {
                return user.id === value
              })
            })
            if (this.formData.type === 'edit') {
              // this.form.id = this.formData.id
              // this.form.creator = this.formData.creator
              // this.form.gmtCreate = this.formData.gmtCreate
              this.form.modifier = this.userInfo.userId
              this.form.gmtModified = new Date()
              this.edit(this.form)
            } else {
              this.form.creator = this.userInfo.userId
              this.form.gmtCreate = new Date()
              this.form.modifier = this.userInfo.userId
              this.form.gmtModified = new Date()
              this.add(this.form)
            }
          }
        })
      },
      add (params) {
        this.loading.confirm = true
        api.chemicalLaboratory.labTrainingPlanController.createLabTrainingPlanVo(params).then(response => {
          if (response.data.success) {
            this.$emit('success')
            this.dialogVisible = false
          } else {
            this.$message.error(response.data.errorMessage)
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      edit (params) {
        this.loading.confirm = true
        api.chemicalLaboratory.labTrainingPlanController.updateLabTrainingPlanVo(params).then(response => {
          if (response.data.success) {
            this.$emit('success')
            this.dialogVisible = false
          } else {
            this.$message.error(response.data.errorMessage)
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.confirm = false
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
