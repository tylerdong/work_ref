<template>
  <!--菜单权限分配-->
  <Modal v-model="modal.show" :title="modal.title" @on-ok="postMenuAuthority">
    <Row :gutter="16">
      <Tree ref="menuTree" :data="treeData" show-checkbox multiple></Tree>
    </Row>
  </Modal>
</template>

<script>
import api from '@/api/roleManager'

export default {
  name: 'dialog-menu-promission',
  data () {
    return {
      modal: {show: false, title: '分配菜单权限'},
      treeData: [],
      menusIds:[],
      roleId:0
    }
  },
  methods: {
    show (data) {
      this.modal.show = true
      this.renderMenuTree(data)
      this.roleId =data;
    },
    // 获取菜单树
    renderMenuTree (id) {
      api.ajaxGetMenuBySystemId({roleId:id}).then(res => {
        if (res.code === 1000) {
          this.treeData = res.data
        } else {
          this.$Message.error({content: res.message})
        }
      }).catch(e => {
        this.$Message.error({content: e.message})
      })
    },
    postMenuAuthority () {
      let checked = this.$refs.menuTree.getCheckedNodes() // 被勾选的节点
      checked.forEach(m => {
        if (m.children.length === 0) {
          this.menusIds.push(m.id)
        }
      })
      api.updateRoleMenuRe({menusIds:this.menusIds, roleId:this.roleId}).then(res => {
        if (res.code === 1000) {
          this.$Message.success({content: res.message})
          this.model.show = false
        } else {
          this.$Message.error({content: res.message})
        }
      }).catch(e => {
        this.$Message.error({content: e.response.data.message})
      })
    }
  }
}
</script>

<style scoped>

</style>
