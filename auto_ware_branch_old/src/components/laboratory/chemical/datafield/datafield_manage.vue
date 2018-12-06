<template>
  <div class="main">
    <div class="main-left">
      <div class="left-button">
        <el-button @click="addDic" type="primary">新增字典</el-button>
        <el-button @click="editDic(selectedDic)" type="primary">编辑字典</el-button>
      </div>
      <el-table :data="dicData" border
                v-loading="loading.dic"
                element-loading-text="拼命加载中"
                highlight-current-row
                width="30%"
                :style="leftTableStyle"
                @current-change="currentChange">
        <el-table-column prop="name" label="字典名称"></el-table-column>
      </el-table>
    </div>
    <div class="main-right">
      <div class="right-button">
        <el-button @click="addDicOption" type="primary" class="newSelection" style="margin-bottom: 12px">新增选项
        </el-button>
      </div>
      <el-table :data="dicOption" border
                v-loading="loading.dicOpc"
                element-loading-text="拼命加载中">
        <el-table-column prop="name" label="字典选项名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="delDicOpc(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-dic-dialog ref="refAddDic" @initData="initDicData"></add-dic-dialog>
    <add-dic-opction-dialog @initOpcData="initDicOpcData" ref="refAddDicOpc"></add-dic-opction-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {
      addDicDialog: require('./dialog-add-edit-Dic.vue'),
      addDicOpctionDialog: require('./dialog-add-DicOpction.vue')
    },
    created () {},
    data () {
      return {
        // 字典
        dicData: [],
        // 字典选项
        dicOption: [],
        loading: {
          dic: false,
          dicOpc: false
        },
        selectedDic: {},
        user: {},
        leftTableStyle: {
          'overflow-y': 'auto',
          'height': `${document.body.clientHeight * 0.70}px`
        }
      }
    },
    props: {},
    mounted () {
      this.user = storage.getUser()
      this.initDicData()
    },
    computed: {},
    methods: {
      // 加载字典数据
      initDicData () {
        this.loading.dic = true
        api.chemicalLaboratory.labSelectStaticMap.getAllParentDos().then((response) => {
          let data = response.data
          if (data.success) {
            this.dicData = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.dic = false
        })
      },
      // 加载字典的选项数据
      initDicOpcData () {
        this.loading.dicOpc = true
        api.chemicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: this.selectedDic.id}).then((response) => {
          let data = response.data
          if (data.success) {
            this.dicOption = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.dicOpc = false
        })
      },
      // 新增字典弹出框
      addDic () {
        this.$refs.refAddDic.show()
      },
      // 删除字典
      editDic (data) {
        if (data.id) {
          this.$refs.refAddDic.show(data)
        } else {
          this.$message.error('请选中要删除的字典')
        }
      },
      // 新增字典选项
      addDicOption () {
        if (this.selectedDic.id) {
          this.$refs.refAddDicOpc.show(this.selectedDic.id)
        } else {
          this.$message.error('请选中字典')
        }
      },
      // 选中某一字典
      currentChange (val) {
        this.selectedDic = val
        this.initDicOpcData()
      },
      // 删除选项
      delDicOpc (id) {
        let param = {
          id: id,
          modifier: this.user.userId
        }
        api.chemicalLaboratory.labSelectStaticMap.deleteLabSelectStaticMapDo(param).then((response) => {
          let data = response.data
          if (data.success) {
            this.initDicOpcData()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.dicOpc = false
          this.loading.dic = false
        })
      }
    }
  }
</script>
<style scoped>
  .main {
  }

  .main-left {
    width: 25%;
    float: left;
    margin: 10px;
  }

  .main-right {
    width: 70%;
    float: right;
    margin: 10px;
  }

  .left-button, .right-button {
    margin-bottom: 12px;
    text-align: center;
  }

  .newSelection {
    float: right;
    margin-right: 20px;
  }
</style>
