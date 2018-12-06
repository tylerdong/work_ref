<template>
  <div class="customized-content">
    <!--<main-breadcrumb nameId="020308"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="search.groupId" placeholder="请选择看板" clearable>
            <el-option v-for="item in option.group" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button type="primary" @click="getData" :loading="search.loading">查询</el-button>
        </div>
      </div>
      <table v-if="Array.isArray(tableData) && tableData.length > 0" class="customized-table">
        <tr>
          <th>看板</th>
          <th>接口</th>
          <th>请求频率(s)</th>
          <th>刷新频率(s)</th>
          <th>操作</th>
        </tr>
        <template v-for="data in tableData">
          <tr v-for="(list, index) in data.list">
              <td v-if="index === 0" :rowspan="data.list.length">{{data.name}}</td>
              <td>{{list.name}}<span style="display: none">{{list.taskId}}</span></td>
              <td v-if="index === 0" :rowspan="data.list.length">{{list.requestInterval}}</td>
              <td>{{list.refreshInterval}}</td>
              <td><el-button type="text" @click="btnEdit(list)">编辑</el-button></td>
          </tr>
        </template>
      </table>
    </div>
    <dialog-edit ref="dialogEdit" @confirmSuccess="getData"></dialog-edit>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-edit': require('./dialog-edit')
    },
    data () {
      return {
        search: {
          groupId: ''
        },
        option: {
          group: []
        },
        loading: {
          search: false
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
        this.tableData = []
        let params = {
          groupId: this.search.groupId
        }
        api.automatic.statement.getBoardConfig(params).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data
            if (this.option.group.length === 0) {
              data.data.forEach(item => {
                item.list.forEach((list, index) => {
                  if (index === 0) {
                    this.option.group.push({id: list.groupId, name: list.groupName})
                  }
                })
              })
            }
          } else {
            this.$message({ type: 'error', message: data.message })
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.search = false
        })
      },
      btnEdit (data) {
        this.$refs.dialogEdit.toggle(data)
      }
    }
  }
</script>
