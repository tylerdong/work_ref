<template>
  <div>
    <div>
      <el-tabs v-model="sampleId" @tab-click="handleClick">
        <el-tab-pane v-for="item in activeNames" :key="item.id" :label="item.name" :name="item.id"></el-tab-pane>
      </el-tabs>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" >
        <el-table-column label="文件名" prop="fileName">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.gmtCreate | timeFormat('YYYY-MM-DD')}}</template>
        </el-table-column>
        <el-table-column label="类型" prop="fileType">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="preview(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper cf">
        <el-pagination
          class="fr"
          :current-page="page.current"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
        </el-pagination>
      </div>
    </div>
    <a :href="downloadHref" ref="refDownload"></a>
    <dialog-preview ref="refPreview" :fileData="fileData"></dialog-preview>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import { eventHub } from '../../../../../src/module/eventHub'
  export default {
    created () {
      eventHub.$on('documentTypeChange', () => {
        this.inittype()
      })
      eventHub.$on('documentModified', () => {
        this.inittype()
      })
    },
    components: {
      'dialog-preview': require('./dialog-document-preview.vue')
    },
    data () {
      return {
        downloadHref: '',
        fileData: {},
        page: {current: 1, size: 10, total: 0},
        tableData: [],
        activeNames: [],
        sampleId: '',
        currentName: []
      }
    },
    mounted () {
      this.inittype()
    },
    methods: {
      preview (data) {
        // word格式
        if (['doc', 'docx'].includes(data.fileType)) {
          this.$refs.refPreview.show({id: data.id, fileType: data.fileType, fileName: data.fileName})
        }
        if (['xls', 'xlsx', 'pdf'].includes(data.fileType)) {
          if (data.fileType === 'xlsx') {
            this.$message.error('不支持预览，请下载文件')
            return
          }
          let param = {id: data.id}
          api.physicalLaboratory.labFileController.getLabFile(param).then((response) => {
            this.$refs.refPreview.show(response.data.data)
          }).catch(e => {
            console.log(e)
          }).finally(() => {})
        }
      },
      downLoad (data) {
        this.downloadHref = window.global.physicalAjaxBaseUrl + 'api/lab/report/labFileController/downloadLabFile?id=' + data.id
        this.$nextTick(() => {
          this.$refs.refDownload.click()
        })
      },
      inittype () {
        let params = {
          queryLabDataGroupDicCo: {
            type: 'LAB_FILE'
          }
        }
        api.physicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.activeNames = data.data.data.map(item => {
              return {name: item.name, id: item.id}
            })
            this.sampleId = data.data.data[0].id
            this.initSampleBatchs(data.data.data[0].id)
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.initSampleBatchs()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.initSampleBatchs()
      },
      initSampleBatchs (samplaeId) {
        let param = {
          page: {
            current: this.page.current,
            length: this.page.size
          },
          queryLabFileCo: {
            name: '',
            groupId: samplaeId
          }
        }
        api.physicalLaboratory.labFileController.getDisplayLabFileDos(param).then((response) => {
          let data = response.data
          if (data.success && data.data && data.data.data) {
            this.tableData = data.data.data
            this.page.total = data.data.count
          } else {
            // this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      handleClick (tab, event) {
        this.initSampleBatchs(tab.name)
      }
    }
  }
</script>
<style scoped>
  .main {
    display: flex;
    flex-direction: row;
    background-color: white;
    padding: 10px;
  }

  .main-sub {
    display: flex;
    flex-direction: column;
  }

  .main-sub:first-child {
    margin-right: 10px;
    flex-grow: 3;
  }

  .main-sub:last-child {
    flex-grow: 5;
  }

  .sub-button-group {
    margin-bottom: 10px;
  }

  .sub-button-group:nth-last-child(1) {
    align-self: flex-end;
  }
</style>
