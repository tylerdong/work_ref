<template>
    <div>
      <div class="daily-production">
        <p class="title">当日产量(锭)</p>
        <ul id="totalAmout">
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
        </ul>
      </div>
      <div class="receipt-issue">
        <p class="title">&nbsp;</p>
        <ul>
          <li>
            <label class="sub-title">入库(锭)</label>
            <span class="sub-span" id="stockingNum">0</span>
            <div>&nbsp;</div>
          </li>
          <li>
            <label class="sub-title">出库(锭)</label>
            <span id="retrievalNum">0</span>
            <div>&nbsp;</div>
          </li>
        </ul>
      </div>
      <div style="clear:both;"></div>
    </div>
</template>

<script>
  export default {
    methods: {
      initData (id) {
        this.getDailyProductionByWorkshopId(id)
      },
      getDailyProductionByWorkshopId (id) {
        let params = JSON.stringify({workshopId: id})
        $.ajax({
          type: 'POST',
          url: window.global.ajaxWarehouseManagementBaseUrl + 'api/warehouseManagement/board/getDailyProductionByWorkshopId',
          data: params,
          contentType: 'application/json; charset=utf-8',
          success: function (response) {
            let data = JSON.parse(response)
            data = data.data
            $('#retrievalNum').text(data.retrievalNum)
            $('#stockingNum').text(data.stockingNum)
          },
          error: function (a, b, c) {
            console.log(a, b, c)
          },
          complete: function (xhr) {
            xhr = null
          }
        })
      },
      // 当日产量，待包装数，打包锭数，打包包数
      setTotalAmout (data) {
        if (data) {
          let totalAmout = data.totalAmout.toString().padStart(6, '0')
          for (let i = 0; i < 6; i++) {
            $($('#totalAmout li')[i]).html(totalAmout[i])
          }
          $('#waitPackNum').text(data.waitPackNum)
          $('#packedNum').text(data.packedNum)
          $('#boxNum').text(data.boxNum)
        }
      }
    }
  }
</script>

<style scoped lang="css" src="./largescreen.css"></style>
