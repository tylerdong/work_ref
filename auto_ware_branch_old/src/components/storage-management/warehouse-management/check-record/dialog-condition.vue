<!-- 盘点条件 -->
<template>
  <dialog-side title="盘点条件" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="仓库" prop="warehouseId" required>
        <el-select v-model="form.warehouseId" placeholder="请选择仓库" filterable clearable @change="warehouseChange">
          <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="批号" prop="batchNo">
        <el-select v-model="form.batchNo" placeholder="请选择批号" filterable clearable>
          <el-option v-for="item in batchNoList" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级">
        <el-select class="width1" v-model="form.grade" placeholder="请选择等级" clearable>
          <el-option v-for="item in grade" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次">
        <el-select v-model="form.classId" placeholder="请选择班次" :loading="loading.classes" clearable>
          <el-option v-for="item in classes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生产日期">
        <el-date-picker v-model="form.productDate" type="date" @change="dtProductDateChange" placeholder="请选择生产日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开始入库日期" prop="startInboundDate">
        <el-date-picker v-model="form.startInboundDate" type="date" @change="dtStartInboundDateChange" placeholder="请选择开始入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止入库日期" prop="inboundDate">
        <el-date-picker v-model="form.inboundDate" type="date" @change="dtInboundDateChage" placeholder="请选择截止入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="扫码开始时间">
        <el-date-picker v-model="form.startScanTime" type="datetime" @change="dtStartScanTimeDateChage" placeholder="请选择扫码开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="扫码结束时间">
        <el-date-picker v-model="form.endScanTime" type="datetime" @change="dtEndScanTimeDateChage" placeholder="请选择扫码结束时间">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnConfirm" :loading="loading.btnConfirm">确定</el-button>
    </div>
  </dialog-side>
</template>
<script>
  // import * as api from 'src/api'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
    },
    props: ['warehouseList', 'lgortList', 'batchNoList', 'classes', 'grade'],
    data () {
      return {
        dialog: {
          visible: false
        },
        loading: {
          btnConfirm: false
        },
        form: {
          warehouseId: '',
          warehouseType: '',
          classId: '',
          batchNo: '',
          productDate: '',
          startInboundDate: '',
          inboundDate: '',
          startScanTime: '',
          endScanTime: '',
          grade: ''
        },
        list: {grade: []},
        rules: {
          warehouseId: [{required: true, type: 'number', message: '请选择仓库', trigger: 'change'}],
          startInboundDate: [{ required: true, message: '请选择开始入库日期', trigger: 'change' }],
          inboundDate: [{ required: true, message: '请选择截止入库日期', trigger: 'change' }]
        }
      }
    },
    methods: {
      show () {
        this.dialog.visible = true
        this.loading.btnConfirm = false
        this.$refs.form.resetFields()
      },
      warehouseChange (value) {
        let warehouse = this.warehouseList.find((item) => { return item.id === value })
        if (warehouse) {
          this.form.warehouseType = warehouse.type
        }
      },
      dtProductDateChange (value) {
        if (value) {
          this.form.productDate = this.form.productDate.getTime()
        } else {
          this.form.productDate = ''
        }
      },
      dtStartInboundDateChange (value) {
        if (value) {
          this.form.startInboundDate = this.form.startInboundDate.getTime()
        } else {
          this.form.startInboundDate = ''
        }
      },
      dtInboundDateChage (value) {
        if (value) {
          this.form.inboundDate = this.form.inboundDate.getTime()
        } else {
          this.form.inboundDate = ''
        }
      },
      dtStartScanTimeDateChage (value) {
        if (value) {
          this.form.startScanTime = this.form.startScanTime.getTime()
        } else {
          this.form.startScanTime = ''
        }
      },
      dtEndScanTimeDateChage (value) {
        if (value) {
          this.form.endScanTime = this.form.endScanTime.getTime()
        } else {
          this.form.endScanTime = ''
        }
      },
      btnConfirm () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.dialog.visible = false
            this.$emit('search', this.form)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
