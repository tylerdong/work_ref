<template>
  <jk-dialog title="增加" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="异常级别" prop="level">
          <el-input v-model="form.level"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'api/index'
  import storage from 'storage'
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
          level: ''
        },
        loading: {},
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change' }
          ],
          level: [
            { required: true, message: '请输入异常级别', trigger: 'change blur' },
            { min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show () {
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = true
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
                    name: this.form.name,
                    level: this.form.level,
                    employeeId: storage.getUser().userId
                  }
                  api.automatic.dictionary.addExceptionLevel(params).then((response) => {
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
