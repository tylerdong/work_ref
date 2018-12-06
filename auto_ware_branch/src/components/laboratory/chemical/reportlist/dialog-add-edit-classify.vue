<!--新增，编辑实验报告单分类-->
<template>
  <div>
    <jk-dialog :title="form.title" :visible.sync="dialogVisible">
      <div ref="formDom">
        <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </jk-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    created () {},
    data () {
      return {
        dialogVisible: false,
        user: '',
        form: this.formData,
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change' }
          ]
        }
      }
    },
    props: {
      formData: {
        type: Object,
        default: function () {
          return {
            title: '',
            name: ''
          }
        }
      }
    },
    mounted () {
      this.user = storage.getUser()
      console.log(this.form)
    },
    computed: {},
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              type: 'LAB_RPT_TEMPLATE',
              name: this.form.name,
              creator: this.user.userId,
              modifier: this.user.userId
            }
            if (this.form.title === '修改') {
              Object.assign(params, {id: this.form.id})
              api.chemicalLaboratory.classify.updateLabDataGroupDicDo(params).then(response => {
                if (response.data.success) {
                  this.dialogVisible = false
                  this.$emit('loadData')
                } else {
                  this.$message.error(response.data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {})
            } else {
              api.chemicalLaboratory.classify.createLabDataGroupDicDo(params).then(response => {
                if (response.data.success) {
                  this.dialogVisible = false
                  this.$emit('loadData')
                } else {
                  this.$message.error(response.data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {})
            }
          }
        })
        this.dialogVisible = false
      },
      show (formData) {
        this.dialogVisible = true
      }
    }
  }
</script>
<style scoped>
</style>
