<!--丝锭批号-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020408"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="form.workshopId" placeholder="请选择车间" clearable>
            <el-option v-for="item in workShopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button @click="getData" type="primary" icon="el-icon-search" :loading="search.loading"></el-button>
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="batchNo" label="批号"></el-table-column>
        <el-table-column prop="spec" label="规格"></el-table-column>
        <el-table-column prop="tubeColor" label="管色"></el-table-column>
        <el-table-column prop="workshopName" label="车间"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope)" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <edit-dialog @submitSuccess="getData" ref="editDialog"></edit-dialog>
    <add-dialog @submitSuccess="getData" ref="addDialog"></add-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      // 'main-breadcrumb': require('common/breadcrumb.vue'),
      'edit-dialog': require('./dialog-edit.vue'),
      'add-dialog': require('./dialog-add.vue')
    },
    data () {
      return {
        workShopList: [],
        tableData: [],
        form: {
          workshopId: ''
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        search: {
          loading: false
        },
        loading: {
          list: false
        }
      }
    },
    mounted () {
      this.getData()
      this.getAllWorkShop()
    },
    methods: {
      getData () {
        this.search.loading = true
        this.loading.list = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size,
          workshopId: this.form.workshopId
        }
        api.automatic.dictionary.getBatchList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).finally(() => {
          this.search.loading = false
          this.loading.list = false
        })
      },
      getAllWorkShop () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          this.workShopList = response.data.data.map(item => {
            return { id: item.id, name: item.name }
          })
        })
      },
      add () {
        this.$refs.addDialog.show({
          action: 'add',
          workShopList: this.workShopList
        })
      },
      edit (listItem) {
        this.$refs.addDialog.show({
          action: 'edit',
          workShopList: this.workShopList,
          ...listItem.row
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
