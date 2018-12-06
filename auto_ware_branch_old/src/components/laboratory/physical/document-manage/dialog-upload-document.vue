<!--编辑实验报告单模板信息-->
<template>
  <el-dialog title="上传文件" :visible.sync="dialogToggle" @close="close" class="edit-dialog-template-dialog" width="50%">
    <el-form :model="form" :rules="formRules" ref="form" label-width="10rem">
      <el-form-item label="上传pdf" prop="fileId">
        <span class="fileName">{{form.fileName}}</span>
        <el-button type="primary" size="small" @click="handleSelectFile" :loading="btnUpload.loading">
          {{btnUpload.name}}
        </el-button>
        <form action="" method="post" enctype="multipart/form-data" id="fileForm" style="display: none">
          <input type="file" ref="refInput" name="upLoad" @change="handleSelectFileDeal">
        </form>
        <div class="el-upload__tip">只能上传pdf文件，且不超过50M</div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import storage from 'storage'
  import { eventHub } from '../../../../../src/module/eventHub'
  export default {
    created () {},
    data () {
      return {
        user: {},
        dialogToggle: false,
        form: {
          index: 0,
          name: '',
          groupId: '',
          fileId: '',
          fileName: ''
        },
        formRules: {},
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
        },
        formData: {
          type: Object,
          default: function () {
            return {
              name: '',
              groupId: '',
              fileId: '',
              fileName: ''
            }
          }
        }
      }
    },
    mounted () {
      this.user = storage.getUser()
    },
    computed: {},
    methods: {
      handleSelectFile () {
        this.$refs.refInput.click()
      },
      handleSelectFileDeal () {
        const files = this.$refs.refInput.files[0]
        if (!files) {
          return false
        }
        if (files.size / 1024 > 51200) {
          this.$message.error('文件大小不能超过50M')
          return false
        }
        this.form.fileName = files.name
        let dealType = files.name.split('.')
        let type = dealType[dealType.length - 1]
        if (['pdf', 'docx', 'doc', 'xlsx', 'xls'].includes(type)) {
          const formData = new FormData()
          formData.append('groupId', this.form.groupId)
          formData.append('creator', this.user.userId)
          formData.append('file', this.$refs.refInput.files[0])
          this.btnUpload.name = '正在上传'
          this.btnUpload.loading = true
          api.physicalLaboratory.labFileController.saveLabFile(formData).then((response) => {
            let data = response.data
            if (data.success) {
              this.$message.success('上传成功')
              this.btnUpload.name = '点击上传'
              this.close()
              this.$emit('uploadSuccess')
              eventHub.$emit('documentModified')
            } else {
              this.$message.error(data.errorMsg)
            }
          }).catch((err) => {
            console.log(err)
            this.btnUpload.name = '上传失败，请重新上传'
          }).finally(() => {
            this.btnUpload.loading = false
          })
        } else {
          this.$message.error('只能上传pdf,word,excel类型文件')
        }
      },
      show (data) {
        this.dialogToggle = true
        this.form.groupId = data.groupId
      },
      close () {
        this.dialogToggle = false
      },
      handleConfirm (formName) {
        this.$refs[formName].validate((valid) => {
          // 验证是否上传文件
          if (!this.form.fileId) {
            this.$message('请上传pdf文件')
            return
          }
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
