import * as names from '../names'

export const publicModule = [
  /* 用户中心 -- 用户信息 */
  {
    path: 'user-center/user-info',
    name: names.PUBLIC_USER_CENTER__USER_INFO,
    component (resolve) {
      require(['../../components/public-platform/user-center/user-info/user-info.vue'], resolve)
    }
  },
  /* 访问管理 -- 用户配置 */
  {
    path: 'visit-manage/user-config',
    name: names.PUBLIC_VISIT_MANAGE__USER_CONFIG,
    component (resolve) {
      require(['../../components/public-platform/visit-manage/user-config/user-config.vue'], resolve)
    }
  },
  /* 访问管理 -- 管理员配置 */
  {
    path: 'visit-manage/manage-config',
    name: names.PUBLIC_VISIT_MANAGE__MANAGE_CONFIG,
    component (resolve) {
      require(['../../components/public-platform/visit-manage/manage-config/manage-config.vue'], resolve)
    }
  },
  /* 用户管理 -- 用户列表 */
  {
    path: 'user-manage/user-list',
    name: names.PUBLIC_USER_MANAGE__USER_LIST,
    component (resolve) {
      require(['../../components/public-platform/user-manage/user-list/index.vue'], resolve)
    }
  },
  /* 用户管理 -- 工厂配置 */
  {
    path: 'user-manage/factory',
    name: names.PUBLIC_USER_WORK__FACTORY,
    component (resolve) {
      require(['../../components/public-platform/user-manage/factory/index.vue'], resolve)
    }
  },
  /* 用户管理 -- 人员信息 */
  {
    path: 'user-manage/person-information',
    name: names.PUBLIC_USER_PERSERN_INFORMATION,
    component (resolve) {
      require(['../../components/public-platform/user-manage/person-information/index.vue'], resolve)
    }
  },
  /* 用户管理 -- 管理员列表 */
  {
    path: 'user-manage/manager-list',
    name: names.PUBLIC_USER_MANAGE__MANAGER_LIST,
    component (resolve) {
      require(['../../components/public-platform/user-manage/manager-list/manager-list.vue'], resolve)
    }
  },
  /* 权限管理 -- 角色管理 */
  {
    path: 'permission-manage/role-manage',
    name: names.PUBLIC_PERMISSION_MANAGE__ROLE_MANAGE,
    component (resolve) {
      require(['../../components/public-platform/permission-manage/role-manage/role-manage.vue'], resolve)
    }
  },
  /* 权限管理 -- 权限管理 */
  {
    path: 'permission-manage/permission-manage',
    name: names.PUBLIC_PERMISSION_MANAGE__PERMISSION_MANAGE,
    component (resolve) {
      require(['../../components/public-platform/permission-manage/permission-manage/permission-manage.vue'], resolve)
    }
  },
  /* 权限管理 -- 模块管理 */
  {
    path: 'permission-manage/modular-list',
    name: names.PUBLIC_PERMISSION_MANAGE__MODULAR_LIST,
    component (resolve) {
      require(['../../components/public-platform/permission-manage/modular-list/modular-list.vue'], resolve)
    }
  },
  /* 权限管理 -- 子系统管理 */
  {
    path: 'permission-manage/subsystem-list',
    name: names.PUBLIC_PERMISSION_MANAGE__SUBSYSTEM_LIST,
    component (resolve) {
      require(['../../components/public-platform/permission-manage/subsystem-list/subsystem-list.vue'], resolve)
    }
  },
  /* 权限管理 -- 组织管理 */
  {
    path: 'permission-manage/organization-manage',
    name: names.PUBLIC_PERMISSION_MANAGE__ORGANIZATION_MANAGE,
    component (resolve) {
      require(['../../components/public-platform/permission-manage/organization-manage/organization-manage.vue'], resolve)
    }
  }
]
