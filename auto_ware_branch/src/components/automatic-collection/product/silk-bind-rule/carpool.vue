<!--拼车规则绑定-->
<template>
  <div>
    <div class="hy-admin__main-container">

      <el-form :inline="true" label-width="8rem" class="form-padding">
        <el-form-item label="丝车规格">
          <el-select v-model="searchInfo.silkcarSpecId" placeholder="请选择丝车规格" class="input-item-16" clearable>
            <el-option v-for="(item, index) in silkcarSpecList" :key="index" :label="item.spec" :value="item.id">
              <span style="float: left">{{ item.spec }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.desc }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="车间">
          <el-select v-model="searchInfo.workshopId" placeholder="请选择车间" filterable class="input-item" clearable>
            <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="btnSearch" :loading="loading.search">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="btnAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
        <el-table-column prop="workshopName" label="所属车间"></el-table-column>
        <el-table-column prop="silkcarSpecDesc" label="丝车规格"></el-table-column>
        <el-table-column label="操作" min-width="100">
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

      <!-- 新增拼车绑定规则 -->
      <dialog-carpool ref="refDialogAdd" :shopList="shopList" :silkcarSpecList="silkcarSpecList" @submitSuccess="getData"></dialog-carpool>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'

  export default {
    components: {
      'dialog-carpool': require('./dialog-carpool-rule')
    },
    props: ['shopList', 'silkcarSpecList'],
    mounted () {},
    data () {
      return {
        searchInfo: {
          silkcarSpecId: '',
          workshopId: '',
          bindType: '2'
        },
        option: {
          productLineList: []
        },
        loading: {
          search: false,
          table: false,
          selectLine: false
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
          silkcarSpecId: this.searchInfo.silkcarSpecId,
          workshopId: this.searchInfo.workshopId,
          bindType: this.searchInfo.bindType,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }
        api.automatic.dictionary.getSilkBindRules(param).then(response => {
          const data = response.data
          if (data.messageType === 1 && data.data.list.length > 0) {
            this.tableData = data.data.list
            this.pages.total = data.data.count
          } else {
            this.tableData = []
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.search = false
        })
      },

      /* 搜索 */
      btnSearch () {
        this.getData()
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
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          let params = { id: data.id }
          api.automatic.dictionary.deleteSilkBindRule(params).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.$message({type: 'success', message: data.message})
              this.getData()
              return true
            } else {
              this.$message.error(data.message)
              return false
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
