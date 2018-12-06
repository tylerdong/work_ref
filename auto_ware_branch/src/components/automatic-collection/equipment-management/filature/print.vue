<template>
  <div class="silk-car-print" ref="printBox">
    <ul>
      <li v-for="(item, index) in printData" :key="index">
        <div class="title">{{item.name}}</div>
        <svg v-if="printOption.printType === 'barCode'" class="barcode"></svg>
        <template v-else>
          <div class="qrcode" ref="qrcode"></div>
          <div class="code-text">{{item.code}}</div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
  import jsBarcode from 'jsbarcode'
  import QRCode from 'qrcodejs2'
  import 'jQuery.print'
  export default {
    data () {
      return {
        printData: [],
        printOption: {}
      }
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      print (data, print) {
        console.log(data)
        this.printData = []
        this.printOption = print
        let newData = []
        for (let item of data) {
          for (let i = 0; i < print.number; i++) {
            newData.push(item)
          }
        }
        this.printData = newData
        this.$nextTick(function () {
          let barcodeDom = this.$refs.printBox.querySelectorAll('.barcode')
          let qrcodeDom = this.$refs.printBox.querySelectorAll('.qrcode')
          for (let i = 0; i < this.printData.length; i++) {
            if (print.printType === 'barCode') {
              jsBarcode(barcodeDom[i], this.printData[i].code, {height: 80})
            } else {
              qrcodeDom[i].innerHTML = ''
              let qrcode = new QRCode(qrcodeDom[i], {text: this.printData[i].code, width: '95', height: '95'})
              console.log(qrcode)
            }
          }
          this.$nextTick(function () {
            setTimeout(() => {
              $(this.$refs.printBox).print({
                globalStyles: false,
                stylesheet: print.printType === 'barCode' ? 'static/css/print.css' : 'static/css/print-sick-car-arcode.css'
              })
            }, 10) // 0ms也可以,不加延时二维码生成出错
          })
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .silk-car-print{
    display: none;
  }
</style>
