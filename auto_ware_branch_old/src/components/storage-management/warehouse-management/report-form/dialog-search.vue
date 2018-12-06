<template>
  <jk-dialog title="查询" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="起始物料号" prop="materialNoStart">
          <el-input v-model="form.materialNoStart"></el-input>
        </el-form-item>
        <el-form-item label="结束物料号" prop="materialNoEnd">
          <el-input v-model="form.materialNoEnd"></el-input>
        </el-form-item>
        <el-form-item label="工厂号" prop="factory">
          <el-input v-model="form.factory"></el-input>
        </el-form-item>
        <el-form-item label="库存地点" prop="lgort">
          <el-input v-model="form.lgort"></el-input>
        </el-form-item>
        <el-form-item label="生产开始日期" prop="productionDateStart" clearable>
          <el-date-picker
            v-model="form.productionDateStart"
            type="date"
            placeholder="选择生产开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生产结束日期" prop="productionDateEnd" clearable>
          <el-date-picker
            v-model="form.productionDateEnd"
            type="date"
            placeholder="选择生产结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班次" prop="classes">
          <el-select v-model="form.classes" multiple placeholder="请选择">
            <el-option
              v-for="item in classesType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否区分机号">
          <el-checkbox v-model="form.differentiate">区分机号</el-checkbox>
        </el-form-item>
        <el-form-item label="入库状态">
          <el-select v-model="form.finish" placeholder="请选择入库状态" clearable>
            <el-option
              v-for="item in finishType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存类型" prop="produceType">
          <el-select v-model="form.produceType" placeholder="请选择库存类型" clearable>
            <el-option
              v-for="item in produceType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备货类型" prop="stockUpTypes">
          <el-select v-model="form.stockUpTypes" clearable placeholder="请选择备货类型" clearable>
            <el-option
              v-for="item in stockUpTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading.submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
  //  import storage from 'storage'
  export default {
    props: ['typeData'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        classesType: [
          { value: '甲', label: '甲' },
          { value: '乙', label: '乙' },
          { value: '丙', label: '丙' }
        ],
        finishType: [
          { value: true, label: '已入库' },
          { value: false, label: '未入库' },
          { value: '', label: '全部' }
        ],
        produceType: [],
        stockUpTypes: [],
        form: {
          materialNoStart: '',
          materialNoEnd: '',
          productionDateStart: '',
          productionDateEnd: '',
          lgort: '',
          factory: '',
          differentiate: false,
          classes: [],
          finish: '',
          produceType: '',
          stockUpTypes: ''
        },
        loading: {
          submit: false
        },
        formRules: {
          factory: [
            { required: true, message: '请输入工厂号', trigger: 'change blur' }
          ],
          classes: [ // 班次
            { type: 'array', required: true, message: '请输入班次', trigger: 'change blur' }
          ]
        }
      }
    },
    filters: {
      formatDate (stringTime) {
        let time = Date.parse(new Date(stringTime))
        return time
      }
    },
    created () {
      this.getAllStockTypes()
      this.getAllStockUpTypes()
    },
    mounted () {
    },
    methods: {
      show () {
        this.dialogVisible = true
        this.$refs['ruleForm'].resetFields()
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      getAllStockTypes () {
        api.storage.warehouseManagement.getAllStockTypes().then((res) => {
          let produceType = []
          if (res.data.message === '请求成功') {
            for (let item of res.data.data) {
              if (item === 'PRODUCT') {
                produceType.push({value: 'PRODUCT', label: '生产'})
              } else if (item === 'TURNOVERPACKAGE') {
                produceType.push({value: 'TURNOVERPACKAGE', label: '翻包'})
              } else if (item === 'REFUND') {
                produceType.push({value: 'REFUND', label: '退货'})
              }
            }
            produceType.push({value: '', label: '全部'})
            this.produceType = Object.assign({}, produceType)
          } else {
            this.$message.error('请求错误')
          }
        })
      },
      getAllStockUpTypes () {
        api.storage.warehouseManagement.getAllStockUpTypes().then((res) => {
          let stockUpTypes = []
          if (res.data.message === '请求成功') {
            for (let item of res.data.data) {
              if (item === 'INNER_SALE') {
                stockUpTypes.push({value: 'INNER_SALE', label: '外销'})
              } else if (item === 'OUT_SALE') {
                stockUpTypes.push({value: 'OUT_SALE', label: '内销'})
              }
            }
            stockUpTypes.push({value: '', label: '全部'})
            this.stockUpTypes = Object.assign({}, stockUpTypes)
          } else {
            this.$message.error('请求错误')
          }
        })
      },
      submitForm (formName) {
        console.log(this.form)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.productionDateStart = Date.parse(this.form.productionDateStart)
            this.form.productionDateEnd = Date.parse(this.form.productionDateEnd)
            if (this.form.productionDateStart > this.form.productionDateEnd) {
              this.$message.error('开始时间大于结束时间！请重新选择。')
              return
            }
            if (parseInt(this.form.materialNoStart) > parseInt(this.form.materialNoEnd)) {
              this.$message.error('起始物料号大于结束物料号，请重新填写。')
              return
            }
            this.$emit('submitSuccess', this.form)
            this.dialogVisible = false
            // console.log('in')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
