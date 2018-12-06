<template>
  <el-dialog title="人员选择" :visible.sync="visible" width="50%">
    <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="number" label="员工编号" ></el-table-column>
      <el-table-column prop="name" label="员工姓名" ></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  class OprationType {
    static ADD = '新增'
    static MODIFY = '修改'
  }
  export default {
    data () {
      return {
        opration: OprationType.ADD,
        visible: false,
        tableData: [],
        multipleSelection: []
      }
    },
    methods: {
      show (scope, isModify) {
        this.opration = OprationType.ADD
        if (isModify) {
          this.opration = OprationType.isModify
        }
        this.visible = true
        this.tableData.splice(0, this.tableData.length)
        this.getGroupList(scope.workshopId, scope.groupEmployeeMapBoList, scope.groupId)
      },
      close () {
        this.tableData.splice(0, this.tableData.length)
        this.visible = false
      },
      confirm () {
        this.visible = false
        this.$emit('callback', this.multipleSelection)
      },
      sellectionFilter (row, index) {
        if (row.isUsed) {
          return false
        } else {
          return true
        }
      },
      getGroupList (value, listSelected, id) {
        /* 通过车间id获取分组人员信息 */
        let params = {
          workshopId: value,
          groupId: id
        }
        api.automatic.person.getEmployeeWithoutGroupListByworkshopIdAndGroupId(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            const items = data.data
            for (let item of items) {
              this.tableData.push(item)
              const isExisted = listSelected.filter((p) => {
                return p.id === item.id
              })
              if (isExisted.length > 0) {
                this.$nextTick(() => {
                  this.$refs.multipleTable.toggleRowSelection(item)
                })
              }
            }
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      clearRowSelection (scope, data) {
        scope.row.isUsed = false
      }
    }
  }
</script>
