import * as names from '../names'
/* ----------------------------主数据--------------------------------- */
export const mdmModule = [
  /* 主数据/人员管理/组织 */
  {
    path: 'datefield/organization',
    name: names.MDM_DATA_PERSON_ORGANIZATION,
    component (resolve) {
      require(['../../components/mdm/person-management/organization/index.vue'], resolve)
    }
  },
  /* 主数据/人员管理/工种 */
  {
    path: 'datafield/datafield_manage',
    name: names.MDM_DATA_PERSON_WORK_TYPE,
    component (resolve) {
      require(['../../components/mdm/person-management/work-type'], resolve)
    }
  },
  /* 主数据/人员管理/职位 */
  {
    path: 'sample-manage/split',
    name: names.MDM_DATA_PERSON_WORK_LEVEL,
    component (resolve) {
      require(['../../components/mdm/person-management/work-level'], resolve)
    }
  },
  /* 主数据/人员管理/班次 */
  {
    path: 'sample-manage/class-maintain',
    name: names.MDM_DATA_PERSON_CLASS_MAINTAIN,
    component (resolve) {
      require(['../../components/mdm/person-management/class'], resolve)
    }
  },
  /* 主数据/产品参数/产品 */
  {
    path: 'product/type',
    name: names.MDM_DATA_PRODUCT_TYPE,
    component (resolve) {
      require(['../../components/mdm/product/type/index.vue'], resolve)
    }
  },
  /* 主数据/产品参数/锭重 */
  {
    path: 'central-value',
    name: names.MDM_DATA_PRODUCT_SILK_WEIGHT,
    component (resolve) {
      require(['../../components/mdm/product/silk-weight/index.vue'], resolve)
    }
  },
  /* 主数据/产品参数/工艺 */
  {
    path: 'product/work-manship',
    name: names.MDM_DATA_PRODUCT_WORKMANSHIP,
    component (resolve) {
      require(['../../components/mdm/product/work-manship/index.vue'], resolve)
    }
  },
  /* 主数据/产品参数/产品等级 */
  {
    path: 'product/silk_grade',
    name: names.MDM_DATA_PRODUCT_SILK_GRADE,
    component (resolve) {
      require(['../../components/mdm/product/silk-grade/index.vue'], resolve)
    }
  },
  /* 主数据/异常管理/降等原因 */
  {
    path: 'unusual/downgrade-reasons',
    name: names.MDM_DATA_UNUSUAL_REASONS,
    component (resolve) {
      require(['../../components/mdm/unusual/downgrade-reasons/index.vue'], resolve)
    }
  },
  /* 主数据/异常管理/丝锭等级 */
  {
    path: 'unusual/silk-grade',
    name: names.MDM_DATA_UNUSUAL_TYPE,
    component (resolve) {
      require(['../../components/mdm/unusual/silk-grade/index.vue'], resolve)
    }
  }
]
