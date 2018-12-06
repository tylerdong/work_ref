<template>
  <el-form :inline="true" :model="picker" class="picker-wrapper">
    <el-form-item>
      <el-date-picker
        v-model="picker.dtStart"
        type="date"
        placeholder="选择开始"
        :picker-options="pickerOptions0"
        @change="dtStartChange">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="至">
      <el-date-picker
        v-model="picker.dtEnd"
        type="date"
        placeholder="选择结束"
        :picker-options="pickerOptions1"
        @change="dtEndChange">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-input v-model="picker.theme" placeholder="请输入关键字"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
      data () {
        return {
          pickerOptions0: {
            disabledDate: (time) => {
              if (this.dtBaseStart) {
                return time.getTime() > this.dtBaseStart
              }
            }
          },
          pickerOptions1: {
            disabledDate: (time) => {
              if (this.dtBaseEnd) {
                return time.getTime() < this.dtBaseEnd
              }
            }
          },
          dtBaseStart: '',
          dtBaseEnd: '',
          picker: {
            dtStart: '',
            dtEnd: '',
            theme: ''
          }
        }
      },
      methods: {
        dtStartChange (value) {
          if (value) {
            this.dtBaseEnd = this.picker.dtStart.getTime() + 8.64e7
          } else {
            this.dtBaseEnd = ''
          }
        },
        dtEndChange (value) {
          if (value) {
            this.dtBaseStart = this.picker.dtEnd.getTime() - 8.64e7
          } else {
            this.dtBaseStart = ''
          }
        },
        search () {
          this.$emit('callback', this.picker)
        }
      }
    }
</script>

<style scoped lang="scss">
  .picker-wrapper{
    .el-button{vertical-align: baseline;}
  }
</style>
