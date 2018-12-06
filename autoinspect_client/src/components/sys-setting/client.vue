<template>
  <div class="div-form-container form-style">
    <el-form ref="form" :model="form" :rules="rules" label-width="135px">
      <el-form-item label="公司" prop="company" class="input-item25">
        <el-input v-model="form.company" :disabled="inputDisabled"></el-input>
      </el-form-item>
      <el-form-item label="工厂" prop="factory" class="input-item25">
        <el-input v-model="form.factory" :disabled="inputDisabled"></el-input>
      </el-form-item>
      <el-form-item label="车间" prop="workshop" class="input-item25">
        <el-input v-model="form.workshop" :disabled="inputDisabled"></el-input>
      </el-form-item>
      <el-form-item label="线别" prop="linename" class="input-item25">
        <el-input v-model="form.linename" :disabled="inputDisabled"></el-input>
      </el-form-item>
      <el-form-item label="线别编码" prop="linecode" class="input-item25">
        <el-input v-model="form.linecode" disabled></el-input>
      </el-form-item>
      <el-form-item label="产品" prop="producttype" class="input-item25">
        <el-select v-model="form.producttype" placeholder="请选择" class="input-item-style" clearable
                   :disabled="inputDisabled">
          <el-option v-for="item in option.productType" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次" prop="classesnum" class="input-item25">
        <el-select v-model="form.classesnum" placeholder="请选择" class="input-item-style" clearable
                   :disabled="inputDisabled">
          <el-option v-for="item in option.classType" :key="item.value" :label="item.name"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="首班开始时间" prop="classstarttime" class="input-item25">
        <el-time-picker v-model="form.classstarttime" type="datetime" format="HH:mm"
                        value-format="HH:mm" placeholder="选择日期时间" style="width: 100%;"
                        :disabled="inputDisabled">
        </el-time-picker>
      </el-form-item>
      <div class="region">
        <el-form-item label="外检日志路径" class="input-item25">
          <el-input v-model="form.logUploadDir" :disabled="inputDisabled"></el-input>
        </el-form-item>
        <el-form-item label="外检日志起始日期" class="input-item25">
          <el-date-picker v-model="form.logUploadStartTime" type="date" placeholder="选择外检日志起始日期"
                          style="width: 100%;" value-format="yyyy-MM-dd" :disabled="inputDisabled"></el-date-picker>
        </el-form-item>
        <el-form-item label="任务开关" class="input-item25">
          <ul class="job-ul">
            <li>
              <el-checkbox v-model="form.isayntable" class="inner-check" true-label="Y" false-label="N"
                           :disabled="inputDisabled">定时任务表
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="form.isayndefectimage" class="inner-check" true-label="Y" false-label="N"
                           :disabled="inputDisabled">定时任务缺陷图
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="form.isabort" style="float: left" true-label="Y" false-label="N"
                           :disabled="inputDisabled">
                截批预警
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="form.isshuffs" style="float: left" true-label="Y" false-label="N"
                           :disabled="inputDisabled">等外品预警
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="form.isclasscollect" style="float: left" true-label="Y" false-label="N"
                           :disabled="inputDisabled">班次汇总
              </el-checkbox>
            </li>
          </ul>
        </el-form-item>
      </div>
      <div class="region">
        <el-form-item label="新增并行线">
          <el-button type="primary" style="float: left; margin-bottom: 5px" icon="el-icon-circle-plus" size="small" @click="btnParallet">并行线</el-button>
          <table class="line-table" v-if="Array.isArray(form.pcParallelLineConfigs) && form.pcParallelLineConfigs.length > 0">
            <tr><th>名称</th><th>编码</th><th>访问地址</th></tr>
            <tr v-for="(item, key) in form.pcParallelLineConfigs" :key="key">
              <td>{{item.parallelLineName}}</td>
              <td>{{item.parallelLineCode}}</td>
              <td>{{item.parallelLineIp}}</td>
            </tr>
          </table>
        </el-form-item>
      </div>
      <el-form-item label="密码" prop="password" class="input-item25">
        <el-input v-model="form.password" type="password" :disabled="inputDisabled"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="float: left;" :disabled="inputDisabled">确定</el-button>
      </el-form-item>
    </el-form>
    <dialog-parallel-line ref="refDialogLine" @saveConfig="saveConfig"></dialog-parallel-line>
  </div>
</template>

<script>
import * as api from '../../api/index'
import store from './../../module/storage'
import {sysOption, productType, classType} from '../options'

