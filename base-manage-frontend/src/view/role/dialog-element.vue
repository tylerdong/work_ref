<template>
  <!--页面元素权限分配-->
  <Modal v-model="modal.show" ref="selection" :title="modal.title" class-name="no-footer-modal" width="56%">
    <Row :gutter="16">
      <Col span="8">
        <Card>
          <Tree :data="menuTreeData" @on-select-change="getElementInfo"></Tree>
        </Card>
      </Col>
      <Col span="16">
        <Alert show-icon>勾选/取消勾选以后, 数据会立即保存</Alert>
        <Table
          :columns="element.columns"
          :data="element.data"
          @on-select="putElementAuth"
          @on-select-all="putElementAuth"
          @on-select-cancel="putElementAuth"
          @on-select-all-cancel="putElementAuth"
        ></Table>
      </Col>
    </Row>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
  import api from '@/api/roleManager'
  export default {
    data() {
      return {
        modal: {show: false, title: '分配资源权限'},
        menuTreeData: [],
        roleId: '',
        element: {
          columns: [
            {type: "selection", width: 60, align: "center"},
            {title: "id", key: "id", width: 80},
            {title: "资源编码", key: "code", width: 200},
            {title: "资源类型", key: "type", width: 100},
            {title: "资源名称", key: "name", width: 120},
            {title: "资源地址", key: "uri", width: 220},
            {title: "资源请求类型", key: "method", width: 120}
          ],
          data: []
        }
      }
    },
    methods: {
      show(data) {
        this.modal.show = true
        this.roleId = data
        this.element.data = []
        this.renderMenuTree(data)
      },
      // 获取菜单所有资源
      getElementInfo(v) {
        api.getResourceByRoleIdAndMenuId({menuId: v[0].id, roleId: this.roleId}).then(res=>{
          res.data.forEach(item => {
            this.$set(item, '_checked', item.checked)
          })
          this.element.data = res.data
        })
      },
      // 跟新菜单关联的资源
      putElementAuth(selection) {
        let resourceIds = selection.map(sel => sel.id)
        this.updateRoleResource(resourceIds)
      },
      updateRoleResource(resourceIds) {
        let data = {resourceIds: resourceIds, roleId: this.roleId}
        api.updateRoleResourceReByRoleId(data).then(res => {
          if (res.code === 1000) {
            this.$Message.success({content: res.message})
          } else {
            this.$Message.error({content: res.message})
          }
        }).catch(e => {
          this.$Message.error({content: e.message})
        })
      },
      // 获取选中的菜单树
      renderMenuTree (id) {
        api.ajaxGetElementBySystemId({roleId:id}).then(res => {
          if (res.code === 1000) {
            this.menuTreeData = res.data
          } else {
            this.$Message.error({content: res.message})
          }
        }).catch(e => {
          this.$Message.error({content: e.message})
        })
      }
    }
  }
</script>

<style scoped>

</style>
