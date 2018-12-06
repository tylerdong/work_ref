<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="90%" center @close="close">
    <el-form :inline="true" ref="form" :model="search" :rules="rules">
      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker v-model="search.startDate" type="date" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDate">
        <el-date-picker v-model="search.endDate" type="date" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="search.status" clearable>
          <el-option v-for="(item, index) in options.status" :label="item.name" :value="item.value" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item><el-button type="primary" @click="btnSearch">搜索</el-button></el-form-item>
    </el-form>
    <el-table v-if="Array.isArray(tableData) && tableData.length > 0" :data="tableData" element-loading-text="拼命加载中">
      <el-table-column label="开始时间">
        <template slot-scope="scope">{{scope.row.startTime | timeFormat('YYYY-MM-DD HH:mm')}}</template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">{{scope.row.endTime | timeFormat('YYYY-MM-DD HH:mm')}}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{scope.row.status | scheduleStatus}}</template>
      </el-table-column>
      <el-table-column label="描述" prop="exceptionDetail"></el-table-column>
    </el-table>
    <div class="no-data" v-else="">没有数据</div>
    <div class="hy-admin__pagination-wrapper pagger">
      <el-pagination
        class="fr"
        :current-page="page.currentPage"
        :page-sizes="[20, 30, 40, 50]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'
  import {crontabStatus} from '../../../value-label'
  export default {
    data () {
      return {
        dialog: {
          title: '查看日志',
          visible: false
        },
        search: {
          startDate: new Date(),
          endDate: new Date(),
          status: ''
        },
        options: { status: [] },
        itemData: {},
        tableData: [],
        rules: {
          startDate: [
            {required: true, message: '请选择开始时间', trigger: 'blur change'}
            // ,
            // {
            //   required: true,
            //   trigger: 'blur',
            //   validator: (rule, value, callback) => {
            //     if (value && this.search.endDate) {
            //       if (value.getTime() > this.search.endDate.getTime()) {
            //         callback(new Error('开始时间小于结束时间'))
            //       } else {
            //         callback()
            //       }
            //     } else {
            //       callback()
            //     }
            //   }
            // }
          ],
          endDate: [
            {required: true, message: '请选择结束时间', trigger: 'blur change'}
            // ,
            // {
            //   required: true,
            //   trigger: 'blur',
            //   validator: (rule, value, callback) => {
            //     if (value && this.search.startDate) {
            //       if (value.getTime() < this.search.startDate.getTime()) {
            //         callback(new Error('结束时间大于开始时间'))
            //       } else {
            //         callback()
            //       }
            //     } else {
            //       callback()
            //     }
            //   }
            // }
          ]
        },
        page: {
          currentPage: 1,
          total: 20,
          pageSize: 20
        },
        loading: {
          search: false
        }
      }
    },
    mounted () {
      this.options.status = crontabStatus
    },
    methods: {
      toggle (data) {
        this.dialog.visible = true
        this.itemData = data
        this.page.currentPage = 1
        this.getData()
      },
      close () {
        this.dialog.visible = false
      },
      btnSearch () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.getData()
          }
        })
      },
      getData () {
        this.loading.search = true
        let params = {
          scheduleCode: this.itemData.scheduleCode,
          pageNum: this.page.currentPage.toString(),
          pageCount: this.page.pageSize.toString(),
          startDate: this.search.startDate ? dateFns.format(this.search.startDate, 'YYYY-MM-DD') : '',
          endDate: this.search.endDate ? dateFns.format(this.search.endDate, 'YYYY-MM-DD') : '',
          status: this.search.status
        }
        api.automatic.statement.getScheduleLogList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data.scheduleLogBeanList
            this.page.total = data.data.count
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.search = false
        })
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    }
  }
</script>

<style scoped>
 .pagger {
   margin-bottom: 1.5rem;
 }
</style>
