<template>
  <jk-dialog :title="dialog.title" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入维度编号"></el-input>
      </el-form-item>
      <el-form-item label="规则名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入规则名称，最细维度名称+时间+业务"></el-input>
      </el-form-item>
      <el-form-item label="维度" prop="dimensionIds">
        <el-select v-model="form.dimensionIds" multiple placeholder="请选择维度" class="input-item-20">
          <el-option v-for="item in option.dimensions" :key="item.id" :label="item.dimensionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据类型" prop="dataType">
        <el-select v-model="form.dataType" placeholder="请选择数据类型" class="input-item-20">
          <el-option v-for="(item, index) in option.dataTypes" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间类型" prop="timeType">
        <el-select v-model="form.timeType" placeholder="请选择时间类型" class="input-item-20">
          <el-option v-for="(item, index) in option.timeTypes" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="格式类型" prop="formatType">
        <el-select v-model="form.formatType" placeholder="请选择时间类型" class="input-item-20">
          <el-option v-for="(item, index) in option.formatTypes" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnConfirm('form')" :loading="loading.confirm">确 定</el-button>
      </el-form-item>
    </el-form>
  </jk-dialog>
</template>
<script>
  import * as api from 'src/api'
  import {dataTypes, formatTypes, timeTypes} from './../../../value-label'
  export default {
    components: {jkDialog: require('common/dialog-side.vue')},
    data () {
      return {
        dialog: { title: '新增', visible: false },
        itemData: {},
        form: {
          code: '',
          name: '',
          dimensionIds: [],
          dataType: '',
          timeType: '',
          formatType: ''
        },
        rules: {
          code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          dimensionIds: [{ required: true, message: '请选择维度', trigger: 'blur' }]
        },
        option: {
          dimensions: [],
          dataTypes: dataTypes,
          timeTypes: timeTypes,
          formatTypes: formatTypes
        },
        loading: { confirm: false }
      }
    },
    mounted () {
      this.getDimensions()
    },
    methods: {
      show (data) {
        this.dialog.visible = true
        this.dialog.title = data ? '修改' : '新增'
        this.$refs.form.resetFields()
        if (data) {
          this.itemData = data
          this.form.code = data.code
          this.form.name = data.name
          this.form.dimensionIds = data.hasOwnProperty('kpiRuleDimensionList') && Array.isArray(data.kpiRuleDimensionList)
            ? data.kpiRuleDimensionList.map(item => item.kpiTypeDimensionId) : []
          this.form.dataType = data.dataType
          this.form.timeType = data.timeType
          this.form.formatType = data.formatType
        }
      },
      getDimensions () {
        api.dataAnalysis.getKpiDimension({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.option.dimensions = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(e => {
          console.log(e)
        })
      },
      btnConfirm (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.loading.confirm = true
            let param = {
              code: this.form.code,
              name: this.form.name,
              dimensionIds: this.form.dimensionIds.join(','),
              dataType: this.form.dataType,
              timeType: this.form.timeType,
              formatType: this.form.formatType
            }
            if (this.dialog.title === '新增') {
              api.dataAnalysis.addKpiRuleType(param).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$emit('confirmSuccess')
                  this.dialog.visible = false
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.confirm = false
              })
            } else {
              api.dataAnalysis.updateKpiRuleType({...param, id: this.itemData.id}).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$emit('confirmSuccess')
                  this.dialog.visible = false
                } else {
                  this.$message({type: 'error', message: data.message})
                }
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

<style scoped lang="scss">
</style>
