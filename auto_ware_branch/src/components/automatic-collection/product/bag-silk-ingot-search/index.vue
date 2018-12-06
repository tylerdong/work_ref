<!-- 短纤丝锭查询 -->
<template>
  <div>
    <div class="content">
      <el-row>
        <div class="margin-bottom-1 text-align-right">
          <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px" :inline="true">
            <el-form-item label="码单号" prop="boxCode">
              <el-input class="el-input" v-model="form.boxCode" placeholder="请输入码单号"></el-input>
            </el-form-item>
            <el-button class="margin-left-1" type="primary" @click="getData('ruleForm')">查询</el-button>
            <!--<el-button class="margin-left-1" type="primary" @click="downLoadExcel('ruleForm')">下载</el-button>-->
          </el-form>
        </div>
      </el-row>
      <el-row class="row-item">
        <el-col :span="4">箱单号：{{tableData.length > 0 ? tableData[0].boxCode : ''}}</el-col>
        <el-col :span="2">批号：{{tableData.length > 0 ? tableData[0].batchNo : ''}}</el-col>
        <el-col :span="2">规格：{{tableData.length > 0 ? tableData[0].spec : ''}}</el-col>
        <el-col :span="2">等级：{{tableData.length > 0 ? tableData[0].grade : ''}}</el-col>
        <el-col :span="2">数量：{{tableData.length > 0 ? tableData[0].num : ''}}</el-col>
        <el-col :span="2">管色：{{tableData.length > 0 ? tableData[0].paperTube : ''}}</el-col>
        <el-col :span="2">净重：{{tableData.length > 0 ? tableData[0].netWeight : ''}}</el-col>
        <el-col :span="2">毛重：{{tableData.length > 0 ? tableData[0].grossWeight : ''}}</el-col>
        <el-col :span="4">生产日期：{{productDate}}</el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
        <el-table-column prop="silkCode" label="丝锭编号" width="280"></el-table-column>
        <el-table-column prop="productName" label="品名"></el-table-column>
        <el-table-column prop="spec" label="规格" width="220"></el-table-column>
        <el-table-column prop="batchNo" label="批号" width="110"></el-table-column>
        <el-table-column prop="grade" label="等级" width="100"></el-table-column>
        <el-table-column prop="lineName" label="线别" width="100"></el-table-column>
        <el-table-column prop="item" label="位号" width="100"></el-table-column>
        <el-table-column prop="fallNo" label="落次" width="100"></el-table-column>
        <el-table-column prop="spindleNo" label="锭号" width="100"></el-table-column>
        <el-table-column prop="silkWeight" label="锭重" width="100"></el-table-column>
        <el-table-column label="生产日期" width="300">
          <template slot-scope="scope">{{ scope.row.productDate | timeFormat('YYYY-MM-DD') }}</template>
        </el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper cf">
        <el-pagination
          class="fr"
          :current-page="page.current"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'
  export default {
    mounted () {
    },
    components: {},
    data () {
      return {
        form: {
          boxCode: ''
        },
        productDate: '',
        tableData: [],
        formRules: {
          boxCode: [{required: true, message: '请输入码单号', trigger: 'blur'}]
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          table: false
        }
      }
    },
    methods: {
      // 查询
      getData (formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return
          }
          this.loading.table = true
          let param = {
            pageIndex: this.page.current,
            pageCount: this.page.size,
            boxCode: this.form.boxCode
          }
          api.automatic.barCode.getSilkListByBoxCode(param).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.page.total = data.data.count
              this.tableData = data.data.list
              this.productDate = dateFns.format(data.data.list[0].productDate, 'YYYY-MM-DD')
            }
          }).catch(e => {
          }).finally(() => {
            this.loading.table = false
          })
        })
      },
      // 下载excel
      downLoadExcel (formName) {
        // TODO
        // let blob = new Blob([this.data], {type: 'octet/stream'})
        // let url = window.URL.createObjectURL(blob)
        // let a = document.createElement('a')
        // document.body.appendChild(a)
        // a.style = 'display: none'
        // a.href = url
        // a.download = this.filename
        // a.click()
        // window.URL.revokeObjectURL(url)
      },
      // 分页
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getData('ruleForm')
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getData('ruleForm')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-input {
    width: 26rem;
    margin-right: 10px;
  }
  .row-item { margin-bottom: 22px; font-size: 1.4rem }
</style>
