<!-- 丝锭异常状态 -->
<template>
  <div>
    <div class="content">
      <el-row>
        <div class="margin-bottom-1 text-align-right">
          <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px" :inline="true">
            <!--时间-->
            <el-form-item label="打包时间" prop="packetDate">
              <el-date-picker v-model="form.packetDate" type="date" :picker-options="datePickerOptions" placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <!--级别-->
            <el-form-item label="等级" prop="grade">
              <el-input v-model="form.grade" placeholder="请输入级别"></el-input>
            </el-form-item>
            <!--位号-->
            <el-form-item label="位号" prop="item">
              <el-input v-model="form.item" placeholder="请输入位号"></el-input>
            </el-form-item>
            <!--落次-->
            <el-form-item label="落次" prop="fallNo">
              <el-input v-model="form.fallNo" placeholder="请输入落次"></el-input>
            </el-form-item>
            <!--批号-->
            <el-form-item label="批号">
              <el-input v-model="form.batchNo" placeholder="请输入批号"></el-input>
            </el-form-item>
            <!--锭号-->
            <el-form-item label="锭号">
              <el-input v-model="form.spindleNo" placeholder="请输入锭号"></el-input>
            </el-form-item>
            <!--线别-->
            <el-form-item label="线别">
              <el-select v-loading="loading.line" v-model="form.lineId" placeholder="请选择线别" clearable>
                <el-option v-for="item in lineOptions" :key="item.id" :label="item.line" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <!--班次ID-->
            <el-form-item label="班次">
              <el-select v-loading="loading.classes" v-model="form.packclass" placeholder="请选择线别" clearable>
                <el-option v-for="item in classIDs" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <!--查询按钮-->
            <el-button class="margin-left-1" type="primary" @click="getData('ruleForm')">查询</el-button>
          </el-form>
        </div>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
        <el-table-column prop="batchNo" label="批号"></el-table-column>
        <el-table-column prop="spec" label="规格" width="200"></el-table-column>
        <el-table-column prop="spindleNo" label="锭号"></el-table-column>
        <el-table-column prop="silkBoxCode" label="箱单号" width="280"></el-table-column>
        <el-table-column prop="silkBoxStatus" label="箱单状态"></el-table-column>
        <el-table-column prop="warehouse" label="仓库"></el-table-column>
        <el-table-column prop="storage" label="库位"></el-table-column>
        <el-table-column label="打包时间" width="200">
          <template slot-scope="scope">{{ scope.row.packetTime | timeFormat('YYYY-MM-DD HH:mm') }}</template>
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
  import ElBreadcrumbItem from '../../../../../node_modules/element-ui/packages/breadcrumb/src/breadcrumb-item.vue'
  export default {
    mounted () {
      this.getLineOptions()
      this.getClassesOptions()
    },
    components: {ElBreadcrumbItem},
    data () {
      return {
        tableData: [],
        lineOptions: [],
        classIDs: [],
        datePickerOptions: {
          disabledDate: (time) => {
            if (this.dtBaseStart) {
              return time.getTime() > this.dtBaseStart
            }
          }
        },
        form: {
          batchNo: '',
          packetDate: '',
          grade: '',
          item: '',
          fallNo: '',
          spindleNo: '',
          lineId: '',
          packclass: ''
        },
        formRules: {
          packetDate: [{required: true, message: '请选择时间', type: 'date', trigger: 'blur'}],
          grade: [{required: true, message: '请输入级别', trigger: 'blur'}],
          item: [{required: true, message: '请输入位号', trigger: 'blur'}],
          fallNo: [{required: true, message: '请输入落次', trigger: 'blur,change'}]
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          line: false,
          classes: false,
          table: false
        }
      }
    },
    methods: {
      // 选择线别
      getLineOptions () {
        this.loading.line = true
        api.automatic.productPlan.getAllLine({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.lineOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.line = false
        })
      },
      // 选择班次ID
      getClassesOptions () {
        this.loading.classes = true
        api.automatic.dictionary.getAllClassesList({}).then((response) => {
          const data = response.data
          this.classIDs = data.data
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.classes = false
        })
      },
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
            batchNo: this.form.batchNo,
            packetDate: dateFns.format(this.form.packetDate, 'YYYY-MM-DD'),
            grade: this.form.grade,
            item: this.form.item,
            fallNo: this.form.fallNo,
            spindleNo: this.form.spindleNo,
            lineId: this.form.lineId,
            packclass: this.form.packclass
          }
          api.automatic.barCode.getflipPackInfo(param).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.page.total = data.data.count
              this.tableData = data.data.list
            }
          }).catch(e => {
          }).finally(() => {
            this.loading.table = false
          })
        })
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
