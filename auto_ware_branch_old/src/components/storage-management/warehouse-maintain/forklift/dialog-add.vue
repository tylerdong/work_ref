<!-- 新增 -->
<template>
  <dialog-side title="新增" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="编号" prop="number">
        <el-input v-model="form.number" placeholder="请输入丝车编号"></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="carNo">
        <el-input v-model="form.carNo" placeholder="请输入丝车编号"></el-input>
      </el-form-item>
      <el-form-item label="叉车类型" prop="typeId">
        <el-select v-model="form.typeId" placeholder="请选择">
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属车间" prop="workshopList">
        <el-checkbox-group v-model="form.workshopList">
          <template v-for="item in workshopList">
            <el-checkbox :label="item.id" :disabled="form.typeId !== 'IN_STOCK'">{{item.name}}</el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="所属仓库" prop="warehouseList">
        <el-checkbox-group v-model="form.warehouseList">
          <template v-for="item in warehouseList">
            <el-checkbox :label="item.id" :disabled="form.typeId !== 'OUT_STOCK'">{{item.name}}</el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnSave" :loading="loading.btnSave">确定</el-button>
    </div>
  </dialog-side>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
    },
    props: ['workshopList', 'warehouseList', 'typeList'],
    data () {
      return {
        dialog: {
          visible: false
        },
        loading: {
          btnSave: false
        },
        form: {
          number: '',
          carNo: '',
          typeId: '',
          workshopList: [],
          warehouseList: []
        },
        rules: {
          number: [
            {required: true, message: '请输入编号', trigger: 'change blur'}
          ],
          carNo: [
            {required: true, message: '请输入车牌号', trigger: 'change blur'}
          ],
          typeId: [
            {required: true, message: '请选择叉车类型', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      /* 打开 */
      btnOpen () {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.$refs.form.resetFields()
      },

      /* 所属车间改变 */
      selectChangeShop (id) {
        this.$refs.form.validateField('shop')
      },

      /* 叉车类型改变 */
      selectChangeForkliftType (id) {
        this.$refs.form.validateField('type')
      },

      /* 当前状态改变 */
      selectChangeStatus (id) {
        this.$refs.form.validateField('status')
      },

      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true

            let workshops = ''
            let warehouses = ''
            this.form.workshopList.forEach(item => {
              workshops = workshops + item + ','
            })
            if (workshops.length) {
              workshops = workshops.substr(0, workshops.length - 1)
            }
            this.form.warehouseList.forEach(item => {
              warehouses = warehouses + item + ','
            })
            if (workshops.length) {
              warehouses = warehouses.substr(0, warehouses.length - 1)
            }
            api.storage.warehouseMaintain.addForklift({
              number: this.form.number,
              plateNumber: this.form.carNo,
              forkliftType: this.form.typeId,
              workshopIds: workshops,
              warehouseIds: warehouses
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
<style scoped lang="scss">
  .el-checkbox-group{
    border: 1px solid rgb(191, 204, 217);
    padding: 10px;
    border: 1px solid #bfccd9;
    border-radius: 5px;
    height: 250px;
    overflow: auto;
  .el-checkbox{
    display: block;
    margin-left: 15px;
    font-weight: normal;
  }
  }
</style>
