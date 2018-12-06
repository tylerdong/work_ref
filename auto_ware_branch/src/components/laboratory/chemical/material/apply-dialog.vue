<template>
  <el-dialog width="60%" :title="title" :visible.sync="dialogVisible">
    <el-form :rules="rules" ref="form" :model="form" label-width="108px">
      <el-form-item label="分类" prop="groupId" required>
        <el-select class="material-form-item" v-model="form.groupId" @change="changeGroupId" :disabled="this.type !== 'add'" filterable clearable>
          <el-option v-for="item in groupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="instrumentId" required>
        <el-input class="material-form-item" v-model="form.accidentCause"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="accidentCause" required>
        <el-input class="material-form-item" v-model="form.accidentCause"></el-input>
      </el-form-item>
      <el-form-item label="申请数量" prop="reporter" required>
        <el-input class="material-form-item" v-model="form.accidentCause"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="reporter" required>
        <el-input class="material-form-item" v-model="form.accidentCause"></el-input>
      </el-form-item>
      <el-form-item label="申请人" prop="registerName">
        <el-input class="material-form-item" v-model="form.registerName" disabled></el-input>
      </el-form-item>
      <el-form-item label="申请时间" prop="registerDate">
        <el-date-picker class="material-form-item" type="datetime" v-model="form.registerDate" disabled></el-date-picker>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button @click="confirm" type="primary" :loading="loading.confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    props: ['groupOptions'],
    data () {
      return {
        dialogVisible: false,
        title: '',
        type: '',
        form: {
          groupId: '',
          instrumentId: '',
          number: '',
          accidentCause: '',
          reporter: '',
          repairer: '',
          aintenanceProject: '',
          register: '',
          registerName: '',
          registerDate: ''
        },
        loading: {
          instrument: false,
          confirm: false
        },
        options: {
          instrument: [],
          user: []
        },
        userInfo: '',
        rules: {
          groupId: { required: true, message: '仪器名称不能为空', trigger: 'blur' },
          instrumentId: { required: true, message: '仪器编号不能为空', trigger: 'blur' },
          accidentCause: { required: true, message: '事故原因不能为空', trigger: 'blur' },
          reporter: { required: true, message: '报修人不能为空', trigger: 'blur' },
          repairer: { required: true, message: '维修人不能为空', trigger: 'blur' }
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.getUserList()
    },
    methods: {
      getUserList () {
        api.chemicalLaboratory.userManagerCenter.normalUserList({
          pageIndex: 1,
          pageCount: 10000
        }).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.options.user = data.data.list
          }
        })
      },
      show (type, data) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          if (data) {
            this.form = this.copy(data)
            // 确保 options.instrument已经渲染
            this.$nextTick(function () {
              this.form.instrumentId = data.instrumentId
            })
          }
          this.form.register = this.userInfo.userId
          this.form.registerName = this.userInfo.name
          this.form.registerDate = new Date()
          this.type = type
          if (type === 'add') {
            this.title = '维修登记'
          } else {
            this.title = '维修登记修改'
          }
        })
      },
      changeGroupId (groupId) {
        if (!groupId) {
          this.options.instrument = []
          return
        }
        this.loading.instrument = true
        this.form.instrumentId = ''
        let params = {
          queryLabInstrumentManagementCo: {
            status: 'NORMAL',
            groupId: groupId
          },
          page: {
            current: 1,
            length: 1000
          }
        }
        api.chemicalLaboratory.labInstrumentManagement.getLabInstrumentManagementDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.options.instrument = []
              return
            }
            this.options.instrument = data.data.data
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.instrument = false
        })
      },
      confirm () {
        this.loading.confirm = true
        this.$refs.form.validate(valid => {
          if (valid) {
            let params = this.copy(this.form)
            params.number = this.getSelectedInstrumentNumber()
            params.registerDate = this.getTime(params.registerDate)
            params.modifier = params.register
            if (this.type === 'add') {
              params.creator = params.register
              this.add(params)
            } else {
              this.update(params)
            }
          } else {
            this.loading.confirm = false
          }
        })
      },
      getSelectedInstrumentNumber () {
        for (let i of this.options.instrument) {
          if (this.form.instrumentId === i.id) {
            return i.number
          }
        }
      },
      getTime (date) {
        if (!date) {
          return ''
        } else if (date.getTime) {
          return date.getTime()
        } else {
          return new Date(date).getTime()
        }
      },
      add (params) {
        api.chemicalLaboratory.labInstrumentRepair.createLabInstrumentRepairDo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.dialogVisible = false
            this.$emit('success')
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      update (params) {
        api.chemicalLaboratory.labInstrumentRepair.updateLabInstrumentRepairDo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.dialogVisible = false
            this.$emit('success')
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      copy (form) {
        let obj = {}
        for (let prop in form) {
          obj[prop] = form[prop]
        }
        return obj
      }
    }
  }
</script>

<style scoped>
  .material-form-item {
    width: 80%;
  }
</style>
<style>
  .material-form-item.el-select .el-input{
    width: 100%;
  }
</style>
