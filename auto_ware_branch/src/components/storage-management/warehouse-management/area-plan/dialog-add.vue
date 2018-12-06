<template>
  <dialog-side title="新增" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="仓库" prop="warehouseId">
        <el-select v-model="form.warehouseId" @change="warehouseChange" placeholder="请选择" :span="24">
          <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库位" required>
        <el-col :span="11">
          <el-form-item prop="locationFrom">
            <el-select v-model="form.locationFrom" placeholder="请选择库位" :loading="loading.locationFrom">
              <el-option v-for="item in options.locationFrom" :key="item.storageId" :label="item.storageName"
                         :value="item.storageName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="text-align: center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="locationTo">
            <el-select v-model="form.locationTo" placeholder="请选择库位" :loading="loading.locationFrom">
              <el-option v-for="item in options.locationFrom" :key="item.storageId" :label="item.storageName"
                         :value="item.storageName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="混批" prop="mixed">
        <el-checkbox v-model="form.mixed"></el-checkbox>
      </el-form-item>
      <el-form-item label="批号" prop="batchNoList">
        <el-checkbox-group v-model="form.batchNoList">
          <el-checkbox v-for="item in batchNoList" :key="item.batchNo" :label="item.batchNo">{{item.batchNo}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!--<el-form-item label="规格" prop="spec" :span="12">-->
        <!--<el-input v-model="form.spec" placeholder="请输入规格"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="使用车间" prop="workshopIdList">
        <el-checkbox-group v-model="form.workshopIdList">
          <el-checkbox v-for="item in workshopList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="POY最大容量" prop="maxPOY">
        <el-input-number v-model="form.maxPOY" placeholder="请输入最大容量" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="FDY最大容量" prop="maxFDY">
        <el-input-number v-model="form.maxFDY" placeholder="请输入最大容量" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="聚酯切片最大容量" prop="maxChip">
        <el-input-number v-model="form.maxChip" placeholder="请输入最大容量" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="成品类型" prop="typeId">
        <el-select v-model="form.typeId" placeholder="请选择" clearable>
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="gradeName">
        <el-select v-model="form.gradeName" placeholder="请选择" clearable>
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
          btnSave: false,
          locationFrom: false
        },
        timeout: null,
        options: {
          locationFrom: []
        },
        form: {
          warehouseId: '',
          locationFrom: '',
          locationTo: '',
          mixed: false,
          batchNoList: [],
          spec: '',
          workshopIdList: [],
          typeId: '',
          gradeName: '',
          maxPOY: '',
          maxFDY: '',
          maxChip: ''
        },
        rules: {
          warehouseId: [
            {type: 'number', required: true, message: '请选择仓库', trigger: 'blur change'}
          ],
          locationFrom: [
            {
              required: true,
              trigger: 'blur',
              validator (rule, value, callback) {
                if (!value) {
                  return callback(new Error('请选择库位'))
                }
//                if (!/^[A-Z][0-9]+$/.test(value)) {
//                  return callback(new Error('库位格式错误'))
//                }
                callback()
              }
            }
          ],
          locationTo: [
            {
              required: true,
              trigger: 'blur',
              validator (rule, value, callback) {
                if (!value) {
                  return callback(new Error('请选择库位'))
                }
//                if (!/^[A-Z][0-9]+$/.test(value)) {
//                  return callback(new Error('库位格式错误'))
//                }
                callback()
              }
            }
          ],
          workshopIdList: [
            {required: true, type: 'array', trigger: 'blur change', message: '请选择车间'}
          ]
        }
      }
    },
    methods: {
      open () {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.options.locationFrom = []
        this.$refs.form.resetFields()
      },
      warehouseChange (item) {
        if (!item) {
          return
        }
        this.form.locationFrom = ''
        this.form.locationTo = ''
        this.loading.locationFrom = true
        let params = {
          warehouseId: item
        }
        api.storage.warehouseManagement.getStorageInfoByWarehouseId(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.locationFrom = data.data
          }
        }).finally(() => {
          this.loading.locationFrom = false
        })
      },
      btnSave () {
        console.log(this.form.warehouseId)
        this.$refs.form.validate(valid => {
          if (valid) {
            let from = this.form.locationFrom.substr(1, this.form.locationFrom.length - 1)
            let to = this.form.locationTo.substr(1, this.form.locationFrom.length - 1)
            if (from > to) {
              return this.$message.error('起始库位大于结束库位')
            }

            this.loading.btnSave = true
            api.storage.warehouseManagement.addStorageLocationList({
              creator: storage.getUser().account,
              warehouseId: this.form.warehouseId,
              storageStartNum: this.form.locationFrom,
              storageEndNum: this.form.locationTo,
              mixed: this.form.mixed,
              batchNoList: this.form.batchNoList,
              // spec: this.form.spec,
              workshopIds: this.form.workshopIdList,
              produceType: this.form.typeId,
              level: this.form.gradeName,
              poyNum: this.form.maxPOY,
              fdyNum: this.form.maxFDY,
              pchipNum: this.form.maxChip
            }).then(response => {
              const data = response.data
              let codeList = data.data
              if (codeList) {
                this.$message.error('库位 ' + codeList.join('、') + ' 存在库位计划')
              } else {
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
