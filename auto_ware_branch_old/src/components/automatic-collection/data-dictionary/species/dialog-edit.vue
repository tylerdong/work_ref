<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="产品" prop="productId">
          <el-select v-model="form.productId" placeholder="请选择" clearable>
            <el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="input-style" label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
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
    props: ['products'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          action: 'add',
          id: '',
          name: '',
          productId: ''
        },
        loading: {
          submit: false
        },
        formRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'change blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}
          ],
          productId: [
            {required: true, message: '请选择产品', trigger: 'change blur'}
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show (data) {
        this.form.action = data.action
        this.dialogVisible = true
        this.$refs.ruleForm.resetFields()
        if (data.action === 'edit') {
          this.form.id = data.row.kindId
          this.form.name = data.row.kindName
          this.form.productId = data.row.productId
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.action === 'add') {
              this.add()
            } else {
              this.edit()
            }
          }
        })
      },
      add () {
        this.loading.submit = true
        let params = {
          name: this.form.name,
          productId: this.form.productId
        }
        api.automatic.dictionary.addKind(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.dialogVisible = false
            this.$emit('submitSuccess')
          }
        }).finally(() => {
          this.loading.submit = false
        })
      },
      edit () {
        this.loading.submit = true
        let params = {
          id: this.form.id,
          name: this.form.name,
          productId: this.form.productId
        }
        api.automatic.dictionary.updateKind(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.dialogVisible = false
            this.$emit('submitSuccess')
          }
        }).finally(() => {
          this.loading.submit = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-style {
    width: 25rem;
  }
</style>
