<!--样品登记-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button type="primary" :loading="loading.submit" @click="onSubmit">提交</el-button>
        </div>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <fieldset>
              <legend>样品信息</legend>
              <el-form ref="registerForm" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="样品部门" prop="department">
                  <el-select v-model="form.department" placeholder="请选择样品部门" @change="deptChange">
                    <el-option v-for="item in departments" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="样品名称" prop="sampleId">
                  <el-select v-model="form.sampleId" placeholder="请选择样品名称">
                    <el-option v-for="item in sampleNames" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                  <el-button class="confirm-button" type="primary" @click="onConfirm">确定</el-button>
                </el-form-item>
                <el-form-item v-for="item in rpts"
                              :key="item.nodeCode"
                              v-if="formFlag"
                              :label="`${item.templateName}(${item.nodeCode})`">
                  <!--输入控件
                    @tempPropBlur="tempPropBlur"
                    @inputValueChange="inputValueChange"-->
                  <control-document
                    :type="item.type"
                    :nodeCode="item.nodeCode"
                    :selectStaticMapId="item.selectStaticMapId"
                    :documentType="item.documentType"
                    :value.sync="item.value"
                    :selectStaticMaps="item.selectStaticMaps"
                    :refTemplateData="item.refTemplateData"
                    :refTemplateId="item.refTemplateId"
                    @blur="reptBlur"
                    :name="item.nodeCode"
                    :disabled="item.type === 'REF_TEMP_CAL_RESULT'">
                  </control-document>

                </el-form-item>
                <!--<template v-if="formFlag">-->
                <!--<el-form-item v-for="item in rpts" :label="item.templateName" :key="item.nodeCode">-->
                  <!--<el-input :name="item.nodeCode" @blur="reptBlur" :disabled="item.type === 'REF_TEMP_CAL_RESULT'"></el-input>-->
                <!--</el-form-item>-->
                <!--</template>-->
              </el-form>
            </fieldset>
          </el-col>
          <el-col :span="12" style="padding-left:20px;">
            <fieldset>
              <legend>实验项目</legend>
              <div v-if="formFlag" style="margin-left:20px;">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <!--<div style="margin: 15px 0;"></div>-->
                <!--<el-checkbox v-for="record in records" :label="record.name" :key="record.id"-->
                <!--class="check-box">{{record.name}}-->
                <!--</el-checkbox>-->
                <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>-->
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedRecord" @change="checkChange">
                  <el-checkbox style="display: block; margin-left: 0px" v-for="item in records" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </fieldset>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {
      controlDocument: require('common/control-document.vue')
    },
    data () {
      return {
        loading: {
          submit: false
        },
        checkAll: false,
        user: {},
        formFlag: false,
        departments: [],
        sampleNames: [],
        isIndeterminate: false,
        rpts: [],
        reptValues: [],
        // 所有的
        records: [],
        // 选中的
        checkedRecord: [],
        // 带值的
        recordValues: [],
        form: {
          department: '',
          sampleId: ''
        },
        registerForm: {
          site: '',
          num: '',
          place: '',
          people: '',
          time: ''
        },
        rules: {
          department: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          sampleId: [
            { required: true, message: '请选择名称', trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
      this.getDepartment()
      this.user = storage.getUser()
    },
    methods: {
      // 获取样品部门
      getDepartment () {
        let params = {
          queryLabDataGroupDicCo: {
            type: 'SIMPLE_CATEGORY_FOR_DEP'
          }
        }
        api.chemicalLaboratory.classify.getLabDataGroupDicDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.departments = data.data.data
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        })
      },
      // 根据部门选择样品名称
      deptChange (deptId) {
        console.log(this.form.department)
        api.chemicalLaboratory.labSampleManagement.getLabSampleManagementVoListByDepartId({departId: deptId}).then(response => {
          const data = response.data
          if (data.success === true) {
            this.sampleNames = data.data
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        })
      },
      onConfirm () {
        this.$refs.registerForm.validate((valid) => {
          console.log(valid)
          if (valid) {
            api.chemicalLaboratory.labSampleManagement.getRptRecordBySampleId({labSampleManagementId: this.form.sampleId}).then(response => {
              const data = response.data
              if (data.success === true) {
                let jsonArray = JSON.parse(data.data.rptJson)
                console.log(jsonArray)
                // rptJson
                for (let i = 0; i < jsonArray.length; i++) {
                  if (!jsonArray[i].hasOwnProperty('value')) {
                    jsonArray[i].value = ''
                  }
                  if (jsonArray[i].documentType === 'TEMP_USER') {
                    jsonArray[i].value = this.user.name
                  }
                  jsonArray[i].selectStaticMaps = []
                  if (jsonArray[i].documentType === 'TEMP_SELECT' && jsonArray[i].selectStaticMapId) {
                    api.chemicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: jsonArray[i].selectStaticMapId}).then((response) => {
                      let data = response.data
                      if (data.success) {
                        jsonArray[i].selectStaticMaps = data.data
                        console.log(jsonArray[i].selectStaticMaps)
                      }
                    })
                  }
                }
                console.log(jsonArray)
                this.rpts = jsonArray
                this.formFlag = true
                this.records = data.data.labOriginalRecordVos
              } else {
                this.$message.error(data.errorMsg)
                return false
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      },
      reptBlur (obj) {
        let item = {name: obj.target.name, value: obj.target.value}
        let valueIndex = this.rpts.findIndex((value, index, arr) => {
          return value.nodeCode === item.name
        })
        Object.assign(this.rpts[valueIndex], {value: item.value})
      },
      onSubmit () {
        this.loading.submit = true
        let param = {}
        Object.assign(param,
          {
            labSampleRegisterRecordDo: {
              sampleManagementId: this.form.sampleId,
              creator: this.user.userId,
              modifier: this.user.userId
            }
          }
        )
        Object.assign(param, {fieldLocationJson: JSON.stringify(this.rpts)})
        console.log(param)
        let labOriginaIds = []
        for (let i = 0; i < this.checkedRecord.length; i++) {
          let index = this.records.findIndex((value, index, arr) => {
            return this.checkedRecord[i] === value.name
          })
          labOriginaIds.push(this.records[index].id)
        }
        Object.assign(param, {labOriginaIds: labOriginaIds})
        api.chemicalLaboratory.labSampleRegisterRecord.createLabSampleRegisterRecordDo(param).then(response => {
          const data = response.data
          if (data.success === true) {
            this.$message.success('样品登记成功')
            this.loading.submit = false
            this.$refs.registerForm.resetFields()
            this.formFlag = false
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      },
      handleCheckAllChange (checked) {
        let recoName = this.records.map(item => { return item.name })
        this.checkedRecord = checked ? recoName : []
        this.isIndeterminate = false
      },
      checkChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.records.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.records.length
      }
    }
  }
</script>
<style scoped>
  fieldset {
    display: block;
    -webkit-margin-start: 2px;
    -webkit-margin-end: 2px;
    -webkit-padding-before: 0.35em;
    -webkit-padding-start: 0.75em;
    -webkit-padding-end: 0.75em;
    -webkit-padding-after: 0.625em;
    min-width: -webkit-min-content;
    border-width: 2px;
    border-style: groove;
    border-color: #efefef;
    border-image: initial;
    min-height: 600px;
    border-radius: 5px;
  }

  legend {
    display: block;
    -webkit-padding-start: 2px;
    -webkit-padding-end: 2px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    width: 100px;
  }

  check-box {
    display: block;
    margin-top: 30px;
    margin-left: 0px;
  }

  confirm-button {
    margin-left: 1rem;
  }
</style>
