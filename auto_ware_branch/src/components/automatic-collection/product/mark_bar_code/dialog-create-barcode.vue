<template>
  <jk-dialog title="新增码单" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="销售类型" prop="shipmentType">
          <el-select v-model="form.shipmentType" placeholder="请选择销售类型">
            <el-option v-for="item in options.shipmentTypes" :label="item.name" :value="item.id"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" prop="workShop">
          <el-select v-model="form.workShop" placeholder="请选择车间" @change="changeWorkshop">
            <el-option v-for="item in workShop"
                       :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批号" prop="batchNo">
          <el-autocomplete v-model="form.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号"
                           @select="handleSelect" style="width: 16.5rem"></el-autocomplete>
        </el-form-item>

        <el-form-item label="SAP库存点" prop="lgort">
          <el-select v-model="form.lgort" placeholder="请选择销售类型">
            <el-option v-for="item in options.lgort" :label="item.lgobe" :value="item.lgort" :key="item.lgort"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预设库位" prop="storageCode">
          <el-autocomplete v-model="form.storageCode" :fetch-suggestions="queryStorage" placeholder="请选择库位"
                           @select="handleSelectStorage" style="width: 16.5rem"></el-autocomplete>
        </el-form-item>
        <el-form-item label="规格 | 管色">
          <span v-if="form.batchNo">{{form.spec}}&nbsp;&nbsp;|&nbsp;&nbsp;{{form.paperTube}}</span>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-select v-model="form.productName" placeholder="请选择产品" @change="getAllKindList" clearable>
            <el-option v-for="item in productName"
                       :label="item.name" :value="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="种类" prop="kindId">
          <el-select v-model="form.kindId" placeholder="请选择产品" clearable>
            <el-option v-for="item in options.kind" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产日期" prop="date">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期" @change="dataChange"></el-date-picker>
        </el-form-item>
        <el-form-item label="入库日期" prop="inboundDate">
          <el-date-picker v-model="form.inboundDate" type="date" placeholder="选择日期" :loading="loading.inboundDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="线别" prop="line">
          <el-select v-model="form.line" placeholder="请选择线别">
            <el-option v-for="item in options.line"
                       :label="item.line" :value="item.id" :key="item.id"></el-option>
          </el-select>
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
          lgort: [],
          line: [],
          kind: [],
          shipmentTypes: [{id: '1', name: '内销'}, {id: '2', name: '外贸'}]
        },
        // selectedStorage: {}, // 选中的库位对象
        form: {
          shipmentType: '', // 销售类型
          grade: '', // 等级名称
          batchNo: '', // 批号名称
          spec: '', // 规格
          classes: '', // 班次
          kindId: '', // 种类
          productName: '', // 产品名称
          paperTube: '', // 管色名称
          workShop: '',
          line: '', // 线别
          date: '',
          inboundDate: '', // 入库日期
          productDate: '', // 生产日期
          packageNum: 1, // 箱数
          packageDocNum: 4, // 箱单数量
          netWeight: '', // 净重
          maNum: 1, // 码单数量
          grossWeight: '', // 毛重
          silkNum: '', // 丝锭数量
          lgort: '', // 销售类型
          storageCode: '' // 库位
        },
        loading: {
          inboundDate: false,
          submit: false
        },
        formRules: {
          shipmentType: [{required: true, message: '请选择销售类型', trigger: 'change blur'}],
          grade: [{ required: true, message: '请选择等级', trigger: 'change blur' }],
          line: [{ required: true, message: '请选择线别', trigger: 'change blur' }],
          batchNo: [{ required: true, message: '批号不能为空', trigger: 'blur change' }],
          classes: [{ required: true, message: '班次不能为空', trigger: 'blur change' }],
          lgort: [{ required: true, message: '库存地点不能为空', trigger: 'blur change' }],
          storageCode: [{ required: true, message: '预设库位不能为空', trigger: 'blur change' }],
          productName: [{ required: true, message: '产品名称不能为空', trigger: 'change blur' }],
          paperTube: [{ required: true, message: '管色不能为空', trigger: 'change blur' }],
          workShop: [{ required: true, message: '请选择车间', trigger: 'change blur' }],
          date: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change blur' }],
          inboundDate: [{ type: 'date', required: true, message: '请选择入库日期', trigger: 'change blur' }],
          // silkNum: [{ required: true, message: '丝锭数量不能为空' }, { type: 'number', message: '丝锭数量必须为数字值' }],
          netWeight: [{ required: true, message: '毛重不能为空' }, { type: 'number', message: '毛重必须为数字值' }],
          grossWeight: [{ required: true, message: '净重不能为空' }, { type: 'number', message: '净重必须为数字值' }],
          maNum: [{ required: true, message: '码单数量不能为空' }, { type: 'number', message: '码单数量必须为数字值' }],
          kindId: [{ required: true, message: '请选择种类', trigger: 'change blur' }]
        }
      }
    },
    mounted () {
      this.getAllLgorts()
      this.user = storage.getUser()
    },
    methods: {
      changeWorkshop () {
        if (this.form.workShop) {
          api.automatic.productPlan.getAllLine({
            workShopId: this.form.workShop
          }).then(response => {
            this.options.line = response.data.data
          })
        } else {
          this.options.line = []
        }
      },
      getAllLgorts () {
        api.automatic.productionProcess.getLgortList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.lgort = data.data
          }
        })
      },
      handleSelectStorage (val) {
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
      /* 根据生产日期，批号查询入库日期 */
      queryInboundData () {
        this.loading.inboundDate = true
        let param = {
          productDate: this.form.productDate.getTime(),
          batchNo: this.form.batchNo
        }
        if (param.productDate && param.batchNo) {
          api.storage.warehouseMaintain.getDefaultInboundDate(param).then((response) => {
            const data = response.data
            if (data.messageType === 1 && data.data) {
              this.form.inboundDate = new Date(data.data)
            }
          }).finally(() => {
            this.loading.inboundDate = false
          })
        }
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
      // 类别
      getAllKindList () {
        api.automatic.dictionary.getAllKindList({productName: this.form.productName}).then((response) => {
          const data = response.data
          this.form.kindId = ''
          if (data.messageType === 1) {
            this.options.kind = data.data
          } else {
            this.options.kind = []
          }
        })
      },
      /* 选择批号 */
      handleSelect (item) {
        this.form.spec = `${item.centralValue}tex/${item.holeNum}f`
        this.form.paperTube = item.tubeColor
        if (this.form.batchNo && this.form.productDate) {
          this.queryInboundData()
        }
      },
      show () {
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = true
      },
      dataChange (val) {
        this.form.productDate = new Date(val)
        if (this.form.batchNo && this.form.productDate) {
          this.queryInboundData()
        }
      },
      packageNumChange (val) {
        this.form.maNum = Math.ceil(val / 18)
      },
      submitForm (formName) {
        if (['poy', 'fdy'].includes(this.form.productName.toLowerCase()) && !this.form.silkNum) {
          return this.$message({type: 'infor', message: 'POY，FDY必须选择丝锭数量'})
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.grossWeight >= this.form.netWeight) {
              this.loading.submit = true
              let params = {
                shipmentType: this.form.shipmentType,
                employeeId: this.user.employeeId,
                classesName: this.form.classes,
                num: this.form.maNum,
                grade: this.form.grade,
                batchNo: this.form.batchNo,
                productName: this.form.productName,
                inboundDate: dateFns.format(this.form.inboundDate, 'YYYY-MM-DD'),
                workshopId: this.form.workShop,
                productDate: dateFns.format(this.form.productDate, 'YYYY-MM-DD'),
                lineId: this.form.line,
                packageNum: this.form.packageNum,
                netWeight: this.form.netWeight,
                grossWeight: this.form.grossWeight,
                silkNum: this.form.silkNum,
                lgort: this.form.lgort,
                storageCode: this.form.storageCode,
                kindId: this.form.kindId
              }
              api.automatic.barCode.addSilkBoxCodeForStorage(params).then((response) => {
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
              return this.$message({type: 'error', message: '毛重必须大于净重'})
            }
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
