<template>
  <div>
    <el-dialog title="查看详情" width="70%" :visible.sync="dialogVisible">
      <div v-loading="loading.dialog">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-col :span="8" class="label1">发货日期</el-col>
            <el-col class="line-height36" :span="16">
              <el-tag class="tags" v-for="(item,index) in nowData.outBoundDates" :key="index" type="info">{{item | timeFormat('YYYY-MM-DD')}}</el-tag>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8" class="label1">发货仓库</el-col>
            <el-col class="line-height36" :span="16">
              <el-tag class="tags" v-for="(item,index) in nowData.loadPointNames" :key="index" type="info">{{item}}</el-tag>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8" class="label1">车牌号</el-col>
            <el-col class="line-height36" :span="16">{{nowData.plateNumber}}</el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8" class="label1 require1">装运点</el-col>
            <el-col class="line-height36" :span="16">{{nowData.gateheadName}}</el-col>
          </el-col>
        </el-row>
        <div class="outer" v-for="(outer,index) in formData" :key="index">
          <div class="title">
            <span>发货分配：</span>
            <el-tag style="font-size:16px" class="tags" type="info" v-for="(title,index) in outer.titleBos" :key="index">{{title.customerName + ' - ' + title.deliveryNo + ' - ' + title.netWeight}}</el-tag>
          </div>

          <div style="border: 1px solid rgb(223, 230, 236);margin-top: 10px">
            <el-table :data="[outer.saleRequisitionDetailBoList]">
              <el-table-column prop="material" label="物料号"></el-table-column>
              <el-table-column prop="productName" label="名称"></el-table-column>
              <el-table-column prop="batchNo" label="批号"></el-table-column>
              <el-table-column prop="spec" label="规格"></el-table-column>
              <el-table-column prop="level" label="等级"></el-table-column>
              <el-table-column prop="yarnKind" label="纱种"></el-table-column>
              <el-table-column prop="twistDirection" label="捻向"></el-table-column>
              <el-table-column prop="count" label="箱数"></el-table-column>
              <el-table-column label="当前重量/净重">
                <template slot-scope="scope">
                  <span :class="[sum > scope.row.netWeight ? 'red' :
                                sum < scope.row.netWeight ? 'yellow' : 'green', 'bold']">{{sum}}</span>
                  <span>/</span>
                  <span>{{scope.row.netWeight}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>
            <el-table :data="outer.stockLocks" style="margin-top: 10px;" v-if="true">
              <el-table-column prop="unitNetWeight" label="每箱净重"></el-table-column>
              <el-table-column label="成品类型">
                <template slot-scope="scope">
                  {{scope.row.productType | productTypeturn}}
                </template>
              </el-table-column>
              <el-table-column prop="yoke" label="托盘类型"></el-table-column>
              <el-table-column prop="packing" label="包装类型"></el-table-column>
              <el-table-column prop="foamType" label="泡沫类型"></el-table-column>
              <el-table-column prop="foamNum" label="泡沫数量"></el-table-column>
              <el-table-column prop="totalCount" label="退货箱数"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <ul ref="salePrintBox">
        <li class="print-box" style="border: 1px solid black;" v-for="(item, index) in printData" :key="index">
          <div class="print-title">
            {{companyName}}<br>
            退 货 调 拨 单
          </div>
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
            <div class="fr width30p">
              合同号：
            </div>
          </div>
          <table class="print-table margin-top-3mm">
            <tr>
              <td>物料号</td><td>名称</td><td>规格</td><td>纱种</td><td>批号</td><td>捻向</td><td>等级</td><td>箱数</td><td>数量</td>
            </tr>
            <tr v-for="(item2,index) in item.list" :key="index">
              <td>{{item2.material}}</td><td>{{item2.productName}}</td><td>{{item2.spec}}</td><td>{{item2.yarnKind}}</td><td>{{item2.batchNo}}</td><td>{{item2.twist}}</td><td>{{item2.level}}</td><td>{{item2.count}}</td><td>{{item2.weight}}</td>
            </tr>
            <tr>
              <td colspan="7">合计</td><td>{{item.sumCount}}</td><td>{{item.sumWeight}}</td>
            </tr>
          </table>
          <div class="cf margin-top-3mm">
            <div class="fl width30p">车牌号/收货人：{{nowData.plateNumber}}</div>
            <div class="fl width30p">销售员：</div>
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="printClick">打印退货调拨单</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  import jsBarcode from 'jsbarcode'
  export default {
    data () {
      return {
        sum: 0,
        stockLocks: [],
        companyName: window.global.companyName,
        nowData: {},
        formData: [],
        printData: [],
        dialogVisible: false,
        loading: {
          dialog: false,
          submit: false
        },
        userInfo: ''
      }
    },
    filters: {
      productTypeturn: function (val) {
        return val === 'INNER_SALE' ? '内销' : '外贸'
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      show (data) {
        this.sum = 0
        this.nowData = data
        this.title = '出货安排'
        this.title += data.isInternalTrade === 'Y' ? '（内销）' : '（外贸）'
        this.dialogVisible = true
        this.loading.dialog = true
        api.storage.warehouseManagement.getRefundRequisitionById({
          primaryId: data.primaryId
        }).then(response => {
          if (response.data.messageType === 1) {
            this.formData = response.data.data
            this.formData[0].stockLocks.map(val => {
              this.sum += (val.unitNetWeight * val.totalCount)
            })
            this.getPrintData(this.formData)
          }
        }).finally(() => {
          this.loading.dialog = false
        })
      },
      printClick () {
        for (let i = 0; i < this.printData.length; i++) {
          jsBarcode(`.barcode${i}`).init()
        }
        this.$nextTick(() => {
          $(this.$refs.salePrintBox).print({globalStyles: false, stylesheet: 'static/css/print-out-storage.css'})
        })
      },
      getPrintData (data) {
        console.log('data', data)
        this.printData = []
        for (let outer of data) {
          let saleRd = outer.saleRequisitionDetailBoList
          for (let titleBo of outer.titleBos) {
            let item = this.getByDeliveryNo(titleBo.deliveryNo)
            if (item === null) {
              item = {
                deliveryNo: titleBo.deliveryNo,
                customerName: titleBo.customerName,
                deliveryDate: Date.now(),
                gateheadName: this.nowData.gateheadName,
                sumCount: titleBo.boxNum,
                sumWeight: titleBo.netWeight,
                list: []
              }
            } else {
              item.sumCount += titleBo.boxNum
              item.sumWeight += titleBo.netWeight
            }
            item.list.push({
              material: saleRd.material,
              productName: saleRd.productName,
              batchNo: saleRd.batchNo,
              spec: saleRd.spec,
              level: saleRd.level,
              yarnKind: saleRd.yarnKind,
              twist: saleRd.twistDirection,
              count: titleBo.boxNum,
              weight: titleBo.netWeight
            })
            this.printData.push(item)
          }
        }
      },
      getByDeliveryNo (deliveryNo) {
        for (let item of this.printData) {
          if (item.deliveryNo === deliveryNo) {
            return item
          }
        }
        return null
      }
    }
  }
</script>
<style lang="scss" scoped>
  .green {
    color: limegreen;
  }
  .red {
    color: red;
  }
  .yellow {
    color: orange;
  }
  .bold {
    font-weight: bold;
  }
  .print-box{
    display: none;
  }
  .line-height36{
    line-height: 36px;
  }
  .el-row {
    margin-bottom: 10px;
  }
  .label1 {
    font-weight: bold;
    line-height: 36px;
  }
  .require1:before {
    content: '*';
    color: red;
  }
  .el-tag--info {
    background-color: hsla(220,8%,56%,.1);
    border-color: hsla(220,8%,56%,.2);
    color: #878d99;
  }
</style>
