<!-- 机台机车管理 -->
<template>
  <div>
    <div class="hy-admin__main-container">
      <el-form :inline="true" ref="form" :model="searchInfo" label-width="8rem" class="form-padding">
        <el-form-item label="车间">
          <el-select v-model="searchInfo.workShopId" placeholder="请选择车间" clearable @change="getProductLine" class="input-item">
            <el-option v-for="item in option.shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线别">
          <el-select v-model="searchInfo.lineId" clearable placeholder="请选择线别" :loading="loading.selectLine" class="input-item">
            <el-option v-for="item in option.productLineList" :key="item.id" :label="item.line" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="落桶方式">
          <el-select v-model="searchInfo.doffType" clearable placeholder="请选择落桶方式">
            <el-option v-for="item in option.doffTypes" :key="item.id" :label="item.name" :value="item.value" class="input-item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机位号">
          <el-input v-model="searchInfo.item" placeholder="请输入开始位号" type="number" class="input-item"></el-input>
        </el-form-item>
        <!--<el-form-item label="结束位号">-->
          <!--<el-input-number v-model="searchInfo.itemEnd" placeholder="请输入结束位号" :min="1" :max="99999999" class="input-item"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="卷绕头数">-->
          <!--<el-input-number v-model="searchInfo.partNum" placeholder="请输入卷绕头数" :min="1" :max="99999999" class="input-item"></el-input-number>-->
        <!--</el-form-item>-->
        <el-form-item label="">
          <el-button type="primary" @click="btnSearch('form')" :loading="loading.search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="btnAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
        <el-table-column prop="workShop" label="所属车间"></el-table-column>
        <el-table-column prop="line" label="线别"></el-table-column>
        <el-table-column prop="item" label="机台位号"></el-table-column>
        <el-table-column prop="partNum" label="卷绕头数"></el-table-column>
        <el-table-column label="落桶方式">
          <template slot-scope="scope">{{scope.row.doffType | doffType}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="btnEdit(scope.row)">修改</el-button>
            <el-button type="text" @click="btnDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper">
        <el-pagination
          class="fr"
          style="text-align: right;"
          @size-change="btnSizeChange"
          @current-change="btnCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="pages.sizes"
          :page-size="pages.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total">
        </el-pagination>
      </div>

      <!-- 新增打印顺序 -->
      <dialog-add ref="refDialogAdd" :shop-list="option.shopList" @submitSuccess="getData"></dialog-add>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import {doffTypes} from 'value-label'

  export default {
    components: {
      'dialog-add': require('./dialog-add.vue')
    },
    mounted () {
      this.option.doffTypes = doffTypes
      this.getShopList()
    },
    data () {
      return {
        searchInfo: {
          workShopId: '',
          lineId: '',
          doffType: '',
          item: '',
          partNum: ''
        },
        option: {
          shopList: [],
          productLineList: [],
          doffTypes: []
        },
        loading: {
          search: false,
          table: false,
          selectLine: false
        },
        rules: {
          workShopId: [
            {required: true, message: '请选择车间', trigger: 'change'}
          ],
          lineId: [
            {required: true, message: '请选择线别', trigger: 'change'}
          ]
        },
        tableData: [],
        pages: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      getData () {
        this.loading.search = true
        let param = {
          workShopId: this.searchInfo.workShopId,
          lineId: this.searchInfo.lineId,
          item: this.searchInfo.item,
          doffType: this.searchInfo.doffType,
          partNum: '',
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }
        api.automatic.other.getDoffRuleGroupInfo(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            if (data.data.list.length > 0) {
              this.tableData = data.data.list
              this.pages.total = data.data.count
            } else {
              this.tableData = []
              this.pages.total = 0
            }
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.search = false
        })
      },

      /* 获取所有车间信息 */
      getShopList () {
        this.option.shopList = []
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          for (let item of data.data) {
            this.option.shopList.push({
              id: item.id,
              name: item.name
            })
          }
        })
      },

      /* 根据车间获取线别 */
      getProductLine (id) {
        this.searchInfo.lineId = ''
        this.option.productLineList = []
        if (id) {
          this.loading.selectLine = true
          api.automatic.productPlan.getAllLine({workShopId: id}).then(response => {
            const data = response.data
            if (data.messageType === 1 && data.data.length > 0) {
              this.option.productLineList = data.data
            }
          }).finally(() => {
            this.loading.selectLine = false
          })
        }
      },

      /* 搜索 */
      btnSearch () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.getData()
          }
        })
      },

      /* 添加 */
      btnAdd () {
        this.$refs.refDialogAdd.btnOpen(undefined)
      },

      /* 修改 */
      btnEdit (data) {
        this.$refs.refDialogAdd.btnOpen(data)
      },

      /* 删除 */
      btnDelete (data) {
        this.$confirm('是否确定删除该打印规则？', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          let param = { id: data.doffSeqId, item: data.item }
          api.automatic.other.delectDoffRuleGroupInfo(param).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.$message({type: 'success', message: data.message})
              this.getData()
            }
          }).catch(error => {
            console.log(error)
          })
        })
      },

      /* 分页 */
      btnSizeChange (size) {
        this.pages.size = size
        if (this.pages.currentPage === 1) {
          this.getData()
        } else {
          this.pages.currentPage = 1
        }
      },

      btnCurrentChange (currenPage) {
        this.pages.currentPage = currenPage
        this.getData()
      }
    }
  }
</script>