export default {
  name: 'index',
  components: {
    'dialog-parallel-line': require('./dialog-parallel-line').default
  },
  data () {
    return {
      form: {
        id: '',
        company: '',
        factory: '',
        workshop: '',
        linename: '',
        linecode: '',
        producttype: '',
        classesnum: '',
        classstarttime: '08:00',
        appentrance: 'inner-search-manual-review',
        appname: 'innerSearch',
        isclient: 'Y',
        logUploadDir: '',
        logUploadStartTime: '',
        isayntable: 'Y',
        isayndefectimage: 'Y',
        isabort: 'Y',
        isshuffs: 'Y',
        isclasscollect: 'Y',
        password: '',
        syntype: -1,
        pcParallelLineConfigs: []
      },
      option: {
        productType: productType,
        classType: classType,
        sysOption: sysOption
      },
      rules: {
        company: [
          {required: true, message: '请输入公司名称', trigger: 'blur'},
          {min: 1, max: 50, message: '公司名称长度1到50个字符', trigger: 'blur'}
        ],
        factory: [
          {required: true, message: '请输入工厂名称', trigger: 'blur'},
          {min: 1, max: 50, message: '工厂名称长度1到50个字符', trigger: 'blur'}
        ],
        workshop: [
          {required: true, message: '请输入车间名称', trigger: 'blur'},
          {min: 1, max: 50, message: '车间名称长度1到50个字符', trigger: 'blur'}
        ],
        linename: [
          {required: true, message: '请输入线别编码', trigger: 'blur'},
          {min: 1, max: 50, message: '线别编码长度1到50个字符', trigger: 'blur'}
        ],
        linecode: [
          {required: true, message: '请输入线别', trigger: 'blur'},
          {min: 1, max: 50, message: '线别长度1到50个字符', trigger: 'blur'}
        ],
        producttype: [
          {required: true, message: '请选择产品类型', trigger: 'blur'}
        ],
        classesnum: [
          {required: true, message: '请选择班次', trigger: 'blur'}
        ],
        classstarttime: [
          {required: true, message: '请选择班次开始时间', trigger: 'blur'}
        ],
        appname: [
          {required: true, message: '请输入应用名称', trigger: 'blur'},
          {min: 1, max: 50, message: '应用名称长度1到50个字符', trigger: 'blur'}
        ],
        appentrance: [
          {required: true, message: '请输入应用入口', trigger: 'blur'},
          {min: 1, max: 50, message: '入口长度1到50个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 50, message: '密码长度1到50个字符', trigger: 'blur'}
        ]
      },
      loading: {search: false},
      syncMessage: ['无法连接服务端，请联系管理员', '应用配置出错，请联系管理员', '查到数据']
    }
  },
  mounted () {
    this.initConfig()
  },
  computed: {
    inputDisabled: function () {
      return this.form.syntype === '1'
    }
  },
  methods: {
    onSubmit () {
      this.loading.comfirm = true
      this.$refs.form.validate(valid => {
        if (valid) {
          api.innerDefect.saveLineConfig(this.form).then(response => {
            let data = response.data
            if (data.meta.code === 100000) {
              const config = data.data
              this.form.id = config.id
              this.$store.dispatch('setAppname', config.appname)
              this.$store.dispatch('setAppentrance', config.appentrance)
              this.$store.dispatch('setClassesnum', config.classesnum)
              this.$store.dispatch('setFactory', config.factory)
              this.$store.dispatch('setWorkshop', config.workshop)
              this.$store.dispatch('setLinename', config.linename)
              this.$store.dispatch('setProductType', config.producttype)
              this.$store.dispatch('setClassPeriod', config.classPeroid)
              this.saveParalletlLines(config)
              this.$router.push({name: config.appentrance})
              this.$message({type: 'success', message: response.data.meta.message})
            } else {
              this.$message({type: 'error', message: response.data.meta.message})
            }
            console.log(response.data.meta)
          }).catch(e => {
            this.$message({type: 'error', message: e.message})
          }).finally(() => {
            this.loading.comfirm = false
            this.form.password = ''
          })
        }
      })
    },
    initConfig () {
      api.innerDefect.getLineConfig({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          const config = data.data
          this.form.syntype = config.syntype
          this.form.id = config.id
          this.form.company = config.company
          this.form.factory = config.factory
          this.form.workshop = config.workshop
          this.form.linename = config.linename
          this.form.linecode = config.linecode
          this.form.producttype = config.producttype
          this.form.classesnum = config.classesnum
          this.form.classstarttime = config.classstarttime ? config.classstarttime : '08:00'
          this.form.isclient = config.isclient ? config.isclient : 'Y'
          this.form.isabort = config.isabort ? config.isabort : 'Y'
          this.form.isshuffs = config.isshuffs ? config.isshuffs : 'Y'
          this.form.isclasscollect = config.isclasscollect ? config.isclasscollect : 'Y'
          this.form.isayntable = config.isayntable ? config.isayntable : 'Y'
          this.form.isayndefectimage = config.isayndefectimage ? config.isayndefectimage : 'Y'
          this.form.logUploadStartTime = config.logUploadStartTime
          this.form.logUploadDir = config.logUploadDir
          this.form.pcParallelLineConfigs = config.pcParallelLineConfigs
          this.saveParalletlLines(config)
          if (['0', '1'].includes(config.syntype)) {
            this.$confirm(this.syncMessage[config.syntype], '提示', {
              confirmButtonText: '确定',
              type: 'error',
              center: true,
              callback: action => {
                if (action === 'confirm' && config.syntype === '1') {
                  this.initConfig()
                }
              }
            })
          }
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
      })
    },
    btnParallet () {
      this.$refs.refDialogLine.show(this.form.pcParallelLineConfigs)
    },
    saveConfig (paralletConfigs) {
      this.form.pcParallelLineConfigs = paralletConfigs
    },
    saveParalletlLines (config) {
      // 保存并行线
      let paralletlLines = [
        {
          linecode: config.linecode,
          lineName: `${config.factory}${config.linename}`,
          ip: window.global.ajaxDefectInnerUrl
        }
      ]
      if (config.pcParallelLineConfigs.length > 0) {
        for (let i = 0; i < config.pcParallelLineConfigs.length; i++) {
          paralletlLines.push(
            {
              linecode: config.pcParallelLineConfigs[i].parallelLineCode,
              lineName: config.pcParallelLineConfigs[i].parallelLineName,
              ip: config.pcParallelLineConfigs[i].parallelLineIp
            }
          )
        }
      }
      store.setParallelLineConfigs(paralletlLines, true)
    }
  }
}
</script>

<style scoped>
  .form-style {
    margin: 0 24%;
  }

  .input-item-style {
    width: 266px;
  }

  .region {
    margin-bottom: 22px;
    border-top: 1px solid rgb(209, 219, 229);
    padding-top: 22px;
  }
  .job-ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .job-ul li {
    width: 50%;
    float: left;
  }
  .inner-check {
    float: left;
  }
</style>
