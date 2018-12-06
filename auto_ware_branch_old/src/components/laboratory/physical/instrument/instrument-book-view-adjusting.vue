<template>
  <div>
    <div>
      <el-table :data="tableData" border v-loading="loading.table" element-loading-text="拼命加载中">
        <el-table-column label="校准日期" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.calibrationDate | timeFormat('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="calibrationCompany" label="校准单位" show-overflow-tooltip></el-table-column>
        <el-table-column label="预计下次校准日期" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.planNextCalibrationDate | timeFormat('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="register" label="登记人" show-overflow-tooltip></el-table-column>
        <el-table-column label="登记日期" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.registerDate | timeFormat('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
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
</template>
<script>
  import * as api from '../../../../api/index'

  export default {
    props: ['instrumentId'],
    data () {
      return {
        loading: {
          table: false
        },
        tableData: [],
        page: {
          current: 1,
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      getListData () { // 获取列表结构
        this.loading.table = true
        let params = {
          qureyLabInstrumentCalibrationCo: {
            instrumentId: this.instrumentId
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.labInstrumentCalibration.getLabInstrumentCalibrationDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.tableData = []
              return
            }
            this.tableData = data.data.data
            this.page.total = data.data.count
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getListData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getListData()
      }
    }
  }
</script>
<style scoped>
  .left-tree {
    border-right: 1px solid #dee4ec;
  }

  .flex-div-row {
    display: flex;
    flex-direction: row;
  }

  .flex-div-column {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    width: 100%;
  }

  .select-box {
    width: 16rem;
  }

  .check_pending_table {
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    min-width: 100%;
  }

  .check_pending_table tr th {
    min-width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
  }

  .check_pending_table tr td {
    min-width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc
  }
</style>
