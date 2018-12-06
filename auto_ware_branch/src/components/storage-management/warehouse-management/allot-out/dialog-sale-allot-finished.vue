<template>
  <div>
    <el-dialog title="查看详情" width="80%" :visible.sync="dialogVisible">
      <div v-loading="loading.dialog">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-col :span="8" class="label1">发货日期</el-col>
            <el-col class="line-height36" :span="16">
              <el-tag v-for="(item,index) in nowData.outBoundDates" :key="index" type="info">{{item | timeFormat('YYYY-MM-DD')}}</el-tag>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8" class="label1">发货仓库</el-col>
            <el-col class="line-height36" :span="16">
              <el-tag v-for="(item,index) in nowData.loadPointNames" :key="index" type="info">{{item}}
              </el-tag>
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

        <div v-for="(outer,index) in formData" :key="index">
          <div class="title">
            <span>发货分配：</span>
            <el-tag style="font-size:16px" class="tags" type="info" v-for="(title,index) in outer.titleBos" :key="index">{{title.customerName + ' - ' + title.deliveryNo + ' - ' + title.netWeight}}</el-tag>
          </div>
          <div style="border: 1px solid rgb(223, 230, 236);margin-top: 10px">
            <el-table class="small-table" :data="[outer.saleRequisitionDetailBoList]">
              <el-table-column min-width="160" prop="material" label="物料号"></el-table-column>
              <el-table-column prop="productName" label="名称"></el-table-column>
              <el-table-column prop="batchNo" label="批号"></el-table-column>
              <el-table-column prop="spec" label="规格"></el-table-column>
              <el-table-column prop="level" label="等级"></el-table-column>
              <el-table-column prop="yarnKind" label="纱种"></el-table-column>
              <el-table-column prop="twist" label="捻向"></el-table-column>
              <el-table-column prop="count" label="箱数"></el-table-column>
              <el-table-column min-width="150" label="当前重量/总净重">
                <template slot-scope="scope">
                  <span :class="[scope.row.currentWeight > scope.row.netWeight ? 'red' :
                                scope.row.currentWeight < scope.row.netWeight ? 'yellow' : 'green', 'bold']">{{scope.row.currentWeight}}</span>
                  <span>/</span>
                  <span>{{scope.row.netWeight}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column prop="unCrateCount" label="拆包区数量"></el-table-column>
              <el-table-column label="最小生产日期">
                <template slot-scope="scope">{{scope.row.minProductDate | timeFormat('YYYY-MM-DD')}}</template>
              </el-table-column>
            </el-table>
            <div style="margin: 10px">
              <el-tabs v-model="outer.activeTab" type="border-card">
                <el-tab-pane label="仓库出货" name="1">
                  <el-table :data="outer.stockNumBoList" class="x-scroll">
                    <el-table-column prop="netWeight" label="每箱净重"></el-table-column>
                    <el-table-column label="成品类型">
                      <template slot-scope="scope">{{scope.row.productType | productType}}</template>
                    </el-table-column>
                    <el-table-column prop="yoke" label="托盘类型">
                      <template slot-scope="scope">{{scope.row.yoke | yokeTypes}}</template>
                    </el-table-column>
                    <el-table-column label="包装类型">
                      <template slot-scope="scope">{{scope.row.packing | packTypes}}</template>
                    </el-table-column>
                    <el-table-column label="泡沫类型">
                      <template slot-scope="scope">{{scope.row.foamType | frothTypes}}</template>
                    </el-table-column>
                    <el-table-column prop="foamNum" label="泡沫数量"></el-table-column>
                    <!--<el-table-column prop="storageNum" label="库存箱数"></el-table-column>-->
                    <!--<el-table-column prop="storageName" label="库位"></el-table-column>-->
                    <el-table-column prop="outStockNum" label="发货箱数"></el-table-column>
                    <el-table-column prop="devanningNum" label="拆包箱数"></el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="包装申请" name="2" :disabled="outer.saleRequisitionDetailBoList.level !== 'AA'">
                  <el-table :data="outer.requestPackageList" class="x-scroll">
                    <el-table-column prop="unCrateCount" label="拆包区（锭）" width="140"></el-table-column>
                    <el-table-column prop="productLineCount" label="生产线（锭）" width="140"></el-table-column>
                    <el-table-column prop="silkWeight" label="锭重" width="80"></el-table-column>
                    <el-table-column prop="boxCount" label="箱数"></el-table-column>
                    <el-table-column prop="netWeight" label="净重" width="80"></el-table-column>
                    <el-table-column label="托盘类型">
                      <template slot-scope="scope">{{scope.row.yoke | yokeTypes}}</template>
                    </el-table-column>
                    <el-table-column label="包装类型">
                      <template slot-scope="scope">{{scope.row.packType | packTypes}}</template>
                    </el-table-column>
                    <el-table-column label="泡沫类型">
                      <template slot-scope="scope">{{scope.row.frothType | frothTypes}}</template>
                    </el-table-column>
                    <el-table-column prop="frothCount" label="泡沫数量"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
              <!--<div class="title2">叉车：</div>-->
              <!--<el-table :data="item.forkliftAllocationBoList">-->
                <!--<el-table-column prop="number" label="编号"></el-table-column>-->
                <!--<el-table-column prop="wareHouseName" label="所属仓库"></el-table-column>-->
                <!--<el-table-column prop="plateNumber" label="车牌号"></el-table-column>-->
                <!--<el-table-column prop="employeeId" label="帐号"></el-table-column>-->
              <!--</el-table>-->
            </div>
          </div>
        </div>
      </div>

      <!--出库单-->
      <ul ref="printBox">
        <li class="print-box" style="border: 1px solid black;" v-for="(item,index) in outPrintData" :key="index">
          <div class="print-title">
            {{item.companyName}}<br>
            出 库 单
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
            <div class="fl over-ellipsis">
              发货仓库：{{item.gateheadName}}
            </div>
          </div>
          <div class="cf">
            <div class="fl over-ellipsis">
              发货编码：{{item.deliveryNo}}
            </div>
          </div>
          <div class="cf">
            <div class="fr width30p">
              合同号：
            </div>
          </div>
          <table class="print-table margin-top-3mm">
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
              <td colspan="7">合计</td><td>{{item.sumCount}}</td><td>{{item.sumWeight}}</td>
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
        </li>
      </ul>

      <!--调拨单-->
      <!--<ul ref="salePrintBox">-->
        <!--<li class="print-box" style="border: 1px solid black;" v-for="(item, index) in printData" :key="index">-->
          <!--<div class="print-title">-->
            <!--{{item.companyName}}<br>-->
            <!--销 售 调 拨 单-->
          <!--</div>-->
          <!--<div class="cf margin-top-3mm">-->
            <!--<div class="fl width70p">-->
              <!--客户名称：{{item.customerName}}-->
            <!--</div>-->
            <!--<div class="fl width30p">-->
              <!--发货日期：{{item.deliveryDate | timeFormat('YYYY.MM.DD')}}-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="cf">-->
            <!--<div class="fl width70p">-->
              <!--发货仓库：{{item.gateheadName}}-->
            <!--</div>-->
            <!--<div class="fl width30p">-->
              <!--交货编码：{{item.deliveryNo}}-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="cf">-->
            <!--<div class="fl width70p">-->
              <!--合同号：-->
            <!--</div>-->
            <!--&lt;!&ndash;外贸订单添加订单号，封单号和箱号&ndash;&gt;-->
            <!--<template v-if="nowData.isInternalTrade === 'N'">-->
              <!--<div class="fr width30p">-->
                <!--订单号：-->
              <!--</div>-->
              <!--<div class="fl width30p">-->
                <!--封签号：-->
              <!--</div>-->
              <!--<div class="fr width30p">-->
                <!--箱号：-->
              <!--</div>-->
            <!--</template>-->
          <!--</div>-->
          <!--<table class="print-table margin-top-3mm">-->
            <!--<tr>-->
              <!--<td>物料号</td>-->
              <!--<td>名称</td>-->
              <!--<td>规格</td>-->
              <!--<td>纱种</td>-->
              <!--<td>批号</td>-->
              <!--<td>捻向</td>-->
              <!--<td>等级</td>-->
              <!--<td>箱数</td>-->
              <!--<td>数量</td>-->
              <!--<td>备注</td>-->
            <!--</tr>-->
            <!--<tr v-for="(item2,index) in item.list" :key="index">-->
              <!--<td>{{item2.material}}</td>-->
              <!--<td>{{item2.productName}}</td>-->
              <!--<td>{{item2.spec}}</td>-->
              <!--<td>{{item2.yarnKind}}</td>-->
              <!--<td>{{item2.batchNo}}</td>-->
              <!--<td>{{item2.twist}}</td>-->
              <!--<td>{{item2.level}}</td>-->
              <!--<td>{{item2.count}}</td>-->
              <!--<td>{{item2.weight}}</td>-->
              <!--<td>{{item2.memo}}</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td colspan="7">合计</td>-->
              <!--<td>{{item.sumCount}}</td>-->
              <!--<td>{{item.sumWeight}}</td>-->
              <!--<td>&nbsp;&nbsp;</td>-->
            <!--</tr>-->
          <!--</table>-->
          <!--<div class="cf margin-top-3mm">-->
            <!--<div class="fl width30p">车牌号/收货人：{{nowData.plateNumber}}</div>-->
            <!--<div class="fl width30p">销售员：{{item.saleManName}}</div>-->
            <!--<div class="fl width30p">发货员：</div>-->
          <!--</div>-->
          <!--<div>口散装车：装车箱包整齐整洁，完好无破碎，无潮湿，托盘无破碎，请盖好雨布做好产品防护。</div>-->
          <!--<div>口集装箱：箱内干净无破碎装箱箱包整齐整洁，完好无破碎，无潮湿，托盘无破碎，扎带已扎牢。</div>-->
          <!--<div class="cf">-->
            <!--<div class="fr width30p">驾驶员签字：</div>-->
          <!--</div>-->

          <!--<img class="barcode" :class="'barcode' + index" :jsbarcode-value="item.deliveryNo" jsbarcode-width="5" jsbarcode-height="100">-->
        <!--</li>-->
      <!--</ul>-->

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="printSale">打印调拨单</el-button>
        <el-button type="primary" @click="printClick" :disabled="!isPosted">打印出库单</el-button>
        <!--<template v-if="nowData.isInternalTrade === 'N'">-->
        <el-button type="primary" @click="printTrackClick" :loading="loading.printTrack">打印装车跟踪单</el-button>
        <el-button type="primary" @click="downloadTrackClick" :loading="loading.downloadTrack">下载装车跟踪单</el-button>
        <a ref="refDownload" :href="downloadHref"></a>
        <!--</template>-->
      </div>
    </el-dialog>
    <!--装车跟踪单-->
    <dialog-print-track-list ref="dialogTrackPrint"></dialog-print-track-list>
    <!--销售调拨单-->
    <dialog-print-sale-allot ref="dialogSaleAllotPrint"></dialog-print-sale-allot>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  import 'jQuery.print'
  import {yokeTypes, frothTypes, packTypes} from 'value-label'
  export default {
    components: {
      'dialog-side': require('src/components/common/dialog-side.vue'),
      'dialog-print-track-list': require('./dialog-print-track-list.vue'),
      'dialog-print-sale-allot': require('./dialog-print-sale-allot')
    },
    data () {
      return {
        companyName: window.global.companyName,
        nowData: {},
        formData: [],
        printTrack: true,
        dialogVisible: false,
        loading: {
          dialog: false,
          submit: false,
          printTrack: false,
          downloadTrack: false
        },
        isPosted: false,
        printData: [],
        outPrintData: [],
        place: '',
        userInfo: '',
        downloadHref: ''
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    filters: {
      allCount: (val) => {
        let newNum = 0
        for (let item of val) {
          newNum += Number(item.count)
        }
        return newNum
      },
      allUnCrateCount: (val) => {
        let newNum = 0
        for (let item of val) {
          newNum += Number(item.unCrateCount)
        }
        return newNum
      },
      productType: (val) => {
        if (val) {
          if (val === 'INNER_SALE') {
            return '内销'
          }
          if (val === 'OUT_SALE') {
            return '外贸'
          }
        }
        return ''
      },
      yokeTypes: (val) => {
        if (val) {
          for (let item of yokeTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      },
      frothTypes: (val) => {
        if (val) {
          for (let item of frothTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      },
      packTypes: (val) => {
        if (val) {
          for (let item of packTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      }
    },
    methods: {
      printClick () {
        $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-out-storage.css'})
      },
      printSale () {
        this.$nextTick(() => {
          this.$refs.dialogSaleAllotPrint.print(this.printData, this.nowData)
        })
        // for (let i = 0; i < this.printData.length; i++) {
        //   jsBarcode(`.barcode${i}`).init()
        // }
        // this.$nextTick(() => {
        //   $(this.$refs.salePrintBox).print({globalStyles: false, stylesheet: 'static/css/print-out-storage.css'})
        // })
      },
      printTrackClick () {
        let param = { requisitionIds: this.nowData.requisitionIds.join(',') }
        this.loading.printTrack = true
        api.storage.warehouseManagement.requisitionReportPrint(param).then((response) => {
          let data = response.data
          if (data.messageType === 1) {
            this.$refs.dialogTrackPrint.print(data.data)
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).finally(() => {
          this.loading.printTrack = false
        })
      },
      downloadTrackClick () {
        let param = { requisitionIds: this.nowData.requisitionIds.join(',') }
        this.loading.downloadTrack = true
        api.storage.warehouseManagement.requisitionReportExcel(param).then((response) => {
          let data = response.data
          let blob = new Blob([data], {type: 'octet/stream'})
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          document.body.appendChild(a)
          a.style = 'display: none'
          a.href = url
          a.download = '装车跟踪单.xls'
          a.click()
          window.URL.revokeObjectURL(url)
        }).finally(() => {
          this.loading.downloadTrack = false
        })
      },

      show (data) {
        this.nowData = data
        this.dialogVisible = true
        this.isPosted = this.nowData.status === 'FINISH' || this.nowData.status === 'SAP_FINISH'
        this.loading.dialog = true
        api.storage.warehouseManagement.getDoneSaleRequisitionById({
          primaryId: data.primaryId
        }).then(response => {
          let data = response.data.data
          for (let outer of data) {
            outer.activeTab = '1'
            outer.saleRequisitionDetailBoList.minProductDate = ''
            this.getCurrentWeight(outer)
          }
          this.formData = data
          this.getOutPrintData(data)
          this.getPrintData(data)
        }).finally(() => {
          this.loading.dialog = false
        })
      },
      getCurrentWeight (outer) {
        let currentWeight = 0
        if (outer.saleRequisitionDetailBoList.level === 'AA') {
          for (let packInfo of outer.requestPackageList) {
            currentWeight += this.getNetWeight(packInfo.unCrateCount, packInfo.productLineCount, packInfo.silkWeight, packInfo.boxCount)
          }
        }
        for (let stockNumBo of outer.stockNumBoList) {
          currentWeight += this.getNum(stockNumBo.outStockNum) * this.getNum(stockNumBo.netWeight)
        }
        outer.saleRequisitionDetailBoList.currentWeight = currentWeight
      },
      getNetWeight (unCrateCount, productLineCount, silkWeight, boxCount) {
        return (this.getNum(unCrateCount) + this.getNum(productLineCount)) * this.getNum(silkWeight) * this.getNum(boxCount)
      },
      getNum (num) {
        return num ? Number(num) : 0
      },
      getOutPrintData (data) {
        this.outPrintData = []
        // let deliveryNos = this.nowData.deliveryNos.join(' ')
        // let customerNames = this.nowData.customerNames.join(' ')
        // let gateheadName = this.nowData.gateheadName
        // let sumCount = 0
        // let sumWeight = 0
        // let item = {
        //   deliveryNo: deliveryNos,
        //   customerName: customerNames,
        //   deliveryDate: Date.now(),
        //   gateheadName: gateheadName,
        //   list: []
        // }
        // for (let outer of data) {
        //   let saleRd = outer.saleRequisitionDetailBoList
        //   let count = this.getOutCount(outer.stockNumBoList)
        //   let weight = this.getOutWeight(outer.titleBos)
        //
        //   sumCount += count
        //   sumWeight += weight
        //   item.list.push({
        //     material: saleRd.material,
        //     productName: saleRd.productName,
        //     batchNo: saleRd.batchNo,
        //     spec: saleRd.spec,
        //     level: saleRd.level,
        //     yarnKind: saleRd.yarnKind,
        //     twist: saleRd.twistDirection,
        //     count: count,
        //     weight: weight
        //   })
        // }
        // item.sumCount = sumCount
        // item.sumWeight = sumWeight
        // this.outPrintData.push(item)
        /* ------------------------------------------------------------------------ */
        for (let outer of data) {
          let saleRd = outer.saleRequisitionDetailBoList
          for (let titleBo of outer.titleBos) {
            let item = this.getByOutDeliveryNo(titleBo.deliveryNo)
            if (item === null) {
              item = {
                deliveryNo: titleBo.deliveryNo,
                customerName: titleBo.customerName,
                deliveryDate: titleBo.postTime,
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
            item.companyName = titleBo.saleOrganization ? titleBo.saleOrganization : window.global.companyName
            item.saleManName = saleRd.saleManName ? saleRd.saleManName : ''
            this.outPrintData.push(item)
          }
        }
      },
      // 获取出库单总量
      getOutWeight (titleBos) {
        let sumWeight = 0
        for (let titleBo of titleBos) {
          sumWeight += titleBo.netWeight
        }
        return sumWeight
      },
      // 获取出库单箱数
      getOutCount (stockNumBoList) {
        let sumCount = 0
        for (let stockNumBo of stockNumBoList) {
          sumCount += stockNumBo.outStockNum
        }
        return sumCount
      },
      getPrintData (data) {
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
            item.companyName = titleBo.saleOrganization ? titleBo.saleOrganization : window.global.companyName
            item.saleManName = saleRd.saleManName ? saleRd.saleManName : ''
            item.isUseSharedPallet = titleBo.isUseSharedPallet
            item.organizationCode = titleBo.organizationCode
            item.memo = saleRd.memo ? saleRd.memo : ''
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
      },
      getByOutDeliveryNo (deliveryNo) {
        for (let item of this.outPrintData) {
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
  .print-box{
    display: none;
  }
  .tags {
    margin-right: 10px
  }
  .width60{
    width: 60px;
  }
  .width120{
    width: 120px;
  }
  .title{
    font-size: 16px;
    margin: 10px 0;
  }
  .title2{
    font-size: 15px;
    margin: 10px 0;
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
</style>
<style>
  .small-table .cell {
    padding: 0 2px;
  }
  .small-table {
    font-size: 12px;
  }

  .small-table th, .small-table td {
    line-height: 30px;
  }
  .over-ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
