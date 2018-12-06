// 托盘类型
const yokeTypes = [
  {value: 'HENG_LI', label: '恒力木架'},
  {value: 'OLD_WOOD', label: '旧木新钉木架'},
  {value: 'DOWN_GRADE', label: '恒力降等木架'},
  {value: 'PLASTIC', label: '塑料托盘'},
  {value: 'NOT_PINE', label: '非松木'},
  {value: 'PLYWOOD', label: '胶合板木架'},
  {value: 'FUMIGATION', label: '熏蒸木架'},
  {value: 'HEIGHTENED', label: '加高木架'},
  {value: 'NORMAL', label: '普通木架'}
]
// 泡沫类型
const frothTypes = [
  {value: 'RECYCLE', label: '一类回收木架'},
  {value: 'LINER_PLATE', label: 'FDY方衬板'},
  {value: 'OLD_WOOD', label: '旧木新钉木架'},
  {value: 'PAPER_LINER', label: '纸垫板'},
  {value: 'CYSTOSEPIMENT', label: 'FDY方泡沫板'}
]
// 包装来源
const packSource = [
  {value: '1', label: '人工打包'},
  {value: '2', label: '暂存箱打包'},
  {value: '3', label: '外贸打包'},
  {value: '4', label: '自动打包'},
  {value: '5', label: '拆包打包'}
]
// 包装类型
const packTypes = [
  {value: 'COMMON_ENGLISH', label: '普通加英文'},
  {value: 'WHITE_PACK', label: '白皮加包装'},
  {value: 'WHITE_ENGLISH', label: '白皮加英文'},
  {value: 'SEAL_ENGLISH', label: '全封加英文'},
  {value: 'SMALL_PACK', label: '小箱包装'},
  {value: 'SMALL_ENGLISH', label: '小箱加英文'},
  {value: 'COMMON', label: '普通包装'},
  {value: 'SEAL_PACK', label: '全封包装'}
]
// 成品类型
const productTypes = [
  {value: 'INNER_SALE', label: '内销'},
  {value: 'OUT_SALE', label: '外贸'}
]
// 翻包原因
const rummageReason = [
  {value: 'PRODUCT', label: '生产翻包'},
  {value: 'REFUND', label: '退货翻包'},
  {value: 'FAULTYOPERATION', label: '操作失误翻包'},
  {value: 'CHANGESPIDLE', label: '换丝翻包'}
]

// 调拨单状态
const requisitionStatus = [
  {value: 'PENDING', label: '未处理'},
  {value: 'PROCESSED', label: '已处理'},
  {value: 'CHECKING', label: '拣配中'},
  {value: 'CHECKED', label: '已拣配'},
  {value: 'FINISH', label: '已完成'},
  {value: 'SAP_FINISH', label: '已过账'},
  {value: 'PICKUP_FAILED', label: '拣配失败'},
  {value: 'POST_FAILED', label: '过账失败'}
]

// 入库状态
const stockStatusEnum = [
  {id: 1, name: '正常入库'},
  {id: 2, name: '漏扫补录'}
]

