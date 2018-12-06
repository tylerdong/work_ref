<!--定时管理/定时调度-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="search.scheduleName" placeholder="请选择调度类型" clearable>
            <el-option v-for="(item, index) in options.shedulingTypes" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <el-button type="primary" @click="getData" :loading="loading.search">查询</el-button>
        </div>
      </div>

      <el-table :data="tableData" border style="width: 100%" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="scheduleCode" label="编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cron" label="调度计划" show-overflow-tooltip></el-table-column>
        <el-table-column label="是否开启">
          <template slot-scope="scope">{{scope.row.valid_flag | booleanFormat}}</template>
        </el-table-column>
        <el-table-column prop="scheduleDescribe" label="描述"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click.native.prevent="butEdit(scope.row)" type="text">修改</el-button>
            <el-button @click.native.prevent="butView(scope.row)" type="text">日志查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <dialog-edit ref="refDialogEdit" @confirmSuccess="callback"></dialog-edit>
      <dailog-view-log ref="refDialogViewLog"></dailog-view-log>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-edit': require('./dialog-edit.vue'),
      'dailog-view-log': require('./dailog-view-log.vue')
    },
    data () {
      return {
        loading: {
          search: false
        },
        options: {
          shedulingTypes: []
        },
        search: {
          scheduleName: ''
        },
        tableData: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.loading.search = true
        api.automatic.statement.getScheduleConfigList({scheduleCode: ''}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            if (this.search.scheduleName) {
              this.tableData = data.data.filter(item => { return item.name === this.search.scheduleName })
            } else {
              this.tableData = data.data
            }
            if (this.options.shedulingTypes.length === 0) {
              data.data.forEach(item => {
                if (!this.options.shedulingTypes.includes(type => { return item.name === type.name })) {
                  this.options.shedulingTypes.push({name: item.name})
                }
              })
            }
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.search = false
        })
      },
      butEdit (data) {
        this.$refs.refDialogEdit.toggle(data)
      },
      butView (data) {
        this.$refs.refDialogViewLog.toggle(data)
      },
      callback () {
        this.getData()
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    }
  }
</script>
