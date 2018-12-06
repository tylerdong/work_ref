<!--材料入库-->
<template>
  <div v-loading="loading.all">
    <div class="hy-admin__main-container">
      <div class="flex-div-row" style="background: white">
        <div class="flex-div-column hy-admin__search-main cf" ref="container">
          <el-tabs type="card" v-model="searchInfo.groupId" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in options.group" :name="item.id" :label="item.name" :key="index"></el-tab-pane>
          </el-tabs>
          <div class="fr" style="margin-bottom: 20px">
            <el-date-picker v-model="searchInfo.inStorageStartDate" placeholder="请选择开始时间" clearable></el-date-picker>
            <el-date-picker v-model="searchInfo.inStorageEndDate"  placeholder="请选择结束时间" clearable></el-date-picker>
            <!--<el-autocomplete :fetch-suggestions="getMaterialId" :loading="loading.material"-->
                             <!--placeholder="请输入仪器" @select="selectMateriaId"></el-autocomplete>-->
            <el-select :loading="loading.material" v-model="searchInfo.materialId" clearable>
              <el-option v-for="item in options.material" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-button @click="searchList" type="primary">查询</el-button>
            <el-button @click="add" type="primary">入库</el-button>
          </div>
          <div>
            <el-table :data="tableData" border v-loading="loading.table" element-loading-text="拼命加载中">
              <el-table-column label="名称">
                <template slot-scope="scope">{{ scope.row.labMaterialDo.name }}</template>
              </el-table-column>
              <el-table-column label="规格">
                <template slot-scope="scope">{{ scope.row.labMaterialDo.spec }}</template>
              </el-table-column>
              <el-table-column label="单位">
                <template slot-scope="scope">{{ scope.row.labMaterialDo.unit }}</template>
              </el-table-column>
              <el-table-column prop="inNumber" label="入库数量"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column prop="inStoragePerson" label="入库人"></el-table-column>
              <el-table-column label="入库时间">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | timeFormat('YYYY-MM-DD HH:mm') }}
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
          <inbound-dialog ref="inboardDialog" @success="success"></inbound-dialog>
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
      'inbound-dialog': require('./inbound-dialog.vue')
    },
    data () {
      return {
        searchInfo: { groupId: '', materialId: '', inStorageStartDate: '', inStorageEndDate: '' },
        options: { group: [], material: [] },
        tableData: [],
        loading: { table: false, material: false },
        page: {
          current: 1,
          size: 15,
          total: 0
        }
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
        this.$refs.inboardDialog.show(this.searchInfo.groupId)
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
      selectMateriaId (item) {
        this.searchInfo.materialId = item.id
      },
      getTabData () { // 获取Tab列表
        this.loading.all = true
        let params = { page: { current: 1, length: 1000 }, queryLabDataGroupDicCo: { type: 'LAB_MATERIAL' } }
        api.chemicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          const data = response.data
          if (data.success === true) {
            this.options.group = data.data.data
            if (data.data.data.length > 0) {
              this.searchInfo.groupId = this.options.group[0].id
              this.getMaterialId()
              this.getListData()
            }
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
      getListData () { // 获取列表结构
        this.loading.table = true
        let params = {
          queryLabMaterialInStorageCo: {
            dataGroupDicId: this.searchInfo.groupId,
            materialId: this.searchInfo.materialId,
            inStorageStartDate: this.searchInfo.inStorageStartDate ? new Date(this.searchInfo.inStorageStartDate).getTime() : '',
            inStorageEndDate: this.searchInfo.inStorageEndDate ? new Date(this.searchInfo.inStorageEndDate).getTime() : ''
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.labMaterialInStorageController.getLabMaterialInStorageDoList(params).then(response => {
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
