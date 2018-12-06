<!-- 新增 -->
<template>
  <dialog-side title="新增" width="450px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="所属车间" prop="shop">
        <el-select v-model="form.shop" placeholder="请选择" filterable @change="selectChangeShop">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线别" prop="productLine">
        <el-select v-model="form.productLine" placeholder="请选择" filterable @change="selectChangeProductLine">
          <el-option v-for="item in list.productLineList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机台位号" prop="item">
        <el-input-number v-model="form.item" placeholder="请输入机台位号" :min="1" :max="99" @change="selectChangeItem"></el-input-number>
      </el-form-item>
      <el-form-item label="卷绕头数" prop="partNum">
        <el-input-number v-model="form.partNum" placeholder="请输入卷绕头数" :min="2" :max="99999999" @change="partNumChage"></el-input-number>
      </el-form-item>
      <el-form-item label="锭数" prop="spinNum">
        <el-input-number v-model="form.spinNum" placeholder="请输入卷绕头数" :min="1" :max="99999999"></el-input-number>
      </el-form-item>
      <el-form-item label="设备编号" prop="number">
        <el-input v-model="form.number" placeholder="请输入设备编号"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="制造参数" prop="param">
        <el-input v-model="form.param" placeholder="请输入制造参数"></el-input>
      </el-form-item>
      <el-form-item label="厂商" prop="supplier">
        <el-input v-model="form.supplier" placeholder="请输入厂商"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="form.brand" placeholder="请输入品牌"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnSave" :loading="loading.btnSave">确 定</el-button>
    </div>
  </dialog-side>
</template>
<script>
  import * as api from '../../../../api'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
    },
    props: ['shopList'],
    data () {
      return {
        dialog: {
          visible: false
        },
        loading: {
          btnSave: false
        },
        form: {
          shop: '',
          productLine: '',
          item: 1,
          partNum: '',
          spinNum: '',
          number: '',
          name: '',
          param: '',
          supplier: '',
          brand: ''
        },
        list: {
          productLineList: []
        },
        rules: {
          shop: [
            {required: true, message: '请选择车间', trigger: 'change'}
          ],
          productLine: [
            {required: true, message: '请选择线别', trigger: 'change'}
          ],
          number: [
            {required: true, message: '请输入设备编号', trigger: 'blur'},
            {trigger: 'change', max: 16, message: '字符不能超过16个'},
            {
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (value) {
                  api.automatic.device.checkProductionMachineNumber({
                    id: '',
                    number: value
                  }).then(response => {
                    const data = response.data
                    if (!data.data) {
                      callback(new Error('设备编号重复'))
                    } else {
                      callback()
                    }
                  })
                } else {
                  callback(new Error('请输入设备编号'))
                }
              }
            }
          ],
          name: [
            {required: true, message: '请输入设备名称', trigger: 'blur'},
            {trigger: 'change', max: 64, message: '字符不能超过64个'},
            {
              required: true,
              trigger: 'change blur',
              validator: (rule, value, callback) => {
                if (value) {
                  api.automatic.device.checkProductionMachineName({
                    id: '',
                    name: value
                  }).then(response => {
                    const data = response.data
                    if (!data.data) {
                      callback(new Error('设备名称重复'))
                    } else {
                      callback()
                    }
                  })
                } else {
                  callback(new Error('请输入设备名称'))
                }
              }
            }
          ],
          item: [
            {
              required: true,
              trigger: 'change blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (this.form.productLine) {
                    api.automatic.device.checkProductionMachineItem({
                      id: '',
                      item: value,
                      lineId: this.form.productLine
                    }).then(response => {
                      const data = response.data
                      if (!data.data) {
                        callback(new Error('该线别的位号已占用'))
                      } else {
                        callback()
                      }
                    })
                  } else {
                    callback()
                  }
                } else {
                  callback(new Error('请输入机台位号'))
                }
              }
            }
          ],
          param: [
            {trigger: 'change', max: 32, message: '字符不能超过32个'}
          ],
          supplier: [
            {trigger: 'change', max: 32, message: '字符不能超过32个'}
          ],
          brand: [
            {trigger: 'change', max: 16, message: '字符不能超过16个'}
          ],
          partNum: [
            {
              required: true,
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value.toString().indexOf('.') === -1) {
                    if (parseInt(value) < parseInt(this.form.spinNum)) {
                      callback(new Error('卷绕头数必须大于锭数'))
                    }
                    callback()
                  } else {
                    callback(new Error('请输入正整数'))
                  }
                } else {
                  callback(new Error('请输入卷绕头数'))
                }
              }
            }
          ],
          spinNum: [
            {
              required: true,
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value.toString().indexOf('.') === -1) {
                    if (parseInt(value) > parseInt(this.form.partNum)) {
                      callback(new Error('锭数必须小于卷绕头数'))
                    } else {
                      callback()
                    }
                  } else {
                    callback(new Error('请输入正整数'))
                  }
                } else {
                  callback(new Error('请输入锭数'))
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      /* 打开 */
      btnOpen () {
        this.dialog.visible = true
        this.loading.btnSave = false
//        this.form = {
//          shop: '',
//          productLine: '',
//          item: 1,
//          partNum: '',
//          spinNum: '',
//          number: '',
//          name: '',
//          param: '',
//          supplier: '',
//          brand: ''
//        }
        this.list.productLineList = []
        this.$refs.form.resetFields()
//        this.$nextTick(() => {
//        })
      },

      /* 检查所属车间 并获取线别列表 */
      selectChangeShop (id) {
        if (id) {
          this.$refs.form.validateField('shop')
          this.form.productLine = ''
          this.list.productLineList = []
          api.automatic.productPlan.getAllLine({
            workShopId: id
          }).then(response => {
            const data = response.data
            for (let item of data.data) {
              this.list.productLineList.push({
                id: item.id,
                name: item.line
              })
            }
          })
        }
      },

      /* 检查线别 */
      selectChangeProductLine (val) {
        if (val) {
          this.$refs.form.validateField('productLine')
        }
      },

      /* 检查机台位号 */
      selectChangeItem (val) {
        if (val) {
          this.$refs.form.validateField('item')
        }
      },

      // 默认锭数和卷绕头数一样
      partNumChage (val) {
        if (val) {
          this.form.spinNum = val
        }
      },

      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true
            api.automatic.device.addProductionMachine({
              name: this.form.name,
              workshopId: this.form.shop,
              item: this.form.item,
              spindleNum: this.form.spinNum,
              partNum: this.form.partNum,
              number: this.form.number,
              param: this.form.param,
              lineId: this.form.productLine,
              supplier: this.form.supplier,
              brand: this.form.brand
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialog.visible = false
                this.$emit('callback-refresh-data')
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

</style>
