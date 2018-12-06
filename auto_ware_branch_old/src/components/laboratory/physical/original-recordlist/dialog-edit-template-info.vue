<!--编辑模板信息-->
<template>
  <el-dialog title="编辑模板信息" :visible.sync="dialogToggle" @close="close" class="edit-dialog-template-dialog" width="60%">
    <el-form :model="form" :rules="formRules" ref="form" label-width="10rem">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder='请输入模板名称'
                  class="edit-dialog-template-input"></el-input>
      </el-form-item>

      <el-form-item label="是否标样" prop="isGuideSample">
        <el-checkbox v-model="form.isGuideSample" true-label="Y" false-label="N"></el-checkbox>
      </el-form-item>

      <el-form-item label="分类" prop="groupId">
        <el-select v-model="form.groupId" placeholder="请选择" class="edit-dialog-template-input">
          <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <!--<el-form-item label="上传pdf" prop="fileId">-->
        <!--<span class="fileName">{{form.fileName}}</span>-->
        <!--<el-button type="primary" size="small" @click="handleSelectFile" :loading="btnUpload.loading">-->
          <!--{{btnUpload.name}}-->
        <!--</el-button>-->
        <!--<form action="" method="post" enctype="multipart/form-data" id="fileForm" style="display: none">-->
          <!--<input type="file" ref="refInput" name="file" @change="handleSelectFileDeal">-->
        <!--</form>-->
        <!--<div class="el-upload__tip">只能上传pdf文件，且不超过50M</div>-->
      <!--</el-form-item>-->

      <el-form-item label="最终结果计算类型" prop="calType">
        <el-select v-model="form.calType" placeholder="请选择" class="edit-dialog-template-input">
          <el-option v-for="item in calTypes" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <!--最终结果精度-->
      <el-form-item label="最终结果精度" prop="resultPricision">
        <el-select v-model="form.resultPricision" placeholder="请选择" class="template-input">
          <el-option v-for="item in pricisions" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否是纤度" prop="isFineness">
        <el-checkbox v-model="form.isFineness" true-label="Y" false-label="N"></el-checkbox>
      </el-form-item>

      <el-form-item label="是否是油剂" prop="isCrude">
        <el-checkbox v-model="form.isCrude" true-label="Y" false-label="N"></el-checkbox>
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
    created () {
    },
    data () {
      return {
        dialogToggle: false,
        form: {
          index: 0,
          name: '',
          isGuideSample: '',
          isFineness: '',
          isCrude: '',
          groupId: '',
          fileId: '',
          fileName: '',
          calType: '',
          calOriRecordNumber: '1',
          resultPricision: ''
        },
        formRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}
          ],
          groupId: [
            {required: true, message: '请选择分类', trigger: 'change'}
          ],
//          fileId: [
//            {required: true, message: '请选择pdf文件', trigger: 'change blur'}
//          ],
          calType: [
            {required: true, message: '请选择最终结果计算类型', trigger: 'change blur'}
          ],
          resultPricision: [
            {type: 'number', required: true, message: '请选择最终结果精度', trigger: 'change'}
          ]
        },
        rules: {},
        groups: [],
        pricisions: [
          {id: 0, name: '0', value: 0},
          {id: 1, name: '1', value: 1},
          {id: 2, name: '2', value: 2},
          {id: 3, name: '3', value: 3},
          {id: 4, name: '4', value: 4},
          {id: 5, name: '5', value: 5},
          {id: 6, name: '6', value: 6},
          {id: 7, name: '7', value: 7},
          {id: 8, name: '8', value: 8},
          {id: 9, name: '9', value: 9},
          {id: 10, name: '10', value: 10}
        ],
        calTypes: [
          {id: 1, name: '平均数', value: 'AVERAGE'}
        ],
        dialog: {},
        btnUpload: {
          name: '点击上传',
          loading: false
        },
        loading: false
      }
    },
    props: ['tempInfo'],
    mounted () {
      this.initTemplateClassify()
    },
    computed: {},
    methods: {
      handleSelectFile () {
        this.$refs.refInput.click()
      },
      checkedChange () {
        console.log(this.form.isGuideSample)
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
        let dealType = files.name.split('.')
        let type = dealType[dealType.length - 1]
        if (type === 'pdf') {
          this.form.fileName = files.name
          const formData = new FormData()
          formData.append('bizType', 'LAB_ORIGINAL_TEMPLATE')
          formData.append('file', this.$refs.refInput.files[0])
          this.btnUpload.name = '正在上传'
          this.btnUpload.loading = true
          api.physicalLaboratory.fileManage.uploadOriginalTemplate(formData).then((response) => {
            let data = response.data
            if (data.success) {
              this.$message.success('上传成功')
              this.btnUpload.name = '点击上传'
              this.form.fileId = data.data.fileId
              // 获取pdf截图
              api.physicalLaboratory.fileManage.downloadFdfToJpg({fileId: data.data.fileId}).then((response) => {
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
      initTemplateClassify () {
        let params = {
          queryLabDataGroupDicCo: {
            type: 'LAB_ORIGINAL_TEMPLATE'
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
          this.loading = false
        })
      },
      handleConfirm (formName) {
        // 验证是否上传文件
        // console.log('form', this.form)
        // if (!this.form.fileId) {
        //   this.$message('请上传pdf文件')
        //   return
        // }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('holeTempInfo', this.form)
            this.close()
          }
        })
      },
      // 显示模板信息编辑框
      show (data) {
        // console.log('data', data)
        this.dialogToggle = true
        this.$nextTick(() => {
          if (data.name && data.name !== '') {
            this.initData(data)
            // console.log(data)
          } else {
            // console.log('新增')
            this.form.name = ''
            this.form.isGuideSample = 'N'
            this.form.isFineness = 'N'
            this.form.isCrude = 'N'
            this.form.fileName = ''
            this.form.groupId = ''
            this.form.fileId = ''
            this.form.calType = ''
            this.form.calOriRecordNumber = '1'
            this.form.resultPricision = ''
          }
        })
      },
      // 初始化数据
      initData (data) {
        this.form = data
      },
      close () {
        this.dialogToggle = false
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
