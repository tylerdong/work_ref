import * as names from '../names'

export const labModule = [
  {
    path: 'physical/datafield/datafield_manage',
    name: names.LABORATORY_DATAFIELD_MANAGE,
    component (resolve) {
      require(['../../components/laboratory/physical/datafield/datafield_manage.vue'], resolve)
    }
  },
  /* 物检管理/日常参数/样品分类 */
  {
    path: 'physical/sample-manage/split',
    name: names.LABORATORY_SAMPLE_MANAGE_SPLIT_GROUP,
    component (resolve) {
      require(['../../components/laboratory/physical/sample-manage/split-group.vue'], resolve)
    }
  },
  /* 物检管理/日常参数/样品部门 */
  {
    path: 'physical/sample-manage/register',
    name: names.LABORATORY_SAMPLE_MANAGE_REGISTER,
    component (resolve) {
      require(['../../components/laboratory/physical/sample-manage/register.vue'], resolve)
    }
  },
  /* 物检管理/日常参数/样品 */
  {
    path: 'physical/sample-manage/sample',
    name: names.LABORATORY_SAMPLE_MANAGE_SAMPLE,
    component (resolve) {
      require(['../../components/laboratory/physical/sample-manage/simple.vue'], resolve)
    }
  },
  /* 物检管理/定等参数/定等参数 */
  {
    path: 'physical/central-value',
    name: names.LABORATORY_SEC_CENTRAL_VALUE,
    component (resolve) {
      require(['../../components/laboratory/physical/central-value/index.vue'], resolve)
    }
  },
  /* 物检管理/模板管理/原始记录单模板分类 */
  {
    path: 'physical/original-recordlist/classify',
    name: names.LABORATORY_ORIGINAL_RECORDLIST_CLASSIFY,
    component (resolve) {
      require(['../../components/laboratory/physical/original-recordlist/classify.vue'], resolve)
    }
  },
  /* 物检管理/模板管理/原始记录单模板管理 */
  {
    path: 'physical/original-recordlist/manage',
    name: names.LABORATORY_ORIGINAL_RECORDLIST_MANAGE,
    component (resolve) {
      require(['../../components/laboratory/physical/original-recordlist/manage.vue'], resolve)
    }
  },
  /* 物检管理/模板管理/实验报告单模板分类 */
  {
    path: 'physical/reportlist/template_classify',
    name: names.LABORATORY_REPORTLIST_TEMPLATE_CLASSIFY,
    component (resolve) {
      require(['../../components/laboratory/physical/reportlist/template-classify.vue'], resolve)
    }
  },
  /* 物检管理/模板管理/实验报告单模板管理 */
  {
    path: 'physical/reportlist/template_manage',
    name: names.LABORATORY_REPORTLIST_TEMPLATE_MANAGE,
    component (resolve) {
      require(['../../components/laboratory/physical/reportlist/template-manage.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/材料分类 */
  {
    path: 'physical/acquisition/material/classify',
    name: names.LABORATORY_SEC_MATERIAL_CLASSIFY,
    component (resolve) {
      require(['../../components/laboratory/physical/material/classify.vue'], resolve)
    }
  },
  /*  物检管理/材料管理/材料 */
  {
    path: 'physical/acquisition/material/material',
    name: names.LABORATORY_SEC_MATERIAL,
    component (resolve) {
      require(['../../components/laboratory/physical/material/material.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/材料入库 */
  {
    path: 'physical/acquisition/material/inbound',
    name: names.LABORATORY_SEC_MATERIAL_INBOUND,
    component (resolve) {
      require(['../../components/laboratory/physical/material/inbound.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/材料出库 */
  {
    path: 'physical/acquisition/material/outbound',
    name: names.LABORATORY_SEC_MATERIAL_OUTBOUND,
    component (resolve) {
      require(['../../components/laboratory/physical/material/outbound.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/材料统计 */
  {
    path: 'physical/acquisition/material/statistics',
    name: names.LABORATORY_SEC_MATERIAL_STATISTICS,
    component (resolve) {
      require(['../../components/laboratory/physical/material/statistics.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/仪器分类 */
  {
    path: 'physical/acquisition/instrument',
    name: names.LABORATORY_SEC_INSTRUMENT_CLASSIFY,
    component (resolve) {
      require(['../../components/laboratory/physical/instrument/classify.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/仪器台帐 */
  {
    path: 'physical/acquisition/instrument/book',
    name: names.LABORATORY_SEC_INSTRUMENT_BOOK,
    component (resolve) {
      require(['../../components/laboratory/physical/instrument/instrument-book.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/仪器校准 */
  {
    path: 'physical/acquisition/instrument/adjusting',
    name: names.LABORATORY_SEC_INSTRUMENT_ADJUSTING,
    component (resolve) {
      require(['../../components/laboratory/physical/instrument/instrument-adjusting.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/仪器维修 */
  {
    path: 'physical/acquisition/instrument/repair',
    name: names.LABORATORY_SEC_INSTRUMENT_REPAIR,
    component (resolve) {
      require(['../../components/laboratory/physical/instrument/instrument-repair.vue'], resolve)
    }
  },
  /* 物检管理/材料管理/仪器报废 */
  {
    path: 'physical/acquisition/instrument/scrap',
    name: names.LABORATORY_SEC_INSTRUMENT_SCRAP,
    component (resolve) {
      require(['../../components/laboratory/physical/instrument/instrument-scrap.vue'], resolve)
    }
  },
  /* 物检管理/人员管理/人员台帐 */
  {
    path: 'physical/acquisition/person/book',
    name: names.LABORATORY_SEC_PERSON_BOOK,
    component (resolve) {
      require(['../../components/laboratory/physical/person/book.vue'], resolve)
    }
  },
  /* 物检管理/人员管理/培训管理 */
  {
    path: 'physical/acquisition/person/train',
    name: names.LABORATORY_SEC_PERSON_TRAIN,
    component (resolve) {
      require(['../../components/laboratory/physical/person/train.vue'], resolve)
    }
  },
  /* 物检管理/人员管理/奖惩管理 */
  {
    path: 'physical/acquisition/person/reward-and-punishment',
    name: names.LABORATORY_SEC_PERSON_REWARD_AND_PUNISHMENT,
    component (resolve) {
      require(['../../components/laboratory/physical/person/reward-and-punishment.vue'], resolve)
    }
  },
  /* 物检管理/人员管理/工作量统计 */
  {
    path: 'physical/personnel/workload-statistics',
    name: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_STATISTICS,
    component (resolve) {
      require(['../../components/laboratory/physical/person/workload-statistics.vue'], resolve)
    }
  },
  /* 物检管理/文档管理/分类管理 */
  {
    path: 'physical/document-manage/manege-type',
    name: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_MANEGE,
    component (resolve) {
      require(['../../components/laboratory/physical/document-manage/manege-type.vue'], resolve)
    }
  },
  /* 物检管理/文档管理/共享文件 */
  {
    path: 'physical/document-manage/share-document',
    name: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_SHARE,
    component (resolve) {
      require(['../../components/laboratory/physical/document-manage/share-document.vue'], resolve)
    }
  },
  /* 物检管理/文档管理/文件操作 */
  {
    path: 'physical/document-manage/document-done',
    name: names.LABORATORY_PERSONNEL_MANAGEMENT_WORKLOAD_DONE,
    component (resolve) {
      require(['../../components/laboratory/physical/document-manage/document-done.vue'], resolve)
    }
  },
  /* 物检任务/实验任务/原始记录单 */
  {
    path: 'physical/tobe-laborary',
    name: names.LABORATORY_SEC_TOBE_LABORATORY,
    component (resolve) {
      require(['../../components/laboratory/physical/tobe-laborary/index.vue'], resolve)
    }
  },
  /* 物检任务/实验任务/含油实验任务 */
  {
    path: 'physical/tobe-laborary/contain-oil',
    name: names.LABORATORY_SEC_TOBE_CONTAINS_OIL_TASK,
    component (resolve) {
      require(['../../components/laboratory/physical/tobe-laborary/contain-oil-task.vue'], resolve)
    }
  },
  /* 物检任务/实验任务/报告单 */
  {
    path: 'physical/tobe-laborary/report',
    name: names.LABORATORY_SEC_TOBE_LABORATORY_REPORT,
    component (resolve) {
      require(['../../components/laboratory/physical/tobe-laborary/report.vue'], resolve)
    }
  },
  /* 物检任务/实验任务/设备管理 */
  {
    path: 'physical/acquisition/equipment_management',
    name: names.LABORATORY_SEC_ACQUISITION_EQUIPMENT_MANAGEMENT,
    component (resolve) {
      require(['../../components/laboratory/physical/acquisition/equipment_management.vue'], resolve)
    }
  },
  /* 物检任务/实验任务/数据采集 */
  {
    path: 'physical/acquisition/data_import',
    name: names.LABORATORY_SEC_ACQUISITION_DATA_IMPORT,
    component (resolve) {
      require(['../../components/laboratory/physical/acquisition/data_import.vue'], resolve)
    }
  },
  /* 物检任务/实验列表/原始记录单 */
  {
    path: 'physical/laboratory-query',
    name: names.LABORATORY_SEC_LABERATORY_QUERY,
    component (resolve) {
      require(['../../components/laboratory/physical/laboratory-query/project.vue'], resolve)
    }
  },
  /* 物检任务/实验列表/含油实验结果 */
  {
    path: 'physical/laboratory-query/contain-oil',
    name: names.LABORATORY_SEC_LABERATORY_CONTAINS_OIL_RESULT,
    component (resolve) {
      require(['../../components/laboratory/physical/laboratory-query/contain-oil-result.vue'], resolve)
    }
  },
  /* 物检任务/实验列表/实验报告单 */
  {
    path: 'physical/laboratory-query/report',
    name: names.LABORATORY_SEC_LABERATORY_SEARCH_REPORT,
    component (resolve) {
      require(['../../components/laboratory/physical/laboratory-query/laberary-report.vue'], resolve)
    }
  },
  /* 物检任务/报表管理/日报表审核 */
  {
    path: 'physical/report/dayly-audit',
    name: names.LABORATORY_SEC_REOPRT_DAYLY_AUDIT,
    component (resolve) {
      require(['../../components/laboratory/physical/report/dayly-audit.vue'], resolve)
    }
  },
  /* 物检任务/报表管理/日报表审核 */
  {
    path: 'physical/report/dayly',
    name: names.LABORATORY_SEC_REOPRT_DAYLY,
    component (resolve) {
      require(['../../components/laboratory/physical/report/dayly.vue'], resolve)
    }
  },
  /* 物检任务/报表管理/月报表 */
  {
    path: 'physical/report/monthly',
    name: names.LABORATORY_SEC_REOPRT_MONTHLY,
    component (resolve) {
      require(['../../components/laboratory/physical/report/monthly.vue'], resolve)
    }
  },
  /* 物检任务/报表管理/周报表 */
  {
    path: 'physical/report/weekly',
    name: names.LABORATORY_SEC_REPORT_WEEKLY,
    component (resolve) {
      require(['../../components/laboratory/physical/report/weekly.vue'], resolve)
    }
  },
  /** ---------------------------------------二期化检--------------------------------------------------- */
// 化检管理/日常参数
  {
    path: 'chemical/datafield/datafield_manage',
    name: names.LABORATORY_CHEMICAL_DATAFIELD_MANAGE,
    component (resolve) {
      require(['../../components/laboratory/chemical/datafield/datafield_manage.vue'], resolve)
    }
  },
// 化检管理/样品管理/样品分类
  {
    path: 'chemical/sample-manage/split',
    name: names.LABORATORY_CHEMICAL_SAMPLE_MANAGE_SPLIT_GROUP,
    component (resolve) {
      require(['../../components/laboratory/chemical/sample-manage/split-group.vue'], resolve)
    }
  },
// 化检管理/样品管理/样品部门
  {
    path: 'chemical/sample-manage/register',
    name: names.LABORATORY_CHEMICAL_SAMPLE_MANAGE_REGISTER,
    component (resolve) {
      require(['../../components/laboratory/chemical/sample-manage/register.vue'], resolve)
    }
  },
// 化检管理/样品管理/样品
  {
    path: 'chemical/sample-manage/sample',
    name: names.LABORATORY_CHEMICAL_SAMPLE_MANAGE_SAMPLE,
    component (resolve) {
      require(['../../components/laboratory/chemical/sample-manage/simple.vue'], resolve)
    }
  },
  /* 化检管理/样品管理/样品部门 */
  // {
  //   path: 'chemical/sample-manage/register',
  //   name: names.LABORATORY_CHEMICAL_SAMPLE_MANAGE_REGISTER,
  //   component (resolve) {
  //     require(['../../components/laboratory/chemical/sample-manage/register.vue'], resolve)
  //   }
  // },
  /* 化检管理/原始记录单管理/原始记录单模板分类 */
  {
    path: 'chemical/original-recordlist/classify',
    name: names.LABORATORY_CHEMICAL_ORIGINAL_RECORDLIST_CLASSIFY,
    component (resolve) {
      require(['../../components/laboratory/chemical/original-recordlist/classify.vue'], resolve)
    }
  },
  /* 化检管理/原始记录单管理/原始记录单模板管理 */
  {
    path: 'chemical/original-recordlist/manage',
    name: names.LABORATORY_CHEMICAL_ORIGINAL_RECORDLIST_MANAGE,
    component (resolve) {
      require(['../../components/laboratory/chemical/original-recordlist/manage.vue'], resolve)
    }
  },
  /* 化检管理/实验报告单管理/实验报告单模板分类 */
  {
    path: 'chemical/reportlist/template_classify',
    name: names.LABORATORY_CHEMICAL_REPORTLIST_TEMPLATE_CLASSIFY,
    component (resolve) {
      require(['../../components/laboratory/chemical/reportlist/template-classify.vue'], resolve)
    }
  },
  /* 化检管理/实验报告单管理/实验报告单模板管理 */
  {
    path: 'chemical/reportlist/template_manage',
    name: names.LABORATORY_CHEMICAL_REPORTLIST_TEMPLATE_MANAGE,
    component (resolve) {
      require(['../../components/laboratory/chemical/reportlist/template-manage.vue'], resolve)
    }
  },
  /* 化检管理/材料管理/材料分类 */
  {
    path: 'chemical/acquisition/material/classify',
    name: names.LABORATORY_CHEMICAL_MATERIAL_CLASSIFY,
    component (resolve) {
      require(['../../components/laboratory/chemical/material/classify.vue'], resolve)
    }
  },
  /* 化检管理/材料管理/材料 */
  {
    path: 'chemical/acquisition/material/material',
    name: names.LABORATORY_CHEMICAL_MATERIAL,
    component (resolve) {
      require(['../../components/laboratory/chemical/material/material.vue'], resolve)
    }
  },
  /* 化检管理/材料管理/材料入库 */
  {
    path: 'chemical/acquisition/material/inbound',
    name: names.LABORATORY_CHEMICAL_MATERIAL_INBOUND,
    component (resolve) {
      require(['../../components/laboratory/chemical/material/inbound.vue'], resolve)
    }
  },
  /* 化检管理/二期材料管理/材料出库 */
  {
    path: 'chemical/acquisition/material/outbound',
    name: names.LABORATORY_CHEMICAL_MATERIAL_OUTBOUND,
    component (resolve) {
      require(['../../components/laboratory/chemical/material/outbound.vue'], resolve)
    }
  },
  /* 化检管理/材料管理/材料统计 */
  {
    path: 'chemical/acquisition/material/statistics',
    name: names.LABORATORY_CHEMICAL_MATERIAL_STATISTICS,
    component (resolve) {
      require(['../../components/laboratory/chemical/material/statistics.vue'], resolve)
    }
  },
  /* 化检管理/仪器管理/仪器分类 */
  {
    path: 'chemical/acquisition/instrument',
    name: names.LABORATORY_CHEMICAL_INSTRUMENT_CLASSIFY,
    component (resolve) {
      require(['../../components/laboratory/chemical/instrument/classify.vue'], resolve)
    }
  },
  /* 化检管理/仪器管理/仪器台帐 */
  {
    path: 'chemical/acquisition/instrument/book',
    name: names.LABORATORY_CHEMICAL_INSTRUMENT_BOOK,
    component (resolve) {
      require(['../../components/laboratory/chemical/instrument/instrument-book.vue'], resolve)
    }
  },
  /* 化检管理/仪器管理/仪器校准 */
  {
    path: 'chemical/acquisition/instrument/adjusting',
    name: names.LABORATORY_CHEMICAL_INSTRUMENT_ADJUSTING,
    component (resolve) {
      require(['../../components/laboratory/chemical/instrument/instrument-adjusting.vue'], resolve)
    }
  },
  /* 二期仪器管理/仪器维修 */
  {
    path: 'chemical/acquisition/instrument/repair',
    name: names.LABORATORY_CHEMICAL_INSTRUMENT_REPAIR,
    component (resolve) {
      require(['../../components/laboratory/chemical/instrument/instrument-repair.vue'], resolve)
    }
  },
  /* 化检管理/仪器管理/仪器报废 */
  {
    path: 'chemical/acquisition/instrument/scrap',
    name: names.LABORATORY_CHEMICAL_INSTRUMENT_SCRAP,
    component (resolve) {
      require(['../../components/laboratory/chemical/instrument/instrument-scrap.vue'], resolve)
    }
  },
  /* 化检管理/人员管理/人员台帐 */
  {
    path: 'chemical/acquisition/person/book',
    name: names.LABORATORY_CHEMICAL_PERSON_BOOK,
    component (resolve) {
      require(['../../components/laboratory/chemical/person/book.vue'], resolve)
    }
  },
  /* 化检管理/人员管理/培训管理 */
  {
    path: 'chemical/acquisition/person/train',
    name: names.LABORATORY_CHEMICAL_PERSON_TRAIN,
    component (resolve) {
      require(['../../components/laboratory/chemical/person/train.vue'], resolve)
    }
  },
  /* 化检管理/人员管理/奖惩管理 */
  {
    path: 'chemical/acquisition/person/reward-and-punishment',
    name: names.LABORATORY_CHEMICAL_SEC_PERSON_REWARD_AND_PUNISHMENT,
    component (resolve) {
      require(['../../components/laboratory/chemical/person/reward-and-punishment.vue'], resolve)
    }
  },
  /* 化检管理/人员管理/工作量统计 */
  {
    path: 'chemical/acquisition/person/workload-statistics',
    name: names.LABORATORY_CHEMICAL_PERSONNEL_MANAGEMENT_WORKLOAD_STATISTICS,
    component (resolve) {
      require(['../../components/laboratory/chemical/person/workload-statistics.vue'], resolve)
    }
  },
  /* 化检管理/文档管理/分类管理 */
  {
    path: 'chemical/document-manage/manege-type',
    name: names.LABORATORY_PERSONNEL_MANAGEMENT_CHEMICAL_MANEGE,
    component (resolve) {
      require(['../../components/laboratory/chemical/document-manage/manege-type.vue'], resolve)
    }
  },
  /* 化检管理/文档管理/共享文件 */
  {
    path: 'chemical/document-manage/share-document',
    name: names.LABORATORY_PERSONNEL_MANAGEMENT_CHEMICAL_SHARE,
    component (resolve) {
      require(['../../components/laboratory/chemical/document-manage/share-document.vue'], resolve)
    }
  },
  /* 化检管理/文档管理/文件操作 */
  {
    path: 'chemical/document-manage/document-done',
    name: names.LABORATORY_PERSONNEL_MANAGEMENT_CHEMICAL_DONE,
    component (resolve) {
      require(['../../components/laboratory/chemical/document-manage/document-done.vue'], resolve)
    }
  },
  /* 化检任务/样品登记/样品登记 */
  {
    path: 'chemical/personnel/sample-register/register',
    name: names.LABORATORY_CHEMICAL_SAMPLE_REGISTER_REGISTER,
    component (resolve) {
      require(['../../components/laboratory/chemical/sample-register/register/register.vue'], resolve)
    }
  },
  /* 化检任务/样品登记/日常任务 */
  {
    path: 'chemical/sample-register/daily-tasks',
    name: names.LABORATORY_CHEMICAL_SAMPLE_REGISTER_DAILY_TASKS,
    component (resolve) {
      require(['../../components/laboratory/chemical/sample-register/daily-tasks/index.vue'], resolve)
    }
  },
  /* 化检任务/实验任务/原始记录 */
  {
    path: 'chemical/tobe-laboratory/original-recordlist',
    name: names.LABORATORY_CHEMICAL_TOBE_LABORATORY_ORIGINAL_RECORDLIST,
    component (resolve) {
      require(['../../components/laboratory/chemical/tobe-laboratory/original-recordlist.vue'], resolve)
    }
  },
  /* 化检任务/实验任务/报告单 */
  {
    path: 'chemical/tobe-laboratory/report',
    name: names.LABORATORY_CHEMICAL_TOBE_LABORATORY_REPORTLIST,
    component (resolve) {
      require(['../../components/laboratory/chemical/tobe-laboratory/report.vue'], resolve)
    }
  },
  /* 化检任务/实验任务/标样 */
  {
    path: 'chemical/tobe-laboratory/sample',
    name: names.LABORATORY_CHEMICAL_TOBE_LABORATORY_SAMPLE,
    component (resolve) {
      require(['../../components/laboratory/chemical/tobe-laboratory/sample.vue'], resolve)
    }
  },
  /* 化检任务/留样管理/留样管理 */
  {
    path: 'chemical/sample-register/keep-manage',
    name: names.LABORATORY_CHEMICAL_SAMPLE_REGISTER_KEEP_MANAGE,
    component (resolve) {
      require(['../../components/laboratory/chemical/keep-manage/index.vue'], resolve)
    }
  },
  /* 化检任务/实验列表/报告单 */
  {
    path: 'chemical/laberatory_query/report',
    name: names.LABORATORY_CHEMICAL_LABERATORY_QUERY_REPORT,
    component  (resolve) {
      require(['../../components/laboratory/chemical/laberatory_query/report.vue'], resolve)
    }
  },
  /* 化检任务/实验列表/原始记录 */
  {
    path: 'chemical/laberatory_query/original-recordlist',
    name: names.LABORATORY_CHEMICAL_LABERATORY_QUERY_ORIGINAL_RECORDLIST,
    component (resolve) {
      require(['../../components/laboratory/chemical/laberatory_query/original-recordlist.vue'], resolve)
    }
  },
  /* 化检任务/实验列表/标样 */
  {
    path: 'chemical/laberatory_query/sample',
    name: names.LABORATORY_CHEMICAL_LABERATORY_QUERY_SAMPLE,
    component (resolve) {
      require(['../../components/laboratory/chemical/laberatory_query/sample.vue'], resolve)
    }
  },
  /* 化检任务/实验列表/报表统计 */
  {
    path: 'chemical/laberatory_query/',
    name: names.LABORATORY_CHEMICAL_LABERATORY_REPORT_STATISTICS,
    component (resolve) {
      require(['../../components/laboratory/chemical/laberatory_query/report-statistics.vue'], resolve)
    }
  }
]
