import dateFns from 'date-fns' // 引入日期格式化
import { getProductCategoryConfig } from '@/api/dataManager'

/**
 * 来源
 * @type {*[]}
 */
const source = [{key: 'ETL', value: '爬虫'}]
/**
 * 币种
 * @type {string[]}
 */
const currency = ['元', '美元']
/**
 * 长视频提供者类型
 * @type {string[]}
 */
const sourceType = ['个人', '公司']
/**
 * 源数据管理，13中产品
 * @type {*[]}
 */
const routerArr = [
  {code: '01010101', path: 'polyester-silk', name: '涤纶长丝', nickName: 'polyesterilk'},
  {code: '01010104', path: 'polyester-staple', name: '涤纶短纤', nickName: 'polyesterStaple'},
  {code: '01010105', path: 'bottle-flakes', name: '聚酯瓶片', nickName: 'bottleFlakes'},
  {code: '01010106', path: 'polyester-chip', name: '聚酯切片', nickName: 'polyesterChip'},
  {code: '01010404', path: 'nylon-filament', name: '锦纶长丝', nickName: 'nylonFilament'},
  {code: '01010405', path: 'polyamide-staple', name: '锦纶短纤', nickName: 'polyamideStaple'},
  {code: '01010107', path: 'pta', name: 'PTA', nickName: 'pta'},
  {code: '01010108', path: 'meg', name: 'MEG', nickName: 'meg'},
  {code: '01010109', path: 'px', name: 'PX', nickName: 'px'},
  {code: '01010110', path: 'ethylene', name: '乙烯', nickName: 'ethylene'},
  {code: '01010401', path: 'benzene', name: '苯', nickName: 'benzene'},
  {code: '01010403', path: 'pa', name: 'PA', nickName: 'pa'},
  {code: '01010402', path: 'CPL', name: '己内酰胺', nickName: 'cpl'}
]
/**
 * 源数据管理，每种产品下的菜单和操作
 * @type {*[]}
 */
