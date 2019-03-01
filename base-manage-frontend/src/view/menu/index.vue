<!--
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-12 12:35:14
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-12 12:58:24
 * @Description: file content
 -->
<template>
  <Card shadow>
    <p slot="title">菜单和资源配置</p>
    <div class="mb-20 clearfix">
      <Button
        class="fr"
        type="success"
        v-check-promission="elements.config.menu.btnCreateTop"
        @click="showCreateTopMenu"
      >
        <Icon type="ios-add-circle" /> 添加菜单</Button>
      选择系统：
      <Select
        v-model="currentSystemId"
        @on-change="changeSystem"
        style="width:200px"
      >
        <Option
          v-for="item in systemList"
          :value="item.id"
          :key="item.id"
        >{{ item.name }}</Option>
      </Select>
    </div>
    <div>
      <Row :gutter="16">
        <Col span="6">
        <Card>
          <div slot="title">菜单树</div>
          <Tree
            :data="menuTreeData"
            @on-select-change="getNodeInfo"
          ></Tree>
        </Card>
        </Col>
        <Col span="6">
        <Card v-if="flagNodeSelected==true" style="min-width:275px;">
          <div slot="title">
            菜单节点配置
          </div>
          <div>
            <div class="mb-20">
              <ButtonGroup>
                <Button
                  type="success"
                  size="small"
                  @click="createSubMenu"
                  v-check-promission="elements.config.menu.btnCreateSon"
                >
                  <Icon type="ios-add-circle"></Icon>
                  新建子菜单
                </Button>
                <Button
                  type="error"
                  size="small"
                  @click="delCurrentNode"
                  v-check-promission="elements.config.menu.btnDelmenu"
                >
                  <Icon type="md-trash"></Icon>
                  删除当前菜单
                </Button>
              </ButtonGroup>
            </div>
            <Form
              :model="selectedItemData"
              :label-width="105"
            >
              <!-- <FormItem label="业务系统编码" prop="sysid">
                                    <Input placeholder="请输入" v-model="selectedItemData.sysid" style="width:150px"></Input>
                                </FormItem> -->
              <FormItem label="标题" prop="label" >
                <Input
                  placeholder="请输入"
                  v-model="selectedItemData.title"
                  style="width:150px"
                ></Input>
              </FormItem>
              <FormItem label="编码" prop="code" >
                <Input
                  placeholder="请输入"
                  v-model="selectedItemData.code"
                  style="width:150px"
                ></Input>
              </FormItem>
              <FormItem label="父级节点" prop="parentId" v-show="false">
                <Input
                  placeholder="请输入"
                  readonly
                  v-model="selectedItemData.parentId"
                  style="width:150px"
                ></Input>
              </FormItem>
              <FormItem label="component路径" prop="component" >
                <Input
                  placeholder="请输入"
                  v-model="selectedItemData.component"
                  style="width:150px"
                ></Input>
              </FormItem>
              <FormItem label="icon类名" prop="icon" >
                <Input
                  placeholder="请输入"
                  v-model="selectedItemData.icon"
                  style="width:150px"
                ></Input>
              </FormItem>
              <FormItem  label="url" prop="path" >
                <Input
                  placeholder="请输入"
                  v-model="selectedItemData.path"
                  style="width:150px"
                ></Input>
              </FormItem>
              <FormItem label="所属系统" prop="systemId"  v-if="selectedItemData.parentId==-1" >
                <Select
                  v-model="selectedItemData.sysId"
                  style="width:150px"
                >
                  <Option
                    v-for="item in all_system_data"
                    :value="item.id"
                    :key="item.id"
                  >{{ item.name }}</Option>
                </Select>
                <!-- <Input placeholder="请输入" v-model="selectedItemData.systemId" style="width:150px"></Input> -->
              </FormItem>
              <!-- <FormItem label="类型" prop="name">
                        <Input  placeholder="请输入" v-model="selectedItemData.code"></Input>
                    </FormItem> -->
              <!-- <FormItem label="排序" prop="name">
                            <Input placeholder="请输入" v-model="selectedItemData.code" style="width:150px"></Input>
                        </FormItem>
                        <FormItem label="描述" prop="name">
                            <Input placeholder="请输入" v-model="selectedItemData.code" style="width:150px"></Input>
                        </FormItem> -->
              <!-- <FormItem label="前端组件" prop="name">
                        <Input  placeholder="请输入" v-model="selectedItemData.code"></Input>
                    </FormItem> -->
              <div>
                <Button
                  type="primary"
                  :loading="loadingPostMenuData"
                  @click="postNode"
                  v-check-promission="elements.config.menu.btnEditmenu"
                >保存</Button>
              </div>
            </Form>
          </div>
        </Card>
        </Col>
        <Col span="12">
        <Card v-if="flagNodeSelected==true">
          <div slot="title">页面元素配置</div>
          <div>
            <div class="mb-20">
              <Input
                placeholder="请输入资源编码"
                v-model="elementSearchKeyWords"
                style="width: 200px;margin-right:5px;"
              ></Input>
              <Button
                style="margin-right:15px;"
                type="primary"
                @click="getPageElements"
              >搜索</Button>
              <Button
                type="success"
                icon="ios-add-circle"
                @click="showCreateElementModal"
                v-check-promission="elements.config.menu.btnCreateElement"
              >新增</Button>
            </div>
            <Table
              width="100%"
              border
              :loading="loadingElementsData"
              :columns="elementsColumns"
              :data="elementsData"
            ></Table>
          </div>
        </Card>
        </Col>
      </Row>
    </div>

    <!--新建顶级菜单-->
    <Modal
      v-model="modals.createTopMenu.showModal"
      :loading="modals.createTopMenu.loading"
      :title="modals.createTopMenu.modalTitle"
      @on-ok="postTopNode"
    >
      <Form
        ref="createTopMenu_form"
        :model="modals.createTopMenu.data"
        :rules="modals.createTopMenu.rules"
        :label-width="120"
      >
       <FormItem
          label="标题"
          prop="title"
        >
          <Input
            placeholder="请输入"
            v-model="modals.createTopMenu.data.title"
          ></Input>
        </FormItem>
        <FormItem
          label="编码"
          prop="code"
        >
          <Input
            placeholder="请输入"
            v-model="modals.createTopMenu.data.code"
          ></Input>
        </FormItem>
       <FormItem label="component路径" prop="component" >
                <Input
                  placeholder="请输入"
                  v-model="modals.createTopMenu.data.component"
                ></Input>
              </FormItem>
        <FormItem
          label="icon类名"
          prop="icon"
        >
          <Input
            placeholder="请输入"
            v-model="modals.createTopMenu.data.icon"
          ></Input>
        </FormItem>
        <FormItem
          label="url"
          prop="path"
        >
          <Input
            placeholder="请输入"
            v-model="modals.createTopMenu.data.path"
          ></Input>
        </FormItem>
      </Form>
    </Modal>

    <!--页面元素弹层-->
    <Modal
      v-model="modals.createOrUpdateElement.showModal"
      :title="modals.createOrUpdateElement.modalTitle"
      @on-ok="postElement"
    >
      <Form
        ref="createOrUpdateElementForm"
        :model="modals.createOrUpdateElement.data"
        :rules="modals.createOrUpdateElement.rules"
        :label-width="120"
      >
        <FormItem
          label="资源类型"
          prop="type"
        >
          <Select
            v-model="modals.createOrUpdateElement.data.type"
            style="width:200px"
          >
            <Option
              v-for="item in modals.createOrUpdateElement.sourceTypeList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="资源名称"
          prop="name"
        >
          <Input
            placeholder="请输入资源名称"
            v-model="modals.createOrUpdateElement.data.name"
            style="width:300px;"
          ></Input>
        </FormItem>
        <FormItem
          label="资源编码"
          prop="code"
        >
          <Input
            placeholder="请输入资源编码"
            v-model="modals.createOrUpdateElement.data.code"
            style="width:300px;"
          ></Input>
        </FormItem>
        <FormItem
          v-if="modals.createOrUpdateElement.data.type !== 'BUTTON'"
          label="资源请求类型"
          prop="requestType"
        >
          <Select
            v-model="modals.createOrUpdateElement.data.requestType"
            style="width:200px"
          >
            <Option
              v-for="item in modals.createOrUpdateElement.sourceMethodsList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="资源地址"
          prop="requestAddr"
          v-if="modals.createOrUpdateElement.data.type !== 'button'"
        >
          <Input
            placeholder="请输入资源地址"
            v-model="modals.createOrUpdateElement.data.requestAddr"
            style="width:300px;"
          ></Input>
        </FormItem>
      </Form>
    </Modal>

  </Card>
