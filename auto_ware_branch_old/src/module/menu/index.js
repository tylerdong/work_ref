/**
 * Created by lingj on 2017/5/2.
 * 加模块id前搜一下，没有在增加，防止冲突
 */
// import * as names from '../../router/names.js'
import storage from 'src/module/storage'
import {labMenu} from './lab'
import {autoMenu} from './auto'
import {warehouseMenu} from './warehouse'
import {publicMenu} from './public'

export const menu = [
  // {
    // id: '05',
    // name: '用户中心',
    // permissionUserType: '100',
    // path: '011',
    // children: [
      // {
      //   id: '0501',
      //   name: '欢迎页',
      //   icon: 'far fa-smile',
      //   path: names.USERCENTER_WELCOME,
      //   children: []
      // }
    // ]
  // },
  {
    id: '03',
    name: '公共平台',
    permissionUserType: '011',
    path: '',
    children: publicMenu
  },
  /** ---------------------------------------自动化--------------------------------------------------- */
  {
    id: '02',
    name: '自动化设备集成管理系统',
    permissionUserType: '100',
    path: '',
    children: autoMenu
  },
  /** ---------------------------------------仓储--------------------------------------------------- */
  {
    id: '06',
    name: '仓储系统',
    permissionUserType: '100',
    path: '',
    children: warehouseMenu
  },
  /** ---------------------------------------实验室--------------------------------------------------- */
  {
    id: '01',
    name: '产品品质数据库系统',
    path: '',
    permissionUserType: '100',
    children: labMenu
  }
]
export const initMenu = () => {
  const permission = storage.getUser().moduleList
  menu.forEach((item1, index1) => {
    let nav2 = []
    item1.children.forEach((item2, index2) => {
      let nav3 = []
      item2.children.forEach((item3, index3) => {
        /* 顶部导航栏权限判断 */
        if (permission.some(item => item.code === item3.permission)) {
          nav3.push(item3)
        }
      })
      item2.children = nav3
      if (nav3.length) {
        item2.path = nav3[0].path
        nav2.push(item2)
      } else {
        item2.path = ''
      }
    })
  })
}

export default menu
