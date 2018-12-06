<!-- 丝车管理 -->
<template>
  <div>
    <!--<breadcrumb nameId="020104"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <el-select
          v-model="searchInfo.searchInput"
          filterable
          placeholder="按选择车间"
          :loading="loading.selectShop"
          @change="selectChangeShop" clearable>
          <el-option
            v-for="item in list.shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input class="width1" v-model="searchInfo.numberStart" placeholder="请输入起始丝车编号" ></el-input>
        <el-input class="width1" v-model="searchInfo.numberEnd" placeholder="请输入结束丝车编号" ></el-input>
        <el-button type="primary" @click="btnSearch" icon="el-icon-search" :loading="searchInfo.loading"></el-button>
        <div class="fr">
          <el-button type="primary" @click="btnAdd">新增</el-button>
          <el-button type="primary" :loading="loading.print" @click="printClick">条码打印</el-button>
          <!--<el-button type="primary">导入</el-button>-->
          <!--<el-button type="primary">条码打印</el-button>-->
        </div>
      </div>
      <template>
        <el-table :data="list.tableData" border style="width: 100%" v-loading="loading.table"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="workshopName" min-width="100" label="所属车间"></el-table-column>
          <el-table-column prop="number" label="丝车编号" min-width="100"></el-table-column>
          <el-table-column prop="code" label="丝车条码" min-width="100"></el-table-column>
          <el-table-column prop="specification" label="丝车规格"></el-table-column>
          <el-table-column prop="supplier" label="厂商"></el-table-column>
          <el-table-column prop="brand" label="品牌" min-width="200"></el-table-column>
          <el-table-column prop="describe" label="描述" min-width="200"></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button
                @click="btnEdit(scope.row)"
                type="text"
                size="small">
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
    </div>

    <!--打印份数，类型-->
    <el-dialog title="提示" :visible.sync="printDialogVisible" width="30%">
      <el-form :model="printForm" :rules="rules" ref="printForm" label-width="100px">
        <el-form-item label="打印份数" prop="number">
          <el-input-number v-model="printForm.number" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="类型" prop="printType">
          <el-select v-model="printForm.printType" clearable placeholder="请选择打印类型">
            <el-option v-for="item in list.printTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="printConfirmClick('printForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增丝机 -->
    <dialog-add
      ref="refDialogAdd"
      :shop-list="list.shopList"
      @callback-refresh-data="getData">
    </dialog-add>

    <dialog-edit
      ref="refDialogEdit"
      :shop-list="list.shopList"
      @callback-refresh-data="getData">
    </dialog-edit>

    <!--打印弹出框-->
    <print ref="printDialog"></print>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'dialog-add': require('./dialog-add.vue'),
      'dialog-edit': require('./dialog-edit.vue'),
      'print': require('./print.vue')
    },
    mounted () {
      this.getData()
      this.getShopList()
    },
    data () {
      return {
        searchInfo: {
          loading: false,
          searchInput: '',
          numberStart: '',
          numberEnd: ''
        },
        list: {
          tableData: [],
          shopList: [],
          printTypes: [
            {name: '条形码', value: 'barCode'},
            {name: '二维码', value: 'qrCode'}
          ]
        },
        printDialogVisible: false,
        printForm: { number: 1, printType: 'barCode' },
        rules: {
          printType: [{required: true, message: '请选择打印类型', trigger: 'blur'}]
        },
        checked: [],
        loading: {
          table: false,
          selectShop: false,
          print: false
        },
        pages: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.checked = val
        console.log(this.checked)
      },
      getData () {
        this.searchInfo.loading = true
        this.loading.table = true
        this.list.tableData = []
        api.automatic.device.getSilkCarList({
          workshopId: this.searchInfo.searchInput,
          numberStart: this.searchInfo.numberStart,
          numberEnd: this.searchInfo.numberEnd,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.list.tableData = data.data.list
          }
        }).finally(() => {
          this.searchInfo.loading = false
          this.loading.table = false
        })
      },
      /* 获取所有车间信息 */
      getShopList () {
        this.list.shopList = []
        this.loading.selectShop = true
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          for (let item of data.data) {
            this.list.shopList.push({
              id: item.id,
              name: item.name
            })
          }
        }).finally(() => {
          this.loading.selectShop = false
        })
      },

      /* 线别选择 */
      selectChangeShop (id) {
        this.searchInfo.searchInput = id
      },

      /* 搜索 */
      btnSearch () {
        this.getData()
      },
      printClick () {
        if (!this.checked.length) {
          this.$message('清选择要打印条码的丝车')
          return
        }
        this.printDialogVisible = true
      },
      printConfirmClick (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let printData = []
            for (let item of this.checked) {
              printData.push({code: item.code, name: item.number, carType: item.carType})
            }
            this.$refs.printDialog.print(printData, this.printForm)
            return true
          } else {
            return false
          }
        })
      },
      /* 添加 */
      btnAdd () {
        this.$refs.refDialogAdd.btnOpen()
      },

      /* 修改 */
      btnEdit (row) {
        this.$refs.refDialogEdit.btnOpen(row)
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
