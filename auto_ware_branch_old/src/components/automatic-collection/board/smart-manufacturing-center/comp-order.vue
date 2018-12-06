<template>
  <div>
    <div class="order-left auto-line">
      <div>
        <label class="sub-title">已完成订单(kg)</label>
        <span id="finishedCount" class="finish-span">1500</span>
        <div class="outter" id="outter"><span class="inner" id="inner"></span></div>
        <span id="allCount" class="all-span">2000</span>
        <label class="sub-title">订单总量(kg)</label>
      </div>
    </div>
    <div class="order-right">
      <table>
        <tbody id="maldistributionBoList">
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      initData (id) {
        this.getOrderInfo(id)
      },
      getOrderInfo (workShopId) {
        let params = JSON.stringify({workshopId: workShopId})
        $.ajax({
          type: 'POST',
          url: window.global.ajaxWarehouseManagementBaseUrl + 'api/warehouseManagement/board/getOrderInfo',
          data: params,
          contentType: 'application/json; charset=utf-8',
          success: function (response) {
            let data = JSON.parse(response)
            data = data.data
            $('#finishedCount').text(data.finishedWeight)
            $('#allCount').text(data.allWeight)
            $('#outter>#inner').css('height', ((data.finishedCount / data.allCount).toFixed(2) * 100).toString() + '%')
            if (data.itemList.length === 0) {
              return
            }
            for (let i = 0; i < 8; i++) {
              let tr = $('#maldistributionBoList tr')[i]
              if (i < data.itemList.length) {
                $($(tr).find('td')[0]).html(`TOP${i + 1}`)
                $($(tr).find('td')[1]).html(data.itemList[i].batchNo)
                $($(tr).find('td')[2]).html(data.itemList[i].weight)
              } else {
                $($(tr).find('td')[0]).html('&nbsp;')
                $($(tr).find('td')[1]).html('&nbsp;')
                $($(tr).find('td')[2]).html('&nbsp;')
              }
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
