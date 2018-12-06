<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="paperTubeSpec">
          <el-input v-model="form.paperTubeSpec"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="form.color"></el-input>
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
          code: '',
          color: '',
          paperTubeSpec: ''
        },
        listItemId: '',
        loading: {
          submit: false
        },
        formRules: {
          code: [
            { required: true, message: '请输入编码', trigger: 'change blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'change blur' }
          ],
          color: [
            { required: true, message: '请输入颜色', trigger: 'change blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'change blur' }
          ],
          paperTubeSpec: [
            { required: true, message: '请输入规格', trigger: 'change blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change blur' }
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
        this.nowListItem = listItem.row
        this.form.code = listItem.row.code
        this.form.paperTubeSpec = listItem.row.spec
        this.form.color = listItem.row.color
        this.dialogVisible = true
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              paperTubeCode: this.form.code,
              paperTubeColor: this.form.color,
              paperTubeId: this.nowListItem.id,
              paperTubeSpec: this.form.paperTubeSpec
            }
            api.automatic.dictionary.updatePaperTube(params).then((response) => {
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
