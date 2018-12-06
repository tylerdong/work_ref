<template>
  <div>
    <dialog-side width="550px" :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="newInfo" :rules="rules" ref="newInfo" :label-width="formLabelWidth">
        <el-form-item label="毛重" prop="boxGrossWeight">
          <el-input v-model.number="newInfo.boxGrossWeight" placeholder="请输入毛重" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="净重" prop="boxNetWeight">
          <el-input v-model.number="newInfo.boxNetWeight" placeholder="请输入净重" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer tr">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="loading.submit" type="primary" @click="sureBtn('newInfo')">打印</el-button>
      </div>
    </dialog-side>
    <dialog-print :printData="printData"></dialog-print>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue'),
      'dialog-print': require('./dialog-print.vue')
    },
    data () {
      return {
        printData: [],
        loading: {
          submit: false
        },
        title: '计量',
        dialogFormVisible: false,
        newInfo: {
          boxGrossWeight: '',
          boxNetWeight: '',
          id: ''
        },
        rules: {
          boxGrossWeight: [
            { required: true, message: '毛重不能为空' },
            { type: 'number', message: '毛重必须为数字值' }
          ],
          boxNetWeight: [
            { required: true, message: '净重不能为空' },
            { type: 'number', message: '净重必须为数字值' }
          ]
        },
        formLabelWidth: '120px'
      }
    },
    mounted () {
    },
    methods: {
      sureBtn (newInfo) {
        this.$refs[newInfo].validate(valid => {
          if (valid) {
            this.btnPrint()
          } else {
            return false
          }
        })
      },
      show (params) {
        console.log(params)
        this.newInfo.id = params.id
        this.dialogFormVisible = true
        this.$refs.newInfo.resetFields()
        this.newInfo.boxGrossWeight = params.boxGrossWeight ? parseFloat(params.boxGrossWeight) : ''
        this.newInfo.boxNetWeight = params.boxNetWeight ? parseFloat(params.boxNetWeight) : ''
      },
      btnPrint (item) {
        this.loading.submit = true
        let params = {
          id: this.newInfo.id,
          boxNetWeight: this.newInfo.boxNetWeight,
          boxGrossWeight: this.newInfo.boxGrossWeight
        }
        api.automatic.measurePrinting.printBoxCode(params).then(response => {
          let data = response.data
          if (response.data.messageType === 1) {
//            this.$message({
//              type: 'success',
//              message: response.data.message
//            })
            console.log(data.data)
            this.printData = [data.data]
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
</style>
