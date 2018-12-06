<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <el-button type="primary" @click="btnAdd">新增</el-button>
        <el-button type="primary" @click="getData">查询</el-button>
      </div>
      <!--table-->
      <el-table :data="tableData" border :loading="loading.table">
        <el-table-column prop="ruleName" label="名称"></el-table-column>
        <el-table-column prop="code" label="编码"></el-table-column>
        <el-table-column prop="kpiRuleTypeName" label="规则类型"></el-table-column>
        <!--<el-table-column prop="orgName" label="组织机构"></el-table-column>-->
        <!--<el-table-column prop="workShopName" label="车间"></el-table-column>-->
        <!--<el-table-column prop="lineName" label="线别"></el-table-column>-->
        <!--<el-table-column label="度量">-->
          <!--<template slot-scope="scope">{{scope.row.dataType | dataType}}</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="类型">-->
          <!--<template slot-scope="scope">{{scope.row.formatType | formatType}}</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="时间">-->
          <!--<template slot-scope="scope">{{scope.row.timeType | timeType}}</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="silkGradeName" label="等级"></el-table-column>-->
        <el-table-column label="上限 | 开启">
          <template slot-scope="scope">
            {{scope.row.upperThreshold}} | {{scope.row.isWarningUpper | booleanFormat}}
          </template>
        </el-table-column>
        <el-table-column label="下限 | 开启">
          <template slot-scope="scope">
            {{scope.row.lowerThreshold}} | {{scope.row.isWarningLower | booleanFormat}}
          </template>
        </el-table-column>
        <el-table-column label="是否开启">
          <template slot-scope="scope">{{scope.row.isActive | booleanFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="btnUpdate(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="fr"
        style="text-align: right;margin-top: 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>

    </div>
    <dialog-edit ref="dialogEdit" @submitSuccess="getData"></dialog-edit>
  </div>
</template>
<script>
  import * as api from 'src/api'
  // import dateFns from 'date-fns'
  export default {
    components: {
      'dialog-edit': require('./dialog-edit')
    },
    mounted () {
      this.getData()
    },
    data () {
      return {
        tableData: [],
        loading: { table: false },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      btnAdd () {
        this.$refs.dialogEdit.show()
      },

      btnUpdate (data) {
        this.$refs.dialogEdit.show(data)
      },

      // 查询
      getData () {
        this.loading.table = true
        this.tableData = []
        this.page.total = 0
        let param = {
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.dataAnalysis.getKpiRuleInfoList(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data.list
            this.page.total = data.data.count
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).finally(() => {
          this.loading.table = false
        })
      },
      // 配置
      kpiConfig (data) {
        this.$refs.dialogPersonConfig.show(data)
      },
      /* 分页 */
      handleSizeChange (size) {
        this.page.size = size
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      handleCurrentChange (currentPage) {
        this.page.currentPage = currentPage
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    background: #fff;
    border: 1px solid #dee4ec;
    margin: 10px 10px;
    padding: 10px;
    border-radius: 0 5px 5px 5px;
  }

  .width-1 {
    width: 240px;
  }

  .margin-right-1 {
    margin-right: 5px;
  }

  .margin-bottom-1 {
    margin-bottom: 5px;
  }
</style>
