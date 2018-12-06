<!--实验查询/报告单/弹出报告单-->
<template>
  <div ref="dialogMain">
    <jk-dialog :title="form.title" :visible.sync="dialogVisible" @closeSideDialog="returnBack" width="70%">
      <!--操作-->
      <template v-for="(n, index) in originalPendingExperimentIdList">
      <div class="div-flex-column" :key="n">
        <div class="flex-left">
          <img :src="form.fileData[index]" class="pdf-image">
        </div>
        <div class="flex-right">
          <div class="fr">
            <a class="el-button el-button--primary" :href="form.fileHref[index]">下载</a>
            <el-button @click="returnBack" type="primary">返回</el-button>
          </div>
          <el-table :data="tableData.length > 0 ? tableData[index] : tableData" border v-loading="loading" element-loading-text="拼命加载中">
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
      </template>
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
        tableData: [],
        form: {
          title: '实验',
          fileId: [],
          fileData: [],
          fileHref: []
        },
        originalPendingExperimentId: '',
        originalPendingExperimentIdList: [],
        loading: false,
        isShowPDF: false,
        tableId: ''
      }
    },
    props: {},
    mounted () {
    },
    computed: {},
    updated () {},
    methods: {
      showSelect (list) {
        this.dialogVisible = true
        let fileIdList = []
        list.forEach(item => {
          fileIdList.push(item.fileId)
          this.originalPendingExperimentIdList.push(item.originalPendingExperimentId)
          this.form.fileHref.push(`${window.global.chemicalAjaxBaseUrl}api/file/download?fileId=${item.fileId}`)
          this.getFile(item.fileId)
          this.getOperRecord(item.originalPendingExperimentId)
        })
      },
      getFile (fileId) {
        api.chemicalLaboratory.fileManage.downloadFdfToJpg({fileId}).then(response => {
          const data = response.data
          if (data.success === true) {
            this.form.fileData.push(`data:image/jpeg;base64,${data.data.pdfImg}`)
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getOperRecord (id) {
        this.loading = true
        api.chemicalLaboratory.labOperationLog.getLabOperationLogDos({
          bizId: id,
          bizType: 'LAB_ORIGINAL_RECORD'
        }).then(response => {
          const data = response.data
          if (data.success === true) {
            this.tableData.push(data.data)
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
      },
      returnBack () {
        this.dialogVisible = false
        this.isShowPDF = false
        this.form = {
          title: '实验',
          fileId: [],
          fileData: [],
          fileHref: []
        }
        this.originalPendingExperimentIdList = []
        this.tableData = []
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
  .fr {
    padding: 30px;
  }

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
    padding-top: 60px;
  }

  .pdf-image {
    width: 100%;
  }
</style>
