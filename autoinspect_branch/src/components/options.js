const sideDefect = [
  {name: '油污线头干扰', value: '1'},
  {name: '油污误检', value: '2'}
]
const topSurfaceDefect = [
  {name: '毛丝误检'},
  {name: '绊丝误检', value: '2'},
  {name: '特殊绊丝误检', value: '3'},
  {name: '交叉绊丝误检', value: '4'},
  {name: '油污误检', value: '5'},
  {name: '绊丝线头干扰', value: '6'},
  {name: '毛丝线头干扰', value: '7'},
  {name: '油污线头干扰', value: '8'},
  {name: '僵丝误检', value: '9'},
  {name: '僵丝线头误检', value: '10'}
]
const bottomDefect = [
  {name: '油污误检', value: '1'},
  {name: '交叉绊丝误检', value: '2'},
  {name: '绊丝误检', value: '3'},
  {name: '僵丝误检', value: '4'},
  {name: '油污线头干扰', value: '5'},
  {name: '交叉绊丝线头干扰', value: '6'},
  {name: '绊丝线头干扰', value: '7'},
  {name: '僵丝线头干扰', value: '8'},
  {name: '交叉绊丝薄膜干扰', value: '9'}
]
const grade = [
  {name: 'AAA', value: '0'},
  {name: 'AA', value: '1'},
  {name: 'A', value: '2'},
  {name: 'B', value: '3'},
  {name: 'C', value: '4'}
]
const batchChart = {
  num: 'id', // 序号，
  batch: 'batch', //  批次 ，
  grade: 'grade', //  等级，
  detectNorm: 'detectNorm', //  检测等级，
  totalCount: 'totalCount', //  总件数，
  defectCount: 'defectCount', //  缺陷件数，
  timeQuantum: 'timeStart', //  时间段 ，
  defectDetail: 'defectDetail' //  缺陷描述
}
const defectChart = {
  defectNum: 'defectId', // 缺陷号
  rfid: 'rfid', // 沙盘号
  isgood: 'isgood',
  defectGrade: 'defectGrade', // 外检等级
  samplingTime: 'ts', // 采样时间
  defectDescribe: 'description' // 缺陷描述
}
const refreshRate = [
  {name: '15秒', value: 15},
  {name: '30秒', value: 30},
  {name: '1分钟', value: 60},
  {name: '3分钟', value: 180}
]
const productType = ['POY', 'FDY', 'DTY']
const sysOption = [
  {
    title: '客户端',
    appName: 'innerSearch',
    appEntrance: 'inner-search-manual-review'
  },
  {
    title: '服务端',
    appName: 'search',
    appEntrance: 'search'
  }
]
const classType = [{name: '2班', value: '2'}, {name: '3班', value: '3'}]
export {
  sideDefect,
  topSurfaceDefect,
  bottomDefect,
  grade,
  batchChart,
  defectChart,
  refreshRate,
  productType,
  sysOption,
  classType
}
