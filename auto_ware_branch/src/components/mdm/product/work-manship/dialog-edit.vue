<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="产品分类" prop="productType">
          <el-select v-loading="loading.type" v-model="form.productType" placeholder="请选择">
            <el-option v-for="item in productTypeOptions" :key="item.typId" :label="item.typName" :value="item.typId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工艺编号" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="describe">
          <el-input v-model="form.describe"></el-input>
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
  import storage from 'storage'
  export default {
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        userInfo: {},
        form: {
          id: '',
          name: '',
          productType: '',
          number: '',
          describe: ''
        },
        timeout: {
          number: ''
        },
        productTypeOptions: [],
        nowListItem: '',
        loading: {
          type: false,
          submit: false
        },
        formRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'change blur'},
            {min: 1, max: 15, message: '长度在 1 到 10 个字符', trigger: 'change blur'}
          ],
          number: [
            {required: true, message: '请选择产品分类', trigger: 'blur'},
            {max: 16, message: '长度在 1 到 16 个字符', trigger: 'change'}
          ],
          productType: [
            {required: true, message: '请选择产品分类', trigger: 'change blur'}
          ]
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      show (listItem) {
        this.$refs.ruleForm.resetFields()
        this.getProductTypeOptions()
        this.nowListItem = listItem.row
        this.form.id = listItem.row.proId
        this.form.name = listItem.row.proName
        this.form.number = listItem.row.proCode
        this.form.productType = listItem.row.proProductTypeId
        this.form.describe = listItem.row.proDescripe
        this.dialogVisible = true
      },
      getProductTypeOptions () {
        this.loading.type = true
        api.mdm.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.productTypeOptions = data.data
          }
        }).finally(() => {
          this.loading.type = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              name: this.form.name,
              productProcessId: this.nowListItem.proId,
              productProcessName: this.form.name,
              productTypeId: this.form.productType,
              productProcessDescripe: this.form.describe,
              number: this.form.number,
              employeeId: this.userInfo.userId
            }
            api.mdm.updateProductProcess(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialogVisible = false
                this.$emit('submitSuccess')
              }
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
