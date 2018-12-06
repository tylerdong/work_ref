<!--新增，编辑样品部门-->
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
        form: {
          title: '',
          name: '',
          type: 'SIMPLE_CATEGORY_FOR_DEP'
        },
        id: '',
        loading: {
          save: false
        },
        userInfo: '',
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change' }
          ]
        }
      }
    },
    props: {},
    mounted () {
      this.userInfo = storage.getUser().userId
    },
    computed: {},
    methods: {
      show (formData) {
        console.log(this.userInfo)
        console.log(formData)
        this.form = formData
        this.dialogVisible = true
        this.id = formData.id
      },
      submitForm (ruleForm) {
        if (this.form.title === '新增') {
          let params = {
            type: 'SIMPLE_CATEGORY_FOR_DEP',
            name: this.form.name,
            creator: this.userInfo,
            modifier: this.userInfo
          }
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              this.loading.save = true
              api.chemicalLaboratory.classify.createLabDataGroupDicDo(JSON.stringify(params)).then(response => {
                const data = response.data
                if (data.success === true) {
                  this.dialogVisible = false
                  this.$message.success('新增成功')
                  this.$emit('submitSuccess')
                }
              }).finally(() => {
                this.loading.save = false
              })
            } else {
              return false
            }
          })
        } else if (this.form.title === '修改') {
          let params = {
            type: 'SIMPLE_CATEGORY_FOR_DEP',
            name: this.form.name,
            modifier: this.userInfo,
            id: this.id
          }
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              this.loading.save = true
              api.chemicalLaboratory.classify.updateLabDataGroupDicDo(JSON.stringify(params)).then(response => {
                const data = response.data
                if (data.success === true) {
                  this.dialogVisible = false
                  this.$message.success('修改成功')
                  this.$emit('submitSuccess')
                }
              }).finally(() => {
                this.loading.save = false
              })
            } else {
              return false
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
</style>
