import * as names from '../../router/names'
export const publicMenu = [
  {
    id: '0302',
    name: '访问管理',
    permissionUserType: '011',
    icon: 'far fa-plus-square',
    path: names.PUBLIC_VISIT_MANAGE__USER_CONFIG,
    showChildren: false,
    children: [
      {
        id: '030201',
        name: '用户配置',
        permissionUserType: '010',
        icon: 'far fa-minus-square',
        path: names.PUBLIC_VISIT_MANAGE__USER_CONFIG,
        children: []
      }
      // ,
      // {
      //   id: '030202',
      //   name: '管理员配置',
      //   icon: 'far fa-minus-square',
      //   permissionUserType: '001',
      //   path: names.PUBLIC_VISIT_MANAGE__MANAGE_CONFIG,
      //   children: []
      // }
    ]
  },
  {
    id: '0303',
    name: '用户管理',
    icon: 'far fa-plus-square',
    permissionUserType: '011',
    path: names.PUBLIC_USER_MANAGE__USER_LIST,
    children: [
      // {
      //   path: 'user-manage/user-bind',
      //   name: names.PUBLIC_USER_MANAGE__USER_BIND,
      //   component (resolve) {
      //     require(['../../components/public-platform/user-manage/user-bind/user-bind.vue'], resolve)
      //   }
      // },
      {
        id: '030301',
        name: '用户列表',
        icon: 'far fa-minus-square',
        permissionUserType: '010',
        path: names.PUBLIC_USER_MANAGE__USER_LIST,
        children: []
      },
      {
        id: '030302',
        name: '管理员列表',
        icon: 'far fa-minus-square',
        permissionUserType: '001',
        path: names.PUBLIC_USER_MANAGE__MANAGER_LIST,
        children: []
      },
      // {
      //   id: '030303',
      //   name: '用户绑定',
      //   icon: 'fa fa-minus-square-o',
      //   permissionUserType: '010',
      //   path: names.PUBLIC_USER_MANAGE__USER_BIND,
      //   children: []
      // },
      {
        id: '030304',
        name: '工厂配置',
        icon: 'far fa-minus-square',
        permissionUserType: '010',
        path: names.PUBLIC_USER_WORK__FACTORY,
        children: []
      }
      // {
      //   id: '030305',
      //   name: '人员信息',
      //   icon: 'far fa-minus-square',
      //   permissionUserType: '010',
      //   path: names.PUBLIC_USER_PERSERN_INFORMATION,
      //   children: []
      // }
    ]
  },
  {
    id: '0304',
    name: '权限管理',
    permissionUserType: '011',
    icon: 'far fa-plus-square',
    path: names.PUBLIC_PERMISSION_MANAGE__ROLE_MANAGE,
    showChildren: false,
    children: [
      {
        id: '030401',
        name: '角色管理',
        icon: 'far fa-minus-square',
        permissionUserType: '010',
        path: names.PUBLIC_PERMISSION_MANAGE__ROLE_MANAGE,
        children: []
      },
      {
        id: '030402',
        name: '权限管理',
        icon: 'far fa-minus-square',
        permissionUserType: '010',
        path: names.PUBLIC_PERMISSION_MANAGE__PERMISSION_MANAGE,
        children: []
      },
      {
        id: '030403',
        name: '模块管理',
        icon: 'far fa-minus-square',
        permissionUserType: '010',
        path: names.PUBLIC_PERMISSION_MANAGE__MODULAR_LIST,
        children: []
      },
      {
        id: '030404',
        name: '子系统管理',
        icon: 'far fa-minus-square',
        permissionUserType: '001',
        path: names.PUBLIC_PERMISSION_MANAGE__SUBSYSTEM_LIST,
        children: []
      },
      {
        id: '030405',
        name: '组织管理',
        icon: 'far fa-minus-square',
        permissionUserType: '010',
        path: names.PUBLIC_PERMISSION_MANAGE__ORGANIZATION_MANAGE,
        children: []
      }
    ]
  }
]
