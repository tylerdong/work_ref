<template>
  <el-dialog title="操作记录" :visible.sync="dialogToggle" class="edit-dialog-template-dialog" width="79%">
    <el-table :data="tableData" :loading="loading.list" style="width: 100%">
      <el-table-column label="操作类型" width="180">
        <template slot-scope="scope">{{scope.row.operationType | centerValueOpType}}</template>
      </el-table-column>
      <el-table-column prop="operator" label="操作人" width="180"></el-table-column>
      <el-table-column prop="beforeModifiedValue" label="原值"></el-table-column>
      <el-table-column prop="afterModifiedValue" label="变更值"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api/index'
  import storage from 'storage'

  export default {
    data () {
      return {
        dialogToggle: false,
        tableData: [],
        loading: {
          list: false
        }
      }
    },
    mounted () {
      this.user = storage.getUser()
    },
    computed: {},
    methods: {
      show (data) {
        this.dialogToggle = true
        this.initRecord(data)
      },
      initRecord (data) {
        this.loading.list = true
        let params = {
          dictionaryId: data.dictionaryId,
          attributeName: data.attributeName
        }
        api.physicalLaboratory.labCentralValueDictionaryController.getLabCentralValueDictionaryLogList(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.tableData = data.data
          } else {
            this.tableData = []
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      }
    }
  }
</script>
<style>
</style>

