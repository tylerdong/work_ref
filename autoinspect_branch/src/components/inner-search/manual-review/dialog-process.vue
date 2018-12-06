<template>
  <el-dialog :visible.sync="dialog.visible" width="95%" height="95%" center @closed="dialogClosed"
             :close-on-press-escape="false" element-loading-text="拼命加载中" :loading="loading.table"
             custom-class="dialog-review" :lock-scroll="true" top="3vh" element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.3)">
    <div v-for="(row, index) in formDatas" :key="index" class="container" :class="{'active-container': row.active}" @click="crrentSelected(index)">
      <h3 class="title-h">人工复检 沙盘号:<span class="red-color">{{`${row.rfid}`}}</span>
        <svg v-if="row.silkCode" ref="barCode" class="barcode"></svg>
        批号:{{row.batch}}
      </h3>
      <div class="dialog-div">
        <table class="customized-table inner-table">
          <tr>
            <th>线别</th>
            <th>沙盘号</th>
            <th>缺陷号</th>
            <template v-if="row.silkCode">
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
            <td>{{row.lineCode}}</td>
            <td>{{row.rfid}}</td>
            <td>{{row.defectNum}}</td>
            <template v-if="row.silkCode">
              <td>{{row.lineName}}</td>
              <td>{{row.item}}</td>
              <td>{{row.fallNo}}</td>
              <td>{{row.spindleNo}}</td>
            </template>
            <td>{{row.samplingTime}}</td>
            <td>{{row.defectDescribe}}</td>
            <td>{{row.isgood | isgoodStatus}}</td>
          </tr>
        </table>
        <PPreview :pictureList="row.imageData" :width="200"
                  :height="200" :borderRadius="5"
                  :keyboardControl="true" class="picturl-list"></PPreview>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button circle icon="el-icon-arrow-left" @click="prevOrLastRowClick('last')" class="medium-icon"></el-button>
        <template v-if="selected.updatable === '1'">
          <el-button v-if="['AAA'].includes(selected.grade)"
                     :type="selected.defectGrade === 'AA' ? 'success' : ''"
                     @click="btnConfirm('AA', selected)" :loading="loading.AA">AA</el-button>

          <el-button v-if="['AAA', 'AA'].includes(selected.grade)"
                     :type="selected.defectGrade === 'A' ? 'success' : ''"
                     @click="btnConfirm('A', selected)" :loading="loading.A">A</el-button>

          <el-button v-if="['AAA', 'AA', 'A'].includes(selected.grade)"
                     :type="selected.defectGrade === 'B' ? 'success' : ''"
                     @click="btnConfirm('B', selected)" :loading="loading.B">B</el-button>

          <el-button @click="btnConfirm('C', selected)" :type="selected.defectGrade === 'C' ? 'success' : ''"
                     :loading="loading.C">C</el-button>

          <el-button @click="btnConfirm('', selected)">误检</el-button>
        </template>
        <el-button circle icon="el-icon-arrow-right" @click="prevOrLastRowClick('next')" size="medium"
                   class="medium-icon"></el-button>
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
      dialog: { visible: false, title: '' },
      formDatas: [],
      selected: {},
      loading: { AAA: false, AA: false, A: false, B: false, C: false, falseDetection: false, table: false }
    }
  },
  computed: {},
  mounted () {
    this.setHotKey()
  },
  beforeDestroy () {
    document.onkeydown = undefined
  },
  methods: {
    setHotKey () {
      document.onkeydown = (e) => {
        if (this.$router.currentRoute.name === 'inner-search-manual-review') {
          console.log(e)
          // ArrowLeft
          if (e.keyCode === 37) {
            this.prevOrLastRowClick('last')
          }
          // ArrowRight
          if (e.keyCode === 39) {
            this.prevOrLastRowClick('next')
          }
          // ArrowDown
          if (e.keyCode === 40) {
            let index = this.formDatas.findIndex(item => item.active)
            index = index >= (this.formDatas.length - 1) ? (this.formDatas.length - 1) : ++index
            this.formDatas.forEach((item, i) => { this.$set(item, 'active', i === index) })
            this.selected = this.formDatas[index]
          }
          // ArrowUp
          if (e.keyCode === 38) {
            let index = this.formDatas.findIndex(item => item.active)
            index = index <= 0 ? 0 : --index
            this.formDatas.forEach((item, i) => { this.$set(item, 'active', i === index) })
            this.selected = this.formDatas[index]
          }
          if (e.keyCode === 27) {
            return null
          }
        }
      }
    },
    crrentSelected (index) {
      this.formDatas.forEach((item, i) => { this.$set(item, 'active', i === index) })
    },
    show (data) {
      this.formDatas = data
      this.formDatas.forEach((item, index) => {
        this.$set(item, 'active', index === 0)
        this.loadingData(item)
      })
      this.selected = this.formDatas[0]
      this.dialog.visible = true
    },
    loadingData (rowData) {
      this.showBarCode(rowData)
      this.loading.table = true
      let imageData = []
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
                  imageData.push(`data:image/jpg;base64,${response[i].data}`)
                } else {
                  this.$message({type: 'error', message: response[i].data.meta.message, showClose: true})
                }
              }
              this.$set(rowData, 'imageData', imageData)
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
    btnConfirm (grade, row) {
      if (grade) {
        this.loading[`${grade}`] = true
      } else {
        this.loading.falseDetection = true
      }
      let param = {
        defectNum: row.defectNum,
        isgood: grade ? '2' : '1',
        actualGrade: grade !== '' ? grade : row.grade
      }
      axios.post(`${this.currentLine(row.lineCode).ip}controller/defectInfo/updateDefect`, param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.$message({type: 'success', message: data.meta.message, showClose: true})
          this.prevOrLastRowClick('next')
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
    },
    prevOrLastRowClick (order) {
      let param = {
        defectId: this.selected.defectNum,
        sign: order
      }
      axios.post(`${this.currentLine(this.selected.lineCode).ip}controller/defectInfo/getLastOrNextDefect`, param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          if (data.data !== '') {
            let index = this.formDatas.findIndex(item => item.active)
            this.formDatas[index] = data.data
            this.$set(this.formDatas[index], 'active', true)
            this.selected = this.formDatas[index]
            this.loadingData(this.formDatas[index])
          } else {
            this.$message({type: 'error', message: order === 'last' ? '没有上一条数据' : '没有下一条数据', showClose: true})
          }
        } else {
          this.$message({type: 'error', message: response.data.meta.message, showClose: true})
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./../../../assets/css/variables";
  .medium-icon {
    width:60px;
    height: 60px;
  }
  .medium-icon i:before {
    width: 40px!important;
    height: 40px!important;
  }
  .dialog-div {
    height: auto;
    width: 100%;
    display: inline-block;
  }
  .title-h {
    text-align: center;
    margin-bottom: 10px;
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
    margin-bottom: 0px;
  }
  .container {
    border: 1px solid #ffffff;
    position: relative;
    padding: 0 3px;
  }
  .active-container {
    border: 1px solid #ff8711;
    position: relative;
    padding: 0 3px;
  }
  .active-container:before {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    border: 10px solid #ff8711;
    border-top-color: transparent;
    border-left-color: transparent;
    color: #fff;
  }
  .active-container:after {
    content: '';
    display: block;
    width: 3px;
    height: 6px;
    position: absolute;
    right: 2px;
    bottom: 3px;
    border: 2px solid #fff;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: rotate(45deg);
  }
</style>
