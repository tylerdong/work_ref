<template>
  <jk-dialog :title="dialog.title" :visible.sync="dialog.visible" width="45%">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" clearable>
            <el-option v-for="(item, index) in options.messageType" :label="item.name" :value="item.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
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
  import {messageType} from '../../../value-label'
  export default {
    props: ['typeData'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialog: { title: '新增', visible: false },
        options: { messageType: messageType },
        form: {
          type: '',
          content: '',
          description: ''
        },
        listItemId: '',
        loading: {
          submit: false
        },
        formRules: {
          type: [
            { required: true, message: '请选择类型', trigger: 'change blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'change blur' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show (data) {
        this.dialog.visible = true
        this.$refs.ruleForm.resetFields()
        this.dialog.title = data ? '修改' : '新增'
        if (data) {
          this.listItemId = data.id
          this.form.type = data.type
          this.form.content = data.content
          this.form.description = data.description
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = { ...this.form }
            this.loading.submit = true
            if (this.dialog.title === '新增') {
              this.$confirm('新增之后无法删除，是否确认新增?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                    instance.confirmButtonLoading = true
                    api.dataAnalysis.addMsgTemplate(params).then((response) => {
                      const data = response.data
                      if (data.messageType === 1) {
                        this.dialog.visible = false
                        this.$emit('submitSuccess')
                      } else {
                        this.$message({type: 'error', message: data.message})
                      }
                    }).finally(() => {
                      instance.confirmButtonLoading = false
                      done()
                      this.loading.submit = false
                    })
                  } else {
                    instance.confirmButtonLoading = false
                    done()
                  }
                }
              })
            } else {
              params = Object.assign(params, {id: this.listItemId})
              api.dataAnalysis.updateMsgTemplate(params).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.submit = false
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
