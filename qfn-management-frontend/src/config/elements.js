/*
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-13 10:14:20
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-03-04 13:27:22
 * @Description: file content
 */
export default {
  // 首页
  index: {},
  // 基础字典管理
  dictionary: {
    areaManager: {
      createTopCate: 'dictionary:areaManager:createTopCate',
      createSubCate: 'dictionary:areaManager:createSubCate',
      edit: 'dictionary:areaManager:edit',
      del: 'dictionary:areaManager:del'
    },
    categoryManager: {
      createTopCate: 'dictionary:categoryManager:createTopCate',
      createSubCate: 'dictionary:categoryManager:createSubCate',
      edit: 'dictionary:categoryManager:edit',
      del: 'dictionary:categoryManager:del'
    },
    productManager: {
      create: 'dictionary:productManager:create',
      edit: 'dictionary:productManager:edit',
      del: 'dictionary:productManager:del'
    },
    factoryManager: {
      group: {
        create: 'dictionary:factoryManager:group:create',
        edit: 'dictionary:factoryManager:group:edit'
      },
      factory: {
        create: 'dictionary:factoryManager:factory:create',
        edit: 'dictionary:factoryManager:factory:edit',
        department: 'dictionary:factoryManager:factory:department'
      }
    },
    marketWeight: {
      edit: 'dictionary:marketWeight:edit'
    }
  },
  // 资讯管理
  information: {
    addInformation: {
      index: {
        create: 'information:addInformation:index:create'
      }
    },
    informationAudit: {
      index: {
        edit: 'information:informationAudit:index:edit',
        downShelves: 'information:informationAudit:index:downShelves',
        remove: 'information:informationAudit:index:remove',
        audit: 'information:informationAudit:index:audit'
      }
    },
    quickInformation: {
      index: {
        create: 'information:quickInformation:index:create',
        edit: 'information:quickInformation:index:edit',
        downShelves: 'information:quickInformation:index:downShelves',
        remove: 'information:quickInformation:index:remove'
      }
    }
  },
  // 源数据管理
  sourceData: {
    // 数据获取
    data: {
      create: 'sourceData:data:create',
      batchDel: 'sourceData:data:batchDel',
      confirm: 'sourceData:data:confirm',
      excelImport: 'sourceData:data:excelImport'
    },
    analysis: {
      prompt: {
        batchDel: 'sourceData:analysis:prompt:batchDel',
        batchValid: 'sourceData:analysis:prompt:batchValid',
        edit: 'sourceData:analysis:prompt:edit',
        del: 'sourceData:analysis:prompt:del',
        valid: 'sourceData:analysis:prompt:valid'
      },
      unPrompt: {
        edit: 'sourceData:analysis:unPrompt:edit',
        del: 'sourceData:analysis:unPrompt:del'
      },
      settle: {
        confirm: 'sourceData:analysis:settle:confirm'
      }
    }
  },
  shortVideo: {
    audit: 'shortVideo.audit',
    down: 'shortVideo.down',
    release: 'shortVideo.release'
  },
  // 培训管理
  trainingManage: {
    recruitment: {
      audit: 'trainingManage.recruitment.audit',
      down: 'trainingManage.recruitment.down'
    },
    longVideo: {
      main: {
        add: 'trainingManage.longVideo.main.add',
        edit: 'trainingManage.longVideo.main.edit',
        view: 'trainingManage.longVideo.main.view',
        viewSub: 'trainingManage.longVideo.main.viewSub'
      },
      sub: {
        add: 'trainingManage.longVideo.sub.add',
        edit: 'trainingManage.longVideo.sub.edit',
        view: 'trainingManage.longVideo.sub.view'
      }
    },
    // 审核长视频
    auditLongVideo: {
      main: {
        audit: 'trainingManage.longVideoAudit.main.audit',
        down: 'trainingManage.longVideoAudit.main.down'
      },
      sub: {
        audit: 'trainingManage.longVideoAudit.sub.audit',
        down: 'trainingManage.longVideoAudit.sub.down'
      }
    }
  },
  // 学院管理
  academyManage: {
    // 添加音频
    audio: {
      // TODO
    },
    // 音频审核
    audioAudit: {
      audit: 'academyManage.audioAudit.audit',
      down: 'academyManage.audioAudit.down'
    },
    // 添加报告
    report: {
      add: 'academyManage.report.add',
      edit: 'academyManage.report.edit'
    },
    // 报告审核
    reportAudit: {
      audit: 'academyManage.reportAudit.audit',
      down: 'academyManage.reportAudit.down'
    }
  }
}