let sourceDataMenu = [
  { data: ['create', 'batchDel', 'confirm', 'excelImport'] },
  { analysis:
      [
        { prompt: ['batchDel', 'batchValid', 'edit', 'del', 'valid'] },
        { unPrompt: ['edit', 'del'] },
        { settle: ['confirm'] }
      ]
  }
]
// model 配置内容
const formItem = [
  {name: 'productClassName', elType: 'AutoComplete', option: 'product', label: '品名', placeholder: '请输入品名'},
  {name: 'spec', elType: 'AutoComplete', option: 'spec', label: '规格', placeholder: '请输入规格'},
  {name: 'fiberNum', elType: 'Input', label: '纤度', placeholder: '请输入纤度'},
  {name: 'gloss', elType: 'Input', label: '光泽', placeholder: '请输入光泽'},
  {name: 'color', elType: 'Input', label: '颜色', placeholder: '请输入颜色'},
  {name: 'grade', elType: 'Input', label: '等级', placeholder: '请输入等级'},
  {name: 'feature', elType: 'Input', label: '特性', placeholder: '请输入特性'},
  {name: 'purpose', elType: 'Input', label: '用途', placeholder: '请输入用途'},
  {name: 'technology', elType: 'Input', label: '工艺', placeholder: '请输入工艺'},
  {name: 'price', elType: 'Input', label: '价格', placeholder: '请输入价格'},
  {name: 'unit', elType: 'Input', label: '价格单位', placeholder: '请输入价格单位'},
  {name: 'productClassification', elType: 'Input', label: '产品分类', placeholder: '请输入产品分类'},
  {name: 'priceCondition', elType: 'Input', label: '价格条件', placeholder: '请输入价格条件'},
  {name: 'priceType', elType: 'Input', label: '价格类型', placeholder: '请输入价格类型'},
  {name: 'priceDate', elType: 'DatePicker', label: '价格时间', placeholder: '请选择价格时间'},
  {name: 'logisticsType', elType: 'Input', label: '物流方式', placeholder: '请输入物流方式'},
  {name: 'settleType', elType: 'Input', label: '结算方式', placeholder: '请输入结算方式'},
  {name: 'salesArea', elType: 'Tree', label: '销售区域', placeholder: '请选择销售区域'},
  {
    name: 'manufacturer',
    elType: 'RelationalInput',
    data: [{ name: 'group', placeholder: '请选择集团' },
      { name: 'manufacturer', placeholder: '请选择厂家' }],
    label: '生产厂家',
    placeholder: '请选择生产厂家'
  },
  {name: 'remark', elType: 'Input', label: '备注', placeholder: '请输入备注'}
]
// columns 配置内容
// table operetor
// 数据获取的
let tableData = [
  {title: 'ID', minWidth: 80, key: 'id', align: 'center'},
  {title: '品名', key: 'productClassName', minWidth: 100, align: 'center'},
  {title: '价格时间', key: 'priceDate', minWidth: 120},
  {title: '规格', minWidth: 120, key: 'spec', align: 'center'},
  {title: '价格', key: 'price', minWidth: 80, align: 'center'},
  {title: '单位', key: 'unit', minWidth: 90, align: 'center'},
  {title: '价格类型', key: 'priceType', minWidth: 100, align: 'center'},
  {title: '价格条件', key: 'priceCondition', minWidth: 100, align: 'center'},
  {title: '纤度', minWidth: 120, key: 'fiberNum', align: 'center'},
  {title: '来源', minWidth: 100, key: 'source', align: 'center'},
  {title: '等级', minWidth: 100, key: 'grade', align: 'center'},
  {title: '特性', minWidth: 100, key: 'feature', align: 'center'},
  {title: '光泽', minWidth: 100, key: 'gloss', align: 'center'},
  {title: '用途', minWidth: 100, key: 'purpose', align: 'center'},
  {title: '工艺', minWidth: 100, key: 'technology', align: 'center'},
  {title: '颜色', minWidth: 100, key: 'color', align: 'center'},
  {title: '产品分类', minWidth: 100, key: 'productClassification', align: 'center'},
  {title: '物流方式', minWidth: 100, key: 'logisticsType', align: 'center'},
  {title: '结款方式', minWidth: 100, key: 'settleType', align: 'center'},
  {title: '销售区域', key: 'salesArea', minWidth: 170, align: 'center'},
  {title: '更新时间', minWidth: 100, key: 'gmtModified', render: (h, {row}) => { return h('span', dateFns.format(row.gmtModified, 'YYYY-MM-DD HH:mm')) }},
  {title: '生产厂家', minWidth: 150, key: 'manufacturer', align: 'center'},
  {title: '备注', minWidth: 100, key: 'remark', align: 'center'}
]
// columns 配置内容
// 数据获取的
export function configurations (param, code) {
  return new Promise((resolve, reject) => {
    let manufacturerPriceColumn = [] // table出厂价
    let marketPriceColumn = [] // table市场价
    let manufacturerPriceField = [] // 出厂价
    let marketPriceField = [] // 市场价
    getProductCategoryConfig({productCategoryCode: code}).then(res => {
      res.data.mfpFieldList.forEach(v => {
        formItem.forEach(i => {
          if (i.name === v.key) {
            let valid = v.value === 'Y'
            manufacturerPriceField.push({...i, valid})
          }
        })
        tableData.forEach(i => {
          if (i.key === v.key) manufacturerPriceColumn.push(i)
        })
      })
      res.data.mpFieldList.forEach(v => {
        formItem.forEach(i => {
          if (i.name === v.key) {
            let valid = v.value === 'Y'
            marketPriceField.push({...i, valid})
          }
        })
        tableData.forEach(i => {
          if (i.key === v.key) marketPriceColumn.push(i)
        })
      })
      let extra = [
        {title: '状态', minWidth: 100, align: 'center', render: (h, {row}) => { return h('span', param.option.status.find(s => s.key === row.status).value) }},
        {title: '异常原因', minWidth: 200, align: 'center', render: (h, {row}) => { return h('span', row.hasOwnProperty('resultComment') ? row.resultComment : '') }}
      ]
      Array.of(manufacturerPriceColumn, marketPriceColumn).forEach(item => {
        if (item.length > 8) {
          item.splice(8, 0, ...extra)
        } else {
          item.push(...extra)
        }
      })
      const productType = routerArr.find(item => item.code === code)
      productType.item1 = manufacturerPriceField // 出厂价
      productType.item2 = marketPriceField // 市场价
      productType.columns = manufacturerPriceColumn // table出厂价
      productType.columns2 = marketPriceColumn // table市场价
      resolve(productType)
    })
  })
}
const ruleArray = {
  productClassName: [{required: true, message: '名称为必填项', trigger: 'blur change'},
    {max: 10, message: '名称最多10个字', trigger: 'blur change'}],
  spec: [{required: true, message: '规格为必填项', trigger: 'blur change'}],
  price: [
    {required: true, message: '价格为必填项', trigger: 'blur change'},
    {
      required: true,
      trigger: 'blur change',
      validator: (rule, value, callback) => {
        if (/(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的价格'))
        }
      }
    }
  ],
  priceType: [{required: true, message: '规格类型为必填项', trigger: 'blur change'}],
  priceDate: [{required: true, type: 'date', message: '价格时间为必填项', trigger: 'blur change'}],
  priceCondition: [{required: true, message: '价格条件为必填项', trigger: 'blur change'}],
  fiberNum: [{required: true, message: '纤度为必填项', trigger: 'blur change'}],
  grade: [{required: true, message: '等级为必填项', trigger: 'blur change'}],
  feature: [{required: true, message: '特性为必填项', trigger: 'blur change'}],
  unit: [{required: true, message: '价格单位为必填项', trigger: 'blur change'}],
  gloss: [{required: true, message: '光泽为必填项', trigger: 'blur change'}],
  purpose: [{required: true, message: '用途为必填项', trigger: 'blur change'}],
  technology: [{required: true, message: '工艺为必填项', trigger: 'blur change'}],
  color: [{required: true, message: '颜色为必填项', trigger: 'blur change'}],
  productClassification: [{required: true, message: '产品分类为必填项', trigger: 'blur change'}],
  logisticsType: [{required: true, message: '物流方式为必填项', trigger: 'blur change'}],
  settleType: [{required: true, message: '结款方式为必填项', trigger: 'blur change'}],
  salesArea: [{required: true, message: '销售区域为必填项', trigger: 'blur change'}],
  manufacturer: [{required: true, message: '生产厂家为必填项', trigger: 'blur change'}],
  remark: [{required: true, message: '备注为必填项', trigger: 'blur change'}]
}
export {
  currency,
  source,
  ruleArray,
  routerArr,
  sourceDataMenu,
  sourceType
}
