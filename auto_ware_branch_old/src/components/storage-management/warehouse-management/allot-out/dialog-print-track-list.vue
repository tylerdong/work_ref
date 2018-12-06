<!--打印装车跟踪单-->
<template>
  <div ref="printBox" class="outter-box">
    <template v-for="data in printData">
      <div v-for="ceilIndex in Array(Math.ceil(data.productCodeList.length / 69)).fill(0).map((value, index) => { return index })"
        class="print-box">
        <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <caption>短丝部外销装车跟踪单</caption>
          <tbody>
          <tr>
            <th>批号：</th>
            <th>{{data.batchNo}}</th>
            <th colspan="2">订单号（询问仓库后填写）：</th>
            <th colspan="2">{{data.orderNo}}</th>
          </tr>
          <tr>
            <th>装车日期及时间：</th>
            <th colspan="5">{{data.loadCarTime}}</th>
          </tr>
          <tr>
            <th>车牌号：</th>
            <th colspan="2">{{data.plateNo}}</th>
            <th>货柜号：</th>
            <th colspan="2">{{data.boxNo}}</th>
          </tr>
          <tr class="header-tr">
            <td>序号</td>
            <td>包号</td>
            <td>序号</td>
            <td>包号</td>
            <td>序号</td>
            <td>包号</td>
          </tr>
          <tr v-for="index in Array(23).fill(0).map((value, index) => { return index })">
            <td>
              {{ index + 1 }}
            </td>
            <td>
              <span v-if="data.productCodeList.length > index + 69 * ceilIndex">
                {{ data.productCodeList[index + 69 * ceilIndex] ? data.productCodeList[index + 69 * ceilIndex].substr(6, 6) : ''}}
                {{ data.productCodeList[index + 69 * ceilIndex] ? data.productCodeList[index + 69 * ceilIndex].substr(-6, 6) : ''}}
              </span>
            </td>
            <td>
              {{ index + 24 }}
            </td>
            <td>
              <span v-if="data.productCodeList.length > index + 69 * ceilIndex + 23">
                {{ data.productCodeList[index + 69 * ceilIndex + 23] ? data.productCodeList[index + 69 * ceilIndex + 23].substr(6, 6) : ''}}
                {{ data.productCodeList[index + 69 * ceilIndex + 23] ? data.productCodeList[index + 69 * ceilIndex + 23].substr(-6, 6) : ''}}
              </span>
            </td>
            <td>
              {{ index + 47 }}
            </td>
            <td>
              <span v-if="data.productCodeList.length > index + 69 * ceilIndex + 46">
                {{ data.productCodeList[index + 69 * ceilIndex + 46] ? data.productCodeList[index + 69 * ceilIndex + 46].substr(6, 6) : ''}}
                {{ data.productCodeList[index + 69 * ceilIndex + 46] ? data.productCodeList[index + 69 * ceilIndex + 46].substr(-6, 6) : ''}}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="footer">
          <ul>
            <li>班组：</li>
            <li>&nbsp;&nbsp;</li>
            <li>抄表人：</li>
            <li>&nbsp;&nbsp;</li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import 'jQuery.print'

  export default {
    components: {},
    created () {
    },
    data () {
      return {
        showPrintDialog: false,
        lineNum: 23,
        printData: {}
      }
    },
    props: {},
    mounted () {
    },
    computed: {},
    methods: {
      print (data) {
        // this.showPrintDialog = true
        // for (let i = 0; i < 69; i++) {
        //   data[0].productCodeList.push('010220180203D207011A2089')
        // }
        // data[1].productCodeList = data[0].productCodeList
        this.printData = data
        console.log(this.printData)
        this.$nextTick(() => {
          setTimeout(() => {
            $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-track-list.css'})
          }, 0)
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
