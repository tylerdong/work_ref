<template>

  <div>
    <el-tabs v-model="sampleId" @tab-click="handleClick">
      <el-tab-pane v-for="item in activeNames" :key="item.id" :label="item.name" :name="item.id"></el-tab-pane>
    </el-tabs>
    <div class="main">
      <div class="main-sub">
        <div class="sub-button-group">
          <el-button @click="addBatch" type="primary" size="small">新增批号</el-button>
          <el-button @click="editBatch" type="primary" size="small">编辑批号</el-button>
          <el-button @click="deleteBatch" type="primary" size="small">删除批号</el-button>
        </div>
        <el-table :data="batchDatas" highlight-current-row :loading="loading.batch"
                  @current-change="handleCurrentChange" height="500">
          <el-table-column label="批号" width="220">
            <template slot-scope="scope">
              <el-tooltip placement="right" effect="dark">
                <div slot="content">创建时间为 ： {{scope.row.gmtCreate | timeFormat('YYYY-MM-DD HH:mm')}}</div>
                <div>{{scope.row.batchNumber}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main-sub" style="overflow-x: scroll;">
        <div class="sub-button-group">
          <el-button @click="addCentralValue" type="primary" size="small">新增中心值</el-button>
        </div>
        <el-table :data="centralValueData" :loading="loading.centralValue" style="min-width: 100%">
          <el-table-column prop="attributeName" label="名称"></el-table-column>
          <el-table-column prop="attributeValue" label="字典值"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editCentralValue(scope.row)" size="small" type="text">修改</el-button>
              <el-button @click="delCentralValue(scope.row)" size="small" type="text">删除</el-button>
              <el-button @click="showCentralValueRecord(scope.row)" size="small" type="text">操作记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <add-dialog ref="refAddBatch" @initData="initSampleBatchs"></add-dialog>
    <add-batch-opction-dialog ref="refAddCentralOpc" @initData="initCentralValues"></add-batch-opction-dialog>
    <central-value-record ref="centralValueRecord"></central-value-record>
  </div>

</template>
<script>
  import * as api from 'src/api/index'
  import storage from 'storage'

  export default {
    components: {
      addDialog: require('./dialog-add-batch.vue'),
      addBatchOpctionDialog: require('./dialog-add-cnetral-value.vue'),
      centralValueRecord: require('./dialog-central-value-record')
    },
    created () {
    },
    data () {
      return {
        // 批号
        FDYData: [],
        // 所有tab名称
        activeNames: [],
        // 当前tab的编号
        sampleId: '',
        // 批号数据
        batchDatas: [],
        // 当前选中的批号
        currBatch: {},
        // 当前批号的字典值
        centralValueData: [],
        loading: {
          sample: false,
          batch: false
        },
        selectedDic: {},
        user: {}
      }
    },
    props: {},
    mounted () {
      this.user = storage.getUser()
      this.initSampleData()
    },
    computed: {},
    methods: {
      // 点击样品tab
      handleClick (tab, event) {
        this.sampleId = tab.name
        this.initSampleBatchs(tab.name)
      },
      // 加载样品数据
      initSampleData () {
        this.loading.sample = true
        let params = {page: {current: 1, length: 10000}}
        api.physicalLaboratory.labSampleManagement.getLabSampleManagementDoList(params).then((response) => {
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
          this.loading.sample = false
        })
      },
      // 加载样品批号
      initSampleBatchs (sampleId) {
        this.loading.batch = true
        api.physicalLaboratory.labCentralValueDictionaryController.getLabCentralValueDictionaryList(sampleId).then((response) => {
          let data = response.data
          if (data.success) {
            this.batchDatas = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.batch = false
        })
      },
      // 加载批号中心值
      initCentralValues (dictionaryId) {
        this.loading.centralValue = true
        api.physicalLaboratory.labCentralValueDictionaryController.getLabCentralValueDictionaryLineList(dictionaryId).then((response) => {
          let data = response.data
          if (data.success) {
            this.centralValueData = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.centralValue = false
        })
      },
      // 新批号弹出框
      addBatch () {
        this.$refs.refAddBatch.show({sampleId: this.sampleId, id: '', batchNumber: ''})
      },
      // 选中当前行
      handleCurrentChange (currRow) {
        this.currBatch = currRow
        this.initCentralValues(currRow.id)
      },
      // 编辑批号
      editBatch () {
        if (this.currBatch && this.currBatch.id) {
          this.$refs.refAddBatch.show({
            sampleId: this.currBatch.sampleId,
            id: this.currBatch.id,
            batchNumber: this.currBatch.batchNumber
          })
        } else {
          this.$message.error('请选中要编辑的批号')
        }
      },
      // 新增样品中心值
      addCentralValue () {
        if (this.currBatch && this.currBatch.id) {
          this.$refs.refAddCentralOpc.show({dictionaryId: this.currBatch.id, action: 'add'})
        } else {
          this.$message.error('请选中要添加的批号')
        }
      },
      // 删除样品中心值
      delCentralValue (row) {
        this.$confirm(`是否删除？`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              let params = {
                id: row.id,
                modifier: this.user.userId
              }
              api.physicalLaboratory.labCentralValueDictionaryController.deleteLabCentralValueDictionaryLine(params).then(response => {
                const data = response.data
                if (data.success) {
                  this.initCentralValues(row.dictionaryId)
                  done()
                }
              }).finally(() => {
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).catch(() => {
        })
      },
      showCentralValueRecord (data) {
        console.log(data)
        this.$refs.centralValueRecord.show({dictionaryId: this.currBatch.id, attributeName: data.attributeName})
      },
      editCentralValue (data) {
        if (this.currBatch && this.currBatch.id) {
          this.$refs.refAddCentralOpc.show({dictionaryId: this.currBatch.id, action: 'edit', ...data})
        } else {
          this.$message.error('请选中要添加的批号')
        }
      },
      // 删除批号
      deleteBatch () {
        if (this.currBatch && this.currBatch.id) {
          this.$confirm(`是否删除？`, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                let params = { id: this.currBatch.id, modifier: this.user.userId }
                api.physicalLaboratory.labCentralValueDictionaryController.deleteLabCentralValueDictionary(params).then((response) => {
                  let data = response.data
                  if (data.success) {
                    this.initSampleBatchs(this.sampleId)
                    this.centralValueData = []
                  } else {
                    this.$message.error(data.errorMsg)
                  }
                }).catch((e) => {
                  console.log(e)
                }).finally(() => {
                  done()
                })
              } else {
                done()
              }
            }
          }).catch(() => {
          })
        } else {
          this.$message.error('请选中要删除的批号')
        }
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
