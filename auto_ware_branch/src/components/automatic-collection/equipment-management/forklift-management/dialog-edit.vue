<!-- 新增 -->
<template>
  <dialog-side title="修改" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="所属车间" prop="shop">
        <el-select
          v-model="form.shop"
          placeholder="请选择"
          @change="selectChangeShop">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="叉车编号" prop="number">
        <el-input v-model="form.number" placeholder="请输入丝车编号"></el-input>
      </el-form-item>
      <el-form-item label="叉车类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择"
          @change="selectChangeForkliftType">
          <el-option
            v-for="item in forkliftTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前状态" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择"
          @change="selectChangeStatus">
          <el-option
            v-for="item in list.status"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="厂商" prop="supplier">
        <el-input v-model="form.supplier" placeholder="请输入厂商"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="form.brand" placeholder="请输入品牌"></el-input>
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
    props: ['shopList', 'forkliftTypeList'],
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
          type: '',
          status: '',
          supplier: '',
          brand: ''
        },
        list: {
          status: [
            {id: '1', name: '空闲'},
            {id: '2', name: '工作中'}
          ]
        },
        rules: {
          shop: [
            {required: true, message: '请选择车间', trigger: 'change'}
          ],
          number: [
            {required: true, message: '请输入叉车编号', trigger: 'change'},
            {trigger: 'change', max: 16, message: '字符不能超过16个'},
            {
              required: true,
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (value) {
                  api.automatic.device.checkForkliftNumber({
                    id: this.form.id,
                    number: value
                  }).then(response => {
                    const data = response.data
                    if (!data.data) {
                      callback(new Error('叉车编号重复'))
                    } else {
                      callback()
                    }
                  })
                } else {
                  callback(new Error('请输入叉车编号'))
                }
              }
            }
          ],
          type: [
            {required: true, message: '请选择叉车类型', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择当前状态', trigger: 'blur'}
          ],
          supplier: [
            {trigger: 'change', max: 32, message: '字符不能超过32个'}
          ],
          brand: [
            {trigger: 'change', max: 16, message: '字符不能超过16个'}
          ]
        }
      }
    },
    methods: {
      /* 打开 */
      btnOpen (row) {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.form = {
          id: row.id,
          shop: row.workshopId,
          number: row.number,
          type: row.classifyId,
          status: row.status,
          supplier: row.supplier,
          brand: row.brand
        }
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
            api.automatic.device.updateForklift({
              id: this.form.id,
              number: this.form.number,
              workshopId: this.form.shop,
              classifyId: this.form.type,
              status: this.form.status,
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
