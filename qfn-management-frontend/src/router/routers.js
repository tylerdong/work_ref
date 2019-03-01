import Main from '@/components/main'
// import parentView from '@/components/parent-view'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
// const routerArr = [
//   {code: '01010101', name: '涤纶长丝', path: 'polyester-silk'},
//   {code: '01010104', name: '涤纶短纤', path: 'polyester-staple'},
//   {code: '01010105', path: 'bottle-flakes', name: '聚酯瓶片'},
//   {code: '01010106', path: 'polyester-chip', name: '聚酯切片'},
//   {code: '01010404', path: 'nylon-filament', name: '锦纶长丝'},
//   {code: '01010405', path: 'polyamide-staple', name: '锦纶短纤'},
//   {code: '01010107', path: 'pta', name: 'PTA'},
//   {code: '01010108', path: 'meg', name: 'MEG'},
//   {code: '01010109', path: 'px', name: 'PX'},
//   {code: '01010110', path: 'ethylene', name: '乙烯'},
//   {code: '01010401', path: 'benzene', name: '苯'},
//   {code: '01010403', path: 'pa', name: 'PA'},
//   {code: '01010402', path: 'CPL', name: '己内酰胺'}
// ]
const router = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // {
  //   path: '/dictionary',
  //   name: 'dictionary',
  //   meta: {
  //     icon: 'md-cube',
  //     title: '基础字典管理'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'dictManager',
  //       name: 'dictManager',
  //       meta: {
  //         icon: 'md-musical-notes',
  //         title: '字典管理',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/dict-manager/')
  //     },
  //     {
  //       path: 'areaManager',
  //       name: 'areaManager',
  //       meta: {
  //         icon: 'md-globe',
  //         title: '销售区域'
  //       },
  //       component: () => import('@/view/area-manager/')
  //     },
  //     {
  //       path: 'categoryManager',
  //       name: 'categoryManager',
  //       meta: {
  //         icon: 'md-barcode',
  //         title: '品名管理'
  //       },
  //       component: () => import('@/view/category-manager/')
  //     },
  //     {
  //       path: 'productManager',
  //       name: 'productManager',
  //       meta: {
  //         icon: 'ios-paper-plane',
  //         title: '产品管理'
  //       },
  //       component: () => import('@/view/product-manager/')
  //     },
  //     {
  //       path: 'factoryManager',
  //       name: 'factoryManager',
  //       meta: {
  //         icon: 'ios-ribbon',
  //         title: '生产厂家'
  //       },
  //       component: () => import('@/view/factory-manager/')
  //     },
  //     {
  //       path: 'marketWeight',
  //       name: 'marketWeight',
  //       meta: {
  //         icon: 'ios-pie',
  //         title: '市场权重配置'
  //       },
  //       component: () => import('@/view/market-weight/')
  //     }
  //   ]
  // },
  // // 资讯管理
  // {
  //   path: '/information',
  //   name: 'information',
  //   meta: { icon: 'ios-paper', title: '资讯管理' },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'addInformation',
  //       name: 'addInformation',
  //       meta: {
  //         icon: 'md-musical-notes',
  //         title: '新增资讯',
  //         notCache: true
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'audit/:id?',
  //           name: 'audit',
  //           meta: {
  //             icon: 'md-link',
  //             title: '新增资讯:编辑',
  //             notCache: true,
  //             hideInMenu: true
  //           },
  //           component: () =>
  //             import('@/view/information-manager/addInformation/audit')
  //         },
  //         {
  //           path: 'index',
  //           name: 'index',
  //           meta: { icon: 'md-link', title: '新增资讯', notCache: true },
  //           component: () =>
  //             import('@/view/information-manager/addInformation/')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'informationAudit',
  //       name: 'informationAudit',
  //       meta: { icon: 'md-musical-notes', title: '资讯审核' },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'index',
  //           name: 'informationAudit:index',
  //           meta: { icon: 'md-musical-notes', title: '资讯审核' },
  //           component: () =>
  //             import('@/view/information-manager/informationAudit/')
  //         },
  //         {
  //           path: 'audit/:id?',
  //           name: 'informationAudit:audit',
  //           meta: {
  //             icon: 'md-musical-notes',
  //             title: '资讯审核:审核',
  //             hideInMenu: true
  //           },
  //           component: () =>
  //             import('@/view/information-manager/informationAudit/audit')
  //         },
  //         {
  //           path: 'edit/:id?',
  //           name: 'informationAudit:edit',
  //           meta: {
  //             icon: 'md-musical-notes',
  //             title: '资讯审核:编辑',
  //             hideInMenu: true
  //           },
  //           component: () =>
  //             import('@/view/information-manager/informationAudit/edit')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'quickInformation',
  //       name: 'quickInformation',
  //       meta: {
  //         icon: 'md-musical-notes',
  //         title: '快讯管理',
  //         notCache: true
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'index',
  //           name: 'quickInformation:index',
  //           meta: { icon: 'md-musical-notes', title: '快讯管理' },
  //           component: () =>
  //             import('@/view/information-manager/quickInformation/')
  //         },
  //         {
  //           path: 'create',
  //           name: 'quickInformation:create',
  //           meta: {
  //             icon: 'md-musical-notes',
  //             title: '快讯管理:新增',
  //             hideInMenu: true,
  //             notCache: true
  //           },
  //           component: () =>
  //             import('@/view/information-manager/quickInformation/form')
  //         },
  //         {
  //           path: 'edit/:id',
  //           name: 'quickInformation:edit',
  //           meta: {
  //             icon: 'md-musical-notes',
  //             title: '快讯管理:编辑',
  //             hideInMenu: true,
  //             notCache: true
  //           },
  //           component: () =>
  //             import('@/view/information-manager/quickInformation/form')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'informationDetail/:id?',
  //       name: 'informationDetail',
  //       meta: {
  //         icon: 'md-musical-notes',
  //         title: '资讯详情',
  //         hideInMenu: true,
  //         notCache: true
  //       },
  //       component: () => import('@/view/information-manager/informationDetail')
  // }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  }
  // {
  //   path: '*',
  //   name: 'error_404',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: () => import('@/view/error-page/404.vue')
  // }
]
// 源数据管理
// let sourceDate = {
//   path: '/source-data',
//   name: 'sourceData',
//   meta: { icon: 'md-menu', title: '源数据管理' },
//   component: 'components/main',
//   // 配置路由子项
//   children: routerArr.map((v, i) => {
//     return {
//       path: v.path,
//       name: v.name,
//       meta: { icon: 'md-link', title: v.name },
//       component: 'components/parent-view',
//       children: [
//         {
//           path: 'data',
//           name: `${v.path}:data`,
//           meta: { icon: 'md-link', title: '数据获取' },
//           component: 'view/source-data/manage/data/',
//           props: { code: v.code }
//         },
//         {
//           path: 'analysis',
//           name: `${v.path}:analysis`,
//           meta: { icon: 'md-link', title: '数据分析审核' },
//           component: 'view/source-data/manage/analysis/',
//           props: { code: v.code }
//         },
//         {
//           path: 'current',
//           name: `${v.path}:current`,
//           meta: { icon: 'md-link', title: '现势数据' },
//           component: 'view/source-data/manage/current/',
//           props: { code: v.code }
//         }
//       ]
//     }
//   })
// }
// console.log(JSON.stringify(sourceDate))
// router.push(sourceDate)
export default router
