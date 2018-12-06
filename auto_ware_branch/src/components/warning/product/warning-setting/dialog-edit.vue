<template>
  <jk-dialog :title="dialog.title" :visible.sync="dialog.visible">
    <div>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">

        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item label="名称" prop="ruleName">
          <el-input v-model="form.ruleName"></el-input>
        </el-form-item>

        <comp-kpi-type ref="compKpiType" @getSelectedValue="getDimensionMap"></comp-kpi-type>

        <el-form-item label="上限" prop="upperThreshold">
          <el-input-number v-model="form.upperThreshold" clearable :controls="false"></el-input-number>
          {{this.form.formatType | formatSymbol(this.form.dataType)}}
        </el-form-item>

        <el-form-item label="上限报警" prop="isWarningUpper">
          <el-checkbox v-model="form.isWarningUpper" true-label="Y" false-label="N">开启</el-checkbox>
        </el-form-item>

        <el-form-item label="下限" prop="lowerThreshold">
          <el-input-number v-model="form.lowerThreshold" clearable :controls="false"></el-input-number>
          {{this.form.formatType | formatSymbol(this.form.dataType)}}
        </el-form-item>

        <el-form-item label="下限报警" prop="isWarningLower">
          <el-checkbox v-model="form.isWarningLower" true-label="Y" false-label="N">开启</el-checkbox>
        </el-form-item>

        <el-form-item label="是否开启" prop="isActive">
          <el-checkbox v-model="form.isActive" true-label="Y" false-label="N">开启</el-checkbox>
        </el-form-item>

        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-model="form.deviceId"></el-input>
        </el-form-item>

        <el-form-item label="信息模板" prop="msgTemplateId">
          <el-select v-model="form.msgTemplateId" class="input-item-20" @change="messageTypeChange">
            <el-option v-for="(item, index) in options.messageTypes" :value="item.id" :label="item.templateName"
                       :key="index">
            </el-option>
          </el-select>
          <ul v-if="msgTemplate && msgTemplate.hasOwnProperty('type')" class="template-ul">
            <li>类型：{{msgTemplate.type}}</li>
            <li>内容：{{msgTemplate.content}}</li>
            <li>描述：{{msgTemplate.description}}</li>
          </ul>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="confirm" type="primary" :loading="loading.confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
  import {timeTypes, formatTypes, dataTypes} from './../../../value-label'
  export default {
    components: {
      jkDialog: require('common/dialog-side.vue'),
      compKpiType: require('./comp-kpi-type')
    },
    data () {
      return {
        user: {},
        dialog: { title: '新增', visible: false },
        rules: {
          code: [{required: true, message: '请填写编码', trigger: 'blur change'}],
          ruleName: [{required: true, message: '请填写名称', trigger: 'blur change'}],
          dataTypes: [{required: true, message: '请选择类型', trigger: 'blur change'}],
          msgTemplateId: [{required: true, message: '请选择信息模板', trigger: 'blur change'}],
          deviceId: [{required: true, message: '请填写设备ID', trigger: 'blur change'}],
          upperThreshold: [
            {required: true, message: '请填写上限', trigger: 'blur change'},
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (/^\d{0,8}\.{0,1}(\d{1,2})?$/.test(value)) {
                  if (parseInt(value) < parseInt(this.form.lowerThreshold)) {
                    callback(new Error('上限不能小于下限'))
                  } else {
                    return callback()
                  }
                } else {
                  callback(new Error('小数点后不能超过2位'))
                }
              }
            }
          ],
          lowerThreshold: [
            {required: true, message: '请填写下限', trigger: 'blur change'},
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (/^\d{0,8}\.{0,1}(\d{1,2})?$/.test(value)) {
                  if (parseInt(value) > parseInt(this.form.upperThreshold)) {
                    callback(new Error('下限不能大于上限'))
                  } else {
                    return callback()
                  }
                } else {
                  callback(new Error('小数点后不能超过2位'))
                }
              }
            }
          ]
        },
        itemData: '',
        msgTemplate: {},
        form: {
          code: '',
          ruleName: '',
          dimensionMap: {},
          kpiTypeCode: '',
          dataType: '',
          formatType: '',
          timeType: '',
          upperThreshold: '',
          isWarningUpper: 'Y',
          lowerThreshold: '',
          isWarningLower: 'Y',
          isActive: 'Y',
          msgTemplateId: '',
          deviceId: '',
          description: ''
        },
        options: {
          timeTypes: timeTypes,
          formatTypes: formatTypes,
          dataTypes: dataTypes,
          messageTypes: []
        },
        loading: {
          confirm: false
        }
      }
    },
    computed: {
    },
    mounted () {
      this.getMessageTemplate()
    },
    methods: {
      show (data) {
        this.dialog.visible = true
        this.dialog.title = data ? '修改' : '新增'
        this.$refs.form.resetFields()
        this.msgTemplate = {}
        if (data) {
          this.itemData = data
          this.form.code = data.code
          this.form.ruleName = data.ruleName
          this.form.upperThreshold = data.upperThreshold
          this.form.lowerThreshold = data.lowerThreshold
          this.form.isWarningUpper = data.isWarningUpper
          this.form.isWarningLower = data.isWarningLower
          this.form.kpiTypeCode = data.kpiTypeCode
          this.form.dataType = data.dataType
          this.form.formatType = data.formatType
          this.form.timeType = data.timeType
          this.form.isActive = data.isActive
          this.form.msgTemplateId = data.msgTemplateId
          this.msgTemplate = this.options.messageTypes.find(item => { return item.id === data.msgTemplateId })
          this.form.deviceId = data.deviceId
          this.$refs.compKpiType.initData(data)
        } else {
          this.form.dimensionMap = {}
          this.form.kpiTypeCode = ''
          this.form.dataType = ''
          this.form.formatType = ''
          this.form.timeType = ''
          this.$refs.compKpiType.clearFields()
        }
      },

      getDimensionMap (val) {
        let key = Object.keys(val)[0]
        let value = Object.values(val)[0]
        switch (key) {
          case 'orgId':
            this.form.dimensionMap = Object.assign(this.form.dimensionMap, {ORGANIZATION: value})
            break
          case 'workShopId':
            this.form.dimensionMap = Object.assign(this.form.dimensionMap, {WORKSHOP: value})
            break
          case 'lineId':
            this.form.dimensionMap = Object.assign(this.form.dimensionMap, {LINE: value})
            break
          case 'silkGrade':
            this.form.dimensionMap = Object.assign(this.form.dimensionMap, {GRADE: value})
            break
          case 'kpiTypeCode':
            this.form.kpiTypeCode = value
            break
          case 'dataType':
            this.form.dataType = value
            break
          case 'formatType':
            this.form.formatType = value
            break
          case 'timeType':
            this.form.timeType = value
            break
          default:
            this.form.dimensionMap = {}
            break
        }
      },

      // 根据类型查询模板
      messageTypeChange (val) {
        this.msgTemplate = this.options.messageTypes.find(type => {
          return type.id === val
        })
      },

      // 确定
      confirm () {
        if (this.form.hasOwnProperty('kpiTypeCode') && !this.form.kpiTypeCode) {
          return this.$message({type: 'error', message: '请选择规则类型'})
        }
        if (this.form.dimensionMap.hasOwnProperty('ORGANIZATION') && !this.form.dimensionMap.ORGANIZATION) {
          return this.$message({type: 'error', message: '请选择组织'})
        }
        if (this.form.dimensionMap.hasOwnProperty('WORKSHOP') && !this.form.dimensionMap.WORKSHOP) {
          return this.$message({type: 'error', message: '请选择车间'})
        }
        if (this.form.dimensionMap.hasOwnProperty('LINE') && !this.form.dimensionMap.LINE) {
          return this.$message({type: 'error', message: '请选择规则线别'})
        }
        if (this.form.dimensionMap.hasOwnProperty('GRADE') && !this.form.dimensionMap.GRADE) {
          return this.$message({type: 'error', message: '请选择等级'})
        }
        console.log(this.form)
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.confirm = true
            let param = this.form
            if (this.dialog.title === '新增') {
              api.dataAnalysis.addKpiRule(param).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.options.lineList = data.data
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.confirm = false
              })
            } else {
              param = Object.assign(param, {id: this.itemData.id})
              api.dataAnalysis.updateKpiRule(param).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.options.lineList = data.data
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.confirm = false
              })
            }
          }
        })
      },
      // 获取模板
      getMessageTemplate () {
        api.dataAnalysis.getMsgTemplateList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.messageTypes = data.data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .width-100{
    width: 100px;
  }
  .template-ul li {
    height: 2rem;
    line-height: 2rem;
    display: inline-block;
  }
</style>
