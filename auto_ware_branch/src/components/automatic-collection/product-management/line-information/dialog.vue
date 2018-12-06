<template>
  <dialog-side width="380px" :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="newInfo" :rules="rules" ref="newInfo" :label-width="formLabelWidth">
      <el-form-item label="所属车间" prop="workShopId">
        <el-select v-model="newInfo.workShopId" placeholder="请选择所属车间" :disabled="disabled">
          <el-option
            v-for="item in workShopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线别" prop="line">
        <el-input v-model="newInfo.line" placeholder="请输入线别" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="生产产品" prop="productId">
        <el-select v-model="newInfo.productId" placeholder="请选择生产产品" :disabled="disabled">
          <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="落筒方式" prop="doffType">
        <el-radio-group v-model="newInfo.doffType" :disabled="doffTypeDisabled">
          <el-radio label="2">自动落筒</el-radio>
          <el-radio label="1">手动落筒</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开通自动外观检">
        <el-checkbox v-model="newInfo.autoType" true-label="Y" false-label="N"></el-checkbox>
      </el-form-item>
    </el-form>
    <div class="dialog-footer tr">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button :loading="loading.submit" type="primary" @click="sureBtn('newInfo')">确 定</el-button>
    </div>
  </dialog-side>
</template>

<script>
  import * as api from '../../../../api/index'
  import storage from '../../../../module/storage'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    props: ['workShopList', 'type', 'productList'],
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        loading: {
          submit: false
        },
        title: '',
        dialogFormVisible: false,
        disabled: true,
        doffTypeDisabled: true,
        userInfo: '',
        newInfo: {
          id: '',
          line: '',
          workShopId: '',
          workShopName: '',
          productId: '',
          productName: '',
          autoType: 'Y',
          doffType: '2'
        },
        rules: {
          workShopId: [
            { required: true, message: '所属车间不能为空', trigger: 'blur change' }
          ],
          line: [
            {
              required: true,
              trigger: 'blur, change',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('线别不能为空'))
                } else {
                  if (value.length > 6) {
                    callback(new Error('线别过长'))
                  }
                  if (this.type === 'add') {
                    this.checkLineName().then(value => {
                      if (value) {
                        callback()
                      } else {
                        callback(new Error('线别重复'))
                      }
                    }).catch(e => {
                      console.error(e)
                    })
                  } else {
                    callback()
                  }
                }
              }
            }
          ],
          productId: [
            { required: true, message: '生产产品不能为空', trigger: 'blur change' }
          ],
          doffType: [
            { required: true, message: '落筒方式不能为空', trigger: 'blur change' }
          ]
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      toggle (params) {
        this.newInfo.id = params.id
        this.newInfo.line = params.line
        this.newInfo.workShopId = params.workShopId
        this.newInfo.workShopName = params.workShopName
        this.newInfo.productId = params.productId
        this.newInfo.productName = params.productName
        this.newInfo.doffType = params.doffType
        this.newInfo.autoType = params.autoType
        this.title = params.title
        this.disabled = params.disabled
        this.doffTypeDisabled = params.doffTypeDisabled
        this.dialogFormVisible = params.dialogFormVisible
      },
      sureBtn (newInfo) {
        this.$refs[newInfo].validate(valid => {
          if (valid) {
            if (this.title === '新增') {
              this.add()
              return true
            }
            if (this.title === '修改') {
              this.update()
              return true
            }
            if (this.title === '查看') {
              this.dialogFormVisible = false
              return true
            }
          } else {
            return false
          }
        })
      },
      checkLineName () {
        return new Promise((resolve, reject) => {
          let params = {
            line: this.newInfo.line
          }
          api.automatic.productPlan.checkLineName(params).then(response => {
            if (response.data.messageType === 1) {
              resolve(response.data.data)
            }
            resolve(response.data.data)
          }).catch(e => {
            reject(e)
          })
        })
      },
      add () {
        let params = {
          line: this.newInfo.line,
          workShopId: this.newInfo.workShopId,
          productId: this.newInfo.productId,
          doffType: this.newInfo.doffType,
          autoType: this.newInfo.autoType,
          employeeId: this.userInfo.userId
        }
        console.log(params)
        this.loading.submit = true
        api.automatic.productPlan.addLine(params).then(response => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.$emit('callback')
            this.dialogFormVisible = false
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.submit = false
        })
      },
      update () {
        let params = {
          lineId: this.newInfo.id,
          doffType: this.newInfo.doffType,
          autoType: this.newInfo.autoType,
          employeeId: this.userInfo.userId
        }
        this.loading.submit = true
        api.automatic.productPlan.updateLine(params).then(response => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.$emit('callback')
            this.dialogFormVisible = false
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.submit = false
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
