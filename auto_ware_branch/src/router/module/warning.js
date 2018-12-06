import * as names from '../names'
/* ----------------------------报警--------------------------------- */
export const warningModule = [
  /* 数据分析/报警设置 */
  {
    path: 'warning-setting',
    name: names.WARNING_SETTING,
    component (resolve) {
      require(['../../components/warning/product/warning-setting/index.vue'], resolve)
    }
  },
  {
    path: 'warning-message',
    name: names.WARNING_MESSAGE_RECORD,
    component (resolve) {
      require(['../../components/warning/message-record/index.vue'], resolve)
    }
  },
  {
    path: 'warning-template',
    name: names.WARNING_SETTING_TEMPLATE,
    component (resolve) {
      require(['../../components/warning/product/template-manage/index.vue'], resolve)
    }
  },
  {
    path: 'rule-type',
    name: names.WARNING_SETTING_RULE_TYPE,
    component (resolve) {
      require(['../../components/warning/product/rule-type/index'], resolve)
    }
  },
  {
    path: 'dimension',
    name: names.WARNING_SETTING_DIMENSION,
    component (resolve) {
      require(['../../components/warning/product/dimension/index'], resolve)
    }
  },
  {
    path: 'overview',
    name: names.WARNING_SETTING_OVERVIEW,
    component (resolve) {
      require(['../../components/warning/product/overview/index'], resolve)
    }
  },

  /* 数据分析 -- 判等分析 */
  {
    path: 'yield-analysis',
    name: names.WARNING_POWERBI__YIELD_ANALYSIS,
    component (resolve) {
      require(['../../components/warning/power-bi/judge-analysis.vue'], resolve)
    }
  },

  /* 数据分析 -- 丝锭信息 */
  {
    path: 'silk-basic',
    name: names.WARNING_POWERBI__SILK_BASIC,
    component (resolve) {
      require(['../../components/warning/power-bi/silk-infor.vue'], resolve)
    }
  },

  /* 数据分析 -- 丝锭流程 */
  {
    path: 'silk-flow',
    name: names.WARNING_POWERBI__SILK_FLOW,
    component (resolve) {
      require(['../../components/warning/power-bi/silk-flow.vue'], resolve)
    }
  },

  /* 数据分析 -- 工艺流程 */
  {
    path: 'process-flow',
    name: names.WARNING_POWERBI__PROCESS_FLOW,
    component (resolve) {
      require(['../../components/warning/power-bi/process-flow.vue'], resolve)
    }
  },

  /* 数据分析 -- 异常 */
  {
    path: 'anomaly-analysis',
    name: names.WARNING_POWERBI__ANOMALY_ANALYSIS,
    component (resolve) {
      require(['../../components/warning/power-bi/anomaly-analysis.vue'], resolve)
    }
  },

  /* 数据分析 -- 总体一览 */
  {
    path: 'anomaly-analysis',
    name: names.WARNING_POWERBI__OVERVIEW,
    component (resolve) {
      require(['../../components/warning/power-bi/overview.vue'], resolve)
    }
  }
]
