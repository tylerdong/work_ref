<template>
  <jk-dialog title="新增码单" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="车间" prop="workShop">
          <el-select v-model="form.workShop" placeholder="请选择车间">
            <el-option v-for="item in options.workShop"
                       :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批号" prop="batchNo">
          <el-autocomplete v-model="form.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号"
                           @select="handleSelect" style="width: 16.5rem"></el-autocomplete>
        </el-form-item>
        <el-form-item label="规格 | 管色">
          <span v-if="form.batchNo">{{form.spec}}&nbsp;&nbsp;|&nbsp;&nbsp;{{form.paperTube}}</span>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-select v-model="form.productName" placeholder="请选择产品">
            <el-option v-for="item in options.productName"
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
            <el-option v-for="item in options.classes"
                       :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" prop="grade">
          <el-select v-model="form.grade" placeholder="请选择等级">
            <el-option v-for="item in options.grade"
                       :label="item.name" :value="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <div style="margin-bottom: 10px">箱单信息：</div>
        <el-form-item label="净重" prop="netWeight" required>
          <el-input v-model.number="form.netWeight"></el-input>
        </el-form-item>
        <el-form-item label="毛重" prop="grossWeight" required>
          <el-input v-model.number="form.grossWeight"></el-input>
        </el-form-item>
        <el-form-item label="箱单数量" prop="packageDocNum" required>
          <el-input-number :min="1" :debounce="1000" v-model="form.packageDocNum"></el-input-number>
        </el-form-item>
        <el-form-item label="箱数" prop="packageNum" required>
          <el-input-number @change="packageNumChange" :min="1" :debounce="1000" v-model="form.packageNum"></el-input-number>
        </el-form-item>
        <el-form-item label="码单数量">
          <div>{{form.maNum}}</div>
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
  import dateFns from 'date-fns'
  export default {
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        options: {
          productName: [],
          grade: [],
          spec: [],
          classes: [],
          paperTube: [],
          workShop: [],
          batcheItems: []
        },
        form: {
          grade: '', // 等级名称
          batchNo: '', // 批号名称
          spec: '', // 规格
          classes: '', // 班次
          productName: '', // 产品名称
          paperTube: '', // 管色名称
          workShop: '',
          date: '',
          productDate: '', // 生产日期
          packageNum: 1, // 箱数
          packageDocNum: 4, // 箱单数量
          netWeight: 1, // 净重
          maNum: 1, // 码单数量
          grossWeight: 1 // 毛重
        },
        loading: {
          submit: false
        },
        formRules: {
          grade: [
            { required: true, message: '请选择等级', trigger: 'change blur' }
          ],
          batchNo: [
            { required: true, message: '批号不能为空', trigger: 'blur change' }
          ],
          classes: [
            { required: true, message: '班次不能为空', trigger: 'change blur' }
          ],
          spec: [
            { required: true, message: '规格不能为空', trigger: 'change blur' }
          ],
          productName: [
            { required: true, message: '产品名称不能为空', trigger: 'change blur' }
          ],
          paperTube: [
            { required: true, message: '管色不能为空', trigger: 'change blur' }
          ],
          workShop: [
            { required: true, message: '请选择车间', trigger: 'change blur' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change blur' }
          ],
          netWeight: [
            { required: true, message: '毛重不能为空' },
            { type: 'number', message: '毛重必须为数字值' }
          ],
          grossWeight: [
            { required: true, message: '净重不能为空' },
            { type: 'number', message: '净重必须为数字值' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
//      getPaperTubeOptions () {
//        api.automatic.dictionary.getAllPaperTubeList({}).then((response) => {
//          const data = response.data
//          if (data.messageType === 1) {
//            this.options.paperTube = data.data
//          }
//        }).catch((e) => {
//          console.log(e)
//        }).finally(() => {
//        })
//      },
      getClassesOptions () {
        api.automatic.dictionary.getAllClassesList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.classes = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
//      getSpecOptions () {
//        api.automatic.dictionary.getAllSpecList({}).then((response) => {
//          const data = response.data
//          if (data.messageType === 1) {
//            this.options.spec = data.data
//          }
//        }).catch((e) => {
//          console.log(e)
//        }).finally(() => {
//        })
//      },
      getGradeOptions () {
        api.automatic.dictionary.getAllSilkGradeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.grade = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getProductNameOptions () {
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.productName = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      /* 批号搜索建议 */
      querySearch (queryString, cb) {
        if (queryString) {
          let result = this.options.batcheItems.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.options.batcheItems)
        }
      },
      /* 选择批号 */
      handleSelect (item) {
        this.form.spec = `${item.centralValue}tex/${item.holeNum}f`
        this.form.paperTube = item.tubeColor
      },
      show (batcheItems) {
        this.options.batcheItems = batcheItems
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
              classesId: this.form.classes,
              num: this.form.packageDocNum,
              grade: this.form.grade,
              batchNo: this.form.batchNo,
              spec: this.form.spec,
              productName: this.form.productName,
              paperTube: this.form.paperTube,
              workshopId: this.form.workShop,
              productDate: this.form.productDate,
              packageNum: this.form.packageNum,
              netWeight: this.form.netWeight,
              grossWeight: this.form.grossWeight
            }
            api.automatic.barCode.creatPackageCode(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
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