// 车牌号类型
const plateNumberType = [
  {id: 1, name: '普通', value: 'NORMAL'},
  {id: 2, name: '丝车', value: 'WIRE'}
]
// 仓储配置
const storageConfig = {
  // 每箱最多锭数
  maxSpindles: 99
}
// 库存状态
const storageType = {
  SALE: {value: 'SALE', label: '销售'},
  REFUND: {value: 'REFUND', label: '退货'}
}
// 盘点状态
const inventoryStatus = [
  {id: 1, name: '已盘点', value: 'Y'},
  {id: 2, name: '未盘点', value: 'N'}
]
// 托盘状态
const palletStatus = [
  {name: '空闲', value: 'UNUSE'},
  {name: '在用', value: 'USING'}
]
// 品名
const productName = ['POY', 'FDY']
// 落筒方式
const doffTypes = [
  {id: 1, name: '手动', value: '1'},
  {id: 2, name: '自动', value: '2'}
]
// crontab状态
const crontabStatus = [
  {id: 0, name: '正在运行', value: '0'},
  {id: 1, name: '完成', value: '1'},
  {id: 2, name: '异常', value: '2'}
]
const boardConfig = {
  // 报警看板
  examine: { groupId: '001' },
  // 车间异常看板
  workshopAbnormal: {groupId: '002'},
  // 自动生产线看板
  autoLine: { groupId: '003' },
  // 自动化分析看板
  dashBoard: {
    groupId: '005',
    taskId: {
      quality: '10006', // 产量分析
      except: '10005'   // 人工外观检
    }
  },
  smartManufacturingCenter: {groupId: '004'}
}
const timeTypes = [
  {value: 'DAY', name: '日'},
  {value: 'MONTH', name: '月'},
  {value: 'YEAR', name: '年'}
]
const formatTypes = [
  {value: 'PERCENT', name: '百分比', disabled: false},
  {value: 'AMOUNT', name: '数字', disabled: false}
]
const dataTypes = [
  {value: 'WEIGHT', name: '重量'},
  {value: 'NUMBER', name: '数量'}
]
const operateType = [
  {value: 'HOSIERY_NOMAL', name: '正常抽样织袜'},
  {value: 'HOSIERY_ITEM_SILK', name: '位与锭织袜'},
  {value: 'HOSIERY_ITEM_ITEM', name: '位于位织袜'},
  {value: 'SILKCAR_FLOW_TYPE_DOFF', name: '落筒'},
  {value: 'SILKCAR_FLOW_TYPE_STRIPSILK', name: '剥丝'},
  {value: 'SILKCAR_FLOW_TYPE_MEASUREFIBER', name: '测纤'},
  {value: 'HOSIERY_PINCHE_1', name: '一次织袜'},
  {value: 'HOSIERY_PINCHE_2', name: '二次织袜拼车'},
  {value: 'HOSIERY_PINCHE_3', name: '三次织袜拼车'},
  {value: 'SENTENCE', name: '染判'},
  {value: 'ARTFICIALCHECK', name: '人工外观检'},
  {value: 'SILK_ABNORMAL', name: '添加丝锭异常'},
  {value: 'SILK_CAR_JUDGE_GRADE', name: '整车判等'},
  {value: 'WUJIAN_REGISTRY', name: '物检登记'},
  {value: 'WUJIAN_CONFIRM', name: '物检确认'},
  {value: 'UNBIND_SILK', name: '解绑丝锭'},
  {value: 'ADD_WEIGHT', name: '丝锭称重'},
  {value: 'AUTO_SURFACE_CHECK', name: '自动外观检查'},
  {value: 'DEL_SILK_EXCEPTION', name: '清除丝锭异常'},
  {value: 'ARTFICIALCHECK_REVIEW_SILK', name: '异常丝锭-人工复核'},
  {value: 'PACKAGE_AUTO_SURFACE', name: '自动外观'},
  {value: 'MANUAL_PACKAGE', name: '人工打包'},
  {value: 'AUTO_PACKAGE', name: '自动打包'},
  {value: 'OTHER', name: '其他操作'}
]
const messageType = [
  { value: 'WECHAT', name: '微信', message: '截止$1,车间产量达到$2' },
  { value: 'EMAIL', name: '邮件', message: '截止$1,车间产量达到$2' }
]
export {
  yokeTypes,
  frothTypes,
  packSource,
  packTypes,
  productTypes,
  rummageReason,
  requisitionStatus,
  stockStatusEnum,
  plateNumberType,
  storageConfig,
  storageType,
  palletStatus,
  productName,
  inventoryStatus,
  doffTypes,
  boardConfig,
  crontabStatus,
  timeTypes,
  formatTypes,
  dataTypes,
  operateType,
  messageType
}
