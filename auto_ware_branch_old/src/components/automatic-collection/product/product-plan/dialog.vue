<template>
  <dialog-side width="550px" :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="newInfo" :rules="rules" ref="newInfo" :label-width="formLabelWidth">
      <el-row>
        <el-col :span="12">
          <el-form-item label="计划类型" prop="type">
            <el-select v-model="newInfo.type" placeholder="请选择计划类型" :disabled="disabled">
              <el-option v-for="(item,index) in typeList" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车间" prop="workshop">
            <el-select v-model="newInfo.workshop" @change="changeWorkshop" clearable placeholder="请选择车间">
              <el-option v-for="item in workshopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="线别" prop="lineId">
            <el-select v-model="newInfo.lineId" placeholder="请选择线别" :disabled="disabled">
              <el-option v-for="(item,index) in lineList" :label="item.line" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="批号" prop="batchNo">
            <el-autocomplete
              class="inline-input"
              v-model="newInfo.batchNo"
              :fetch-suggestions="querySearch"
              placeholder="请输入批号"
              @select="handleSelect"
              :disabled="disabled"></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格|管色">
            <span v-if="newInfo.batchNo">{{newInfo.spec}}&nbsp;&nbsp;|&nbsp;&nbsp;{{newInfo.paperTubeColor}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="位号" prop="itemStart">
        <el-input-number v-model="newInfo.itemStart" :disabled="disabled" class="small-input-number"
                         :min="1"></el-input-number>
        —
        <el-input-number v-model="newInfo.itemEnd" :disabled="disabled" class="small-input-number"
                         :min="1"></el-input-number>
      </el-form-item>

      <el-row>
        <el-col>
          <el-form-item label="锭重" prop="weightId">
            <el-select v-model="newInfo.weightId" placeholder="请选择锭重" :disabled="disabled">
              <el-option v-for="(item,index) in weightList" :label="item.weight + 'kg'" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="计划产量" prop="num">
        <el-input-number v-model="newInfo.num" :min="0" :max="1000000000000" placeholder="请输入数量"
                         class="num-contral"></el-input-number>
        吨/位.天
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始日期" prop="startTime" class="small-form-item" required>
            <el-date-picker
              v-model="newInfo.startTime"
              type="date"
              placeholder="选择开始日期"
              :picker-options="pickerOptions0"
              @change="dtStartChange" :disabled="disabled">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束日期" class="small-form-item">
            <el-date-picker
              v-model="newInfo.endTime"
              type="date"
              placeholder="选择结束日期"
              :picker-options="pickerOptions1"
              @change="dtEndChange" :disabled="disabled">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer tr">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button :loading="loading.submit" type="primary" @click="sureBtn('newInfo')">确 定</el-button>
    </div>
  </dialog-side>
</template>

<script>
  import * as api from '../../../../api/index'
  import storage from '../../../../module/storage'
  import dateFns from 'date-fns'

  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    props: ['workshopList'],
    mounted () {
      this.userInfo = storage.getUser()
      // this.getAllPaperTubeList()
      // this.getAllSpecList()
      this.getAllWeightList()
    },
    data () {
      return {
        paperTubeList: [], // 管色
        specList: [], // 规格
        weightList: [],
        lineList: [],
        loading: {
          submit: false
        },
        title: '',
        dialogFormVisible: false,
        disabled: true,
        typeList: [
          {id: '1', name: '改批'},
          {id: '2', name: '样品'}
        ],
        standardDis: false,
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.dtBaseStart) {
              return time.getTime() > this.dtBaseStart
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.dtBaseEnd) {
              return time.getTime() < this.dtBaseEnd
            }
          }
        },
        dtBaseStart: '',
        dtBaseEnd: '',
        dtStart: '',
        dtEnd: '',
        oriRrestaurants: [],
        restaurants: [],
        newInfo: {
          id: '',
          type: '',
          lineId: '',
          line: '',
          batchId: '',
          batchNo: '',
          spec: '',
          centralValue: '',
          holeNum: '',
          itemStart: '',
          itemEnd: '',
          paperTubeColor: '',
          startTime: '',
          endTime: '',
          endTimeFilter: '',
          num: '',
          weightId: '',
          weight: '',
          workshop: ''
        },
        rules: {
          type: [
            {required: true, message: '计划类型不能为空', trigger: 'blur change'}
          ],
          lineId: [
            {required: true, message: '线别不能为空', trigger: 'blur change'}
          ],
          batchNo: [
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value.length > 16) {
                    callback(new Error('批号过长'))
                  }
                  callback()
                } else {
                  callback(new Error('批号不能为空'))
                }
              }
            }
          ],
          itemStart: [
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value.toString().indexOf('.') === -1) {
                    if (parseInt(value)) {
                      if (this.newInfo.itemEnd) {
                        if (parseInt(value) > parseInt(this.newInfo.itemEnd)) {
                          callback(new Error('位号顺序不正确'))
                        }
                      } else if (this.newInfo.itemEnd === 0) {
                        callback(new Error('位号顺序不正确'))
                      }
                      callback()
                    } else {
                      callback(new Error('位号只能输入数字'))
                    }
                  } else {
                    callback(new Error('请输入正整数'))
                  }
                } else {
                  callback(new Error('位号不能小于0'))
                }
              }
            }
          ],
          paperTubeId: [
            {required: true, message: '管色不能为空', trigger: 'blur change'}
          ],
          startTime: [
            {
              type: 'date',
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (value) {
                  if (this.newInfo.endTime) {
                    if ((this.newInfo.endTime.getTime() - this.newInfo.startTime.getTime()) <= 0) {
                      callback('时间范围不正确')
                    } else {
                      callback()
                    }
                  } else {
                    callback()
                  }
                } else {
                  callback('开始时间不能为空')
                }
              }
            }
          ],
          weightId: [
            {required: true, message: '锭重不能为空', trigger: 'blur change'}
          ],
          workshop: [
            {required: true, message: '车间不能为空', trigger: 'blur change'}
          ],
          num: [
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (value) {
                  callback()
                } else {
                  callback(new Error('计划产量不能小于0'))
                }
              }
            }
          ]
        },
        formLabelWidth: '80px'
      }
    },
    methods: {
      getAllPaperTubeList () { // 获取所有管色
        let params = {}
        api.automatic.dictionary.getAllPaperTubeList(params).then(response => {
          this.paperTubeList = response.data.data
        })
      },
      getAllSpecList () {
        api.automatic.dictionary.getAllSpecList({}).then(response => {
          this.specList = response.data.data
        })
      },
      getAllWeightList () { // 获取所有锭重
        api.automatic.dictionary.getAllSilkWeightList({}).then(response => {
          this.weightList = response.data.data
        })
      },
      /* 搜索建议 规格 */
      querySearch (queryString, cb) {
        if (queryString) {
          let result = this.restaurants.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.restaurants)
        }
      },
      handleSelect (item) {
        console.log(item)
        this.$refs.newInfo.validateField('batchNo')
        this.newInfo.spec = `${item.centralValue}dtex/${item.holeNum}f`
        this.newInfo.paperTubeColor = item.tubeColor
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.newInfo.startTime.getTime() + 8.64e7
          this.dtStart = dateFns.format(this.newInfo.startTime, 'YYYY-MM-DDTHH:mm:ss.SSS')
        } else {
          this.dtBaseEnd = ''
          this.dtStart = ''
        }
      },
      dtEndChange (value) {
        this.$refs.newInfo.validateField('startTime')
        if (value) {
          this.dtBaseStart = this.newInfo.endTime.getTime() - 8.64e7
          this.dtEnd = dateFns.format(this.newInfo.endTime, 'YYYY-MM-DDTHH:mm:ss.SSS')
        } else {
          this.dtBaseStart = ''
          this.dtEnd = ''
        }
      },
      getAllLineList (cb) {
        api.automatic.productPlan.getAllLine({}).then(response => {
          this.lineList = response.data.data
          cb()
        })
      },
      getLineList () {
        if (!this.newInfo.workshop) {
          this.lineList = []
          return
        }
        let params = {
          workShopId: this.newInfo.workshop
        }
        api.automatic.productPlan.getAllLine(params).then(response => {
          this.lineList = response.data.data
        })
      },
      // 根据车间过滤批号
      filterBatchNo () {
        this.restaurants = this.oriRrestaurants.filter(item => item.workshopId === this.newInfo.workshop)
      },
      toggle (params) {
        this.$refs.newInfo.resetFields()
        this.oriRrestaurants = params.restaurants
        if (params.title === '修改') {
          this.getAllLineList(() => {
            this.newInfo.lineId = params.lineId
          })
        }
        this.newInfo.id = params.id
        this.newInfo.type = params.type
        this.newInfo.lineId = params.lineId
        this.newInfo.batchId = params.batchId
        this.newInfo.batchNo = params.batchNo
        this.newInfo.spec = (params.centralValue && params.holeNum) ? `${params.centralValue}dtex/${params.holeNum}f` : ''
        this.newInfo.holeNum = params.holeNum
        this.newInfo.itemStart = params.itemStart
        this.newInfo.itemEnd = params.itemEnd
        this.newInfo.paperTubeColor = params.paperTubeColor
        this.newInfo.num = params.num
        this.newInfo.weightId = params.weightId
        this.newInfo.weight = params.weight
        this.newInfo.startTime = params.startTime
        this.newInfo.endTime = params.endTime
        this.newInfo.workshop = params.workshopId
        this.title = params.title
        this.disabled = params.disabled
        this.dialogFormVisible = params.dialogFormVisible
      },

      changeWorkshop () {
        this.getLineList()
        this.filterBatchNo()
        this.newInfo.lineId = ''
      },
      sureBtn (newInfo) {
        this.$refs[newInfo].validate(valid => {
          if (valid) {
            if (this.title === '新增') {
              this.add()
              return true
            }
            if (this.title === '修改') {
              this.update()
              return true
            }
            if (this.title === '查看') {
              this.dialogFormVisible = false
              return true
            }
          } else {
            return false
          }
        })
      },
      add () {
        let params = {
          productionPlanType: this.newInfo.type,
          lineId: this.newInfo.lineId,
          batchNo: this.newInfo.batchNo,
          itemStart: this.newInfo.itemStart,
          itemEnd: this.newInfo.itemEnd,
          weightId: this.newInfo.weightId,
          workshopId: this.newInfo.workshop,
          num: this.newInfo.num,
          personId: this.userInfo.userId,
          startTime: this.dtStart,
          endTime: this.dtEnd,
          employeeId: this.userInfo.userId
        }
        this.loading.submit = true
        api.automatic.productPlan.addPlan(params).then(response => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.$emit('callback')
            this.dialogFormVisible = false
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.submit = false
        })
      },
      update () {
        let params = {
          productionPlanId: this.newInfo.id,
          productionPlanType: this.newInfo.type,
          lineId: this.newInfo.lineId,
          batchNo: this.newInfo.batchNo,
          itemStart: this.newInfo.itemStart,
          itemEnd: this.newInfo.itemEnd,
          weightId: this.newInfo.weightId,
          workshopId: this.newInfo.workshop,
          num: this.newInfo.num,
          personId: this.userInfo.userId,
          startTime: this.dtStart,
          endTime: this.dtEnd,
          employeeId: this.userInfo.userId
        }
        this.loading.submit = true
        api.automatic.productPlan.updatePlan(params).then(response => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.$emit('callback')
            this.dialogFormVisible = false
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.submit = false
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .num-contral {
    width: 50%
  }

  .small-input {
    width: 60px;
    display: inline-block;
  }

  .small-input-number {
    width: 140px;
    display: inline-block;
  }

  .small-form-item {
    .el-date-editor.el-input {
      width: 179px;
    }
  }
</style>
