<template>
  <jk-dialog title="增加" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="工艺" prop="workmanship">
          <el-select multiple v-loading="loading.workmanship" v-model="form.workmanship" placeholder="请选择" class="search-input-1">
            <el-option v-for="item in workmanshipOptions" :key="item.proId" :label="item.proName" :value="item.proId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码" prop="name">
          <el-input v-model="form.code"></el-input>
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
          name: '',
          code: '',
          workmanship: []
        },
        workmanshipOptions: [],
        loading: {
          workmanship: false
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change blur' }
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
      show () {
        this.$refs.ruleForm.resetFields()
        this.getWorkmanshipOptions()
        this.dialogVisible = true
      },
      getWorkmanshipOptions () {
        this.loading.workmanship = true
        api.mdm.getAllProductProcessList({}).then((response) => {
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
                    productionProcessId: this.form.workmanship.join(',')
                  }
                  console.log(params)
                  api.mdm.addWorkType(params).then((response) => {
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
  .search-input-1 {
    width: 22.5rem;
  }
</style>
