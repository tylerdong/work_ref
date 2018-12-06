<!--组件名-->
<template>
  <div>
    <el-dialog title="库位打印" width="50%" :visible.sync="dialogTableVisible"
               :before-close="beforeClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="库位编号" required>
          <el-row>
            <el-col :span="11">
              <el-form-item prop="codeStart">
                <el-input v-model="ruleForm.codeStart"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line tc" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="codeEnd">
                <el-input v-model="ruleForm.codeEnd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <div class="cf">
          <el-button class="fr" type="primary" :loading="loading.submit" @click="submitForm('ruleForm')">打印</el-button>
        </div>
      </el-form>
    </el-dialog>
    <div class="print-box" ref="printBox">
      <ul>
        <li class="list-item" v-for="item in printData">
          <div class="code-title">{{item.storageCode}}</div>
          <div class="qrcode" ref="qrcode"></div>
          <div class="txt-box">
            <div class="txt-line">
              <span>批号：</span>
              <span class="txt-big">{{item.batchNo}}</span>
            </div>
            <div class="txt-line">
              <span>规格：</span>
              <span>{{item.spec}}</span>
            </div>
            <div class="txt-line">
              <span>等级：</span>
              <span>{{item.level}}</span>
            </div>
            <div class="txt-line">
              <span>重量：</span>
              <span>{{item.netWeight}}</span>
            </div>
            <div class="txt-line">
              <span>特殊要求：</span>
              <span>{{item | special}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import QRCode from 'qrcodejs2'
  import 'jQuery.print'
  import {yokeTypes, frothTypes} from 'value-label'
  const validatorCode = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('编号不能为空'))
    }
    if (!/^\d{3}$/.test(value)) {
      callback(new Error('编号为三位数字'))
    } else {
      callback()
    }
  }
  export default {
    data () {
      return {
        dialogTableVisible: false,
        areaData: null,
        ruleForm: {
          codeStart: '',
          codeEnd: ''
        },
        printData: [],
        rules: {
          codeStart: [
            { trigger: 'blur change', validator: validatorCode }
          ],
          codeEnd: [
            { trigger: 'blur change', validator: validatorCode }
          ]
        },
        loading: {
          submit: false
        }
      }
    },
    filters: {
      special (val) {
        let returnText = []
        if (val.foamType) {
          for (let item of frothTypes) {
            if (item.value === val.foamType) {
              returnText.push(item.label)
            }
          }
        }
        if (val.yoke) {
          for (let item of yokeTypes) {
            if (item.value === val.yoke) {
              returnText.push(item.label)
            }
          }
        }
        return returnText.join('、')
      }
    },
    mounted () {
    },
    methods: {
      submitForm () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            this.loading.submit = true
            api.storage.warehouseManagement.getStoragePrintList({
              startCode: this.areaData.houseCode + this.ruleForm.codeStart,
              endCode: this.areaData.houseCode + this.ruleForm.codeEnd
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.printData = data.data
                console.log(this.printData)
                this.print()
              }
            }).finally(() => {
              this.loading.submit = false
            })
          }
        })
      },
      print () {
        this.$nextTick(function () {
          for (let i of this.printData.keys()) {
            let qrcodeDoms = this.$refs.qrcode
            qrcodeDoms[i].innerHTML = ''
            let qrcode = new QRCode(qrcodeDoms[i], {
              text: this.printData[i].storageCode,
              width: 400,
              height: 400
            })
            console.log(qrcode)
          }
          this.$nextTick(function () {
            setTimeout(() => {
              $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-storage.css'})
            }, 10) // 0ms也可以,不加延时二维码生成出错
          })
        })
      },
      beforeClose (done) {
        this.$refs.ruleForm.resetFields()
        done()
      },
      show (data) {
        this.areaData = data
        this.dialogTableVisible = true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .print-box{
    display: none;
  }
</style>
