import * as names from '../names'

export const autoModule = [
  /* 设备管理 -- 机台档案 */
  {
    path: 'basic/equipment/machine-record',
    name: names.AUTOMATIC_MACHINE_RECORD,
    component (resolve) {
      require(['../../components/automatic-collection/equipment-management/machine-record/index.vue'], resolve)
    }
  },
  /* 设备管理 -- 丝车管理 */
  {
    path: 'basic/equipment/filature',
    name: names.AUTOMATIC_EQUIPMENT_FILATURE,
    component (resolve) {
      require(['../../components/automatic-collection/equipment-management/filature/index.vue'], resolve)
    }
  },
  /* 设备管理 -- 机台部件 */
  {
    path: 'basic/equipment/machine-parts',
    name: names.AUTOMATIC_MACHINE_PARTS,
    component (resolve) {
      require(['../../components/automatic-collection/equipment-management/machine-parts/index.vue'], resolve)
    }
  },
  /* 设备管理 -- 机台部件类型 */
  {
    path: 'basic/equipment/machine-parts-type',
    name: names.AUTOMATIC_MACHINE_PARTS_TYPE,
    component (resolve) {
      require(['../../components/automatic-collection/equipment-management/machine-parts-type/index.vue'], resolve)
    }
  },
  /* 设备管理 -- 叉车管理 */
  {
    path: 'basic/equipment/forklift-management',
    name: names.AUTOMATIC_EQUIPMENT_FORKLIFT,
    component (resolve) {
      require(['../../components/automatic-collection/equipment-management/forklift-management/index.vue'], resolve)
    }
  },
  /* 产品信息管理 -- 降等原因 */
  {
    path: 'basic/product/down-reason',
    name: names.AUTOMATIC_PRODUCT_DOWNGRADE_REASONS,
    component (resolve) {
      require(['../../components/automatic-collection/product-management/down-reason/index.vue'], resolve)
    }
  },
  /* 产品信息管理 -- 线别信息 */
  {
    path: 'basic/product/line-information',
    name: names.AUTOMATIC_PRODUCT_LINE_INFORMATION,
    component (resolve) {
      require(['../../components/automatic-collection/product-management/line-information/index.vue'], resolve)
    }
  },
  /* 产品信息管理 -- 异常等级设置 */
  {
    path: 'data-dictionary/unusual-grade-set',
    name: names.AUTOMATIC_DATA_DICTIONARY_UNUSUAL_GRADE_SET,
    component (resolve) {
      require(['../../components/automatic-collection/product-management/unusual-grade-set/index.vue'], resolve)
    }
  },
  /* 人员管理 -- 人员信息 */
  {
    path: 'basic/person/information',
    name: names.AUTOMATIC_PERSON_INFORMATION,
    component (resolve) {
      require(['../../components/public-platform/user-manage/person-information/index.vue'], resolve)
    }
  },
  /* 人员管理 -- 班次管理 */
  {
    path: 'basic/person/schedule',
    name: names.AUTOMATIC_PERSON_SCHEDULE,
    component (resolve) {
      require(['../../components/automatic-collection/person-management/schedule/index.vue'], resolve)
    }
  },
  /* 人员管理 -- 打卡记录管理 */
  {
    path: 'basic/person/punch',
    name: names.AUTOMATIC_PERSON_PUNCH,
    component (resolve) {
      require(['../../components/automatic-collection/person-management/punch-record/index.vue'], resolve)
    }
  },
  /* 人员管理 -- 排班管理 */
  {
    path: 'basic/person/workforce-management',
    name: names.AUTOMATIC_PERSON_WORKFORCE_MANAGEMENT,
    component (resolve) {
      require(['../../components/automatic-collection/person-management/workforce-management/index.vue'], resolve)
    }
  },
  /* 库存管理 -- 库房定义 */
  {
    path: 'inventory/storage',
    name: names.AUTOMATIC_INVENTORY_STORAGE,
    component (resolve) {
      require(['../../components/automatic-collection/inventory-management/storage/index.vue'], resolve)
    }
  },
  /* 库存管理 -- 库位定义 */
  {
    path: 'inventory/library',
    name: names.AUTOMATIC_INVENTORY_LIBRARY,
    component (resolve) {
      require(['../../components/automatic-collection/inventory-management/library/index.vue'], resolve)
    }
  },
  /* 库存管理 -- 库位计划 */
  {
    path: 'inventory/library-plan',
    name: names.AUTOMATIC_INVENTORY_LIBRARY_PLAY,
    component (resolve) {
      require(['../../components/automatic-collection/inventory-management/library-plan/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 叉车类型 */
  {
    path: 'data-dictionary/forklift-type',
    name: names.AUTOMATIC_DATA_DICTIONARY_FORKLIFT_TYPE,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/forklift-type/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 车间 */
  {
    path: 'data-dictionary/workshop',
    name: names.AUTOMATIC_DATA_DICTIONARY_WORKSHOP,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/workshop/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 工种 */
  {
    path: 'data-dictionary/work-type',
    name: names.AUTOMATIC_DATA_DICTIONARY_WORK_TYPE,
    component (resolve) {
      require(['../../components/public-platform/user-manage/work-type/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 职位 */
  {
    path: 'data-dictionary/work-level',
    name: names.AUTOMATIC_DATA_DICTIONARY_WORK_LEVEL,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/work-level/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 降等原因类别 */
  {
    path: 'data-dictionary/down-reason-type',
    name: names.AUTOMATIC_DATA_DICTIONARY_DOWN_REASON_TYPE,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/down-reson-type/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 产品工艺 */
  {
    path: 'data-dictionary/workmanship',
    name: names.AUTOMATIC_DATA_DICTIONARY_WORKMANSHIP,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/workmanship/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 产品工艺 */
  {
    path: 'data-dictionary/species',
    name: names.AUTOMATIC_DATA_DICTIONARY_SPECIES,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/species/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 纸管信息 */
  // {
  //   path: 'data-dictionary/paper-tube-info',
  //   name: names.AUTOMATIC_DATA_DICTIONARY_PAPER_TUBE_INFO,
  //   component (resolve) {
  //     require(['../../components/automatic-collection/data-dictionary/paper-tube-info/index.vue'], resolve)
  //   }
  // },
  /* 数据字典 -- 丝锭批号 */
  {
    path: 'data-dictionary/spindle-num',
    name: names.AUTOMATIC_DATA_DICTIONARY_SPINDLE_NUM,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/spindle-num/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 打印机信息 */
  {
    path: 'data-dictionary/printer-info',
    name: names.AUTOMATIC_DATA_DICTIONARY_PRINTER_INFO,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/printer-info/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 丝锭规格 */
  // {
  //   path: 'data-dictionary/silk-spec',
  //   name: names.AUTOMATIC_DATA_DICTIONARY_SILK_SPEC,
  //   component (resolve) {
  //     require(['../../components/automatic-collection/data-dictionary/silk-spec/index.vue'], resolve)
  //   }
  // },
  /* 数据字典 -- 班次维护 */
  {
    path: 'data-dictionary/class-maintain',
    name: names.AUTOMATIC_DATA_DICTIONARY_CLASS_MAINTAIN,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/class-maintain/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 丝锭锭重 */
  {
    path: 'data-dictionary/silk-weight',
    name: names.AUTOMATIC_DATA_DICTIONARY_SILK_WEIGHT,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/silk-weight/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 产品分类 */
  {
    path: 'data-dictionary/product-type',
    name: names.AUTOMATIC_DATA_DICTIONARY_PRODUCT_TYPE,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/product-type/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 丝锭等级 */
  {
    path: 'data-dictionary/silk-grade',
    name: names.AUTOMATIC_DATA_DICTIONARY_SILK_GRADE,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/silk-grade/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 异常等级 */
  {
    path: 'data-dictionary/unusual-grade',
    name: names.AUTOMATIC_DATA_DICTIONARY_UNUSUAL_GRADE,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/unusual-grade/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 染判等级 */
  {
    path: 'data-dictionary/dye-level',
    name: names.AUTOMATIC_DATA_DICTIONARY_DYE_LEVEL,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/dye-level/index.vue'], resolve)
    }
  },
  /* 数据字典 -- 卷绕备注 */
  {
    path: 'data-dictionary/wind-remark',
    name: names.AUTOMATIC_DATA_DICTIONARY_WIND_REMARK,
    component (resolve) {
      require(['../../components/automatic-collection/data-dictionary/wind-remark/index.vue'], resolve)
    }
  },
  /* 生产计划 */
  {
    path: 'product/product-plan',
    name: names.AUTOMATIC_PRODUCT_PRODUCT_PLAN,
    component (resolve) {
      require(['../../components/automatic-collection/product/product-plan/index.vue'], resolve)
    }
  },
  /* 条码打印 */
  {
    path: 'product/barcode-manage',
    name: names.AUTOMATIC_PRODUCT_BARCODE_PRINTING,
    component (resolve) {
      require(['../../components/automatic-collection/product/barcode-manage/index.vue'], resolve)
    }
  },
  /* 条码打印规则 */
  {
    path: 'product/barcode-print-order',
    name: names.AUTOMATIC_PRODUCT_BARCODE_PRINTING_ORDER,
    component (resolve) {
      require(['../../components/automatic-collection/product/barcode-print-order/index.vue'], resolve)
    }
  },
  /* 丝锭绑定规则 */
  {
    path: 'product/silkcar-bind',
    name: names.AUTOMATIC_PRODUCT_SILK_BIND_RULE,
    component (resolve) {
      require(['../../components/automatic-collection/product/silk-bind-rule/index.vue'], resolve)
    }
  },
  /* 染判 */
  {
    path: 'product/dye-judge',
    name: names.AUTOMATIC_PRODUCT_DYE_JUDGE,
    component (resolve) {
      require(['../../components/automatic-collection/product/dye-judge/index.vue'], resolve)
    }
  },
  /* 丝车状态查询 */
  {
    path: 'product/silk-car-state',
    name: names.AUTOMATIC_PRODUCT_SILK_CAR_STATE,
    component (resolve) {
      require(['../../components/automatic-collection/product/silk-car-state/index.vue'], resolve)
    }
  },
  /* 车间生产状况 */
  {
    path: 'product/product-state',
    name: names.AUTOMATIC_PRODUCT_PRODUCT_STATE,
    component (resolve) {
      require(['../../components/automatic-collection/product/product-state/index.vue'], resolve)
    }
  },
  /* 物检操作 */
  {
    path: 'product/check-action',
    name: names.AUTOMATIC_PRODUCT_CHECK_ACTION,
    component (resolve) {
      require(['../../components/automatic-collection/product/check-action/index.vue'], resolve)
    }
  },
  /* 物检备注 */
  {
    path: 'product/check-remark',
    name: names.AUTOMATIC_PRODUCT_CHECK_REMARK,
    component (resolve) {
      require(['../../components/automatic-collection/product/check-remark/index.vue'], resolve)
    }
  },
  /* 丝锭异常状态 */
  {
    path: 'product/silk-exception',
    name: names.AUTOMATIC_PRODUCT_SILK_EXCEPTION,
    component (resolve) {
      require(['../../components/automatic-collection/product/silk-exception/index.vue'], resolve)
    }
  },
  /* 丝锭追踪 */
  {
    path: 'product/silk-trace',
    name: names.AUTOMATIC_PRODUCT_SILK_TRACE,
    component (resolve) {
      require(['../../components/automatic-collection/product/silk-trace/index.vue'], resolve)
    }
  },
  /* 丝锭翻包查询 */
  {
    path: 'product/silk-package-owner',
    name: names.AUTOMATIC_PRODUCT_SILK_PACKAGE_OWNER,
    component (resolve) {
      require(['../../components/automatic-collection/product/sick-package-owner/index.vue'], resolve)
    }
  },
  /* 短纤唛头打印 */
  {
    path: 'product/silk-print',
    name: names.AUTOMATIC_PRODUCT_SILK_PRINT,
    component (resolve) {
      require(['../../components/automatic-collection/product/silk-print/index.vue'], resolve)
    }
  },
  /* 短纤唛头打印 */
  {
    path: 'product/bag_silk_ingot',
    name: names.AUTOMATIC_PRODUCT_BAG_SILK_INGOT,
    component (resolve) {
      require(['../../components/automatic-collection/product/bag-silk-ingot-search/index.vue'], resolve)
    }
  },
  /* 唛头条码 */
  {
    path: 'product/mark_bar_code',
    name: names.AUTOMATIC_PACKAGE_MARK_BAR_CODE,
    component (resolve) {
      require(['../../components/automatic-collection/product/mark_bar_code/index.vue'], resolve)
    }
  },
  /* 补打唛头 */
  {
    path: 'product/repair_mark',
    name: names.AUTOMATIC_PACKAGE_REPAIR_MARK,
    component (resolve) {
      require(['../../components/automatic-collection/product/repair_mark/index.vue'], resolve)
    }
  },
  /* 标样丝管理 */
  {
    path: 'product/prototype-silk',
    name: names.AUTOMATIC_PRODUCT_PROTOTYPE_SILK,
    component (resolve) {
      require(['../../components/automatic-collection/product/prototype-silk/index.vue'], resolve)
    }
  },
  /* 计量打印 */
  {
    path: 'product/measure-printing',
    name: names.AUTOMATIC_PRODUCT_MEASURE_PRINTING,
    component (resolve) {
      require(['../../components/automatic-collection/product/measure-printing/index.vue'], resolve)
    }
  },
  /* 看板管理 */
  {
    path: 'board/management',
    name: names.AUTOMATIC_SAMPLE_PLATE_MANAGEMENT,
    component (resolve) {
      require(['../../components/automatic-collection/board/management/index.vue'], resolve)
    }
  },
  /* 统计报表 -- 产品报表 */
  {
    path: 'statement/personal-scanning-capacity',
    name: names.AUTOMATIC_PRODUCT_STATEMENT_PERSONAL_SCANNING_CAPACITY,
    component (resolve) {
      require(['../../components/automatic-collection/statistical-statement/personal-scanning-capacity/index.vue'], resolve)
    }
  },
  /* 统计报表 -- 质量报表 */
  {
    path: 'statement/production-yield',
    name: names.AUTOMATIC_PRODUCT_STATEMENT_PRODUCTION_YIELD,
    component (resolve) {
      require(['../../components/automatic-collection/statistical-statement/production-yield/index.vue'], resolve)
    }
  },
  /* 统计报表 -- 异常报表 */
  {
    path: 'statement/exception-report',
    name: names.AUTOMATIC_PRODUCT_STATEMENT_EXCEPTION_REPORT,
    component (resolve) {
      require(['../../components/automatic-collection/statistical-statement/exception-report/index.vue'], resolve)
    }
  },
  /* 统计报表 -- 染色降等比率月报 */
  {
    path: 'statement/degradation-report',
    name: names.AUTOMATIC_PRODUCT_STATEMENT_MONTHLY_DEGRADATION,
    component (resolve) {
      require(['../../components/automatic-collection/statistical-statement/degradation/index.vue'], resolve)
    }
  },
  /* 统计报表 -- 同批多线别双A率报表 */
  {
    path: 'statement/linenum-production',
    name: names.AUTOMATIC_PRODUCT_STATEMENT_LINENUM_PRODUCTION,
    component (resolve) {
      require(['../../components/automatic-collection/statistical-statement/linenum-production/index.vue'], resolve)
    }
  },
  /* 看板 -- 报警看板 */
  {
    path: '/board/examine',
    name: names.AUTOMATIC_BOARD_ALARM,
    component (resolve) {
      require(['../../components/automatic-collection/board/examine/index.vue'], resolve)
    }
  },
  /* 看板 -- 车间异常看板 */
  {
    path: '/board/workshop-abnormal',
    name: names.AUTOMATIC_BOARD_WORKSHOP_ABNORMAL,
    component (resolve) {
      require(['../../components/automatic-collection/board/workshop-abnormal/index.vue'], resolve)
    }
  },
  /* 看板 -- 自动生产线 */
  {
    path: '/board/auto-line',
    name: names.AUTOMATIC_BOARD_AUTO_LINE,
    component (resolve) {
      require(['../../components/automatic-collection/board/auto-line/index.vue'], resolve)
    }
  },
  /* 看板 -- 智能制造中心 */
  {
    path: '/board/smart-manufacturing-center',
    name: names.AUTOMATIC_BOARD_SMART_MANUFACTURING_CENTER,
    component (resolve) {
      require(['../../components/automatic-collection/board/smart-manufacturing-center/index.vue'], resolve)
    }
  },
  /* 看板 -- 自动化分析看板 */
  {
    path: '/board/dash_board',
    name: names.AUTOMATIC_BOARD_DASH_BOARD,
    component (resolve) {
      require(['../../components/automatic-collection/board/dash-board/index.vue'], resolve)
    }
  },
  /* 调度管理 -- crontab */
  {
    path: '/scheduling_management/cron',
    name: names.AUTOMATIC_SCHEDULING_MANAGEMENT,
    component (resolve) {
      require(['../../components/automatic-collection/scheduling_management/crontab/index.vue'], resolve)
    }
  },
  /* 调度管理 -- 看板 */
  {
    path: '/scheduling_management/board',
    name: names.AUTOMATIC_SCHEDULING_BOARD_CONFIG,
    component (resolve) {
      require(['../../components/automatic-collection/scheduling_management/board/index.vue'], resolve)
    }
  },
  /* 生产查询 -- 丝锭异常明细查询 */
  {
    path: '/product-search/silk-error-detail',
    name: names.AUTOMATIC_PRODUCT_SEARCH_SILK_ERROR_DETAIL,
    component (resolve) {
      require(['../../components/automatic-collection/product-search/silk-error-detail.vue'], resolve)
    }
  },
  /* 生产查询 -- 丝锭判等明细查询 */
  {
    path: '/product-search/silk-grade-judge-detail',
    name: names.AUTOMATIC_PRODUCT_SEARCH_SILK_GRADE_JUDGE_DETAIL,
    component (resolve) {
      require(['../../components/automatic-collection/product-search/silk-grade-judge-detail.vue'], resolve)
    }
  },
  /* 计量打印 -- 暂存箱条码 */
  {
    path: '/package/keep-barcode',
    name: names.AUTOMATIC_PACKAGE_KEEP_BARCODE,
    component (resolve) {
      require(['../../components/automatic-collection/package-manage/keep-barcode'], resolve)
    }
  },
  /* 计量打印 -- 外贸码单 */
  {
    path: '/package/external-trade-barcode',
    name: names.AUTOMATIC_EXTERNAL_TRADE_BARCODE,
    component (resolve) {
      require(['../../components/automatic-collection/product/external-trade-barcode'], resolve)
    }
  },
  /* 计量打印 -- 拆包 */
  {
    path: '/package/excrete-pack',
    name: names.AUTOMATIC_PACKAGE_EXCRETE_PACK,
    component (resolve) {
      require(['../../components/automatic-collection/package-manage/excrete-pack'], resolve)
    }
  }
]
