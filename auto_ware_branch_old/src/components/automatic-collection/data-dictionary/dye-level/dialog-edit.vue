<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
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
    props: ['typeData'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          name: ''
        },
        listItemId: '',
        listItemName: '',
        loading: {
          submit: false
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change' },
            { validator: this.checkName, trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show (listItem) {
        console.log(listItem.row)
        this.$refs.ruleForm.resetFields()
        this.listItemId = listItem.row.id
        this.listItemName = listItem.row.name
        this.form.name = listItem.row.name
        this.dialogVisible = true
      },
      checkName (rule, value, callback) {
        console.log(rule)
        if (value === this.listItemName) {
          callback()
        }
        let params = {
          name: value
        }
        api.automatic.dictionary.checkSentenceLevelName(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            if (data.data) {
              callback()
            } else {
              callback(new Error('名称重复'))
            }
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              name: this.form.name,
              id: this.listItemId
            }
            api.automatic.dictionary.updateSentenceLevel(params).then((response) => {
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
