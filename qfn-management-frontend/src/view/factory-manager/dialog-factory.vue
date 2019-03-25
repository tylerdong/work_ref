<template>
  <Modal v-model="modal.show" :title="modal.title" class="pop-modal" width="900">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem label="企业名称" prop="fullName">
            <Input placeholder="请输企业名称" v-model="form.fullName" clearable/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="企业简称" prop="name">
            <Input placeholder="请输入企业简称" v-model="form.name" clearable/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="企业简称拼音" prop="pinyinName">
            <Input placeholder="请输企业简称拼音" v-model="form.pinyinName" clearable/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="企业别名" prop="matchName">
            <Input placeholder="请输入企业别名" v-model="form.matchName" clearable/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="所属集团" prop="groupId">
            <Select v-model="form.groupId" clearable filterable>
              <Option v-for="(item, index) in group" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="所属行业" prop="tradeCode">
            <Select v-model="form.tradeCode" clearable>
              <Option v-for="(item, index) in industry"
                      :value="item.industryName"
                      :key="index">{{ item.showIndustryName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="企业类型" prop="enterpriseType">
            <Select v-model="form.enterpriseType" clearable>
              <Option v-for="(item, index) in enterpriseType" :value="item.typeName" :key="index">{{ item.showTypeName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="公司地址" prop="addr">
            <Input placeholder="请输入公司地址" v-model="form.addr" clearable/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="主营产品">
            <div class="tree-container">
              <Tree ref="category" :data="category" change-on-select show-checkbox></Tree>
            </div>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="销售区域" prop="salesAreaName">
            <div class="tree-container">
              <Tree ref="area" :data="area" @on-select-change="areaSelectChange"></Tree>
            </div>
            <Input placeholder="请选择销售区域" v-model="form.salesAreaName"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="公司负责人" prop="chargePerson">
            <Input placeholder="请输入公司负责人" v-model="form.chargePerson" clearable/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="经纬度">
            <div class="city-div ll">
              <Input placeholder="请输入经度" v-model="form.longitude" clearable/>
              <Input placeholder="请输入维度" v-model="form.latitude" clearable/>
            </div>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="联系电话" prop="tel">
            <Input placeholder="请输入联系电话" v-model="form.tel" clearable/>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="注册资金" prop="registeredCapital">
            <Input placeholder="请输入注册资金" v-model="form.registeredCapital" clearable/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="注册时间" prop="registeredDate">
            <DatePicker type="date"
                        v-model="form.registeredDate"
                        placeholder="请选择注册时间"
                        clearable
                        :transfer="true"
                        :options="registeredDateOption"
                        format="yyyy-MM-dd"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="公司网址" prop="officialWebsite">
            <Input placeholder="请输入公司网址" v-model="form.officialWebsite" clearable/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="行政地址">
            <comp-city ref="compCity" @citySelected="citySelected"></comp-city>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="备注" prop="remark">
            <Input placeholder="请输入备注" v-model="form.remark" type="textarea" clearable/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modal.show=false">取消</Button>
      <Button type="primary" size="large" :loading="loading.modal" @click="btnConfirm">确定</Button>
    </div>
  </Modal>
</template>

<script>
import api from './../../api'
import {Type} from '../../libs/tools'
import dateFns from 'date-fns'
export default {
  components: {
    'comp-city': require('../../components/city/comp-city').default
  },
  props: ['area', 'category', 'group', 'enterpriseType', 'industry'],
  data () {
    return {
      modal: {show: false, title: '新增'},
      loading: {modal: false},
      form: {
        name: '',
        matchName: '',
        fullName: '',
        pinyinName: '',
        groupId: '',
        tradeCode: '',
        ids: [],
        salesAreaName: '',
        salesAreaId: '',
        tel: '',
        registeredCapital: null,
        registeredDate: '',
        officialWebsite: '',
        chargePerson: '',
        remark: '',
        countryCode: '',
        provinceId: '',
        cityId: '',
        countyId: '',
        townId: '',
        addr: '',
        longitude: '',
        latitude: '',
        enterpriseType: '',
        id: ''
      },
      rules: {
        fullName: [
          {required: true, message: '请输入企业全称', trigger: 'blur change'},
          { type: 'string', max: 50, message: '厂家全称必须1至50位字符', trigger: 'blur change' }
        ],
        name: [{required: true, message: '请输入企业简称', trigger: 'blur change'}],
        pinyinName: [{required: true, message: '请输入企业简称拼音', trigger: 'blur change'}],
        groupId: [{required: true, message: '请选择企业所属集团', trigger: 'change', type: 'number'}],
        tradeCode: [{required: true, message: '请选择企业所属行业', trigger: 'blur change'}],
        enterpriseType: [{required: true, message: '请选择企业所属类型', trigger: 'blur change'}],
        addr: [{required: true, message: '请输入公司地址', trigger: 'blur change'}]
      },
      registeredDateOption: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now() - 86400000
        }
      }
    }
  },
  methods: {
    show (data) {
      this.modal.show = true
      this.$refs.form.resetFields()
      this.form.salesAreaName = ''
      this.form.longitude = ''
      this.form.latitude = ''
      this.modal.title = data.hasOwnProperty('id') ? '编辑' : '新增'
      console.log(data)
      if (data.id) {
        this.form = this.deepClone(data)
      }
      this.form.ids = data.hasOwnProperty('ids') ? data.ids : ''
      this.$refs.compCity.initCitys(data.hasOwnProperty('countryCode') ? data.countryCode : 'CN'
        , data.hasOwnProperty('provinceId') ? data.provinceId : ''
        , data.hasOwnProperty('cityId') ? data.cityId : ''
        , data.hasOwnProperty('countyId') ? data.countyId : ''
        , data.hasOwnProperty('townId') ? data.townId : '')
      this.initCategoryIds(this.category)
      this.initSalesAreaName(this.area)
    },
    // 设置主营产品
    initCategoryIds (data) {
      for (let i = 0; i < data.length; i++) {
        this.$set(data[i], 'checked', Type.isString(this.form.ids) &&
            Array.isArray(this.form.ids.split(',')) &&
            this.form.ids.split(',').includes(data[i].id.toString()))
        this.$set(data[i], 'selected', false)
        if (data[i].hasOwnProperty('children') && data[i].children.length > 0) {
          this.initCategoryIds(data[i].children)
        }
      }
    },
    // 设置销售区域
    initSalesAreaName (data) {
      for (let i = 0; i < data.length; i++) {
        this.$set(data[i], 'selected', (this.form.salesAreaId === data[i].id))
        this.$set(data[i], 'checked', false)
        if (data[i].id === this.form.salesAreaId) {
          this.form.salesAreaName = data[i].fullName
          break
        } else if (data[i].hasOwnProperty('children') && data[i].children.length > 0) {
          this.initSalesAreaName(data[i].children)
        }
      }
    },
    citySelected (value) {
      this.form.countryCode = value.country ? value.country : ''
      this.form.provinceId = value.proivnce ? value.proivnce : ''
      this.form.cityId = value.city ? value.city : ''
      this.form.countyId = value.county ? value.county : ''
      this.form.townId = value.town ? value.town : ''
    },
    // 选择销售区域
    areaSelectChange (data) {
      this.form.salesAreaName = data[0].fullName
      this.form.salesAreaId = data[0].id
    },
    btnConfirm () {
      let param = this.deepClone(this.form)
      delete param['gmtCreate']
      delete param['gmtModified']
      delete param['_index']
      delete param['_rowKey']
      delete param['creator']
      param.registeredDate = this.form.registeredDate ? dateFns.format(this.form.registeredDate, 'YYYY-MM-DD') : ''
      param.ids = ''
      // 销售区域
      let areaNodes = this.$refs.area.getSelectedNodes()
      param.salesAreaId = areaNodes.length > 0 ? areaNodes[0].id : ''
      // 主营产品
      param.ids = this.$refs.category.getCheckedNodes().map(item => item.id).join(',')
      if (!Type.isString(param.ids) || param.ids.length === 0) {
        return this.$Message.error('请选择主营产品')
      }
      if (!param.hasOwnProperty('salesAreaId') || !param.hasOwnProperty('salesAreaName')) {
        return this.$Message.error('请选择销售区域')
      }
      if (param.countryCode === 'CN' &&
        (!Type.isNumber(param.provinceId) || !Type.isNumber(param.cityId) || !Type.isNumber(param.countyId))) {
        return this.$Message.error('请选择公司行政地址（含省，市，区）')
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading.modal = true
          param.id = this.modal.title === '编辑' ? this.form.id : ''
          let action = this.modal.title === '编辑' ? api.data.updateManufacture(param) : api.data.addManufacture(param)
          action.then(response => {
            if (response.code === 1000) {
              this.$Message.success(response.message)
              this.modal.show = false
              this.$emit('confirmSuccess')
            } else {
              this.$Message.error(response.message)
            }
          }).catch(e => {
            this.$Message.error(e.message)
          }).finally(() => {
            this.loading.modal = false
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .ll>div:not(:first-child){
    margin-left: 10px;
  }
</style>
