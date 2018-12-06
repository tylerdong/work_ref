<template>
  <el-dialog :visible.sync="showPreivew" width="80%">
  <div>
    <h3>{{fileName}}</h3>
    <iframe v-if="fileType === 'word'" style="width: 100%; height: 50rem"  frameborder=0 name="showHere" scrolling=auto :src="wordSrc"></iframe>
    <excel-preview v-if="fileType === 'excel'" ref="excelPreview" :encodedFile="excelEncodedFile"></excel-preview>
    <img v-if="fileType === 'pdf'" :src="pdfImgSrc" style="width: 100%; height: 100%;"/>
  </div>
  </el-dialog>
</template>
<style scoped>
  .page-wrapper{
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
  }
</style>
<script>
    // import pdf from 'vue-pdf'
    export default {
      components: {
        // pdf,
        excelPreview: require('common/excel-preview.vue')
        // pdfPreview: require('common/pdf.vue')
      },
      data () {
        return {
          fileType: '',
          showPreivew: false,
          fileName: '',
          pdfImgSrc: '',
          excelEncodedFile: '',
          wordSrc: ''
        }
      },
      methods: {
        closePDF () {
          this.showPreivew = false
        },
        show (data) {
          this.showPreivew = true
          this.fileName = `${data.fileName}.${data.fileType}`
          if (['xlsx', 'xls'].includes(data.fileType)) {
            this.fileType = 'excel'
            this.renderExcel(data)
          } else if (['pdf'].includes(data.fileType)) {
            this.fileType = 'pdf'
            this.renderPDF(data)
          } else if (['doc', 'docx'].includes(data.fileType)) {
            this.fileType = 'word'
            this.renderWrod(data)
          }
        },
        renderExcel (data) {
          this.$nextTick(() => {
          // this.excelEncodedFile = data.fileInfoVo.strEncoder
            this.$refs.excelPreview.show(data.fileInfoVo.strEncoder)
          })
        },
        renderPDF (data) {
          this.pdfImgSrc = `data:image/jpeg;base64,${data.fileInfoVo.pdfImg}`
        },
        renderWrod (data) {
          this.wordSrc = window.global.physicalAjaxBaseUrl + 'api/lab/report/labFileController/getLabFileIsWord?id=' + data.id
        }
      }
    }
</script>
