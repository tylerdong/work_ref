<!---->
<template>
  <div>
    <dialog-side title="生成条码" :visible.sync="dialogVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="编号" prop="number">
          <el-tooltip class="item input-width" effect="dark" content="示例：GXD001B，GX：公司简称，D：车间，001：暂存箱号，B：丝锭等级" placement="top-end">
            <el-input type="text" placeholder="请输入编号，如GXD001B" v-model="ruleForm.number"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="批号" prop="batchNo">
          <el-autocomplete v-model="ruleForm.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号"
                           @select="handleSelect" class="input-width"></el-autocomplete>
        </el-form-item>
        <el-form-item label="等级" prop="grade">
          <el-select v-model="ruleForm.grade" placeholder="请选择等级">
            <el-option v-for="item in options.grade"
                       :label="item.name" :value="item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线别" prop="lineId">
          <el-select v-model="ruleForm.lineId" placeholder="请选择线别">
            <el-option v-for="item in options.lineId"
                       :label="item.line" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" prop="workshopId">
          <el-select v-model="ruleForm.workshopId" placeholder="请选择车间">
            <el-option v-for="item in options.workshopId"
                       :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管色" prop="paperTube">
          <span>{{ruleForm.paperTube}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </dialog-side>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'src/module/storage'
  let validateNumber = (rule, value, callback) => {
    if (value) {
      let params = {
        number: value
      }
      api.automatic.productionProcess.checkTemporaryBoxNum(params).then((response) => {
        const data = response.data
        if (data.messageType === 1) {
          console.log(data.data)
          if (data.data === '0') {
            callback()
          } else {
            callback(new Error('编号已存在!'))
          }
        }
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
      })
    }
  }
  export default {
    components: {
      'dialog-side': require('src/components/common/dialog-side.vue')
    },
    data () {
      return {
        options: {
          grade: '',
          lineId: '',
          workshopId: '',
          paperTube: '',
          batcheItems: []
        },
        ruleForm: {
          number: '',
          batchNo: '',
          grade: '',
          lineId: '',
          workshopId: '',
          paperTube: ''
        },
        rules: {
          number: [
            { required: true, message: '请输入编号', trigger: 'change' },
            { min: 7, max: 7, message: '请输入七位编码', trigger: 'change' },
            { validator: validateNumber, trigger: 'change' }
          ],
          batchNo: [
            { required: true, message: '请输入批号', trigger: 'blur' }
          ],
          grade: [
            { required: true, message: '请选择丝锭等级', trigger: 'blur' }
          ],
          lineId: [
            { required: true, message: '请选择线别', trigger: 'blur' }
          ],
          workshopId: [
            { required: true, message: '请选择车间', trigger: 'blur' }
          ],
          paperTube: [
            { required: true, message: '请选择管色', trigger: 'blur' }
          ]
        },
        dialogVisible: false
      }
    },
    mounted () {
    },
    methods: {
      show (data, batcheItems) {
        this.$refs.ruleForm.resetFields()
        this.options.batcheItems = batcheItems
        if (data.length) {
          this.ruleForm.number = data[0].number
          this.ruleForm.batchNo = data[0].batchNo
          this.ruleForm.lineId = data[0].lineId
          this.ruleForm.workshopId = data[0].workshopId
          for (let item of this.options.grade) {
            if (item.name === data[0].grade) {
              this.ruleForm.grade = data[0].grade
            }
          }
          for (let item of this.options.paperTube) {
            if (item.color === data[0].paperTube) {
              this.ruleForm.paperTube = data[0].paperTube
            }
          }
        }
        this.dialogVisible = true
      },
      submitForm () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let params = {
              number: this.ruleForm.number,
              batchNo: this.ruleForm.batchNo,
              grade: this.ruleForm.grade,
              lineId: this.ruleForm.lineId,
              workshopId: this.ruleForm.workshopId,
              paperTube: this.ruleForm.paperTube,
              employeeId: storage.getUser().employeeId
            }
            api.automatic.productionProcess.createTemporaryBox(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                console.log(data)
                this.dialogVisible = false
                this.$emit('submitSuccess')
              }
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
            })
          }
        })
      },
      getGradeOptions () {
        api.automatic.dictionary.getAllSilkGradeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.options.grade = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getLineIdOptions () {
        api.automatic.productPlan.getAllLine({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.options.lineId = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getwWorkshopIdOptions () {
        api.automatic.dictionary.getAllWorkshopList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.options.workshopId = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
//      getPaperTubeOptions () {
//        api.automatic.dictionary.getAllPaperTubeList({}).then((response) => {
//          const data = response.data
//          if (data.messageType === 1) {
//            console.log(data)
//            this.options.paperTube = data.data
//          }
//        }).catch((e) => {
//          console.log(e)
//        }).finally(() => {
//        })
//      },
      /* 筛选批号 */
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
      /* 选中批号 */
      handleSelect (item) {
        this.ruleForm.paperTube = item.tubeColor
      }
    }
  }
</script>
<style lang="scss" scoped>
  .input-width{ width: 16.5rem }
</style>
