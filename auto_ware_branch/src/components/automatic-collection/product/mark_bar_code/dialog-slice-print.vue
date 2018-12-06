<!--纤维聚酯切片唛头打印-->
<template>
  <div class="package-print" ref="printBox">
    <ul>
      <li v-for="item in printData">
        <div class="top-box">
          <div class="left-box">
            <div class="line">{{item.kindName}}</div>
            <div class="line">{{item.batchNo}}</div>
            <div class="line">{{item.gradeName | gradeNameFormat(item.shipmentType)}}</div>
            <div class="line">{{item.boxNetWeight}}Kg</div>
            <div class="line">{{item.productDate | timeFormat('YYYY.MM.DD')}}</div>
          </div>
          <div class="right-box">
            <div class="line2">
              <div class="qrcode" ref="qrcode"></div>
            </div>
          </div>
        </div>
        <div class="buttom-box">
          <div class="line3">{{item.code}}</div>
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
    data () {
      return {}
    },
    watch: {
      printData: function (data) {
        this.printData = data
        this.$nextTick(function () {
          let qrcodeDoms = this.$refs.qrcode
//          console.log(qrcodeDoms)
          for (let i = 0; i < this.printData.length; i++) {
            qrcodeDoms[i].innerHTML = ''
            let qrcode = new QRCode(qrcodeDoms[i], {
              text: this.printData[i].code,
              width: 280,
              height: 280
            })
            console.log(qrcode)
          }
          this.$nextTick(function () {
            setTimeout(() => {
              $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-product-marks.css'})
            }, 10) // 0ms也可以,不加延时二维码生成出错
          })
        })
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
  .package-print {
    display: none;
  }
</style>
