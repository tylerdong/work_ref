<template>
  <div class="content">
    <el-form :inline="true" :model="formData" :rules="rules" ref="form">
      <el-form-item prop="workshopId">
        <select-work-shop :workshopId="formData.workshopId" @workshopIdChange="workshopIdChange"></select-work-shop>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showClick">全屏</el-button>
      </el-form-item>
    </el-form>
    <!--看板内容-->
    <div class="outer-div">
      <div class="large-screen-content" id="boardContent" ref="boardContent">
      <div class="title-box">
        <img class="logo" src="../../../../../static/img/logo.png" alt="">
        <div class="title-name">
          <span>FACEVISA化纤智能制造指挥中心</span>
        </div>
        <div class="date-box">
          <span id="currTime"></span>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="content-box margin-top-all" id="tbody">
        <!--第一列-->
        <div class="common-border-right">
          <ul>
            <!--第一列第一行-->
            <li style="margin-bottom: 0" :style="liStyle">
              <comp-bad-product ref="refBadProduct"></comp-bad-product>
            </li>
            <!--第一列第二行-->
            <li style="margin-bottom: 0" :style="liStyle">
              <comp-single-defectiverate ref="refSingleDefect"></comp-single-defectiverate>
            </li>
            <!--第一列第三行-->
            <li :style="liStyle">
              <comp-abnormal-alarm ref="refAbnormalAlalrm"></comp-abnormal-alarm>
            </li>
          </ul>
        </div>
        <!--第二列-->
        <div>
          <ul>
            <!--第二列第一行-->
            <li :style="liStyle">
              <comp-productivity ref="refProductivity"></comp-productivity>
            </li>
            <!--第二列第二行-->
            <li :style="liStyle">
              <comp-production-packaging ref="refProductionPackage"></comp-production-packaging>
            </li>
            <!--第二列第三行-->
            <li :style="liStyle">
              <comp-order ref="refOrder"></comp-order>
            </li>
          </ul>
        </div>
        <!--第三列-->
        <div class="common-border-left">
          <ul>
            <!--第三列第一行-->
            <li :style="liStyle">
              <comp-product-line ref="refProductLine"></comp-product-line>
            </li>
            <!--第三列第二行-->
            <li :style="liStyle">
              <comp-plan-product-number ref="refPlanProduct"></comp-plan-product-number>
            </li>
            <!--第三列第三行-->
            <li :style="liStyle">
              <comp-location-status ref="refLocationStatus"></comp-location-status>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    </div>
</template>
<script>
  import dateFns from 'date-fns'
  import * as api from 'src/api'
  import {boardConfig} from 'value-label'
  export default {
    components: {
      'select-work-shop': require('src/components/common/select-work-shop-list'),
      'comp-bad-product': require('./comp-bad-product'),
      'comp-single-defectiverate': require('./comp-single-defective-rate'),
      'comp-abnormal-alarm': require('./comp-abnormal-alarm'),
      'comp-productivity': require('./comp-productivity'),
      'comp-production-packaging': require('./comp-production-packaging'),
      'comp-order': require('./comp-order'),
      'comp-product-line': require('./comp-product-line'),
      'comp-plan-product-number': require('./comp-plan-product-number'),
      'comp-location-status': require('./comp-location-status')
    },
    created () {
    },
    data () {
      return {
        boardConfig: {},
        interval: {requestInterval: 6},
        formData: {workshopId: ''},
        intTime: '',
        rules: {
          workshopId: [{ required: true, message: '请选择车间', trigger: 'change blur' }]
        },
        width: window.screen.width,
        height: window.screen.height
      }
    },
    props: {},
    mounted () {
      this.boardConfig = boardConfig
      let docElm = this.$refs.boardContent
      if (docElm.requestFullscreen) {
        docElm.addEventListener('fullscreenchange', () => {
          if (!document.fullscreen) {
            clearInterval(this.intTime)
          }
        }, false)
      } else if (docElm.webkitRequestFullScreen) {
        docElm.addEventListener('webkitfullscreenchange', () => {
          if (!document.webkitIsFullScreen) {
            clearInterval(this.intTime)
          }
        }, false)
      }
    },
    computed: {
      liStyle: function () {
        return {
          width: `${this.width / 3}px`,
          padding: '1.2rem',
          boxSizing: 'border-box'
        }
      }
    },
    deactivated () {
      clearInterval(this.intTime)
    },
    methods: {
      // 设置全屏
      showClick () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let docElm = this.$refs.boardContent
            if (docElm.requestFullscreen) {
              docElm.requestFullscreen()
            } else if (docElm.webkitRequestFullScreen) {
              docElm.webkitRequestFullScreen()
            }
            if (this.formData.workshopId) {
              let params = { groupId: this.boardConfig.smartManufacturingCenter.groupId }
              api.automatic.statement.getBoardConfig(params).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  const list = data.data[0].list
                  if (Array.isArray(list) && list.length > 0) {
                    this.interval.requestInterval = parseInt(list[0].requestInterval)
                    clearInterval(this.intTime)
                    this.intTime = setInterval(this.getData, this.interval.requestInterval * 1000)
                  }
                } else {
                  this.$message({type: 'error', message: data.message})
                }
                console.log(this.interval)
              }).catch(e => {
                console.log(e)
              })
            }
          }
        })
      },
      searchClick () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.getData()
          }
        })
      },
      getData () {
        this.getCommandCentreBoard()
        // 第一列第三行报警
        this.$refs.refAbnormalAlalrm.initData(this.formData.workshopId)
        // 第二列第一行产品产量
        this.$refs.refProductivity.initData(this.formData.workshopId)
        // 第二列第三行订单
        this.$refs.refOrder.initData(this.formData.workshopId)
        // 第三列第三行
        this.$refs.refLocationStatus.initData(this.formData.workshopId)
      },
      getCommandCentreBoard () {
        if (this.formData.workshopId === '') {
          return
        }
        let param = JSON.stringify({workshopId: this.formData.workshopId})
        $.ajax({
          type: 'POST',
          url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/board/getCommandCentreBoard',
          data: param,
          contentType: 'application/json; charset=utf-8',
          success: (response) => {
            var data = JSON.parse(response)
            data = data.data
            // 第一列第一行产品缺陷
            this.$refs.refBadProduct.initChart(data)
            // 第一列第二行单线降等
            this.$refs.refSingleDefect.initChart(data)
            // 第二列第一行产品产量
            this.$refs.refProductivity.setTotalAmout(data)
            // 第二列第二行生产包装
            this.$refs.refProductionPackage.initData(data)
            // 第三列第一行
            this.$refs.refProductLine.setBatchBoard(data.batchBoardBoList)
            // 第三列第二行
            this.$refs.refPlanProduct.setPlanProduction(data)
          },
          error: function (a, b, c) {
            console.log(a, b, c)
          },
          complete: function (xhr) {
            xhr = null
          }
        })
      },
      workshopIdChange (val) {
        this.formData.workshopId = val
      },
      getTime () {
        $('#currTime').html(dateFns.format(new Date(), 'YYYY-MM-DD HH:mm:ss'))
      }
    }
  }
</script>
<style scoped lang="css" src="./largescreen.css"></style>
