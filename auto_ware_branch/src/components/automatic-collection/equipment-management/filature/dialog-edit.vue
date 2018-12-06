<!-- 修改 -->
<template>
  <dialog-side title="修改" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="所属车间" prop="shop">
        <el-select v-model="form.shop" placeholder="请选择" filterable>
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="丝车编号" prop="number">
        <el-input v-model="form.number" placeholder="请输入丝车编号"></el-input>
      </el-form-item>
      <el-form-item label="丝车条码" prop="code">
        <el-input v-model="form.code" placeholder="请输入条码"></el-input>
      </el-form-item>
      <el-form-item label="丝车规格" prop="specification">
        <el-select v-model="form.silkcarSpecId" placeholder="请选择" filterable>
          <el-option v-for="item in specificationList" :key="item.id" :label="item.spec" :value="item.id">
            <span style="float: left">{{ item.spec }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.desc }}</span>
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="丝车类型" prop="carType">
          <el-select v-model="form.carType" placeholder="请选择丝车类型" filterable>
            <el-option v-for="item in list.carTypeList" :key="item.value" :label="item.type" :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item v-if="form.carType === '2'" label="层数" prop="plies">
        <el-select v-model="form.plies" placeholder="请选择层数" clearable="">
          <el-option v-for="item in list.pliesList" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="厂商" prop="supplier">
        <el-input v-model="form.supplier" placeholder="请输入厂商"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="form.brand" placeholder="请输入品牌"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" v-model="form.describe" :rows="4" placeholder="请输入描述"></el-input>
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
    props: ['shopList', 'specificationList'],
    data () {
      return {
        dialog: {
          visible: false
        },
        loading: {
          btnSave: false
        },
        form: {
          id: '',
          shop: '',
          number: '',
          silkcarSpecId: '',
          supplier: '',
          brand: '',
          describe: '',
          code: '',
          carType: '',
          plies: '1'
        },
        getCodesSetTimeout: '',
        getNumberSetTimeout: '',
        list: {
          carTypeList: [
            {type: '丝车', value: '2'},
            {type: '普通', value: '1'}
          ],
          pliesList: [
            {name: '1', value: '1'},
            {name: '2', value: '2'},
            {name: '3', value: '3'}
          ]
        },
        rules: {
          shop: [
            {required: true, message: '请选择车间', trigger: 'change'}
          ],
          code: [
            {required: true, message: '请输入丝车条码', trigger: 'change'},
            {required: true, trigger: 'change', max: 16, message: '字符不能超过16个'},
            {
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (value) {
                  clearTimeout(this.getCodesSetTimeout)
                  this.getCodesSetTimeout = setTimeout(() => {
                    api.automatic.device.checkSilkCarCode({
                      id: this.form.id,
                      code: value
                    }).then(response => {
                      const data = response.data
                      if (!data.data) {
                        callback(new Error('丝车条码重复'))
                      } else {
                        callback()
                      }
                    })
                  }, 800)
                } else {
                  callback(new Error('请输入丝车条码'))
                }
              }
            }
          ],
          number: [
            {required: true, message: '请输入丝车编号', trigger: 'change'},
            {trigger: 'change', max: 16, message: '字符不能超过16个'},
            {
              required: true,
              trigger: 'change blur',
              max: 16,
              validator: (rule, value, callback) => {
                if (value) {
                  clearTimeout(this.getNumberSetTimeout)
                  this.getNumberSetTimeout = setTimeout(() => {
                    api.automatic.device.checkSilkCarNumber({
                      id: this.form.id,
                      number: value
                    }).then(response => {
                      const data = response.data
                      if (data.messageType === 1) {
                        if (data.data) {
                          callback()
                        } else {
                          callback(new Error('丝车编号重复'))
                        }
                      }
                    })
                  }, 800)
                } else {
                  callback(new Error('请输入丝车编号'))
                }
              }
            }
          ],
          carType: [
            {required: true, message: '请输入结束编号', trigger: 'change'}
          ],
          silkcarSpecId: [
            {required: true, message: '请选择丝车规格', trigger: 'change'},
            {trigger: 'change', max: 8, message: '字符不能超过8个'}
          ],
          supplier: [
            {trigger: 'change', max: 32, message: '字符不能超过32个'}
          ],
          brand: [
            {trigger: 'change', max: 16, message: '字符不能超过16个'}
          ],
          describe: [
            {trigger: 'change', max: 64, message: '字符不能超过64个'}
          ],
          plies: [
            {trigger: 'change', max: 64, message: '请选择层数'}
          ]
        }
      }
    },
    methods: {
      /* 打开 */
      btnOpen (row) {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.$refs.form.resetFields()
        this.form.carType = row.carType
        this.form.plies = row.plies ? row.plies : '1'
        this.form.id = row.id
        this.form.shop = row.workshopId
        this.form.number = row.number
        this.form.silkcarSpecId = row.silkcarSpecId.toString()
        this.form.supplier = row.supplier
        this.form.brand = row.brand
        this.form.describe = row.describe
        this.form.code = row.code
      },

      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true
            let specItem = this.specificationList.find(item => { return item.id === this.form.silkcarSpecId })
            let param = {
              carType: this.form.carType,
              plies: this.form.plies,
              id: this.form.id,
              number: this.form.number,
              workshopId: this.form.shop,
              silkcarSpecId: this.form.silkcarSpecId,
              specification: specItem.spec,
              supplier: this.form.supplier,
              brand: this.form.brand,
              describe: this.form.describe,
              code: this.form.code
            }
            api.automatic.device.updateSilkCar(param).then(response => {
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
