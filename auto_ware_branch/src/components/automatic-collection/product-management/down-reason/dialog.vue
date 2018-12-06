<template>
  <dialog-side width="380px" :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="newInfo" :rules="rules" ref="newInfo" :label-width="formLabelWidth">
      <el-form-item label="异常原因" prop="name">
        <el-input v-model="newInfo.name" placeholder="请输入异常原因" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="异常原因类别" prop="downGradeReasonTypeId">
        <el-select v-model="newInfo.downGradeReasonTypeId" placeholder="请选择异常原因类别" :disabled="disabled">
          <template v-for="item in downGradeList">
            <el-option :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="产品工艺" prop="productProcessList">
        <!--<el-select v-model="newInfo.productProcessId" placeholder="请选择产品工艺" :disabled="disabled">-->
          <!--<template v-for="item in productProcessList">-->
            <!--<el-option :label="item.name" :value="item.id"></el-option>-->
          <!--</template>-->
        <!--</el-select>-->
        <el-checkbox-group v-model="newInfo.productProcessList">
          <template v-for="item in productProcessList">
            <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="所属工种" prop="workTypeLsit">
        <!--<el-select v-model="newInfo.workTypeId" placeholder="请选择所属工种" :disabled="disabled">-->
          <!--<template v-for="item in workTypeList">-->
            <!--<el-option :label="item.name" :value="item.id"></el-option>-->
          <!--</template>-->
        <!--</el-select>-->
        <el-checkbox-group v-model="newInfo.workTypeLsit">
          <template v-for="item in workTypeList">
            <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="车间">
          <el-checkbox-group v-model="newInfo.workshopList">
            <template v-for="item in workShopList">
              <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
            </template>
          </el-checkbox-group>
      </el-form-item>
      <el-form-item label="产品">
        <el-checkbox-group v-model="newInfo.productTypeList">
          <template v-for="item in productTypeList">
            <el-checkbox :label="item.name">{{item.name}}</el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="编号" prop="number">
        <el-input v-model="newInfo.number" placeholder="请输入编号" :disabled="disabled"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer tr">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureBtn('newInfo')">确 定</el-button>
    </div>
  </dialog-side>
</template>

<script>
  import * as api from '../../../../api/index'
  import storage from 'storage'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    props: ['workTypeList', 'type', 'downGradeList', 'productProcessList', 'workShopList', 'productTypeList'],
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        title: '',
        dialogFormVisible: false,
        userInfo: {},
        disabled: true,
        newInfo: {
          id: '',
          name: '',
          downGradeReasonTypeId: '',
          downGradeReasonTypeName: '',
          productProcessList: [], // 产品工艺
          workTypeLsit: [], // 所属工种,
          workshopList: [], // 所属车间
          productTypeList: [], // 产品
          number: ''
        },
        rules: {
          name: [
            {
              required: true,
              trigger: 'blur, change',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('异常原因不能为空'))
                } else {
                  if (value.length > 32) {
                    callback(new Error('异常原因过长'))
                  }
                  if (this.type === 'add' || this.type === 'edit') {
                    this.checkDownGradeReasonName().then(value => {
                      if (value) {
                        callback()
                      } else {
                        callback(new Error('异常原因重复'))
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
          downGradeReasonTypeId: [
            { required: true, message: '异常类别不能为空', trigger: 'blur change' }
          ],
          productProcessList: [
            { type: 'array', required: true, message: '请至少选择一个产品工艺', trigger: 'blur change' }
          ],
          workTypeLsit: [
            { type: 'array', required: true, message: '请至少选择一个所属工种', trigger: 'blur change' }
          ],
          number: [
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('编号不能为空'))
                } else {
                  if (value.length > 16) {
                    callback(new Error('编号过长'))
                  }
                  if (this.type === 'add' || this.type === 'edit') {
                    this.checkDownGradeReasonNumber().then(value => {
                      if (value) {
                        callback()
                      } else {
                        callback(new Error('编号重复'))
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
          ]
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      toggle (params) {
        this.$refs.newInfo.resetFields()
        this.newInfo.id = params.id
        this.newInfo.name = params.name
        this.newInfo.downGradeReasonTypeId = params.downGradeReasonTypeId
        this.newInfo.downGradeReasonTypeName = params.downGradeReasonTypeName
        this.newInfo.productProcessList = params.productProcessList // 产品工艺
        this.newInfo.workTypeLsit = params.workTypeLsit // 所属工种
        this.newInfo.workshopList = params.workshopList
        this.newInfo.productTypeList = params.productList // 产品
        this.newInfo.number = params.number

        this.title = params.title
        this.disabled = params.disabled
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
      checkDownGradeReasonName () {
        return new Promise((resolve, reject) => {
          let params = {
            downGradeReasonId: this.newInfo.id,
            downGradeReasonName: this.newInfo.name
          }
          api.automatic.productInfo.checkDownGradeReasonName(params).then(response => {
            if (response.data.messageType === 1) {
              resolve(response.data.data)
            }
            resolve(response.data.data)
          }).catch(e => {
            reject(e)
          })
        })
      },
      checkDownGradeReasonNumber () {
        return new Promise((resolve, reject) => {
          let params = {
            downGradeReasonId: this.newInfo.id,
            downGradeReasonNumber: this.newInfo.number
          }
          api.automatic.productInfo.checkDownGradeReasonNumber(params).then(response => {
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
          downGradeReasonName: this.newInfo.name,
          downGradeReasonTypeId: this.newInfo.downGradeReasonTypeId,
          downGradeReasonDescripe: '',
          productProcessId: this.newInfo.productProcessList,
          workTypeId: this.newInfo.workTypeLsit,
          whorkshopId: this.newInfo.workshopList,
          downGradeReasonNumber: this.newInfo.number,
          productName: this.newInfo.productTypeList,
          employeeId: this.userInfo.userId
        }
        api.automatic.productInfo.addDownReason(params).then(response => {
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
        })
      },
      update () {
        let params = {
          downGradeReasonId: this.newInfo.id,
          downGradeReasonName: this.newInfo.name,
          downGradeReasonTypeId: this.newInfo.downGradeReasonTypeId,
          downGradeReasonDescripe: '',
          productProcessId: this.newInfo.productProcessList,
          workTypeId: this.newInfo.workTypeLsit,
          whorkshopId: this.newInfo.workshopList,
          downGradeReasonNumber: this.newInfo.number,
          productName: this.newInfo.productTypeList,
          employeeId: this.userInfo.userId
        }
        api.automatic.productInfo.updateDownReason(params).then(response => {
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
