<template>
  <div>
    <el-dialog :title="title" width="80%" :visible.sync="dialogVisible">
      <div v-loading="loading.dialog">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-col :span="8" class="label1">发货日期</el-col>
            <el-col class="line-height36" :span="16">
              <el-tag class="tags" v-for="(item,index) in nowData.outBoundDates" type="info" :key="index">{{item | timeFormat('YYYY-MM-DD')}}</el-tag>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8" class="label1">发货仓库</el-col>
            <el-col class="line-height36" :span="16">
              <el-tag class="tags" v-for="(item,index) in nowData.loadPointNames" type="info" :key="index">{{item}}</el-tag>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8" class="label1">车牌号</el-col>
            <el-col class="line-height36" :span="16">{{nowData.plateNumber}}</el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="8" class="label1 require1">装运点</el-col>
            <el-col :span="16">
              <el-select v-model="loadingPointId" placeholder="请选择">
                <el-option v-for="item in options.moveArea" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-row>
        <div class="outer" v-for="(outer,index) in formData" :key="index">
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
              <el-table-column prop="twistDirection" label="捻向"></el-table-column>
              <el-table-column prop="count" label="箱数"></el-table-column>
              <el-table-column width="150" label="当前重量/总净重">
                <template slot-scope="scope">
                  <span :class="[scope.row.currentWeight > scope.row.netWeight ? 'red' :
                                scope.row.currentWeight < scope.row.netWeight ? 'yellow' : 'green', 'bold']">
                    {{scope.row.currentWeight}}</span>
                  <span>/</span>
                  <span>{{scope.row.netWeight}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column label="拆包区数量">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <el-table :data="scope.row.bulkPackCountBos" class="width250">
                      <el-table-column prop="unitNetWeight" label="锭重"></el-table-column>
                      <el-table-column prop="count" label="数量"></el-table-column>
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                      <el-tag>{{ scope.row.unCrateCount }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <!--<el-table-column width="150" label="最小生产日期">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-date-picker-->
                    <!--v-model="scope.row.minProductDate"-->
                    <!--@change="minDateChange($event, outer)"-->
                    <!--style="width: 130px"-->
                    <!--type="date"-->
                    <!--placeholder="选择日期">-->
                  <!--</el-date-picker>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>

            <div style="margin: 10px">
              <el-tabs v-model="outer.activeTab" type="border-card" :row-class-name="tableRowClassName">
                <el-tab-pane label="仓库出货" name="1">
                  <el-table :data="outer.displayStockNumBoList" class="x-scroll">
                    <el-table-column prop="netWeight" label="每箱净重"></el-table-column>
                    <el-table-column label="成品类型">
                      <template slot-scope="scope">{{scope.row.productType | productType}}</template>
                    </el-table-column>
                    <el-table-column label="托盘类型">
                      <template slot-scope="scope">{{scope.row.yoke | yokeTypes}}</template>
                    </el-table-column>
                    <el-table-column label="包装类型">
                      <template slot-scope="scope">{{scope.row.packing | packTypes}}</template>
                    </el-table-column>
                    <el-table-column label="泡沫类型">
                      <template slot-scope="scope">{{scope.row.foamType | frothTypes}}</template>
                    </el-table-column>
                    <el-table-column prop="foamNum" label="每箱泡沫数量"></el-table-column>
                    <el-table-column label="生产日期">
                      <template slot-scope="scope">{{scope.row.productTime | timeFormat('YYYY-MM-DD')}}</template>
                    </el-table-column>
                    <!--<el-table-column prop="storageName" label="库位"></el-table-column>-->
                    <el-table-column prop="storageNum" label="库存箱数"></el-table-column>
                    <el-table-column label="发货箱数">
                      <template slot-scope="scope">
                        <el-input-number @change="getCurrentWeight(outer)" class="width60" v-model="scope.row.outStockNum" :controls="false"
                        :disabled="scope.row.transfer"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column label="拆包箱数">
                      <template slot-scope="scope">
                        <el-input-number class="width60" v-model="scope.row.devanningNum" :controls="false"
                          :disabled="!(outer.saleRequisitionDetailBoList.level === 'AA' && scope.row.productType === 'INNER_SALE') || scope.row.transfer"></el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="包装申请（整箱）" name="2" :disabled="outer.saleRequisitionDetailBoList.level !== 'AA'">
                  <div class="cf">
                    <el-button style="margin: 0 10px 10px" class="fr" type="primary" @click="addClick(outer.requestPackageList)" size="small">新增</el-button>
                  </div>
                  <el-table :data="outer.requestPackageList" class="x-scroll">
                    <el-table-column label="拆包区（锭）">
                      <template slot-scope="scope">
                        <el-input-number @change="getCurrentWeight(outer)" class="width60" v-model="scope.row.unCrateCount"
                                         :disabled="scope.row.transfer" :controls="false"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column label="生产线（锭）">
                      <template slot-scope="scope">
                        <el-input-number @change="getCurrentWeight(outer)" class="width60" v-model="scope.row.productLineCount"
                                         :disabled="scope.row.transfer" :controls="false"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column label="锭重">
                      <template slot-scope="scope">
                        <el-select @change="getCurrentWeight(outer)" v-model="scope.row.silkWeight" placeholder="请选择"
                                   :disabled="outer.saleRequisitionDetailBoList.level !== 'AA' || scope.row.transfer">
                          <el-option v-for="(item,index) in options.silkWeight" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column label="箱数">
                      <template slot-scope="scope">
                        <el-input-number @change="getCurrentWeight(outer)" class="width60" v-model="scope.row.boxCount"
                                         :disabled="scope.row.transfer" :controls="false"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column label="净重">
                      <template slot-scope="scope">{{getNetWeight(scope.row.unCrateCount, scope.row.productLineCount, scope.row.silkWeight,  scope.row.boxCount)}}</template>
                    </el-table-column>
                    <el-table-column label="每箱泡沫数量">
                      <template slot-scope="scope">{{getFrothCount(scope.row.unCrateCount, scope.row.productLineCount)}}</template>
                    </el-table-column>
                    <el-table-column label="备注">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.remark" placeholder="请输入备注" :disabled="scope.row.transfer"></el-input>
                      </template>
                    </el-table-column>
                    <!--<el-table-column label="">-->
                      <!--<template slot-scope="scope">-->
                        <!--<el-button type="primary" @click="deleteClick(outer, scope.$index)" size="small">删除</el-button>-->
                      <!--</template>-->
                    <!--</el-table-column>-->
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>

      <!--<ul ref="printBox">-->
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
            <!--<div class="fr width70p">-->
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
              <!--<td>物料号</td><td>名称</td><td>规格</td><td>纱种</td><td>批号</td><td>捻向</td><td>等级</td><td>箱数</td><td>数量</td>-->
            <!--</tr>-->
            <!--<tr v-for="(item2,index) in item.list" :key="index">-->
              <!--<td>{{item2.material}}</td><td>{{item2.productName}}</td><td>{{item2.spec}}</td><td>{{item2.yarnKind}}</td><td>{{item2.batchNo}}</td><td>{{item2.twist}}</td><td>{{item2.level}}</td><td>{{item2.count}}</td><td>{{item2.weight}}</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td colspan="7">合计</td><td>{{item.sumCount}}</td><td>{{item.sumWeight}}</td>-->
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
        <el-button type="primary" @click="printClick">打印调拨单</el-button>
        <!--<template v-if="nowData.isInternalTrade === 'Y'">-->
        <!--<el-button type="primary" @click="printTrackClick" :loading="loading.printTrack">打印装车跟踪单</el-button>-->
        <!--<el-button type="primary" @click="downloadTrackClick" :loading="loading.downloadTrack">下载装车跟踪单</el-button>-->
        <!--<a ref="refDownload" :href="downloadHref"></a>-->
        <!--</template>-->
        <el-button :loading="loading.submit" type="primary" @click="commitRequisition">提 交</el-button>
      </div>
    </el-dialog>
    <!--<dialog-print-track-list ref="dialogTrackPrint"></dialog-print-track-list>-->
    <dialog-print-sale-allot ref="dialogSaleAllotPrint"></dialog-print-sale-allot>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  import 'jQuery.print'
  // import jsBarcode from 'jsbarcode'
  import {yokeTypes, frothTypes, packTypes} from '../../value-label.js'
  export default {
    components: {
      'dialog-side': require('src/components/common/dialog-side.vue'),
      // 'dialog-print-track-list': require('./dialog-print-track-list.vue')
      'dialog-print-sale-allot': require('./dialog-print-sale-allot')
    },
    data () {
      return {
        companyName: window.global.companyName,
        nowData: {},
        title: '',
        loadingPointId: '',
        formData: [],
        dialogVisible: false,
        printData: [],
        options: {
          moveArea: [],
          silkWeight: [],
          yoke: yokeTypes,
          packType: packTypes,
          frothType: frothTypes
        },
        loading: {
          dialog: false,
          moveArea: false,
          submit: false,
          printTrack: false,
          downloadTrack: false
        },
        downloadHref: ''
      }
    },
    mounted () {
      this.getMoveAreaOptions()
      this.getSilkWeightList()
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
      forkStatus: (val) => {
        if (val) {
          if (val === 'OFF_LINE') {
            return '离线'
          }
          if (val === 'SPARE_TIME') {
            return '空闲'
          }
          if (val === 'WORKING') {
            return '工作中'
          }
        }
        return ''
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
      packTypes: (val) => {
        if (val) {
          for (let item of packTypes) {
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
      }
    },
    methods: {
      printClick () {
        let name = this.getLoadingPointName()
        if (!name) {
          return this.$message.error('请先选择装运点')
        }
        // for (let i = 0; i < this.printData.length; i++) {
        //   let item = this.printData[i]
        //   item.gateheadName = name
        //   jsBarcode(`.barcode${i}`).init()
        // }
        // jsBarcode('.barcode', '1234', {
        //   format: 'pharmacode',
        //   width: 4,
        //   height: 40,
        //   displayValue: false
        // })
        // this.$nextTick(() => {
        //   $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-out-storage.css'})
        // })
        this.$nextTick(() => {
          this.$refs.dialogSaleAllotPrint.print(this.printData, this.nowData)
        })
      },
      // printTrackClick () {
      //   let param = { requisitionIds: this.nowData.requisitionIds.join(',') }
      //   this.loading.printTrack = true
      //   api.storage.warehouseManagement.requisitionReportPrint(param).then((response) => {
      //     let data = response.data
      //     if (data.messageType === 1) {
      //       this.$refs.dialogTrackPrint.print(this.nowData, data.data)
      //     } else {
      //       this.$message({type: 'error', message: data.message})
      //     }
      //   }).finally(() => {
      //     this.loading.printTrack = false
      //   })
      // },
      // downloadTrackClick () {
      //   let param = { requisitionIds: this.nowData.requisitionIds.join(',') }
      //   this.loading.downloadTrack = true
      //   api.storage.warehouseManagement.requisitionReportExcel(param).then((response) => {
      //     let data = response.data
      //     if (data.messageType === 1) {
      //       this.downloadHref = window.global.ajaxWarehouseManagementBaseUrl + data.data.substring(1)
      //       this.$nextTick(() => {
      //         this.$refs.refDownload.click()
      //       })
      //     } else {
      //       this.$message({type: 'error', message: data.message})
      //     }
      //   }).finally(() => {
      //     this.loading.downloadTrack = false
      //   })
      // },
      getCurrentWeight (outer) {
        this.$nextTick(() => {
          let currentWeight = 0
          if (outer.saleRequisitionDetailBoList.level === 'AA') {
            if (outer.requestPackageList && Array.isArray(outer.requestPackageList)) {
              for (let packInfo of outer.requestPackageList) {
                currentWeight += this.getNetWeight(packInfo.unCrateCount, packInfo.productLineCount, packInfo.silkWeight, packInfo.boxCount)
              }
            }
          }
          for (let stockNumBo of outer.displayStockNumBoList) {
            if (stockNumBo.outStockNum) {
              currentWeight += stockNumBo.outStockNum * stockNumBo.netWeight
            } else {
              stockNumBo.outStockNum = 0
              currentWeight += 0
            }
          }
          outer.saleRequisitionDetailBoList.currentWeight = currentWeight
        })
      },
      getSilkWeightList () {
        api.storage.warehouseManagement.getSilkWeightList({})
          .then(response => {
            this.options.silkWeight = response.data.data
          })
      },
      addClick (data) {
        data.push({
          unCrateCount: 0,
          productLineCount: 0,
          silkWeight: '',
          boxCount: 0,
          netWeight: 0,
          yoke: '',
          packType: '',
          frothType: '',
          frothCount: '',
          remark: ''
        })
      },
      deleteClick (outer, index) {
        outer.requestPackageList.splice(index, 1)
        this.getCurrentWeight(outer)
      },
      getFrothCount (unCrateCount, productLineCount) {
        return Math.ceil((Number(unCrateCount) + Number(productLineCount)) / 9) + 1
      },
      getNetWeight (unCrateCount, productLineCount, silkWeight, boxCount) {
        return (this.getNum(unCrateCount) + this.getNum(productLineCount)) * this.getNum(silkWeight) * this.getNum(boxCount)
      },
      getNum (num) {
        return num ? Number(num) : 0
      },
      getLoadingPointName () {
        for (let item of this.options.moveArea) {
          if (this.loadingPointId === item.id) {
            return item.name
          }
        }
        return ''
      },
      tableRowClassName ({row, rowIndex}) {
        console.log(row.transfer, rowIndex)
        if (row.transfer) {
          return 'success-row'
        }
        return ''
      },
      show (data) {
        this.loadingPointId = ''
        this.nowData = data
        this.title = '货物转移'
        this.title += data.isInternalTrade === 'Y' ? '（内销）' : '（外贸）'
        this.dialogVisible = true
        this.loading.dialog = true
        let param = {
          fromPrimaryId: data.fromPrimaryId,
          toPrimaryId: data.toPrimaryId
        }
        api.storage.warehouseManagement.getStockTransferInfo(param).then(response => {
          const data = response.data.data
          if (data) {
            // 初始化v-model绑定属性，防止undefined
            for (let outer of data) {
              outer.activeTab = '1'
              outer.saleRequisitionDetailBoList.minProductDate = ''
              outer.saleRequisitionDetailBoList.currentWeight = this.getCurrentWeight(outer)
              for (let item2 of outer.stockNumBoList) {
                // item2.outStockNum = 0
                item2.devanningNum = 0
              }
              outer.displayStockNumBoList = this.deepClone(outer.stockNumBoList)
            }
            this.formData = data
            // <deliveryNo, list<detail>>
            this.getPrintData(data)
          }
        }).finally(() => {
          this.loading.dialog = false
        })
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
                deliveryDate: titleBo.deliveryDate,
                gateheadName: '',
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

      getMoveAreaOptions () {
        this.loading.moverArea = true
        api.storage.warehouseManagement.getLoadingPointLists({}).then(response => { // 装运点
          const data = response.data
          this.options.moveArea = data.data
        }).finally(() => {
          this.loading.moverArea = false
        })
      },
      minDateChange (event, outer) {
        let minDate = 0
        if (event) {
          minDate = new Date(event).getTime()
        }
        outer.displayStockNumBoList = []
        for (let item of outer.stockNumBoList) {
          if (item.minProductDate >= minDate) {
            outer.displayStockNumBoList.push(item)
          }
        }
        this.getCurrentWeight(outer)
      },
      commitRequisition () {
        let errorMessage = []
        if (!this.loadingPointId) {
          errorMessage.push('装运点')
        }
        let params = {
          primaryId: this.nowData.toPrimaryId,
          fromPrimaryId: this.nowData.fromPrimaryId,
          deliveryNo: this.nowData.primaryDeliveryNo,
          creator: storage.getUser().userId,
          deliveryNoList: this.nowData.deliveryNos,
          plateNumber: this.nowData.toPlateNumber,
          loadingPointId: this.loadingPointId,
          requisitionDetailInfoBo: []
        }
        for (let item of this.formData) {
          let saleRd = item.saleRequisitionDetailBoList
          let mindate = saleRd.minProductDate ? saleRd.minProductDate.getTime() : ''
          let requisitionDetailInfoItem = {
            requisitionDetailId: saleRd.primaryId,
            productName: saleRd.productName,
            level: saleRd.level,
            mindate: mindate,
            storageOutBoList: [],
            packApplicationBoList: [],
            unPackNum: saleRd.unCrateCount,
            bulkPackCountBos: saleRd.bulkPackCountBos,
            batchNo: saleRd.batchNo,
            material: saleRd.material,
            boxNum: saleRd.count,
            totalNetWeight: saleRd.netWeight,
            spec: saleRd.spec,
            workshopId: saleRd.workshopId
          }
          for (let item2 of item.displayStockNumBoList) {
            // 仓库出货
            requisitionDetailInfoItem.storageOutBoList.push({
              netWeight: item2.netWeight,
              productType: item2.productType,
              yoke: item2.yoke,
              packing: item2.packing,
              foamType: item2.foamType,
              foamNum: item2.foamNum,
              storageId: item2.storageId,
              outNum: item2.outStockNum,
              unpackNum: item2.devanningNum,
              spindleNum: item2.spindleNum,
              storageNum: item2.storageNum,
              warehouseId: item2.warehouseId,
              transfer: item2.transfer
            })
          }
          // 包装申请（整箱）
          for (let item3 of item.requestPackageList) {
            console.log(item3)
            item3.netWeight = this.getNetWeight(item3.unCrateCount, item3.productLineCount, item3.silkWeight, item3.boxCount)
            item3.frothCount = this.getFrothCount(item3.unCrateCount, item3.productLineCount)
            if (!item3.netWeight && saleRd.level === 'AA') { errorMessage.push('锭重') }
            if (!item3.boxCount) { errorMessage.push('箱数') }
            requisitionDetailInfoItem.packApplicationBoList.push({
              unpackNum: item3.unCrateCount,
              productLineNum: item3.productLineCount,
              netWeight: item3.netWeight,
              boxNum: item3.boxCount,
              transfer: item3.transfer,
              // yako: item3.yoke,
              // packing: item3.packType,
              // frothType: item3.frothType,f
              // frothNum: item3.frothCount,
              remark: item3.remark,
              silkWeight: item3.silkWeight
            })
            if ((item3.unCrateCount + item3.productLineCount) > 99) {
              errorMessage.push(`每箱锭数不能大于99`)
            }
          }
          params.requisitionDetailInfoBo.push(requisitionDetailInfoItem)
        }
        if (errorMessage.length) {
          this.$message.error(`${errorMessage.join('、')}不能为空`)
          return
        }
        this.loading.submit = true
        console.log(params)
        api.storage.warehouseManagement.submitSaleRequisition(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({type: 'success', message: data.message})
            this.dialogVisible = false
            this.$emit('submit-success')
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.submit = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .print-box{
    display: none;
  }
  .width60{
    width: 60px;
  }
  .width120{
    width: 120px;
  }
  .width250{
    width: 250px;
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
  .tags {
    margin-right: 10px
  }
  .status-bar {
    float: left;
    margin-left: 50px;
    font-size: 20px;
    font-weight: bold;
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
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
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
</style>