</template>
<script>
import api from '@/api/menuManager'
import {checkElementPermission} from '@/libs/resources'
import elements from '@/config/elements'
export default {
  name: 'menu-manager',
  components: {
  },
  data () {
    return {
      modals: {
        createOrUpdateElement: {
          showModal: false,
          modalTitle: '新增资源',
          type: 'create',
          rules: {
            name: [{
              required: true,
              message: '请填写资源名称',
              trigger: 'blur'
            }]
          },
          sourceTypeList: [{
            value: 'BUTTON',
            label: 'BUTTON'
          },
          {
            value: 'URI',
            label: 'URI'
          }
          ],
          sourceMethodsList: [{
            value: 'GET',
            label: 'GET'
          },
          {
            value: 'POST',
            label: 'POST'
          },
          {
            value: 'PUT',
            label: 'PUT'
          },
          {
            value: 'DELETE',
            label: 'DELETE'
          }
          ],
          data: {
            name: '',
            code: '',
            type: 'button',
            requestType: 'GET',
            requestAddr: '',
            menuId: null
          }
        },
        createTopMenu: {
          showModal: false,
          modalTitle: '新增顶级菜单',
          loading: true,
          rules: {
            code: [{
              required: true,
              message: '请填写路径编码',
              trigger: 'blur'
            }],
            title: [{
              required: true,
              message: '请填写标题',
              trigger: 'blur'
            }],
            path: [{
              required: true,
              message: '请填写路由地址',
              trigger: 'blur'
            }],
            // icon:[{
            //     required: true,
            //     message: "请填写图标类名",
            //     trigger: "blur"
            // }],
            component: [{
              required: true,
              message: '请填写模块内容',
              trigger: 'blur'
            }]
          },
          data: {
            code: '',
            title: '',
            icon: '',
            path: '',
            parentId: ''
          }
        }
      },
      systemList: [],
      currentSystemId: undefined,
      menuTreeData: [],
      loadingElementsData: false,
      elementsData: [],
      flagNodeSelected: false,
      loadingPostMenuData: false,
      flagNodeSelected: false,
      elementSearchKeyWords: '',
      selectedItemData: {component: '', icon: ''},
      elementsColumns: [{
        title: 'id',
        key: 'id',
        width: 80
      },
      {
        title: '资源编码',
        key: 'code',
        width: 120
      },
      {
        title: '资源名称',
        key: 'name',
        width: 120
      },
      {
        title: '资源类型',
        key: 'type',
        width: 100
      },

      {
        title: '资源地址',
        key: 'requestAddr',
        width: 200
      },
      {
        title: '资源请求类型',
        key: 'requestType',
        width: 120
      }, {
        title: '操作',
        key: '',
        width: 180,
        fixed: 'right',
        render: (h, params) => {

            const btnEdit =h(
              'Button', {
                props: {
                  size: 'small',
                  icon: 'md-create'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showUpdateElementModal(params.index)
                  }
                }
              },
              '修改'
            )
           const btnDel =  h(
              'Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: 'md-trash'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.delResourceConfirm(params.index)
                  }
                }
              },
              '删除'
            )
            let btns = []
            if (checkElementPermission(elements.config.menu.btnEditElement)) btns.push(btnEdit)
            if (checkElementPermission(elements.config.menu.btnDelElement)) btns.push(btnDel)
            return h('div', btns)
        }
      }
      ],
      elements: elements
    }

  },
  methods: {
    // 获取系统列表
    getSystemData () {
      const that = this
      api.getAllSystem()
        .then(res => {
          that.systemList = res.data
          that.currentSystemId = res.data[0].id
          that.getMenuBySystemId()
        })
        .catch(error => {
          // Message.error(error);
          console.log('error', error)
        })
    },
    // 切换系统
    changeSystem (systemId) {
      this.currentSystemId = systemId
      this.getMenuBySystemId()
      this.flagNodeSelected = false
    },
    // 显示添加顶级菜单
    showCreateTopMenu () {
      this.modals.createTopMenu.showModal = true
      this.flagNodeSelected = false
      this.modals.createTopMenu.data = {}
      // this.modals.createTopMenu.data.parentId = -1;
    },
    // 获取某个系统下的菜单树
    getMenuBySystemId () {
      const that = this
      api.ajaxGetMenuBySystemId({systemId: that.currentSystemId}).then(res => {
        that.menuTreeData = JSON.parse(JSON.stringify(res.data).replace(/name/g, 'title'))
      }).catch(error => {
        // Message.error(error);
        console.log('error', error)
      })
    },
    // 获取节点信息
    getNodeInfo (selectedData) {
      if (!selectedData.length) {
        return false
      }
      this.flagCreateOrPutMenu = 'put'
      this.flagNodeSelected = true
      const temp_node_data = JSON.parse(JSON.stringify(selectedData[0]))
      this.selectedItemData = temp_node_data
      this.getPageElements()
    },
    // 根据menuId获取页面元素配置
    getPageElements () {
      const that = this
      this.loadingElementsData = true
      api.getPageElement({
        page: 1,
        limit: 100,
        menuId: that.selectedItemData.id,
        name: that.elementSearchKeyWords,
        systemId: that.currentSystemId
      }).then(rs => {
        that.loadingElementsData = false
        that.elementsData = rs.data
      })
    },
    // 新增子页面
    createSubMenu () {
      if (this.selectedItemData.code) {
        this.flagCreateOrPutMenu = 'create'
        const parentId = this.selectedItemData.id
        this.selectedItemData = {}
        this.selectedItemData.parentId = parentId
        this.selectedItemData.systemId = this.currentSystemId
      }
    },
    // 删除当前节点
    delCurrentNode () {
      const _name = this.selectedItemData.title
      if (!this.selectedItemData.title) return
      this.$Modal.confirm({
        title: '菜单项删除确认',
        content: '<p>你确认删除 <strong class="color-red">' + _name + '</strong> 的节点吗，此操作不可逆，请谨慎操作！</p>',
        onOk: () => {
          api.delMenu({menuId: this.selectedItemData.id}).then(() => {
            this.$Message.success('删除成功')
            this.getMenuBySystemId()
            this.selectedItemData = {}
          })
        }
      })
    },
    // 删除资源确认
    delResourceConfirm (idx) {
      const resourceName = this.elementsData[idx].name
      this.$Modal.confirm({
        title: '资源删除确认',
        content: '<p>你确认删除名为 <strong class="color-red">' + resourceName + '</strong> 的资源吗，此操作不可逆，请谨慎操作！</p>',
        onOk: () => {
          api.delElement({id: this.elementsData[idx].id}).then(() => {
            this.$Message.success('删除成功')
            this.getPageElements()
          })
        }
      })
    },
    // 显示修改页面元素
    showUpdateElementModal (index) {
      const temp_edit_data = JSON.parse(JSON.stringify(this.elementsData[index]))
      this.modals.createOrUpdateElement.type = 'put'
      this.modals.createOrUpdateElement.modalTitle = '修改元素'
      this.modals.createOrUpdateElement.data = temp_edit_data
      this.modals.createOrUpdateElement.showModal = true
    },
    // 保存节点配置信息
    postNode () {
      this.loadingPostMenuData = true
      if (this.flagCreateOrPutMenu == 'create') {
        api.createMenu({...this.selectedItemData, name: this.selectedItemData.title})
          .then(rs => {
            this.loadingPostMenuData = false
            this.$Message.success('操作成功！')
            this.getMenuBySystemId()
            this.selectedItemData = {}
          })
          .catch(e => {
            this.loadingPostMenuData = false
          })
      } else {
        if (!this.selectedItemData.parentId) this.selectedItemData.parentId = 0
        api.putMenu({sysMenuList: [{...this.selectedItemData, name: this.selectedItemData.title}]})
          .then(rs => {
            this.loadingPostMenuData = false
            this.$Message.success('操作成功！')
            this.getMenuBySystemId()
          })
          .catch(e => {
            this.loadingPostMenuData = false
          })
      }
    },
    // 显示新增页面元素
    showCreateElementModal () {
      this.modals.createOrUpdateElement.type = 'create'
      this.modals.createOrUpdateElement.modalTitle = '新增元素'
      this.modals.createOrUpdateElement.data = {
        name: '',
        code: '',
        type: 'button',
        method: 'GET',
        uri: '',
        menuId: null
      }
      this.modals.createOrUpdateElement.showModal = true
    },
    changePutConnectedUserLoading () {
      this.modals.createTopMenu.loading = false
      this.$nextTick(() => {
        this.modals.createTopMenu.loading = true
      })
    },
    // 保存顶级节点配置信息
    postTopNode () {
      this.loadingPostMenuData = true
      this.$refs['createTopMenu_form'].validate(valid => {
        if (!valid) {
          return this.changePutConnectedUserLoading()
        }
        api.createMenu({...this.modals.createTopMenu.data, name: this.modals.createTopMenu.data.title, systemId: this.currentSystemId})
          .then(rs => {
            this.modals.createTopMenu.showModal = false
            this.loadingPostMenuData = false
            this.$Message.success('操作成功！')
            this.getMenuBySystemId()
          })
          .catch(e => {
            this.loadingPostMenuData = false
          })
      })
    },
    // 右侧table 弹出框保存按钮或资源
    postElement () {
      const that = this
      this.modals.createOrUpdateElement.data.systemId = this.currentSystemId
      if (this.modals.createOrUpdateElement.type == 'create') {
        // 新增
        this.modals.createOrUpdateElement.data.menuId = this.selectedItemData.id

        if (this.modals.createOrUpdateElement.data.type === 'BUTTON') {
          delete this.modals.createOrUpdateElement.data.uri
          delete this.modals.createOrUpdateElement.data.method
        }

        api.createElement(this.modals.createOrUpdateElement.data)
          .then(rs => {
            that.getPageElements()
          })
          .catch(error => { })
      } else {
        // 修改
        if (this.modals.createOrUpdateElement.data.type === 'BUTTON') {
          delete this.modals.createOrUpdateElement.data.uri
          delete this.modals.createOrUpdateElement.data.method
        }
        api.putElement(this.modals.createOrUpdateElement.data)
          .then(rs => {
            that.getPageElements()
          })
          .catch(error => { })
      }
    }
  },
  mounted () {
    this.getSystemData()
  }
}
</script>
