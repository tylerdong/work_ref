<template>
  <jk-dialog title="新增码单" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="车间" prop="workShop">
          <el-select v-model="form.workShop" placeholder="请选择车间">
            <el-option v-for="item in workShop"
                       :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="线别" prop="line">-->
          <!--<el-select v-model="form.line" placeholder="请选择线别">-->
            <!--<el-option v-for="item in options.line"-->
                       <!--:label="item.line" :value="item.id" :key="item.id"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="批号" prop="batchNo">
          <el-autocomplete v-model="form.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号"
                           @select="handleSelect" style="width: 16.5rem"></el-autocomplete>
        </el-form-item>

        <!--<el-form-item label="库存地点" prop="lgort">-->
          <!--<el-select v-model="form.lgort" placeholder="请选择销售类型">-->
            <!--<el-option v-for="item in options.lgort" :label="item.lgobe" :value="item.lgort" :key="item.lgort"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="预设库位" prop="storageCode">-->
          <!--<el-autocomplete v-model="form.storageCode" :fetch-suggestions="queryStorage" placeholder="请选择库位"-->
                           <!--@select="handleSelectStorage" style="width: 16.5rem"></el-autocomplete>-->
        <!--</el-form-item>-->
        <el-form-item label="规格 | 管色">
          <span v-if="form.batchNo">{{form.spec}}&nbsp;&nbsp;|&nbsp;&nbsp;{{form.paperTube}}</span>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-select v-model="form.productName" placeholder="请选择产品">
            <el-option v-for="item in productName"
                       :label="item.name" :value="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产日期" prop="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            @change="change">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班次" prop="classes">
          <el-select v-model="form.classes" placeholder="请选择班次">
            <el-option v-for="item in classes"
                       :label="item.name" :value="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" prop="grade">
          <el-select v-model="form.grade" placeholder="请选择等级">
            <el-option v-for="item in grade"
                       :label="item.name" :value="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="丝锭数量" prop="silkNum">
          <el-input v-model.number="form.silkNum" auto-complete="off" placeholder="填写丝锭数量"></el-input>
        </el-form-item>
        <el-form-item label="净重" prop="netWeight">
          <el-input v-model.number="form.netWeight" auto-complete="off" placeholder="填写净重"></el-input>
        </el-form-item>
        <el-form-item label="毛重" prop="grossWeight">
          <el-input v-model.number="form.grossWeight" auto-complete="off" placeholder="请填写毛重"></el-input>
        </el-form-item>
        <el-form-item label="码单数量" prop="maNum">
          <el-input-number :min="1" v-model="form.maNum"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading.submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'
  import dateFns from 'date-fns'
  export default {
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    props: ['workShop', 'classes', 'productName', 'grade', 'batcheItems'],
    data () {
      return {
        user: {},
        dialogVisible: false,
        options: {
          line: []
          // lgort: []
        },
        // selectedStorage: {}, // 选中的库位对象
        form: {
          grade: '', // 等级名称
          batchNo: '', // 批号名称
          spec: '', // 规格
          classes: '', // 班次
          productName: '', // 产品名称
          paperTube: '', // 管色名称
          workShop: '',
          line: '', // 线别
          date: '',
          productDate: '', // 生产日期
          packageNum: 1, // 箱数
          packageDocNum: 4, // 箱单数量
          netWeight: '', // 净重
          maNum: 1, // 码单数量
          grossWeight: '', // 毛重
          silkNum: '' // 丝锭数量
          // lgort: '' // 销售类型
          // storageCode: '' // 库位
        },
        loading: {
          submit: false
        },
        formRules: {
          grade: [{ required: true, message: '请选择等级', trigger: 'change blur' }],
          line: [{ required: true, message: '请选择线别', trigger: 'change blur' }],
          batchNo: [{ required: true, message: '批号不能为空', trigger: 'blur change' }],
          classes: [{ required: true, message: '班次不能为空', trigger: 'blur change' }],
          // lgort: [{ required: true, message: '库存地点不能为空', trigger: 'blur change' }],
          productName: [{ required: true, message: '产品名称不能为空', trigger: 'change blur' }],
          paperTube: [{ required: true, message: '管色不能为空', trigger: 'change blur' }],
          workShop: [{ required: true, message: '请选择车间', trigger: 'change blur' }],
          date: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change blur' }],
          silkNum: [{ required: true, message: '丝锭数量不能为空' }, { type: 'number', message: '丝锭数量必须为数字值' }],
          netWeight: [{ required: true, message: '毛重不能为空' }, { type: 'number', message: '毛重必须为数字值' }],
          grossWeight: [{ required: true, message: '净重不能为空' }, { type: 'number', message: '净重必须为数字值' }],
          maNum: [{ required: true, message: '码单数量不能为空' }, { type: 'number', message: '码单数量必须为数字值' }]
        }
      }
    },
    mounted () {
      // this.getAllLgorts()
      this.user = storage.getUser()
    },
    methods: {
      // getAllLgorts () {
      //   api.automatic.productionProcess.getLgortList({}).then((response) => {
      //     const data = response.data
      //     if (data.messageType === 1) {
      //       this.options.lgort = data.data
      //     }
      //   })
      // },
      handleSelectStorage (val) {
        // this.selectedStorage = val
      },
      queryStorage (queryString, cb) {
        if (!queryString) {
          return cb(null)
        }
        api.automatic.productionProcess.getStorageIdCodeByLikeCode({
          code: queryString
        }).then(response => {
          let result = response.data.data.map(item => {
            item.value = item.name
            return item
          })
          cb(result)
        })
      },
      /* 批号搜索建议  */
      querySearch (queryString, cb) {
        this.form.batchNo = ''
        if (queryString) {
          let result = this.batcheItems.filter(item => {
            return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 && item.workshopId === this.form.workShop)
          })
          cb(result)
        } else {
          cb(this.batcheItems.filter(item => {
            return (item.workshopId === this.form.workShop)
          }))
        }
      },
      /* 选择批号 */
      handleSelect (item) {
        this.form.spec = `${item.centralValue}tex/${item.holeNum}f`
        this.form.paperTube = item.tubeColor
      },
      show () {
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = true
      },
      change (val) {
        this.form.productDate = dateFns.format(val, 'YYYY-MM-DD')
      },
      packageNumChange (val) {
        this.form.maNum = Math.ceil(val / 18)
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              employeeId: this.user.employeeId,
              classesName: this.form.classes,
              num: this.form.maNum,
              grade: this.form.grade,
              batchNo: this.form.batchNo,
              productName: this.form.productName,
              workshopId: this.form.workShop,
              productDate: this.form.productDate,
              packageNum: this.form.packageNum,
              netWeight: this.form.netWeight,
              grossWeight: this.form.grossWeight,
              silkNum: this.form.silkNum
              // lgort: this.form.lgort
              // storageCode: this.form.storageCode
            }
            api.automatic.barCode.addSilkBoxCode(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.$message.success('新增成功')
                this.dialogVisible = false
                this.$emit('submitSuccess')
              }
            }).finally(() => {
              this.loading.submit = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .width-100{
    width: 100px;
  }
</style>
