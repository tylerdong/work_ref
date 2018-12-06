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
  SALE: { value: 'SALE', label: '销售' },
  REFUND: { value: 'REFUND', label: '退货' }
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
  productName,
  inventoryStatus,
  palletStatus
}
