<template>
  <el-dialog width="80%" :title="title" :visible.sync="dialogVisible">
    <el-form :rules="rules" ref="form" :model="form" label-width="108px" :loading="loading.groupids">
      <el-form-item label="仪器" prop="materialId">
        <el-select v-model="form.materialId" filterable clearable>
          <el-option v-for="item in options.instrument" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入库数量" prop="inNumber">
        <el-input-number v-model="form.inNumber" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input class="material-form-item" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="入库人">
        <el-input class="material-form-item" v-model="form.inStoragePerson" disabled></el-input>
      </el-form-item>
      <el-form-item label="入库时间" prop="inStorageDate">
        <el-date-picker class="material-form-item" type="datetime" v-model="form.inStorageDate" disabled></el-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="confirm" type="primary" :loading="loading.confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import * as api from '../../../../api/index'
  import storage from 'storage'
  export default {
    props: [],
    data () {
      return {
        dialogVisible: false,
        title: '',
        type: '',
        formData: {},
        form: {
          materialId: '',
          dataGroupDicId: '',
          inNumber: '',
          remark: '',
          inStoragePerson: '',
          inStoragePersonName: '',
          inStorageDate: ''
        },
        loading: {
          groupids: false,
          confirm: false
        },
        options: {
          instrument: [],
          user: []
        },
        userInfo: '',
        rules: {
          materialId: { required: true, message: '请选择入库仪器', trigger: 'blur' }
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      getInstrumentList (groupId) {
        this.loading.groupids = false
        let params = {dataGroupDicId: groupId}
        api.physicalLaboratory.labMaterialController.getLabMaterialDosByDataGroupDicId(params).then(response => {
          if (response.data.success && response.data.data.length > 0) {
            let data = response.data.data.map(item => { return {name: item.name, id: item.id} })
            this.options.instrument = data
            console.log(data)
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.groupids = true
        })
      },
      show (groupId) {
        this.dialogVisible = true
        this.getInstrumentList(groupId)
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.inStoragePerson = this.userInfo.userId
          this.form.inStoragePersonName = this.userInfo.name
          this.form.inStorageDate = new Date()
          this.form.dataGroupDicId = groupId
        })
      },
      confirm () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let params = this.form
            // 创建人
            params.creator = this.userInfo.userId
            // 创建时间
            params.gmtCreate = new Date()
            // 更新人
            params.modifier = this.userInfo.userId
            // 更新时间
            params.gmtModified = new Date()
            this.add(params)
          }
        })
      },
      add (params) {
        this.loading.confirm = true
        api.physicalLaboratory.labMaterialInStorageController.createLabMaterialInStorageDo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.dialogVisible = false
            this.$emit('success')
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      update (params) {
        api.physicalLaboratory.labInstrumentRepair.updateLabInstrumentRepairDo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.dialogVisible = false
            this.$emit('success')
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      copy (form) {
        let obj = {}
        for (let prop in form) {
          obj[prop] = form[prop]
        }
        return obj
      }
    }
  }
</script>

<style scoped>
  .material-form-item {
    width: 80%;
  }
</style>
<style>
  .material-form-item.el-select .el-input{
    width: 100%;
  }
</style>
