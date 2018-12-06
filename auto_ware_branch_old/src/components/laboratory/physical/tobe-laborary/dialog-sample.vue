<!--待实验/原始记录/实验-->
<template>
  <div ref="dialogMain">
    <jk-dialog :title="form.title" :visible.sync="dialogVisible" width="70%">
      <!--操作-->
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <!--<template v-if="form.status === 'PROCESSING'">-->
            <!--<el-button @click="hold" :loading="loading.hold" type="primary">暂存</el-button>-->
            <!--<el-button @click="audit" :loading="loading.audit" type="primary">提交审核</el-button>-->
          <!--</template>-->
          <!--<template v-else>-->
            <!--<el-button @click="reject" :loading="loading.reject" type="primary">审核驳回</el-button>-->
            <!--&lt;!&ndash;<el-button @click="approve" :loading="loading.approve" type="primary">审核通过</el-button>&ndash;&gt;-->
            <!--<el-button @click="hold" :loading="loading.hold" type="primary">暂存</el-button>-->
          <!--</template>-->
          <el-button @click="hold" :loading="loading.hold" type="primary">暂存</el-button>
          <el-button @click="generateRecord" :loading="loading.generateRecord" type="primary">生成记录</el-button>
        </div>
      </div>

      <div>
        <!--表单数据-->
        <el-form :model="form" ref="templateForm" label-width="100px" v-loading="loading.form"
                 element-loading-text="拼命加载中">

          <el-form-item v-for="item in form.dataArray" :key="item.nodeCode"
                        :label="`${item.templateName}(${item.nodeCode})`">
            <!--输入控件-->
            <control-table v-if="item.type === 'TABLE'"
                           :tableLines="item.tableLines"
                           :tableColumnNames=item.tableColumnNames
            ></control-table>
            <control-document v-else
                              :type="item.type"
                              :nodeCode="item.nodeCode"
                              :selectStaticMapId="item.selectStaticMapId"
                              :documentType="item.documentType"
                              :value.sync="item.value"
                              :selectStaticMaps="item.selectStaticMaps"
                              :refTemplateData="item.refTemplateData"
                              :refTemplateId="item.refTemplateId">
            </control-document>

            <!--输入框后面的按钮-->
            <el-button v-if="item.type === 'STATIC_MAP'" :name="item.refCode + '|' +item.nodeCode" size="small"
                       type="primary"
                       @click="getFvalue(item.refCode, item.nodeCode)">获取F值
            </el-button>

            <el-button v-else-if="item.type === 'EQUATION'" :name="item.nodeCode" size="small" type="primary"
                       @click="calculate(item.nodeCode)">计算
            </el-button>

            <el-button v-if="item.type === 'REF_INDEX_EVALUATION'" :name="item.nodeCode" size="small" type="primary"
                       @click="getTargetVal(item.nodeCode)">获取指标评定
            </el-button>

            <el-button v-else-if="item.type === 'REF_TABLE'" :name="item.nodeCode" size="small" type="primary"
                       @click="getTableRef(item.nodeCode, item.refTableCode)">获取指标
            </el-button>

            <el-button v-else-if="item.type === 'TABLE'" :name="item.nodeCode" size="small" type="primary"
                       @click="getTableValues(item.nodeCode)">计算
            </el-button>
            <!--计算平均数-->
            <el-button v-else-if="['TABLE_AVE'].includes(item.type)" :name="item.nodeCode"
                       size="small" type="primary"
                       @click="getCalTableAve(item.nodeCode)">计算
            </el-button>
            <!--表格内标准偏差-->
            <el-button v-else-if="['TABLE_STANDARD_DEVIATION'].includes(item.type)" :name="item.nodeCode"
                       size="small" type="primary"
                       @click="getCalTableStandardDeviation(item.nodeCode)">计算
            </el-button>
            <!--输入框下面的文字-->
            <div class="formula" v-if="item.type === 'EQUATION'">{{item.formula}}</div>
          </el-form-item>
        </el-form>
        <table class="remarkTable">
          <tr style="color: #0000FF">
            <th colspan="2">异常丝锭情况：</th>
          </tr>
          <tr>
            <td colspan="2">
              <ul v-for="dos in form.labAbnormalFilamentDos">
                <li>锭号：{{dos.spindleNumber}}</li>
                <li>异常原因：{{dos.abnormalCauses}}</li>
              </ul>
            </td>
          </tr>
          <tr style="color: red;">
            <th>送物检备注：</th>
            <td>
              {{form.registerRemark}}
            </td>
          </tr>
          <tr style="color: red;">
            <th>落丝备注：</th>
            <td>
              {{form.doffingRemark}}
            </td>
          </tr>
        </table>
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
        form: {
          title: '实验',
          user: {},
          experimentId: '',
          status: '',
          dataArray: [],
          registerRemark: '无',
          doffingRemark: '无',
          labAbnormalFilamentDos: [],
          formData: {}
        },
        loading: {
          table: false,
          form: false,
          status: false,
          hold: false,
          audit: false,
          reject: false,
          approve: false,
          getTableValues: false,
          generateRecord: false
        },
        nowResult: '',
        tableData: [],
        tableId: '',
        // 临时存放，避免重复ajax
        tempSelectStaticMaps: [],
        // 临时存放，避免重复ajax
        tempRefTemplateData: []
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
        this.tableId = formData.row.id
        this.loading.form = true
        this.loading.formData = formData.row
        this.loading.table = true
        this.dialogVisible = true
        this.getOperRecord()
        this.form.experimentId = formData.row.id
        api.physicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentDoListByExperimentId({experimentId: formData.row.id}).then(response => {
          let data = response.data
          if (data.success) {
            this.form.status = data.data.status
            let jsonArray = JSON.parse(data.data.fieldLocationJson)
            jsonArray = jsonArray[0].labValueJsonVos
            jsonArray = this.dataProcess(jsonArray)
            this.form.dataArray = jsonArray
            if (data.data.doffingRemark) this.form.doffingRemark = data.data.doffingRemark
            if (data.data.registerRemark) this.form.registerRemark = data.data.registerRemark
            if (data.data.labAbnormalFilamentDos) this.form.labAbnormalFilamentDos = data.data.labAbnormalFilamentDos
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.form = false
          this.loading.table = false
        })
      },
      dataProcess (jsonArray) {
        // 查找选项
        for (let i = 0; i < jsonArray.length; i++) {
          if (!jsonArray[i].hasOwnProperty('value')) {
            jsonArray[i].value = ''
          }
          if (jsonArray[i].hasOwnProperty('documentType') && jsonArray[i].documentType === 'TEMP_USER') {
            jsonArray[i].value = this.user.name
          }
          if (jsonArray[i].hasOwnProperty('documentType') && jsonArray[i].documentType === 'TEMP_SELECT' && jsonArray[i].selectStaticMapId) {
            api.physicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: jsonArray[i].selectStaticMapId}).then((response) => {
              let data = response.data
              if (data.success) {
                this.$set(jsonArray[i], 'selectStaticMaps', data.data)
                // jsonArray[i].selectStaticMaps = data.data
              }
            })
          }
          if (jsonArray[i].hasOwnProperty('type') && jsonArray[i].type === 'REF_TEMP_GUIDE_SAMPLE' && jsonArray[i].refTemplateId) {
            jsonArray[i].refTemplateData = []
            api.physicalLaboratory.labOriginalRecordController.getGuideSampleRecordDoListByTemplateId({templateId: jsonArray[i].refTemplateId}).then((response) => {
              let data = response.data
              if (data.success) {
                // jsonArray[i].refTemplateData = data.data
                this.$set(jsonArray[i], 'refTemplateData', data.data)
              }
            })
          }
          if (jsonArray[i].hasOwnProperty('type') && jsonArray[i].type === 'TABLE' && jsonArray[i].hasOwnProperty('tableLines') && jsonArray[i].tableLines) {
            jsonArray[i].tableLines.map(line => {
              this.dataProcess(line)
            })
            jsonArray[i].tableColumnNames = jsonArray[i].tableLines[0].map(line => {
              return line.templateName
            })
          }
        }
        return jsonArray
      },
      getOperRecord () {
        this.loading.status = true
        api.physicalLaboratory.labOperationLog.getLabOperationLogDos({
          bizId: this.tableId,
          bizType: 'LAB_ORIGINAL_RECORD'
        }).then(response => {
          const data = response.data
          if (data.success === true) {
            this.tableData = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.status = false
        })
      },
      close () {
        this.dialogVisible = false
      },
      // 获取指标
      getTableRef (nodeCode, refTableCode) {
        let dataItem = this.form.dataArray.find(arr => {
          return arr.nodeCode === refTableCode
        })
        let param = {
          source: 'LAB_ORIGINAL',
          tableAttributeIndexJsonVo: dataItem.tableLines[0].find(line => {
            return line.type === 'TABLE_ATTRIBUTE_INDEX'
          }),
          tableLines: dataItem.tableLines
        }
        api.physicalLaboratory.labIndexEvaluationController.groupIndexValue(param).then(response => {
          const data = response.data
          if (data.success === true) {
            let currentDataItem = this.form.dataArray.find(arr => {
              return arr.nodeCode === nodeCode
            })
            currentDataItem.value = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      },
      // 获取指标值
      getTargetVal (nodeCode) {
        let params = {
          source: 'LAB_ORIGINAL',
          sampleId: this.form.formData.sampleId,
          batchNumber: Object.is(this.form.formData.batchNumber, undefined) ? '' : this.form.formData.batchNumber,
          labBaseJsonVo: this.form.dataArray.find(arr => {
            return arr.nodeCode === nodeCode
          }),
          labBaseJsonVos: this.form.dataArray
        }
        api.physicalLaboratory.labIndexEvaluationController.getIndexValue(params).then(response => {
          let data = response.data
          if (data.success) {
            let currentDataItem = this.form.dataArray.find(arr => {
              return arr.nodeCode === nodeCode
            })
            currentDataItem.value = data.data.indexValue
            if (data.data.standardValue) {
              Object.assign(currentDataItem, {standardValue: data.data.standardValue})
            }
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      // 获取指标评定
      getTableValues (nodeCode) {
        let dataItem = this.form.dataArray.find(arr => {
          return arr.nodeCode === nodeCode
        })
        let tableAttribute = dataItem.tableLines[0].findIndex(line => {
          return ['TABLE_ATTRIBUTE_INDEX', 'TABLE_EQUATION'].includes(line.type)
        })
        if (tableAttribute === -1) {
          this.$message.error(`无须计算`)
          return
        }
        let param = {
          source: 'LAB_ORIGINAL',
          labBaseJsonVo: dataItem,
          tableAttributeIndexJsonVos: dataItem.tableLines[0].filter(line => {
            return line.type === 'TABLE_ATTRIBUTE_INDEX'
          }),
          equationLabBaseJsonVos: dataItem.tableLines[0].filter(line => {
            return line.type === 'TABLE_EQUATION'
          })
        }
        api.physicalLaboratory.labIndexEvaluationController.calAllIndexValue(param).then(response => {
          const data = response.data
          if (data.success === true) {
            dataItem.tableLines.forEach((lines, linesIndex) => {
              lines.forEach((line, lineIndex) => {
                if (['TABLE_ATTRIBUTE_INDEX', 'TABLE_EQUATION'].includes(line.type)) {
                  line.value = ''
                  if (data.data.tableLines[linesIndex][lineIndex].value) {
                    line.value = data.data.tableLines[linesIndex][lineIndex].value
                  }
                }
              })
            })
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      },
      // 获取F值
      getFvalue (refCode, nodeCode) {
        console.log(`refCode:${refCode} nodeCode:${nodeCode}`)
        let strLog = ''
        /* ------------------------------ 当前节点的refCode ------------------------------ */
        strLog += `当前节点的refCode=${refCode}；`
        console.log(strLog)
        // nodeCode为当前refCode的index
        let index = this.form.dataArray.findIndex((value, index, arr) => {
          return refCode === value.nodeCode
        })
        if (index === -1) {
          this.$message.error(`未能找到引用节点${refCode}`)
          return
        }
        strLog += `nodeCode为${refCode}的index=${index}；`
        console.log(strLog)
        /* ------------------------------ 引用节点填的值 ------------------------------ */
        let fKey = ''
        if (this.form.dataArray[index].hasOwnProperty('value')) {
          fKey = this.form.dataArray[index].value
          strLog += `引用节点填的值fKey=${fKey}；`
        } else {
          this.$message.error(`请填写${refCode}的值`)
          return
        }
        console.log(strLog)
        /* ------------------------------ 当前节点的index ------------------------------ */
        let currIndex = this.form.dataArray.findIndex((value, index, arr) => {
          return nodeCode === value.nodeCode
        })
        if (currIndex === -1) {
          this.$message.error(`未能找到当前节点${nodeCode}`)
          return
        }
        strLog += `当前节点的currIndex=${currIndex}；`
        console.log(strLog)
        /* ------------------------------ 当前节点的业务类型 ------------------------------ */
        let type = ''
        if (this.form.dataArray[currIndex].hasOwnProperty('dicType')) {
          type = this.form.dataArray[currIndex].dicType
          strLog += `当前节点的业务类型type=${type}；`
          console.log(strLog)
        } else {
          this.$message.error(`未能找到当前节点${nodeCode}的dicType`)
          return
        }
        let param = {fKey, type}
        api.physicalLaboratory.labStaticMap.getValue4F(param).then(response => {
          let data = response.data
          if (data.success) {
            // 给数组某一项赋值
            let newValue = Object.assign(this.form.dataArray[currIndex], {value: data.data})
            // this.$set(this.form.dataArray, currIndex, newValue)
            this.form.dataArray.splice(currIndex, 1, newValue)
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      // 计算
      calculate (nodeCode) {
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
          labValueJsonVo: this.form.dataArray[index],
          labValueJsonVos: this.form.dataArray
        }
        api.physicalLaboratory.labOriginalRecordController.calFormula(params).then(response => {
          let data = response.data
          if (data.success) {
            // 给数组某一项赋值
            let newValue = Object.assign({}, this.form.dataArray[index], {value: data.data})
//            this.$set(this.form.dataArray, index, newValue)
            this.form.dataArray.splice(index, 1, newValue)
            console.log(this.form.dataArray[index])
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      // 计算平均数
      getCalTableAve (code) {
        let currValue = this.form.dataArray.find(item => item.nodeCode === code)
        let currTableLines = this.form.dataArray.find(item => item.nodeCode === currValue.refTableCode)
        let params = {labValueJsonVo: currValue, tableLines: currTableLines.tableLines}
        api.physicalLaboratory.labOriginalRecordController.calTableAve(params).then(response => {
          let data = response.data
          if (data.success) {
            currValue.value = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.approve = false
        })
      },
      // 计算标准偏差
      getCalTableStandardDeviation (code) {
        let currValue = this.form.dataArray.find(item => item.nodeCode === code)
        let currTableLines = this.form.dataArray.find(item => item.nodeCode === currValue.refTableCode)
        let params = {labValueJsonVo: currValue, tableLines: currTableLines.tableLines}
        api.physicalLaboratory.labOriginalRecordController.calTableStandardDeviation(params).then(response => {
          let data = response.data
          if (data.success) {
            currValue.value = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.approve = false
        })
      },
      // 暂存
      hold () {
        this.loading.hold = true
        let params = {
          id: this.form.experimentId,
          modifier: this.user.userId,
          fieldLocationJson: JSON.stringify([{labValueJsonVos: this.form.dataArray}])
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.setProcessingAndUpdateJsonValues(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('保存成功')
            this.$emit('submitSuccess')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.hold = false
        })
      },
      // 提交审核
      audit () {
        this.loading.audit = true
        let params = {
          id: this.form.experimentId,
          modifier: this.user.userId,
          fieldLocationJson: JSON.stringify([{labValueJsonVos: this.form.dataArray}])
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.setPendingAndUpdateJsonValues(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('提交成功')
            this.$emit('submitSuccess')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.audit = false
        })
      },
      // 驳回
      reject () {
        this.loading.reject = true
        let params = {
          id: this.form.experimentId,
          modifier: this.user.userId,
          fieldLocationJson: JSON.stringify([{labValueJsonVos: this.form.dataArray}])
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.setAuditRejectedLabOriginalPending(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('驳回成功')
            this.$emit('submitSuccess')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.reject = false
        })
      },
      // 审核通过
      approve () {
        this.loading.approve = true
        let params = {
          labOriginalValueJsonVos: [{labValueJsonVos: this.form.dataArray}],
          labOriginalPendingExperimentDoId: this.form.experimentId
        }
        api.physicalLaboratory.labOriginalRecordController.produceOriginalRecord(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('审核成功')
            this.$emit('submitSuccess')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.approve = false
        })
      },
      // 生成记录
      generateRecord () {
        this.loading.generateRecord = false
        let params = {
          id: this.form.experimentId,
          modifier: this.user.userId,
          fieldLocationJson: JSON.stringify([{labValueJsonVos: this.form.dataArray}])
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.examineAndVerifyLabOriginalPendingDo(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('生成记录成功')
            this.$emit('submitSuccess')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.generateRecord = false
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
  .formula {
    font-size: 10px;
    height: 14px;
    line-height: 14px;
    color: #4b646f;
  }

  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: auto;
  }

  ul li {
    float: left;
    width: 200px;
  }

  table.remarkTable tr {

  }

  table.remarkTable th {
    width: 200px;
  }
</style>
