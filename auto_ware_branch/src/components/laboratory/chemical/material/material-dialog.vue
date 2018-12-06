<template>
  <el-dialog width="60%" :title="title" :visible.sync="dialogVisible">
    <el-form :rules="rules" ref="form" :model="form" label-width="108px">
      <el-form-item label="分类" prop="dataGroupDicId">
        <el-select class="material-form-item" v-model="form.dataGroupDicId" filterable clearable>
          <el-option v-for="item in groupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input class="material-form-item" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="纯度" prop="fineness">
        <el-input class="material-form-item" v-model="form.fineness"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="spec">
        <el-input class="material-form-item" v-model="form.spec"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input class="material-form-item" v-model="form.unit"></el-input>
      </el-form-item>
      <el-form-item label="登记人" prop="registerName">
        <el-input class="material-form-item" v-model="form.registerName" disabled></el-input>
      </el-form-item>
      <el-form-item label="登记时间" prop="registerDate">
        <el-date-picker class="material-form-item" type="datetime" v-model="form.registerDate"
                        disabled></el-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="confirm" type="primary" :loading="loading.confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    props: ['groupOptions'],
    data () {
      return {
        dialogVisible: false,
        title: '',
        type: '',
        id: '',
        formData: null,
        form: {
          name: '',
          fineness: '',
          spec: '',
          unit: '',
          register: '',
          registerName: '',
          dataGroupDicId: '',
          registerDate: ''
        },
        loading: {
          instrument: false,
          confirm: false
        },
        options: {
          instrument: [],
          user: []
        },
        userInfo: '',
        rules: {
          dataGroupDicId: {required: true, message: '请选择分类', trigger: 'blur'},
          name: {required: true, message: '仪器名称不能为空', trigger: 'blur'},
          spec: {required: true, message: '仪器规格不能为空', trigger: 'blur'},
          unit: {required: true, message: '单位不能为空', trigger: 'blur'}
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      show (type, data) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.type = type
          this.formData = data
          if (type === 'edit') {
            this.id = data.id
            this.form.name = data.name
            this.form.fineness = data.fineness
            this.form.unit = data.unit
            this.form.spec = data.spec
            this.form.registerName = data.register
            this.form.registerDate = data.registerDate
            this.form.dataGroupDicId = data.dataGroupDicId
          } else {
            this.form.registerName = this.userInfo.name
            this.form.register = this.userInfo.userId
            this.form.registerDate = new Date()
          }
        })
      },
      confirm () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let params = this.form
            if (this.type === 'add') {
              // 创建人
              params.creator = this.userInfo.userId
              // 创建时间
              params.gmtCreate = new Date()
              // 修改人
              params.modifier = this.userInfo.userId
              // 修改时间
              params.gmtModified = new Date()
              // 登记人
              params.register = this.userInfo.userId
              // 等级时间
              params.registerDate = new Date()
              this.add(params)
            } else {
              params.id = this.formData.id
              // 创建人
              params.creator = this.formData.creator
              // 创建时间
              params.gmtCreate = this.formData.gmtCreate
              // 修改人
              params.modifier = this.userInfo.userId
              // 修改时间
              params.gmtModified = new Date()
              // 登记人
              params.register = this.formData.register
              // 等级时间
              params.registerDate = this.formData.registerDate
              this.update(params)
            }
          }
        })
      },
      getTime (date) {
        if (!date) {
          return ''
        } else if (date.getTime) {
          return date.getTime()
        } else {
          return new Date(date).getTime()
        }
      },
      add (params) {
        this.loading.confirm = true
        api.chemicalLaboratory.labMaterialController.createLabMaterialDo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.dialogVisible = false
            this.$emit('success')
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      update (params) {
        this.loading.confirm = true
        api.chemicalLaboratory.labMaterialController.updateLabMaterialDo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.dialogVisible = false
            this.$emit('success')
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      copy (form) {
        let obj = {}
        for (let prop in form) {
          obj[prop] = form[prop]
        }
        return obj
      }
    }
  }
</script>

<style scoped>
  .material-form-item {
    width: 80%;
  }
</style>
<style>
  .material-form-item.el-select .el-input {
    width: 100%;
  }
</style>
