<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="factoryName">
          <el-input v-model="form.factoryName" placeholder="请输入组织名称"></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="factoryCode">
          <el-input v-model="form.factoryCode" placeholder="请输入组织代码"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入城市"></el-input>
        </el-form-item>
        <el-form-item label="货币" prop="currency">
          <el-input v-model="form.currency" placeholder="请输入货币"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading.submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
        form: {
          factoryName: '',
          factoryCode: '',
          city: '',
          currency: '',
          action: '',
          id: ''
        },
        listItemId: '',
        loading: {
          submit: false
        },
        formRules: {
          factoryName: [{ required: true, message: '请输入组织名称', trigger: 'change blur' }],
          factoryCode: [{ required: true, message: '请输入组织代码', trigger: 'change blur' }],
          city: [{ required: true, message: '请输入城市', trigger: 'change blur' }],
          currency: [{ required: true, message: '请输入货币', trigger: 'change blur' }]
        }
      }
    },
    mounted () {
    },
    methods: {
      show (data) {
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = true
        this.form.action = data.action
        if (data.action === 'edit') {
          this.form.factoryName = data.factoryName
          this.form.factoryCode = data.factoryCode
          this.form.city = data.city
          this.form.currency = data.currency
          this.form.id = data.id
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              factoryName: this.form.factoryName,
              factoryCode: this.form.factoryCode,
              city: this.form.city,
              currency: this.form.currency
            }
            this.loading.submit = true
            if (this.form.action === 'edit') {
              Object.assign(params, {id: this.form.id})
              api.storage.warehouseManagement.updateSaleOrganization(params).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialogVisible = false
                  this.$emit('submitSuccess')
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                this.loading.submit = false
              })
            } else {
              api.storage.warehouseManagement.addSaleOrganization(params).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialogVisible = false
                  this.$emit('submitSuccess')
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                this.loading.submit = false
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
