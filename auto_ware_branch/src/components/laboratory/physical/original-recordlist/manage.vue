<!--原始记录单模板管理-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="query.groupId" placeholder="请选择分类" clearable>
            <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-input v-model="query.name" class="search-input margin-right-10" placeholder="请输入名称"></el-input>
          <el-button @click="search" type="primary">查询</el-button>
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="id" label="编号" width="190"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="creator" label="创建人"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.gmtCreate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
        </el-table-column>
        <el-table-column prop="resultPricision" label="结果精度"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope)" type="text" size="small">修改</el-button>
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
    <add-dialog ref="addDialog" @getTempData="getData"></add-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api/index'
  export default {
    components: {
      'add-dialog': require('./dialog-add-template.vue')
    },
    created () {},
    data () {
      return {
        loading: {
          list: false
        },
        query: {
          groupId: '',
          name: ''
        },
        groups: [],
        tableData: [],
        page: {
          current: 1,
          size: 15,
          total: 0
        }
      }
    },
    props: {},
    mounted () {
      this.getClassify()
      this.getData()
    },
    computed: {},
    methods: {
      search () {
        this.getData()
      },
      add () {
        this.$refs.addDialog.show({title: '新增'})
      },
      edit (listItem) {
        this.$refs.addDialog.show(Object.assign({}, listItem.row, {title: '修改'}))
      },
      getClassify () {
        let params = {
          queryLabDataGroupDicCo: {
            type: 'LAB_ORIGINAL_TEMPLATE'
          }
        }
        api.physicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.groups = data.data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {})
      },
      getData () {
        let params = {
          page: {
            current: this.page.current,
            length: this.page.size
          },
          queryLabOriginalTemplateCo: this.query
        }
        this.loading.list = true
        api.physicalLaboratory.originalTempManage.getLabOriginalTemplateDoList(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.tableData = data.data.data
            this.page.total = data.data.count
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
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
<style scoped>
</style>
