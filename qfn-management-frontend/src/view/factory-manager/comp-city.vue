<template>
  <div class="city-div">
    <Select v-model="value.proivnce" @on-change="getCityByProvince" class="inner-search" clearable>
      <Option v-for="item in option.proivnce" :value="item.id" :key="item.id">{{ item.cityName }}</Option>
    </Select>
    <Select v-model="value.city" @on-change="getCountyByCity" class="inner-search" clearable>
      <Option v-for="item in option.city" :value="item.id" :key="item.id">{{ item.cityName }}</Option>
    </Select>
    <Select v-model="value.county" @on-change="cityChange" class="inner-search" clearable>
      <Option v-for="item in option.county" :value="item.id" :key="item.id">{{ item.cityName }}</Option>
    </Select>
  </div>
</template>

<script>
import {getAllProvince, getCity, getCounty} from './../../api/data'
import {Type} from '../../libs/tools'

export default {
  data () {
    return {
      option: {proivnce: [], city: [], county: []},
      value: {proivnce: '', city: '', county: ''}
    }
  },
  mounted () {
    this.getProvince()
  },
  methods: {
    getProvince () {
      getAllProvince().then(response => {
        if (response.code === 1000) {
          if (response.data && response.data && response.data.length > 0) {
            this.option.proivnce = response.data
          } else {
            this.option.proivnce = []
          }
        }
      })
    },
    getCityByProvince (provinceId, cityId, countyId) {
      if (!Type.isNumber(provinceId)) return
      getCity({parentId: provinceId}).then(response => {
        if (response.code === 1000) {
          if (response.data && response.data && response.data.length > 0) {
            this.option.city = response.data
            this.value.city = cityId
            if (cityId) {
              this.getCountyByCity(cityId, countyId)
            }
          } else {
            this.option.city = []
          }
        }
      })
    },
    getCountyByCity (cityId, countyId) {
      if (!Type.isNumber(cityId)) return
      getCounty({parentId: cityId}).then(response => {
        if (response.code === 1000) {
          if (response.data && response.data && response.data.length > 0) {
            this.option.county = response.data
            this.value.county = countyId
            this.cityChange()
          } else {
            this.option.county = []
          }
        }
      })
    },
    cityChange () {
      this.$emit('citySelected', this.value)
    },
    initCitys (provinceId, cityId, countyId) {
      this.$nextTick(() => {
        this.value.proivnce = provinceId
        this.value.city = ''
        this.value.county = ''
        if (provinceId) {
          this.getCityByProvince(provinceId, cityId, countyId)
        }
      })
    }
  }
}
</script>

<style scoped>
  .inner-search:nth-child(2) {
    margin: 0 0.5rem;
  }
</style>
