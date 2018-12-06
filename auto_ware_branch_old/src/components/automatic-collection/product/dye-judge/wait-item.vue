<template>
  <div class="data-checkbox">
    <div class="line">
      <div class="line1-item">丝车号</div>
      <div class="line1-item2 font-bold">{{item.silkCarNumber}}
        <span v-if="item.bindingSilkcarNumber"> * {{item.bindingSilkcarNumber}}</span>
      </div>
      <div class="line1-item">织袜时间</div>
      <div class="line1-item2">{{item.time | timeFormat('YYYY-MM-DD HH:mm')}}</div>
    </div>
    <div class="line">
      <div class="line1-item">批号</div>
      <div class="line1-item2">{{item.productionPlanBatchName}}</div>
      <div class="line1-item">线别</div>
      <div class="line1-item2">{{item.productionPlanLineName}}</div>
      <div class="line1-item">位号</div>
      <div class="line1-item2">{{item.productionPlanItem}}
        <span v-if="item.bindingItem "> * {{item.bindingItem}}</span>
      </div>
      <div class="line1-item">织袜工号</div>
      <div class="line1-item2">{{item.employeeNumber}}</div>
    </div>
    <div class="line">
      <div class="line1-item">班次</div>
      <div class="line1-item2">{{item.silkCodeClassesName}}</div>
      <div class="line1-item">落次</div>
      <div class="line1-item2">{{item.silkCodeFallNo}}
        <span v-if="item.bindingFallNo "> * {{item.bindingFallNo }}</span>
      </div>
      <div class="line1-item">织袜类型</div>
      <div :class="{green: item.hosieryType === '位与位交叉'}" class="line1-item2">{{ item.hosieryType }}</div>
      <div class="line1-item">落筒方式</div>
      <div class="line1-item2">{{item.fallType}}</div>
    </div>
    <div class="line">
      <div class="line2-item1">染判</div>
      <div class="line2-item2">
        <div class="dye-box">
          <div class="dye-item" v-for="(item2, index) in item.silkInfoBoList">
            <div style="cursor: pointer;" @click="item2.dyeCheck = !item2.dyeCheck" class="daye-itme-index">
              <i style="color: #8492a6" v-show="item2.dyeCheck" class="el-icon-check"></i>
              <span>{{item2.spindleNo ? item2.spindleNo : index + 1}}</span>
            </div>
            <div class="daye-itme-info" v-for="(item3, index3) in item2.silkExceptionRecordBoList">
              <div
                :class="{red: item3.downReasonId, hand: !(index3 === 0 && item2.silkExceptionRecordBoList.length > 1)}"
                class="daye-itme-info-btn" @click="dyeClick(item3, index3, item.flowType)">
                <el-tooltip placement="top">
                  <div slot="content"><span v-if="item3.abnormalFlag">是否异常：{{item3.abnormalFlag | abnormalFlag}}<br/></span>染判类型：{{item3.sentenceType}}<br/><span v-if="item3.gradeName">丝锭等级：{{item3.gradeName}}<br/></span><span v-if="item3.downReasonName">降等原因：{{item3.downReasonName}}<br/></span>备注：{{item3.remark}}</div>
                  <div v-show="item3.level">
                    <span v-show="item3.sentenceLevelName">{{item3.sentenceLevelName.substring(0, 2)}}/</span>
                    <span :class="showColor(item3.level)">{{item3.level}}</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="submit-box">
          <el-button style="display: block;margin: 0;" @click="dyeClick(item, 1, item.flowType, false, true)" size="small" type="primary">批量登记</el-button>
          <el-button style="display: block;margin: 0;" @click="dyeClick(item, 1, item.flowType, true)" size="small" type="primary">整车登记</el-button>
          <el-button style="display: block;margin: 0;" @click="submitClick(item)" size="small" type="primary">提交</el-button>
        </div>
      </div>
    </div>
    <div v-if="item.flowType === '6'" class="tag">
      <span>2次</span>
    </div>
    <div v-if="item.flowType === '13'" class="tag">
      <span>3次</span>
    </div>
  </div>
</template>

<script>
import * as api from 'api/index'
import storage from 'storage'
export default {
  components: {
  },
  props: ['item'],
  data () {
    return {
    }
  },
  filters: {
    abnormalFlag: (val) => {
      if (val) {
        if (val === '1') {
          return '异常'
        }
        return '正常'
      }
      return ''
    }
  },
  methods: {
    showColor (value) {
      if (value === 'F') {
        return 'color-f'
      }
      if (value === 'D') {
        return 'color-d'
      }
      if (value === 'L') {
        return 'color-l'
      }
      return 'color-of'
    },
    dyeClick (nowItem, index, type, isAllCar, isMulti) {
      let typeBoolean = false
      if (type === '6' || type === '13') {
        typeBoolean = true
      }
      if (index === 0 && typeBoolean) {
        return
      }
      this.$emit('openDialog', nowItem, typeBoolean, isAllCar, isMulti)
    },
    submitClick (submitItem) {
      this.$confirm('是否确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let params = JSON.parse(JSON.stringify(submitItem))
            for (let item of params.silkInfoBoList) {
              let item2 = item.silkExceptionRecordBoList
              for (let i in item2) {
                if (i === '0') {
                  item2[i].type = 5
                } else {
                  item2[i].type = 7
                }
              }
            }
            params.employeeId = storage.getUser().employeeId
            params.productionProcessId = storage.getUser().productionProcessId
            console.log(params)
            api.automatic.productionProcess.commitSentenceProcess(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.$emit('submitSuccess')
                done()
              }
            }).finally(() => {
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .color-f{
    color: #4dc1f1;
  }
  .color-d{
    color: #5ccd00;
  }
  .color-l{
    color: #faa107;
  }
  .color-of{
    color: #ff0000;
  }
  .green{
    color: green;
  }
  .font-bold{
    font-weight: bold;
  }
  .tag{
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    color: #fff;
    border: 15px solid #ff0000;
    border-bottom-color: transparent;
    border-right-color: transparent;
    span{
      width: 24px;
      display: block;
      font-size: 12px;
      margin-left: -15px;
      margin-top: -15px;
      transform: rotateZ(-45deg);
    }
  }
  .line{
    display: flex;
  }
  .line2-item1{
    flex: 9;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #eef2f6;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .line2-item2{
    flex: 87;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .dye-box{
    flex: 80;
    overflow: hidden;
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
  }
  .dye-item{
    width: 8.3333%;
    float: left;
  }
  .daye-itme-index{
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .daye-itme-info{
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
    padding: 6px;
  }
  .daye-itme-info-btn{
    border-radius: 3px;
    border: 1px solid #d2d6de;
    height: 24px;
    line-height: 24px;
    &.hand{
      cursor: pointer;
    }
    &.red{
      border-color: #FF4949;
    }
  }
  .submit-box{
    flex: 8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
  .line1-item{
    flex: 9;
    height: 42px;
    line-height: 42px;
    background-color: #eef2f6;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
    text-align: right;
  }
  .line1-item2{
    flex: 15;
    height: 42px;
    line-height: 42px;
    text-indent: 10px;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .data-checkbox {
    flex: 1;
  }
</style>
