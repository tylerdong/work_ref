<!--材料统计-->
<template>
  <div v-loading="loading.all">
    <div class="hy-admin__main-container">
      <div class="flex-div-row" style="background: white">
        <div class="flex-div-column hy-admin__search-main cf" ref="container">
          <el-tabs type="card" v-model="searchInfo.groupId" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in options.group" :name="item.id" :label="item.name" :key="index"></el-tab-pane>
          </el-tabs>
          <div class="fr" style="margin-bottom: 20px">
            <el-date-picker v-model="searchInfo.startDate" placeholder="请选择开始时间"></el-date-picker>
            <el-date-picker v-model="searchInfo.endDate"  placeholder="请选择结束时间"></el-date-picker>
            <!--<el-autocomplete v-model="searchInfo.materialName" :fetch-suggestions="getMaterialId"-->
                             <!--:loading="loading.material"  @select="selectMateriaId" placeholder="请输入仪器"></el-autocomplete>-->
            <el-select :loading="loading.material" v-model="searchInfo.materialId" clearable>
              <el-option v-for="item in options.material" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-button @click="searchList" type="primary">查询</el-button>
          </div>
          <div>
            <el-table :data="tableData" border v-loading="loading.table" element-loading-text="拼命加载中">
              <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="spec" label="规格" show-overflow-tooltip></el-table-column>
              <el-table-column prop="nowStorageNumber" label="当前库存" show-overflow-tooltip></el-table-column>
              <el-table-column prop="countOutNumber" label="总出库" show-overflow-tooltip></el-table-column>
              <el-table-column prop="countInNumber" label="总入库" show-overflow-tooltip></el-table-column>
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

          <outbound-dialog ref="dialog" :groupOptions="options.group" @success="success"></outbound-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {
      'outbound-dialog': require('./outbound-dialog.vue')
    },
    data () {
      return {
        searchInfo: {groupId: '', startDate: '', endDate: '', materialId: '', materialName: ''},
        options: {group: [], material: []},
        tableData: [],
        loading: {table: false, material: false},
        page: {current: 1, size: 15, total: 0}
      }
    },
    mounted () {
      this.getTabData()
      this.userInfo = storage.getUser()
    },
    methods: {
      handleClick (tab, event) {
        this.searchInfo.groupId = tab.name
        this.searchInfo.materialId = ''
        this.getMaterialId()
        this.getListData()
      },
      success () {
        this.getListData()
      },
      add () {
        this.$refs.dialog.show('add')
      },
      getMaterialId () {
        this.loading.material = true
        let params = {dataGroupDicId: this.searchInfo.groupId, name: ''}
        api.chemicalLaboratory.labMaterialController.getLabMaterialDosByName(params).then(response => {
          if (response.data.success) {
            this.options.material = response.data.data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.material = false
        })
      },
      getTabData () { // 获取Tab列表
        this.loading.all = true
        let params = {
          page: {current: 1, length: 1000},
          queryLabDataGroupDicCo: {type: 'LAB_MATERIAL'}
        }
        api.chemicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          const data = response.data
          if (data.success === true) {
            this.options.group = data.data.data
            if (data.data.data.length > 0) {
              this.searchInfo.groupId = data.data.data[0].id
              this.getMaterialId()
            }
            this.getListData()
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.all = false
        })
      },
      selectMateriaId (item) {
        this.searchInfo.materialId = item.id
      },
      getListData () { // 获取列表结构
        this.loading.table = true
        let params = {
          queryLabMaterialCo: {
            materialId: this.searchInfo.materialId,
            dataGroupDicId: this.searchInfo.groupId,
            startDate: this.searchInfo.startDate ? new Date(this.searchInfo.startDate).getTime() : '',
            endDate: this.searchInfo.endDate ? new Date(this.searchInfo.endDate).getTime() : ''
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.labMaterialController.getLabGroupMaterialInAndOutStorageVos(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.tableData = []
              return
            }
            this.tableData = data.data
            this.page.total = data.count
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
      searchList () {
        this.getListData()
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
</style>
