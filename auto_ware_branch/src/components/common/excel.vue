<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane v-for="(item, index) in options.sheetName" :label="item" :name="index + ''" :key="index"></el-tab-pane>
    </el-tabs>
    <div class="excel-wrapper" v-html="tableHtml"></div>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    data () {
      return {
        wb: '',
        activeName: '',
        tableHtml: '',
        options: {
          sheetName: []
        }
      }
    },
    mounted () {},
    methods: {
      render (wb) {
        this.wb = wb
        this.options.sheetName = this.wb.SheetNames
        this.activeName = '0'
        this.generateHtml()
      },
      tabClick (activeTab) {
        this.activeName = activeTab.name
        this.generateHtml()
      },
      generateHtml () {
        let sheetName = this.options.sheetName[this.activeName]
        this.tableHtml = XLSX.utils.sheet_to_html(this.wb.Sheets[sheetName])
      }
    }
  }
</script>
<style>
  .excel-wrapper table, .excel-wrapper  tr, .excel-wrapper  td {
    border: 1px solid black;
  }
  .excel-wrapper table {
    border-collapse: collapse;
    width: 100%;
    color: black;
    font-size: 15px;
  }
  .excel-wrapper tr {
    height: 30px;
  }
  .excel-wrapper td {
    padding: 0 10px;
  }
</style>
