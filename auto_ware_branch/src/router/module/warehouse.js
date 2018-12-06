import * as names from '../names'

export const warehouseModule = [
  /* 仓库维护 -- 仓库 */
  {
    path: 'warehouse-maintain/warehouse',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__WAREHOUSE,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/warehouse/index.vue'], resolve)
    }
  },
  /* 仓库维护 -- 车牌 */
  {
    path: 'warehouse-maintain/plate-number',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__PLATE_NUMBER,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/plate-number/index.vue'], resolve)
    }
  },
  /* 仓库维护 -- 叉车 */
  {
    path: 'warehouse-maintain/forklift',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__FORKLIFT,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/forklift/index.vue'], resolve)
    }
  },
  /* 仓库维护 -- 叉车状态 */
  {
    path: 'warehouse-maintain/forkliftStatus',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__FORKLIFT_STATUS,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/forklift-status/index.vue'], resolve)
    }
  },
  /* 仓库维护 -- 翻包原因 */
  {
    path: 'warehouse-maintain/returnReason',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__RETURN_REASON,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/return-reason/index.vue'], resolve)
    }
  },
  /* 仓库维护 -- 装载点 */
  {
    path: 'warehouse-maintain/loadingPoint',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT_LOADING_POINT,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/loading-point/index.vue'], resolve)
    }
  },
  /* 仓库维护 -- 装运点 */
  {
    path: 'warehouse-maintain/transportPoint',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT_TRANSPORT_POINT,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/transport-point/index.vue'], resolve)
    }
  },
  /* 仓库维护 -- 入库规则 */
  {
    path: 'warehouse-maintain/warehouse-rules',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT_WAREHOUSING_RULES,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/warehouse-rules/index.vue'], resolve)
    }
  },
  /* 仓库维护 -- 物料号查询 */
  {
    path: 'warehouse-maintain/materials-search',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT_MATERIALS_SEARCH,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/materials-search/index.vue'], resolve)
    }
  },
  {
    path: 'warehouse-maintain/SAP-position',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT_SAP_POSITION,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/SAP-position/index.vue'], resolve)
    }
  },
  {
    path: 'warehouse-maintain/SAP-sale-organization',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT_SAP_ORGANIZATION,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/SAP-organization/index.vue'], resolve)
    }
  },
  {
    path: 'warehouse-maintain/SAP-requisition-status',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT_SAP_STATUS,
    component (resolve) {
      require(['../../components/storage-management/warehouse-maintain/SAP-requisition-status/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 库位计划 */
  {
    path: 'warehouse-management/area-plan',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__AREA_PLAN,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/area-plan/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 库位视图 */
  {
    path: 'warehouse-management/area-view',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__AREA_VIEW,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/area-view/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 库存明细 */
  {
    path: 'warehouse-management/inventory-detail',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__INVENTORY_DETAIL,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/inventory-detail/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 库存明细管理 */
  {
    path: 'warehouse-management/inventory-detail-manage',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__INVENTORY_DETAIL_MANAGE,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/inventory-detail/manage.vue'], resolve)
    }
  },
  /* 仓库管理 -- 托盘查询 */
  {
    path: 'warehouse-management/sharedpallet-search',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__SHAREDPALLET_SEARCH,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/sharedpallet-search/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 调拨出库 */
  {
    path: 'warehouse-management/allot-out',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__ALLOT_OUT,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/allot-out/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 出入库记录 */
  {
    path: 'warehouse-management/out-in-record',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__OUT_IN_RECORD,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/out-in-record/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 盘点记录 */
  {
    path: 'warehouse-management/check-record',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__CHECK_RECORD,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/check-record/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 异常处理 */
  {
    path: 'warehouse-management/exception-handling',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__EXCEPTION_HANDLING,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/exception-handling/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 报表 */
  {
    path: 'warehouse-management/report-form',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__REPORT_FORM,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/report-form/index.vue'], resolve)
    }
  },
  /* 仓库管理 -- 翻包 */
  {
    path: 'warehouse-management/rummage-package',
    name: names.STORAGE__WAREHOUSE_MANAGEMENT__RUMMAGE_PACKAGE,
    component (resolve) {
      require(['../../components/storage-management/warehouse-management/rummage-package/index.vue'], resolve)
    }
  }
]
