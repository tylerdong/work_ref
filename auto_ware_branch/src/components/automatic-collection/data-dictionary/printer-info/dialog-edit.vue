<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible" @closeSideDialog="returnBack">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="编号" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="form.model"></el-input>
        </el-form-item>
        <el-form-item label="车间" prop="workshop">
          <el-select v-loading="loading.workshop" v-model="form.workshop" placeholder="请选择">
            <el-option
              v-for="item in workshopOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="form.describe"></el-input>
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
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          code: '',
          model: '',
          type: '',
          workshop: '',
          describe: ''
        },
        typeOptions: [
          {id: '1', name: '丝锭条码打印'},
          {id: '2', name: '丝车条码打印'},
          {id: '3', name: '包装二维码'}
        ],
        workshopOptions: [],
        nowListItem: '',
        loading: {
          workshop: false
        },
        formRules: {
          code: [
            { required: true, message: '请输入编号', trigger: 'change blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change blur' }
          ],
          model: [
            { required: true, message: '请输入型号', trigger: 'change blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change blur' }
          ],
          workshop: [
            { required: true, message: '请选择车间', trigger: 'change blur' }
          ],
          describe: [
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
        this.getWorkshopOptions()
        this.nowListItem = listItem.row
        this.form.code = listItem.row.number
        this.form.model = listItem.row.model
        this.form.type = listItem.row.type
        this.form.workshop = listItem.row.workshopId
        this.form.describe = listItem.row.describe
        this.dialogVisible = true
      },
      getWorkshopOptions () {
        this.loading.workshop = true
        api.automatic.dictionary.getAllWorkshopList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.workshopOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.workshop = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              id: this.nowListItem.id,
              number: this.form.code,
              model: this.form.model,
              type: this.form.type,
              workshopId: this.form.workshop,
              describe: this.form.describe
            }
            api.automatic.dictionary.updatePrint(params).then((response) => {
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
      },
      returnBack () {
        this.dialogVisible = false
        this.$refs.ruleForm.resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
