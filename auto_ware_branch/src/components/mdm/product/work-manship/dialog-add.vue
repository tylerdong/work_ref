<template>
  <jk-dialog title="增加" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="产品分类" prop="productType">
          <el-select v-loading="loading.type" v-model="form.productType" placeholder="请选择">
            <el-option v-for="item in productTypeOptions" :key="item.typId" :label="item.typName" :value="item.typId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工艺编号" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="describe">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
          name: '',
          productType: '',
          number: '',
          describe: ''
        },
        timeout: {
          number: ''
        },
        productTypeOptions: [],
        loading: {
          type: false
        },
        formRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'change blur'},
            {min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change'}
          ],
          productType: [
            {required: true, message: '请选择产品分类', trigger: 'change blur'}
          ],
          number: [
            {required: true, message: '请选择产品分类', trigger: 'blur'},
            {max: 16, message: '长度在 1 到 16 个字符', trigger: 'change'}
          ],
          describe: [
            {min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change'}
          ]
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      show () {
        this.$refs.ruleForm.resetFields()
        this.getProductTypeOptions()
        this.dialogVisible = true
      },

      /* 获取产品分类下拉列表 */
      getProductTypeOptions () {
        this.loading.type = true
        api.mdm.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.productTypeOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.type = false
        })
      },

      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('新增之后无法删除，是否确认新增?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true
                  let params = {
                    productProcessName: this.form.name,
                    productTypeId: this.form.productType,
                    productProcessDescripe: this.form.describe,
                    number: this.form.number,
                    employeeId: this.userInfo.userId
                  }
                  api.mdm.addProductProcess(params).then((response) => {
                    const data = response.data
                    if (data.messageType === 1) {
                      this.dialogVisible = false
                      this.$emit('submitSuccess')
                    }
                  }).catch((e) => {
                    console.log(e)
                  }).finally(() => {
                    instance.confirmButtonLoading = false
                    done()
                  })
                } else {
                  instance.confirmButtonLoading = false
                  done()
                }
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
