<template>
  <dialog-side :title="title" width="420px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
      <el-form-item label="组织机构" prop="organizationId">
        <el-select v-model="form.organizationId" placeholder="请选择" clearable>
          <el-option v-for="item in organizationIdList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属子系统" prop="subsystemId">
        <el-select v-model="form.subsystemId" placeholder="请选择">
          <el-option v-for="item in form.subsystemIdList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属车间" prop="workshopId">
        <el-select v-model="form.workshopId" placeholder="请选择">
          <el-option v-for="item in workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="employeeNumber">
        <el-input v-model="form.employeeNumber" placeholder="请输入工号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="employeePassword">
        <el-input v-model="form.employeePassword" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工种" prop="workTypeId">
            <el-select v-model="form.workTypeId" placeholder="请选择">
              <el-option v-for="item in list.workType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职业" prop="positionId" label-width="80px">
            <el-select v-model="form.positionId" placeholder="请选择">
              <el-option v-for="item in list.position" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="姓名" prop="employeeName">
        <el-input v-model="form.employeeName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="employeeGender">
        <el-radio-group v-model=" form.employeeGender">
          <el-radio class="radio" label="M">男</el-radio>
          <el-radio class="radio" label="F">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号码" prop="employeePhone">
        <el-input v-model="form.employeePhone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="form.wechat" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item label="出生年月">
        <el-date-picker v-model="form.employeeBirth" type="month" format="yyyy-MM" placeholder="选择月" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="描述" prop="employeeDescribe">
        <el-input v-model="form.employeeDescribe" placeholder="请输入描述" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button @click="close('form')">取 消</el-button>
      <el-button :loading="loading.submit" type="primary" @click="confirm('form')">确 定</el-button>
    </div>
  </dialog-side>
</template>

