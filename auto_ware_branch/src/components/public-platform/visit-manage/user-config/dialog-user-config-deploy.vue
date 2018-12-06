<template>
  <el-dialog
    class="dialog-user-list-deploy"
    width="50%"
    :title="dialogInfo.title"
    :visible.sync="dialogInfo.toggle"
    @close="close">
    <div class="privilege-manager">
      <div class="left-box">
        <el-table
          ref="refAddlistTable"
          height="600"
          class="hy-table-overflow-y"
          :data="listData.addList"
          v-loading="loading.addTable"
          @selection-change="handleSelectAddList"
          @row-click="handleClickAddList">
          <el-table-column
            prop="name"
            label="已添加角色"
            align="center">
          </el-table-column>
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="content-box">
        <div><el-button type="success" class="add-button" :loading="loading.addBtn" @click="handleAdd()"><--添加</el-button></div>
        <div><el-button type="danger" class="del-button" :loading="loading.removeBtn" @click="handleRemove()">移除--></el-button></div>
      </div>
      <div class="right-box">
        <el-table
          ref="refNolistTable"
          height="600"
          :data="listData.noList"
          v-loading="loading.noTable"
          @selection-change="handleSelectNoList"
          @row-click="handleClickNoList">
          <el-table-column
            type="selection"
            width="55"
            class="hy-table-overflow-y"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="未添加角色"
            align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import * as api from 'src/api'
  import _ from 'lodash'

  export default {
    data () {
      return {
        dialogInfo: {
          title: '',
          id: '',
          toggle: false
        },
        /* 展示列表 */
        listData: {
          addList: [],
          noList: []
        },
        /* 勾选内容临时存储 */
        tempSelect: {
          addList: [],
          noList: []
        },
        loading: {
          addBtn: false,
          removeBtn: false,
          addTable: true,
          noTable: true
        }
      }
    },
    props: ['childData'],
    methods: {
      toggle (params) {
        /* 初始化 */
        this.listData = {
          addList: [],
          noList: []
        }
        this.loading = {
          addBtn: false,
          removeBtn: false,
          addTable: true,
          noTable: true
        }
        this.dialogInfo = {
          title: params.title + '（角色配置）',
          id: params.id,
          toggle: params.toggle
        }
        this.getData()
      },

      close () {
        this.$emit('callback')
      },

      getData () {
        api.userCenter.getListUserRoleMap({
          userId: this.dialogInfo.id
        }).then(response => {
          const data = response.data

          if (data.messageType === 1) {
            this.listData.addList = data.data
            this.listData.noList = _.differenceBy(this.childData, this.listData.addList, 'id')
            return true
          }

          if (data.messageType === 2) {
            this.$message.error(data.message)
            return true
          }

          if (data.messageType === 3) {
            console.error(response)
            return false
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.addTable = false
          this.loading.noTable = false
        })
      },

      /* 已添加功能列表 勾选 */
      handleSelectAddList (selection) {
        this.tempSelect.addList = selection
      },

      /* 已添加功能列表 单机 */
      handleClickAddList (row, event, column) {
        this.$refs.refAddlistTable.toggleRowSelection(row)
      },

      /* 未添加功能列表 勾选 */
      handleSelectNoList (selection) {
        this.tempSelect.noList = selection
      },

      /* 未添加功能列表 单机 */
      handleClickNoList (row, event, column) {
        this.$refs.refNolistTable.toggleRowSelection(row)
      },

      /* 新增 */
      handleAdd () {
        if (this.tempSelect.noList.length) {
          this.loading.addBtn = true

          let params = {
            userId: this.dialogInfo.id,
            roleIdList: []
          }

          for (let temp of this.tempSelect.noList) {
            params.roleIdList.push({
              roleId: temp.id
            })
          }

          api.userCenter.addUserRoleMap(params).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.listData.noList = _.differenceBy(this.listData.noList, this.tempSelect.noList, 'id')
              this.listData.addList = _.concat(this.tempSelect.noList, this.listData.addList)
              return true
            }

            if (data.messageType === 2) {
              this.$message.error(data.message)
              return false
            }

            if (data.messageType === 3) {
              console.error(data)
              return false
            }
          }).catch(e => {
            console.error(e)
          }).finally(() => {
            this.loading.addBtn = false
          })
        } else {
          this.$message.error('请勾选')
        }
      },

      /* 移除 */
      handleRemove () {
        if (this.tempSelect.addList.length) {
          let params = {
            userId: this.dialogInfo.id,
            roleIdList: []
          }
          for (let temp of this.tempSelect.addList) {
            params.roleIdList.push({
              roleId: temp.id
            })
          }
          this.loading.removeBtn = true
          api.userCenter.deleteUserRoleMapByUserId(params).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.listData.addList = _.differenceBy(this.listData.addList, this.tempSelect.addList, 'id')
              this.listData.noList = _.concat(this.tempSelect.addList, this.listData.noList)
              return true
            }
            if (data.messageType === 2) {
              this.$message.error(data.message)
              return false
            }
            if (data.messageType === 3) {
              console.error(data)
              return false
            }
          }).catch(e => {
            console.error(e)
          }).finally(() => {
            this.loading.removeBtn = false
          })
        } else {
          this.$message.error('请勾选')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dialog-user-list-deploy {
    width: 100%;
    height: 100%;
    .privilege-manager{
      border: 1px solid #EEF1F6;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .left-box, .right-box {
        flex: 1 1 50%;
        overflow-y: auto;
      }
      .content-box {
        flex: 0 0 100px;
        text-align: center;
        button {
          margin: 50px auto ;
        }
      }
    }
  }
</style>
