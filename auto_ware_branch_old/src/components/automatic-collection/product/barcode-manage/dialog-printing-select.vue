<!--文档档案库-->
<template>
  <dialog-side title="选择打印机" :visible.sync="dialogVisible">
    <div id="formDemo">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="打印机" prop="printer">
          <el-select v-loading="loading.printer" v-model="form.printer" placeholder="请选择打印机">
            <el-option
              v-for="item in printerOption"
              :key="item.number"
              :label="item.model+' '+item.type"
              :value="item.number">
            </el-option>
          </el-select>
          <el-form-item>
            <el-button :loading="loading.submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </dialog-side>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        printerOption: [],
        form: {
          printer: ''
        },
        loading: {
          printer: false
        },
        formRules: {
          printer: [
            {required: true, message: '请选择打印机', trigger: 'change blur'}
          ]
        }
      }
    },
    mounted () {

    },
    methods: {
      show () {
        this.dialogVisible = true
        let printer = localStorage.getItem('printer')
        if (printer != null) {
          this.form.printer = printer
        }
        this.getPrinterOption()
      },
      submitForm (formName) {
        this.$refs[formName].validate((vaild) => {
          if (vaild) {
            this.loading.submit = true
            localStorage.setItem('printer', this.form.printer)
          }
        })
        this.loading.submit = false
        this.dialogVisible = false
      },
      getPrinterOption () {
        this.loading.printer = true
        console.log(storage.getUser().workshopId)
        let param = {
          workshopId: storage.getUser().workshopId
        }
        api.automatic.dictionary.getPrintListByWorkshopId(param).then((response) => {
          const date = response.data
          console.log(date)
          if (date.messageType === 1) {
            this.printerOption = []
            for (let item of date.data) {
              if (item.type === '1') {
                item.type = 'USB'
              } else {
                item.type = '串口'
              }
              this.printerOption.push(item)
            }
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.printer = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
