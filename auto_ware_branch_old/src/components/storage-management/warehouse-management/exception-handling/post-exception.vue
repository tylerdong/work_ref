<!-- 过账异常 -->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <div class="fr">
        <el-input class="width1" v-model="search.deliveryNo" placeholder="请输入交货编号"></el-input>
        <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
        <el-button @click="repost" :loading="loading.in" type="primary">重新过账</el-button>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading.table" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="交货编号">
        <template slot-scope="scope">
          <el-tag class="tags" v-for="(item,index) in scope.row.deliveryNos" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="异常信息">
        <template slot-scope="scope">
          <el-tag class="tags" v-for="(item,index) in scope.row.messages" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page.currentPage"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import {productTypes} from '../../value-label.js'
  export default {
    components: {},
    data () {
      return {
        dtBaseStart: '',
        dtBaseEnd: '',
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.dtBaseStart) {
              return time.getTime() > this.dtBaseStart
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.dtBaseEnd) {
              return time.getTime() < this.dtBaseEnd
            }
          }
        },
        search: {
          deliveryNo: '',
          startDate: '',
          endDate: ''
        },
        tableData: [],
        multipleSelection: [],
        loading: {
          table: false,
          in: false
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    filters: {
      productTypes: (val) => {
        if (val) {
          for (let item of productTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      repost () {
        if (!this.multipleSelection.length) {
          this.$message('请选择过账的数据')
          return
        }
        let primaryIdList = []
        for (let item of this.multipleSelection) {
          primaryIdList.push(item.primaryId)
        }
        this.loading.in = true
        api.storage.warehouseManagement.repost({
          primaryIdList: primaryIdList
        }).then(response => {
          if (response.data.messageType === 1) {
            this.$message.success('重新过账成功')
            this.getData()
          }
        }).finally(() => {
          this.loading.in = false
        })
      },
      getData () {
        this.loading.table = true
        this.tableData = []
        let param = {
          deliveryNo: this.search.deliveryNo,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.storage.warehouseManagement.getRequisitionFailPostList(param).then(response => {
          const data = response.data
          this.page.total = data.data.count
          this.tableData = data.data.list
        }).finally(() => {
          this.loading.table = false
        })
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.search.startDate.getTime() + 8.64e7
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.search.endDate.getTime() - 8.64e7
        } else {
          this.dtBaseStart = ''
        }
      },
      /* 分页 */
      sizeChange (val) {
        this.page.size = val
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      currentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-wrapper {
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }

  .action-bar {
    padding: 10px 0;
  }

  .tags {
    margin-right: 10px
  }
</style>
