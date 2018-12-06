<!-- 新增 -->
<template>
  <el-dialog :title="dialog.title" width="80%" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" :inline="true" label-width="110px">

      <el-form-item label="车间" prop="workShopId">
        <el-select v-model="form.workShopId" placeholder="请选择车间" filterable @change="selectChangeShop"
                   class="input-item-16" :disabled="form.inputDisabled">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="线别" prop="productLine">
        <el-select v-model="form.productLine" placeholder="请选择线别" filterable class="input-item-16"
                   :disabled="form.inputDisabled" @change="getPartNum">
          <el-option v-for="item in option.productLineList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="落桶" prop="doffType">
        <el-select v-model="form.doffType" placeholder="请选择落桶方式" class="input-item-16" :disabled="form.inputDisabled">
          <el-option v-for="item in option.doffTypes" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="form.inputDisabled ? '机台位号' : '开始机台位号'" prop="item">
        <el-input-number v-model="form.item" placeholder="请输入开始位号" :min="1" :max="99" class="input-item-16"
                         :disabled="form.inputDisabled" @change="getPartNum"></el-input-number>
      </el-form-item>

      <el-form-item v-if="!form.inputDisabled" label="结束机台位号" prop="itemEnd">
        <el-input-number v-model="form.itemEnd" placeholder="请输入结束位号" :min="1" :max="99" class="input-item-16"
                         :disabled="form.inputDisabled" @change="getPartNum"></el-input-number>
      </el-form-item>

      <el-form-item label="卷绕头数" prop="partNum">
        <el-input v-model="form.partNum" placeholder="请输入卷绕头数" class="input-item-16" :disabled="form.inputDisabled" readonly>
        </el-input>
      </el-form-item>

      <el-form-item label="每行个数" prop="rowNum">
        <el-input-number v-model="form.rowNum" placeholder="请输入每行个数" :min="1" :max="99999999" class="input-item-16"
                         :disabled="form.inputDisabled"></el-input-number>
      </el-form-item>

    </el-form>
    <span style="display: none">{{JSON.stringify(this.doffRuleMap)}}</span>
    <table class="order-table" v-if="doffRuleMap && doffRuleMap.length > 0">
      <tr>
        <td v-for="col in form.rowNum">
          <span>顺序</span><i class="fas fa-angle-double-right"></i>锭号
        </td>
      </tr>
      <tr v-for="row in tableRow">
        <td v-for="col in form.rowNum" :style="tdStyle">
          <template v-if="((row-1) * form.rowNum + col) <= form.partNum && ((row-1) * form.rowNum + col) <= doffRuleMap.length">
            <span>{{(row-1) * form.rowNum + col}}</span><i class="fas fa-angle-double-right"></i>
            <input type="number" autocomplete="off" min="1" class="order-input"
                   v-model="doffRuleMap[(row-1) * form.rowNum + col - 1].spindleNo">
          </template>
        </td>
      </tr>
    </table>

    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnSave" :loading="loading.btnSave">确 定</el-button>
      <template v-if="Array.isArray(form.updataData) && form.updataData.length > 0">
        <el-button type="primary" @click="btnCopy">复制</el-button>
      </template>
      <el-button type="primary" @click="btnPaste"
                 v-if="storageRuleMap && Array.isArray(storageRuleMap.doffRuleMap) && storageRuleMap.partNum === form.partNum">粘贴</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import * as api from '../../../../api'
  import {doffTypes} from 'value-label'
  import storage from 'storage'

  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
      this.option.doffTypes = doffTypes
    },
    props: ['shopList'],
    data () {
      return {
        dialog: {visible: false, title: ''},
        loading: { btnSave: false },
        storageRuleMap: {},
        doffRuleMap: [],
        form: {
          id: '',
          inputDisabled: false,
          workShopId: '',
          productLine: '',
          // 落筒方式
          doffType: '1',
          // 开始机位
          item: 1,
          // 结束机位
          itemEnd: 2,
          // 卷绕头数
          partNum: '',
          // 每行个数
          rowNum: 4,
          // 更新时的打印顺序
          updataData: []
        },
        tableData: [],
        option: {
          productLineList: [],
          doffTypes: []
        },
        rules: {
          workShopId: [
            {required: true, message: '请选择车间', trigger: 'change'}
          ],
          productLine: [
            {required: true, message: '请选择线别', trigger: 'change'}
          ],
          item: [
            {
              required: true,
              trigger: 'change blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value > this.form.itemEnd) {
                    callback(new Error('开始机台位号大于结束机台位号'))
                  } else {
                    callback()
                  }
                } else {
                  callback(new Error('请选择开始机台位号'))
                }
              }
            }
          ],
          itemEnd: [
            {
              required: true,
              trigger: 'change blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value < this.form.item) {
                    callback(new Error('结束机台位号小于开始机台位号'))
                  } else {
                    callback()
                  }
                } else {
                  callback(new Error('请选择结束机台位号'))
                }
              }
            }
          ],
          partNum: [{required: true, message: '请选择卷绕头数', trigger: 'change'}]
        }
      }
    },
    computed: {
      tableRow: function () {
        return Math.ceil(this.form.partNum / this.form.rowNum)
      },
      tdStyle: function () {
        return {
          width: `${(1 / this.form.rowNum).toFixed(2)}%`,
          textAlign: 'center'
        }
      }
    },
    methods: {
      /* 打开 */
      btnOpen (data) {
        this.dialog.visible = true
        this.option.productLineList = []
        this.form.updataData = []
        this.storageRuleMap = storage.getPrintOrder()
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.doffRuleMap = []
          if (data) {
            this.form.inputDisabled = true
            this.form.id = data.doffSeqId
            this.form.workShopId = data.workShopId
            this.selectChangeShop(data.workShopId, data.lineId)
            this.form.doffType = data.doffType
            this.form.partNum = parseInt(data.partNum)
            this.form.item = parseInt(data.item)
            this.form.itemEnd = parseInt(data.item)
            this.form.rowNum = parseInt(data.rowNum)
            this.dialog.title = '修改'
            this.getDoffRuleInfo(data.doffSeqId)
          } else {
            this.form.inputDisabled = false
            this.dialog.title = '新增'
            this.getDoffRuleMap()
          }
        })
      },
      /* 检查所属车间 并获取线别列表 */
      selectChangeShop (id, lineId) {
        if (id) {
          this.form.productLine = ''
          this.option.productLineList = []
          api.automatic.productPlan.getAllLine({workShopId: id}).then(response => {
            const data = response.data
            for (let item of data.data) {
              this.option.productLineList.push({id: item.id, name: item.line})
            }
            if (lineId) {
              this.form.productLine = lineId
            }
          })
        }
      },
      /* 获取打印顺序 */
      getDoffRuleInfo (id) {
        api.automatic.other.getDoffRuleInfo({doffSeqId: id}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.form.updataData = data.data
            this.getDoffRuleMap()
          }
        })
      },
      // 获取卷绕头数
      getPartNum () {
        if (this.form.workShopId && this.form.productLine && this.form.item && this.form.itemEnd) {
          let param = {
            lineId: this.form.productLine,
            startItem: this.form.item,
            endItem: this.form.itemEnd
          }
          api.automatic.other.getProductionMachineInfo(param).then(response => {
            const data = response.data
            if (data.messageType === 1 && data.data) {
              this.form.partNum = parseInt(data.data[0].partNum)
              let maxItem = 0
              data.data.forEach(infor => { maxItem = Math.max(maxItem, infor.item) })
              if (this.form.itemEnd > parseInt(maxItem)) {
                this.form.itemEnd = parseInt(maxItem)
              }
            } else {
              this.$message({type: 'error', message: data.message})
              this.form.partNum = ''
            }
            this.getDoffRuleMap()
          })
        }
      },
      getDoffRuleMap () {
        this.doffRuleMap = []
        if (this.form.updataData.length > 0) {
          for (let i = 0; i < this.form.updataData.length; i++) {
            this.doffRuleMap.push({ printOrder: `${this.form.updataData[i].printOrder}`, spindleNo: `${this.form.updataData[i].spindleNo}` })
          }
        } else {
          for (let i = 0; this.form.partNum > 0 && i < this.form.partNum; i++) {
            let j = i + 1
            this.doffRuleMap.push({ printOrder: `${j}`, spindleNo: `${j}` })
          }
        }
      },
      // 查找重复
      duplicates (arr) {
        let result = []
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (Object.values(arr[i])[1] === Object.values(arr[j])[1]) {
              if (!result.includes(item => { return Object.values(arr[i])[1] === Object.values(item)[1] })) {
                result.push({location: Object.values(arr[j])[0], order: Object.values(arr[j])[1]})
              }
            }
          }
        }
        return result
      },
      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let checkResult = ''
            // 判断是否有重复的
            let invalidOrder = this.doffRuleMap.filter(val => { return !val.spindleNo || !/^[0-9]*[1-9][0-9]*$/.test(val.spindleNo) })
            if (invalidOrder.length > 0) {
              invalidOrder.forEach(val => {
                checkResult += '第' + Object.keys(val)[0] + '位打印顺序不对<br>'
              })
            }
            let dupArray = this.duplicates(this.doffRuleMap)
            if (dupArray.length > 0) {
              dupArray.forEach(el => {
                checkResult += '第' + el.location + '位顺序重复，重复值' + el.order + '<br>'
              })
            }
            if (checkResult.length > 0) {
              return this.$alert(checkResult, '错误', {confirmButtonText: '确定', type: 'error', dangerouslyUseHTMLString: true})
            }
            this.loading.btnSave = true
            // 判断是否存在重复的顺序
            let objectMap = {}
            for (let i = 0; i < this.doffRuleMap.length; i++) {
              Object.assign(objectMap, {[this.doffRuleMap[i].printOrder]: this.doffRuleMap[i].spindleNo})
            }
            if (this.dialog.title === '修改') {
              let param = {
                id: this.form.id,
                doffRuleMap: objectMap
              }
              api.automatic.other.updateDoffRuleInfo(param).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                }
              }).finally(() => {
                this.loading.btnSave = false
              })
            } else {
              let param = {
                workShopId: this.form.workShopId,
                lineId: this.form.productLine,
                doffType: this.form.doffType,
                partNum: this.form.partNum,
                rowNum: this.form.rowNum,
                item: '',
                doffRuleMap: {}
              }
              param.doffRuleMap = objectMap
              let itemArray = []
              for (let i = this.form.item; i <= this.form.itemEnd; i++) {
                itemArray.push(i)
              }
              param.item = itemArray.join(',')
              api.automatic.other.addDoffRuleGroupInfo(param).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                }
              }).finally(() => {
                this.loading.btnSave = false
              })
            }
          }
        })
      },
      btnCopy () {
        if (Array.isArray(this.doffRuleMap) && this.doffRuleMap.length > 0) {
          storage.setPrintOrder(
            {
              doffRuleMap: this.doffRuleMap,
              rowNum: this.form.rowNum,
              partNum: this.form.partNum,
              copyId: this.form.id
            }
          )
        } else {
          this.$message({ type: 'error', message: '没有数据' })
        }
      },
      btnPaste () {
        this.storageRuleMap = storage.getPrintOrder()
        if (Array.isArray(this.storageRuleMap.doffRuleMap) && this.storageRuleMap.doffRuleMap.length > 0) {
          let objectMap = {}
          for (let i = 0; i < this.storageRuleMap.doffRuleMap.length; i++) {
            Object.assign(objectMap, {[this.storageRuleMap.doffRuleMap[i].printOrder]: this.storageRuleMap.doffRuleMap[i].spindleNo})
          }
          this.doffRuleMap = this.storageRuleMap.doffRuleMap
          this.form.rowNum = this.storageRuleMap.rowNum
          this.form.partNum = this.storageRuleMap.partNum
        } else {
          this.$message({ type: 'error', message: '没有数据' })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .alert {
    color: red;
    border-radius: 0;
    padding: 0;
  }
  table.order-table {
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1.5rem;
    td {
      border-width: 1px;
      padding: 2px;
      border-style: solid;
      border-color: rgb(209, 219, 229);
      background-color: #ffffff;
      text-align: center;
      input {
        width: 4.5rem;
        height: 2.5rem;
        margin: 3px auto;
        padding: 0 2px;
      }
      i {
        margin: 0 2px;
      }
    }
  }
  .order-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
</style>
