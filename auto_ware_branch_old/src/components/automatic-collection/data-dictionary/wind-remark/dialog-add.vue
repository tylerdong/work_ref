<template>
  <jk-dialog title="增加" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注编号" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="车间">
          <el-checkbox-group v-model="form.workShopList">
            <template v-for="(item,index) in workShopList">
              <el-checkbox :label="item.id" :key="index">{{item.name}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="产品">
          <el-checkbox-group v-model="form.productTypeList">
            <template v-for="(item,index) in productTypeList">
              <el-checkbox :label="item.name" :key="index">{{item.name}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>

      </el-form>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
//  import storage from 'storage'
  export default {
    props: ['typeData', 'workShopList', 'productTypeList'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          id: '',
          name: '',
          number: '',
          // 车间
          workShopList: [],
          // 产品
          productTypeList: []
        },
        loading: {},
        formRules: {
          name: [
            { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change blur' },
            {
              required: true,
              trigger: 'change blur',
              validator: (rule, value, callback) => {
                if (value) {
                  let params = {
                    id: this.form.id,
                    name: this.form.name
                  }
                  api.automatic.dictionary.checkName(params).then(response => {
                    if (!response.data.data) {
                      callback(new Error('备注名称重复'))
                    } else {
                      callback()
                    }
                  })
                } else {
                  callback('请输入备注名称')
                }
              }
            }
          ],
          number: [
            {
              required: true,
              trigger: 'change blur',
              validator: (rule, value, callback) => {
                if (value) {
                  let params = {
                    id: this.form.id,
                    number: this.form.number
                  }
                  api.automatic.dictionary.checkNumber(params).then(response => {
                    if (!response.data.data) {
                      callback(new Error('备注编码重复'))
                    } else {
                      callback()
                    }
                  })
                } else {
                  callback('请输入备注编码')
                }
              }
            },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change blur' }
          ]
        }
      }
    },
    methods: {
      show () {
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = true
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('新增之后无法删除，是否确认新增?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true
                  let params = {
                    name: this.form.name,
                    number: this.form.number,
                    whorkshopId: this.form.workShopList,
                    productName: this.form.productTypeList
                  }
                  api.automatic.dictionary.addWindRemark(params).then((response) => {
                    const data = response.data
                    if (data.messageType === 1) {
                      this.dialogVisible = false
                      this.$emit('submitSuccess')
                    }
                  }).catch((e) => {
                    console.log(e)
                  }).finally(() => {
                    instance.confirmButtonLoading = false
                    done()
                  })
                } else {
                  instance.confirmButtonLoading = false
                  done()
                }
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
