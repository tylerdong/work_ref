<!--组件名-->
<template>
  <div>
    <jk-dialog
      title="染判"
      width="450px"
      :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item v-if="form.silkCode" label="丝锭号">
          {{form.silkCode}}
        </el-form-item>
        <el-form-item label="灰卡级别" prop="sentenceLevelId">
          <el-select v-model="form.sentenceLevelId" placeholder="请选择" clearable>
            <el-option
              v-for="item in dyeLevelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否异常" required>
          <el-radio-group v-model="form.abnormalFlag">
            <el-radio
              v-for="item in abnormalFlagOptions"
              :key="item.value"
              :label="item.value">{{item.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="染判类型" required>
          <el-radio-group v-model="form.type">
            <el-radio
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.value">{{item.value}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="判降等级" required>
          <el-radio-group v-model="form.level">
            <el-radio
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.value">{{item.value}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="丝锭等级" prop="spindleLevel">
          <el-select v-loading="loading.spindleLevel" v-model="form.spindleLevel" placeholder="请选择" clearable>
            <el-option
              v-for="item in spindleLevelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="降等原因" prop="downGradeReason">
          <el-select v-loading="loading.downGradeReason" v-model="form.downGradeReason" placeholder="请选择" clearable>
            <el-option
              v-for="item in downGradeReasonOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
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
          sentenceLevelId: '',
          type: '',
          abnormalFlag: '',
          level: '',
          spindleLevel: '',
          downGradeReason: '',
          remark: ''
        },
        rules: {
          spindleLevel: [
            { required: true, message: '请选择丝锭等级', trigger: 'blur' }
          ]
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
      this.form.level = this.levelOptions[0].value
      this.form.type = this.typeOptions[0].value
      this.form.abnormalFlag = this.abnormalFlagOptions[0].value
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
        console.log(nowItem)
        this.getSpindleLevelOptions()
        this.getDownGradeReasonOptions()
        this.$refs.form.resetFields()
        if (isAllCar) {
          this.isAllCar = true
          this.isMulti = false
        } else if (isMulti) {
          this.isAllCar = false
          this.isMulti = true
        } else {
          this.isAllCar = false
          this.isMulti = false
          this.form.silkCode = nowItem.silkCode ? nowItem.silkCode : ''
          this.form.sentenceLevelId = nowItem.sentenceLevelId ? nowItem.sentenceLevelId : ''
          this.form.level = nowItem.level ? nowItem.level : this.levelOptions[0].value
          this.form.type = nowItem.sentenceType ? nowItem.sentenceType : this.typeOptions[0].value
          this.form.abnormalFlag = nowItem.abnormalFlag ? nowItem.abnormalFlag : this.abnormalFlagOptions[0].value
          this.form.spindleLevel = nowItem.gradeId ? nowItem.gradeId : ''
          this.form.downGradeReason = nowItem.downReasonId ? nowItem.downReasonId : ''
          this.form.remark = nowItem.remark ? nowItem.remark : ''
        }
        this.nowItem = nowItem
        this.dialogVisible = true
        this.rules.spindleLevel[0].required = type
        console.log(nowItem)
        console.log(this.isAllCar)
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
              console.log(data)
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
      dyeSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.isAllCar || this.isMulti) { // 整车登记或批量登记
              for (let item of this.nowItem.silkInfoBoList) {
                if (this.isAllCar || item.dyeCheck) { // 整车登记或当前item被选中
                  item.dyeCheck = false
                  let item2 = item.silkExceptionRecordBoList[item.silkExceptionRecordBoList.length - 1]
                  item2.sentenceLevelId = this.form.sentenceLevelId
                  for (let item of this.dyeLevelOptions) {
                    if (item.id === this.form.sentenceLevelId) {
                      item2.sentenceLevelName = item.name
                    }
                  }
                  item2.level = this.form.level
                  item2.remark = this.form.remark
                  item2.sentenceType = this.form.type
                  item2.abnormalFlag = this.form.abnormalFlag
                  item2.gradeId = this.form.spindleLevel
                  item2.downReasonId = this.form.downGradeReason
                  for (let item of this.spindleLevelOptions) {
                    if (item.id === this.form.spindleLevel) {
                      item2.gradeName = item.name
                    }
                  }
                  for (let item of this.downGradeReasonOptions) {
                    if (item.id === this.form.downGradeReason) {
                      this.nowItem.downReasonName = item.name
                    }
                  }
                }
              }
            } else { // 单个
              this.nowItem.sentenceLevelId = this.form.sentenceLevelId
              for (let item of this.dyeLevelOptions) {
                if (item.id === this.form.sentenceLevelId) {
                  this.nowItem.sentenceLevelName = item.name
                }
              }
              this.nowItem.level = this.form.level
              this.nowItem.remark = this.form.remark
              this.nowItem.sentenceType = this.form.type
              this.nowItem.abnormalFlag = this.form.abnormalFlag
              this.nowItem.gradeId = this.form.spindleLevel
              this.nowItem.downReasonId = this.form.downGradeReason
              for (let item of this.spindleLevelOptions) {
                if (item.id === this.form.spindleLevel) {
                  this.nowItem.gradeName = item.name
                }
              }
              for (let item of this.downGradeReasonOptions) {
                if (item.id === this.form.downGradeReason) {
                  this.nowItem.downReasonName = item.name
                }
              }
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
              let item2 = item.silkExceptionRecordBoList[item.silkExceptionRecordBoList.length - 1]
              item2.sentenceLevelId = ''
              item2.sentenceLevelName = ''
              item2.level = ''
              item2.remark = ''
              item2.sentenceType = ''
              item2.abnormalFlag = ''
              item2.downReasonId = ''
              item2.gradeId = ''
              if (item2.gradeName) {
                item2.gradeName = ''
              }
              if (item2.downReasonName) {
                item2.downReasonName = ''
              }
            }
          }
        } else { // 单个
          this.nowItem.sentenceLevelId = ''
          this.nowItem.sentenceLevelName = ''
          this.nowItem.level = ''
          this.nowItem.remark = ''
          this.nowItem.sentenceType = ''
          this.nowItem.abnormalFlag = ''
          this.nowItem.downReasonId = ''
          this.nowItem.gradeId = ''
          if (this.nowItem.gradeName) {
            this.nowItem.gradeName = ''
          }
          if (this.nowItem.downReasonName) {
            this.nowItem.downReasonName = ''
          }
        }
        this.dialogVisible = false
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
