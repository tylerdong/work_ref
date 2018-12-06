<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
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
          weight: '',
          productTypeId: ''
        },
        productTypeIdOptions: [],
        listItemId: '',
        loading: {
          submit: false,
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
      show (listItem) {
        this.$refs.ruleForm.resetFields()
        this.listItemId = listItem.row.id
        this.form.weight = listItem.row.weight
        this.form.productTypeId = listItem.row.productTypeId
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
            this.loading.submit = true
            let params = {
              weight: this.form.weight,
              id: this.listItemId,
              productTypeId: this.form.productTypeId
            }
            api.automatic.dictionary.updateWeight(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                console.log(1111)
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
