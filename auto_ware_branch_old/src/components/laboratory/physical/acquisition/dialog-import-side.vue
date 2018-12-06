<!--待实验/原始记录/实验-->
<template>
  <div ref="dialogMain">
    <jk-dialog :title="form.title" :visible.sync="dialogVisible" width="70%">
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
        <!--选择设备-->
        <el-form-item label="选择设备" prop="equipmentTypeName">
          <el-select v-model="form.equipmentTypeName" placeholder="请选择设备" clearable @change="equipmentTypeChange">
            <el-option v-for="item in equipmentTypes" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!--导入数据-->
        <el-form-item label="导入数据">
          <span class="fileName">{{form.fileName}}</span>
          <el-button type="primary" size="small" @click="handleSelectFile('form')">
            {{form.name}}
          </el-button>
          <form action="" method="post" enctype="multipart/form-data" id="fileForm" style="display: none">
            <input type="file" ref="refInput" name="file" @change="handleSelectFileDeal">
          </form>
          <div class="el-upload__tip">上传文件不超过50M</div>
        </el-form-item>

        <el-form-item>
          <excel-preview :encodedFile="fileCode"></excel-preview>
        </el-form-item>
      </el-form>
    </jk-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import storage from 'storage'
  import * as api from 'src/api'

  export default {
    components: {
      jkDialog: require('common/dialog-side.vue'),
      excelPreview: require('common/excel-preview.vue')
    },
    created () {
    },
    filters: {},
    data () {
      return {
        dialogVisible: false,
        rowData: {},
        fileCode: '',
        form: {
          equipmentType: '',
          equipmentTypeName: '',
          fileType: '',
          fileName: '',
          name: '点击上传'
        },
        formRules: {
          equipmentTypeName: [{required: true, message: '请输入设备名称', trigger: 'change blur'}]
        },
        equipmentTypes: [],
        loading: {
          equipment: false,
          btnUpload: false
        }
      }
    },
    props: {},
    mounted () {
      this.user = storage.getUser()
      this.getEquipments()
    },
    computed: {},
    updated () {
    },
    methods: {
      show (data) {
        this.$refs.form.resetFields()
        this.form.fileName = ''
        this.rowData = data
        console.log(data.fileId)
        if (data.fileId) {
          this.filePreview(data.fileId)
        } else {
          this.fileCode = ''
        }
        this.dialogVisible = true
      },
      getEquipments () {
        this.loading.equipment = true
        let params = {queryLabDeviceManagementCo: {type: 'FILE_ACQUISITION'}, page: {current: 1, length: 10000}}
        api.physicalLaboratory.labDeviceManagementController.getLabDeviceManagementDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.equipmentTypes = data.data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.equipment = false
        })
      },
      equipmentTypeChange (id) {
        let selectedEquip = this.equipmentTypes.find(item => item.id === id)
        if (selectedEquip) {
          this.form.equipmentType = selectedEquip.equipmentType
          this.form.fileType = selectedEquip.fileType
        }
      },
      // 上传文件
      handleSelectFile (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$refs.refInput.click()
          }
        })
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
        console.log(`文件类型${type}`)
        this.form.fileName = files.name
        const formData = new FormData()
        formData.append('importType', this.form.fileType)
        formData.append('excelType', this.form.equipmentType)
        formData.append('originalPendingId', this.rowData.id)
        formData.append('file', this.$refs.refInput.files[0])
        this.form.name = '正在上传'
//        this.loading.btnUpload = true
        api.physicalLaboratory.labDataAcquisitionController.importData(formData).then((response) => {
          let data = response.data
          if (data.success) {
            this.filePreview(data.data)
            this.$message.success('上传成功')
            this.form.name = '点击上传'
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
        })
      },
      filePreview (fileId) {
        let params = {fileId: fileId}
        api.physicalLaboratory.fileManage.preView(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.fileCode = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((err) => {
          console.log(err)
          this.form.name = '上传失败，请重新上传'
        }).finally(() => {
        })
      }
    }
  }
</script>
<style>
</style>
<style scoped>
  #drop {
    border: 2px dashed #bbb;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    padding: 25px 50px;
    text-align: center;
    width: 202px;
    font: 15pt bold, "Vollkorn";
    color: #bbb;
  }
</style>
