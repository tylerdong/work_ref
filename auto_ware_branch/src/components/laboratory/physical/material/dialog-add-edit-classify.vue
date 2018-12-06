<!--新增，编辑原始记录单分类-->
<template>
  <div>
    <jk-dialog :title="form.title" :visible.sync="dialogVisible">
      <div ref="formDom">
        <el-form :model="form" :rules="formRules" ref="form" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </jk-dialog>
  </div>
</template>
<script>
  import storage from 'storage'
  import * as api from 'src/api/index'

  export default {
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    created () {},
    data () {
      return {
        dialogVisible: false,
        user: null,
        form: {
          title: '',
          name: ''
        },
        formRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'change blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}
          ]
        }
      }
    },
    props: {},
    mounted () {
      this.user = storage.getUser()
    },
    computed: {},
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              type: 'LAB_MATERIAL',
              name: this.form.name,
              creator: this.user.userId,
              modifier: this.user.userId
            }
            if (this.form.title === '修改') {
              Object.assign(params, {id: this.form.id, modifier: this.form.modifier})
              api.physicalLaboratory.classify.updateLabDataGroupDicDo(params).then(response => {
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
              api.physicalLaboratory.classify.createLabDataGroupDicDo(params).then(response => {
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
      },
      show (formData) {
        this.form = formData
        this.dialogVisible = true
      }
    }
  }
</script>
<style scoped>
</style>
