<template>
    <div>
      <el-form :rules="rules" ref="form" :model="form" label-width="108px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="仪器名称" prop="groupId" required>
              <el-select class="instrument-info-form-item" v-model="form.groupId" :disabled="formDisabled">
                <el-option v-for="item in groupOptions" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仪器编号" prop="number" required>
              <el-input class="instrument-info-form-item" v-model="form.number" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="制造厂" prop="manufacturer" required>
              <el-input class="instrument-info-form-item" v-model="form.manufacturer" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出厂编号" prop="factoryNumber" required>
              <el-input class="instrument-info-form-item" v-model="form.factoryNumber" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="型号" prop="model" required>
              <el-input class="instrument-info-form-item" v-model="form.model" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格" prop="specifications">
              <el-input class="instrument-info-form-item" v-model="form.specifications" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出厂时间">
              <el-date-picker class="instrument-info-form-item" v-model="form.factoryTime" type="datetime" placeholder="选择日期时间" :disabled="formDisabled"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购买时间">
              <el-date-picker class="instrument-info-form-item" v-model="form.purchaseTime" type="datetime" placeholder="选择日期时间" :disabled="formDisabled"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="测量开始范围">
              <el-input class="instrument-info-form-item" v-model="form.measuringStartRange" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="测量结束范围">
              <el-input class="instrument-info-form-item" v-model="form.measuringEndRange" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="测量范围单位">
              <el-input class="instrument-info-form-item" v-model="form.measuringRangeUnit" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="精度开始等级">
              <el-input class="instrument-info-form-item" v-model="form.precisionStartGrade" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="精度结束等级">
              <el-input class="instrument-info-form-item" v-model="form.precisionEndGrade" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="精度等级单位">
              <el-input class="instrument-info-form-item" v-model="form.precisionGradeUnit" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用部门">
              <el-input class="instrument-info-form-item" v-model="form.useDepart" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保管人">
              <el-input class="instrument-info-form-item" v-model="form.custodian" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="存放地点">
              <el-input class="instrument-info-form-item" v-model="form.storagePlace" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理等级">
              <el-input class="instrument-info-form-item" v-model="form.managementLevel" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划校准日期">
              <el-date-picker class="instrument-info-form-item" v-model="form.planCalibrationDate" placeholder="选择日期时间" :disabled="formDisabled"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划报废日期">
              <el-date-picker class="instrument-info-form-item" v-model="form.planRetirementDate" placeholder="选择日期时间" :disabled="formDisabled"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划校准单位">
              <el-input class="instrument-info-form-item" v-model="form.planCalibrationUnit" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input class="instrument-info-form-item" v-model="form.remarks" :disabled="formDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登记人">
              <el-input class="instrument-info-form-item" v-model="form.registerName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登记时间">
              <el-date-picker type="datetime" class="instrument-info-form-item" v-model="form.registerDate" disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>
<script>
  import * as api from '../../../../api/index'
  import storage from 'storage'
  export default {
    props: ['groupOptions', 'value'],
    components: {},
    created () {
    },
    data () {
      return {
        formDisabled: false,
        form: {
          groupId: '',
          number: '',
          manufacturer: '',
          factoryNumber: '',
          model: '',
          specifications: '',
          factoryTime: '',
          purchaseTime: '',
          measuringStartRange: '',
          measuringEndRange: '',
          measuringRangeUnit: '',
          precisionStartGrade: '',
          precisionEndGrade: '',
          precisionGradeUnit: '',
          useDepart: '',
          custodian: '',
          storagePlace: '',
          managementLevel: '',
          planCalibrationDate: '',
          planRetirementDate: '',
          planCalibrationUnit: '',
          remarks: '',
          registerDate: '',
          register: '',
          registerName: ''
        },
        rules: {
          groupId: { required: true, message: '仪器名称不能为空' },
          number: { required: true, message: '仪器编号不能为空' },
          manufacturer: { required: true, message: '制造厂不能为空' },
          factoryNumber: { required: true, message: '出厂编号不能为空' },
          model: { required: true, message: '型号不能为空' },
          factoryTime: { required: true, message: '出厂时间不能为空' },
          purchaseTime: { required: true, message: '购买时间不能为空' },
          useDepart: { required: true, message: '使用部门不能为空' },
          custodian: { required: true, message: '保管人不能为空' },
          storagePlace: { required: true, message: '存放地点不能为空' },
          managementLevel: { required: true, message: '管理登记不能为空' },
          planCalibrationUnit: { required: true, message: '计划校准单位不能为空' },
          remarks: { required: true, message: '备注不能为空' }
        }
      }
    },
    mounted () {},
    computed: {},
    methods: {
      renderData (type, data) {
        this.$refs.form.resetFields()
        if (data) {
          this.form = this.copy(data)
        }
        let userInfo = storage.getUser()
        this.form.register = userInfo.userId
        this.form.registerName = userInfo.name
        this.form.registerDate = new Date()
        if (type === 'view') {
          this.formDisabled = true
        }
      },
      confirm (type) {
        this.$refs.form.validate(valid => {
          if (valid) {
            let params = this.copy(this.form)
            params.factoryTime = this.getTime(params.factoryTime)
            params.purchaseTime = this.getTime(params.purchaseTime)
            params.planCalibrationDate = this.getTime(params.planCalibrationDate)
            params.planRetirementDate = this.getTime(params.planRetirementDate)
            params.registerDate = this.getTime(params.registerDate)
            params.modifier = params.register

            if (type === 'add') {
              params.creator = params.register
              this.add(params)
            } else {
              this.update(params)
            }
          }
        })
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
        api.physicalLaboratory.labInstrumentManagement.createLabInstrumentManagementDo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.$emit('success')
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          // this.loading = false
        })
      },
      update (params) {
        api.physicalLaboratory.labInstrumentManagement.updateLabInstrumentManagementDo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.$emit('success')
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
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
  .instrument-info-form-item {
    width: 100%;
  }
</style>
<style>
  .instrument-info-form-item.el-select .el-input{
    width: 100%;
  }
</style>
