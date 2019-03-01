import {
  getParams
} from '@/libs/util'
const USER_MAP = {
  super_admin: {
    'uid': 1,
    'username': 'hello',
    'avator': 'http://haonanxuan.oss-cn-hangzhou.aliyuncs.com/eggadmin/b0c81671759583d.jpg',
    'email': '1584492410@qq.com',
    'mobile': null,
    'menus': [{
      'id': 13,
      'title': '配置',
      'code': 'system',
      'parent_id': 0,
      'path': '/system',
      'icon': null,
      'component': 'components/main',
      'order': 0,
      'name': 'system',
      'meta': {
        'icon': null,
        'showAlways': false,
        'title': '配置'
      },
      'children': [{
        'id': 14,
        'title': '系统配置',
        'code': 'system:manageSystem',
        'parent_id': 13,
        'path': 'setting',
        'icon': null,
        'component': 'view/manage/system/',
        'order': 0,
        'name': 'system:manageSystem',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '系统配置'
        }
      }, {
        'id': 15,
        'title': '菜单配置',
        'code': 'system:menu',
        'parent_id': 13,
        'path': 'menu',
        'icon': null,
        'component': 'view/manage/menu/',
        'order': 0,
        'name': 'system:menu',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '菜单配置'
        }
      }, {
        'id': 16,
        'title': '角色配置',
        'code': 'system:roleManager',
        'parent_id': 13,
        'path': 'roleManager',
        'icon': null,
        'component': 'view/manage/role/',
        'order': 0,
        'name': 'system:roleManager',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '角色配置'
        }
      }, {
        'id': 17,
        'title': '用户配置',
        'code': 'system:user',
        'parent_id': 13,
        'path': 'user',
        'icon': null,
        'component': 'view/manage/user/',
        'order': 0,
        'name': 'system:user',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '用户配置'
        }
      }, {
        'id': 18,
        'title': '日志管理',
        'code': 'system:log',
        'parent_id': 13,
        'path': 'log',
        'icon': null,
        'component': 'view/system/log',
        'order': 0,
        'name': 'system:log',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '日志管理'
        }
      }]
    }],
    'resources': [{
      'id': 13,
      'code': 'system:saveBtn',
      'title': '保存按钮',
      'type': 'BUTTON'
    }],
    'access': ['admin']
  },
  admin: {
    'uid': 1,
    'username': 'hello',
    'avator': 'http://haonanxuan.oss-cn-hangzhou.aliyuncs.com/eggadmin/b0c81671759583d.jpg',
    'email': '1584492410@qq.com',
    'mobile': null,
    'menus': [{
      'id': 13,
      'title': '配置',
      'code': 'system',
      'parent_id': 0,
      'path': '/system',
      'icon': null,
      'component': 'components/main',
      'order': 0,
      'name': 'system',
      'meta': {
        'icon': null,
        'showAlways': false,
        'title': '配置'
      },
      'children': [{
        'id': 14,
        'title': '系统配置',
        'code': 'system:manageSystem',
        'parent_id': 13,
        'path': 'setting',
        'icon': null,
        'component': 'view/manage/system/',
        'order': 0,
        'name': 'system:manageSystem',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '系统配置'
        }
      }, {
        'id': 15,
        'title': '菜单配置',
        'code': 'system:menu',
        'parent_id': 13,
        'path': 'menu',
        'icon': null,
        'component': 'view/manage/menu/',
        'order': 0,
        'name': 'system:menu',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '菜单配置'
        }
      }, {
        'id': 16,
        'title': '角色配置',
        'code': 'system:roleManager',
        'parent_id': 13,
        'path': 'roleManager',
        'icon': null,
        'component': 'view/manage/role/',
        'order': 0,
        'name': 'system:roleManager',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '角色配置'
        }
      }, {
        'id': 17,
        'title': '用户配置',
        'code': 'system:user',
        'parent_id': 13,
        'path': 'user',
        'icon': null,
        'component': 'view/manage/user/',
        'order': 0,
        'name': 'system:user',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '用户配置'
        }
      }, {
        'id': 18,
        'title': '日志管理',
        'code': 'system:log',
        'parent_id': 13,
        'path': 'log',
        'icon': null,
        'component': 'view/system/log',
        'order': 0,
        'name': 'system:log',
        'meta': {
          'icon': null,
          'showAlways': false,
          'title': '日志管理'
        }
      }]
    }],
    'resources': [{
      'id': 13,
      'code': 'system:saveBtn',
      'title': '保存按钮',
      'type': 'BUTTON'
    }],
    'access': ['admin']
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return {
    token: USER_MAP[req.userName].token
  }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  console.log('req', req)

  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
