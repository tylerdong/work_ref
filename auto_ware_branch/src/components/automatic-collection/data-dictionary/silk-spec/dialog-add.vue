<template>
  <jk-dialog title="增加" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="中间值" prop="centralValue">
          <el-input v-model="form.centralValue"></el-input>
        </el-form-item>
        <el-form-item label="孔数" prop="holeNum">
          <el-input v-model="form.holeNum"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <span v-if="form.centralValue">
            {{form.centralValue}}dtex
          </span>
          <span v-if="form.holeNum">/{{form.holeNum}}f</span>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading.submit" @click="submitForm('ruleForm')">提交</el-button>
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
          centralValue: '',
          holeNum: '',
          remark: ''
        },
        loading: {},
        formRules: {
          centralValue: [
            { required: true, message: '请输入中间值', trigger: 'change blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'change blur' }
          ],
          holeNum: [
            { required: true, message: '请输入孔数', trigger: 'change blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'change blur' }
          ],
          remark: [
            { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change blur' }
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
                    centralValue: this.form.centralValue,
                    holeNum: this.form.holeNum,
                    remark: this.form.remark
                  }
                  api.automatic.dictionary.addSpec(params).then((response) => {
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
