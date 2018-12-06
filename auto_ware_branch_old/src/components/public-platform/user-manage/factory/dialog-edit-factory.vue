<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="工艺" prop="workmanship">
          <el-select multiple v-loading="loading.workmanship" v-model="form.workmanship" placeholder="请选择" class="search-input-1">
            <el-option v-for="item in workmanshipOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code"></el-input>
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
          workmanship: []
        },
        workmanshipOptions: [],
        nowListItem: '',
        loading: {
          submit: false,
          workmanship: false
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 15, message: '长度在 1 到 10 个字符', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入编码', trigger: 'change blur' },
            { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'change blur' }
          ],
          workmanship: [
            { type: 'array', required: true, message: '至少选择一项工艺', trigger: 'change blur' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show (listItem) {
        this.$refs.ruleForm.resetFields()
        this.getWorkmanshipOptions()
        this.nowListItem = listItem.row
        this.form.name = listItem.row.workName
        this.form.workmanship = listItem.row.productIds.split(',')
        this.form.code = listItem.row.workCode
        this.dialogVisible = true
      },
      getWorkmanshipOptions () {
        this.loading.workmanship = true
        api.automatic.dictionary.getAllProductProcessList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.workmanshipOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.workmanship = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              name: this.form.name,
              id: this.nowListItem.id,
              code: this.form.code,
              productionProcessId: this.form.workmanship.join(',')
            }
            api.automatic.dictionary.updateWorkType(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                console.log(1111)
                this.dialogVisible = false
                this.$emit('submitSuccess')
              }
            }).catch((e) => {
              console.log(e)
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
  .search-input-1 {
    width: 22.5rem;
  }
</style>
