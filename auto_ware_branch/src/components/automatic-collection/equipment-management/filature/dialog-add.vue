<!-- 新增 -->
<template>
  <dialog-side title="新增" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="所属车间" prop="shop">
        <el-select v-model="form.shop" placeholder="请选择" filterable>
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="丝车号" required>
        <el-col :span="11">
          <el-form-item prop="numberStart">
            <el-popover ref="popover" placement="bottom" title="" width="200" trigger="focus">
              <h4>提示！</h4>
              <span class="popcolor">请输入6位丝车号，首字母大写，且起始丝车号小于结束丝车号 如：F00001</span>
            </el-popover>
            <el-input v-model="form.numberStart" placeholder="起始丝车号" v-popover:popover></el-input>
          </el-form-item>
        </el-col>
        <el-col style="text-align: center;" class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="numberEnd">
            <el-popover ref="popover1" placement="bottom" title="" width="200" trigger="focus">
              <h4>提示！</h4>
              <span class="popcolor">请输入6位丝车号，首字母大写，且结束丝车号大于起始丝车号 如：F00002</span>
            </el-popover>
            <el-input v-model="form.numberEnd" placeholder="结束丝车号" v-popover:popover1></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="条码标识" prop="code">
        <el-popover ref="popover2" placement="bottom" title="" width="200" trigger="focus">
          <h4>提示！</h4>
          <span class="popcolor">请输入四位大写丝车标识，如：QWER</span>
        </el-popover>
        <el-input v-model="form.code" placeholder="请输入四位丝车条码标识" v-popover:popover2></el-input>
      </el-form-item>
      <el-form-item label="丝车规格" prop="specification">
        <el-select v-model="form.specification" placeholder="请选择" filterable>
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
          shop: '',
          numberStart: '',
          numberEnd: '',
          specification: '',
          supplier: '',
          brand: '',
          describe: '',
          code: '',
          carType: '1',
          plies: '1'
        },
        getCodesSetTimeout: '',
        getNumberSetTimeout: '',
        list: {
          specificationList: [],
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
            {required: true, message: '请输入条码标识', trigger: 'change'}
          ],
          numberStart: [
            {required: true, message: '请输入起始编号', trigger: 'change'}
          ],
          numberEnd: [
            {required: true, message: '请输入结束编号', trigger: 'change'}
          ],
          carType: [
            {required: true, message: '请输入结束编号', trigger: 'change'}
          ],
          specification: [
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
      btnOpen () {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.$refs.form.resetFields()
        this.form.numberStart = ''
      },

      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true
            api.automatic.device.addSilkCar({
              carType: this.form.carType,
              plies: this.form.plies,
              numberStart: this.form.numberStart,
              numberEnd: this.form.numberEnd,
              workshopId: this.form.shop,
              specification: this.form.specification,
              supplier: this.form.supplier,
              brand: this.form.brand,
              describe: this.form.describe,
              code: this.form.code
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
.popcolor{
  color: red;
}
</style>
