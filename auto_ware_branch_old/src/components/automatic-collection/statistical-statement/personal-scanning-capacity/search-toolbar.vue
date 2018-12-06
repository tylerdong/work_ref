<!-- 搜索工具栏 -->
<template>
  <div>
    <el-form :inline="true" :model="search" :rules="rules" ref="search" label-width="100px" class="demo-ruleForm">
      <el-form-item>
        <el-input v-model="search.userName" placeholder="用户名称"
                  class="width-1 margin-bottom-1 margin-right-1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.workshop" :loading="search.workshopLoading" clearable placeholder="请选择车间"
                   class="margin-right-1 margin-bottom-1" clearable>
          <el-option v-for="item in workshopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="workTypeId">
        <!--<el-select v-model="search.classes" :loading="search.classesLoading" clearable placeholder="请选择班次"-->
                   <!--class="margin-right-1 margin-bottom-1">-->
          <!--<el-option-->
            <!--v-for="item in search.classesList"-->
            <!--:key="item.id"-->
            <!--:label="item.name"-->
            <!--:value="item.name">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <el-select class="input-small" v-model="search.workTypeId" placeholder="请选择人员工种" clearable>
          <el-option :key="item.typeId" v-for="item in typeOptions" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="date" v-if="dateVisible">
        <!-- 日选择器 -->
        <el-date-picker v-if="dateVisible" v-model="search.date" class="margin-right-1 margin-bottom-1" type="date"
                        @change="dateChange" placeholder="选择日期" clearable></el-date-picker>
      </el-form-item>
      <el-form-item prop="month" v-if="monthVisible">
        <!-- 月选择器 -->
        <el-date-picker v-if="monthVisible" v-model="search.month" class="margin-right-1 margin-bottom-1" type="month"
                        @change="monthChange" placeholder="选择月份" clearable></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="margin-left-1 margin-bottom-1" :loading="searchLoading" @click="handleSearch">
          查询</el-button>
        <el-popover
          placement="top-start"
          title="提示"
          width="200"
          trigger="hover"
          v-model="value">
          <span ref="text">点击查看这是什么报表？</span>
          <span slot="reference" class="fa fa-info-circle fa-lg" style="cursor: pointer;outline:none;vertical-align: middle;color: #3b9dd8" @click="showinfo"></span>
        </el-popover>
        <el-button type="primary" class="margin-left-1 margin-bottom-1" :loading="exportLoading"
                   @click="btnExport('search')">导出</el-button>
        <el-button type="primary" class="margin-left-1 margin-bottom-1" @click="barGraph" :loading="barGraphLoading">柱状图</el-button>
      </el-form-item>
    </el-form>

    <!-- 下载 -->
    <a ref="refDownload" :href="download.href" download></a>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'
  export default {
    mounted () {
      this.getWorkshopList()
//      this.getClassesLoading()
      this.getAllWorkType()
      // this.handleSearch()
    },
    data () {
      return {
        value: false,
        rules: {
          value: false,
          workTypeId: [{required: true, message: '请选择工种', trigger: 'blur change'}],
          date: [{required: true, message: '请选择日期', trigger: 'blur change'}],
          month: [{required: true, message: '请选择月份', trigger: 'blur change'}]
        },
        exportLoading: false,
        barGraphLoading: false,
        typeOptions: [],
        workshopList: [],
        search: {
          userName: '',
          workshop: '',
          workshopLoading: false,
          workTypeId: '',
          classesLoading: false,
          month: dateFns.format(dateFns.format(Date.parse(new Date()), 'YYYY-MM'), 'YYYY-MM-DDTHH:mm:ss.SSS'),
          date: dateFns.format(Date.parse(dateFns.format(Date.parse(new Date()) - (24 * 3600000), 'YYYY-MM-DD')), 'YYYY-MM-DDTHH:mm:ss.SSS')
        },
        download: {
          href: ''
        }
      }
    },
    props: {
      dateVisible: {
        type: Boolean,
        default: false
      },
      monthVisible: {
        type: Boolean,
        default: false
      },
      searchLoading: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      showinfo () {
        this.$refs.text.innerHTML = '查询中... <i class="fa fa-spinner fa-pulse fa-lg"></i>'
        setTimeout(() => {
          this.value = false
          this.$notify({
            title: '报表信息',
            message: '将织袜/测纤/染判/降等/物检/剥丝实时产生的生产数据(每20分钟同步一次)按照天/月查询出来'
          })
          this.$refs.text.innerHTML = '这是什么报表？'
        }, 100)
      },
      dateChange (val) {
        if (val) {
          this.search.date = dateFns.format(this.search.date, 'YYYY-MM-DDTHH:mm:ss.SSS')
        } else {
          this.search.date = ''
        }
      },
      monthChange (val) {
        if (val) {
          this.search.month = dateFns.format(this.search.month, 'YYYY-MM-DDTHH:mm:ss.SSS')
        } else {
          this.search.month = ''
        }
      },
      handleSearch () {
        this.$refs.search.validate((valid) => {
          if (valid) {
            /* 按天统计搜索框 */
            if (this.dateVisible) {
              this.$emit('callback-search', {
                userName: this.search.userName,
                workshop: this.search.workshop,
                workTypeId: this.search.workTypeId,
                date: this.search.date
              })
              return true
            }

            /* 按月统计搜索框 */
            if (this.monthVisible) {
              this.$emit('callback-search', {
                userName: this.search.userName,
                workshop: this.search.workshop,
                workTypeId: this.search.workTypeId,
                month: this.search.month
              })
              return true
            }
          } else {
            return false
          }
        })
      },

      btnExport (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.exportLoading = true
            let params = ''
            /* 按天统计搜索框 */
            if (this.dateVisible) {
              params = {
                employeeName: this.search.userName,
                workshopId: this.search.workshop,
                workTypeId: this.search.workTypeId,
                scanDate: this.search.date,
                dateFlag: '0' // 日报
              }
            }

            /* 按月统计搜索框 */
            if (this.monthVisible) {
              params = {
                employeeName: this.search.userName,
                workshopId: this.search.workshop,
                workTypeId: this.search.workTypeId,
                scanDate: this.search.month,
                dateFlag: '1' // 月报
              }
            }
            api.automatic.statement.exportPersonScanByParameters(params).then(response => {
              if (response.data.messageType === 1) {
                if (response.data.data) {
                  this.download.href = response.data.data
                  this.$nextTick(() => {
                    this.$refs.refDownload.click()
                  })
                }
                return true
              }
              if (response.data.messageType === 2) {
                this.$message.error(response.data.message)
                return true
              }
            }).catch(e => {
              console.error(e)
            }).finally(() => {
              this.exportLoading = false
            })
          } else {
            return false
          }
        })
      },

      getWorkshopList () { // 车间
        this.search.workshopLoading = true
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.workshopList = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.search.workshopLoading = false
        })
      },

