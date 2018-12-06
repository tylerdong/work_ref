<!-- 新增落桶绑定 -->
<template>
  <el-dialog :title="dialog.title" width="90%" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" :inline="true" label-width="100px">

      <el-form-item label="车间" prop="workshopId">
        <el-select v-model="form.workshopId" placeholder="请选择车间" filterable @change="selectChangeShop" class="input-item-16">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开始线别" prop="startLine">
        <el-select v-model="form.startLine" placeholder="请选择开始线别" filterable class="input-item-16" @change="getSilkNum">
          <el-option v-for="item in option.productLineList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="结束线别" prop="endLine">
        <el-select v-model="form.endLine" placeholder="请选择结束线别" filterable class="input-item-16" @change="getSilkNum">
          <el-option v-for="item in option.productLineList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="卷绕头数" prop="silkNum">
        <el-select v-model="form.silkNum" placeholder="请选择卷绕头数" class="input-item-16" @change="renderBindPage">
          <el-option v-for="(item, index) in option.silkNumbs" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="丝车规格" prop="silkcarSpecId">
        <el-select v-model="form.silkcarSpecId" placeholder="请选择丝车规格" class="input-item-16" @change="renderBindPage">
          <el-option v-for="(item, index) in silkcarSpecList" :key="index" :label="item.spec" :value="item.id"
                     :disabled="form.silkcarNum > 1 && item.layer > 1">
            <span style="float: left">{{ item.spec }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.desc }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="丝车数">
        <el-input-number v-model="form.silkcarNum" placeholder="请输入丝车数" :min="1" :max="99999999" class="input-item-16"
                         @change="renderBindPage" :disabled="tableData && tableData.layer > 1">
        </el-input-number>
      </el-form-item>

      <el-form-item label="机位数">
        <el-input-number v-model="form.itemNum" placeholder="请输入机位数" :min="1" :max="99999999" class="input-item-16"
                         @change="renderBindPage"></el-input-number>
      </el-form-item>

      <el-form-item label="落筒" prop="doffType">
        <el-select v-model="form.doffType" placeholder="请选择落桶方式" class="input-item-16">
          <el-option v-for="item in doffTypes" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="input-item-30 description">
        <ul>
          <li><span>锭号</span><div class="spindle-no">&nbsp;</div></li>
          <li><span>丝车位置</span><div class="silk-car-position">&nbsp;</div></li>
          <li><span>绑定顺序</span><div class="bind-order">&nbsp;</div></li>
        </ul>
      </el-form-item>

    </el-form>
    <div :style="tableDataStyle">
      <!--{{JSON.stringify(this.silkBindRule)}}-->
        <table class="order-table" v-if="tableData && silkBindRule && silkBindRule.length > 0">
          <caption>{{silkcarSpec}}</caption>
          <template v-for="i in form.silkcarNum">
            <template v-for="j in tableData.layer">
              <tr>
              <td><div class="silk-car">丝车{{i}}，层{{j}}</div> A面</td>
              <td>B面</td>
            </tr>
              <tr>
              <td>
                  <table class="inner-table">
                    <tr v-for="tr in tableData.row">
                      <td v-for="td in tableData.column" :style="tdStyle">
                        <div>
                          <!--<span>{{i}} {{j}} {{tr}} {{td}} {{(i - 1) * tableData.spec + (j - 1) * tableData.column * tableData.row * 2  + (tr - 1) *  tableData.column + td - 1}}</span>-->
                          <input type="text"
                                 v-model="silkBindRule[(i - 1) * tableData.spec + (j - 1) * tableData.column * tableData.row * 2  + (tr - 1) *  tableData.column + td - 1].spindleNo"/>
                          <input type="text" readonly
                                 v-model="silkBindRule[(i - 1) * tableData.spec + (j - 1) * tableData.column * tableData.row * 2  + (tr - 1) *  tableData.column + td - 1].silkcarPosition"/>
                          <input type="text"
                                 v-model="silkBindRule[(i - 1) * tableData.spec + (j - 1) * tableData.column * tableData.row * 2  + (tr - 1) *  tableData.column + td - 1].bindOrder"/>
                        </div>
                      </td>
                    </tr>
                  </table>
              </td>
              <td>
                <table class="inner-table">
                  <tr v-for="tr in tableData.row">
                    <td v-for="td in tableData.column" :style="tdStyle">
                      <div>
                        <!--<span>{{i}} {{j}} {{tr}} {{td}} {{(i - 1) * tableData.spec + (j - 1) * tableData.column * tableData.row * 2 + tableData.row * tableData.column + (tr - 1) *  tableData.column + td - 1}}</span>-->
                        <input type="text"
                               v-model="silkBindRule[(i - 1) * tableData.spec + (j - 1) * tableData.column * tableData.row * 2 + tableData.row * tableData.column + (tr - 1) *  tableData.column + td - 1].spindleNo"/>
                        <input type="text" readonly
                               v-model="silkBindRule[(i - 1) * tableData.spec + (j - 1) * tableData.column * tableData.row * 2 + tableData.row * tableData.column + (tr - 1) *  tableData.column + td - 1].silkcarPosition"/>
                        <input type="text"
                               v-model="silkBindRule[(i - 1) * tableData.spec + (j - 1) * tableData.column * tableData.row * 2 + tableData.row * tableData.column + (tr - 1) *  tableData.column + td - 1].bindOrder"/>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            </template>
          </template>
        </table>
    </div>
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnSave" :loading="loading.btnSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import * as api from '../../../../api'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
    },
    props: ['shopList', 'silkcarSpecList', 'doffTypes'],
    data () {
      return {
        width: document.body.clientWidth,
        height: window.screen.height,
        dialog: {visible: false, title: ''},
        loading: {btnSave: false},
        // 绑定数据
        silkBindRule: [],
        form: {
          id: '',
          // 车间
          workshopId: '',
          // 开始线别
          startLine: '',
          // 结束线别
          endLine: '',
          // 丝车规格
          silkcarSpecId: '',
          // 丝车数量
          silkcarNum: 1,
          // 卷绕头数
          silkNum: '',
          // 机位数
          itemNum: 1,
          // 落桶方式
          doffType: '1',
          // 绑定方式
          bindType: '1'
        },
        tableData: [],
        option: {
          productLineList: [],
          silkNumbs: []
        },
        rules: {
          silkcarSpecId: [{required: true, message: '请选择丝车规格', trigger: 'change'}],
          workshopId: [
            {required: true, message: '请选择车间', trigger: 'change'}
          ],
          startLine: [
            {required: true, message: '请选择开始线别', trigger: 'change'}
          ],
          endLine: [
            {required: true, message: '请选择结束线别', trigger: 'change'}
          ],
          silkNum: [{required: true, message: '请选择卷绕头数', trigger: 'change'}],
          doffType: [{required: true, message: '请选择落桶方式', trigger: 'change'}]
        }
      }
    },
    computed: {
      tableDataStyle: function () {
        return {
          // width: `${this.width * 0.85}px`,
          width: '100%',
          height: `${this.height * 0.4}px`,
          overflow: 'auto',
          marginBottom: '22px'
        }
      },
      tdStyle: function () {
        return {
          width: `${(1 / (this.tableData.column * 2)).toFixed(2)}%`,
          textAlign: 'center'
        }
      },
      silkcarSpec: function () {
        if (this.form.silkcarSpecId) {
          let silkcar = this.silkcarSpecList.find(item => { return item.id === this.form.silkcarSpecId })
          return `${silkcar.desc}共${silkcar.spec}锭`
        }
      }
    },
    methods: {
      /* 打开 */
      btnOpen (data) {
        console.log(data)
        this.dialog.visible = true
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          if (data) {
            this.form.id = data.id
            this.form.silkcarSpecId = data.silkcarSpecId.toString()
            this.form.workshopId = data.workshopId
            // 根据车间选择线别
            this.selectChangeShop(data.workshopId)
            this.form.startLine = data.startLine
            this.form.endLine = data.endLine
            this.form.silkcarNum = data.silkcarNum
            this.form.silkNum = data.silkNum
            this.form.itemNum = data.itemNum
            this.form.doffType = data.doffType
            this.form.bindType = data.bindType
            this.getSilkNum(undefined, data.silkNum)
            this.getRulesDetail()
            this.dialog.title = '修改'
          } else {
            this.dialog.title = '新增'
            this.silkBindRule = []
            this.form.silkcarSpecId = ''
            this.form.silkcarNum = 1
            this.form.silkNum = ''
            this.form.itemNum = 1
            this.form.doffType = '1'
          }
        })
      },
      getRulesDetail () {
        let params = { ruleId: this.form.id }
        api.automatic.dictionary.getSilkBindRulesDetail(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.renderBindPage(data.data)
          } else {
            this.$message({type: 'error', message: data.message})
          }
        })
      },
      /* 检查所属车间 并获取线别列表 */
      selectChangeShop (id) {
        if (id) {
          this.form.startLine = ''
          this.form.endLine = ''
          this.option.productLineList = []
          api.automatic.productPlan.getAllLine({workShopId: id}).then(response => {
            const data = response.data
            for (let item of data.data) {
              this.option.productLineList.push({id: item.id, name: item.line})
            }
          })
        }
      },
      // 根据车间，开始线别，结束线别查找丝锭数
      getSilkNum (val, silkNum) {
        if (this.form.workshopId && this.form.startLine && this.form.endLine) {
          this.form.silkNum = ''
          let params = {
            workshopId: this.form.workshopId,
            startLine: this.form.startLine,
            endLine: this.form.endLine
          }
          api.automatic.device.getDistinctSilkNum(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              this.option.silkNumbs = data.data
              if (silkNum) {
                this.form.silkNum = silkNum
              }
            } else {
              this.$message({type: 'error', message: data.message})
            }
          })
        }
      },
      /* 渲染绑定界面 */
      renderBindPage (bindRulesDetail) {
        this.silkBindRule = []
        this.tableData = this.silkcarSpecList.find(item => { return this.form.silkcarSpecId === item.id.toString() })
        if (this.tableData) {
          this.tableData.column = parseInt(this.tableData.column)
          this.tableData.row = parseInt(this.tableData.row)
          this.tableData.layer = parseInt(this.tableData.layer)
          this.tableData.spec = parseInt(this.tableData.spec)
          // this.form.silkcarNum 丝车位置数量
          let position = this.form.silkcarNum * this.tableData.spec
          // 绑定数量
          let bindNum = this.form.silkNum * this.form.itemNum
          for (let i = 1; i <= position; i++) {
            if (Array.isArray(bindRulesDetail) && bindRulesDetail.length > 0 && i <= bindRulesDetail.length) {
              this.silkBindRule.push({
                spindleNo: bindRulesDetail[i - 1].spindleNo,
                silkcarPosition: bindRulesDetail[i - 1].silkcarPosition,
                bindOrder: bindRulesDetail[i - 1].bindOrder
              })
            } else {
              let silkcarPosition = i
              let bindLocation = (i % this.form.silkNum) === 0 ? this.form.silkNum : (i % this.form.silkNum)
              let bindOrder = i <= bindNum ? i.toString() : ''
              let spindleNo = i <= bindNum ? bindLocation.toString() : ''
              this.silkBindRule.push({spindleNo: spindleNo, silkcarPosition: silkcarPosition, bindOrder: bindOrder})
            }
          }
        }
      },
      getDuplicates () {
        let result = {type: '', list: []}
        // 检查同一个机位锭号是否重复
        // for (let i = 0; i < this.form.itemNum; i++) {
        //   for (let j = this.form.silkNum * i; j < this.form.silkNum * (i + 1); j++) {
        //     for (let k = j + 1; k < this.form.silkNum * (i + 1); k++) {
        //       if (this.silkBindRule[j].spindleNo !== '' && this.silkBindRule[k].spindleNo !== '' &&
        //         this.silkBindRule[j].spindleNo === this.silkBindRule[k].spindleNo) {
        //         result.list.push(this.silkBindRule[j])
        //         result.list.push(this.silkBindRule[k])
        //         result.type = '锭号'
        //         break
        //       }
        //     }
        //     if (result.list.length > 0) break
        //   }
        //   if (result.list.length > 0) break
        // }
        // 检查绑定顺序是否有重复
        for (let i = 0; i < this.silkBindRule.length; i++) {
          for (let j = i + 1; j < this.silkBindRule.length; j++) {
            if (this.silkBindRule[i].bindOrder !== '' && this.silkBindRule[j].bindOrder !== '' &&
              this.silkBindRule[i].bindOrder === this.silkBindRule[j].bindOrder) {
              result.list.push(this.silkBindRule[i])
              result.list.push(this.silkBindRule[j])
              result.type = '绑定顺序'
              break
            }
          }
          if (result.list.length > 0) break
        }
        return result
      },
      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let duplicateSpin = this.getDuplicates()
            if (duplicateSpin.list.length > 0) {
              return this.$message({
                type: 'error',
                message: `第${duplicateSpin.list[0].silkcarPosition}位和第${duplicateSpin.list[1].silkcarPosition}上的${duplicateSpin.type}重复`
              })
            }
            this.loading.btnSave = true
            let params = {
              silkcarSpecId: this.form.silkcarSpecId,
              silkcarNum: this.form.silkcarNum,
              silkNum: this.form.silkNum,
              itemNum: this.form.itemNum,
              startLine: this.form.startLine,
              endLine: this.form.endLine,
              workshopId: this.form.workshopId,
              doffType: this.form.doffType,
              bindType: this.form.bindType,
              silkBindRuleDetailList: this.silkBindRule
            }
            if (this.dialog.title === '新增') {
              api.automatic.dictionary.addSilkBindRules(params).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.btnSave = false
              })
            } else {
              Object.assign(params, {id: this.form.id})
              api.automatic.dictionary.updateSilkBindRules(params).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.btnSave = false
              })
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  table.order-table {
    margin: 2rem 0;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1.5rem;
    caption {
      text-align: center;
    }
    td {
      border-width: 1px;
      padding: 3px;
      border-style: solid;
      border-color: rgb(209, 219, 229);
      background-color: #ffffff;
      text-align: center;
      input {
        width: 4.5rem;
        height: 2.5rem;
        margin: 4px auto;
      }
      .silk-car {
        display: inline-block;
        float: left;
        font-weight: bold;
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
  .inner-table {
    border: none;
    border-width: 0 !important;
    td {
      border-width: 0 !important;
      div {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        border: 1px solid #dcdfe6;
        display: flex;
        flex-direction: column;
        input {
          width: 30px;
          height: 30px;
          text-align: center;
          border-radius: 15px;
          border: 1px solid #808185;
          background:no-repeat 0 0 scroll #fff;
          outline: medium;
        }
        input:first-child{
          border: 1px solid #3c763d;
          color: #3c763d;
        }
        input:nth-child(2) {
          width: 50px;
          height: 60px;
          border-radius: 25px;
          border: 1px solid #ac2925;
          color: #ac2925;
        }
        input:last-child{
          border: 1px solid #1d90e6;
          color: #1d90e6;
        }
      }
    }
  }
  .description {
    vertical-align: middle;
    /*position: absolute;*/
    ul {
      li {
        float: left;
        height: 45px;
        line-height: 45px;
        span {
          display: inline-block;
          margin: 0 8px 0 20px;
        }
        div {
          display: inline-block;
          height: 50px;
          line-height: 50px;
        }
      }
    }
  }
  .spindle-no {
    border: 1px solid #3c763d;
    width: 30px;
    height: 30px !important;
    line-height: 30px !important;
    border-radius: 20px;
  }
  .silk-car-position {
    border: 1px solid #ac2925;
    width: 50px;
    height: 50px;
    border-radius: 30px;
  }
  .bind-order {
    border: 1px solid #1d90e6;
    width: 30px;
    height: 30px !important;
    line-height: 30px !important;
    border-radius: 20px;
  }
</style>
