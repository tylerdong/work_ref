<template>
  <el-dialog :visible.sync="dialog.visible" width="95%" height="95%" center @closed="dialogClosed"
             :close-on-press-escape="false" element-loading-text="拼命加载中" :loading="loading.table"
             custom-class="dialog-review" :lock-scroll="true" top="3vh" element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.3)">
    <h3 slot="title" class="title-h">人工复检 沙盘号:<span class="red-color">{{`${formData.rfid}`}}</span>
      <svg v-if="formData.silkCode" ref="barCode" class="barcode"></svg>
      批号:{{formData.batch}}
    </h3>
    <div class="dialog-div">
      <table class="customized-table inner-table">
        <tr>
          <th>沙盘号</th>
          <th>缺陷号</th>
          <template v-if="formData.silkCode">
            <th>线别</th>
            <th>位号</th>
            <th>落次</th>
            <th>锭号</th>
          </template>
          <th>采样时间</th>
          <th>缺陷</th>
          <th>状态</th>
        </tr>
        <tr>
          <td>{{formData.rfid}}</td>
          <td>{{formData.defectNum}}</td>
          <template v-if="formData.silkCode">
            <td>{{formData.lineName}}</td>
            <td>{{formData.item}}</td>
            <td>{{formData.fallNo}}</td>
            <td>{{formData.spindleNo}}</td>
          </template>
          <td>{{formData.samplingTime}}</td>
          <td>{{formData.defectDescribe}}</td>
          <td>{{formData.isgood | isgoodStatus}}</td>
        </tr>
      </table>
      <PPreview v-if="Array.isArray(imageData) && imageData.length>0" :pictureList="imageData" :width="200"
                :height="200" :borderRadius="5"
                :keyboardControl="true" class="picturl-list"></PPreview>
    </div>
    <span slot="footer" class="dialog-footer">
      <template v-if="formData.updatable === '1'">
        <el-button v-if="['AAA'].includes(this.formData.grade)"
                   :type="this.formData.defectGrade === 'AA' ? 'success' : ''"
                   @click="btnConfirm('AA')" :loading="loading.AA">AA</el-button>

        <el-button v-if="['AAA', 'AA'].includes(this.formData.grade)"
                   :type="this.formData.defectGrade === 'A' ? 'success' : ''"
                   @click="btnConfirm('A')" :loading="loading.A">A</el-button>

        <el-button v-if="['AAA', 'AA', 'A'].includes(this.formData.grade)"
                   :type="this.formData.defectGrade === 'B' ? 'success' : ''"
                   @click="btnConfirm('B')" :loading="loading.B">B</el-button>

        <el-button @click="btnConfirm('C')" :type="this.formData.defectGrade === 'C' ? 'success' : ''"
                   :loading="loading.C">C</el-button>

        <el-button @click="btnConfirm('')">误检</el-button>
      </template>
    </span>
  </el-dialog>
</template>

<script>
import PPreview from 'vue-simple-picture-preview'
import jsBarcode from 'jsbarcode'
import axios from 'axios'

export default {
  components: {
    PPreview: PPreview
  },
  data () {
    return {
      dialog: {visible: false, title: ''},
      formData: {},
      imageData: [],
      loading: {AAA: false, AA: false, A: false, B: false, C: false, falseDetection: false, table: false}
    }
  },
  computed: {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    show (data) {
      this.formData = data
      this.dialog.visible = true
      this.loadingData(data)
    },
    loadingData (rowData) {
      this.formData = rowData
      this.showBarCode(rowData)
      this.loading.table = true
      this.imageData = []
      this.getImages(rowData.defectNum, rowData.lineCode).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          let imgLength = data.data
          if (imgLength > 0) {
            let promises = []
            Array(data.data).fill(0).forEach((value, index) => {
              promises.push(this.getImage(index, rowData.defectNum, rowData.lineCode))
            })
            Promise.all(promises).then(response => {
              for (let i = 0; i < imgLength; i++) {
                if (response[i].status === 200 && response[i].data.length > 0) {
                  this.imageData.push(`data:image/jpg;base64,${response[i].data}`)
                } else {
                  this.$message({type: 'error', message: response[i].data.meta.message, showClose: true})
                }
              }
            }).finally(() => {
              this.loading.table = false
            })
          } else {
            this.loading.table = false
          }
        } else {
          this.$message({type: 'error', message: response.data.meta.message, showClose: true})
        }
      })
    },
    getImages (defectNum, lineCode) {
      return axios.post(`${this.currentLine(lineCode).ip}controller/defectInfo/getImgByDefectId`,
        {defectId: defectNum, sign: 'sign'})
    },
    getImage (imgIndex, defectNum, lineCode) {
      return axios.post(`${this.currentLine(lineCode).ip}controller/defectInfo/getImgByDefectIdAndIndex`,
        {imgIndex: imgIndex, defectId: defectNum, sign: 'sign'})
    },
    currentLine (lineCode) {
      let line = this.plConfigs().find(item => item.linecode === lineCode)
      if (line === undefined) {
        return this.$message({type: 'error', message: `线别编码${lineCode}不存在`, showClose: true})
      } else {
        return line
      }
    },
    showBarCode (data) {
      if (data.silkCode) {
        this.$nextTick(() => {
          jsBarcode(this.$refs.barCode, data.silkCode, {height: 20, displayValue: false})
        })
      }
    },
    btnConfirm (grade) {
      if (grade) {
        this.loading[`${grade}`] = true
      } else {
        this.loading.falseDetection = true
      }
      let param = {
        defectNum: this.formData.defectNum,
        isgood: grade ? '2' : '1',
        actualGrade: grade !== '' ? grade : this.formData.grade
      }
      axios.post(`${this.currentLine(this.formData.lineCode).ip}controller/defectInfo/updateDefect`, param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.$message({type: 'success', message: data.meta.message, showClose: true})
          this.dialog.visible = false
        } else {
          this.$message({type: 'error', message: data.meta.message, showClose: true})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message, showClose: true})
      }).finally(() => {
        if (grade) {
          this.loading[`${grade}`] = false
        } else {
          this.loading.falseDetection = false
        }
      })
    },
    dialogClosed () {
      this.dialog.visible = false
      this.$emit('dialogClosed')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../../assets/css/variables";
  .medium-icon {
    width: 60px;
    height: 60px;
  }

  .medium-icon i:before {
    width: 40px !important;
    height: 40px !important;
  }

  .dialog-div {
    height: auto;
    width: 100%;
    display: inline-block;
  }

  .title-h {
    margin-bottom: 0;
    margin-top: 20px;
  }

  .barcode {
    vertical-align: middle;
    margin: 0 10px;
  }

  .red-color {
    color: red;
    font-size: larger;
  }

  .inner-table {
    margin: 0;
  }

  .picturl-list {
    overflow-x: auto;
    height: $imgListHeight;
    border: 1px solid rgb(222, 232, 243);
    margin-top: 6px;
  }
</style>
