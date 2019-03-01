<template>
  <div>
    <div><Button type="primary">手动维护</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button type="warning">Excel模板下载</Button></div>
    <!--<ModelForm ></ModelForm>-->
    <tables ref="tables" editable searchable search-place="top" v-model="tableData"  :columns="columns" @on-delete="handleDelete"/>
  </div>
</template>
<script>
// 数据录入
import Tables from '_c/tables/tables.vue'
// import ModelForm from '_c/model/model.vue'
import { getDicData } from '@/api/data'
import excel from '@/libs/excel'
export default {
  name: 'dict-manager-audit',
  components: {
    Tables,
    ModelForm
  },
  data () {
    return {
      searchParams: {
        dateRange: ['2016-01-01', '2016-02-15']
      },
      columns: [
        {title: '序号', key: 'serial', sortable: true},
        {title: '字段名', key: 'name'},
        {title: '类目名称', key: 'category'},
        {title: '别名备注', key: 'alias'},
        {title: '添加类型', key: 'addType'},
        {title: '来源渠道备注', key: 'source'},
        {title: '创建人', key: 'creator'},
        {title: '添加时间', key: 'createtime'},
        {title: '备注', key: 'note'},
        {title: '操作', key: 'operator'}
      ],
      tableData: [],
      // excel相关
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableTitle: [],
      tableLoading: false
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    // 上传xls
    initUpload () {
      this.file = null
      this.showProgress = false
      this.loadingProgress = 0
      this.tableTitle = []
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleRemove () {
      this.initUpload()
      this.$Message.info('上传的文件已删除！')
    },
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
        this.tableLoading = true
        this.showProgress = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round(e.loaded / e.total * 100)
      }
      reader.onerror = e => {
        this.$Message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$Message.info('文件读取成功')
        const data = e.target.result
        const { header, results } = excel.read(data, 'array')
        const tableTitle = header.map(item => { return { title: item, key: item } })
        this.tableData = results
        this.tableTitle = tableTitle
        this.uploadLoading = false
        this.tableLoading = false
        this.showRemoveFile = true
      }
    }
  },
  mounted () {
    getDicData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>
<style lang="less" scoped>
.search-bar {
  margin-bottom: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>
