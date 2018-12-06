<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button type="primary" @click="add">新增</el-button>
        </div>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading.body="loading.table">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="code" label="编码"></el-table-column>
          <el-table-column label="维度">
            <template slot-scope="scope">
              {{scope.row.hasOwnProperty('kpiRuleDimensionList') && Array.isArray(scope.row.kpiRuleDimensionList) ?
              scope.row.kpiRuleDimensionList.map(item => { return item.dimensionName }).join(',') : '' }}
            </template>
          </el-table-column>
          <el-table-column label="数据类型">
            <template slot-scope="scope">{{scope.row.dataType | dataType}}</template>
          </el-table-column>
          <el-table-column label="格式类型">
            <template slot-scope="scope">{{scope.row.formatType | formatType}}</template>
          </el-table-column>
          <el-table-column label="时间类型">
            <template slot-scope="scope">{{scope.row.timeType | timeType}}</template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="edit(scope.row)" type="text">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <dialog-edit ref="refDialog" @confirmSuccess="getData"></dialog-edit>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-edit': require('./dialog-edit.vue')
    },
    data () {
      return {
        tableData: [],
        loading: {table: false},
        page: {
          index: 1,
          total: 20,
          pageSize: 30,
          count: 10
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.loading.table = true
        this.tableData = []
        api.dataAnalysis.getKpiRuleType({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      add () {
        this.$refs.refDialog.show()
      },
      edit (data) {
        this.$refs.refDialog.show(data)
      }
    }
  }
</script>
