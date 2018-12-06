<template>
  <div>
    <div>
      <el-tabs v-model="sampleId" @tab-click="handleClick">
        <el-tab-pane v-for="item in activeNames" :key="item.id" :label="item.name" :name="item.id"></el-tab-pane>
      </el-tabs>
      <div class="hy-admin__search-main cf">
        <div class="fr margin-r-5">
          <el-button type="primary" @click="add" >上传</el-button>
        </div>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark">
        <el-table-column label="文件名" prop="fileName"></el-table-column>
        <el-table-column label="类型" prop="fileType"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.gmtCreate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
        </el-table-column>
        <el-table-column label="是否共享" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isDisplay" @change="IsShare(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="preview(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
            <el-button @click="delDocument(scope.row)" type="text" size="small">删除</el-button>
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
    <add-dialog ref="addDialog" @uploadSuccess="getAllFileByGroupId"></add-dialog>
    <dialog-preview ref="refPreview"></dialog-preview>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  import { eventHub } from '../../../../../src/module/eventHub'
  export default {
    created () {
      eventHub.$on('documentTypeChange', () => {
        this.initDocType()
      })
    },
    components: {
      'add-dialog': require('./dialog-upload-document.vue'),
      'dialog-preview': require('./dialog-document-preview.vue')
    },
    data () {
      return {
        user: {},
        page: {current: 1, size: 10, total: 0},
        tableData: [],
        activeNames: [],
        sampleId: '',
        currentName: [],
        downloadHref: '',
        fileData: {}
      }
    },
    mounted () {
      this.user = storage.getUser()
      this.initDocType()
    },
    methods: {
      IsShare (data) {
        console.log(data)
        let params = {
          queryLabFileCo: {
            isDisplay: data.isDisplay ? 'Y' : 'N'
          },
          id: data.id
        }
        api.physicalLaboratory.labFileController.changeDisplayLabFileDo(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.getAllFileByGroupId()
            eventHub.$emit('documentModified')
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {})
      },
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
      add () {
        this.$refs.addDialog.show({title: '增加', groupId: this.sampleId})
      },
      delDocument (data) {
        this.$confirm('是否删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            id: data.id,
            modifier: this.user.userId
          }
          api.physicalLaboratory.labFileController.delLabFile(param).then((response) => {
            let data = response.data
            if (data.success) {
              this.$message({type: 'success', message: '删除成功'})
              this.getAllFileByGroupId()
              eventHub.$emit('documentModified')
            }
          }).catch(e => {
            console.log(e)
          })
        })
      },
      initDocType () {
        let params = {queryLabDataGroupDicCo: {type: 'LAB_FILE'}}
        api.physicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.activeNames = data.data.data
            this.sampleId = data.data.data[0].id
            this.getAllFileByGroupId()
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
          this.getAllFileByGroupId()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getAllFileByGroupId()
      },
      getAllFileByGroupId () {
        let param = {
          page: {
            current: this.page.current,
            length: this.page.size
          },
          queryLabFileCo: {
            name: '',
            groupId: this.sampleId
          }}
        api.physicalLaboratory.labFileController.getAllLabFileDos(param).then((response) => {
          let data = response.data
          if (data.success && data.data && data.data.data) {
            this.tableData = data.data.data
            this.tableData.map((item) => { item.isDisplay = Object.is(item.isDisplay, 'Y') })
            this.page.total = data.data.count
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      handleClick (tab, event) {
        this.sampleId = tab.name
        this.getAllFileByGroupId(tab.name)
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
