/*
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-12 09:55:49
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-13 09:58:43
 * @Description: 元素编码
 */

export default {
  config: {
    // 系统配置
    system: {
      btnCreate: 'config:system:create',
      btnEdit: 'config:system:edit',
      btnDel: 'config:system:del'
    },
    menu: {
      btnCreateTop: 'config:menu:createTop',
      btnCreateSon: 'config:menu:createSon',
      btnDelmenu: 'config:menu:delmenu',
      btnEditmenu: 'config:menu:editmenu',
      btnCreateElement: 'config:menu:createElement',
      btnEditElement: 'config:menu:editElement',
      btnDelElement: 'config:menu:delElement'
    },
    task: {
      btnCreate: 'config:task:create',
      btnStart: 'config:task:start',
      btnPause: 'config:task:pause',
      btnDel: 'config:task:del',
      btnEdit: 'config:task:edit',
      btnExecuted: 'config:task:executed'
    },
    // 角色配置
    role: {
      btnAdd: 'config:role:add',
      btnDel: 'config:role:del',
      btnEdit: 'config:role:edit',
      btnAllotMenu: 'config:role:allotMenu',
      btnAllotEle: 'config:role:allotEle'
    },
    // 用户配置
    user: {
      btnAdd: 'config:user:add',
      btnDel: 'config:user:del',
      btnEdit: 'config:user:edit',
      btnSetRole: 'config:user:setRole',
      btnEditPass: 'config:user:editPass'
    }
  }

}