<script>
  import * as api from 'src/api/index'
  import dateFns from 'date-fns'
  import storage from 'storage'
  class OprationType {
    static ADD = '新增'
    static MODIFY = '修改'
  }
  const setInitFormData = (form, data) => {
    console.log(data)
    if (data) {
      form.subsystemId = data.subsystemId
      form.organizationId = data.organizationId
      form.workshopId = data.workshopId
      form.employeeNumber = data.employeeNumber
      form.workTypeId = data.workTypeId
      form.employeeName = data.employeeName
      form.employeeGender = data.employeeGender
      form.employeePassword = data.employeePassword
      form.employeeDescribe = data.employeeDescribe
      form.employeeBirth = data.employeeBirth ? new Date(data.employeeBirth) : ''
      form.positionId = data.positionId
      form.employeePhone = data.employeePhone
      form.employeeId = data.employeeId
      form.wechat = data.wechat
    } else {
      form.organizationId = ''
      form.workshopId = ''
      form.employeeNumber = ''
      form.workTypeId = ''
      form.employeeName = ''
      form.employeeGender = 'M'
      form.employeePassword = ''
      form.employeeDescribe = ''
      form.employeeBirth = ''
      form.positionId = ''
      form.employeePhone = ''
      form.employeeId = ''
      form.wechat = ''
    }
  }
  export default {
    props: {
      workshop: {}
    },
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
      api.superManagerUser.getSubSystemList({}).then(response => {
        const data = response.data
        this.form.subsystemIdList = data.data
        console.log(data)
      }).catch().finally()
      api.systemOrganization.getOrganizationList({}).then(response => {
        this.organizationIdList[0] = response.data.data.organizationVo
        console.log(this.organizationIdList)
      }).catch().finally()
      this.getSelectList()
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        userInfo: {},
        loading: {
          submit: false
        },
        numberCanCheck: true,
        dialog: {
          visible: false
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 8.64e7
          }
        },
        title: '新增',
        rules: {
          workshopId: [
            {required: true, message: '所属车间不能为空', trigger: 'change'}
          ],
          subsystemId: [{required: true, message: '所属子系统不能为空', trigger: 'change'}],
          employeeNumber: [
            {
              required: true,
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (!this.numberCanCheck) {
                  callback()
                }
                if (value) {
                  this.checkPersonId().then(res => {
                    if (res) {
                      callback(new Error('工号重复'))
                    } else {
                      callback()
                    }
                  }).catch(e => {
                    console.error(e)
                  })
                } else {
                  callback(new Error('工号不能为空'))
                }
              }
            },
            {max: 16, message: '字符长度不能超过16个', trigger: 'change'}
          ],
          employeeName: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
            {max: 16, message: '字符长度不能超过16个', trigger: 'change'}
          ],
          employeePhone: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {max: 11, message: '手机号码过长', trigger: 'blur change'}
          ],
          employeeGender: [
            {required: true, message: '性别不能为空', trigger: 'blur'}
          ],
          workTypeId: [
            {required: true, message: '工种不能为空', trigger: 'blur'}
          ],
          positionId: [
            {required: true, message: '职业不能为空', trigger: 'blur'}
          ],
          employeePassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 512, message: '字符长度不能超过512个', trigger: 'change'}
          ]
        },
        list: {
          workShop: [],
          workType: [],
          position: []
        },
        organizationIdList: [],
        formLabelWidth: '100px',
        form: {
          organizationId: [],
          subsystemId: '',
          subsystemIdList: [],
          employeeId: '',
          workshopId: '',
          employeeNumber: '',
          wechat: '',
          workTypeId: '',
          employeeName: '',
          employeeGender: 'M',
          employeePassword: '',
          employeeDescribe: '',
          employeeBirth: '',
          positionId: '',
          employeePhone: ''
        },
        value: ''
      }
    },
    methods: {
      checkPersonId () {
        return new Promise((resolve, reject) => {
          let params = {id: this.form.employeeId, number: this.form.employeeNumber}
          api.automatic.person.checkEmployeeNumber(params).then(response => {
            if (response.data.data) {
              resolve(response.data.data)
            }
          }).catch(e => {
            reject(e)
          })
        })
      },
      getSelectList () {
        /* 获取所有工种 */
        api.automatic.dictionary.getAllWorkTypeList().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.workType = data.data
            return true
          }
        })
        /* 获取所有岗位 */
        api.automatic.dictionary.getAllPositionList().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.position = data.data
            return true
          }
        })
      },
      confirm (form) {
        this.numberCanCheck = false
        this.$refs[form].validate(valid => {
          if (valid) {
            let params = {id: this.form.employeeId, number: this.form.employeeNumber}
            api.automatic.person.checkEmployeeNumber(params).then(response => {
              let data = response.data
              if (data.data) {
                this.$message.error('姓名重复')
              } else {
                if (this.title === OprationType.MODIFY) {
                  this.modify()
                } else {
                  this.add()
                }
              }
            })
          }
        })
      },
      add () {
        let gender = this.form.employeeGender
        if (gender === '男') {
          gender = 'M'
        } else if (gender === '女') {
          gender = 'F'
        }
        let params = {
          subsystemId: this.form.subsystemId,
          // organizationIdList: this.form.organizationId === '测试' ? [1720631522668576807] : '[' + this.form.organizationId + ']',
          organizationId: this.form.organizationId,
          number: this.form.employeeNumber,
          name: this.form.employeeName,
          gender: gender,
          phone: this.form.employeePhone,
          birth: this.form.employeeBirth ? dateFns.format(this.form.employeeBirth, 'YYYY-MM') : '',
          password: this.form.employeePassword,
          describe: this.form.employeeDescribe,
          workTypeId: this.form.workTypeId,
          positionId: this.form.positionId,
          workshopId: this.form.workshopId,
          employeeId: this.userInfo.manId,
          wechat: this.form.wechat
        }
        this.loading.submit = true
        api.automatic.person.addEmployee(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.dialog.visible = false
            this.$emit('callback')
          }
        }).finally(() => {
          this.numberCanCheck = true
          this.loading.submit = false
        })
      },
      modify () {
        let gender = this.form.employeeGender
        if (gender === '男') {
          gender = 'M'
        } else if (gender === '女') {
          gender = 'F'
        }
        let params = {
          subsystemId: this.form.subsystemId,
          organizationId: this.form.organizationId,
          id: this.form.employeeId,
          number: this.form.employeeNumber,
          name: this.form.employeeName,
          gender: gender,
          phone: this.form.employeePhone,
          birth: this.form.employeeBirth ? dateFns.format(this.form.employeeBirth, 'YYYY-MM') : '',
          password: this.form.employeePassword,
          describe: this.form.employeeDescribe,
          workTypeId: this.form.workTypeId,
          positionId: this.form.positionId,
          workshopId: this.form.workshopId,
          employeeId: this.userInfo.manId,
          wechat: this.form.wechat
        }
        this.loading.submit = true
        api.automatic.person.updateEmployee(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.dialog.visible = false
            this.$emit('callback')
          }
        }).finally(() => {
          this.numberCanCheck = true
          this.loading.submit = false
        })
      },
      show (row) {
        this.$refs.form.resetFields()
        this.dialog.visible = true
        if (row) {
          this.title = OprationType.MODIFY
        } else {
          this.title = OprationType.ADD
        }
        setInitFormData(this.form, row)
      },
      close (form) {
        this.dialog.visible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .checkbox, .radio {
    margin-top: 0px;
    margin-bottom: 0px;
  }
</style>
