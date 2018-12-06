<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
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
          centralValue: '',
          holeNum: '',
          remark: ''
        },
        listItemId: '',
        loading: {
          submit: false
        },
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
      show (listItem) {
        this.$refs.ruleForm.resetFields()
        this.listItemId = listItem.row.id
        this.form.centralValue = listItem.row.centralValue
        this.form.holeNum = listItem.row.holeNum
        this.form.remark = listItem.row.remark
        this.dialogVisible = true
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              centralValue: this.form.centralValue,
              holeNum: this.form.holeNum,
              remark: this.form.remark,
              id: this.listItemId
            }
            api.automatic.dictionary.updateSpec(params).then((response) => {
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
