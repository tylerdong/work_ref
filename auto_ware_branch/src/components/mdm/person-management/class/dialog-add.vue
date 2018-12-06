<template>
  <jk-dialog title="增加" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="落次" prop="code">
          <el-select v-model="form.code" placeholder="请选择">
            <el-option
              v-for="item in codeOptions"
              :key="item.id"
              :label="item.id"
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
  import storage from 'storage'
  export default {
    props: ['typeData'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        userInfo: {},
        form: {
          name: '',
          code: ''
        },
        codeOptions: [
          {id: 'A'},
          {id: 'B'},
          {id: 'C'}
        ],
        loading: {},
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请选择落次', trigger: 'change blur' }
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
                    code: this.form.code,
                    employeeId: this.userInfo.userId
                  }
                  api.mdm.addClasses(params).then((response) => {
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
