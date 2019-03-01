<template>
  <Card shadow>
    <p slot="title">角色管管理</p>
    <div class="mb-20">选择系统：
      <Select v-model="search.systemId" @on-change="renderTree" class="mr-10 length-13rem">
        <Option v-for="item in option.systemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Button v-check-promission="elements.config.role.btnAdd" type="success" @click="showRoleModal" icon="ios-add" class="mr-10 fr">添加角色</Button>
    </div>
    <Row :gutter="16">
      <Col span="8">
        <Card>
          <div slot="title">角色</div>
          <Tree :data="option.rolesTreeData" @on-select-change="getRoleNodeInfo" :loading="loading.roleTree"></Tree>
        </Card>
      </Col>
      <Col span="16">
        <Card v-if="currentRole.code">
          <div slot="title">角色详情</div>
          <div class="mb-20">
            <ButtonGroup size="small">
              <Button v-check-promission="elements.config.role.btnAllotMenu" @click="showMenuAllot" icon="md-menu">菜单权限分配</Button>
              <Button v-check-promission="elements.config.role.btnAllotEle" @click="showElementPermissionModal" icon="md-grid">页面元素权限分配</Button>
              <Button v-check-promission="elements.config.role.btnDel" @click="showDelRole" type="error" icon="md-add">删除当前角色</Button>
            </ButtonGroup>
          </div>
          <Form ref="form" :model="currentRole" :rules="rules" :label-width="80">
            <FormItem label="名称" prop="name">
              <Input placeholder="请输入" v-model="currentRole.name" style="width:300px;"/>
            </FormItem>
            <FormItem label="编码" prop="code">
              <Input placeholder="请输入" v-model="currentRole.code" style="width:300px;"/>
            </FormItem>
            <!-- <FormItem label="描述" prop="description">
              <Input placeholder="请输入" v-model="currentRole.description" style="width:300px;"/>
            </FormItem> -->
            <FormItem v-check-promission="elements.config.role.btnEdit" label=" ">
              <Button type="primary" @click="updateRole">更新</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
    <dialog-role ref="role" @addRole="renderTree"></dialog-role>
    <dialog-menu ref="menu" @renderTree="renderTree" ></dialog-menu>
    <dialog-element ref="element"></dialog-element>
  </Card>
</template>
<script>
import api from '@/api/roleManager'
import elements from '@/config/elements'
export default {
  components: {
    'dialog-role': require('./dialog-top-role').default,
    'dialog-menu': require('./dialog-menu').default,
    'dialog-element': require('./dialog-element').default
  },
  data () {
    return {
      search: {systemId: ''},
      option: {systemList: [], rolesTreeData: []},
      loading: {roleTree: false, refresh: false},
      currentRole: {}, // 当前选中的角色节点信息
      rules: {},
      elements: elements
    }
  },
  mounted () {
    this.getSystemData()
  },
  methods: {
    refresh () {
      this.loading.refresh = true
      this.getSystemData()
    },
    // 获取系统列表
    getSystemData () {
      api.getAllSystem().then(res => {
        if (res.code === 1000) {
          this.option.systemList = res.data
          this.search.systemId = res.data[0].id
          if (this.search.systemId) this.renderTree()
        } else {
          this.$Message.error({content: res.message})
        }
      }).catch(e => {
        this.$Message.error({content: e.message})
      })
    },
    // 获取角色树
    renderTree () {
      this.loading.roleTree = true
      this.currentRole = {}
      api.getRolesTreeBySystemId({systemId:this.search.systemId}).then(res => {
        if (res.code === 1000) {
          // this.option.rolesTreeData = this.formatRoleMap(res.data)
          this.option.rolesTreeData = res.data
        } else {
          this.$Message.error({content: res.message})
        }
      }).catch(e => {
        this.$Message.error({content: e.message})
      }).finally(() => {
        this.loading.roleTree = false
      })
    },
    // 格式化树
    formatRoleMap (node) {
      const arr = []
      for (let i = 0; i < node.length; i++) {
        arr[i] = node[i]
        arr[i].title = node[i].name
        if (node[i].children.length > 0) {
          this.formatRoleMap(node[i].children)
        }
      }
      return arr
    },
    // 显示添加顶级角色
    showRoleModal () {
      this.$refs.role.show(this.search.systemId)
    },
    // 获取角色节点信息
    getRoleNodeInfo (val) {

      if (val.length === 0) return
      this.currentRole = val[0]
      // console.log(val);
      // api.getRoleByRoleId({roleId: val[0].id}).then(res => {
      //   if (res.code === 1000) {
      //     this.currentRole = res.data
      //   } else {
      //     this.$Message.error({desc: res.message})
      //   }
      // }).catch(e => {
      //   this.$Message.error({desc: e.message})
      // })
    },
    // 更新角色的信息
    updateRole () {
      api.putRoleGroup(this.currentRole).then(rs => {
        if(rs.code == 1000){
          this.currentRole = {}
          this.renderTree();
        }else{
          this.$Message.error('更新失败')
        }


      }).catch(() => {
      })
    },
    // 删除当前角色
    showDelRole () {
      const currentNode = this.currentRole
      const nodeName = currentNode.name
      this.$Modal.confirm({
        title: '删除确认',
        content: `确实删除名称为 <strong> ${nodeName} </strong> 的角色吗？`,
        onOk: () => {
          api.delRoleGroup({roleId:currentNode.id})
            .then(rs => {
              if (rs.code === 1000) {
                this.$Message.success('删除成功！')
                this.renderTree()
                this.currentRole = {}
              } else {
                this.$Message.error(rs.message)
              }
            })
            .catch(() => {
            })
        },
        onCancel: () => {
          this.$Message.info({desc: '取消删除'})
        }
      })
    },
    // 显示菜单权限分配modal
    showMenuAllot () {
      this.$refs.menu.show(this.currentRole.id)
    },
    // 显示页面元素权限分配modal
    showElementPermissionModal() {
      this.$refs.element.show(this.currentRole.id)
    }
  }
}
</script>
