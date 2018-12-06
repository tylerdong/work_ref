<!--新增，修改样品-->
<template>
  <el-dialog :title="form.title" :visible.sync="dialogToggle" @close="close" class="template-dialog" width="80%">
    <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="10rem">
      <el-form-item label="样品名称" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder='请输入' class="template-input"></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="classify">
        <el-select v-model="form.classify" placeholder="请选择" class="template-input">
          <el-option
            v-for="item in classifies"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所属部门" prop="dept">
        <el-select v-model="form.dept" placeholder="请选择" class="template-input">
          <el-option
            v-for="item in depts"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报告单" prop="report">
        <el-select v-model="form.report" placeholder="请选择" class="template-input">
          <el-option
            v-for="item in reports"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox true-label="Y" false-label="N" label="仅用于日常任务" v-model="form.isUseDaily" class="checkbox-label"></el-checkbox>
        <el-checkbox true-label="Y" false-label="N" label="是否留样" v-model="form.isKeepSample" class="checkbox-label" @change="ClickCheck"></el-checkbox>
      </el-form-item>

      <el-form-item label="留样周期" prop="resePeriod" v-show="meShow">
        <el-input-number v-model="form.expDate" auto-complete="off" placeholder='请输入' class="template-input"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="handleConfirm('ruleForm')">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from '../../../../api/index'
  import storage from '../../../../module/storage'
  export default {
    created () {},
    data () {
      return {
        dialogToggle: false,
        form: {
          title: '',
          name: '',
          classify: '',
          report: '',
          reportId: '',
          reportName: '',
          expDate: '',
          dept: '',
          isUseDaily: '',
          isKeepSample: '',
          deptName: '',
          classifyName: ''
        },
        meShow: null,
        groupType: 'SIMPLE_CATEGORY',
        registerType: 'SIMPLE_CATEGORY_FOR_DEP',
        rules: {},
        depts: [],
        classifies: [],
        reports: [],
        dialog: {},
        loading: false,
        userInfo: '',
        id: '',
        formRules: {
          classify: [
            { required: true, message: '请选所属分类', trigger: 'change' }
          ],
          dept: [
            { required: true, message: '请选所属部门', trigger: 'change' }
          ],
          report: [
            { required: true, message: '请选报告单', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change' }
          ],
          expDate: [
            { required: true, message: '请输入日起', trigger: 'change blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change' }
          ]
        }
      }
    },
    props: {},
    mounted () {
      this.userInfo = storage.getUser().userId
    },
    computed: {},
    filters: {

    },
    methods: {
      show (form) {
        this.getGroupSelectData()
        this.getRegisterTypeSelectData()
        this.getTemplateDoList()
        if (this.form.title === '新增') {
          this.$refs.ruleForm.resetFields()
        }
        Object.assign(this.form, form)
        if (this.form.title === '修改') {
          this.form.dept = form.departId
          this.form.classify = form.groupId
          this.form.report = form.rptTemplateId
        }
        this.ClickCheck()
        this.dialogToggle = true
        this.id = form.id
      },
      close () {
        this.dialogToggle = false
      },
      ClickCheck () {
        if (this.form.isKeepSample === 'N' || this.form.isKeepSample === false) {
          this.meShow = false
        } else {
          this.meShow = true
        }
      },
      handleConfirm (ruleForm) {
        if (this.form.isKeepSample === 'N') {
          this.form.expDate = ''
        }
        if (this.form.title === '新增') {
          for (let i = 0; i < this.depts.length; i++) {
            if (this.depts[i].id === this.form.dept) {
              this.form.deptName = this.depts[i].name
            }
          }
          for (let i = 0; i < this.classifies.length; i++) {
            if (this.classifies[i].id === this.form.classify) {
              this.form.classifyName = this.classifies[i].name
            }
          }
          for (let i = 0; i < this.reports.length; i++) {
            if (this.reports[i].id === this.form.report) {
              this.form.reportName = this.reports[i].name
            }
          }
          if (this.form.isKeepSample === false) {
            this.form.isKeepSample = 'N'
          }
          if (this.form.isUseDaily === false) {
            this.form.isUseDaily = 'N'
          }
          let params = {
            name: this.form.name,
            groupId: this.form.classify,
            groupName: this.form.classifyName,
            departId: this.form.dept,
            departName: this.form.deptName,
            rptTemplateId: this.form.report,
            isUseDaily: this.form.isUseDaily,
            isKeepSample: this.form.isKeepSample,
            expDate: this.form.expDate,
            creator: this.userInfo,
            modifier: this.userInfo
          }
          console.log(params)
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              this.dialogToggle = true
              console.log(params)
              api.physicalLaboratory.labSampleManagement.createLabSampleManagementDo(params).then(response => {
                const data = response.data
                if (data.success === true) {
                  this.dialogVisible = false
                  this.$message.success('新增成功')
                  this.$emit('submitSuccess')
                }
              }).finally(() => {
                this.dialogToggle = false
              })
            } else {
              return false
            }
          })
        } else if (this.form.title === '修改') {
          if (this.form.isKeepSample === 'N') {
            this.form.expDate = ''
          }
          let params = {
            name: this.form.name,
            groupId: this.form.classify,
            groupName: this.form.classify.name,
            departId: this.form.dept,
            departName: this.form.dept.name,
            rptTemplateId: this.form.report,
            isUseDaily: this.form.isUseDaily,
            isKeepSample: this.form.isKeepSample,
            expDate: this.form.expDate,
            modifier: this.userInfo,
            id: this.id
          }
          console.log(params)
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              this.dialogToggle = true
              api.physicalLaboratory.labSampleManagement.updateLabSampleManagementDo(JSON.stringify(params)).then(response => {
                const data = response.data
                if (data.success === true) {
                  this.dialogVisible = false
                  this.$message.success('修改成功')
                  this.$emit('submitSuccess')
                }
              }).finally(() => {
                this.dialogToggle = false
              })
            } else {
              return false
            }
          })
        }
      },
      getTemplateDoList () {
        let param = {
          queryLabRptlTemplateCo: {
            name: ''
          }
        }
        api.physicalLaboratory.labRptTemplateController.getLabRptTemplateDoList(param).then(response => {
          const data = response.data
          if (data.success === true) {
            this.reports = data.data.data
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      getGroupSelectData () {
        let params = {
          queryLabDataGroupDicCo: {
            type: this.groupType
          }
        }
        api.physicalLaboratory.classify.getLabDataGroupDicDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.classifies = data.data.data
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      getRegisterTypeSelectData () {
        let params = {
          queryLabDataGroupDicCo: {
            type: this.registerType
          }
        }
        api.physicalLaboratory.classify.getLabDataGroupDicDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.depts = data.data.data
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.tableLoading = false
        })
      }
    }
  }
</script>
<style scope>
  .template-dialog {
    width: 160rem;
  }
  .template-input {
    width: 30rem;
  }
  .template-input input[type=file]{
    display: none !important;
  }
  .checkbox-label {
    font-weight: 500;
  }
</style>
