<!--
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-11 17:58:55
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-13 10:07:55
 * @Description: file content
 -->
<template>
  <Card shadow>
    <p slot="title">系统管理</p>
    <div>
      <div class="clearfix mb-10">
        <Button
          v-if="hasCreatePermission"
          type="success"
          icon="ios-add-circle"
          @click="showCreateModal"
          class="fr"
        >添加系统</Button>
      </div>
      <div class="mb-10">
        <Table
          :loading="list.loading"
          :columns="list.columns"
          :data="list.tableData"
          @on-selection-change="selectionChange"
        ></Table>
      </div>
      <div class="clearfix">
        <Page
          class="fr"
          :total="queryData.totalRecord"
          :page-size="queryData.pageSize"
          :current="queryData.pageIndex"
          @on-change="changePage"
          @on-page-size-change="onPageSizeChange"
          show-sizer
        ></Page>
      </div>
    </div>
    <!--新建&修改-->
    <Modal
      v-model="modals.System.isShow"
      :loading="modals.System.loading"
      :mask-closable="false"
      :title="modals.System.title"
      @on-ok="postData"
    >
      <Form
        ref="SystemFrom"
        :model="modals.System.formData"
        :rules="modals.System.rules"
        :label-width="120"
      >
        <FormItem label="名称" prop="name">
          <Input placeholder="请输入系统名称" v-model="modals.System.formData.name" style="width:300px;"/>
        </FormItem>
        <FormItem label="URL" prop="url">
          <Input placeholder="请输入系统URL" v-model="modals.System.formData.url" style="width:300px;"/>
        </FormItem>
        <FormItem label="code" prop="code">
          <Input
            placeholder="请输入系统code"
            v-model="modals.System.formData.code"
            style="width:300px;"
          />
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>
<script>
import api from '@/api/data'
import moment from 'moment'
import { checkElementPermission } from '@/libs/resources'
import elements from '@/config/elements'
export default {
  name: 'System',
  data () {
    return {
      // 弹出层数据
      modals: {
        System: {
          isShow: false,
          loading: true,
          type: 'create', // create 新建，update 修改
          title: '新建',
          rules: {
            name: [
              {
                required: true,
                message: '请填写系统名称',
                trigger: 'blur'
              }
            ],
            url: [
              {
                required: true,
                message: '请填写URL',
                trigger: 'blur'
              }
            ],
            code: [
              {
                required: true,
                message: '请填写code',
                trigger: 'blur'
              }
            ]
          },
          formData: {
            id: undefined,
            name: '',
            url: '',
            code: ''
          }
        }
      },
      // 列表
      list: {
        loading: false,
        selections: [],
        // 列表展示数据
        tableData: [],
        // 表格表头
        columns: [
          // 开始自动生成
          {
            title: 'ID',
            key: 'id',
            width: 120
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: 'URL',
            key: 'url'
          },
          {
            title: '创建时间',
            key: 'gmtCreate',
            width: 180,
            render: (h, params) => {
              const formatString = 'YYYY-MM-DD HH:mm:ss'
              const fds = moment
                .unix(params.row.gmtCreate / 1000)
                .format(formatString)
              return h('span', fds)
            }
          },
          {
            title: '更新时间',
            key: 'gmtModified',
            width: 180,
            render: (h, params) => {
              const formatString = 'YYYY-MM-DD HH:mm:ss'
              const fds = moment
                .unix(params.row.gmtModified / 1000)
                .format(formatString)
              return h('span', fds)
            }
          },
          // 自动生成结束
          {
            title: '操作',
            align: 'center',
            width: 130,
            render: (h, params) => {
              const btnEdit = h(
                'Button',
                {
                  props: {
                    // type: "ghost",
                    size: 'small'
                  },
                  class: 'mr-20',
                  on: {
                    click: () => {
                      this.showUpdateModal(params.index)
                    }
                  }
                },
                [h('Icon', { props: { type: 'md-people', size: 14 } })]
              )

              const btnDel = h(
                'Button',
                {
                  props: {
                    title: '删除',
                    size: 'small'
                  },
                  class: '',
                  on: {
                    click: () => {
                      this.delData(params.row.id)
                    }
                  }
                },
                [h('Icon', { props: { type: 'ios-trash', size: 14 } })]
              )

              let btns = []

              if (checkElementPermission(elements.config.system.btnEdit)) {
                btns.push(btnEdit)
              }
              if (checkElementPermission(elements.config.system.btnDel)) {
                btns.push(btnDel)
              }

              return h('div', { class: 'action-group' }, btns)
            }
          }
        ]
      },
      // 页面查询数据
      queryData: {
        pageCount: 10,
        pageIndex: 1
      }
    }
  },
  methods: {
    // 获取列表
    getTableData () {
      const that = this
      that.queryData.totalRecord = undefined
      api
        .ajaxGetSystem(that.queryData)
        .then(res => {
          that.list.tableData = res.data.list
          that.queryData.totalRecord = res.data.count
          that.queryData.page = res.data.pageIndex
          that.queryData.limit = res.data.pageCount
          // that.queryData.startDate = res.startDate;
          // that.queryData.endDate = res.endDate;
        })
        .catch(error => {
          that.$Message.error(error)
        })
    },

    // 新建&修改
    postData () {
      const that = this
      that.$refs['SystemFrom'].validate(valid => {
        if (valid) {
          // 新建
          if (!that.modals.System.formData.id) {
            api
              .ajaxPostSystem(that.modals.System.formData)
              .then(res => {
                that.modals.System.isShow = false
                that.modals.System.loading = false
                if (res.code == 1000 || res.code == 200) {
                  that.getTableData()
                  that.$Message.success({
                    content: '保存成功!'
                  })
                } else {
                  that.$Message.error({
                    content: res.message
                  })
                }
              })
              .catch(error => {
                that.$Message.error(error)
              })
          } else {
            // 修改
            api
              .ajaxPostSystem(that.modals.System.formData)
              .then(res => {
                that.modals.System.isShow = false
                that.modals.System.loading = false
                if (res.code) {
                  that.getTableData()
                  that.$Message.success({
                    content: '保存成功!'
                  })
                } else {
                  that.$Message.error({
                    content: res.message
                  })
                }
              })
              .catch(error => {
                that.$Message.error(error)
              })
          }
        } else {
          that.modals.System.loading = false
          that.$nextTick(() => {
            that.modals.System.loading = true
          })
        }
      })
    },

    // 删除
    delData (id) {
      // const _id = JSON.parse(JSON.stringify(this.list.tableData))[index].id;
      this.$Modal.confirm({
        title: '确认删除',
        content:
          '<p>您确认删除id为 <strong>' +
          id.toString() +
          '</strong> 的记录吗?</p><p>删除后将无法撤销，请谨慎操作！</p>',
        loading: true,
        onOk: () => {
          api
            .ajaxDelSystem({
              id: id
            })
            .then(res => {
              this.$Modal.remove()
              if (res.code == 1000 || res.code == 200) {
                this.$Message.success({
                  content: '删除成功'
                })
                this.queryData.pageIndex = 1
                this.getTableData()
              } else {
                this.$Message.error({
                  content: res.message
                })
              }
            })
        }
      })
    },

    // 排量删除
    batchDel () {
      let ids = []
      this.list.selections.forEach(element => {
        ids.push(element.id)
      })
      if (!ids.length) {
        this.$Message.error({
          content: '请先选择要删除的项！',
          duration: 3
        })
      }
      this.delData(ids)
    },

    // 全选，不全选
    selectionChange (args) {
      this.list.selections = args
    },
    // 每页显示记录数变更
    onPageSizeChange (pageSize) {
      this.queryData.pageSize = pageSize
      this.getTableData()
    },
    // 换页
    changePage (page) {
      this.queryData.pageIndex = page
      this.getTableData()
    },
    // 改变开始时间
    changeStartDate (date) {
      this.queryData.startDate = date
    },
    // 改变结束时间
    changeEndDate (date) {
      this.queryData.endDate = date
    },
    // 查找
    goSearch () {
      this.getTableData()
    },

    // 显示新建弹窗
    showCreateModal () {
      this.modals.System.type = 'create'
      this.modals.System.title = '新建'
      this.modals.System.formData = {
        // 以下自动生成
        id: undefined,
        title: '',
        author: '',
        code: ''
        // 自动生成结束
      }
      this.modals.System.isShow = true
    },

    // 显示修改弹窗
    showUpdateModal (index) {
      this.modals.System.type = 'update'
      this.modals.System.title = '修改'
      this.modals.System.formData = JSON.parse(
        JSON.stringify(this.list.tableData)
      )[index]
      this.modals.System.isShow = true
    }
  },
  computed: {
    hasCreatePermission: function () {
      return checkElementPermission(elements.config.system.btnCreate)
    }
  },
  created () {
    this.getTableData()
  }
}
</script>
