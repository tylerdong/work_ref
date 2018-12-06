<!--实验查询/报告单/弹出报告单-->
<template>
  <div ref="dialogMain">
    <jk-dialog :title="form.title" :visible.sync="dialogVisible" @closeSideDialog="returnBack" width="70%">
      <!--操作-->
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="form.category" value-key="id" placeholder="请选择" @change="searchPdf">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
          <el-button @click="downloadPdf" type="primary">下载</el-button>
          <a ref="refDownload" :href="form.fileHref"></a>
          <el-button @click="returnBack" type="primary">返回</el-button>
        </div>
      </div>

      <div class="div-flex-column">
        <div class="flex-left">
          <!--展示pdf文件-->
          <img :src="form.fileData" class="pdf-image">
        </div>
        <div class="flex-right">
          <el-table :data="tableData" border v-loading="loading" element-loading-text="拼命加载中">
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

  export default {
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    created () {
    },
    data () {
      return {
        dialogVisible: false,
        tableData: [],
        form: {
          title: '原始记录单',
          fileId: '',
          fileData: '',
          fileHref: '',
          category: null
        },
        rptRecordId: '',
        categories: [],
        loading: false,
        isShowPDF: false,
        fileId: null,
        id: null
      }
    },
    props: {},
    mounted () {
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
    computed: {},
    updated () {},
    methods: {
      show (formData) {
        this.dialogVisible = true
        this.rptRecordId = formData.row.id
        this.getSelect()
      },
      getSelect () {
        api.chemicalLaboratory.labOriginalRecordController.getLabOriginalRecordDoListByRptRecordId({rptRecordId: this.rptRecordId}).then(response => {
          const data = response.data
          if (data.success === true) {
            this.categories = data.data
            this.form.category = data.data[0]
            this.fileId = this.form.category.fileId
            this.id = this.form.category.id
            this.searchPdf()
            this.getOperRecord()
            this.form.fileHref = window.global.chemicalAjaxBaseUrl + 'api/file/download?fileId=' + this.form.category.fileId
            return true
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getFile (fileId) {
        api.chemicalLaboratory.fileManage.downloadFdfToJpg({fileId}).then(response => {
          const data = response.data
          if (data.success === true) {
            this.form.fileData = `data:image/jpeg;base64,${data.data.pdfImg}`
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getOperRecord () {
        this.loading = true
        api.chemicalLaboratory.labOperationLog.getLabOperationLogDos({
          bizId: this.form.category.originalPendingExperimentId,
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
          this.loading = false
        })
      },
      downloadPdf () {
        this.$refs.refDownload.click()
      },
      searchPdf () {
        this.getFile(this.form.category.fileId)
        this.getOperRecord()
        this.form.fileHref = window.global.physicalAjaxBaseUrl + 'api/file/download?fileId=' + this.form.category.fileId
      },
      returnBack () {
        this.dialogVisible = false
        this.isShowPDF = false
      }
    }
  }
</script>
<style scoped>
  .div-flex-column {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .flex-left {
    width: 70%;
  }

  .flex-right {
    width: 30%;
  }

  .pdf-image {
    width: 100%;
  }
</style>
