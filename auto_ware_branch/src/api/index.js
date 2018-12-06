// 公用接口
import * as commom from './common'

// 实验室
import * as laboratory from './laboratory/index.js'

// 自动化采集
import * as automatic from './automatic/index.js'

// 物检
import * as physicalLaboratory from './laboratory/physical/index.js'

// 实验室化检
import * as chemicalLaboratory from './laboratory/chemical/index.js'
// 仓储
import * as storage from './storage-management/index.js'
// mdm
import * as mdm from './mdm/index'
// 数据分析
import * as dataAnalysis from './dataAnalysis/index'

// 原公共平台迁移过来项目
import * as userCenter from './public-platform/user-center'
import * as userManagerCenter from './public-platform/user-manager-center'
import * as superManagerUser from './public-platform/super-manager-user'
import * as systemOrganization from './public-platform/system-organization'
import * as marManager from './public-platform/authority-role-module-manager'
import * as roleManagerBindSybsystem from './public-platform/role-manager-bind-subsystem'
export {
  commom,
  laboratory,
  physicalLaboratory,
  chemicalLaboratory,
  storage,
  automatic,
  userCenter,
  userManagerCenter,
  superManagerUser,
  systemOrganization,
  marManager,
  roleManagerBindSybsystem,
  mdm,
  dataAnalysis
}
