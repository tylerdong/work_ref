<!--新增，编辑样品分类-->
<template>
  <div>
    <jk-dialog :title="title" :visible.sync="dialogVisible" width="80%">
      <div ref="formDom">
        <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
          <el-form-item label="设备名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="设备编码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="设备型号" prop="model">
            <el-input v-model="form.model"></el-input>
          </el-form-item>
          <el-form-item label="设备厂商" prop="manufacturer">
            <el-input v-model="form.manufacturer"></el-input>
          </el-form-item>
          <el-form-item label="设备类别" prop="type">
            <el-select v-model="form.type" clearable placeholder="请选择">
              <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <template v-if="form.type === 'SERIAL_PORT'">
            <el-form-item label="采集主服务器地址" prop="mainCollectingAddress">
              <el-input v-model="form.mainCollectingAddress"></el-input>
            </el-form-item>
            <el-form-item label="采集设备地址" prop="collectingAddress">
              <el-input v-model="form.collectingAddress"></el-input>
            </el-form-item>
            <el-form-item label="采集设备端口" prop="collectingPort">
              <el-input v-model="form.collectingPort"></el-input>
            </el-form-item>
          </template>
          <template v-else-if="form.type === 'FILE_ACQUISITION'">
            <el-form-item label="设备种类" prop="equipmentType">
              <el-select v-model="form.equipmentType" clearable placeholder="请选择">
                <el-option v-for="item in equipmentTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文件类别" prop="fileType">
              <el-select v-model="form.fileType" clearable placeholder="请选择">
                <el-option v-for="item in fileTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </template>
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
        title: '新增',
        item: {},
        types: [{name: '常规', value: 'NORMAL'}, {name: '串口', value: 'SERIAL_PORT'}, {name: '文件采集', value: 'FILE_ACQUISITION'}],
        equipmentTypes: [{name: '国产强生仪', value: 'JJ_RECORDER_MADE_CHINA'}],
        fileTypes: [{name: 'EXCEL', value: 'EXCEL'}],
        form: {
          name: '',
          code: '',
          model: '',
          manufacturer: '',
          type: '',
          mainCollectingAddress: '',
          collectingAddress: '',
          collectingPort: '',
          fileType: '',
          equipmentType: ''
        },
        loading: {save: false},
        userInfo: '',
        formRules: {
          name: [{required: true, message: '请输入设备名称', trigger: 'change blur'}],
          code: [{required: true, message: '请输入设备编码', trigger: 'change blur'}],
          model: [{required: true, message: '请输入设备型号', trigger: 'change blur'}],
          manufacturer: [{required: true, message: '请输入设备厂商', trigger: 'change blur'}],
          type: [{required: true, message: '请选择设备类别', trigger: 'change blur'}],
          mainCollectingAddress: [{required: true, message: '请输入采集主服务器地址', trigger: 'change blur'}],
          collectingAddress: [{required: true, message: '请输入采集设备地址', trigger: 'change blur'}],
          collectingPort: [{required: true, message: '请输入采集设备端口', trigger: 'change blur'}],
          equipmentType: [{required: true, message: '请选择设备种类', trigger: 'change blur'}],
          fileType: [{required: true, message: '请选择文件类别', trigger: 'change blur'}]
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    computed: {},
    methods: {
      show (itemData) {
        this.dialogVisible = true
        this.title = itemData.action === 'add' ? '新增' : '编辑'
        this.item = itemData
        this.$refs.ruleForm.resetFields()
        if (itemData.action === 'edit') {
          this.form.name = itemData.name
          this.form.code = itemData.code
          this.form.model = itemData.model
          this.form.manufacturer = itemData.manufacturer
          this.form.type = itemData.type
          this.form.mainCollectingAddress = itemData.mainCollectingAddress
          this.form.collectingAddress = itemData.collectingAddress
          this.form.collectingPort = itemData.collectingPort
          this.form.fileType = itemData.fileType
          this.form.equipmentType = itemData.equipmentType
        }
      },
      submitForm (ruleForm) {
        this.loading.save = true
        this.$refs[ruleForm].validate((valid) => {
          let param = Object.assign(this.form, {creator: this.userInfo.userId, modifier: this.userInfo.userId})
          if (this.item.action === 'add') {
            // 新增
            api.physicalLaboratory.labDeviceManagementController.createLabDeviceManagementDo(param).then(response => {
              let data = response.data
              if (data.success) {
                this.$emit('getData')
                this.dialogVisible = false
              } else {
                this.$message.error(data.errorMsg)
              }
            }).catch((err) => {
              console.log(err)
            }).finally(() => {
              this.loading.save = false
            })
          } else {
            // 编辑
            Object.assign(param, {id: this.item.id})
            api.physicalLaboratory.labDeviceManagementController.updateLabDeviceManagementDo(param).then(response => {
              let data = response.data
              if (data.success) {
                this.$emit('getData')
                this.dialogVisible = false
              } else {
                this.$message.error(data.errorMsg)
              }
            }).catch((err) => {
              console.log(err)
            }).finally(() => {
              this.loading.save = false
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
</style>
