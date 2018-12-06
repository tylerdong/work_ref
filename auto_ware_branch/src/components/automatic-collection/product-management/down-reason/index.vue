<template>
  <div>
    <!--<main-breadcrumb nameId="020304"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="workType.id" placeholder="请选择所属工种" clearable>
            <el-option
              v-for="item in workTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="getData">查询</el-button>
          <!--<el-button type="primary" @click="chooseFun('add')">新增</el-button>-->
        </div>
      </div>

      <el-table :data="tableData" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="异常原因" show-overflow-tooltip></el-table-column>
        <el-table-column prop="downGradeReasonTypeName" label="异常原因类型" show-overflow-tooltip></el-table-column>
        <el-table-column label="产品工艺" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="tag in scope.row.productProcessList" :key="tag.id" class="tags">{{tag.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="所属工种" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="tag in scope.row.workTypeLsit" :key="tag.id" class="tags">{{tag.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="所属车间" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="tag in scope.row.workshopList" :key="tag.id" class="tags">{{tag.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="产品" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="(tag,index) in scope.row.productList" :key="index" class="tags">{{tag.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="编号" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click.native.prevent="chooseFun('edit', scope)" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="hy-admin__pagination-wrapper">
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
      <D_dialog ref="refDialog" @callback="callback" :downGradeList="downGradeList" :productProcessList="productProcessList"
                :workTypeList="workTypeList" :workShopList="workShopList" :type="type" :productTypeList="productTypeList"></D_dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from '../../../../api/index'
  export default {
    components: {
      'D_dialog': require('./dialog.vue')
      // 'main-breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        type: '',
        downGradeList: [],
        productProcessList: [],
        workTypeList: [],
        workShopList: [],
        productTypeList: [],
        workType: {
          id: '',
          name: ''
        },
        tableData: [],
        input: '',
        page: {
          currentPage: 1,
          total: 20,
          pageSize: 20
        },
        loading: false
      }
    },
    mounted () {
      this.getData()
      this.getDownGradeList()
      this.getAllProcess()
      this.getAllWorkType()
      // 获取所有车间
      this.getAllWorkShop()
      // 获取产品
      this.getProductTypeIdOptions()
    },
    methods: {
      getData () {
        this.tableData = []
        this.loading = true
        let params = {
          workTypeId: this.workType.id,
          pageIndex: this.page.currentPage,
          pageCount: this.page.pageSize
        }
        api.automatic.productInfo.getDownGrade(params).then(response => {
          if (response.data.messageType === 1) {
            this.tableData = response.data.data.list
            this.page.total = response.data.data.count
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading = false
        })
      },
      getDownGradeList () {
        let params = {}
        api.automatic.dictionary.getAllDownGradeReasonTypeList(params).then(response => {
          if (response.data.messageType === 1) {
            this.downGradeList = response.data.data
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      getAllProcess () {
        let params = {}
        api.automatic.dictionary.getAllProductProcessList(params).then(response => {
          if (response.data.messageType === 1) {
            this.productProcessList = response.data.data
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      getAllWorkType () {
        let params = {}
        api.automatic.dictionary.getAllWorkTypeList(params).then(response => {
          if (response.data.messageType === 1) {
            this.workTypeList = response.data.data
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      getAllWorkShop () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          this.workShopList = response.data.data.map(item => {
            return { id: item.id, name: item.name }
          })
        })
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      },
      chooseFun (type, scope) {
        if (type === 'add') {
          this.$refs.refDialog.$refs.newInfo.resetFields()
          this.$refs.refDialog.toggle({
            title: '新增',
            id: '',
            name: '',
            downGradeReasonTypeId: '',
            downGradeReasonTypeName: '',
            productProcessList: [], // 产品工艺
            workTypeLsit: [], // 所属工种,
            workshopList: [], // 所属车间
            productList: [], // 产品
            number: '',
            disabled: false,
            dialogFormVisible: true
          })
        } else if (type === 'edit') {
          const productProcessList = scope.row.productProcessList.map((item) => {
            return item.id
          })
          const workTypeLsit = scope.row.workTypeLsit.map((item) => {
            return item.id
          })
          this.$refs.refDialog.toggle({
            title: '修改',
            id: scope.row.id,
            name: scope.row.name,
            downGradeReasonTypeId: scope.row.downGradeReasonTypeId,
            downGradeReasonTypeName: scope.row.downGradeReasonTypeName,
            workshopList: scope.row.workshopList.map(item => { return item.id }),
            productProcessList, // 产品工艺
            workTypeLsit, // 所属工种
            productList: scope.row.productList.map(item => { return item.name }),
            number: scope.row.number,
            disabled: true,
            dialogFormVisible: true
          })
        }
        this.type = type
      },
      // 获取所有产品
      getProductTypeIdOptions () {
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.productTypeList = data.data
          }
        })
      },
      callback () {
        this.getData()
      }
    }
  }
</script>
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
</style>
