<!--第一类第三行异常报警-->
<template>
  <div class="alarm-table">
    <table>
      <thead>
      <tr>
        <th>批号</th>
        <th>线别</th>
        <th>纺位</th>
        <th>落次</th>
        <th>锭号</th>
        <th>原因</th>
      </tr>
      </thead>
      <tbody id="sickAlarmTable">
      <tr>
        <td> </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;&nbsp;</td>
        <td>&nbsp;&nbsp;</td>
        <td>&nbsp;&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {fontSizes} from './common'
  export default {
    data () {
      return {
        page: {current: 1, size: 6, total: 0},
        fontSizes: fontSizes
      }
    },
    methods: {
      initData (id) {
        this.getSilkAlarmList(id)
      },
      getSilkAlarmList (workShopID) {
        console.log(workShopID)
        let params = {
          status: '1',
          workshopId: workShopID,
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        params = JSON.stringify(params)
        $.ajax({
          type: 'POST',
          url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/board/getCommandSilkAlarmList',
          data: params,
          contentType: 'application/json; charset=utf-8',
          success: (response) => {
            response = JSON.parse(response)
            $('#currTime').text((new Date(response.data.systemDate).toISOString()).substr(0, 10))
            let list = response.data.list
            if (list && list.length > 0) {
              for (let i = 0; i < this.page.size; i++) {
                let tr = $('#sickAlarmTable tr')[i]
                $($(tr).find('td')[0]).html((i < list.length ? list[i].batchNo : '&nbsp;'))
                $($(tr).find('td')[1]).html((i < list.length ? list[i].lineName : '&nbsp;'))
                $($(tr).find('td')[2]).html((i < list.length ? list[i].item : '&nbsp;'))
                $($(tr).find('td')[3]).html((i < list.length ? list[i].fallNo : '&nbsp;'))
                $($(tr).find('td')[4]).html((i < list.length ? list[i].spidleNo : '&nbsp;'))
                $($(tr).find('td')[5]).html((i < list.length ? list[i].downGradeReasonName : '&nbsp;'))
                $($(tr).find('td')[6]).html((i < list.length ? (list[i].status === '1' ? '未处理' : '已处理') : '&nbsp;'))
              }
              this.page.current = ((this.page.current + 1) > Math.ceil(response.data.count / this.page.size)) ? 1 : this.page.current + 1
            }
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

<style scoped lang="css" src="./largescreen.css"></style>
