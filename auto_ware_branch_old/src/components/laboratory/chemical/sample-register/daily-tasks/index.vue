<!--日常任务-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </div>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <fieldset>
              <legend>样品信息</legend>
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="样品部门">
                  <el-select v-model="form.department" placeholder="请选择样品部门" @change="deptChange">
                    <el-option v-for="item in departments" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="样品名称">
                  <el-select v-model="form.sampleId" placeholder="请选择样品名称">
                    <el-option v-for="item in sampleNames" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                  <el-button class="confirm-button" type="primary" @click="onConfirm">确定</el-button>
                </el-form-item>
              </el-form>
            </fieldset>
          </el-col>
          <el-col :span="12" style="padding-left:20px;">
            <fieldset>
              <legend>实验项目</legend>
              <div v-if="formFlag" style="margin-left:20px;">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
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
    data () {
      return {
        loading: {
          submit: false
        },
        user: {},
        formFlag: false,
        departments: [],
        sampleNames: [],
        form: {
          department: '',
          sampleId: ''
        },
        records: [],
        checkAll: false,
        checkedRecord: [],
        isIndeterminate: false
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
        api.chemicalLaboratory.labSampleManagement.getDailyLabSampleManagementVoListByDepartId({departId: deptId}).then(response => {
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
        api.chemicalLaboratory.labSampleManagement.getRptRecordBySampleId({labSampleManagementId: this.form.sampleId}).then(response => {
          const data = response.data
          if (data.success === true) {
            this.formFlag = true
            this.records = data.data.labOriginalRecordVos
          } else {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        })
      },
      checkAllChange (event) {
        let recoName = []
        this.records.forEach(function (item) {
          recoName.push(item.name)
        })
        this.checkedRecord = event.target.checked ? recoName : []
        this.isIndeterminate = false
      },
      checkChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.records.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.records.length
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
        let labOriginaIds = []
        for (let i = 0; i < this.checkedRecord.length; i++) {
          let index = this.records.findIndex((value, index, arr) => {
            return this.checkedRecord[i] === value.name
          })
          labOriginaIds.push(this.records[index].id)
        }
        Object.assign(param, {labOriginaIds: labOriginaIds})
        api.chemicalLaboratory.labSampleRegisterRecord.createDailyLabSampleRegisterRecordDo(param).then(response => {
          const data = response.data
          if (data.success === true) {
            this.$message.success('样品登记成功')
            this.formFlag = false
            this.loading.submit = false
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        })
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
    min-height:600px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
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
    width:100px;
  }
</style>
