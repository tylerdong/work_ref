<template>
  <el-dialog :title="dialog.title" width="40%" :visible.sync="dialog.visible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="层数" prop="layer">
          <el-input-number v-model="form.layer" :min="1" :max="99" class="input-item-18" @change="getSpec"></el-input-number>
        </el-form-item>

        <el-form-item label="行数" prop="row">
          <el-input-number v-model="form.row" :min="1" :max="99" class="input-item-18" @change="getSpec"></el-input-number>
        </el-form-item>

        <el-form-item label="列数" :min="1" :max="99" prop="column">
          <el-input-number v-model="form.column" class="input-item-18" @change="getSpec"></el-input-number>
        </el-form-item>

        <el-form-item label="规格" prop="spec">
          <el-input v-model="form.spec" readonly class="input-item-18"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" class="input-item-18"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading.submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    props: ['typeData'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialog: {
          visible: false,
          title: '新增'
        },
        form: {
          layer: 1,
          row: 1,
          column: 1,
          spec: 1,
          desc: ''
        },
        listItemId: '',
        loading: {
          submit: false
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
      this.getSpec()
    },
    methods: {
      show (data) {
        this.dialog.visible = true
        this.$refs.ruleForm.resetFields()
        if (data) {
          this.listItemId = data.id
          this.form.column = data.column
          this.form.desc = data.desc
          this.form.layer = data.layer
          this.form.row = data.row
          this.form.spec = data.spec
          this.dialog.title = '修改'
        } else {
          this.dialog.title = '新增'
        }
      },
      getSpec () {
        this.form.spec = this.form.layer * this.form.row * this.form.column * 2
        this.form.desc = `${this.form.layer}层*${this.form.row}行*${this.form.column}列*AB面`
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              layer: this.form.layer,
              row: this.form.row,
              column: this.form.column,
              spec: this.form.spec,
              desc: this.form.desc
            }
            console.log(params)
            if (this.dialog.title === '修改') {
              Object.assign(params, {id: this.listItemId})
              api.automatic.device.updateSilkcarSpec(params).then(response => {
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
            } else {
              api.automatic.device.addSilkcarSpec(params).then(response => {
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
