<template>
  <div class="content">
    <el-form :inline="true" :model="search" ref="form" :rules="rules">
      <el-form-item prop="workshopId">
        <el-select v-model="search.workshopId" placeholder="请选择车间" clearable>
          <el-option v-for="item in options.workshop" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchClick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-show="!boardCurrent" type="primary" @click="showClick">全屏</el-button>
      </el-form-item>
    </el-form>
    <!--看板内容-->
    <div class="board-content" id="boardContent" ref="boardContent">
      <div class="title-box">
        <ul>
          <li><img class="logo" src="../../../../../static/img/logo.png" alt=""></li>
          <li><div>{{search.workshopName}}报警看板</div></li>
          <li>
            <div class="date-box">
              <span id="currTime">2017-12-07</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="content-box">
        <table border="1">
          <thead>
            <tr>
              <th style="width: 9rem">丝绽</th>
              <th style="width: 3rem">线别</th>
              <th style="width: 5rem">批号</th>
              <th style="width: 7rem">规格</th>
              <th style="width: 3rem">位号</th>
              <th style="width: 3rem">落次</th>
              <th style="width: 3rem">班次</th>
              <th style="width: 9rem">原因</th>
              <th style="width: 4rem">状态</th>
              <th style="width: 4rem">操作者</th>
              <th style="width: 4rem">处理人</th>
              <th style="width: 11rem">备注</th>
            </tr>
          </thead>
          <tbody id="tbody" ref="tbody">
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import {boardConfig} from 'value-label'
  export default {
    components: {},
    data () {
      return {
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        rules: {
          workshopId: [{ required: true, message: '请选择车间', trigger: 'change blur' }]
        },
        interval: { requestInterval: 3000 },
        search: { workshopId: '', workshopName: '' },
        options: { workshop: [] },
        loading: {
          search: false
        },
        intTime: '',
        boardCurrent: false
      }
    },
    mounted () {
      this.getAllWorkshop()
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
    deactivated () {
      clearInterval(this.intTime)
    },
    methods: {
      showClick () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let docElm = this.$refs.boardContent
            if (docElm.requestFullscreen) {
              docElm.requestFullscreen()
            } else if (docElm.webkitRequestFullScreen) {
              docElm.webkitRequestFullScreen()
            }
            let params = { groupId: boardConfig.examine.groupId }
            api.automatic.statement.getBoardConfig(params).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                if (Array.isArray(data.data) && data.data.length > 0) {
                  this.boardConfig.refreshInterval = parseInt(data.data[0].list[0].requestInterval)
                  clearInterval(this.intTime)
                  this.intTime = setInterval(this.getData, this.interval.requestInterval * 1000)
                }
              } else {
                this.$message({type: 'error', message: data.message})
              }
            }).catch(e => {
              console.log(e)
            })
          }
        })
      },
      getAllWorkshop () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshop = data.data
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
        let selecteWorkShop = this.options.workshop.find(item => { return item.id === this.search.workshopId })
        this.search.workshopName = selecteWorkShop.name
        let params = {
          status: '1',
          workshopId: this.search.workshopId,
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        $.ajax({
          type: 'POST',
          url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/board/getSilkAlarmList',
          data: JSON.stringify(params),
          contentType: 'application/json; charset=utf-8',
          success: (response) => {
            response = JSON.parse(response)
            $('#currTime').text((new Date(response.data.systemDate).toISOString()).substr(0, 10))
            let list = response.data.list
            if (list.length === 0) {
              return
            }
            for (let i = 0; i < this.page.size; i++) {
              let tr = $('#tbody tr')[i]
              $($(tr).find(`td:eq(${0})`)).html((i < list.length ? list[i].silkCode : '&nbsp;'))
              $($(tr).find(`td:eq(${1})`)).html((i < list.length ? list[i].lineName : '&nbsp;'))
              $($(tr).find(`td:eq(${2})`)).html((i < list.length ? list[i].batchNo : '&nbsp;'))
              $($(tr).find(`td:eq(${3})`)).html((i < list.length ? list[i].spec : '&nbsp;'))
              $($(tr).find(`td:eq(${4})`)).html((i < list.length ? list[i].item : '&nbsp;'))
              $($(tr).find(`td:eq(${5})`)).html((i < list.length ? list[i].fallNo : '&nbsp;'))
              $($(tr).find(`td:eq(${6})`)).html((i < list.length ? list[i].classesName : '&nbsp;'))
              $($(tr).find(`td:eq(${7})`)).html((i < list.length ? list[i].downGradeReasonName : '&nbsp;'))
              $($(tr).find(`td:eq(${8})`)).html((i < list.length ? (list[i].status === '1' ? '未处理' : '已处理') : '&nbsp;'))
              $($(tr).find(`td:eq(${9})`)).html((i < list.length ? list[i].employeeName : '&nbsp;'))
              $($(tr).find(`td:eq(${10})`)).html((i < list.length ? list[i].handleEmployeeName : '&nbsp;'))
              $($(tr).find(`td:eq(${11})`)).html((i < list.length ? list[i].remark : '&nbsp;'))
            }
            this.page.current = ((this.page.current + 1) > Math.ceil(response.data.count / this.page.size)) ? 1 : this.page.current + 1
          },
          error: function (a, b, c) {
            console.log(a, b, c)
          },
          complete: function (xhr) {
            xhr = null
          }
        })
      }
    }
  }
</script>

<style scoped lang="css">
  .board-content {
    padding: 0.5rem 0.5rem;
    color: #fff;
    width: 100%;
    height: 100%;
    background: url("../../../../../static/img/background.jpg") center no-repeat;
    background-size: cover;
  }
  .title-box {
    display: block;
    height: 8%;
  }
  .title-box li {
    width: 33.33%;
    float: left;
    height: 8rem;
    line-height: 8rem;
  }
  .title-box li:nth-child(2) > div {
    text-align: center;
    font-size: 5rem;
  }
  .title-box li:nth-child(3) > div {
    float: right;
    font-size: 3rem;
    border: .05rem solid #2c647c;
    padding: 0 1rem;
    height: 6rem;
    line-height: 6rem;
   }
  .content-box > table {
    width: 100%;
    margin-top: 1rem;
    border-color: #1d9a9a;
  }
  .content-box > table tr {
    height: 5rem;
    line-height: 5rem;
  }
  .content-box > table tr:nth-child(odd) {
    background-color: rgba(6, 19, 31, 0.6);
  }
  .content-box > table tr th, .content-box > table tr td {
    text-align: center;
    font-size: 3rem;
  }
  .content-box > table tr th {
    background-color: rgba(6, 19, 31, 0.6);
    font-weight: 700;
    color: #51ffff;
  }

</style>
