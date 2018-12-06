<!--待实验/原始记录/实验-->
<template>
  <div ref="dialogMain">
    <jk-dialog :title="form.title" :visible.sync="dialogVisible" width="70%">
      <!--操作-->
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <template v-if="form.status === 'PROCESSING'">
            <el-button @click="hold" :loading="loading.hold" type="primary">暂存</el-button>
            <el-button @click="audit" :loading="loading.audit" type="primary">提交审核</el-button>
          </template>
          <template v-else>
            <el-button @click="reject" :loading="loading.reject" type="primary">审核驳回</el-button>
            <el-button @click="approve" :loading="loading.approve" type="primary">审核通过</el-button>
          </template>
        </div>
      </div>

      <div class="div-flex-column">
        <div class="flex-left">
          <el-form :model="form" ref="templateForm" label-width="100px" v-loading="loading.form"
                   element-loading-text="拼命加载中">

            <el-form-item v-for="item in form.dataArray" :key="item.nodeCode"
                          :label="`${item.templateName}(${item.nodeCode})`">
              <!--输入控件
                @inputValueChange="inputValueChange"
                @tempPropBlur="tempPropBlur"-->
              <control-document
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
                {{scope.row.operationDate | timeFormat('YYYY-MM-DD HH:mm')}}
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
      controlDocument: require('common/control-document.vue')
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
          dataArray: []
        },
        loading: {
          table: false,
          form: false,
          status: false,
          hold: false,
          audit: false,
          reject: false,
          approve: false
        },
        nowResult: '',
        tableData: [],
        tableId: ''
      }
    },
    props: {},
    mounted () {
      this.user = storage.getUser()
    },
    computed: {},
    updated () {},
    methods: {
      show (formData) {
        this.tableId = formData.row.id
        this.loading.form = true
        this.dialogVisible = true
        this.getOperRecord()
        this.form.experimentId = formData.row.id
        this.loading.form = true
        api.chemicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentDoListByExperimentId({experimentId: formData.row.id}).then(response => {
          let data = response.data
          if (data.success) {
            console.log(data)
            this.form.status = data.data.status
            let jsonArray = JSON.parse(data.data.fieldLocationJson)
            jsonArray = jsonArray[0].labValueJsonVos
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
                api.chemicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: jsonArray[i].selectStaticMapId}).then((response) => {
                  let data = response.data
                  if (data.success) {
                    jsonArray[i].selectStaticMaps = data.data
                  }
                })
              }
              if (jsonArray[i].type === 'REF_TEMP_GUIDE_SAMPLE' && jsonArray[i].refTemplateId) {
                jsonArray[i].refTemplateData = []
                api.chemicalLaboratory.labOriginalRecordController.getGuideSampleRecordDoListByTemplateId({
                  templateId: jsonArray[i].refTemplateId,
                  page: {
                    current: 1,
                    length: 10
                  }
                }).then((response) => {
                  let data = response.data
                  if (data.success) {
                    console.log(data)
                    jsonArray[i].refTemplateData = data.data
                    console.log(jsonArray[i].refTemplateData)
                  }
                })
              }
            }
            console.log(jsonArray)
            this.form.dataArray = jsonArray
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.form = false
        })
      },
      getOperRecord () {
        this.loading.status = true
        api.chemicalLaboratory.labOperationLog.getLabOperationLogDos({
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
        api.chemicalLaboratory.labStaticMap.getValue4F(param).then(response => {
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
      // 公式计算
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
        api.chemicalLaboratory.labOriginalRecordController.calFormula(params).then(response => {
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
      // 暂存
      hold () {
        this.loading.hold = true
        let params = {
          id: this.form.experimentId,
          modifier: this.user.userId,
          fieldLocationJson: JSON.stringify([{labValueJsonVos: this.form.dataArray}])
        }
        console.log(this.form.dataArray)
        api.chemicalLaboratory.LabOriginalPendingExperiment.setProcessingAndUpdateJsonValues(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('保存成功')
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
        api.chemicalLaboratory.LabOriginalPendingExperiment.setPendingAndUpdateJsonValues(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('提交成功')
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
        api.chemicalLaboratory.LabOriginalPendingExperiment.setAuditRejectedLabOriginalPending(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('驳回成功')
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
        api.chemicalLaboratory.labOriginalRecordController.produceOriginalRecord(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('审核成功')
            this.$emit('initExperiment')
            this.close()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.approve = false
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
