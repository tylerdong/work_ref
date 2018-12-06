<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" center>
    <el-dialog width="40%" :title="innerDialog.title" :visible.sync="innerDialog.visible" append-to-body center
               @close="innerDialogClose">
      <textarea class="copy-area" id="secretKey" :rows="5" placeholder="请输入内容" v-model="secretKey"></textarea>
      <span slot="footer">
        <button type="button" v-clipboard:copy="secretKey" v-clipboard:success="onCopy">
          复制到剪切板
        </button>
        <button @click="innerDialogClose">关闭</button>
      </span>
    </el-dialog>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="编码" prop="code">
        <el-input v-model="form.code" placeholder="请填写用户名" class="input-item20" clearable></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请填写用户名" class="input-item20" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="company">
        <el-input v-model="form.company" placeholder="请填写用户密码" class="input-item20" clearable></el-input>
      </el-form-item>
      <el-form-item label="工厂" prop="factory">
        <el-input v-model="form.factory" placeholder="请填写用户密码" class="input-item20" clearable></el-input>
      </el-form-item>
      <el-form-item label="车间" prop="workshop">
        <el-input v-model="form.workshop" placeholder="请填写用户密码" class="input-item20" clearable></el-input>
      </el-form-item>
      <el-form-item label="父编号" prop="parentCode">
        <el-input v-model="form.parentCode" placeholder="" class="input-item20" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="btnConfirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as api from '../../../api/index'
export default {
  data () {
    return {
      dialog: {title: '新增', visible: false},
      innerDialog: {title: '秘钥', visible: false},
      formData: {},
      form: {
        code: '',
        name: '',
        company: '',
        factory: '',
        workshop: '',
        parentCode: ''
      },
      secretKey: '',
      rules: {
        code: [
          {required: true, message: '编码不能为空', trigger: 'blur'},
          {min: 2, max: 500, message: '编码只能为2-500位字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 2, max: 500, message: '用户名只能为2-500位字符', trigger: 'blur'}
        ],
        company: [
          {required: true, message: '公司不能为空', trigger: 'blur'},
          {min: 2, max: 500, message: '公司只能为2-500位字符', trigger: 'blur'}
        ],
        factory: [
          {required: true, message: '工厂不能为空', trigger: 'blur'},
          {min: 2, max: 500, message: '工厂只能为2-500位字符', trigger: 'blur'}
        ],
        workshop: [
          {required: true, message: '车间不能为空', trigger: 'blur'},
          {min: 2, max: 500, message: '车间只能为2-500位字符', trigger: 'blur'}
        ]
      },
      loading: {confirm: false}
    }
  },
  mounted () {
  },
  methods: {
    show () {
      this.dialog.visible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    btnConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading.confirm = true
          if (this.dialog.title === '新增') {
            api.defect.pcsAddLine(this.form).then(response => {
              let data = response.data
              if (data.meta.code === 100000) {
                this.secretKey = data.data
                this.innerDialog.visible = true
              } else {
                this.$message({type: 'error', message: data.meta.message})
              }
            }).catch(e => {
              this.$message({type: 'error', message: e.message})
            }).finally(() => {
              this.loading.confirm = false
            })
          }
        }
      })
    },
    onCopy (e) {
      this.$message({type: 'success', message: '已复制成功!'})
    },
    innerDialogClose () {
      this.$emit('confirmSuccess')
      this.innerDialog.visible = false
      this.dialog.visible = false
    }
  }
}
</script>

<style scoped>
  .copy-area {
    width: 100%;
  }
</style>
