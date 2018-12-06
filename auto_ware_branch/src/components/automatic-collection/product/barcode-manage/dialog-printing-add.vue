<template>
  <jk-dialog title="生成条码" :visible.sync="dialogVisible" >
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="130px">
        <el-form-item label="线别" prop="line">
          <el-select v-loading="loading.line" v-model="form.line" @change="lineChange" placeholder="请选择线别" clearable>
            <el-option v-for="item in lineOptions" :key="item.id" :label="item.line" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-loading="loading.batchNum" label="批号" prop="batchNum">
          <el-select v-model="form.batchNum" @change="getProductInfoBoByParameters" placeholder="请选择批号" clearable filterable>
            <el-option v-for="item in batchNumOptions" :key="item.id" :label="item.batchNo" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="machineNumStart" label="开始机台位号">
          <el-input-number class="input-item-17" :min="1" :max="99" v-model="form.machineNumStart" @change="getsilkNum"></el-input-number>
        </el-form-item>
        <el-form-item prop="machineNumEnd" label="结束机台位号">
          <el-input-number class="input-item-17" :min="1" :max="99" v-model="form.machineNumEnd" @change="getsilkNum"></el-input-number>
        </el-form-item>
        <el-form-item label="锭数" prop="silkNum">
          <el-input v-model="form.silkNum" placeholder="请选取锭数" readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="规格">
          <span>{{form.spec}}</span>
        </el-form-item>
        <el-form-item label="落筒方式" prop="downType">
          <el-select v-model="form.downType" placeholder="请选择落筒方式">
            <el-option v-for="item in downTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="锭重" prop="silkWeight">
          <el-select v-model="form.silkWeight" placeholder="请选择锭重">
            <el-option v-for="item in silkWeightOptions" :key="item.weight" :label="item.weight" :value="item.weight"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" prop="gradeId">
          <el-select v-model="form.gradeId" placeholder="请选择等级">
            <el-option v-for="item in grades" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班次" prop="team">
          <el-select v-loading="loading.team" v-model="form.team" placeholder="请选择班次">
            <el-option v-for="item in teamOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
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
          <el-date-picker v-model="form.productDate" type="date" placeholder="请选择日期"></el-date-picker>
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
  import storage from 'storage'
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
        grades: [],
        downTypeOptions: [
          { value: '2', label: '自动落筒' },
          { value: '1', label: '手动落筒' }
        ],
        userInfo: {},
        teamOptions: [],
        form: {
          line: '',
          batchNum: '',
          spec: '',
          type: '',
          downType: '2',
          silkNum: '', // 锭数
          silkWeight: '',
          gradeId: '',
          team: '',
          machineNumStart: 1,
          machineNumEnd: 1,
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
            { required: true, message: '请选取锭数', trigger: 'change blur' }
          ],
          silkWeight: [
            { required: true, message: '请选择锭重', trigger: 'change blur' }
          ],
          gradeId: [
            { required: true, message: '请选择等级', trigger: 'change blur' }
          ],
          team: [
            { required: true, message: '请选择班次', trigger: 'change blur' }
          ],
          sign: [
            { required: true, message: '请输入标志', trigger: 'change blur' }
          ],
          machineNumStart: [
            { type: 'number', required: true, message: '请输入机台位号', trigger: 'change blur' },
            {
              required: true,
              trigger: 'change blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value > this.form.machineNumEnd) {
                    callback(new Error('开始机台位号大于结束机台位号'))
                  } else {
                    callback()
                  }
                } else {
                  callback(new Error('请选择开始机台位号'))
                }
              }
            }
          ],
          machineNumEnd: [
            { type: 'number', required: true, message: '请输入机台位号', trigger: 'change blur' },
            {
              required: true,
              trigger: 'change blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value < this.form.machineNumStart) {
                    callback(new Error('结束机台位号小于开始机台位号'))
                  } else {
                    callback()
                  }
                } else {
                  callback(new Error('请选择结束机台位号'))
                }
              }
            }
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
      this.userInfo = storage.getUser()
    },
    methods: {
      show (item) {
        console.log(item)
        this.$refs.ruleForm.resetFields()
        if (item) {
          this.form.line = item.lineId
          this.form.batchNum = item.batchNo
          this.form.spec = item.spec
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
          this.form.gradeId = item.gradeId
          var silkNum = parseInt(item.num) / (parseInt(machineNumEnd) - parseInt(machineNumStart) + 1) / (parseInt(downNumEnd) - parseInt(downNumStart) + 1)
          this.form.silkNum = silkNum.toString()
        }
        this.getLineOptions()
        this.getBatchNumOptions()
        this.getTeamOptions()
        this.getSilkWeightOptions()
        this.getGradeOptions()
        let date = new Date()
        date.setDate(date.getDate() + 1)
        this.form.productDate = date
        this.dialogVisible = true
      },
      lineChange () {
        this.getBatchListByLineId()
        this.getsilkNum()
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
      getsilkNum () {
        if (this.form.line && this.form.machineNumStart && this.form.machineNumEnd) {
          let param = {
            lineId: this.form.line,
            startItem: this.form.machineNumStart,
            endItem: this.form.machineNumEnd
          }
          api.automatic.other.getProductionMachineInfo(param).then(response => {
            const data = response.data
            if (data.messageType === 1 && data.data) {
              this.form.silkNum = parseInt(data.data[0].partNum)
              let maxItem = 0
              data.data.forEach(infor => { maxItem = Math.max(maxItem, infor.item) })
              if (this.form.machineNumEnd > parseInt(maxItem)) {
                this.form.machineNumEnd = parseInt(maxItem)
              }
            } else {
              this.$message({type: 'error', message: data.message})
              this.form.silkNum = ''
            }
          })
        }
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
              // this.form.silkNum = data.data.number
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
      getGradeOptions () {
        api.automatic.dictionary.getAllSilkGradeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.grades = data.data
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
              gradeId: this.form.gradeId,
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
              productDate: dateFns.format(this.form.productDate, 'YYYY-MM-DD'),
              employeeId: this.userInfo.userId
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
