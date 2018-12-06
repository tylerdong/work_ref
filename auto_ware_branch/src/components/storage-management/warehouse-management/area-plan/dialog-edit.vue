<template>
  <dialog-side title="修改" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="仓库名称" prop="warehouseId">
        <el-select v-model="form.warehouseId" placeholder="请选择" :span="24" disabled>
          <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库位" prop="storageName">
        <el-input v-model="form.storageName" disabled></el-input>
      </el-form-item>
      <el-form-item label="混批" prop="mixed">
        <el-checkbox v-model="form.mixed"></el-checkbox>
      </el-form-item>
      <el-form-item label="批号" prop="planBatchNoList">
        <el-checkbox-group v-model="form.planBatchNoList">
          <el-checkbox v-for="item in batchNoList" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo">{{item.batchNo}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="规格" prop="planSpec" :span="12">
        <el-input v-model="form.planSpec" placeholder="请输入规格"></el-input>
      </el-form-item>
      <el-form-item label="使用车间" prop="planWorkshopIds">
        <el-checkbox-group v-model="form.planWorkshopIds">
          <el-checkbox v-for="item in workshopList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="POY最大容量" prop="maxCapacityPoy">
        <el-input-number v-model="form.maxCapacityPoy" placeholder="请输入最大容量" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="FDY最大容量" prop="maxCapacityFdy">
        <el-input-number v-model="form.maxCapacityFdy" placeholder="请输入最大容量" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="聚酯切片最大容量" prop="maxCapacityChip">
        <el-input-number v-model="form.maxCapacityChip" placeholder="请输入最大容量" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="成品类型" prop="produceType">
        <el-select v-model="form.produceType" placeholder="请选择" clearable>
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-select v-model="form.level" placeholder="请选择"clearable>
          <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnSave" :loading="loading.btnSave">确定</el-button>
    </div>
  </dialog-side>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
//  import _ from 'lodash'
  export default {
    props: ['batchNoList', 'workshopList', 'warehouseList', 'typeList', 'gradeList'],
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
    },
    data () {
      return {
        dialog: {
          visible: false
        },
        loading: {
          btnSave: false
        },
        timeout: null,
        form: {
          id: '',
          warehouseId: '',
          warehouseName: '',
          storageId: '',
          storageName: '',
          mixed: false,
          planBatchNoList: [],
          planSpec: '',
          planWorkshopIds: [],
          produceType: '',
          level: '',
          maxCapacityPoy: '',
          maxCapacityFdy: '',
          maxCapacityChip: ''
        },
        rules: {
          warehouseId: [
            {type: 'number', required: true, message: '请选择仓库', trigger: 'blur change'}
          ]
        }
      }
    },
    methods: {
      open (row) {
        this.$refs.form.resetFields()
        this.dialog.visible = true
        this.loading.btnSave = false
        let planWorkshopIds = []
        for (let item of row.planWorkshopIdNameList) {
          planWorkshopIds.push(item.id)
        }
        this.form.id = row.id
        this.form.warehouseId = row.warehouseId
        this.form.warehouseName = row.warehouseName
        this.form.storageId = row.storageId
        this.form.storageName = row.storageName
        this.form.mixed = row.mixed
        if (row.planBatchNoList) {
          this.form.planBatchNoList = row.planBatchNoList
        }
        this.form.planSpec = row.planSpec
        this.form.planWorkshopIds = planWorkshopIds
        this.form.produceType = row.produceType
        this.form.level = row.levelName
        this.form.maxCapacityPoy = row.maxCapacityPoy
        this.form.maxCapacityFdy = row.maxCapacityFdy
        this.form.maxCapacityChip = row.maxCapacityChip
      },

      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true
            api.storage.warehouseManagement.updateStorageLocation({
              modifier: storage.getUser().account,
              id: this.form.id,
              warehouseId: this.form.warehouseId,
              warehouseName: this.form.warehouseName,
              storageId: this.form.storageId,
              storageName: this.form.storageName,
              mixed: this.form.mixed,
              batchNoList: this.form.planBatchNoList,
              spec: this.form.planSpec,
              workshopIds: this.form.planWorkshopIds,
              produceType: this.form.produceType,
              level: this.form.level,
              poyNum: this.form.maxCapacityPoy,
              fdyNum: this.form.maxCapacityFdy,
              pchipNum: this.form.maxCapacityChip
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialog.visible = false
                this.$emit('successSubmit')
              }
            }).finally(() => {
              this.loading.btnSave = false
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-checkbox-group {
    padding: 10px;
    border: 1px solid #bfccd9;
    border-radius: 5px;
    max-height: 250px;
    overflow: auto;
  }
  .el-checkbox{
    display: block;
    margin-left: 15px;
    font-weight: normal;
  }
</style>
