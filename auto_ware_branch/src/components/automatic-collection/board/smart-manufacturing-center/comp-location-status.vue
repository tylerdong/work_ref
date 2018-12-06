<template>
  <div class="storage-location-top">
    <p class="title">库位实时情况(箱)</p>
    <div>
      <ul>
        <li>
          <div class="full">&nbsp;</div>
          <span>已满</span>
        </li>
        <li>
          <div class="notfull">&nbsp;</div>
          <span>未满</span>
        </li>
        <li>
          <div class="empty">&nbsp;</div>
          <span>空</span>
        </li>
      </ul>
    </div>
    <div style="clear: both"></div>
    <div class="storage-location-bottom" id="locationDiv">
      <ul id="storageViewStatus">
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
        <li class="overload" :style="liStyle">&nbsp;</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dWidth: 0
      }
    },
    mounted () {
      this.dWidth = $('#locationDiv').width()
    },
    computed: {
      liStyle: function () {
        return {
          boxSizing: 'border-box',
          width: this.dWidth / 16 + 'px',
          height: '3rem',
          lineHeight: '3rem',
          padding: '0.2rem',
          backgroundClip: 'content-box',
          textAlign: 'center',
          fontWeight: '600',
          borderRadius: '0.1rem'
        }
      }
    },
    methods: {
      initData (id) {
        this.getStorageViewStatus(id)
      },
      getStorageViewStatus (workshopId) {
        let params = JSON.stringify({workshopId: workshopId})
        $.ajax({
          type: 'POST',
          url: window.global.ajaxWarehouseManagementBaseUrl + 'api/warehouseManagement/storage/getStorageViewStatus',
          data: params,
          contentType: 'application/json; charset=utf-8',
          success: function (response) {
            let data = JSON.parse(response)
            data = data.data
            let dataArr = Array(96)
            let index = 0
            // let strHtml = ''
            for (let i = 0; i < data.length; i++) {
              index = data[i].areaX - 1 + (data[i].areaY - 1) * 16
              dataArr[index] = data[i]
            }
            for (let i = 0; i < dataArr.length; i++) {
              $($('#storageViewStatus li')[i]).html(dataArr[i].storageStockStatus === 'EMPTY' ? '&nbsp;' : dataArr[i].num)
              $($('#storageViewStatus li')[i]).addClass(dataArr[i].storageStockStatus.toLowerCase())
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
