<!--实时查询-->
<template>
  <div>
    <div class="all-wrapper">
      <el-form :inline="true" ref="form":model="search">
        <el-form-item>
          <el-autocomplete v-model="search.palletCode" :fetch-suggestions="querySearchPalletCode" placeholder="请输入托盘编码"
                           @select="palletCodeSelected" clearable>
          </el-autocomplete>
        </el-form-item>

        <el-form-item>
          <el-input v-model="search.productCode" placeholder="请输入码单号" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-autocomplete v-model="search.batchNo" :fetch-suggestions="querySearchBatchNo" placeholder="请输入批号"
                           @select="batchNoSelected" clearable>
          </el-autocomplete>
        </el-form-item>

        <el-form-item>
          <el-select v-model="search.level" placeholder="请选择等级" clearable>
            <el-option :key="item.id" v-for="item in levels" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker v-model="search.beginProductDate" type="date" placeholder="选择开始日期"
                          clearable></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-date-picker v-model="search.endProductDate" type="date" placeholder="选择结束日期"
                          :picker-options="endOptions" clearable></el-date-picker>
        </el-form-item>

        <!--<el-form-item>-->
          <!--<el-select v-model="search.status" placeholder="请选择状态" clearable>-->
            <!--<el-option :key="item.id" v-for="item in palletStatus" :label="item.name" :value="item.value"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->

        <el-form-item>
          <el-select v-model="search.type" placeholder="请选择操作类型" clearable>
            <el-option :key="item.id" v-for="item in palletHistory" :label="item.desc" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchClick('form')" :loading="loading.search">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="main-wrappper">
        <el-table :data="tableData" border>
          <el-table-column prop="palletCode" label="托盘编码" width="120"></el-table-column>
          <el-table-column prop="productCode" label="码单号" width="240"></el-table-column>
          <!--<el-table-column label="状态" width="90">-->
            <!--<template slot-scope="scope">{{scope.row.status | palletStatus}}</template>-->
          <!--</el-table-column>-->
          <el-table-column label="历史操作">
            <template slot-scope="scope">
              <template v-if="scope.row.productTypeVos && scope.row.productTypeVos.length > 0"
                        v-for="(item, index) in scope.row.productTypeVos">
                <el-tag>{{item.desc}}</el-tag><i class="fas fa-angle-right arra-right-font"></i>
              </template>
            </template>
          </el-table-column>
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
  </div>
</template>
<script>
  import * as api from 'api/index'
  export default {
    components: {},
    props: ['palletCodes', 'batcheItems', 'levels', 'palletStatus', 'palletHistory'],
    data () {
      return {
        search: {
          palletCode: '',
          productCode: '',
          batchNo: '',
          level: '',
          beginProductDate: '',
          endProductDate: '',
          status: '',
          type: ''
        },
        endOptions: {
          disabledDate: (time) => {
            if (this.search.startDate) {
              return time.getTime() < this.search.startDate.getTime()
            }
          }
        },
        page: {current: 1, size: 15, total: 0},
        loading: {search: false},
        tableData: []
      }
    },
    mounted () {
      // this.getData()
    },
    methods: {
      querySearchPalletCode  (queryString, cb) {
        if (queryString) {
          let result = this.palletCodes.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.palletCodes)
        }
      },
      querySearchBatchNo (queryString, cb) {
        if (queryString) {
          let result = this.batcheItems.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.batcheItems)
        }
      },
      palletCodeSelected () {
        // TODO
      },
      batchNoSelected () {
        // TODO
      },
      searchClick () {
        this.page.current = 1
        this.getData()
      },
      getData () {
        this.loading.search = true
        console.log(this.search)
        let param = {
          palletCode: this.search.palletCode,
          productCode: this.search.productCode,
          batchNo: this.search.batchNo,
          level: this.search.level,
          beginProductDate: this.search.beginProductDate ? this.search.beginProductDate.getTime() : '',
          endProductDate: this.search.endProductDate ? this.search.endProductDate.getTime() : '',
          // status: this.search.status,
          type: this.search.type,
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.storage.warehouseManagement.getPalletProductsHis(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data.list
            this.page.total = data.data.count
          } else {
            this.tableData = []
            this.$message({type: 'error', message: data.message})
          }
        }).finally(() => {
          this.loading.search = false
        })
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .no-data{
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #666;
  }
  .font-bold{
    font-weight: bold;
  }
  .all-wrapper{
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    border-radius: 3px;
  }
  .action-bar{
    padding-bottom: 10px;
    .el-input{
      width: 250px;
      display: inline-block;
      margin-right: 10px;
    }
    .el-date-editor.el-input {
      width: 190px;
    }
  }
  .list-item{
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
    margin-bottom: 10px;
    position: relative;
  }
  .line{
    display: flex;
  }
  .line2-item1{
    flex: 9;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #eef2f6;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .line2-item2{
    flex: 87;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .dye-box{
    flex: 80;
    overflow: hidden;
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
  }
  .dye-item{
    width: 8.3333%;
    float: left;
  }
  .daye-itme-index{
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .daye-itme-info{
    height: 38px;
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
    padding: 6px;
  }
  .daye-itme-info-btn{
    border-radius: 3px;
    border: 1px solid #d2d6de;
    height: 24px;
    background-color: #d9dfe5;
    line-height: 24px;
    &.hand{
      cursor: pointer;
    }
    &.red{
      background-color: #ff4949;
      border-color: #ff4949;
    }
  }
  .submit-box{
    flex: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line1-item{
    flex: 9;
    height: 42px;
    line-height: 42px;
    background-color: #eef2f6;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
    text-align: right;
  }
  .line1-item2{
    flex: 15;
    height: 42px;
    line-height: 42px;
    text-indent: 10px;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .arra-right-font {
    color: rgb(131, 146, 165)
  }
</style>
