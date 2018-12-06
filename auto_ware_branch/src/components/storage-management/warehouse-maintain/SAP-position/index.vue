<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <el-button type="primary" class="fr" size="big" @click="addbtn">新增</el-button>
      </div>
      <el-table :data="tableData" border>
        <el-table-column label="集团" prop="mandt"></el-table-column>
        <el-table-column label="工厂" prop="werks"></el-table-column>
        <el-table-column label="SAP仓库点标识" prop="lgort"></el-table-column>
        <el-table-column label="SAP仓库点名称" prop="lgobe"></el-table-column>
        <el-table-column label="销售类型">
          <template slot-scope="scope">{{scope.row.shipmentType | typetran}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="updateshow(scope.row)">修改</el-button>
            <el-button type="text" @click="delebtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <jk-dialog title="增加" :visible.sync="show">
      <el-form :model="addinfo" :rules="rule" label-width="100px" size="medium" ref="ruleForm">
        <el-form-item label="集团" prop="mandt">
          <el-input v-model="addinfo.mandt"></el-input>
        </el-form-item>
        <el-form-item label="工厂" prop="werks">
          <el-input v-model="addinfo.werks"></el-input>
        </el-form-item>
        <el-form-item label="SAP仓库点标识" prop="lgort">
          <el-input v-model="addinfo.lgort"></el-input>
        </el-form-item>
        <el-form-item label="销售类型" prop="shipmentType" >
          <el-select v-model="addinfo.shipmentType">
            <el-option v-for="item in shipmentType" :key="item.value" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SAP仓库点名称" prop="lgobe">
          <el-input v-model="addinfo.lgobe"></el-input>
        </el-form-item>
        <el-button class="fr" @click="sure" type="primary">确定</el-button>
      </el-form>
    </jk-dialog>
    <jk-dialog title="修改" :visible.sync="update">
      <el-form :model="updateinfo" :rules="rule" label-width="100px" class="form" size="medium">
        <el-form-item label="集团" prop="mandt">
          <el-input v-model="updateinfo.mandt"></el-input>
        </el-form-item>
        <el-form-item label="工厂" prop="werks">
          <el-input v-model="updateinfo.werks"></el-input>
        </el-form-item>
        <el-form-item label="SAP仓库点标识" prop="lgort">
          <el-input v-model="updateinfo.lgort"></el-input>
        </el-form-item>
        <el-form-item label="销售类型" prop="shipmentType">
          <el-select v-model="updateinfo.shipmentType">
            <el-option v-for="item in shipmentType" :key="item.value" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SAP仓库点名称" prop="lgobe">
          <el-input v-model="updateinfo.lgobe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="fr" @click="updatebtn" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </jk-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'

  export default {
    components: {
      'jk-dialog': require('src/components/common/dialog-side')
    },
    mounted () {
      this.getData()
    },
    data () {
      return {
        shipmentType: [
          {
            name: '内销', value: 'INNER_SALE'
          },
          {
            name: '外贸', value: 'OUT_SALE'
          }
        ],
        deleteVisible: false,
        update: false,
        show: false,
        search: {
          loading: false
        },
        delete: {
          id: ''
        },
        updateinfo: {},
        addinfo: {
          mandt: '',
          werks: '',
          lgort: null,
          lgobe: null,
          shipmentType: '内销'
        },
        rule: {
          mandt: [
            {required: true, message: '请输入集团', trigger: 'blur'}
          ],
          werks: [
            {required: true, message: '请输入工厂', trigger: 'blur'}
          ],
          lgort: [
            {required: true, message: '请输入SAP仓库点标识', trigger: 'blur'}
          ],
          lgobe: [
            {required: true, message: '请输入SAP仓库点名称', trigger: 'blur'}
          ],
          shipmentType: [
            {required: true, message: '请输入销售类型', trigger: 'blur change'}
          ]
        },
        loading: { batchNo: false, table: false },
        pages: { currentPage: 1, sizes: [15, 30, 50, 100], size: 15, total: 0 },
        tableData: []
      }
    },
    filters: {
      typetran: function (val) {
        if (val === 'INNER_SALE') {
          return '内销'
        } else {
          return '外贸'
        }
      }
    },
    methods: {
      addbtn () {
        this.$refs.ruleForm.resetFields()
        this.show = true
      },
      updateshow (row) {
        this.updateinfo = row
        this.updateinfo.shipmentType = row.shipmentType === 'INNER_SALE' ? '内销' : '外贸'
        this.update = true
      },
      updatebtn () {
        let params = {
          id: this.updateinfo.id,
          mandt: this.updateinfo.mandt,
          werks: this.updateinfo.werks,
          lgort: this.updateinfo.lgort,
          lgobe: this.updateinfo.lgobe,
          shipmentType: this.updateinfo.shipmentType
        }
        api.storage.warehouseMaintain.updateLgort(params).then(response => {
        }).finally(() => {
          this.update = false
          this.$message('更新成功')
          this.getData()
        })
      },
      delebtn (row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.fndelete(row)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      fndelete (row) {
        let param = {id: row.id}
        api.storage.warehouseMaintain.deleteLgort(param).then(response => {}).finally(() => {
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      },
      sure () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let params = {
              mandt: this.addinfo.mandt,
              werks: this.addinfo.werks,
              lgort: this.addinfo.lgort,
              lgobe: this.addinfo.lgobe,
              shipmentType: this.addinfo.shipmentType === '内销' ? 'INNER_SALE' : this.addinfo.shipmentType
            }
            api.storage.warehouseMaintain.createLgort(params).then(response => {}).finally(() => {
              this.getData()
              this.show = false
            })
          }
        })
      },
      getData () {
        this.search.loading = true
        this.loading.table = true
        let param = {
        }
        api.storage.warehouseMaintain.getLgortList(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.tableData = data.data
          }
        }).finally(() => {
          this.search.loading = false
          this.loading.table = false
        })
      },
      /* 分页 */
      btnSizeChange (size) {
        this.pages.size = size
        if (this.pages.currentPage === 1) {
          this.getData()
        } else {
          this.pages.currentPage = 1
        }
      },
      btnCurrentChange (currenPage) {
        this.pages.currentPage = currenPage
        this.getData()
      }
    }
  }
</script>
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
  .el-form-item {
    margin-bottom: 20px;
  }

</style>
