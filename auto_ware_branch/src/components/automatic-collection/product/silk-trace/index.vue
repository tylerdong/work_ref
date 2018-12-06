<!-- 丝锭异常状态 -->
<template>
  <div>
    <!--<breadcrumb name-id="020508"></breadcrumb>-->

    <div class="content">
      <el-row>
        <div class="margin-bottom-1 text-align-right">
          <span v-show="!search.searchMore">
            <el-select
              class="inline-input margin-right-2 margin-bottom-2"
              v-model="search.silkNumber"
              filterable
              clearable
              remote
              placeholder="请输入丝锭编号"
              :remote-method="silkNumberRemote"
              :loading="loading.silkNumber">
              <el-option
                v-for="item in search.silkNumberList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </span>

          <el-button class="margin-left-1" type="primary" @click="handleSearch">查询</el-button>
        </div>
      </el-row>

      <div v-loading="loading.data">
        <div class="fixation">
          <ul class="content-list">
            <li>
              <h4>当前丝锭编号：{{ data.silkCode }}</h4>
              <p class="fixation-box">
                <span class="kv"><span class="note">批号：</span>{{ data.batchNo }}</span>
                <span class="kv"><span class="note">规格：</span>{{ data.spec }}</span>
                <span class="kv"><span class="note">等级：</span>{{ data.grade }}</span>
                <span class="kv"><span class="note">位号：</span>{{ data.item }}</span>
                <span class="kv"><span class="note">落次：</span>{{ data.fallNo }}</span>
                <span class="kv"><span class="note">锭号：</span>{{ data.spindleNo }}</span>
                <span class="kv"><span class="note">线别：</span>{{ data.lineName }}</span>
                <span class="kv"><span class="note">管色：</span>{{ data.paperTube }}</span>
                <span class="kv"><span class="note">锭重：</span>{{ data.silkWeight }}</span>
                <span class="kv"><span class="note">生产日期：</span>{{ data.productDate }}</span>
              </p>
            </li>
            <li v-for="(item, index) in data.silkFlowBoList">
              <h4>{{index + 1}}.&nbsp;{{item.processName}}</h4>
              <p class="fixation-box">
                <span class="kv"><span class="note">操作人：</span>{{ item.operator }}</span>
                <span class="kv"><span class="note">操作日期：</span>{{ item.operationTime | timeFormat('YYYY-MM-DD HH:mm:ss') }}</span>
                <span class="kv"><span class="note">操作：</span>{{item.operationName}}</span>
                <span v-if="item.processName !== '入库' && item.processName !== '出库'" class="kv"><span class="note">异常原因：</span>{{ item.reansonList ? item.reansonList.join(',') : '' }}</span>
                <span v-if="item.processName !== '入库' && item.processName !== '出库'" class="kv"><span class="note">等级：</span>{{ item.grade }}</span>
                <span v-if="item.processName === '入库'" class="kv"><span class="note">所在库位：</span>{{ item.storage }}</span>
                <span v-if="item.processName === '出库'" class="kv"><span class="note">出库类型：</span>{{ item.type }}</span>
                <span v-if="item.processName === '出库'" class="kv"><span class="note">装运点：</span>{{ item.gateHeadName }}</span>
                <span v-if="item.processName === '出库'" class="kv"><span class="note">车牌号：</span>{{ item.plateNumber }}</span>
                <span v-if="item.processName === '出库'" class="kv"><span class="note">销售员：</span>{{ item.saler }}</span>
                <span v-if="item.processName === '出库'" class="kv"><span class="note">客户名称：</span>{{ item.customerName }}</span>
                <span v-if="item.boxCode !== ''" class="kv"><span class="note">码单号：</span>{{ item.boxCode }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    mounted () {
    },
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        data: {
          silkFlowBoList: []
        },
        search: {
          searchMore: false,
          silkNumber: '',
          silkNumberList: [],
          silkNumberTimeout: ''
        },
        loading: {
          data: false,
          silkNumber: false
        }
      }
    },
    methods: {
      /* 获取丝锭编号下拉列表 */
      silkNumberRemote (val) {
        if (val) {
          clearTimeout(this.search.silkNumberTimeout)
          this.search.silkNumberTimeout = setTimeout(() => {
            this.loading.silkNumber = true
            api.automatic.statement.getSilkCodeSearchList({
              silkCode: val
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                console.log(data)
                let newData = []
                for (let item of data.data) {
                  newData.push({
                    value: item
                  })
                }
                this.search.silkNumberList = newData
              }
            }).catch(e => {
            }).finally(() => {
              this.loading.silkNumber = false
            })
          }, 300)
        }
      },

      /* 丝锭查询 */
      handleSearch () {
        if (!this.search.silkNumber) {
          return this.$message.error('丝锭编号不能为空')
        }
        this.loading.data = true
        api.automatic.barCode.getProductInfoBySilkCode({
          silkCode: this.search.silkNumber
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.data = data.data
            console.log(this.data)
          }
        }).catch(e => {
        }).finally(() => {
          this.loading.data = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
  .content {
    margin: 10px;
    padding: 10px;
    background-color: #fff;
  }

  .change-search {
    position: relative;
    top: 7px;
    text-decoration: underline;
    color: #3b9dd8;
    cursor: pointer;
  }

  .margin-left-1 {
    margin-left: 10px;
  }

  .margin-right-1 {
    margin-right: 5px;
  }

  .margin-right-2 {
    margin-right: 10px;
  }

  .margin-bottom-1 {
    margin-bottom: 10px;
  }

  .margin-bottom-2 {
    margin-bottom: 5px;
  }

  .text-align-right {
    text-align: left;
  }
  .exception{
    cursor: pointer;
  }

  .content-list>li {
    margin-top: 15px;
  }
  .space {
    font-size: 16px;
    color: #99a9bf;
    margin-left: 10px;
    margin-right: 10px;
  }
  h4 {
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: bold;
    span {
      font-weight: normal;
      margin-left: 5px;
    }
  }
  .kv {
    display: inline-block;
    margin-right: 20px;
  }
  .note {
    font-size: 13px;
    color: #99a9bf;
  }

  /*.note:before {*/
    /*content: '|';*/
    /*font-size: 16px;*/
    /*color: #99a9bf;*/
    /*margin-left: 10px;*/
    /*margin-right: 10px;*/
  /*}*/

  /*.note:first-child:before {*/
    /*content: ''*/
  /*}*/

  .fixation {
    flex: 0 0 450px;
  }
  .fixation-box {
    /*overflow: hidden;*/
    /*overflow-x: auto;*/
    /*text-overflow: ellipsis;*/
    /*word-break: normal;*/
    /*white-space: nowrap;*/
    width: 100%;
  }
</style>
