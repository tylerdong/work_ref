<!--组件名-->
<template>
  <div>
    <jk-dialog title="染判" width="450px" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="丝锭号">
          {{form.silkCode}}&nbsp;&nbsp;&nbsp;&nbsp;锭号&nbsp;&nbsp;{{form.spindleNo}}
        </el-form-item>
        <el-form-item label="灰卡级别" prop="sentenceLevelId">
          <el-select v-model="form.sentenceLevelId" placeholder="请选择" clearable>
            <el-option v-for="item in dyeLevelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否异常">
          <el-radio-group v-model="form.sentenceStatus" @change="sentenceStatusChange">
            <el-radio v-for="item in abnormalFlagOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="染判类型">
          <el-radio-group v-model="form.sentenceType">
            <el-radio v-for="item in typeOptions" :key="item.value" :label="item.value">{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="判降等级">
          <el-radio-group v-model="form.level">
            <el-radio v-for="item in levelOptions" :key="item.value" :label="item.value">{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="丝锭等级" prop="silkGradId">
          <el-select v-loading="loading.spindleLevel" v-model="form.silkGradId" placeholder="请选择" clearable>
            <el-option v-for="item in spindleLevelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="异常原因" prop="silkDownGradeId">
          <el-select v-loading="loading.downGradeReason" v-model="form.silkDownGradeId" placeholder="请选择" clearable>
            <el-option v-for="item in downGradeReasonOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.silkRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading.submit" type="primary" @click="dyeSubmit">确 定</el-button>
          <el-button type="text" @click="emptyClick">清 空</el-button>
        </el-form-item>
      </el-form>
    </jk-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'jk-dialog': require('common/dialog-side.vue')
    },
    data () {
      return {
        form: {
          sentenceLevelId: '', // 灰卡等级
          sentenceStatus: '', // 是否异常
          sentenceType: '', // 染判类型
          level: '', // 判染等级
          silkGradId: '', // 丝锭等级id
          silkGradeName: '', // 丝锭等级名称
          silkDownGradeId: '', // 降等原因
          silkRemark: '', // 降等备注,
          register: true, // 是否登记
          spindleNo: '' // 锭号
        },
        rules: {
          silkGradId: [{ required: false, message: '请选择丝锭等级', trigger: 'blur' }],
          silkDownGradeId: [{required: true, message: '请选异常原因', trigger: 'blur'}]
        },
        dyeLevelOptions: [],
        typeOptions: [
          { value: '普染' },
          { value: '敏染' }
        ],
        levelOptions: [
          { value: 'F' },
          { value: 'D' },
          { value: 'L' },
          { value: 'OF' },
          { value: 'OD' },
          { value: 'OL' }
        ],
        abnormalFlagOptions: [
          { value: '1', label: '异常' },
          { value: '2', label: '正常' }
        ],
        spindleLevelOptions: [],
        downGradeReasonOptions: [],
        isAllCar: false,
        isMulti: false,
        nowItem: null,
        dialogVisible: false,
        loading: {
          spindleLevel: false,
          submit: false,
          downGradeReason: false
        }
      }
    },
    mounted () {
      this.getDyeLevelOptions()
      this.getSpindleLevelOptions()
      this.getDownGradeReasonOptions()
    },
    methods: {
      getDyeLevelOptions () {
        api.automatic.dictionary.getAllSentenceLevelList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.dyeLevelOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      show (nowItem, type, isAllCar, isMulti) {
        this.$refs.form.resetFields()
        this.form.sentenceStatus = this.abnormalFlagOptions[0].value
        this.form.sentenceType = this.typeOptions[0].value
        this.form.level = this.levelOptions[0].value
        if (isAllCar) {
          this.isAllCar = true
          this.isMulti = false
        } else if (isMulti) {
          this.isAllCar = false
          this.isMulti = true
        } else {
          this.isAllCar = false
          this.isMulti = false
          this.form.silkCode = nowItem.silkCode
          this.form.spindleNo = nowItem.spindleNo
          this.form.sentenceLevelId = nowItem.sentenceLevelId ? nowItem.sentenceLevelId : ''
          this.form.sentenceStatus = nowItem.sentenceStatus ? nowItem.sentenceStatus : this.abnormalFlagOptions[0].value
          this.form.sentenceType = nowItem.sentenceType ? nowItem.sentenceType : this.typeOptions[0].value
          this.form.level = nowItem.level ? nowItem.level : this.levelOptions[0].value
          this.form.silkGradId = nowItem.silkGradId ? nowItem.silkGradId : this.spindleLevelOptions[0].id
          this.form.silkGradeName = nowItem.silkGradeName ? nowItem.silkGradeName : this.spindleLevelOptions[0].name
          this.form.silkDownGradeId = nowItem.silkDownGradeId ? nowItem.silkDownGradeId : this.downGradeReasonOptions[0].value
          this.form.silkRemark = nowItem.silkRemark ? nowItem.silkRemark : ''
        }
        this.nowItem = nowItem
        this.dialogVisible = true
      },
      getSpindleLevelOptions () {
        this.loading.spindleLevel = true
        api.automatic.dictionary.getAllSilkGradeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.spindleLevelOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.spindleLevel = false
        })
      },
      getDownGradeReasonOptions () {
        this.loading.downGradeReason = true
        api.automatic.productionProcess.getProcessIdByNumber({processNumber: '005'}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            let params = {
              productProcessId: data.data.processId
            }
            api.automatic.other.getDownGradeReasonList(params).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.downGradeReasonOptions = data.data
              }
            }).catch(e => {
              console.log(e)
            }).finally(() => {
              this.loading.downGradeReason = false
            })
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.downGradeReason = false
        })
      },
      sentenceStatusChange (val) {
        this.rules.silkDownGradeId[0].required = (val === '1')
      },
      dyeSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let silkGradeName = this.form.silkGradId ? this.spindleLevelOptions.find(option => { return option.id === this.form.silkGradId }).name : ''
            let downGradeName = this.form.silkDownGradeId ? this.downGradeReasonOptions.find(option => { return option.id === this.form.silkDownGradeId }).name : ''
            if (this.isAllCar || this.isMulti) { // 整车登记或批量登记
              for (let item of this.nowItem.sentenceItemBos) {
                for (let silkInfo of item.sentenceSilkInfoBos) {
                  if (this.isAllCar || silkInfo.dyeCheck) { // 整车登记或当前item被选中
                    item.dyeCheck = false
                    silkInfo.sentenceLevelId = this.form.sentenceLevelId
                    silkInfo.sentenceStatus = this.form.sentenceStatus
                    silkInfo.sentenceType = this.form.sentenceType
                    silkInfo.level = this.form.level
                    silkInfo.silkGradId = this.form.silkGradId
                    silkInfo.silkGradeName = silkGradeName
                    silkInfo.silkDownGradeId = this.form.silkDownGradeId
                    silkInfo.silkDownGradeName = downGradeName
                    silkInfo.register = this.form.register
                  }
                }
              }
            } else { // 单个
              this.nowItem.sentenceLevelId = this.form.sentenceLevelId
              this.nowItem.sentenceStatus = this.form.sentenceStatus
              this.nowItem.sentenceType = this.form.sentenceType
              this.nowItem.level = this.form.level
              this.nowItem.silkGradId = this.form.silkGradId
              this.nowItem.silkGradeName = silkGradeName
              this.nowItem.silkDownGradeId = this.form.silkDownGradeId
              this.nowItem.silkDownGradeName = downGradeName
              this.nowItem.register = this.form.register
            }
            this.dialogVisible = false
          }
        })
      },
      emptyClick () {
        if (this.isAllCar || this.isMulti) { // 整车登记或批量登记
          for (let item of this.nowItem.silkInfoBoList) {
            if (this.isAllCar || item.dyeCheck) { // 整车登记或当前item被选中
              item.dyeCheck = false
              item.sentenceLevelId = ''
              item.sentenceStatus = ''
              item.sentenceType = ''
              item.level = ''
              item.silkGradId = ''
              item.silkGradeName = ''
              item.silkDownGradeId = ''
              item.register = ''
            }
          }
        } else { // 单个
          this.nowItem.dyeCheck = false
          this.nowItem.sentenceLevelId = ''
          this.nowItem.sentenceStatus = ''
          this.nowItem.sentenceType = ''
          this.nowItem.level = ''
          this.nowItem.silkGradId = ''
          this.nowItem.silkGradeName = ''
          this.nowItem.silkDownGradeId = ''
          this.nowItem.register = ''
        }
        this.dialogVisible = false
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
