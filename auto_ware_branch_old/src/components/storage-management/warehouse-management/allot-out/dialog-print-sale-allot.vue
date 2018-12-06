<!--打印调拨单-->
<template>
    <div>
      <ul ref="salePrintBox" class="outter-box">
        <li class="print-box" style="border: 1px solid black;" v-for="(item, index) in printData" :key="index">
          <div v-if="nowData.sharePalletCode && item.isUseSharedPallet === 'Y' && item.organizationCode" ref="qrcode"
               class="qrcode fl"></div>
          <div class="print-title">{{item.companyName}}<br>销 售 调 拨 单</div>
          <div class="cf margin-top-3mm">
            <div class="fl width70p">
              客户名称：{{item.customerName}}
            </div>
            <div class="fl width30p">
              发货日期：{{item.deliveryDate | timeFormat('YYYY.MM.DD')}}
            </div>
          </div>
          <div class="cf">
            <div class="fl width70p">
              发货仓库：{{item.gateheadName}}
            </div>
            <div class="fl width30p">
              交货编码：{{item.deliveryNo}}
            </div>
          </div>
          <div class="cf">
            <div class="fl width70p">
              合同号：
            </div>
            <!--外贸订单添加订单号，封单号和箱号-->
            <template v-if="nowData.isInternalTrade === 'N'">
              <div class="fr width30p">
                订单号：
              </div>
              <div class="fl width30p">
                封签号：
              </div>
              <div class="fr width30p">
                箱号：
              </div>
            </template>
          </div>
          <table class="print-table">
            <tr>
              <td>物料号</td>
              <td>名称</td>
              <td>规格</td>
              <td>纱种</td>
              <td>批号</td>
              <td>捻向</td>
              <td>等级</td>
              <td>箱数</td>
              <td>数量</td>
            </tr>
            <tr v-for="(item2,index) in item.list" :key="index">
              <td>{{item2.material}}</td>
              <td>{{item2.productName}}</td>
              <td>{{item2.spec}}</td>
              <td>{{item2.yarnKind}}</td>
              <td>{{item2.batchNo}}</td>
              <td>{{item2.twist}}</td>
              <td>{{item2.level}}</td>
              <td>{{item2.count}}</td>
              <td>{{item2.weight}}</td>
            </tr>
            <tr>
              <td colspan="7">合计</td>
              <td>{{item.sumCount}}</td>
              <td>{{item.sumWeight}}</td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="8">{{item.memo}}</td>
            </tr>
          </table>
          <div class="cf margin-top-3mm">
            <div class="fl width30p">车牌号/收货人：{{nowData.plateNumber}}</div>
            <div class="fl width30p">销售员：{{item.saleManName}}</div>
            <div class="fl width30p">发货员：</div>
          </div>
          <div>口散装车：装车箱包整齐整洁，完好无破碎，无潮湿，托盘无破碎，请盖好雨布做好产品防护。</div>
          <div>口集装箱：箱内干净无破碎装箱箱包整齐整洁，完好无破碎，无潮湿，托盘无破碎，扎带已扎牢。</div>
          <div class="cf">
            <div class="fr width30p">驾驶员签字：</div>
          </div>
          <img class="barcode" :class="'barcode' + index" :jsbarcode-value="item.deliveryNo" jsbarcode-width="5" jsbarcode-height="100">
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
        nowData: {},
        printData: []
      }
    },
    methods: {
      print (data, nowData) {
        console.log(data)
        console.log(nowData)
        this.printData = data
        this.nowData = nowData
        this.$nextTick(function () {
          let qrcodeDoms = this.$refs.qrcode
          for (let i = 0; i < this.printData.length; i++) {
            jsBarcode(`.barcode${i}`).init()
            if (nowData.sharePalletCode && this.printData[i].isUseSharedPallet === 'Y' && this.printData[i].organizationCode) {
              qrcodeDoms[i].innerHTML = ''
              let qrcode = new QRCode(qrcodeDoms[i], {text: this.printData[i].organizationCode, width: 55, height: 55})
              console.log(qrcode)
            }
          }
          this.$nextTick(function () {
            setTimeout(() => {
              $(this.$refs.salePrintBox).print({
                globalStyles: false,
                stylesheet: 'static/css/print-out-storage.css'
              })
            }, 0)
          })
        })
      }
    }
  }
</script>

<style scoped>
  .outter-box {
    display: none;
  }
</style>
