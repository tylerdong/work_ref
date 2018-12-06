<template>
  <jk-dialog :title="dialog.title" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="60px">
      <el-form-item label="编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入维度编号"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="dimensionName">
        <el-input v-model="form.dimensionName" placeholder="请输入维度名称"></el-input>
      </el-form-item>
      <el-form-item label="枚举" prop="dimensionEnum">
        <el-input v-model="form.dimensionEnum" placeholder="请输入维度枚举"></el-input>
      </el-form-item>
      <el-form-item label="表" prop="tableName">
        <el-input v-model="form.tableName" placeholder="请输入维度枚举"></el-input>
      </el-form-item>
      <el-form-item label="主键" prop="fieldIdName">
        <el-input v-model="form.fieldIdName" placeholder="请输入维度枚举"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="fieldName">
        <el-input v-model="form.fieldName" placeholder="请输入维度枚举"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnConfirm('form')" :loading="loading.confirm">确 定</el-button>
      </el-form-item>
    </el-form>
  </jk-dialog>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {jkDialog: require('common/dialog-side.vue')},
    data () {
      return {
        dialog: { title: '新增', visible: false },
        itemData: {},
        form: {
          code: '',
          dimensionName: '',
          dimensionEnum: '',
          tableName: '',
          fieldIdName: '',
          fieldName: ''
        },
        rules: {
          code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
          dimensionName: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          dimensionEnum: [
            { required: true, message: '请输入枚举', trigger: 'blur' },
            { min: 5, max: 50, message: '密码长度为5-50位', trigger: 'blur change' }
          ],
          tableName: [{ required: true, message: '表名不能为空', trigger: 'blur' }],
          fieldIdName: [{ required: true, message: '主键名称不能为空', trigger: 'blur' }],
          fieldName: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
        },
        loading: { confirm: false }
      }
    },
    methods: {
      show (data) {
        this.dialog.visible = true
        this.dialog.title = data ? '修改' : '新增'
        this.$refs.form.resetFields()
        if (data) {
          this.itemData = data
          this.form.code = data.code
          this.form.dimensionName = data.dimensionName
          this.form.dimensionEnum = data.dimensionEnum
          this.form.tableName = data.tableName
          this.form.fieldIdName = data.fieldidName
          this.form.fieldName = data.fieldname
        }
      },
      btnConfirm (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.loading.confirm = true
            if (this.dialog.title === '新增') {
              api.dataAnalysis.addKpiDimension(this.form).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$emit('confirmSuccess')
                  this.dialog.visible = false
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.confirm = false
              })
            } else {
              api.dataAnalysis.updateKpiDimension({ ...this.form, id: this.itemData.id }).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$emit('confirmSuccess')
                  this.dialog.visible = false
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.confirm = false
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
