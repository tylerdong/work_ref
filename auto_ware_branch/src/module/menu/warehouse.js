import * as names from '../../router/names'
export const warehouseMenu = [
  {
    id: '0601',
    name: '仓库维护',
    permission: '10007',
    icon: 'far fa-plus-square',
    // path: names.STORAGE__WAREHOUSE_MANAGEMENT__WAREHOUSE,
    showChildren: false,
    children: [
      {
        id: '060101',
        name: '仓库',
        permission: '10008',
        icon: 'fa fa-building',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__WAREHOUSE,
        children: []
      },
      {
        id: '060110',
        name: '叉车管理',
        permission: '10009',
        icon: 'fa fa-road',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__FORKLIFT,
        children: [
          {
            id: '060102',
            name: '叉车列表',
            permission: '10009',
            icon: 'fa fa-road',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT__FORKLIFT,
            children: []
          },
          {
            id: '060106',
            name: '叉车状态',
            permission: '10010',
            icon: 'fa fa-shield',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT__FORKLIFT_STATUS,
            children: []
          },
          {
            id: '060104',
            name: '装载点',
            permission: '10012',
            icon: 'fa fa-share-square',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT_LOADING_POINT,
            children: []
          }
        ]
      },
      {
        id: '060103',
        name: '翻包原因',
        permission: '10011',
        icon: 'fa fa-question',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__RETURN_REASON,
        children: []
      },
      {
        id: '060111',
        name: '货车装运',
        permission: '10013',
        icon: 'fa fa-share',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT_TRANSPORT_POINT,
        children: [
          {
            id: '060105',
            name: '装运点',
            permission: '10013',
            icon: 'fa fa-share',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT_TRANSPORT_POINT,
            children: []
          },
          {
            id: '060109',
            name: '车牌',
            permission: '10030',
            icon: 'fa fa-car',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT__PLATE_NUMBER,
            children: []
          }
        ]
      },
      {
        id: '060106',
        name: '入库规则',
        permission: '10014',
        icon: 'fa fa-th-list',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT_WAREHOUSING_RULES,
        children: []
      },
      {
        id: '060112',
        name: 'SAP信息',
        permission: '10028',
        icon: 'fa fa-podcast',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT_MATERIALS_SEARCH,
        children: [
          {
            id: '060107',
            name: '物料查询',
            permission: '10028',
            icon: 'fa fa-search',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT_MATERIALS_SEARCH,
            children: []
          },
          {
            id: '060108',
            name: 'SAP库位',
            permission: '10029',
            icon: 'fa fa-podcast',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT_SAP_POSITION,
            children: []
          },
          {
            id: '060113',
            name: 'SAP销售组织',
            permission: '10031',
            icon: 'fa fa-podcast',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT_SAP_ORGANIZATION,
            children: []
          },
          {
            id: '060114',
            name: 'SAP状态',
            permission: '10032',
            icon: '',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT_SAP_STATUS,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '0602',
    name: '仓库管理',
    permission: '10014',
    icon: 'far fa-plus-square',
    showChildren: false,
    // path: names.STORAGE__WAREHOUSE_MANAGEMENT__AREA_PLAN,
    children: [
      {
        id: '060220',
        name: '库位管理',
        permission: '10015',
        icon: 'fa fa-tasks',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__AREA_PLAN,
        children: [
          {
            id: '060201',
            name: '库位计划',
            permission: '10015',
            icon: 'fa fa-tasks',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT__AREA_PLAN,
            children: []
          },
          {
            id: '060202',
            name: '库位视图',
            permission: '10016',
            icon: 'fa fa-table',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT__AREA_VIEW,
            children: []
          }
        ]
      },
      {
        id: '060203',
        name: '库存明细',
        permission: '10017',
        icon: 'fa fa-list-ul',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__INVENTORY_DETAIL,
        children: [
          {
            id: '06020301',
            name: '库存明细',
            permission: '1001701',
            icon: 'fa fa-tasks',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT__INVENTORY_DETAIL,
            children: []
          },
          {
            id: '06020302',
            name: '库存明细管理',
            permission: '1001702',
            icon: 'fa fa-tasks',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT__INVENTORY_DETAIL_MANAGE,
            children: []
          },
          {
            id: '06020303',
            name: '托盘查询',
            permission: '1001703',
            path: names.STORAGE__WAREHOUSE_MANAGEMENT__SHAREDPALLET_SEARCH,
            children: []
          }
        ]
      },
      {
        id: '060204',
        name: '调拨出库',
        permission: '10018',
        icon: 'fa fa-reply-all',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__ALLOT_OUT,
        children: []
      },
      {
        id: '060210',
        name: '异常处理',
        permission: '10024',
        icon: 'fas fa-exclamation-circle',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__EXCEPTION_HANDLING,
        children: []
      },
      {
        id: '060212',
        name: '翻包明细',
        permission: '10026',
        icon: 'fa fa-recycle',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__RUMMAGE_PACKAGE,
        children: []
      },
      {
        id: '060205',
        name: '出入库记录',
        permission: '10019',
        icon: 'fas fa-sync-alt',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__OUT_IN_RECORD,
        children: []
      },
      {
        id: '060206',
        name: '盘点记录',
        permission: '10020',
        icon: 'fas fa-pencil-alt',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__CHECK_RECORD,
        children: []
      },
      {
        id: '060211',
        name: '仓库报表',
        permission: '10025',
        icon: 'fas fa-chart-bar',
        path: names.STORAGE__WAREHOUSE_MANAGEMENT__REPORT_FORM,
        children: []
      }
    ]
  }
]
