<!-- 丝锭异常状态 -->
<template>
  <div>
    <div class="content">
      <el-row>
        <div class="margin-bottom-1 text-align-right">
          <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px" :inline="true">
            <!--工厂号-->
            <el-form-item label="工厂号">
              <el-input v-model="form.workNo" placeholder="请输入位号" :disabled="true"></el-input>
            </el-form-item>
            <!--工厂号-->
            <el-form-item label="产品号">
              <el-input v-model="form.productNo" placeholder="请输入位号" :disabled="true"></el-input>
            </el-form-item>
            <!--生产日期-->
            <el-form-item label="生产日期" prop="productionDate">
              <el-date-picker v-model="form.productionDate" type="date" value-format="yyyyMMdd" placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <!--批号开始-->
            <el-form-item label="批号" prop="batchNo">
              <el-input v-model="form.batchNo" placeholder="请输入批号"></el-input>
            </el-form-item>
            <!--位号-->
            <el-form-item label="工艺批号+线号" prop="lineNo">
              <el-input v-model="form.lineNo" placeholder="请输入工艺批号和线号"></el-input>
            </el-form-item>
            <!--时间编号-->
            <el-form-item label="时间编号" prop="dataNo">
              <el-input v-model="form.dataNo" placeholder="请输入时间编号"></el-input>
            </el-form-item>
            <!--批号-->
            <el-form-item label="班别" prop="class">
              <el-input v-model="form.class" placeholder="请输入批号"></el-input>
            </el-form-item>
            <!--包号1-->
            <el-form-item label="开始包号" prop="startPackageNo">
              <el-input v-model="form.startPackageNo" placeholder="请输入包号"></el-input>
            </el-form-item>
            <!--包号2-->
            <el-form-item label="结束包号" prop="endPackageNo">
              <el-input v-model="form.endPackageNo" placeholder="请输入包号"></el-input>
            </el-form-item>
            <!--种类-->
            <el-form-item label="种类" prop="species">
              <el-input v-model="form.species" placeholder="请输入包号"></el-input>
            </el-form-item>
            <!--规格-->
            <el-form-item label="规格" prop="specification">
              <el-input v-model="form.specification" placeholder="请输入包号"></el-input>
            </el-form-item>
            <!--等级-->
            <el-form-item label="等级" prop="grade">
              <el-input v-model="form.grade" placeholder="请输入包号"></el-input>
            </el-form-item>
            <!--毛重-->
            <el-form-item label="毛重" prop="grossWeight">
              <el-input v-model="form.grossWeight" placeholder="请输入毛重"></el-input>Kg
            </el-form-item>
            <!--净重-->
            <el-form-item label="净重" prop="netWeight">
              <el-input v-model="form.netWeight" placeholder="请输入净重"></el-input>Kg
            </el-form-item>
            <!--打印-->
            <el-button class="margin-left-1" type="primary" @click="print('ruleForm')">打印</el-button>
          </el-form>
        </div>
      </el-row>
    </div>
    <dialog-print :printData="printData"></dialog-print>
  </div>
</template>
<script>
  import dateFns from 'date-fns'
  export default {
    mounted () {
    },
    components: {
      'dialog-print': require('./dialog-print.vue')
    },
    data () {
      return {
        form: {
          workNo: '01',
          productNo: '04',
          productionDate: new Date(),
          batchNo: 'EBM143801',
          lineNo: '001A1',
          dataNo: '1',
          class: '1',
          startPackageNo: '001',
          endPackageNo: '001',
          species: '棉型',
          specification: '1.56dtexX38mm',
          grade: '优等品',
          grossWeight: '381.5',
          netWeight: '380'
        },
        printData: {},
        formRules: {
//          packetDate: [{required: true, message: '请选择时间', type: 'date', trigger: 'blur'}],
//          grade: [{required: true, message: '请输入级别', trigger: 'blur'}],
//          item: [{required: true, message: '请输入位号', trigger: 'blur'}],
//          fallNo: [{required: true, message: '请输入落次', trigger: 'blur,change'}]
        }
      }
    },
    methods: {
      print () {
        console.log('aaa')
        console.log(this.form.productionDate)
        console.log(dateFns.format(this.form.productionDate, 'YYMMDD'))
        let length = this.form.endPackageNo - this.form.startPackageNo + 1
        this.printData = Array(length).fill({}).map((value, index) => {
          let packageNo = this.fill(parseInt(this.form.startPackageNo) + index)
          return {
            ...this.form,
            packageNo: packageNo,
            code: `${this.form.workNo}${this.form.productNo}${dateFns.format(this.form.productionDate, 'YYMMDD')}${this.form.batchNo}${this.form.lineNo}${this.form.dataNo}${this.form.class}${packageNo}`
          }
        })
      },
      fill (index) {
        index += ''
        console.log('index:', index)
        let len = index.length
        console.log('len: ', len)
        if (len === 1) {
          index = '00' + index
        }
        if (len === 2) {
          index = '0' + index
        }
        console.log('index:', index)
        return index
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-input {
    width: 200px;
    margin-right: 10px;
  }

  .content {
    margin: 10px;
    padding: 10px;
    background-color: #fff;
  }

  .change-search {
    position: relative;
    top: 7px;
    text-decoration: underline;
    color: #3b9dd8;
    cursor: pointer;
  }

  .margin-left-1 {
    margin-left: 10px;
  }

  .margin-right-1 {
    margin-right: 5px;
  }

  .margin-right-2 {
    margin-right: 10px;
  }

  .margin-bottom-1 {
    margin-bottom: 10px;
  }

  .margin-bottom-2 {
    margin-bottom: 5px;
  }

  .text-align-right {
    text-align: left;
  }

  .exception {
    cursor: pointer;
  }
</style>

