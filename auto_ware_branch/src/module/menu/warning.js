import * as names from '../../router/names'
export const warningMenu = [
  {
    id: '0401',
    name: '数据分析',
    icon: 'far fa-plus-square',
    permission: '0401',
    path: '',
    showChildren: false,
    children: [
      {
        id: '040101',
        name: '规则设置',
        permission: '040101',
        icon: 'fas fa-bell',
        path: names.WARNING_SETTING,
        children: [
          {
            id: '04010101',
            name: '规则设置',
            permission: '04010101',
            path: names.WARNING_SETTING,
            children: []
          },
          {
            id: '04010102',
            name: '报警模板',
            permission: '04010102',
            path: names.WARNING_SETTING_TEMPLATE,
            children: []
          },
          {
            id: '04010103',
            name: '规则类型',
            permission: '04010103',
            path: names.WARNING_SETTING_RULE_TYPE,
            children: []
          },
          {
            id: '04010104',
            name: '维度',
            permission: '04010104',
            path: names.WARNING_SETTING_DIMENSION,
            children: []
          },
          {
            id: '04010105',
            name: '预览结果',
            permission: '04010105',
            path: names.WARNING_SETTING_OVERVIEW,
            children: []
          }
        ]
      },
      {
        id: '040107',
        name: '预警信息',
        permission: '040107',
        icon: 'fas fa-chart-area',
        path: names.WARNING_MESSAGE_RECORD,
        children: []
      },
      {
        id: '040106',
        name: '总体一览',
        permission: '040106',
        icon: 'fas fa-chart-area',
        path: names.WARNING_POWERBI__OVERVIEW,
        children: []
      },
      {
        id: '040104',
        name: '丝锭信息',
        permission: '040104',
        icon: 'fas fa-chart-area',
        path: names.WARNING_POWERBI__SILK_BASIC,
        children: []
      },
      {
        id: '040105',
        name: '丝锭流程',
        permission: '040105',
        icon: 'fas fa-chart-area',
        path: names.WARNING_POWERBI__SILK_FLOW,
        children: []
      },
      {
        id: '040103',
        name: '判等分析',
        permission: '040103',
        icon: 'fas fa-chart-area',
        path: names.WARNING_POWERBI__YIELD_ANALYSIS,
        children: []
      },
      {
        id: '040104',
        name: '工艺流程',
        permission: '040104',
        icon: 'fas fa-chart-area',
        path: names.WARNING_POWERBI__PROCESS_FLOW,
        children: []
      }
    ]
  }
]
