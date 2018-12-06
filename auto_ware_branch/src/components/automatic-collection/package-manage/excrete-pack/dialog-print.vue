<template>
  <div class="package-print" ref="printBox">
    <ul>
      <li v-for="(item,index) in printData" :key="index">
        <div class="left-box"></div>
        <div class="center-box">
          <div class="line1 bold">{{item.batchNo}}</div>
          <div class="line1">{{item.spec}}</div>
          <div class="line1 bold">{{item.grade}}</div>
          <div class="line1">{{ Number(item.lineCount) + Number(item.unpackCount) }}</div>
          <div class="line1">{{item.paperTube}}</div>
          <div class="line1">{{item.productDate}}</div>
          <div class="line2">
            <div class="inner">
              <div>{{item.singleCode.substring(0, 12)}}</div>
              <div>{{item.singleCode.substring(12)}}</div>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="line3">
            <div class="p_label"></div>
            <div class="p_value">{{item.netWeight}}</div>
          </div>
          <div class="line3">
            <div class="p_label"></div>
            <div class="p_value">{{item.grossWeight}}</div>
          </div>
          <div class="line4">
            <div class="qrcode" ref="qrcode"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  import 'jQuery.print'
  export default {
    props: ['printData'],
    watch: {
      printData: function (data) {
        this.printData = data
        console.log(data)
        this.$nextTick(function () {
          let qrcodeDoms = this.$refs.qrcode
          for (let i = 0; i < this.printData.length; i++) {
            qrcodeDoms[i].innerHTML = ''
            let qrcode = new QRCode(qrcodeDoms[i], {
              text: this.printData[i].singleCode,
              width: 250,
              height: 250
            })
            console.log(qrcode)
          }
          this.$nextTick(function () {
            setTimeout(() => {
              $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-box-code.css'})
            }, 10) // 0ms也可以,不加延时二维码生成出错
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
