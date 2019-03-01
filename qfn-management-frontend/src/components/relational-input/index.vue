<template>
  <div class="city-div">
    <AutoComplete v-model="form[data[0].name]"
                  :data="option[0]"
                  @on-select="firstSelected"
                  :placeholder="data[0].placeholder"
                  clearable
                  class="inner-auto"></AutoComplete>
    <AutoComplete v-model="form[data[1].name]"
                  :data="option[1]"
                  @on-select="secondSelected"
                  :placeholder="data[1].placeholder"
                  clearable
                  class="inner-auto"></AutoComplete>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'RelationalInput',
  props: ['data', 'selectedValue'],
  data () {
    return {
      option: [[], []],
      group: [],
      form: {
        group: '',
        manufacturer: ''
      }
    }
  },
  mounted () {
    if (this.data[1].name === 'manufacturer') this.getGroupFactory()
  },
  methods: {
    getGroupFactory () {
      api.data.default.getAllManufactureAndGroup().then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data && data.length > 0) {
            this.group = data
            this.option[0] = data.map(item => item.groupName)
          } else {
            this.option[0] = []
          }
        } else {
          this.$Message.error(response.exception)
        }
      })
    },
    setValues (value) {
      this.form[this.data[0].name] = value[0]
      this.firstSelected(value[0], value[1])
    },
    firstSelected (val, manufacturer) {
      this.option[1] = []
      if (val) {
        let group = this.group.find(item => item.groupName === val)
        if (this.data[1].name === 'manufacturer') {
          if (group && group.hasOwnProperty('manufacturerVoList') && Array.isArray(group.manufacturerVoList) && group.manufacturerVoList.length > 0) {
            this.option[1] = group.manufacturerVoList.map(item => item.manufacturerName)
          }
        }
      }
      this.form.manufacturer = manufacturer
    },
    secondSelected (val) {
      this.$emit('selectd', { name: this.data[1].name, value: [this.form[this.data[0].name], val] })
    }
  }
}
</script>

<style scoped>
  .inner-auto:nth-child(2) {
    margin-left: 1rem;
  }
</style>
