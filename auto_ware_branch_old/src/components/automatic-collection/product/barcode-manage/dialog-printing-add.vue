<template>
  <jk-dialog title="生成条码" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="线别" prop="line">
          <el-select v-loading="loading.line" v-model="form.line" @change="getBatchListByLineId" placeholder="请选择线别" clearable>
            <el-option
              v-for="item in lineOptions"
              :key="item.id"
              :label="item.line"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-loading="loading.batchNum" label="批号" prop="batchNum">
          <el-select v-model="form.batchNum" @change="getProductInfoBoByParameters" placeholder="请选择批号" clearable filterable>
            <el-option
              v-for="item in batchNumOptions"
              :key="item.id"
              :label="item.batchNo"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格">
          <span>{{form.spec}}</span>
        </el-form-item>
        <el-form-item label="落筒方式" prop="downType">
          <el-select v-model="form.downType" placeholder="请选择落筒方式">
            <el-option
              v-for="item in downTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="锭数" prop="silkNum">
          <el-select v-model="form.silkNum" placeholder="请选择锭数">
            <el-option
              v-for="item in silkNumOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="锭重" prop="silkWeight">
          <el-select v-model="form.silkWeight" placeholder="请选择锭重">
            <el-option
              v-for="item in silkWeightOptions"
              :key="item.weight"
              :label="item.weight"
              :value="item.weight">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班次" prop="team">
          <el-select v-loading="loading.team" v-model="form.team" placeholder="请选择班次">
            <el-option
              v-for="item in teamOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机台位号" required>
          <el-col :span="11">
            <el-form-item prop="machineNumStart">
              <el-input-number :controls="false" class="width-100" v-model="form.machineNumStart"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="machineNumEnd">
              <el-input-number :controls="false" class="width-100" v-model="form.machineNumEnd"></el-input-number>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="落次" required>
          <el-col :span="11">
            <el-form-item prop="downNumStart">
              <el-input-number :controls="false" class="width-100" v-model="form.downNumStart"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="downNumEnd">
              <el-input-number :controls="false" class="width-100" v-model="form.downNumEnd"></el-input-number>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="生产日期" prop="productDate">
          <el-date-picker
            v-model="form.productDate"
            type="date"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标志" prop="sign">
          <el-input v-model="form.sign" disabled></el-input>
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
        lineOptions: [],
        batchNumOptions: [],
        typeOptions: [],
        silkWeightOptions: [],
        silkNumOptions: [
          { value: '8' },
          { value: '10' },
          { value: '12' },
          { value: '24' },
          { value: '32' }
        ],
        downTypeOptions: [
          { value: '2', label: '自动落筒' },
          { value: '1', label: '手动落筒' }
        ],
        teamOptions: [],
        form: {
          line: '',
          batchNum: '',
          spec: '',
          type: '',
          downType: '2',
          silkNum: '', // 锭数
          silkWeight: '',
          team: '',
          machineNumStart: '',
          machineNumEnd: '',
          downNumStart: '',
          downNumEnd: '',
          sign: 'GXHY',
          productDate: new Date()
        },
        loading: {
          line: false,
          batchNum: false,
          type: false,
          team: false,
          submit: false
        },
        formRules: {
          line: [
            { required: true, message: '请选择线别', trigger: 'change blur' }
          ],
          batchNum: [
            { required: true, message: '请选择批号', trigger: 'change blur' }
          ],
          type: [
            { required: true, message: '请选择规格', trigger: 'change blur' }
          ],
          downType: [
            { required: true, message: '请选择落筒方式', trigger: 'change blur' }
          ],
          silkNum: [
            { required: true, message: '请选择锭数', trigger: 'change blur' }
          ],
          silkWeight: [
            { required: true, message: '请选择锭重', trigger: 'change blur' }
          ],
          team: [
            { required: true, message: '请选择班次', trigger: 'change blur' }
          ],
          sign: [
            { required: true, message: '请输入标志', trigger: 'change blur' }
          ],
          machineNumStart: [
            { type: 'number', required: true, message: '请输入机台位号', trigger: 'change blur' }
          ],
          machineNumEnd: [
            { type: 'number', required: true, message: '请输入机台位号', trigger: 'change blur' }
          ],
          downNumStart: [
            { type: 'number', required: true, message: '请输入落次', trigger: 'change blur' }
          ],
          downNumEnd: [
            { type: 'number', required: true, message: '请输入落次', trigger: 'change blur' }
          ],
          productDate: [
            { type: 'date', required: true, message: '请选择生产日期', trigger: 'change blur' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show (item) {
        console.log(item)
        this.$refs.ruleForm.resetFields()
        if (item) {
          this.form.line = item.lineId
          this.form.batchNum = item.batchNo
          this.form.type = item.spec
          this.form.team = item.classesId
          this.form.downType = item.fallType
          let machineNumStart = item.item.split('-')[0]
          let machineNumEnd = item.item.split('-')[1]
          let downNumStart = item.fallNo.split('-')[0]
          let downNumEnd = item.fallNo.split('-')[1]
          this.form.machineNumStart = machineNumStart
          this.form.machineNumEnd = machineNumEnd
          this.form.downNumStart = downNumStart
          this.form.downNumEnd = downNumEnd
          this.form.silkWeight = item.weight
          var silkNum = parseInt(item.num) / (parseInt(machineNumEnd) - parseInt(machineNumStart) + 1) / (parseInt(downNumEnd) - parseInt(downNumStart) + 1)
          this.form.silkNum = silkNum.toString()
        }
        this.getLineOptions()
        this.getBatchNumOptions()
        this.getTeamOptions()
        this.getSilkWeightOptions()
        let date = new Date()
        date.setDate(date.getDate() + 1)
        this.form.productDate = date
        this.dialogVisible = true
      },
      getLineOptions () {
        this.loading.line = true
        api.automatic.productPlan.getAllLine({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.lineOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.line = false
        })
      },
      getBatchListByLineId (id) {
        if (this.form.line) {
          this.loading.line = true
          let params = {
            lineId: id
          }
          api.automatic.barCode.getBatchListByLineId(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              this.batchNumOptions = data.data
            }
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.loading.line = false
          })
        }
      },
      getProductInfoBoByParameters (batchNo) {
        if (this.form.line && this.form.batchNum) {
          this.loading.batchNum = true
          let params = {
            lineId: this.form.line,
            batchId: batchNo
          }
          api.automatic.barCode.getProductInfoBoByParameters(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              this.form.type = data.data.spec.id
              this.form.downType = data.data.fallType
              this.form.silkWeight = data.data.weight
              this.form.silkNum = data.data.number
              this.form.spec = data.data.spec
            }
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.loading.batchNum = false
          })
        }
      },
      getBatchNumOptions () {
        this.loading.batchNum = true
        api.automatic.dictionary.getAllBatchList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.batchNumOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.batchNum = false
        })
      },
      getTeamOptions () {
        this.loading.team = true
        api.automatic.dictionary.getAllClassesList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.teamOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.team = false
        })
      },
      getSilkWeightOptions () {
        api.automatic.dictionary.getAllSilkWeightList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.silkWeightOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      submitForm (formName) {
        console.log(this.form.productDate)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              weight: this.form.silkWeight,
              sign: this.form.sign,
              lineId: this.form.line,
              startItem: this.form.machineNumStart,
              endItem: this.form.machineNumEnd,
              num: this.form.silkNum,
              spec: this.form.type,
              classesId: this.form.team,
              batchNo: this.form.batchNum,
              starFallNo: this.form.downNumStart,
              endFallNo: this.form.downNumEnd,
              doffType: this.form.downType,
              productDate: dateFns.format(this.form.productDate, 'YYYY-MM-DD')
            }
            api.automatic.barCode.createSilkCode(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialogVisible = false
                this.$emit('submitSuccess')
              }
            }).finally(() => {
              this.loading.submit = false
            })
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
