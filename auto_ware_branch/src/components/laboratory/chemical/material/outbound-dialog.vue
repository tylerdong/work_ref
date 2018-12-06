<template>
  <el-dialog width="60%" :title="title" :visible.sync="dialogVisible">
    <el-form :rules="rules" ref="form" :model="form" label-width="108px">
      <el-form-item label="仪器" prop="materialId">
        <el-select v-model="form.materialId" filterable clearable @change="selectMaterial">
          <el-option v-for="item in options.instrument" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="名称" prop="instrumentId" required>-->
        <!--<el-input class="material-form-item" v-model="form.accidentCause" :disabled="this.type !== 'add'"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="规格" prop="accidentCause" required>-->
        <!--<el-input class="material-form-item" v-model="form.accidentCause" :disabled="this.type !== 'add'"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="库存">
        <el-input class="material-form-item" v-model="form.inNumber" placeholder="库存" disabled></el-input>
      </el-form-item>
      <el-form-item label="出库数量" prop="outNumber">
        <el-input-number v-model="form.outNumber" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="领用人" prop="recipient" required>
        <el-select class="material-form-item" v-model="form.recipient">
          <el-option v-for="item in options.user" :key="item.id" :label="item.useName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input class="material-form-item" v-model="form.remark" placeholder="填写备注"></el-input>
      </el-form-item>
      <el-form-item label="出库人">
        <el-input class="material-form-item" v-model="form.outStoragePersonName" disabled></el-input>
      </el-form-item>
      <el-form-item label="出库时间">
        <el-date-picker class="material-form-item" type="datetime" v-model="form.outStorageDate" disabled></el-date-picker>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button @click="confirm" type="primary" :loading="loading.confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    data () {
      return {
        dialogVisible: false,
        title: '材料出库',
        type: '',
        form: {
          dataGroupDicId: '',
          materialId: '',
          inNumber: '',
          outNumber: '',
          recipient: '',
          remark: '',
          outStoragePerson: '',
          outStoragePersonName: '',
          outStorageDate: ''
        },
        loading: {instrument: false, confirm: false},
        options: {instrument: [], user: []},
        userInfo: '',
        rules: {
          materialId: { required: true, message: '仪器名称不能为空', trigger: 'blur' },
          recipient: { required: true, message: '领用人不能为空', trigger: 'blur' }
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.form.outStoragePerson = this.userInfo.userId
      this.form.outStoragePersonName = this.userInfo.name
      this.form.outStorageDate = new Date()
      this.getUserList()
    },
    methods: {
      getUserList () {
        api.chemicalLaboratory.userManagerCenter.normalUserList({pageIndex: 1, pageCount: 10000}).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.options.user = data.data.list
          }
        })
      },
      getInstrumentList (groupId) {
        this.loading.groupids = false
        let params = {dataGroupDicId: groupId}
        api.chemicalLaboratory.labMaterialController.getLabMaterialDosByDataGroupDicId(params).then(response => {
          if (response.data.success && response.data.data.length > 0) {
            let data = response.data.data.map(item => { return {name: item.name, id: item.id, spec: item.spec} })
            this.options.instrument = data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.groupids = true
        })
      },
      show (groupId) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.getInstrumentList(groupId)
          this.form.dataGroupDicId = groupId
        })
      },
      selectMaterial (materialId) {
        if (materialId) {
          api.chemicalLaboratory.labMaterialController.getInventoryByLabMaterialId({id: materialId}).then(response => {
            let data = response.data
            if (data.success) {
              this.form.inNumber = data.data
            } else {
              this.$message.error(data.errorMsg)
            }
          })
        }
      },
      changeGroupId (groupId) {
        if (!groupId) {
          this.options.instrument = []
          return
        }
        this.loading.instrument = true
        this.form.instrumentId = ''
        let params = {
          queryLabInstrumentManagementCo: {
            status: 'NORMAL',
            groupId: groupId
          },
          page: {
            current: 1,
            length: 1000
          }
        }
        api.chemicalLaboratory.labInstrumentManagement.getLabInstrumentManagementDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.options.instrument = []
              return
            }
            this.options.instrument = data.data.data
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.instrument = false
        })
      },
      confirm () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.confirm = true
            let params = this.form
            params.creator = this.userInfo.userId     // 创建人
            params.gmtCreate = new Date()             // 创建时间
            params.modifier = this.userInfo.userId    // 更新人
            params.gmtModified = new Date()           // 更新时间
            api.chemicalLaboratory.labMaterialOutStorageController.createLabMaterialOutStorageDo(params).then(response => {
              const data = response.data
              if (data.success === true) {
                this.dialogVisible = false
                this.$emit('success')
              } else {
                this.$message.error(data.errorMsg)
                return false
              }
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
              this.loading.confirm = false
            })
          }
        })
      },
      getTime (date) {
        if (!date) {
          return ''
        } else if (date.getTime) {
          return date.getTime()
        } else {
          return new Date(date).getTime()
        }
      },
      add (params) {
        api.chemicalLaboratory.labInstrumentRepair.createLabInstrumentRepairDo(params).then(response => {
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
        api.chemicalLaboratory.labInstrumentRepair.updateLabInstrumentRepairDo(params).then(response => {
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
