<template>
  <jk-dialog title="增加" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="锭重" prop="weight">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="产品分类" prop="productTypeId">
          <el-select v-loading="loading.productTypeId" v-model="form.productTypeId" placeholder="请选择">
            <el-option
              v-for="item in productTypeIdOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
          name: '',
          productTypeId: ''
        },
        productTypeIdOptions: [],
        loading: {
          productTypeId: ''
        },
        formRules: {
          weight: [
            { required: true, message: '请输入锭重', trigger: 'change blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'change' }
          ],
          productTypeId: [
            { required: true, message: '请选择产品', trigger: 'change blur' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show () {
        this.$refs.ruleForm.resetFields()
        this.getProductTypeIdOptions()
        this.dialogVisible = true
      },
      getProductTypeIdOptions () {
        this.loading.productTypeId = true
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.productTypeIdOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.productTypeId = false
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
                    weight: this.form.weight,
                    productTypeId: this.form.productTypeId
                  }
                  api.automatic.dictionary.addWeight(params).then((response) => {
                    const data = response.data
                    if (data.messageType === 1) {
                      this.dialogVisible = false
                      this.$emit('submitSuccess')
                    }
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
