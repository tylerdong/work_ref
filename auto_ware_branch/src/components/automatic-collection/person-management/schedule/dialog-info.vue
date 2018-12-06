<template>
  <div>
    <dialog-side width="400px" :title="title" :visible.sync="visible">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="所属车间" prop="workshopId">
          <el-select v-model="form.workshopId" placeholder="请选择" @change="change">
            <el-option v-for="item in list.workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组" prop="groupName">
          <el-input v-model="form.groupName" placeholder="请输入班组名称"></el-input>
        </el-form-item>
        <el-form-item label="人员" prop="groupEmployeeMapBoList">
          <el-col :span="16">
            <el-tag
              v-for="tag in form.groupEmployeeMapBoList"
              :key="tag.id"
              class="tags">
              {{tag.name}}
            </el-tag>
          </el-col>
          <el-col :offset="2" :span="6">
            <el-button class="btn" @click.prevent="btnPerson()">选择</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="班长" prop="groupEmployeeId">
          <el-select v-model="form.groupEmployeeId" placeholder="请选择班长">
            <el-option v-for="person in form.groupEmployeeMapBoList" :label="person.name" :value="person.id"
                       :key="person.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer tr">
        <el-button @click="close">取 消</el-button>
        <el-button :loading="loading.submit" type="primary" @click="confirm('form')">确 定</el-button>
      </div>
    </dialog-side>
    <D_dialog_person ref="refDialogPerson" @callback="callback"></D_dialog_person>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'
  class OprationType {
    static ADD = '新增'
    static MODIFY = '修改'
  }
  const setInitFormData = (form, data, vm) => {
    form.groupEmployeeMapBoList.splice(0, form.groupEmployeeMapBoList.length)
    if (data) {
      form.workshopId = data.workshopId
      vm.$nextTick(function () {
        this.groupNameCanCheck = false
        form.groupId = data.groupId
        form.groupName = data.groupName
        form.person = data.person
        form.groupEmployeeName = data.groupEmployeeName
        form.groupEmployeeId = data.groupEmployeeId
        for (let item of data.groupEmployeeMapBoList) {
          form.groupEmployeeMapBoList.push({
            id: item.employeeId,
            name: item.employeeName
          })
        }
        vm.$nextTick(function () {
          this.groupNameCanCheck = true
        })
      })
    } else {
      form.groupId = ''
      form.workshopId = ''
      form.groupName = ''
      form.person = ''
      form.groupEmployeeName = ''
      form.groupEmployeeId = ''
    }
  }
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue'),
      'D_dialog_person': require('./dialog-person.vue')
    },
    data () {
      return {
        loading: {
          submit: false
        },
        userInfo: {},
        title: OprationType.ADD,
        visible: false,
        rules: {
          groupEmployeeMapBoList: [
            {type: 'array', required: true, message: '请至少选择一个组员', trigger: 'blur change'}
          ],
          workshopId: [
            {required: true, message: '所属车间不能为空', trigger: 'blur change'}
          ],
          groupName: [
            {
              required: true,
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (!this.groupNameCanCheck) {
                  callback()
                }
                if (value) {
                  this.checkGroupName().then(res => {
                    if (res) {
                      callback()
                    } else {
                      callback(new Error('班组名称重复'))
                    }
                  }).catch(e => {
                    console.error(e)
                  })
                } else {
                  callback()
                }
              }
            }
          ],
          groupEmployeeId: [
            {required: true, message: '班长不能为空', trigger: 'blur change'}
          ]
        },
        list: {
          workShop: []
        },
        selectedPerson: [],
        groupNameCanCheck: true,
        form: {
          groupId: '',
          workshopId: '',
          groupName: '',
          person: '',
          groupEmployeeName: '',
          groupEmployeeId: '',
          groupEmployeeMapBoList: []
        }
      }
    },
    mounted () {
      this.getSelectList()
      this.userInfo = storage.getUser()
    },
    methods: {
      checkGroupName () {
        return new Promise((resolve, reject) => {
          let params = {
            id: this.form.groupId,
            name: this.form.groupName,
            workshopId: this.form.workshopId
          }
          api.automatic.person.checkGroupName(params).then(response => {
            if (response.data.messageType === 1) {
              resolve(response.data.data)
            }
            resolve(response.data.data)
          }).catch(e => {
            reject(e)
          })
        })
      },
      getSelectList () {
        /* 获取所有车间 */
        api.automatic.dictionary.getAllWorkshopList().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.workshop = data.data
            return true
          }
        })
      },
      btnPerson () {
        if (this.form.workshopId) {
          let isModify = true
          if (this.title === OprationType.ADD) {
            isModify = false
          }
          this.$refs.refDialogPerson.show(this.form, isModify)
        } else {
          this.$refs.form.validateField('workshopId')
        }
      },
      confirm (form) {
        this.groupNameCanCheck = false
        this.$refs[form].validate(valid => {
          if (valid) {
            if (this.title === OprationType.MODIFY) {
              this.modifyGroup()
            } else {
              this.addGroup()
            }
          }
        })
      },
      modifyGroup () {
        /* 修改班组 */
        let num = this.form.groupEmployeeMapBoList.length
        let params = {
          id: this.form.groupId,
          workshopId: this.form.workshopId,
          name: this.form.groupName,
          num: num,
          employeeId: this.form.groupEmployeeId,
          employeeLogId: this.userInfo.userId,
          groupEmployeeMapList: this.form.groupEmployeeMapBoList
        }
        this.loading.submit = true
        api.automatic.person.updateGroup(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.visible = false
            this.$emit('callback')
            return true
          }
        }).finally(() => {
          this.loading.submit = false
          this.groupNameCanCheck = true
        })
      },
      addGroup () {
        /* 添加班组 */
        let num = this.form.groupEmployeeMapBoList.length
        let params = {
          workshopId: this.form.workshopId,
          name: this.form.groupName,
          num: num,
          employeeId: this.form.groupEmployeeId,
          employeeLogId: this.userInfo.userId,
          groupEmployeeMapList: this.form.groupEmployeeMapBoList
        }
        this.loading.submit = true
        api.automatic.person.addGroup(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.visible = false
            this.$emit('callback')
          }
        }).finally(() => {
          this.loading.submit = false
          this.groupNameCanCheck = true
        })
      },
      show (row) {
        this.$refs.form.resetFields()
        this.visible = true
        if (row) {
          this.title = OprationType.MODIFY
        } else {
          this.title = OprationType.ADD
        }
        setInitFormData(this.form, row, this)
      },
      change (value) {
        //  修改车间之后重置表格
        this.form.groupName = ''
        this.form.groupEmployeeId = ''
        this.form.groupEmployeeMapBoList = []
      },
      close () {
        this.visible = false
      },
      deletTag (tag) {
        this.form.groupEmployeeMapBoList.splice(this.form.groupEmployeeMapBoList.indexOf(tag), 1)
      },
      callback (items) {
        this.form.groupEmployeeId = ''
        this.form.groupEmployeeMapBoList.splice(0, this.form.groupEmployeeMapBoList.length)
        for (let item of items) {
          this.form.groupEmployeeMapBoList.push(item)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }

  .el-date-editor {
    width: 100%;
  }

  .tags {
    margin-left: 10px
  }
</style>
