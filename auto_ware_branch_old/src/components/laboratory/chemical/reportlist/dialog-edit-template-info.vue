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
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="handleConfirm('form')">确 定</el-button>
    </div>
    </el-form>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'

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
          fileName: ''
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
            fileName: ''
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
        api.chemicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
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
        if (type === 'pdf') {
          const formData = new FormData()
          formData.append('bizType', 'LAB_RPT_TEMPLATE')
          formData.append('file', this.$refs.refInput.files[0])
          this.btnUpload.name = '正在上传'
          this.btnUpload.loading = true
          api.chemicalLaboratory.fileManage.uploadOriginalTemplate(formData).then((response) => {
            let data = response.data
            if (data.success) {
              this.$message.success('上传成功')
              this.btnUpload.name = '点击上传'
              this.form.fileId = data.data.fileId
              // 获取pdf截图
              api.chemicalLaboratory.fileManage.downloadFdfToJpg({fileId: data.data.fileId}).then((response) => {
                this.$emit('loadPdfImg', response.data)
              })
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
          this.$message.error('只能上传pdf类型文件')
        }
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
          }
        })
        this.dialogTitle = this.title
      },
      // 初始化数据
      initData (data) {
        this.form = data
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
