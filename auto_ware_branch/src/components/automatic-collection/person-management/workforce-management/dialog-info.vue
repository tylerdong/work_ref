<template>
  <div>
    <dialog-side width="400px" :title="title" :visible.sync="visible">

      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="所属车间" prop="workshopId">
          <el-select v-model="form.workshopId" placeholder="请选择" @change="change">
            <el-option v-for="item in list.workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="classesStartDate">
          <el-date-picker v-model="form.classesStartDate" type="date" placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="classesEndDate">
          <el-date-picker v-model="form.classesEndDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="班组" prop="groupId">
          <el-select v-model="form.groupId" placeholder="请选择" @visible-change="showClasses">
            <el-option v-for="item in list.group" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="classesId" label="班次">
          <el-select v-model="form.classesId" placeholder="请选择">
            <el-option v-for="item in list.classes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="classesType" label="班次类型">
          <el-select v-model="form.classesType" placeholder="请选择">
            <el-option v-for="item in list.classesType" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员" prop="schedulingEmployeeMapInfoBoList">
          <el-col :span="16">
            <el-tag
              v-for="tag in form.schedulingEmployeeMapInfoBoList"
              :key="tag.id"
              class="tags">
              {{tag.name}}
            </el-tag>
          </el-col>
          <el-col :offset="2" :span="6">
            <el-button class="btn" @click.prevent="btnPerson()">选择</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="值班长" prop="employeeId">
          <el-select v-model="form.employeeId" placeholder="请选择">
            <el-option v-for="item in form.schedulingEmployeeMapInfoBoList" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer tr">
        <el-button @click="close('form')">取 消</el-button>
        <el-button :loading="loading.submit" type="primary" @click="confirm('form')">确 定</el-button>
      </div>
    </dialog-side>
    <D_dialog_person ref="refDialogPerson" @callback="callback"></D_dialog_person>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'
  class OprationType {
    static ADD = '新增排班'
    static MODIFY = '排班修改'
  }
  const setInitFormData = (form, vm, data) => {
    form.schedulingEmployeeMapInfoBoList.splice(0, form.schedulingEmployeeMapInfoBoList.length)
    vm.list.group.splice(0, vm.list.group.length)
    if (data) {
      form.workshopId = data.workshopId
      vm.$nextTick(function () {
        form.classesStartDate = new Date(data.schedulingStartDate)
        form.classesEndDate = new Date(data.schedulingEndDate)
        form.groupName = data.groupName
        form.groupId = data.groupId
        form.schedulingId = data.schedulingId
        for (let item of data.schedulingEmployeeMapInfoBoList) {
          form.schedulingEmployeeMapInfoBoList.push({
            id: item.employeeId,
            name: item.employeeName
          })
        }
        form.employeeId = data.employeeId
        form.classesId = data.classesId
        form.classesType = data.classesType
      })
    } else {
      form.groupName = ''
      form.classesStartDate = ''
      form.classesEndDate = ''
      form.workshopId = ''
      form.groupId = ''
      form.schedulingId = ''
      form.employeeId = ''
      form.classesId = ''
      form.classesType = ''
    }
  }
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue'),
      'D_dialog_person': require('./dialog-person.vue')
    },
    props: ['workshop'],
    data () {
      return {
        loading: {
          submit: false,
          classes: false
        },
        title: OprationType.ADD,
        visible: false,
        rules: {
          schedulingEmployeeMapInfoBoList: [
            {type: 'array', required: true, message: '请至少选择一个组员', trigger: 'blur change'}
          ],
          workshopId: [
            {required: true, message: '所属车间不能为空', trigger: 'blur change'}
          ],
          classesStartDate: [
            {type: 'date', required: true, message: '开始时间不能为空', trigger: 'blur'},
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value && this.form.classesEndDate) {
                  let time = Date.parse(new Date(value)) - Date.parse(new Date(this.form.classesEndDate))
                  if (time <= 0) {
                    callback()
                  } else {
                    callback(new Error('开始时间不能大于结束时间'))
                  }
                }
              }
            }
          ],
          classesEndDate: [
            {type: 'date', required: true, message: '结束时间不能为空', trigger: 'blur'},
            {
              trigger: 'change',
              validator: (rule, value, callback) => {
                if (value) {
                  let time = Date.parse(new Date(value)) - Date.parse(new Date(this.form.classesStartDate))
                  if (time < 0) {
                    callback(new Error('结束时间不能小于开始时间'))
                  } else {
                    callback()
                  }
                } else {
                  callback()
                }
              }
            }
          ],
          groupId: [
            {required: true, message: '班组不能为空', trigger: 'blur change'}
          ],
          classesId: [
            {required: true, message: '班次不能为空', trigger: 'blur change'}
          ],
          classesType: [
            {required: true, message: '班次类型不能为空', trigger: 'blur change'}
          ],
          employeeId: [
            {required: true, message: '值班长不能为空', trigger: 'blur change'}
          ],
          employschedulingEmployeeMapInfoBoListeeId: [
            {type: 'array', required: true, message: '人员不能为空', trigger: 'blur change'}
          ]
        },
        list: {
          workshop: this.workshop,
          group: [],
          classes: [],
          classesType: [
            {
              id: '1',
              name: '白'
            },
            {
              id: '2',
              name: '夜'
            },
            {
              id: '3',
              name: '休'
            }
          ]
        },
        selectedPerson: [],
        form: {
          classesStartDate: '',
          classesEndDate: '',
          workshopId: '',
          groupId: '',
          schedulingId: '',
          schedulingEmployeeMapInfoBoList: [],
          employeeId: '',
          classesId: '',
          classesType: ''
        }
      }
    },
    mounted () {
    },
    methods: {
      btnPerson () {
        if (!this.form.workshopId) {
          this.$refs.form.validateField('workshopId')
          return false
        }
        if (!this.form.groupId) {
          this.$refs.form.validateField('groupId')
          return false
        }
        let isModify = true
        if (this.title === OprationType.ADD) {
          isModify = false
        }
        this.$refs.refDialogPerson.show(this.form, isModify)
      },
      confirm (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            if (this.title === OprationType.MODIFY) {
              this.modifyGroup()
            } else {
              this.addGroup()
            }
          } else {
            return false
          }
        })
      },
      modifyGroup () {
        /* 修改班次 */
        let params = {
          id: this.form.schedulingId,
          groupId: this.form.groupId,
          classesId: this.form.classesId,
          classesType: this.form.classesType,
          lineId: '',
          startDate: dateFns.format(this.form.classesStartDate, 'YYYY-MM-DDTHH:mm:ss.SSS'),
          endDate: dateFns.format(this.form.classesEndDate, 'YYYY-MM-DDTHH:mm:ss.SSS'),
          employeeId: this.form.employeeId,
          schedulingEmployeeMapInfoBoList: this.form.schedulingEmployeeMapInfoBoList
        }
        this.loading.submit = true
        api.automatic.person.updateScheduling(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.visible = false
            this.$emit('callback')
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        }).finally(() => {
          this.loading.submit = false
        })
      },
      getClasses () {
        this.loading.classes = true
        api.automatic.dictionary.getAllClassesList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.list.classes = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.classes = false
        })
      },
      addGroup () {
        /* 添加班次 */
        let params = {
          id: this.form.schedulingId,
          groupId: this.form.groupId,
          classesId: this.form.classesId,
          classesType: this.form.classesType,
          lineId: '',
          startDate: dateFns.format(this.form.classesStartDate, 'YYYY-MM-DDTHH:mm:ss.SSS'),
          endDate: dateFns.format(this.form.classesEndDate, 'YYYY-MM-DDTHH:mm:ss.SSS'),
          employeeId: this.form.employeeId,
          schedulingEmployeeMapInfoBoList: this.form.schedulingEmployeeMapInfoBoList
        }
        this.loading.submit = true
        api.automatic.person.addScheduling(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.visible = false
            this.$emit('callback')
            return true
          }
        }).finally(() => {
          this.loading.submit = false
        })
      },
      showClasses (value) {
        if (value === false) {
          return false
        }
        if (!this.form.workshopId) {
          this.$refs.form.validateField('workshopId')
          return false
        }
        /* 根据车间获取班组 */
        let params = {
          workshopId: this.form.workshopId
        }
        this.list.group.splice(0, this.list.group.length)
        api.automatic.person.getGroupListByWorkshopId(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            const items = data.data
            for (let item of items) {
              this.list.group.push(item)
            }
            return true
          }
        })
      },
      show (row) {
        this.$refs.form.resetFields()
        this.getClasses()
        setInitFormData(this.form, this, row)
        this.visible = true
        if (row) {
          this.title = OprationType.MODIFY
          this.list.group.push({
            id: row.groupId,
            name: row.groupName
          })
        } else {
          this.title = OprationType.ADD
        }
      },
      change (value) {
        //  修改车间之后重置表格
        this.form.classesStartDate = ''
        this.form.classesEndDate = ''
        this.form.groupId = ''
        this.form.classesId = ''
        this.form.schedulingEmployeeMapInfoBoList = []
        this.form.employeeId = ''
      },
      close (form) {
        this.visible = false
      },
      callback (items) {
        this.form.employeeId = ''
        this.form.schedulingEmployeeMapInfoBoList.splice(0, this.form.schedulingEmployeeMapInfoBoList.length)
        for (let item of items) {
          this.form.schedulingEmployeeMapInfoBoList.push(item)
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
    margin-right: 10px
  }
</style>
