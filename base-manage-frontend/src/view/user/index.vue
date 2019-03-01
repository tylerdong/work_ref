<!--
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-12 13:06:39
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-12 13:18:40
 * @Description: file content
 -->
<template>
  <div class="">
    <div class="normal-box-mod">
        <Card shadow>
          <p slot="title">用户管理</p>
          <div class="clearfix mb-20">
            <Button v-check-promission="elements.config.user.btnAdd" type="success" style="float:right" icon="ios-add-circle" @click="show_create_user_modal">新建用户</Button>
            <Input v-model="search_key_words" placeholder="姓名或账户" style="width: 200px;margin-right:10px;"></Input>
            <Button type="primary" icon="ios-search" @click="get_user_info_by_keywords">搜索</Button>
          </div>
          <div class="mb-20">
            <Table border :loading="loading_user_list" :columns="user_list_columns" :data="user_list_data"></Table>
          </div>
          <div>
            <Page :total="data_count" :page-size="pageCount" show-total show-elevator @on-change="changepage"></Page>
          </div>
        </Card>

        <!--新建修改用户-->
        <Modal :mask-closable="false" v-model="modals.create_or_update_user_info.show_modal" :title="modals.create_or_update_user_info.modal_title" :loading="modals.create_or_update_user_info.loading" @on-ok="handle_post_user_info">
          <Form ref="create_or_update_user_info_form" :model="modals.create_or_update_user_info.data" :label-width="80" :rules="modals.create_or_update_user_info.rules">
            <FormItem label="登录名称" prop="loginName">
              <Input placeholder="请输入" v-model="modals.create_or_update_user_info.data.loginName" style="width:300px;"></Input>
            </FormItem>
            <FormItem label="用户名称" prop="userName">
              <Input placeholder="请输入" v-model="modals.create_or_update_user_info.data.userName" style="width:300px;"></Input>
            </FormItem>
            <FormItem label="昵称" prop="nick">
              <Input placeholder="请输入" v-model="modals.create_or_update_user_info.data.nick" style="width:300px;"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="phone">
              <Input placeholder="请输入" v-model="modals.create_or_update_user_info.data.phone" style="width:300px;"></Input>
            </FormItem>
            <!--<FormItem label="用户图标" prop="head">-->
              <!--<Input placeholder="请输入" v-model="modals.create_or_update_user_info.data.head" style="width:300px;"></Input>-->
            <!--</FormItem>-->
            <FormItem label="邮箱" prop="email">
              <Input placeholder="请输入" v-model="modals.create_or_update_user_info.data.email" style="width:300px;"></Input>
            </FormItem>
            <FormItem label="密码" prop="password" v-if="!modals.create_or_update_user_info.data.id">
              <Input placeholder="请输入" v-model="modals.create_or_update_user_info.data.password" style="width:300px;"></Input>
            </FormItem>
          </Form>
        </Modal>

        <!--设置角色组-->
        <Modal :mask-closable="false" v-model="modals.set_role_group.show_modal" :title="modals.set_role_group.modal_title" :loading="modals.set_role_group.loading" @on-ok="post_rolegroup_list">
          <Form ref="set_role_group_form" :rules="modals.set_role_group.rules" :label-width="80">
            <div>
              <template v-for="role in modals.set_role_group.role_group_tree">
                <Card class="role-group">
                  <Checkbox slot="title"
                            :indeterminate="role.indeterminate"
                            :value="role.checkAll"
                            @click.prevent.native="handleCheckAll(role)"><span class="span-bold">{{role.name}}</span>
                  </Checkbox>
                  <div class="role">
                    <Checkbox v-for="(subRole, index) in role.roles"
                              :key="index"
                              :label="subRole.name"
                              @on-change="subRoleChange(role)"
                              v-model="subRole.checked">{{subRole.name}}
                    </Checkbox>
                  </div>
                </Card>
              </template>
            </div>
          </Form>
        </Modal>

        <!--设置密码-->
        <Modal :mask-closable="false" v-model="modals.resetPassword.show_modal" title="修改密码" :loading="modals.resetPassword.loading" @on-ok="handle_post_user_password">
          <Form ref="reset_password_form" :model="modals.resetPassword.data" :rules="modals.resetPassword.rules" :label-width="80">
            <FormItem label="密码" prop="password">
              <Input placeholder="请输入密码" v-model="modals.resetPassword.data.password" style="width:300px;"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="repeatPassword">
              <Input placeholder="请输入确认密码" v-model="modals.resetPassword.data.repeatPassword" style="width:300px;"></Input>
            </FormItem>
          </Form>
        </Modal>

    </div>
  </div>
