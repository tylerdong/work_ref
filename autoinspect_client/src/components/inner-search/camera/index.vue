<template>
  <div>
    <el-form :inline="true" label-position="left" class="div-form-container" label-width="100px">
      <el-form-item>
        <el-button type="primary" @click="btnDefect">缺陷类型</el-button>
        <el-button type="primary" @click="btnSaveMap" :loading="loading.save">保存设置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border :loading="loading.table">
      <el-table-column label="缺陷类型" prop="defecttype" width="150px"></el-table-column>
      <el-table-column label="相机编号" prop="cameraNum">
        <template slot-scope="scope">
          <span v-if="scope.row.cameraNum" v-for="item in scope.row.cameraNum.split(',')" :key="item">
            {{producttype === 'DTY' ? item : ++item}}号；
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" class="inner-button" @click="btnSetting(scope.$index)">相机配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-defect ref="refDialogDefect" @saveDefect="temporarySave"></dialog-defect>
    <dialog-camera ref="refDialogCamera" @saveCamera="temporarySave"></dialog-camera>
  </div>
</template>
<script>
import * as api from '../../../api/index'
import {mapGetters} from 'vuex'
export default {
  components: {
    'dialog-defect': require('./dialog-defect').default,
    'dialog-camera': require('./dialog-camera').default
  },
  data () {
    return {
      tableData: [],
      defects: [],
      cameras: [],
      loading: { table: false, save: false }
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapGetters(['producttype'])
  },
  methods: {
    getData () {
      this.loading.table = true
      api.innerDefect.getDefectCameraMap({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.tableData = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.table = false
      })
    },
    temporarySave (data) {
      this.tableData = data
      this.loading.table = true
    },
    btnSetting (index) {
      this.$refs.refDialogCamera.show(this.tableData, index)
    },
    btnDefect () {
      this.$refs.refDialogDefect.show(this.tableData)
    },
    btnSaveMap () {
      this.loading.save = false
      api.innerDefect.saveDefectCameraMap(this.tableData).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.$message({type: 'success', message: response.data.meta.message, showClose: true})
          this.getData()
        } else {
          this.$message({type: 'error', message: response.data.meta.message, showClose: true})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.save = false
      })
    }
  }
}
</script>

<style scoped>

</style>
