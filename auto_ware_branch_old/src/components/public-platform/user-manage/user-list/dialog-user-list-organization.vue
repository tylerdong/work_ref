<template>
  <el-dialog title="组织结构" :visible.sync="dialogTableVisible" width="40%">
    <el-tree
      v-loading="treeLoading"
      :data="treeData"
      node-key="id"
      :props="defaultProps"
      :default-expanded-keys="['1720631522668576807']"
      :highlight-current="true"
      @node-click="nodeClick">
    </el-tree>
    <footer class="footer">
      <el-button type="info" @click="confirm">确定</el-button>
    </footer>
  </el-dialog>
</template>
<script>
  import * as api from 'src/api'
  export default {
    data () {
      return {
        dialogTableVisible: false,
        treeData: [],
        defaultProps: {
          children: 'list',
          label: 'name'
        },
        nowId: null,
        nowNode: null
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
      /* 选择根组织 */
      nodeClick (dataObj, node) {
        this.nowNode = node
      },
      confirm () {
        if (this.nowNode) {
          this.dialogTableVisible = false
          this.$emit('callback', this.nowNode)
        } else {
          this.$message.error('请选择组织')
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .tree {
    height: 400px;
    overflow-y: scroll;
  }

  .footer {
    margin-top: 1.2rem;
    text-align: right;
  }
</style>