</template>
<script>
import {
  getUserList,
  createUser,
  putUser,
  delUser,
  updateSystemAccountList,
  ajaxUpdatePassword
} from '../../api/userManage'
import {getSystemRoleByUserId, updateUserRoleReByUserId, getAllSystem} from '../../api/roleManager'
import moment from 'moment'
import {checkElementPermission} from '@/libs/resources'
import elements from '@/config/elements'
export default {
  data () {
    return {
      loading_user_list: false,
      data_count: 0,
      pageIndex: 1,
      pageCount: 10,
      search_key_words: '',
      sex_list: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      modals: {
        resetPassword: {
          show_modal: false,
          loading: true,
          data: {
            password: '',
            repeatPassword: '',
            userId: null
          },
          rules: {
            password: [
              {
                required: true,
                message: '请填写密码',
                trigger: 'blur'
              }
            ],
            repeatPassword: [
              {
                required: true,
                message: '请填写确认密码',
                trigger: 'blur'
              },
              { validator: this.check_password, trigger: 'blur' }
            ]
          }
        },
        create_or_update_user_info: {
          show_modal: false,
          is_create: true,
          loading: true,
          modal_title: '新增用户',
          rules: {
            loginName: [
              {
                required: true,
                message: '请填写登录名称',
                trigger: 'blur'
              }
            ],
            userName: [
              {
                required: true,
                message: '请填写帐户',
                trigger: 'blur'
              }
            ]
            // password: [{
            //   required: true,
            //   message: '请填写密码',
            //   trigger: 'blur'
            // }, {
            //   required: true,
            //   type: 'string',
            //   min: 6,
            //   message: '密码长度不能小于6位',
            //   trigger: 'blur'
            // }]
          },
          data: {
            loginName: '',
            userName: '',
            nick: '',
            phone: '',
            head: '',
            email: '',
            password: ''
          }
        },
        set_role_group: {
          show_modal: false,
          loading: true,
          modal_title: '设置角色组',
          userId: '',
          role_group_tree: [], // 权限树
          data: {},
          currentSystemId: '1',
          systemList: []
        }
      },
      bind_system_table_columns: [
        {
          title: '子系统名称',
          key: 'systemName',
          width: 140
        },
        {
          title: '用户名',
          render: (h, params) => {
            var that = this
            return h('div', [
              h(
                'Input',
                {
                  props: {
                    type: 'text',
                    value: params.row.systemUserName
                  },
                  on: {
                    'on-blur': function (event) {
                      that.modals.bind_system.system_list[params.index].systemUserName = event.target.value
                    }
                  }
                }
              )])
          }
        },
        {
          title: '操作',
          width: 85,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    icon: 'ios-link'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.bindUserToSystem(params.index)
                    }
                  }
                },
                '绑定'
              )])
          }
        }
      ],
      user_list_columns: [
        {
          title: '序号',
          key: 'id',
          width: 100
        },
        {
          title: '姓名',
          key: 'nick',
          width: 180
        },
        {
          title: '电话',
          key: 'phone',
          width: 180
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
          title: '操作',
          key: 'name',
          minWidth: 380,
          render: (h, params) => {
            let action = []
            if (checkElementPermission(elements.config.user.btnEdit)) action.push(h(
              'Button',
              {
                props: {
                  size: 'small',
                  icon: 'md-create',
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show_update_user_modal(params.index)
                  }
                }
              },
              '修改'
            ))
            if (checkElementPermission(elements.config.user.btnSetRole)) action.push(h(
              'Button',
              {
                props: {
                  size: 'small',
                  icon: 'ios-people'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show_set_role_group(params.row.id)
                  }
                }
              },
              '设置角色组'
            ))
            if (checkElementPermission(elements.config.user.btnEditPass)) action.push(h(
              'Button',
              {
                props: {
                  size: 'small',
                  icon: 'ios-lock'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show_change_password_modal(params.row.id)
                  }
                }
              },
              '修改密码'
            ))
            if (checkElementPermission(elements.config.user.btnDel)) action.push(h(
              'Button',
              {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: 'ios-trash'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.del_user_confirm(params.index)
                  }
                }
              },
              '删除'
            ))
            return h('div', action)
          }
        }
      ],
      user_list_data: [],
      elements: elements
    }
  },
  methods: {
    /**
     * 获取用户列表数据
     */
    renderTableList: function () {
      const that = this
      this.loading_user_list = true
      getUserList({
        pageIndex: this.pageIndex,
        pageCount: this.pageCount,
        nick: this.search_key_words
      }).then(function (rs) {
        that.user_list_data = rs.data.list
        that.data_count = rs.data.count
        that.loading_user_list = false
      })
    },
    // 判断密码是否相同
    check_password (rule, value, callback, source, options) {
      if (value != this.modals.resetPassword.data.password) {
        return callback(new Error('两次输入密码不相同'))
      } else {
        callback()
      }
    },
    /**
     * 绑定系统
     */
    bindUserToSystem: function (idx) {
      const that = this
      // this.$Spin.show();
      updateSystemAccountList({
        sysId: this.modals.bind_system.system_list[idx].sysId,
        subsystemName: this.modals.bind_system.system_list[idx].systemUserName,
        userId: this.modals.bind_system.userId
      }).then(function (rs) {
        // that.$Spin.hide();
        if (rs.code == 0) {
          that.$Message.success('更新成功!')
        } else {
          that.$Message.error(rs.message)
          that.modals.bind_system.system_list[idx].systemUserName = ''
        }
      })
    },
    /**
     * 切换分页
     */
    changepage (index) {
      this.pageIndex = index
      this.renderTableList()
    },
    // 显示新建用户信息弹层
    show_create_user_modal () {
      this.$refs['create_or_update_user_info_form'].resetFields()
      this.modals.create_or_update_user_info.show_modal = true
      this.modals.create_or_update_user_info.is_create = true

      this.modals.create_or_update_user_info.data.id = undefined
      this.modals.create_or_update_user_info.modal_title = '添加用户'
      this.modals.create_or_update_user_info.data.loginName = ''
      this.modals.create_or_update_user_info.data.userName = ''
      this.modals.create_or_update_user_info.data.nick = ''
      this.modals.create_or_update_user_info.data.phone = ''
      this.modals.create_or_update_user_info.data.head = ''
      this.modals.create_or_update_user_info.data.email = ''
      this.modals.create_or_update_user_info.data.password = ''
      this.modals.create_or_update_user_info.rules.password = [{
        required: true,
        message: '请填写密码',
        trigger: 'blur'
      }, {
        type: 'string',
        min: 6,
        message: '密码长度不能小于6位',
        trigger: 'blur'
      }]
    },
    // 显示修改用户信息弹层
    show_update_user_modal (index) {
      this.modals.create_or_update_user_info.rules.password = []
      this.$refs['create_or_update_user_info_form'].resetFields()
      this.modals.create_or_update_user_info.show_modal = true
      this.modals.create_or_update_user_info.is_create = false
      this.modals.create_or_update_user_info.modal_title = '修改用户'

      this.modals.create_or_update_user_info.data = JSON.parse(
        JSON.stringify(this.user_list_data[index])
      )
      // this.modals.create_or_update_user_info.data.password = undefined
    },
    // 显示设置用户组弹层
    show_set_role_group (id) {
      getSystemRoleByUserId({userId: id}).then(res => {
        if (res.code === 1000) {
          this.modals.set_role_group.role_group_tree = res.data.map(role => {
            let checkAll = role.roles.every(subRole => subRole.checked)
            let indeterminate = checkAll ? false : role.roles.some(subRole => subRole.checked)
            let checkAllGroup = role.roles.filter(subRole => subRole.checked).map(subRole => subRole.id)
            return {...role, checkAll, indeterminate, checkAllGroup}
          })
        } else {
          this.$Message.error({content: res.message})
        }
        console.log(this.modals.set_role_group.role_group_tree)
      }).catch(e => {
        this.$Message.error({content: e.message})
      })
      this.$refs['set_role_group_form'].resetFields()
      this.modals.set_role_group.show_modal = true
      this.modals.set_role_group.userId = id
    },
    // 显示设置密码弹层
    show_change_password_modal (id) {
      this.modals.resetPassword.show_modal = true
      this.$refs['reset_password_form'].resetFields()
      this.modals.resetPassword.data.userId = id
    },
    // 删除确认
    del_user_confirm (index) {
      let that = this
      const _id = this.user_list_data[index].id
      const _name = this.user_list_data[index].userName
      const _username = this.user_list_data[index].nick
      this.$Modal.confirm({
        title: '删除确认',
        content: `<p>你确认要删除姓名为 <strong>${_name}</strong> ,用户名为 <strong>${_username}</strong> 的记录吗？</p>`,
        loading: true,
        onOk: () => {
          delUser({id: _id})
            .then(function () {
              that.$Modal.remove()
              that.$Message.success('操作成功')
              that.renderTableList()
            })
            .catch(function (e) {
              that.$Message.error('操作失败' + e)
            })
        }
      })
    },
    // 搜索按钮
    get_user_info_by_keywords () {
      this.data_count = 0
      this.pageIndex = 1
      this.renderTableList()
    },
    // 改变load状态
    change_user_info_loading () {
      this.modals.create_or_update_user_info.loading = false
      this.$nextTick(() => {
        this.modals.create_or_update_user_info.loading = true
      })
    },
    // 提交修改密码表单
    handle_post_user_password () {
      this.$refs['reset_password_form'].validate(valid => {
        if (valid) {
          ajaxUpdatePassword(this.modals.resetPassword.data).then(res => {
            this.modals.resetPassword.loading = false
            this.$nextTick(() => {
              this.modals.resetPassword.loading = true
            })
            if (res.code === 1000) {
              this.$Message.success(res.message)
              this.modals.resetPassword.show_modal = false
            } else {
              this.$Message.error(res.message)
            }
          }).catch(err => {
            console.log('er', err)
          })
        } else {
          this.modals.resetPassword.loading = false
          this.$nextTick(() => {
            this.modals.resetPassword.loading = true
          })
        }
      })
    },
    // 提交添加删除用户表单
    handle_post_user_info () {
      this.$refs['create_or_update_user_info_form'].validate(valid => {
        const that = this
        if (!valid) {
          return that.change_user_info_loading()
        }
        if (that.modals.create_or_update_user_info.data.id) {
          // 修改用户
          putUser(that.modals.create_or_update_user_info.data)
            .then(function (rs) {
              that.change_user_info_loading()
              that.modals.create_or_update_user_info.show_modal = false
              that.$Message.success('操作成功')
              that.renderTableList()
            })
            .catch(function (e) {
              that.$Modal.remove()
              that.$Message.error('操作失败' + e)
            })
        } else {
          // 新增用户
          createUser(that.modals.create_or_update_user_info.data)
            .then(function (rs) {
              if (rs.code == 1000 || rs.code == 200) {
                that.change_user_info_loading()
                that.modals.create_or_update_user_info.show_modal = false
                that.$Message.success('操作成功')
                that.renderTableList()
              } else {
                that.$Message.error(rs.message)
              }
            })
            .catch(function (e) {
              that.$Modal.remove()
              that.$Message.error('操作失败' + e)
            })
        }
      })
    },
    // 选择所有父角色
    handleCheckAll (role) {
      if (role.indeterminate) {
        role.checkAll = false
      } else {
        role.checkAll = !role.checkAll
      }
      role.indeterminate = false
      role.roles.forEach(subRole => {
        subRole.checked = role.checkAll
      })
    },
    // 选择子角色
    subRoleChange (role) {
      let checkedLength = role.roles.filter(subRole => subRole.checked).length
      if (role.roles.length === checkedLength) {
        role.indeterminate = false
        role.checkAll = true
      } else if (checkedLength > 0) {
        role.indeterminate = true
        role.checkAll = false
      } else {
        role.indeterminate = false
        role.checkAll = false
      }
    },
    // 提交角色组权限列表
    post_rolegroup_list () {
      let data = {
        userId: this.modals.set_role_group.userId,
        roleIds: []
      }
      this.modals.set_role_group.role_group_tree.forEach(role => {
        role.roles.forEach(subRole => {
          if (subRole.checked) data.roleIds.push(subRole.id)
        })
      })
      updateUserRoleReByUserId(data).then(res => {
        if (res.code === 1000) {
          this.$Message.success(res.message)
          this.modals.set_role_group.show_modal = false
        } else {
          this.$Message.error(res.message)
        }
      }).catch(e => {
        this.$Message.error({content: e.response.data.message})
      })
    }
  },
  created () {
    this.renderTableList()
  }
}
</script>
<style lang="less" scoped>
.bind-system-table {
    .bst-l {
        text-align: right;
        font-size: 14px;
        padding: 3px 15px 3px 0;
    }
    .bst-m {
        padding: 3px 15px 3px 0;
    }
    .bst-r {
    }
}
.no-footer-modal {
    .ivu-modal-footer {
        padding: 0;
        border-top: none;
    }
}
.role-group {
  &:not(:first-child) {
    margin-top: 10px;
  }
  .role {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &>label {
      min-width: 70px;
    }
  }
  .span-bold {
    font-weight: bold;
  }
}

</style>
