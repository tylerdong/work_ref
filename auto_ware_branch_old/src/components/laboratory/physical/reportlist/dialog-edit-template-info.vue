<!--编辑实验报告单模板信息-->
<template>
  <el-dialog title="编辑模板信息" :visible.sync="dialogToggle" @close="close" class="edit-dialog-template-dialog" width="50%">
    <el-form :model="form" :rules="formRules" ref="form" label-width="10rem">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder='请输入模板名称'
                  class="edit-dialog-template-input"></el-input>
      </el-form-item>

      <el-form-item label="分类" prop="groupId">
        <el-select v-model="form.groupId" placeholder="请选择" class="edit-dialog-template-input">
          <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <template>
          <el-checkbox v-model="form.isAudit" true-label="Y" false-label="N">是否需要审核</el-checkbox>
        </template>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="handleConfirm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api/index'

  export default {
    created () {},
    data () {
      return {
        dialogToggle: false,
        dialogTitle: this.title,
        form: {
          index: 0,
          name: '',
          groupId: '',
          fileId: '',
          fileName: '',
          isAudit: ''
        },
        formRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'change blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}
          ],
          groupId: [
            {type: 'string', required: true, message: '请选择分类', trigger: 'change blur'}
          ]
//          fileId: [
//            {required: true, message: '请选择pdf文件', trigger: 'change blur'}
//          ]
        },
        groups: [],
        dialog: {},
        btnUpload: {
          name: '点击上传',
          loading: false
        },
        loading: false
      }
    },
    props: {
      title: {
        type: String,
        default: function () {
          return ''
        }
      },
      formData: {
        type: Object,
        default: function () {
          return {
            name: '',
            groupId: '',
            fileId: '',
            fileName: '',
            isAudit: ''
          }
        }
      }
    },
    mounted () {
    },
    computed: {},
    methods: {
      initReportGroups () {
        let params = {
          queryLabDataGroupDicCo: {
            type: 'LAB_RPT_TEMPLATE'
          }
        }
        api.physicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.groups = data.data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      handleSelectFile () {
        this.$refs.refInput.click()
      },
      show (data) {
        this.initReportGroups()
        this.dialogToggle = true
        this.$nextTick(() => {
          if (data.name && data.name !== '') {
            console.log('编辑')
            this.initData(data)
          } else {
            console.log('新增')
            this.form.name = ''
            this.form.fileName = ''
            this.form.fileId = ''
            this.form.groupId = ''
            this.form.isAudit = 'N'
          }
        })
        this.dialogTitle = this.title
      },
      // 初始化数据
      initData (data) {
        console.log(data)
        this.form = data
      },
      close () {
        this.dialogToggle = false
      },
      handleConfirm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('holeReportTempInfo', this.form)
            this.close()
          }
        })
      }
    }
  }
</script>
<style>
  .edit-dialog-template-dialog {
    width: 160rem;
  }

  .edit-dialog-template-input {
    width: 30rem;
  }

  .edit-dialog-template-input input[type=file] {
    display: none !important;
  }
</style>
