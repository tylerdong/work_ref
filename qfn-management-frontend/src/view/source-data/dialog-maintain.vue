<template>
  <Modal v-model="modal.show" :title="modal.title" width="30%">
    <Form :model="form" :rules="rules" ref="form" label-position="right" :label-width="100">
      <FormItem v-for="(prop, index) in productType.item" :key="index" :label="prop.label" :prop="prop.name" :required="prop.valid">
        <AutoComplete v-if="prop.elType === 'AutoComplete'" v-model="form[prop.name]"
                      clearable
                      :data="option[prop.option]"
                      @on-select="auSelected(prop.name)"
                      :placeholder="prop.placeholder"></AutoComplete>

        <Input v-if="prop.elType === 'Input'" v-model="form[`${prop.name}`]" clearable :placeholder="prop.placeholder" :disabled="prop.name === 'priceType'"/>

        <template v-if="prop.elType === 'Tree'">
          <Input v-model="form[`${prop.name}`]" clearable :placeholder="prop.placeholder"/>
          <div class="tree-container">
            <Tree ref="area" :data="option.area" @on-select-change="areaSelectChange"></Tree>
          </div>
        </template>

        <DatePicker v-if="prop.elType === 'DatePicker'" v-model="form[`${prop.name}`]" type="date" format="yyyy-MM-dd"
                    style="width: 100%;" :placeholder="prop.placeholder"></DatePicker>

        <relational-input :ref="`relInput_${prop.name}`" v-if="prop.elType === 'RelationalInput'" :data="prop.data"
                          :selectedValue="selectedValue"
                          @selectd="riSelected"></relational-input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modal.show=false">取消</Button>
      <Button type="primary" size="large" :loading="loading.confirm" @click="btnConfirm">确定</Button>
    </div>
  </Modal>
</template>

<script>
import api from './../../api/data'
import dateFns from 'date-fns'
import {ruleArray} from '@/config/option'
export default {
  props: {
    productType: { type: Object },
    priceType: { type: String }
  },
  components: {
    'relational-input': require('./../../components/relational-input').default
  },
  data () {
    return {
      modal: {show: false, title: '新增'},
      optionData: { product: [] },
      option: {area: [], product: [], spec: [], group: [], factory: [], priceType: []},
      ruleArray: ruleArray,
      selectedValue: [undefined, undefined], // relational-input组件赋值
      form: {
        id: '',
        productClassName: '',
        spec: '',
        fiberNum: '',
        gloss: '',
        color: '',
        grade: '',
        unit: '',
        price: '',
        priceType: '',
        settleType: '',
        logisticsType: '',
        salesArea: '',
        salesAreaId: '',
        group: '',
        manufacturer: '',
        priceDate: new Date(),
        remark: ''
      },
      loading: {confirm: false},
      rules: {
      }
    }
  },
  mounted () {
    this.getAreaData()
  },
  methods: {
    initRules () {
      this.rules = {}
      for (let i = 0; i < this.productType.item.length; i++) {
        if (this.productType.item[i].valid) {
          this.$set(this.rules, this.productType.item[i].name, this.ruleArray[this.productType.item[i].name])
        }
      }
    },
    show (data) {
      this.modal.show = true
      this.modal.title = data ? `${this.productType.name}-修改` : `${this.productType.name}-新增`
      this.$refs.form.resetFields()
      this.initRules()
      this.getProduct()
      this.form.priceType = this.priceType
      if (data) {
        this.form.id = data.id
        if (this.productType.item.some(item => item.name === 'spec')) {
          this.form.productClassName = data.productClassName
          this.form.spec = data.spec
          this.getSpecByProduct()
        }
        this.form.fiberNum = data.fiberNum
        this.form.gloss = data.gloss
        this.form.color = data.color
        this.form.grade = data.grade
        this.form.price = data.price
        this.form.unit = data.unit
        this.form.priceType = data.priceType
        this.form.settleType = data.settleType
        this.form.logisticsType = data.logisticsType
        this.form.salesArea = data.salesArea
        this.form.salesAreaId = data.salesAreaId
        this.form.groupName = data.groupName
        if (this.productType.item.some(item => item.name === 'manufacturer')) {
          this.$refs.relInput_manufacturer[0].setValues([data.groupName, data.manufacturer])
        }
        this.form.priceDate = data.priceDate ? new Date(data.priceDate) : ''
        this.form.remark = data.remark
      }
    },
    getProduct () {
      api.getAllProduct({productClassCode: this.productType.code}).then(res => {
        if (res.code === 1000) {
          if (res.data && res.data && res.data.length > 0) {
            this.optionData.product = res.data
            this.option.product = res.data.map(item => item.name)
          } else {
            this.option.product = []
          }
        }
      })
    },
    // 选择销售区域
    areaSelectChange (data) {
      this.form.salesArea = data[0].title
      this.form.salesAreaId = data[0].id
    },
    // 销售区域
    getAreaData () {
      api.getAreaData({expand: false}).then(response => {
        if (response.code === 1000) {
          if (response.data && response.data && response.data.length > 0) {
            this.option.area = response.data
          } else {
            this.option.area = []
          }
        }
      })
    },
    auSelected (val) {
      this.$nextTick(() => {
        switch (val) {
          case 'productClassName':
            this.getSpecByProduct()
            break
          default:
            break
        }
      })
    },
    riSelected (val) {
      switch (val.name) {
        case 'manufacturer':
          this.form.groupName = val.value[0]
          this.form.manufacturer = val.value[1]
          break
        default:
          break
      }
    },
    getSpecByProduct () {
      this.option.spec = []
      let product = this.optionData.product.find(item => { return item.name === this.form.productClassName })
      if (product && product.hasOwnProperty('specList') && Array.isArray(product.specList) && product.specList.length > 0) {
        this.option.spec = product.specList.map(item => item.spec)
      }
    },
    btnConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading.confirm = true
          let data = {
            productClassCode: this.productType.code,
            productClassName: this.form.productClassName,
            spec: this.form.spec,
            fiberNum: this.form.fiberNum,
            gloss: this.form.gloss,
            color: this.form.color,
            grade: this.form.grade,
            unit: this.form.unit,
            price: this.form.price,
            priceType: this.form.priceType,
            settleType: this.form.settleType,
            logisticsType: this.form.logisticsType,
            salesArea: this.form.salesArea,
            salesAreaId: this.form.salesAreaId,
            groupName: this.form.groupName,
            manufacturer: this.form.manufacturer,
            priceDate: this.form.priceDate ? dateFns.format(this.form.priceDate, 'YYYY-MM-DD') : '',
            remark: this.form.remark
          }
          console.log(data)
          if (this.modal.title.endsWith('新增')) {
            api.addPreManufacturePriceInfo(data).then(response => {
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
              this.loading.confirm = false
            })
          } else {
            Object.assign(data, {id: this.form.id})
            api.updatePreManufacturePrice(data).then(response => {
              if (response.code === 1000) {
                this.$Message.success(response.message)
                this.modal.show = false
                this.$emit('confirmSuccess')
              } else {
                this.$Message.error(response.message)
              }
            }).catch(e => {
              this.$Message(e.message)
            }).finally(() => {
              this.loading.confirm = false
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
