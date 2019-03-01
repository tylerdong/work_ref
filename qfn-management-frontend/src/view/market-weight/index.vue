<style lang="less" scoped>
</style>

<template>
  <div>
    <Card shadow>
      <p slot="title">市场权重配置</p>
      <div class="clearfix">
        <div class="clearfix mb-20">
          <Button
            :loading="posting"
            @click="postMainData"
            class="fr"
            type="primary"
             v-check-promission="elements.dictionary.marketWeight.edit"
          >提交</Button></div>
        <Row :gutter="20">
          <Col span="4">
          <Card>
            <p slot="title">品名</p>
            <Select
              v-model="currentId"
              @on-change="handlerChangePM"
            >
              <Option
                v-for="item in pNameList"
                :value="item.key"
                :key="item.value"
              >{{ item.value }}</Option>
            </Select>
          </Card>

          </Col>
          <Col span="10">
          <Card>
            <p
              class="clearfix"
              slot="title"
            >
              权重配置</p>

            <div class="mb-10 clearfix">
              是否展示指数:
              <i-switch
                v-model="showIndexFlag"
                true-value="Y"
                false-value="N"
              />
              <Button
                class="fr"
                @click="handlerShowCreateConfigModal"
                size="small"
                type="success"
              >添加</Button>
            </div>
            <Table
              class="mb-10"
              :loading="loadingTable"
              :columns="tables.weight.columns"
              :data="tables.weight.data"
            ></Table>
            <div class="mb-20">权重系数总值：<strong :class="{'c-red': weightAllValue !== 1}">{{weightAllValue}}</strong></div>
            <div class="mb-20">
              <div class="mb-10 clearfix">RMB价格下限: <Input
                  class="mr-20"
                  v-model="feedbackData.cnPriceCeiling"
                  style="width:80px"
                />RMB价格上限: <Input
                  style="width:80px"
                  v-model="feedbackData.cnPriceFloor"
                /></div>
              <div class="clearfix">美元价格下限: <Input
                  v-model="feedbackData.usaPriceCeiling"
                  class="mr-20"
                  style="width:80px"
                />美元价格上限: <Input
                  v-model="feedbackData.usaPriceFloor"
                  style="width:80px"
                /></div>
            </div>
            <Alert>
              <p>1、来源类型分为网站和生产集团，针对生产集团，按照生产厂家中的集团</p>
              <p>2、显示层次指的是在app中每个品名显示的区域层次，在app中不提供层级下钻功能</p>
              <p>3、权重系数总和为1</p>
              <p>4、生产集团列表根据出厂价库中对应品名的相关生产集团</p>
            </Alert>
          </Card>
          </Col>
          <Col span="10">
          <Card>
            <p slot="title">销售区域层次</p>
            <Table
              class="mb-20"
              :loading="loadingTable"
              :columns="tables.area.columns"
              :data="tables.area.data"
            ></Table>
            <div v-if="feedbackData.collectSalesAreaClass" class="mb-10 clearfix">汇总层次币种
              <Select v-model="feedbackData.toCurrency" clearable style="width: 170px;" transfer="transfer">
                <Option v-for="(item, index) in currency" :value="item" :key="index">{{ item }}</Option>
              </Select>
            </div>
            <Alert>
              <p>1、区域生成层次可允许多选，针对每个品名，根据选中的层次生成对应的市场价信息</p>
              <p>2、显示层次指的是在app中每个品名显示的区域层次，在app中不提供层级下钻功能</p>
            </Alert>
          </Card>
          </Col>
        </Row>
      </div>
    </Card>

    <!--修改权重配置-->
    <Modal
      v-model="modals.config.isShow"
      title="权重配置"
      @on-ok="handlerSaveConfigModalData"
    >
      <Form
        ref="configForm"
        :model="modals.config.data"
        :label-width="80"
      >
        <FormItem
          label="来源类型"
          prop="sourceType"
        >
          <Select
            style="width:200px"
            v-model="currentConfigData.sourceType"
            @on-change="handlerChangeSourceType"
          >
            <Option
              v-for="item in weightDownList"
              :value="item.key"
              :key="item.key"
            >{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="数据来源"
          prop="matchName"
        >
          <Select
            style="width:200px"
            v-model="currentConfigData.sourceCode"
          >
            <Option
              v-for="item in objWeightConfig[currentConfigData.sourceType]"
              :value="item.key"
              :key="item.key"
            >{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="权重系数"
          prop="description"
        >
          <Input
            placeholder="请输入描述"
            v-model="currentConfigData.weightRatio"
            style="width:100px"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import _ from 'lodash'
import api from '@/api/dataManager'
import elements from '@/config/elements'
import {currency} from '@/config/option'
export default {
  name: 'market-weight',
  components: {
  },
  data () {
    return {
      currency,
      elements: elements,
      posting: false,
      loadingTable: false,
      isAdd: true,
      objWeightConfig: {},
      showIndexFlag: 'Y',
      tables: {
        weight: {
          data: [],
          columns: [
            { title: '来源类型',
              width: 120,
              render: (h, params) => {
                const cIdx = _.findIndex(this.weightDownList, { key: params.row.sourceType })
                return h('span', this.weightDownList[cIdx].value)
              }
            },
            { title: '数据来源',
              minWidth: 120,
              key: 'sourceCode',
              render: (h, params) => {
                const cIdx = _.findIndex(this.objWeightConfig[params.row.sourceType], { key: params.row.sourceCode })
                return h('span', this.objWeightConfig[params.row.sourceType][cIdx].value)
              }
            },
            { title: '权重系数', width: 100, key: 'weightRatio' },
            { title: '操作',
              width: 150,
              key: 'handle',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.handlerShowEditConfigModal(params.index)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, [h('Poptip', {
                    props: {
                      confirm: true,
                      transfer: true,
                      placement: 'left-end',
                      title: '确定是否删除？',
                      type: 'error',
                      size: 'small',
                      width: '200'
                    },
                    on: {
                      'on-ok': () => {
                        this.tables.weight.data.splice(params.index, 1)
                      }
                    }
                  }, '删除')])
                ])
              }
            }
          ]
        },
        area: {
          data: [],
          columns: [
            { title: '层次', width: 70, key: 'key' },
            { title: '说明', minWidth: 120, key: 'value' },
            { title: '生成层次',
              width: 100,
              render: (h, params) => {
                const that = this
                return h('Checkbox', {
                  props: {
                    value: params.row.createdChecked
                  },
                  on: {
                    'on-change': function (data) {
                      that.tables.area.data[params.index]['createdChecked'] = data
                    }
                  }
                })
              }
            },
            {
              title: '显示层次',
              width: 100,
              render: (h, params) => {
                const that = this
                return h('Radio', {
                  props: {
                    value: that.feedbackData.showSalesAreaClass === params.row.key
                  },
                  on: {
                    'on-change': function () {
                      that.feedbackData.showSalesAreaClass = params.row.key
                    }
                  }
                })
              }
            },
            {
              title: '汇总层次',
              width: 100,
              render: (h, params) => {
                const that = this
                return h('Radio', {
                  props: {
                    value: that.feedbackData.collectSalesAreaClass === params.row.key
                  },
                  on: {
                    'on-change': function () {
                      that.feedbackData.collectSalesAreaClass = params.row.key
                    }
                  }
                })
              }
            }
          ]
        }
      },
      pNameList: [],
      currentId: '',
      modals: {
        config: {
          loading: true,
          isShow: false,
          data: {}
        }
      },
      currentConfigData: { sourceType: '', sourceCode: '', weightRatio: 0 },
      weightDownList: [],
      sourceDownList: [],
      areaList: [],
      // 回填的数据
      feedbackData: {},
      postData: {
        calculateConfigDetails: [

        ],
        calculateConfigProps: [{ sourceType: '', sourceCode: '', weightRatio: '0.3' }]
      } // 提交数据
    }
  },
  computed: {
    weightAllValue () {
      const va = [...this.tables.weight.data]
      let count = 0
      va.forEach(el => {
        count += el.weightRatio * 1000
      })
      return (count / 1000).toFixed(1)
    }
  },
  methods: {
    // 获取权重配置品名
    getCateWeightList () {
      return new Promise((resolve, reject) => {
        api.getCateWeight().then(res => {
          if (res.code === 1000) {
            this.pNameList = [...res.data].map(el => {
              el.key = parseInt(el.key)
              return el
            })
            this.currentId = this.pNameList[0].key
          }
          resolve(res)
        })
      })
    },
    // 获取权重配置来源等下拉列表
    getWeightConfigList () {
      api.getWeightConfigOptions().then(res => {
        if (res.code === 1000) {
          this.weightDownList = [...res.data]
          this.weightDownList.forEach(el => {
            this.objWeightConfig[el.key] = el.utilsVoList
          })
        }
      })
    },
    // 获取销售区域层次数据
    getAllSalesAreaClass () {
      return new Promise((resolve, reject) => {
        api.getAllSalesAreaClass().then(res => {
          if (res.code === 1000) {
            this.areaList = [...res.data]
          }
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 权重配置弹层保存
    handlerSaveConfigModalData () {
      if (this.currentConfigData.id) {
        // 修改
        const tabelData = [...this.tables.weight.data]
        tabelData[this.currentConfigData.index] = this.currentConfigData
        this.tables.weight.data = tabelData
      } else {
        // 新增
        const weightList = [...this.tables.weight.data, this.currentConfigData]
        this.tables.weight.data = weightList
      }
    },
    // 显示新增权重配置弹层
    handlerShowCreateConfigModal () {
      this.currentConfigData = { sourceType: '', sourceCode: '', weightRatio: 0 }
      this.modals.config.isShow = true
    },
    // 显示修改权重配置弹层
    handlerShowEditConfigModal (idx) {
      this.modals.config.isShow = true
      this.currentConfigData = JSON.parse(JSON.stringify(this.tables.weight.data[idx]))
      this.currentConfigData.index = idx
    },
    // 回填的数据
    getWeightConfigInfo () {
      this.loadingTable = true
      api.getWeightConfigInfo({ cetagoryId: this.currentId }).then(res => {
        this.loadingTable = false
        if (res.code === 1000) {
          if (res.data.length === 0) {
            // 没有以前数据
            this.isAdd = true
            this.feedbackData = {
              cnPriceCeiling: 0,
              cnPriceFloor: 0,
              usaPriceCeiling: 0,
              usaPriceFloor: 0,
              'collectSalesAreaClass': 0,
              'details': [],
              'propList': [],
              'showSalesAreaClass': 0,
              toCurrency: ''
            }
            this.tables.weight.data = [...this.feedbackData.propList]
            this.tables.area.data = this.computeAreaData()
          } else {
            this.isAdd = false
            this.feedbackData = JSON.parse(JSON.stringify(res.data[0]))
            this.tables.weight.data = [...this.feedbackData.propList]
            this.tables.area.data = this.computeAreaData()
          }
        }
      })
    },
    // 修改品名
    handlerChangePM (data) {
      this.currentId = data
      this.getWeightConfigInfo()
    },
    // 删除权重配置项
    delWeightConfig (idx) {
      this.postData.calculateConfigProps.splice(idx, 1)
    },
    // 层次数据和选中信息合并
    computeAreaData () {
      const originAreaList = [...this.areaList] // 初始层次数据
      const checkedData = [...this.feedbackData.details] // 生成层次数据
      const showSalesAreaClass = this.feedbackData.showSalesAreaClass // 显示层次
      const collectSalesAreaClass = this.feedbackData.collectSalesAreaClass // 汇总层次

      originAreaList.forEach((el, idx) => {
        el.showSalesAreaClass = showSalesAreaClass
        el.collectSalesAreaClass = collectSalesAreaClass
        const cjIndex = _.findIndex(checkedData, { salesAreaClass: parseInt(el.key) })

        if (cjIndex > -1) {
          el.createdChecked = true
        } else {
          el.createdChecked = false
        }
        Object.assign(el, checkedData[cjIndex])
        return el
      })
      return originAreaList
    },
    handlerChangeSourceType () {

    },
    // 获取选中的生成层次数据
    getCheckedCreateLevel (arr) {
      const checked = arr.filter(el => {
        if (el.createdChecked === true) {
          el.categoryConfigId = el.categoryConfigId || undefined// 配置的主键id 新增没有，修改和删除有
          el.salesAreaClass = el.key
          el.salesAreaClassSource = 0// 销售区域生成层次的来源层次 暂时不用
          return el
        }
      })
      return checked
    },
    // 保存数据修改
    postMainData () {
      if (parseInt(this.weightAllValue) !== 1) {
        this.$Message.error({
          content: '权重系数总值不为1，无法提交数据',
          duration: 3
        })
        return false
      }

      if (this.feedbackData.cnPriceCeiling > this.feedbackData.cnPriceFloor) {
        this.$Message.error({
          content: 'RMB价格下限比上限大有错误！',
          duration: 3
        })
        return false
      }

      if (this.feedbackData.usaPriceCeiling > this.feedbackData.usaPriceFloor) {
        this.$Message.error({
          content: '美元价格下限比上限大有错误！',
          duration: 3
        })
        return false
      }

      if (this.feedbackData.collectSalesAreaClass && !this.feedbackData.toCurrency) {
        return this.$Message.error({content: '请选择汇总层次币种！', duration: 3})
      }

      const data = {
        'categoryConfigDetails': [{
          'categoryConfigId': 0, // 配置的主键id 新增没有，修改和删除有
          'salesAreaClass': 0, // 销售区域层级,生成层次
          'salesAreaClassSource': 0// 销售区域生成层次的来源层次 暂时不用
        }],
        // "categoryConfigProps": [{
        //   "categoryConfigId": 0,// //配置的主键id 新增没有，修改和删除有
        //   "manufacturerGroupId": 0, //所选集团id
        //   "sourceCode": "string",  //来源code(zc，CCF，ETL)',
        //   "sourceType": "string", //GENERATE_GROUP:集团，WEBSITE 也就是WEB爬取
        //   "weightRatio": "string" //权重比
        // }],
        categoryConfigProps: [],
        'collectSalesAreaClass': this.feedbackData.collectSalesAreaClass, // 汇总区域层级',
        'desc': '', // 描述
        'id': this.feedbackData.id || undefined, // 主键id 最外层
        'name': '', // 当前配置权重的名称
        'productCategoryId': this.currentId, // 类目id
        'showIndexFlag': this.showIndexFlag, // 是否展示指数（Y,N）',
        'showSalesAreaClass': this.feedbackData.showSalesAreaClass, // '显示区域层级',
        'cnPriceCeiling': this.feedbackData.cnPriceCeiling, // 'RMB价格上限',
        'cnPriceFloor': this.feedbackData.cnPriceFloor, // 'RMB价格下限',
        'usaPriceCeiling': this.feedbackData.usaPriceCeiling, // '美元价格上限',
        'usaPriceFloor': this.feedbackData.usaPriceFloor, // '美元价格下限',
        toCurrency: this.feedbackData.toCurrency // 汇总层次币种
      }

      // 权重配置数据
      const categoryConfigProps = this.tables.weight.data.map(el => {
        if (el.sourceType === 'GENERATE_GROUP') {
          el.manufacturerGroupId = el.sourceCode
        } else {
          el.manufacturerGroupId = undefined
        }
        return el
      })
      data.categoryConfigProps = categoryConfigProps

      // 销售区域层次数据
      const categoryConfigDetails = this.getCheckedCreateLevel(this.tables.area.data)
      data.categoryConfigDetails = categoryConfigDetails
      this.posting = true
      api.addWeightConfig(data).then(res => {
        this.posting = false
        if (res.code === 1000) {
          this.$Message.success(res.message)
        } else {
          this.$Message.error(res.message)
        }
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  },
  mounted () {
    this.getWeightConfigList()
    const cateWeightList = this.getCateWeightList()
    const allSalesAreaClass = this.getAllSalesAreaClass()
    Promise.all([cateWeightList, allSalesAreaClass]).then(res => {
      this.getWeightConfigInfo()
    })
  }

}
</script>
