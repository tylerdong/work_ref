<!--待实验/原始记录/实验-->
<template>
  <div ref="dialogMain">
    <jk-dialog :title="form.title" :visible.sync="dialogVisible" width="70%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <excel-preview :encodedFile="fileCode"></excel-preview>
        </el-form-item>
      </el-form>
    </jk-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'

  export default {
    components: {
      jkDialog: require('common/dialog-side.vue'),
      excelPreview: require('common/excel-preview.vue')
    },
    created () {
    },
    filters: {},
    data () {
      return {
        dialogVisible: false,
        rowData: {},
        fileCode: '',
        form: {},
        equipmentTypes: [],
        loading: {}
      }
    },
    props: {},
    mounted () {
    },
    computed: {},
    updated () {
    },
    methods: {
      show (data) {
        if (data.fileId) {
          this.filePreview(data.fileId)
        }
        this.dialogVisible = true
      },
      filePreview (fileId) {
        let params = {fileId: fileId}
        api.physicalLaboratory.fileManage.preView(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.fileCode = data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
        })
      }
    }
  }
</script>
<style>
</style>
<style scoped>
</style>
