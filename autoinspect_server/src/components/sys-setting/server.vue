<template>
  <div class="div-form-container form-style">
    <el-form ref="form" :model="form" :rules="rules" label-width="85px">
      <el-form-item label="公司" prop="company" class="input-item25">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="工厂" prop="factory" class="input-item25">
        <el-input v-model="form.factory"></el-input>
      </el-form-item>
      <el-form-item label="车间" prop="workshop" class="input-item25">
        <el-input v-model="form.workshop"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="code" class="input-item25">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="班次" prop="classesnum" class="input-item25">
        <el-select v-model="form.classesnum" placeholder="请选择" class="input-item195" clearable>
          <el-option v-for="item in option.classType" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用" prop="appname" class="input-item25">
        <el-select v-model="form.appname" placeholder="请选择" class="input-item195" clearable>
          <el-option v-for="(item, index) in option.sysOption" :key="index" :label="item.title" :value="item.appName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="input-item25">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="float: left;">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '../../api/index'
import {sysOption, productType, classType} from '../options'
export default {
  name: 'index',
  data () {
    return {
      form: {
        id: '',
        company: '',
        factory: '',
        workshop: '',
        code: '',
        classesnum: '',
        appentrance: '',
        appname: '',
        password: ''
      },
      option: {
        productType: productType,
        classType: classType,
        sysOption: sysOption
      },
      rules: {
        company: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 1, max: 50, message: '公司名称长度在1到50个字符', trigger: 'blur' }
        ],
        factory: [
          { required: true, message: '请输入工厂名称', trigger: 'blur' },
          { min: 1, max: 50, message: '工厂名称长度在1到50个字符', trigger: 'blur' }
        ],
        workshop: [
          { required: true, message: '请输入车间名称', trigger: 'blur' },
          { min: 1, max: 50, message: '车间名称长度在1到50个字符', trigger: 'blur' }
        ],
        linename: [
          { required: true, message: '请输入线别编码', trigger: 'blur' },
          { min: 1, max: 50, message: '线别编码长度在1到50个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 1, max: 50, message: '编码长度在1到50个字符', trigger: 'blur' }
        ],
        producttype: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        classesnum: [
          { required: true, message: '请选择班次', trigger: 'blur' }
        ],
        appname: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          { min: 1, max: 50, message: '应用名称长度在1到50个字符', trigger: 'blur' }
        ],
        appentrance: [
          { required: true, message: '请输入应用入口', trigger: 'blur' },
          { min: 1, max: 50, message: '入口长度在1到50个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 50, message: '密码长度在1到50个字符', trigger: 'blur' }
        ]
      },
      loading: { search: false }
    }
  },
  mounted () {
    this.initConfig()
  },
  methods: {
    onSubmit () {
      this.loading.comfirm = true
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.appentrance = this.option.sysOption.find(item => { return item.appName === this.form.appname }).appEntrance
          let param = {
            serverConfig: {
              id: this.form.id,
              company: this.form.company,
              factory: this.form.factory,
              workshop: this.form.workshop,
              code: this.form.code,
              classesNum: this.form.classesNum,
              appEntrance: this.form.appEntrance,
              appName: this.form.appName
            },
            key: this.form.password
          }
          api.defect.saveServer(param).then(response => {
            let data = response.data
            if (data.meta.code === 100000) {
              this.initConfig()
              // window.location.reload()
            }
            this.$message({type: 'error', message: data.meta.message})
          }).catch(e => {
            this.$message({type: 'error', message: e.message})
          }).finally(() => {
            this.loading.comfirm = false
          })
        }
      })
    },
    initConfig () {
      api.defect.getServer({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.form.id = data.data.id
          this.form.company = data.data.company
          this.form.factory = data.data.factory
          this.form.workshop = data.data.workshop
          this.form.linename = data.data.linename
          this.form.linecode = data.data.linecode
          this.form.producttype = data.data.producttype
          this.form.classesnum = data.data.classesnum
          this.form.appentrance = data.data.appentrance
          this.form.appname = data.data.appname
          this.form.isclient = data.data.isclient
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
      })
    }
  }
}
</script>

<style scoped>
  .form-style {
    margin: 0 24%;
  }
</style>
