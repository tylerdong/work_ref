<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="产品分类" prop="productType">
          <el-select v-loading="loading.type" v-model="form.productType" placeholder="请选择">
            <el-option
              v-for="item in productTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
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
  //  import storage from 'storage'
  export default {
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
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
            {max: 16, message: '长度在 1 到 16 个字符', trigger: 'change'},
            {
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (value) {
                  clearTimeout(this.timeout.number)
                  this.timeout.number = setTimeout(() => {
                    api.automatic.dictionary.checkProductProcessNumber({
                      id: this.form.id,
                      number: value
                    }).then(response => {
                      const data = response.data
                      if (data.data) {
                        callback()
                      } else {
                        callback(new Error('工艺编号已存在'))
                      }
                    }).catch(e => {
                      callback(new Error('无法检验工艺编号'))
                    })
                  }, 800)
                } else {
                  callback()
                }
              }
            }
          ],
          productType: [
            {required: true, message: '请选择产品分类', trigger: 'change blur'}
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show (listItem) {
        this.$refs.ruleForm.resetFields()
        this.getProductTypeOptions()
        this.nowListItem = listItem.row
        this.form.id = listItem.row.id
        this.form.name = listItem.row.name
        this.form.number = listItem.row.number
        this.form.productType = listItem.row.productTypeId
        this.form.describe = listItem.row.descripe
        this.dialogVisible = true
      },
      getProductTypeOptions () {
        this.loading.type = true
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
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
            api.automatic.dictionary.updateProductProcess({
              name: this.form.name,
              productProcessId: this.nowListItem.id,
              productProcessName: this.form.name,
              productTypeId: this.form.productType,
              productProcessDescripe: this.form.describe,
              number: this.form.number
            }).then((response) => {
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
