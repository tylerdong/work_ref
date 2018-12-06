<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="60%">
    <el-form :rules="rules" ref="form" :model="form" label-width="108px">
      <el-form-item label="仪器名称" prop="groupId" required>
        <el-select class="adjusting-form-item" v-model="form.groupId" @change="changeGroupId" :disabled="this.type !== 'add'">
          <el-option v-for="item in groupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="仪器编号" prop="instrumentId" required>
        <el-select class="adjusting-form-item" v-loading="loading.instrument" v-model="form.instrumentId" :disabled="this.type !== 'add'">
          <el-option v-for="item in options.instrument" :key="item.id" :label="item.number" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="校准单位" prop="calibrationCompany" required>
        <el-input class="adjusting-form-item" v-model="form.calibrationCompany"></el-input>
      </el-form-item>
      <el-form-item label="校准日期" prop="calibrationDate" required>
        <el-date-picker class="adjusting-form-item" v-model="form.calibrationDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input class="adjusting-form-item" v-model="form.remarks"></el-input>
      </el-form-item>
      <el-form-item label="预计下次校准年月" prop="planNextCalibrationDate">
        <el-date-picker class="adjusting-form-item" v-model="form.planNextCalibrationDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="登记人" prop="registerName">
        <el-input class="adjusting-form-item" v-model="form.registerName" disabled></el-input>
      </el-form-item>
      <el-form-item label="登记时间" prop="registerDate">
        <el-date-picker class="adjusting-form-item" type="datetime" v-model="form.registerDate" disabled></el-date-picker>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button @click="confirm" type="primary" :loading="loading.confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import * as api from 'api'
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
          calibrationCompany: '',
          calibrationDate: '',
          remarks: '',
          planNextCalibrationDate: '',
          register: '',
          registerName: '',
          registerDate: ''
        },
        loading: {
          instrument: false,
          confirm: false
        },
        options: {
          instrument: []
        },
        userInfo: '',
        rules: {
          groupId: { required: true, message: '仪器名称不能为空' },
          instrumentId: { required: true, message: '仪器编号不能为空' },
          calibrationCompany: { required: true, message: '校准单位不能为空' },
          calibrationDate: { required: true, message: '校准日期不能为空' }
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
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
            this.title = '校准登记'
          } else {
            this.title = '校准修改'
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
            params.calibrationDate = this.getTime(params.calibrationDate)
            params.planNextCalibrationDate = this.getTime(params.planNextCalibrationDate)
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
        api.chemicalLaboratory.labInstrumentCalibration.createLabInstrumentCalibrationDo(params).then(response => {
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
        api.chemicalLaboratory.labInstrumentCalibration.updateLabInstrumentCalibrationDo(params).then(response => {
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
  .adjusting-form-item {
    width: 80%;
  }
</style>
<style>
  .adjusting-form-item.el-select .el-input{
    width: 100%;
  }
</style>
