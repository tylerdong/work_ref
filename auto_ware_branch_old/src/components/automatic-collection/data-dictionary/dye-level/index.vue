<!--染判等级-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020416"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <!--<el-input></el-input>-->
          <!--<el-button type="primary" icon="search"></el-button>-->
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click="edit(scope)"
              type="text"
              size="small">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
        tableData: [],
        loading: {
          list: false
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.loading.list = true
        api.automatic.dictionary.getAllSentenceLevelList({}).then((response) => {
          const data = response.data
          console.log(data)
          if (data.messageType === 1) {
            console.log(data)
            this.tableData = data.data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      add () {
        this.$refs.addDialog.show()
      },
      edit (listItem) {
        this.$refs.editDialog.show(listItem)
      }
    }
  }
</script>
