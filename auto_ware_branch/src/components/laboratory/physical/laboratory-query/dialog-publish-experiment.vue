<!--待实验/实验报告单/发布-->
<template>
  <div ref="dialogMain">
    <jk-dialog :title="form.title" :visible.sync="dialogVisible" width="50%">
      <!--操作-->
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button @click="hold" type="primary">暂存</el-button>
          <el-button v-if="['PROCESSING'].includes(form.formData.status)" @click="auditLaberary" :loading="loading.audit" type="primary">提交审核</el-button>
        </div>
      </div>

      <div class="div-flex-column">
        <div class="flex-left">
          <el-form :model="form" ref="templateForm" label-width="100px" v-loading="loading.form"
                   element-loading-text="拼命加载中">

            <el-form-item v-for="item in form.dataArray" :key="item.nodeCode"
                          :label="`${item.templateName}(${item.nodeCode})`">
              <!--输入控件-->
              <control-document :type="item.type"
                                :nodeCode="item.nodeCode"
                                :selectStaticMapId="item.selectStaticMapId"
                                :documentType="item.documentType"
                                :value.sync="item.value"
                                :selectStaticMaps="item.selectStaticMaps"
                                :refTemplateData="item.refTemplateData"
                                :refTemplateId="item.refTemplateId">
              </control-document>

              <!--输入框后面的按钮-->
              <el-button v-if="item.type === 'REF_INDEX_EVALUATION'" :name="item.nodeCode" size="small" type="primary"
                         @click="getTargetVal(item.nodeCode)">获取指标评定
              </el-button>

              <!--输入框下面的文字-->
              <div class="formula" v-if="item.type === 'EQUATION'">{{item.formula}}</div>

            </el-form-item>

          </el-form>
        </div>
        <div class="flex-right">
          <el-table :data="tableData" border v-loading="loading.status" element-loading-text="拼命加载中">
            <el-table-column label="操作环节">
              <template slot-scope="scope">
                {{ scope.row.operationType | toStatus }}
              </template>
            </el-table-column>
            <el-table-column prop="operator" label="操作人" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作时间">
              <template slot-scope="scope">
                {{scope.row.operationDate | timeFormat('YYYY-MM-DD HH:mm') }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </jk-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {
      jkDialog: require('common/dialog-side.vue'),
      controlDocument: require('common/control-document.vue'),
      controlTable: require('common/control-table.vue')
    },
    created () {
    },
    filters: {
      toStatus (value) {
        if (value === 'SAMPLE_REGISTRATION') {
          return '样品登记'
        } else if (value === 'DATA_MODIFICATION') {
          return '数据变更'
        } else if (value === 'SUBMIT_AUDIT') {
          return '提交审核'
        } else if (value === 'AUDITED') {
          return '审核通过'
        } else if (value === 'AUDITREJECT') {
          return '审核驳回'
        }
      }
    },
    data () {
      return {
        dialogVisible: false,
        user: {},
        form: {
          title: '发布',
          reportId: '',
          dataArray: [],
          formData: {}
        },
        loading: {
          table: false,
          form: false,
          status: false,
          generate: false,
          audit: false
        },
        tableData: [
          {operation: '提交审核', operator: '张三', operDate: '2017-09-08 10：28'},
          {operation: '提交审核', operator: '李四', operDate: '2017-09-08 10：28'}
        ],
        tableId: ''
      }
    },
    props: {},
    mounted () {
      this.user = storage.getUser()
    },
    computed: {},
    updated () {
    },
    methods: {
      show (formData) {
        console.log(formData)
        this.dialogVisible = true
        this.form.reportId = formData.row.id
        this.form.formData = formData.row
        this.getOperRecord()
        this.loading.form = true
        api.physicalLaboratory.labRptRecordController.getLabRptRecordDoByRptRecordId({recordId: formData.row.id}).then(response => {
          let data = response.data
          if (data.success) {
            let jsonArray = JSON.parse(data.data.fieldLocationJson)
            // 查找选项
            for (let i = 0; i < jsonArray.length; i++) {
              if (!jsonArray[i].hasOwnProperty('value')) {
                jsonArray[i].value = ''
              }
              if (jsonArray[i].documentType === 'TEMP_USER') {
                jsonArray[i].value = this.user.name
              }
              jsonArray[i].selectStaticMaps = []
              if (jsonArray[i].documentType === 'TEMP_SELECT' && jsonArray[i].selectStaticMapId) {
                api.physicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: jsonArray[i].selectStaticMapId}).then((response) => {
                  let data = response.data
                  if (data.success) {
                    jsonArray[i].selectStaticMaps = data.data
                  }
                })
              }
              if (jsonArray[i].type === 'REF_TEMP_GUIDE_SAMPLE' && jsonArray[i].refTemplateId) {
                jsonArray[i].refTemplateData = []
                api.physicalLaboratory.labOriginalRecordController.getGuideSampleRecordDoListByTemplateId({templateId: jsonArray[i].refTemplateId}).then((response) => {
                  let data = response.data
                  if (data.success) {
                    jsonArray[i].refTemplateData = data.data
                  }
                })
              }
            }
            this.form.dataArray = jsonArray
          } else {
            this.$message.error(data.errorMsg)
            this.close()
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.form = false
        })
      },
      getOperRecord () {
        this.loading.table = true
        api.physicalLaboratory.labOperationLog.getLabOperationLogDos({
          bizId: this.form.reportId,
          bizType: 'LAB_RPT_RECORD'
        }).then(response => {
          const data = response.data
          if (data.success === true) {
            console.log(data)
            this.tableData = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.table = false
        })
      },
      close () {
        this.dialogVisible = false
      },
//      inputValueChange (nodeCode, val) {
//        console.log(nodeCode)
//        console.log(val)
//        let index = this.form.dataArray.findIndex((value, index, arr) => {
//          return nodeCode === value.nodeCode
//        })
//        this.form.dataArray[index].value = val
//      },
//      tempPropBlur (obj) {
//        let item = {name: obj.target.name, value: obj.target.value}
//        let index = this.form.dataArray.findIndex((value, index, arr) => {
//          return item.name === value.nodeCode
//        })
//        this.form.dataArray[index].value = item.value
//      },
//      // 获取F值
//      getFvalue (obj) {
//        let strLog = ''
//        // 当前字典的refCode
//        let refCode = obj.target.parentNode.name
//        strLog += `当前节点的refCode=${refCode}；`
//        console.log(strLog)
//        // nodeCode为当前refCode的index
//        let index = this.form.dataArray.findIndex((value, index, arr) => {
//          return refCode === value.nodeCode
//        })
//        strLog += `nodeCode为${refCode}的index=${index}；`
//        console.log(strLog)
//        // 引用节点填的值
//        let fKey = this.form.dataArray[index].value
//        strLog += `引用节点填的值fKey=${fKey}；`
//        console.log(strLog)
//
//        // 当前节点的index
//        let refIndex = this.form.dataArray.findIndex((value, index, arr) => {
//          return refCode === value.refCode
//        })
//        strLog += `当前节点的refIndex=${refIndex}；`
//        console.log(strLog)
//        // 当前节点的业务类型
//        let type = this.form.dataArray[refIndex].dicType
//        strLog += `当前节点的业务类型type=${type}；`
//        console.log(strLog)
//        console.log(this.form.dataArray)
//        let param = {fKey, type}
//        api.physicalLaboratory.labStaticMap.getValue4F(param).then(response => {
//          let data = response.data
//          if (data.success) {
//            // 给数组某一项赋值
//            let newValue = Object.assign(this.form.dataArray[refIndex], {value: data.data})
//            this.$set(this.form.dataArray, refIndex, newValue)
//          } else {
//            this.$message.error(data.errorMsg)
//          }
//        }).catch((e) => {
//          console.log(e)
//        })
//      },
//      // 公式计算
//      calculate (obj) {
//        let strLog = ''
//        console.log(obj)
//        let nodeCode = obj.target.parentNode.name
//        strLog += `当前节点nodeCode=${nodeCode}；`
//        let index = this.form.dataArray.findIndex((value, index, arr) => {
//          return nodeCode === value.nodeCode
//        })
//        strLog += `当前节点的index=${index}；`
//        console.log(strLog)
//        let params = {
//          labValueJsonVo: this.form.dataArray[index],
//          labValueJsonVos: this.form.dataArray
//        }
//        api.physicalLaboratory.labOriginalRecordController.calFormula(params).then(response => {
//          let data = response.data
//          if (data.success) {
//            // 给数组某一项赋值
//            let newValue = Object.assign(this.form.dataArray[index], {value: data.data})
//            this.$set(this.form.dataArray, index, newValue)
//          } else {
//            this.$message.error(data.errorMsg)
//          }
//        }).catch((e) => {
//          console.log(e)
//        })
//      },
      // 暂存
      hold () {
        let params = {
          id: this.form.reportId,
          modifier: this.user.userId,
          fieldLocationJson: JSON.stringify(this.form.dataArray)
        }
        api.physicalLaboratory.labRptRecordController.updateLabRptRecordDo(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$emit('searchListData')
            this.$message.success('保存成功')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      // 获取指标值
      getTargetVal (nodeCode) {
        console.log(`refCode:${nodeCode} nodeCode:${nodeCode}`)
        let strLog = ''
        strLog += `当前节点nodeCode=${nodeCode}；`
        let index = this.form.dataArray.findIndex((value, index, arr) => {
          return nodeCode === value.nodeCode
        })
        if (index === -1) {
          this.$message.error(`未能找到当前节点${nodeCode}`)
          return
        }
        strLog += `当前节点的index=${index}；`
        console.log(strLog)
        let params = {
          source: 'LAB_RPT',
          sampleId: this.form.formData.sampleId,
          batchNumber: Object.is(this.form.formData.batchNumber, undefined) ? '' : this.form.formData.batchNumber,
          labBaseJsonVo: this.form.dataArray[index],
          labBaseJsonVos: this.form.dataArray
        }
        api.physicalLaboratory.labIndexEvaluationController.getIndexValue(params).then(response => {
          let data = response.data
          if (data.success) {
            // 给数组某一项赋值
            Object.assign(this.form.dataArray[index], {value: data.data.indexValue})
            if (data.data.standardValue) {
              Object.assign(this.form.dataArray[index], {standardValue: data.data.standardValue})
            }
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      // 生成
      generate () {
        this.loading.generate = false
        let params = {
          recordId: this.form.reportId,
          modifier: this.user.userId,
          labRptJsonVos: this.form.dataArray
        }
        api.physicalLaboratory.labRptRecordController.produceRptRecord(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$emit('searchListData')
            this.$message.success('生成成功')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.generate = true
        })
      },
      // 提交审核
      auditLaberary () {
        this.loading.audit = true
        let params = {
          id: this.form.reportId,
          modifier: this.user.userId,
          fieldLocationJson: JSON.stringify(this.form.dataArray)
        }
        api.physicalLaboratory.labRptRecordController.changeStatusAndUpdateLabRptRecordDo(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$emit('searchListData')
            this.$message.success('提交审核成功')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          this.loading.audit = false
        })
      }
    }
  }
</script>
<style>
  .row-select {
    background-color: #4b646f !important;
  }
</style>
<style scoped>
  .div-flex-column {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .flex-left {
    width: 50%;
  }

  .flex-right {
    width: 50%;
  }

  .template-input {
    width: 20rem;
  }

  .formula {
    font-size: 10px;
    height: 14px;
    line-height: 14px;
    color: #4b646f;
  }
</style>
