<template>
  <Modal v-model="modal.show" :title="modal.title" :draggable="true" class="pop-modal">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="企业名称" prop="fullName">
        <Input placeholder="请输企业名称" v-model="form.fullName" clearable/>
      </FormItem>

      <FormItem label="企业简称" prop="name">
        <Input placeholder="请输入企业简称" v-model="form.name" clearable/>
      </FormItem>

      <FormItem label="企业简称拼音" prop="pinyinName">
        <Input placeholder="请输企业简称拼音" v-model="form.pinyinName" clearable/>
      </FormItem>

      <FormItem label="企业别名" prop="matchName">
        <Input placeholder="请输入企业别名" v-model="form.matchName" clearable/>
      </FormItem>

      <FormItem label="所属集团" prop="groupId">
        <Select v-model="form.groupId" clearable>
          <Option v-for="(item, index) in group" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem label="主营产品">
        <div class="tree-container">
          <Tree ref="category" :data="category" change-on-select show-checkbox></Tree>
        </div>
      </FormItem>

      <FormItem label="销售区域">
        <Input placeholder="请选择销售区域" v-model="form.salesArea"/>
        <div class="tree-container">
          <Tree ref="area" :data="area" @on-select-change="areaSelectChange"></Tree>
        </div>
      </FormItem>

      <FormItem label="行政地址">
        <comp-city ref="compCity" @citySelected="citySelected"></comp-city>
      </FormItem>

      <FormItem label="地址" prop="addr">
        <Input placeholder="请输入公司地址" v-model="form.addr" clearable/>
      </FormItem>

      <FormItem label="联系电话">
        <Input placeholder="请输入联系电话" v-model="form.tel" clearable/>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modal.show=false">取消</Button>
      <Button type="primary" size="large" :loading="loading.modal" @click="btnConfirm">确定</Button>
    </div>
  </Modal>
</template>

<script>
import {updateManufacture, addManufacture} from './../../api/data'
import {Type} from '../../libs/tools'

export default {
  components: {
    'comp-city': require('./comp-city').default
  },
  props: ['area', 'category', 'group'],
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
        ids: [],
        salesArea: '',
        salesAreaId: '',
        tel: '',
        provinceId: '',
        cityId: '',
        countyId: '',
        addr: '',
        id: ''
      },
      rules: {
        groupId: [{required: true, message: '请选择所属集团', trigger: 'change', type: 'number'}],
        name: [
          {required: true, message: '请输入公司名称', trigger: 'blur change'},
          { type: 'string', max: 10, message: '名称必须1至10位字符', trigger: 'blur change' }
        ],
        fullName: [
          {required: true, message: '请输入厂家全称', trigger: 'blur change'},
          { type: 'string', max: 50, message: '厂家全称必须1至50位字符', trigger: 'blur change' }
        ],
        addr: [
          {required: true, message: '请输入公司地址', trigger: 'blur change'},
          { type: 'string', max: 100, message: '公司地址必须1至100位字符', trigger: 'blur change' }
        ]
      }
    }
  },
  methods: {
    show (data) {
      this.modal.show = true
      this.$refs.form.resetFields()
      this.modal.title = data.hasOwnProperty('id') ? '编辑' : '新增'
      if (data) {
        this.form.name = data.name
        this.form.matchName = data.matchName
        this.form.fullName = data.fullName
        this.form.pinyinName = data.pinyinName
        this.form.groupId = data.groupId
        this.form.salesAreaId = data.salesAreaId
        this.form.tel = data.tel
        this.form.provinceId = data.provinceId
        this.form.cityId = data.cityId
        this.form.countyId = data.countyId
        this.form.addr = data.addr
        this.form.id = data.id
      }
      this.form.ids = data.hasOwnProperty('ids') ? data.ids : ''
      this.$refs.compCity.initCitys(data.hasOwnProperty('provinceId') ? data.provinceId : ''
        , data.hasOwnProperty('cityId') ? data.cityId : ''
        , data.hasOwnProperty('countyId') ? data.countyId : '')
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
          this.form.salesArea = data[i].fullName
          break
        } else if (data[i].hasOwnProperty('children') && data[i].children.length > 0) {
          this.initSalesAreaName(data[i].children)
        }
      }
    },
    citySelected (value) {
      this.form.provinceId = value.proivnce ? value.proivnce : ''
      this.form.cityId = value.city ? value.city : ''
      this.form.countyId = value.county ? value.county : ''
    },
    // 选择销售区域
    areaSelectChange (data) {
      this.form.salesArea = data[0].fullName
      this.form.salesAreaId = data[0].id
    },
    btnConfirm () {
      let param = {
        name: this.form.name,
        matchName: this.form.matchName,
        fullName: this.form.fullName,
        pinyinName: this.form.pinyinName,
        groupId: this.form.groupId,
        salesArea: this.form.salesArea,
        tel: this.form.tel,
        provinceId: this.form.provinceId,
        cityId: this.form.cityId,
        countyId: this.form.countyId,
        addr: this.form.addr,
        salesAreaId: '',
        ids: '',
        id: ''
      }
      // 销售区域
      param.salesAreaId = this.$refs.area.getSelectedNodes().map(item => item.id).join(',')
      // 主营产品
      param.ids = this.$refs.category.getCheckedNodes().map(item => item.id).join(',')
      if (!Type.isString(param.ids) || param.ids.length === 0) {
        return this.$Notice.error({desc: '请选择主营产品'})
      }
      if (!Type.isString(param.salesAreaId) || param.salesArea.length === 0) {
        return this.$Notice.error({desc: '请选择销售区域'})
      }
      if (!Type.isNumber(param.provinceId) || !Type.isNumber(param.cityId) || !Type.isNumber(param.countyId)) {
        return this.$Notice.error({desc: '请选择公司行政地址（含省，市，区）'})
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading.modal = true
          if (this.modal.title === '新增') {
            addManufacture(param).then(response => {
              if (response.code === 1000) {
                this.$Notice.success({desc: response.message})
                this.modal.show = false
                this.$emit('confirmSuccess')
              } else {
                this.$Notice.error({desc: response.message})
              }
            }).catch(e => {
              this.$Notice.error({desc: e.message})
            }).finally(() => {
              this.loading.modal = false
            })
          } else {
            param.id = this.form.id
            updateManufacture(param).then(response => {
              if (response.code === 1000) {
                this.$Notice.success({desc: response.message})
                this.modal.show = false
                this.$emit('confirmSuccess')
              } else {
                this.$Notice.error({desc: response.message})
              }
            }).catch(e => {
              this.$Notice.error({desc: e.message})
            }).finally(() => {
              this.loading.modal = false
            })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