//      getClassesLoading () { // 班次
//        this.search.classesLoading = true
//        api.automatic.dictionary.getAllClassesList({}).then((response) => {
//          const data = response.data
//          if (data.messageType === 1) {
//            this.search.classesList = data.data
//          }
//        }).catch((e) => {
//          console.log(e)
//        }).finally(() => {
//          this.search.classesLoading = false
//        })
//      },

      getAllWorkType () { // 工种
        api.automatic.dictionary.getAllWorkTypeList().then((response) => {
          const data = response.data
          this.typeOptions = data.data
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },

      barGraph () {
        this.$refs.search.validate((valid) => {
          if (valid) {
            /* 按天统计搜索框 */
            if (this.dateVisible) {
              this.$emit('callback-bar-grape', {
                userName: this.search.userName,
                workshop: this.search.workshop,
                workTypeId: this.search.workTypeId,
                date: this.search.date
              })
              return true
            }

            /* 按月统计搜索框 */
            if (this.monthVisible) {
              this.$emit('callback-bar-grape', {
                userName: this.search.userName,
                workshop: this.search.workshop,
                workTypeId: this.search.workTypeId,
                month: this.search.month
              })
              return true
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .width-1 {
    width: 240px;
  }

  .margin-bottom-1 {
    margin-bottom: 5px;
  }

  .margin-right-1 {
    margin-right: 5px;
  }

  .margin-left-1 {
    margin-left: 10px;
  }
</style>
