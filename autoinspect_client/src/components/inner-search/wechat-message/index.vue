<template>
  <div>
    <el-form :inline="true" label-position="left" class="div-form-container" label-width="100px">
      <el-form-item label="按时间段查询">
        <el-date-picker v-model="search.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间" class="input-item-l-m"></el-date-picker>
        至
        <el-date-picker v-model="search.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" class="input-item-l-m"></el-date-picker>
      </el-form-item>
      <el-form-item label="消息类型">
        <el-select v-model="search.messageType" clearable placeholder="请选择类型">
          <el-option v-for="(item, index) in option.messageType" :key="index" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="search.keywords" clearable placeholder="请输入关键字，模糊查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData" :loading="loading.search">查找</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border @sort-change="sortChange" :loading="loading.table">
      <el-table-column label="序号" width="78" prop="id" sortable="custom"></el-table-column>
      <el-table-column label="线别编码" width="108" prop="linecode"></el-table-column>
      <el-table-column label="发送类型" width="78" prop="sendtype"></el-table-column>
      <el-table-column label="发送时间" width="135" prop="gmt_create" sortable="custom">
        <template slot-scope="scope">{{scope.row.gmtCreate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
      </el-table-column>
      <el-table-column label="发送内容" prop="content"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="page.current"
                   :page-sizes="page.sizes"
                   :page-size="page.size"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="page.total"
                   class="pagenation">
    </el-pagination>
  </div>
</template>

<script>
import * as api from '../../../api/index'
// import dateFns from 'date-fns'
export default {
  components: {},
  data () {
    return {
      search: {
        messageType: '',
        startTime: '',
        endTime: '',
        keywords: '',
        order: ''
      },
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      tableData: [],
      option: { messageType: {} },
      loading: { search: false }
    }
  },
  watch: {
  },
  mounted () {
    this.getData()
    this.getSendType()
  },
  methods: {
    sortChange ({col, prop, order}) {
      if (prop) {
        this.search.order = prop + ' ' + ((order === 'descending') ? 'desc' : 'asc')
      }
      this.getData()
    },
    getSendType () {
      api.innerDefect.getSendType({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.messageType = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      })
    },
    getData () {
      let param = {
        pageIndex: this.page.current,
        pageCount: this.page.size,
        startTime: this.search.startTime ? this.search.startTime : '',
        endTime: this.search.endTime ? this.search.endTime : '',
        sendType: this.search.messageType,
        keywords: this.search.keywords.trim(),
        order: this.search.order
      }
      this.loading.search = true
      this.tableData = []
      this.page.total = 0
      api.innerDefect.getSendwachatRecord(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.tableData = data.data.list
          this.page.total = data.data.count
          this.page.current = data.data.pageIndex
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.search = false
      })
    },
    handleSizeChange (size) {
      this.page.size = size
      this.getData()
    },
    handleCurrentChange (current) {
      this.page.current = current
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
