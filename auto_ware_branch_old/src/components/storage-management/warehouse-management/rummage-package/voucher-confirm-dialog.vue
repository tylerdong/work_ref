<!--组件名-->
<template>
  <div>
    <el-dialog title="确认信息" :visible.sync="dialogConfirmVisible" width="80%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
               label-width="100px" class="demo-ruleForm" v-loading="loading.form">
        <el-form-item label="批号" prop="batchNo">
          <el-input v-model="ruleForm.batchNo"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <el-select v-model="ruleForm.spec" placeholder="请选择规格">
            <el-option v-for="item in options.spec" :key="item.id" :label="item.spec" :value="item.spec"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-select v-model="ruleForm.level" placeholder="请选择等级">
            <el-option v-for="item in options.level" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-select v-model="ruleForm.productName" placeholder="请选择产品名称">
            <el-option v-for="item in options.productName" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" prop="workshopId">
          <el-select v-model="ruleForm.workshopId" placeholder="请选择车间">
            <el-option v-for="item in options.workshopId" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产日期" prop="productionDate">
          <el-date-picker type="date" placeholder="选择日期"
                          v-model="ruleForm.productionDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="丝锭数" prop="valueOne">
          <el-input disabled v-model.number="ruleForm.valueOne"></el-input>
        </el-form-item>
        <el-form-item label="箱数" prop="boxNum">
          <el-input disabled v-model.number="ruleForm.boxNum"></el-input>
        </el-form-item>
        <el-form-item label="净重" prop="netWeight">
          <el-input v-model.number="ruleForm.netWeight"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading.submit" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    data () {
      return {
        multipleSelection: [],
        loading: {
          form: false,
          submit: false
        },
        options: {
          spec: [],
          level: [],
          productName: [],
          workshopId: []
        },
        ruleForm: {
          batchNo: '',
          spec: '',
          level: '',
          productName: '',
          workshopId: '',
          productionDate: '',
          valueOne: 0,
          boxNum: 0,
          netWeight: 0
        },
        rules: {
          batchNo: [
            { required: true, message: '批号不能为空', trigger: 'blur' }
          ],
          spec: [
            { required: true, message: '规格不能为空', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '等级不能为空', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '产品名称不能为空', trigger: 'blur' }
          ],
          workshopId: [
            { required: true, message: '车间不能为空', trigger: 'blur' }
          ],
          productionDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          valueOne: [
            { required: true, message: '丝锭数不能为空' },
            { type: 'number', message: '丝锭数必须为数字值' }
          ],
          boxNum: [
            { required: true, message: '箱数不能为空' },
            { type: 'number', message: '箱数必须为数字值' }
          ],
          netWeight: [
            { required: true, message: '净重不能为空' },
            { type: 'number', message: '净重必须为数字值' }
          ]
        },
        dialogConfirmVisible: false
      }
    },
    mounted () {
      this.getOptions()
    },
    methods: {
      getOptions () {
        api.storage.warehouseManagement.getAllSpec({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.spec = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
        api.storage.warehouseManagement.getAllLevel({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.level = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
        api.storage.warehouseManagement.getAllWorkshop({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshopId = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
        api.storage.warehouseManagement.getAllProduct({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.productName = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      show (multipleSelection) {
        this.multipleSelection = multipleSelection
        this.dialogConfirmVisible = true
        let weight = 0
        for (let item of multipleSelection) {
          weight += Number(item.needWeight)
        }
        weight = Number(weight.toFixed(2))
        this.ruleForm.netWeight = weight
        console.log(weight)
        this.getFormData()
      },
      getFormData () {
        let params = {
          barCode: this.multipleSelection[0].barcode
        }
        this.loading.form = true
        api.storage.warehouseManagement.getTurnOverPageEndProductByBarCode(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data.data)
            this.ruleForm.batchNo = data.data.batchNo
            this.ruleForm.spec = data.data.spec
            this.ruleForm.level = data.data.level
            this.ruleForm.productName = data.data.productName
            this.ruleForm.workshopId = data.data.workshopId
            this.ruleForm.productionDate = new Date(data.data.productionDate)
            this.ruleForm.valueOne = data.data.valueOne
            this.ruleForm.boxNum = data.data.boxNum
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.form = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.create = true
            let workshopName = ''
            let params = {
              turnOverPageEndProductBo: {
                operator: storage.getUser().employeeId,
                batchNo: this.ruleForm.batchNo,
                spec: this.ruleForm.spec,
                level: this.ruleForm.level,
                productName: this.ruleForm.productName,
                workshopId: this.ruleForm.workshopId,
                workshopName: workshopName,
                productionDate: this.ruleForm.productionDate.getTime(),
                valueOne: this.ruleForm.valueOne,
                boxNum: this.ruleForm.boxNum,
                netWeight: this.ruleForm.netWeight
              },
              turnOverPageBos: this.multipleSelection
            }
            this.loading.submit = true
            api.storage.warehouseManagement.confirmSubmitTurnOverPage(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.$emit('update-data')
                this.dialogConfirmVisible = false
              }
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
              this.loading.submit = false
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
