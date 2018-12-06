<template>
  <table border="1" bordercolor="#8392A5" style="border-collapse:collapse;text-align:center">
    <tr>
      <th v-for="name in tableColumnNames">{{name}}</th>
    </tr>
    <!--表身-->
    <tr v-for="(lines, index) in tableLines">
      <template>
        <td v-for="(item, lineIndex) in lines">
          <span v-if="lineIndex === 0">{{item.value}}</span>
          <template v-else>
            <!--输入框-->
            <el-input v-if="item.documentType === 'TEMP_INPUT'"
                      size="small"
                      placeholder='请输入'
                      class="template-item template-input"
                      :name="item.nodeCode"
                      @blur="tempPropBlur($event)"
                      :disabled="labStatus === 'COMPLETED'"
                      v-model="item.value">
            </el-input>

            <!--标签显示-->
            <template v-if="item.documentType === 'TEMP_LABLE'">
              <el-input placeholder='请输入'
                        size="small"
                        class="template-item template-input"
                        :disabled="true"
                        :name="item.nodeCode"
                        v-model="item.value">
              </el-input>
              <el-select v-if="item.type === 'REF_TEMP_GUIDE_SAMPLE'"
                         size="small"
                         v-model="selectVal"
                         @change="change"
                         :disabled="labStatus === 'COMPLETED'"
                         class="template-item template-input">
                <el-option v-for="temData in item.refTemplateData"
                           :key="temData.id"
                           :label="temData.name + ('--' + (new Date(temData.registerDate).toLocaleString())) + '--' + temData.calculationResult"
                           :value="temData.calculationResult">
                </el-option>
              </el-select>
            </template>
            <!--下拉控件-->
            <el-select v-else-if="item.documentType === 'TEMP_SELECT'"
                       size="small"
                       @change="change"
                       v-model="item.value"
                       :disabled="labStatus === 'COMPLETED'"
                       class="template-item template-select">
              <el-option v-for="map in item.selectStaticMaps"
                         :key="map.id"
                         :label="map.name"
                         :value="map.name">
              </el-option>
            </el-select>

            <!--时间控件-->
            <el-date-picker v-else-if="item.documentType === 'TEMP_DATE_INPUT'"
                            type="datetime"
                            size="small"
                            class="template-item template-date-picker"
                            @change="change"
                            :disabled="labStatus === 'COMPLETED'"
                            placeholder="请选择日期"
                            v-model="item.value">
            </el-date-picker>

            <!--人员控件-->
            <el-input v-if="item.documentType === 'TEMP_USER'"
                      size="small"
                      placeholder='请输入'
                      class="template-item template-input"
                      :disabled="true"
                      :name="item.nodeCode"
                      v-model="item.value">
            </el-input>
          </template>
          <!--文本框后面的按钮，数据采集-->
          <template v-if="item.isEquipmentCollection === 'Y' && labStatus !== 'COMPLETED'">
            <el-button type="primary" @click="getAcquisitionData(item.deviceId, item.mainCollectingAddress, index, lineIndex)"
                       size="small">采集数据</el-button>
          </template>
        </td>
      </template>
    </tr>
  </table>
</template>
<script>
  export default {
    components: {
      controlDocument: require('common/control-document.vue')
    },
    created () {},
    data () {
      return {}
    },
    props: ['type', 'value', 'nodeCode', 'documentType', 'selectStaticMapId', 'selectStaticMaps', 'refTemplateId',
      'refTemplateData', 'tableLines', 'tableColumnNames', 'labStatus'],
    mounted () {
      this.initTableLinesData()
    },
    computed: {
      inputValue: {
        get: function () {
          return this.value
        },
        set: function (newValue) {
          this.value = newValue
        }
      },
      selectVal: {
        get: function () {
          return this.value
        },
        set: function (newValue) {
          this.value = newValue
        }
      }
    },
    methods: {
      initTableLinesData () {
        console.log('this.tableLines')
        console.log(this.tableLines)
      },
      tempPropBlur (obj) {
        // console.log(`tempPropBlur, obj`)
        // console.log(obj)
        // this.$emit('update:value', obj.target.value)
      },
      change (obj) {
        // console.log(`change, obj`)
        // console.log(obj)
        // this.$emit('update:value', obj)
      },
      getAcquisitionData (deviceId, mainCollectingAddress, index, lineIndex) {
        $.ajax({
          type: 'GET',
          url: mainCollectingAddress + deviceId,
          data: '',
          contentType: 'application/json; charset=utf-8',
          success: (response) => {
            if (response.success) {
              this.tableLines[index][lineIndex].value = response.data
            } else {
              this.$message.error(response.errorMsg)
            }
          },
          error: function (a, b, c) {
            console.log(a, b, c)
          },
          complete: function (xhr) {
            xhr = null
          }
        })
      }
    }
  }
</script>
<style scoped>
  label {
  }

  th, td {
    text-align: center;
  }

  .template-item {
    padding: 1px 4px 1px 4px;
  }

  .template-select {
    width: 100px;
  }

  .template-input {
    width: 100px;
  }

  .template-date-picker {
    width: 180px;
  }
</style>
