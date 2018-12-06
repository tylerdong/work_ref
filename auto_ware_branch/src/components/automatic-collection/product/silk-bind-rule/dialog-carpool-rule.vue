<!-- 新增落桶绑定 -->
<template>
  <el-dialog :title="dialog.title" width="90%" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" :inline="true" label-width="100px">

      <el-form-item label="车间" prop="workshopId">
        <el-select v-model="form.workshopId" placeholder="请选择车间" filterable class="input-item-16">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="丝车规格" prop="silkcarSpecId">
        <el-select v-model="form.silkcarSpecId" placeholder="请选择丝车规格" class="input-item-16" @change="renderBindPage">
          <el-option v-for="(item, index) in silkcarSpecList" :key="index" :label="item.spec" :value="item.id">
            <span style="float: left">{{ item.spec }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.desc }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div :style="tableDataStyle">
      <table class="order-table" v-if="tableData && silkBindRule.length > 0">
        <caption>{{silkcarSpec}}</caption>
        <template v-for="j in tableData.layer">
          <tr>
            <td><div class="silk-car">丝车1，层{{j}}</div>A面</td>
            <td>B面</td>
          </tr>
          <tr>
            <td>
              <table class="inner-table">
                <tr v-for="tr in tableData.row">
                  <td v-for="td in tableData.column" :style="tdStyle">
                    <div>
                      <!--{{(j - 1) * tableData.column * tableData.row * 2 + (tr - 1) *  tableData.column + td - 1}}-->
                      <input type="text" readonly v-model="silkBindRule[(j - 1) * tableData.column * tableData.row * 2 + (tr - 1) *  tableData.column + td - 1].silkcarPosition"/>
                      <input type="text" v-model="silkBindRule[(j - 1) * tableData.column * tableData.row * 2 + (tr - 1) *  tableData.column + td - 1].bindOrder"/>
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
                      <!--{{(j - 1) * tableData.column * tableData.row * 2 + (tr - 1) * tableData.column + td - 1 + tableData.row * tableData.column}}-->
                      <input type="text" readonly v-model="silkBindRule[(j - 1) * tableData.column * tableData.row * 2 + (tr - 1) * tableData.column + td - 1 + tableData.row * tableData.column].silkcarPosition"/>
                      <input type="text" v-model="silkBindRule[(j - 1) * tableData.column * tableData.row * 2 + (tr - 1) * tableData.column + td - 1 + tableData.row * tableData.column].bindOrder"/>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
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
    props: ['shopList', 'silkcarSpecList'],
    data () {
      return {
        width: document.body.clientWidth,
        height: window.screen.height,
        dialog: {visible: false, title: ''},
        loading: {btnSave: false},
        silkBindRule: [],
        bindRulesDetail: [],
        form: {
          id: '',
          // 车间
          workshopId: '',
          // 丝车规格
          silkcarSpecId: '',
          // 绑定方式
          bindType: '2'
        },
        tableData: [],
        option: {
          productLineList: []
        },
        rules: {
          workshopId: [{required: true, message: '请选择车间', trigger: 'change'}],
          silkcarSpecId: [{required: true, message: '请选择丝车规格', trigger: 'change'}]
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
        this.dialog.visible = true
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          if (data) {
            this.form.id = data.id
            this.form.silkcarSpecId = data.silkcarSpecId.toString()
            this.form.workshopId = data.workshopId
            this.form.linId = data.linId
            this.form.partNum = data.partNum
            this.getRulesDetail()
            this.dialog.title = '修改'
          } else {
            this.dialog.title = '新增'
            this.renderBindPage()
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
      /* 渲染绑定界面 */
      renderBindPage (bindRulesDetail) {
        this.silkBindRule = []
        this.tableData = this.silkcarSpecList.find(item => { return this.form.silkcarSpecId === item.id })
        if (this.tableData) {
          this.tableData.column = parseInt(this.tableData.column)
          this.tableData.row = parseInt(this.tableData.row)
          this.tableData.layer = parseInt(this.tableData.layer)
          this.tableData.spec = parseInt(this.tableData.spec)
          this.silkBindRule = []
          for (let i = 1; i <= this.tableData.spec; i++) {
            if (Array.isArray(bindRulesDetail) && bindRulesDetail.length > 0 && i <= bindRulesDetail.length) {
              this.silkBindRule.push({
                silkcarPosition: bindRulesDetail[i - 1].silkcarPosition,
                bindOrder: bindRulesDetail[i - 1].bindOrder
              })
            } else {
              let silkcarPosition = i
              let bindOrder = i.toString()
              this.silkBindRule.push({silkcarPosition: silkcarPosition, bindOrder: bindOrder})
            }
          }
        }
      },
      getDuplicates () {
        let result = {type: '', list: []}
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
            let params = {
              silkcarSpecId: this.form.silkcarSpecId,
              workshopId: this.form.workshopId,
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
                this.loading.submit = false
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
                this.loading.submit = false
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
          width: 50px;
          height: 60px;
          border-radius: 25px;
          border: 1px solid #ac2925;
          color: #ac2925;
        }
        input:nth-child(2) {
          border: 1px solid #3c763d;
          color: #3c763d;
        }
      }
    }
  }
</style>
