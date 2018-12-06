<template>
  <div>
    <!--<jk-breadcrumb nameId="030405"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-tree
        v-loading="treeLoading"
        :data="treeData"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :render-content="renderContent">
      </el-tree>
    </div>
    <dialog-organization-manage
      ref="dlg"
      :nowNode="nowNode"
      :dlgTitle="dlgTitle">
    </dialog-organization-manage>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dialog-organization-manage': require('./dialog-organization-manage.vue')
    },
    data () {
      return {
        treeLoading: false,
        treeData: [],
        defaultProps: {
          children: 'list',
          label: 'name'
        },
        nowNode: null,
        dlgTitle: ''
      }
    },
    created () {
      this.treeLoading = true
      api.systemOrganization.getOrganizationList({}).then(response => {
        const data = response.data
        if (data.messageType === 1) {
          this.treeData = [data.data.organizationVo]
        }
        if (data.messageType === 2) {
          this.$message.error(data.message)
          return false
        }
      }).finally(() => {
        this.treeLoading = false
      })
    },
    methods: {
      append (e, node) {
        this.nowNode = node
        this.dlgTitle = '添加'
        this.$nextTick(() => {
          this.$refs.dlg.open()
        })
        e.stopPropagation()
      },
      rename (e, node) {
        this.nowNode = node
        this.dlgTitle = '重命名'
        this.$nextTick(() => {
          this.$refs.dlg.open()
        })
        e.stopPropagation()
      },
      remove (e, node) {
        this.$confirm('确认删除此组织?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              let params = [{
                id: node.data.id
              }]
              instance.confirmButtonLoading = true
              api.systemOrganization.delOrganization(params).then(response => {
                if (response.data.messageType === 1) {
                  let store = node.store
                  let data = node.data
                  store.remove(data)
                } else {
                  this.$message.error(response.data.message)
                }
              }).finally(() => {
                done()
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        })
        e.stopPropagation()
      },
      renderContent (h, {node}) {
        if (node.data.id === '1720631522668576807') { // 根组织id
          return (
            <span style="vertical-align: middle">
            <span>
            <span>{node.data.name}</span>
          </span>
          <span style="float: right; margin-right: 20px">
            <el-button size="mini" type="primary" on-click={ (e) => this.append(e, node) }>添加</el-button>
          <el-button size="mini" type="info" on-click={ (e) => this.rename(e, node) }>重命名</el-button>
          <el-button size="mini" disabled type="danger" on-click={ (e) => this.remove(e, node) }>删除</el-button>
          </span>
          </span>)
        } else {
          return (
            <span style="vertical-align: middle">
            <span>
            <span>{node.data.name}</span>
          </span>
          <span style="float: right; margin-right: 20px">
            <el-button size="mini" type="primary" on-click={ (e) => this.append(e, node) }>添加</el-button>
          <el-button size="mini" type="info" on-click={ (e) => this.rename(e, node) }>重命名</el-button>
          <el-button size="mini" type="danger" on-click={ (e) => this.remove(e, node) }>删除</el-button>
          </span>
          </span>)
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .tree{
    .el-tree-node__expand-icon{
      line-height: 0px;
      margin-right: 20px;
    }
  }
</style>
