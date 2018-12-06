import * as names from '../../router/names'
export const autoMenu = [
  {
    id: '',
    name: '生产管理',
    icon: 'far fa-plus-square',
    permission: '01',
    path: '',
    showChildren: false,
    children: [
      {
        id: '0201',
        name: '日常参数',
        permission: '0101',
        icon: 'iconfont icon-chejianweihu',
        path: names.AUTOMATIC_DATA_DICTIONARY_WORKSHOP,
        children: [
          {
            id: '020402',
            name: '车间',
            permission: '010101',
            path: names.AUTOMATIC_DATA_DICTIONARY_WORKSHOP,
            children: []
          },
          {
            id: '020308',
            name: '线别',
            permission: '010102',
            path: names.AUTOMATIC_PRODUCT_LINE_INFORMATION,
            children: []
          },
          {
            id: '020101',
            name: '机台管理',
            permission: '010103',
            path: names.AUTOMATIC_MACHINE_RECORD,
            children: []
          },
          {
            id: '020104',
            name: '丝车管理',
            permission: '010104',
            path: names.AUTOMATIC_EQUIPMENT_FILATURE,
            children: []
          },
          {
            id: '020105',
            name: '卷绕备注',
            permission: '10001',
            path: names.AUTOMATIC_DATA_DICTIONARY_WIND_REMARK,
            children: []
          }
        ]
      },
      {
        id: '0202',
        name: '产品参数',
        permission: '0102',
        icon: 'iconfont icon-chanpinguanli',
        path: names.AUTOMATIC_DATA_DICTIONARY_PRODUCT_TYPE,
        children: [
          {
            id: '020413',
            name: '产品',
            permission: '010201',
            path: names.AUTOMATIC_DATA_DICTIONARY_PRODUCT_TYPE,
            children: []
          },
          {
            id: '020304',
            name: '降等原因',
            permission: '010202',
            path: names.AUTOMATIC_PRODUCT_DOWNGRADE_REASONS,
            children: []
          },
          {
            id: '020405',
            name: '降等类别',
            permission: '010203',
            path: names.AUTOMATIC_DATA_DICTIONARY_DOWN_REASON_TYPE,
            children: []
          },
          {
            id: '020412',
            name: '锭重',
            permission: '010204',
            path: names.AUTOMATIC_DATA_DICTIONARY_SILK_WEIGHT,
            children: []
          },
          {
            id: '020414',
            name: '产品等级',
            permission: '010205',
            path: names.AUTOMATIC_DATA_DICTIONARY_SILK_GRADE,
            children: []
          },
          {
            id: '020406',
            name: '工艺',
            permission: '010206',
            path: names.AUTOMATIC_DATA_DICTIONARY_WORKMANSHIP,
            children: []
          },
          {
            id: '020407',
            name: '种类',
            permission: '010207',
            path: names.AUTOMATIC_DATA_DICTIONARY_SPECIES,
            children: []
          }
        ]
      },
      {
        id: '0203',
        name: '人员管理',
        permission: '0103',
        icon: 'iconfont icon-chejianrenyuanguanli',
        path: names.AUTOMATIC_DATA_DICTIONARY_WORK_LEVEL,
        children: [
          {
            id: '020404',
            name: '职位设置',
            permission: '010302',
            path: names.AUTOMATIC_DATA_DICTIONARY_WORK_LEVEL,
            children: []
          },
          {
            id: '020411',
            name: '班次设置',
            permission: '010303',
            path: names.AUTOMATIC_DATA_DICTIONARY_CLASS_MAINTAIN,
            children: []
          },
          {
            id: '020202',
            name: '班组维护',
            permission: '010305',
            path: names.AUTOMATIC_PERSON_SCHEDULE,
            children: []
          },
          {
            id: '020204',
            name: '排班管理',
            permission: '010306',
            path: names.AUTOMATIC_PERSON_WORKFORCE_MANAGEMENT,
            children: []
          },
          {
            id: '020203',
            name: '打卡记录',
            permission: '010307',
            path: names.AUTOMATIC_PERSON_PUNCH,
            children: []
          }
        ]
      },
      {
        id: '0204',
        name: '生产计划',
        permission: '0104',
        icon: 'iconfont icon-shengchanjihua',
        path: names.AUTOMATIC_DATA_DICTIONARY_SPINDLE_NUM,
        children: [
          {
            id: '020408',
            name: '批号',
            permission: '010401',
            path: names.AUTOMATIC_DATA_DICTIONARY_SPINDLE_NUM,
            children: []
          },
          {
            id: '020501',
            name: '生产计划管理',
            permission: '010404',
            path: names.AUTOMATIC_PRODUCT_PRODUCT_PLAN,
            children: []
          }
        ]
      },
      {
        id: '0205',
        name: '丝锭管理',
        permission: '0105',
        icon: 'iconfont icon-sidingtiaomaguanli',
        path: names.AUTOMATIC_DATA_DICTIONARY_PRINTER_INFO,
        children: [
          {
            id: '020409',
            name: '丝锭打印机',
            permission: '010501',
            path: names.AUTOMATIC_DATA_DICTIONARY_PRINTER_INFO,
            children: []
          },
          {
            id: '020502',
            name: '丝锭条码',
            permission: '010502',
            path: names.AUTOMATIC_PRODUCT_BARCODE_PRINTING,
            children: []
          }
        ]
      },
      {
        id: '0207',
        name: '异常管理',
        permission: '0107',
        icon: 'iconfont icon-yichangguanli',
        path: names.AUTOMATIC_DATA_DICTIONARY_UNUSUAL_GRADE_SET,
        children: [
          {
            id: '020309',
            name: '异常信息',
            permission: '010701',
            path: names.AUTOMATIC_DATA_DICTIONARY_UNUSUAL_GRADE_SET,
            children: []
          },
          {
            id: '020415',
            name: '异常等级',
            permission: '010702',
            path: names.AUTOMATIC_DATA_DICTIONARY_UNUSUAL_GRADE,
            children: []
          },
          {
            id: '0206',
            name: '异常报警管理',
            permission: '010703',
            path: names.AUTOMATIC_SAMPLE_PLATE_MANAGEMENT,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '',
    name: '生产任务',
    icon: 'far fa-plus-square',
    permission: '02',
    path: '',
    showChildren: false,
    children: [
      {
        id: '0206',
        name: '生产作业',
        permission: '0106',
        icon: 'iconfont icon-shengchanzuoye',
        path: names.AUTOMATIC_PRODUCT_PROTOTYPE_SILK,
        children: [
          {
            id: '020511',
            name: '标样丝管理',
            permission: '010601',
            path: names.AUTOMATIC_PRODUCT_PROTOTYPE_SILK,
            children: []
          },
          {
            id: '020416',
            name: '染判等级',
            permission: '010602',
            path: names.AUTOMATIC_DATA_DICTIONARY_DYE_LEVEL,
            children: []
          },
          {
            id: '020503',
            name: '染判',
            permission: '010603',
            path: names.AUTOMATIC_PRODUCT_DYE_JUDGE,
            children: []
          },
          {
            id: '020507',
            name: '物检备注',
            permission: '010604',
            path: names.AUTOMATIC_PRODUCT_CHECK_REMARK,
            children: []
          },
          {
            id: '020506',
            name: '物检操作',
            permission: '010605',
            path: names.AUTOMATIC_PRODUCT_CHECK_ACTION,
            children: []
          }
        ]
      },
      {
        id: '0208',
        name: '包装计量',
        permission: '0108',
        icon: 'iconfont icon-baozhuangjiliang',
        path: names.AUTOMATIC_PRODUCT_MEASURE_PRINTING,
        children: [
          {
            id: '020504',
            name: '码垛箱单条码',
            permission: '010801',
            path: names.AUTOMATIC_PRODUCT_MEASURE_PRINTING,
            children: []
          },
          {
            id: '020802',
            name: '外贸码单',
            permission: '10003',
            path: names.AUTOMATIC_EXTERNAL_TRADE_BARCODE,
            children: []
          },
          {
            id: '020801',
            name: '暂存箱管理',
            permission: '10004',
            path: names.AUTOMATIC_PACKAGE_KEEP_BARCODE,
            children: []
          },
          {
            id: '020804',
            name: '翻包查询',
            permission: '10006',
            path: names.AUTOMATIC_PRODUCT_SILK_PACKAGE_OWNER,
            children: []
          },
          {
            id: '020805',
            name: '唛头打印(短纤立体库)',
            permission: '10007',
            path: names.AUTOMATIC_PRODUCT_SILK_PRINT,
            children: []
          },
          {
            id: '020806',
            name: '丝锭箱包查询',
            permission: '10008',
            path: names.AUTOMATIC_PRODUCT_BAG_SILK_INGOT,
            children: []
          },
          {
            id: '020807',
            name: '唛头条码',
            permission: '10002',
            path: names.AUTOMATIC_PACKAGE_MARK_BAR_CODE,
            children: []
          },
          {
            id: '020803',
            name: '拆包查询',
            permission: '10005',
            path: names.AUTOMATIC_PACKAGE_EXCRETE_PACK,
            children: []
          },
          {
            id: '020809',
            name: '补打唛头',
            permission: '10009',
            path: names.AUTOMATIC_PACKAGE_REPAIR_MARK,
            children: []
          }
        ]
      },
      {
        id: '0209',
        name: '生产监控',
        permission: '0109',
        icon: 'iconfont  icon-chejianshengchanchaxun',
        path: names.AUTOMATIC_PRODUCT_PRODUCT_STATE,
        children: [
          {
            id: '020510',
            name: '车间生产状况',
            permission: '010901',
            path: names.AUTOMATIC_PRODUCT_PRODUCT_STATE,
            children: []
          },
          {
            id: '020509',
            name: '状态查询',
            permission: '010902',
            path: names.AUTOMATIC_PRODUCT_SILK_CAR_STATE,
            children: []
          },
          /* 需要获取权限编码 */
          {
            id: '020508',
            name: '丝锭异常状态',
            permission: '010903',
            path: names.AUTOMATIC_PRODUCT_SILK_EXCEPTION,
            children: []
          },
          {
            id: '020512',
            name: '丝锭追踪',
            permission: '010904',
            path: names.AUTOMATIC_PRODUCT_SILK_TRACE,
            children: []
          }
        ]
      },
      {
        id: '0212',
        name: '车间看板',
        icon: 'fa fa-book',
        permission: '0112',
        path: names.AUTOMATIC_BOARD_ALARM,
        children: [
          {
            id: '021201',
            name: '报警看板',
            permission: '011201',
            path: names.AUTOMATIC_BOARD_ALARM,
            children: []
          },
          {
            id: '021002',
            name: '车间异常看板',
            permission: '011202',
            path: names.AUTOMATIC_BOARD_WORKSHOP_ABNORMAL,
            children: []
          },
          {
            id: '021003',
            name: '自动生产线看板',
            permission: '011203',
            path: names.AUTOMATIC_BOARD_AUTO_LINE,
            children: []
          },
          {
            id: '021004',
            name: '智能制造中心看板',
            permission: '011204',
            path: names.AUTOMATIC_BOARD_SMART_MANUFACTURING_CENTER,
            children: []
          },
          {
            id: '021005',
            name: '自动化分析看板',
            permission: '011205',
            path: names.AUTOMATIC_BOARD_DASH_BOARD,
            children: []
          }
        ]
      }
    ]
  }
]
