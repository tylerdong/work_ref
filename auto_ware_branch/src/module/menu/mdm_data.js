import * as names from '../../router/names'
export const mdmMenu = [
  {
    id: '0501',
    name: '主数据',
    icon: 'far fa-plus-square',
    permission: '0601',
    path: '',
    showChildren: false,
    children: [
      {
        id: '050101',
        name: '人员管理',
        permission: '060101',
        icon: 'iconfont icon-chejianrenyuanguanli',
        path: names.MDM_DATA_PERSON_ORGANIZATION,
        children: [
          {
            id: '05010104',
            name: '组织',
            permission: '06010104',
            path: names.MDM_DATA_PERSON_ORGANIZATION,
            children: []
          },
          {
            id: '05010101',
            name: '工种',
            permission: '06010101',
            path: names.MDM_DATA_PERSON_WORK_TYPE,
            children: []
          },
          {
            id: '05010102',
            name: '职位',
            permission: '06010102',
            path: names.MDM_DATA_PERSON_WORK_LEVEL,
            children: []
          },
          {
            id: '05010103',
            name: '班次',
            permission: '06010103',
            path: names.MDM_DATA_PERSON_CLASS_MAINTAIN,
            children: []
          }
        ]
      },
      {
        id: '050102',
        name: '产品参数',
        permission: '060102',
        icon: 'iconfont icon-chanpinguanli',
        path: names.MDM_DATA_PRODUCT_TYPE,
        children: [
          {
            id: '05010201',
            name: '产品',
            permission: '06010201',
            path: names.MDM_DATA_PRODUCT_TYPE,
            children: []
          },
          {
            id: '05010202',
            name: '锭重',
            permission: '06010202',
            path: names.MDM_DATA_PRODUCT_SILK_WEIGHT,
            children: []
          },
          {
            id: '05010203',
            name: '工艺',
            permission: '06010203',
            path: names.MDM_DATA_PRODUCT_WORKMANSHIP,
            children: []
          },
          {
            id: '05010204',
            name: '产品等级',
            permission: '06010204',
            path: names.MDM_DATA_PRODUCT_SILK_GRADE,
            children: []
          }
        ]
      },
      {
        id: '050103',
        name: '异常管理',
        permission: '060103',
        icon: 'iconfont icon-yichangguanli',
        path: names.MDM_DATA_UNUSUAL_REASONS,
        children: [
          {
            id: '05010301',
            name: '异常原因',
            permission: '06010301',
            path: names.MDM_DATA_UNUSUAL_REASONS,
            children: []
          },
          {
            id: '05010302',
            name: '异常类别',
            permission: '06010302',
            path: names.MDM_DATA_UNUSUAL_TYPE,
            children: []
          }
        ]
      }
    ]
  }
]

