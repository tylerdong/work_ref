import * as names from '../../router/names'
export const labMenu = [
  /** ---------------------------------------二期物检--------------------------------------------------- */
  {
    id: '',
    name: '物检管理',
    icon: 'far fa-plus-square',
    permission: '18',
    path: '',
    showChildren: false,
    children: [
      {
        id: '0116',
        name: '参数管理',
        permission: '1801',
        icon: 'fa fa-tasks',
        path: names.LABORATORY_DATAFIELD_MANAGE,
        children: [
          {
            id: '01141',
            name: '日常参数',
            permission: '180101',
            path: names.LABORATORY_DATAFIELD_MANAGE
          },
          {
            id: '01131',
            name: '样品分类',
            permission: '180102',
            path: names.LABORATORY_SAMPLE_MANAGE_SPLIT_GROUP
          },
          {
            id: '01132',
            name: '样品部门',
            permission: '180103',
            path: names.LABORATORY_SAMPLE_MANAGE_REGISTER
          },
          {
            id: '01133',
            name: '试验丝',
            permission: '180104',
            path: names.LABORATORY_SAMPLE_MANAGE_SAMPLE
          },
          {
            id: '01221',
            name: '定等参数',
            permission: '180105',
            path: names.LABORATORY_SEC_CENTRAL_VALUE
          }
        ]
      },
      {
        id: '0109',
        name: '模板管理',
        icon: 'fa fa-th-large',
        permission: '1803',
        path: names.LABORATORY_ORIGINAL_RECORDLIST_CLASSIFY,
        children: [
          {
            id: '010901',
            name: '原始记录单模板分类',
            permission: '180301',
            path: names.LABORATORY_ORIGINAL_RECORDLIST_CLASSIFY
          },
          {
            id: '010902',
            name: '原始记录单模板管理',
            permission: '180302',
            path: names.LABORATORY_ORIGINAL_RECORDLIST_MANAGE
          },
          {
            id: '011001',
            name: '实验报告单模板分类',
            permission: '180303',
            path: names.LABORATORY_REPORTLIST_TEMPLATE_CLASSIFY
          },
          {
            id: '011002',
            name: '实验报告单模板管理',
            permission: '180304',
            path: names.LABORATORY_REPORTLIST_TEMPLATE_MANAGE
          }
        ]
      },
      {
        id: '0133',
        name: '材料管理',
        permission: '1804',
        icon: 'fa fa-ship',
        path: names.LABORATORY_SEC_MATERIAL_CLASSIFY,
        children: [
          {
            id: '0134',
            name: '材料分类',
            permission: '180401',
            path: names.LABORATORY_SEC_MATERIAL_CLASSIFY
          },
          {
            id: '0143',
            name: '材料',
            permission: '180402',
            path: names.LABORATORY_SEC_MATERIAL
          },
          {
            id: '0136',
            name: '材料入库',
            permission: '180403',
            path: names.LABORATORY_SEC_MATERIAL_INBOUND
          },
          {
            id: '0137',
            name: '材料出库',
            permission: '180404',
            path: names.LABORATORY_SEC_MATERIAL_OUTBOUND
          },
          {
            id: '0138',
            name: '材料统计',
            permission: '180405',
            path: names.LABORATORY_SEC_MATERIAL_STATISTICS
          }
        ]
      },
      {
        id: '0127',
        name: '仪器管理',
        permission: '1805',
        icon: 'fa fa-random',
        path: names.LABORATORY_SEC_INSTRUMENT_CLASSIFY,
        children: [
          {
            id: '0128',
            name: '仪器分类',
            permission: '180501',
            path: names.LABORATORY_SEC_INSTRUMENT_CLASSIFY
          },
          {
            id: '0129',
            name: '仪器台帐',
            permission: '180502',
            path: names.LABORATORY_SEC_INSTRUMENT_BOOK
          },
          {
            id: '0130',
            name: '仪器校准',
            permission: '180503',
            path: names.LABORATORY_SEC_INSTRUMENT_ADJUSTING
          },
          {
            id: '0131',
            name: '仪器维修',
            permission: '180504',
            path: names.LABORATORY_SEC_INSTRUMENT_REPAIR
          },
          {
            id: '0132',
            name: '仪器报废',
            permission: '180505',
            path: names.LABORATORY_SEC_INSTRUMENT_SCRAP
          },
          {
            id: '0108',
            name: '采集设备',
            permission: '180506',
            path: names.LABORATORY_SEC_ACQUISITION_EQUIPMENT_MANAGEMENT
          }
        ]
      },
      {
        id: '0139',
        name: '人员管理',
        permission: '1806',
        icon: 'fa fa-address-book',
        path: names.LABORATORY_SEC_PERSON_BOOK,
        children: [
          {
            id: '0140',
            name: '人员台帐',
            permission: '180601',
            path: names.LABORATORY_SEC_PERSON_BOOK
          },
          {
            id: '0141',
            name: '培训管理',
            permission: '180602',
            path: names.LABORATORY_SEC_PERSON_TRAIN
          },
          {
            id: '0142',
            name: '奖惩管理',
            permission: '180603',
            path: names.LABORATORY_SEC_PERSON_REWARD_AND_PUNISHMENT
          },
          {
            id: '0143',
            name: '工作量统计',
            permission: '180604',
            path: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_STATISTICS,
            children: []
          }
        ]
      },
      {
        id: '0144',
        name: '文档管理',
        permission: '1807',
        icon: 'fa fa-file',
        path: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_SHARE,
        children: [
          {
            id: '0146',
            name: '共享文件',
            permission: '180702',
            path: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_SHARE
          },
          {
            id: '0145',
            name: '分类管理',
            permission: '180701',
            path: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_MANEGE
          },
          {
            id: '0147',
            name: '文件操作',
            permission: '180703',
            path: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_DONE
          }
        ]
      }
    ]
  },
  {
    id: '',
    name: '物检任务',
    icon: 'far fa-plus-square',
    permissionUserType: '100',
    permission: '19',
    path: '',
    showChildren: false,
    children: [
      {
        id: '0117',
        name: '实验任务',
        permission: '1901',
        icon: 'fa fa-tasks',
        path: names.LABORATORY_SEC_TOBE_LABORATORY,
        children: [
          {
            id: '01171',
            name: '手工记录单',
            permission: '190101',
            path: names.LABORATORY_SEC_TOBE_LABORATORY
          },
          {
            id: '01173',
            name: '含油实验任务',
            permission: '190105',
            path: names.LABORATORY_SEC_TOBE_CONTAINS_OIL_TASK
          },
          {
            id: '0126',
            name: '导入记录单',
            permission: '190104',
            path: names.LABORATORY_SEC_ACQUISITION_DATA_IMPORT
          },
          {
            id: '01172',
            name: '报告单',
            permission: '190102',
            path: names.LABORATORY_SEC_TOBE_LABORATORY_REPORT
          }
        ]
      },
      {
        id: '0121',
        name: '实验结果',
        permission: '1902',
        icon: 'fa fa-recycle',
        path: names.LABORATORY_SEC_LABERATORY_QUERY,
        children: [
          {
            id: '01211',
            name: '原始记录单',
            permission: '190201',
            path: names.LABORATORY_SEC_LABERATORY_QUERY
          },
          {
            id: '01213',
            name: '含油实验结果',
            permission: '190203',
            path: names.LABORATORY_SEC_LABERATORY_CONTAINS_OIL_RESULT
          },
          {
            id: '01212',
            name: '实验报告单',
            permission: '190202',
            path: names.LABORATORY_SEC_LABERATORY_SEARCH_REPORT
          }
        ]
      },
      {
        id: '0123',
        name: '报表管理',
        permission: '1903',
        icon: 'fa fa-signal',
        path: names.LABORATORY_SEC_REOPRT_DAYLY_AUDIT,
        children: [
          {
            id: '01233',
            name: '日报表审核',
            permission: '190301',
            path: names.LABORATORY_SEC_REOPRT_DAYLY_AUDIT
          },
          {
            id: '01234',
            name: '日报表',
            permission: '190302',
            path: names.LABORATORY_SEC_REOPRT_DAYLY
          },
          {
            id: '01231',
            name: '月报表',
            permission: '190303',
            path: names.LABORATORY_SEC_REOPRT_MONTHLY
          },
          {
            id: '01232',
            name: '周报表',
            permission: '190304',
            path: names.LABORATORY_SEC_REPORT_WEEKLY
          }
        ]
      }
    ]
  },
  /** ---------------------------------------二期化检--------------------------------------------------- */
  {
    id: '',
    name: '化检管理',
    icon: 'far fa-plus-square',
    permissionUserType: '100',
    permission: '20',
    path: '',
    showChildren: false,
    children: [
      {
        id: '1116',
        name: '参数管理',
        permission: '2001',
        icon: 'fa fa-tasks',
        path: names.LABORATORY_CHEMICAL_DATAFIELD_MANAGE,
        children: [
          {
            id: '11141',
            name: '日常参数',
            permission: '200101',
            path: names.LABORATORY_CHEMICAL_DATAFIELD_MANAGE
          },
          {
            id: '11131',
            name: '样品分类',
            permission: '200102',
            path: names.LABORATORY_CHEMICAL_SAMPLE_MANAGE_SPLIT_GROUP
          },
          {
            id: '11132',
            name: '样品部门',
            permission: '200103',
            path: names.LABORATORY_CHEMICAL_SAMPLE_MANAGE_REGISTER
          },
          {
            id: '11133',
            name: '样品',
            permission: '200104',
            path: names.LABORATORY_CHEMICAL_SAMPLE_MANAGE_SAMPLE
          }
        ]
      },
      {
        id: '1109',
        name: '模板管理',
        icon: 'fa fa-th-large',
        permission: '2002',
        path: names.LABORATORY_CHEMICAL_ORIGINAL_RECORDLIST_CLASSIFY,
        children: [
          {
            id: '110901',
            name: '原始记录单模板分类',
            permission: '200201',
            path: names.LABORATORY_CHEMICAL_ORIGINAL_RECORDLIST_CLASSIFY
          },
          {
            id: '110902',
            name: '原始记录单模板管理',
            permission: '200202',
            path: names.LABORATORY_CHEMICAL_ORIGINAL_RECORDLIST_MANAGE
          },
          {
            id: '111001',
            name: '实验报告单模板分类',
            permission: '200203',
            path: names.LABORATORY_CHEMICAL_REPORTLIST_TEMPLATE_CLASSIFY
          },
          {
            id: '111002',
            name: '实验报告单模板管理',
            permission: '200204',
            path: names.LABORATORY_CHEMICAL_REPORTLIST_TEMPLATE_MANAGE
          }
        ]
      },
      {
        id: '1133',
        name: '材料管理',
        permission: '2003',
        icon: 'fa fa-ship',
        path: names.LABORATORY_CHEMICAL_MATERIAL_CLASSIFY,
        children: [
          {
            id: '1134',
            name: '材料分类',
            permission: '200301',
            path: names.LABORATORY_CHEMICAL_MATERIAL_CLASSIFY
          },
          {
            id: '1143',
            name: '材料',
            permission: '200302',
            path: names.LABORATORY_CHEMICAL_MATERIAL
          },
          {
            id: '1136',
            name: '材料入库',
            permission: '200303',
            path: names.LABORATORY_CHEMICAL_MATERIAL_INBOUND
          },
          {
            id: '1137',
            name: '材料出库',
            permission: '200304',
            path: names.LABORATORY_CHEMICAL_MATERIAL_OUTBOUND
          },
          {
            id: '1138',
            name: '材料统计',
            permission: '200305',
            path: names.LABORATORY_CHEMICAL_MATERIAL_STATISTICS
          }
        ]
      },
      {
        id: '1127',
        name: '仪器管理',
        permission: '2004',
        icon: 'fa fa-random',
        path: names.LABORATORY_CHEMICAL_INSTRUMENT_CLASSIFY,
        children: [
          {
            id: '1128',
            name: '仪器分类',
            permission: '200401',
            path: names.LABORATORY_CHEMICAL_INSTRUMENT_CLASSIFY
          },
          {
            id: '1129',
            name: '仪器台帐',
            permission: '200402',
            path: names.LABORATORY_CHEMICAL_INSTRUMENT_BOOK
          },
          {
            id: '1130',
            name: '仪器校准',
            permission: '200403',
            path: names.LABORATORY_CHEMICAL_INSTRUMENT_ADJUSTING
          },
          {
            id: '1131',
            name: '仪器维修',
            permission: '200404',
            path: names.LABORATORY_CHEMICAL_INSTRUMENT_REPAIR
          },
          {
            id: '1132',
            name: '仪器报废',
            permission: '200405',
            path: names.LABORATORY_CHEMICAL_INSTRUMENT_SCRAP
          }
        ]
      },
      {
        id: '1139',
        name: '人员管理',
        permission: '2005',
        icon: 'fa fa-address-book',
        path: names.LABORATORY_CHEMICAL_PERSON_BOOK,
        children: [
          {
            id: '1140',
            name: '人员台帐',
            permission: '200501',
            path: names.LABORATORY_CHEMICAL_PERSON_BOOK
          },
          {
            id: '1141',
            name: '培训管理',
            permission: '200502',
            path: names.LABORATORY_CHEMICAL_PERSON_TRAIN
          },
          {
            id: '1142',
            name: '奖惩管理',
            permission: '200503',
            path: names.LABORATORY_CHEMICAL_SEC_PERSON_REWARD_AND_PUNISHMENT
          },
          {
            id: '1143',
            name: '工作量统计',
            permission: '200504',
            path: names.LABORATORY_CHEMICAL_PERSONNEL_MANAGEMENT_WORKLOAD_STATISTICS,
            children: []
          }
        ]
      },
      {
        id: '1144',
        name: '文档管理',
        permission: '1808',
        icon: 'fa fa-file',
        path: names.LABORATORY_PERSONNEL_MANAGEMENT_CHEMICAL_SHARE,
        children: [
          {
            id: '1146',
            name: '共享文件',
            permission: '180802',
            path: names.LABORATORY_PERSONNEL_MANAGEMENT_CHEMICAL_SHARE
          },
          {
            id: '1145',
            name: '分类管理',
            permission: '180801',
            path: names.LABORATORY_PERSONNEL_MANAGEMENT_CHEMICAL_MANEGE
          },
          {
            id: '1147',
            name: '文件操作',
            permission: '180803',
            path: names.LABORATORY_PERSONNEL_MANAGEMENT_CHEMICAL_DONE
          }
        ]
      }
    ]
  },
  {
    id: '',
    name: '化检任务',
    icon: 'far fa-plus-square',
    permissionUserType: '100',
    permission: '21',
    path: '',
    showChildren: false,
    children: [
      {
        id: '1114',
        name: '实验任务',
        icon: 'fa fa-tasks',
        permission: '2101',
        path: names.LABORATORY_CHEMICAL_SAMPLE_REGISTER_REGISTER,
        children: [
          {
            id: '11191',
            name: '普通样品登记',
            permission: '210104',
            path: names.LABORATORY_CHEMICAL_SAMPLE_REGISTER_REGISTER
          },
          {
            id: '11192',
            name: '日常任务',
            permission: '210105',
            path: names.LABORATORY_CHEMICAL_SAMPLE_REGISTER_DAILY_TASKS
          },
          {
            id: '111401',
            name: '原始记录单',
            permission: '210101',
            path: names.LABORATORY_CHEMICAL_TOBE_LABORATORY_ORIGINAL_RECORDLIST
          },
          {
            id: '111402',
            name: '报告单',
            permission: '210102',
            path: names.LABORATORY_CHEMICAL_TOBE_LABORATORY_REPORTLIST
          },
          {
            id: '111403',
            name: '标样',
            permission: '210103',
            path: names.LABORATORY_CHEMICAL_TOBE_LABORATORY_SAMPLE
          }
        ]
      },
      {
        id: '1120',
        name: '留样管理',
        permission: '2102',
        icon: 'fa fa-reply-all',
        path: names.LABORATORY_CHEMICAL_SAMPLE_REGISTER_KEEP_MANAGE,
        children: [
          {
            id: '11201',
            name: '留样管理',
            permission: '210201',
            path: names.LABORATORY_CHEMICAL_SAMPLE_REGISTER_KEEP_MANAGE
          }
        ]
      },
      {
        id: '1115',
        name: '实验结果',
        permission: '2103',
        icon: 'fa fa-recycle',
        path: names.LABORATORY_CHEMICAL_LABERATORY_QUERY_REPORT,
        children: [
          {
            id: '111501',
            name: '报告单',
            permission: '210301',
            path: names.LABORATORY_CHEMICAL_LABERATORY_QUERY_REPORT
          },
          {
            id: '111502',
            name: '原始记录',
            permission: '210302',
            path: names.LABORATORY_CHEMICAL_LABERATORY_QUERY_ORIGINAL_RECORDLIST
          },
          {
            id: '111503',
            name: '标样',
            permission: '210303',
            path: names.LABORATORY_CHEMICAL_LABERATORY_QUERY_SAMPLE
          }
        ]
      },
      {
        id: '1121',
        name: '报表统计',
        permission: '2104',
        icon: 'fa fa-star',
        path: names.LABORATORY_CHEMICAL_LABERATORY_REPORT_STATISTICS,
        children: [
          {
            id: '112101',
            name: '报告单月趋势图',
            permission: '201401',
            path: names.LABORATORY_CHEMICAL_LABERATORY_REPORT_STATISTICS
          }
        ]
      }
    ]
  }
]

