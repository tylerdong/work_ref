<template>
  <div>
    <!--节点类型：
              常规：文本框
              引用模板：
              公式：文本框，点击"计算"按钮
              引用标样：下拉选择+输入
              静态字典：点击“获取F值”按钮

              输入类型：
              输入框：用户输入
              标签控件: 固定值
              下拉框： 下拉框
              时间控件：选择时间
              人员控件： 固定值，登录用户
              -->
    <!--输入框-->
    <el-input v-if="documentType === 'TEMP_INPUT'"
              placeholder='请输入'
              class="template-input"
              :name="nodeCode"
              :disabled="labStatus === 'COMPLETED'"
              @blur="tempPropBlur($event)"
              v-model="inputValue">
    </el-input>

    <!--标签显示-->
    <template v-if="documentType === 'TEMP_LABLE'">
      <el-input placeholder='请输入'
                class="template-input"
                :disabled="true"
                :name="nodeCode"
                v-model="inputValue">
      </el-input>
      <el-select v-if="type === 'REF_TEMP_GUIDE_SAMPLE'"
                 v-model="selectVal"
                 @change="change"
                 :disabled="labStatus === 'COMPLETED'"
                 class="template-input">
        <el-option v-for="item in refTemplateData"
                   :key="item.id"
                   :label="item.name + ('--' + (new Date(item.registerDate).toLocaleString())) + '--' + item.calculationResult"
                   :value="item.calculationResult">
        </el-option>
      </el-select>
    </template>


    <!--下拉控件-->
    <el-select v-else-if="documentType === 'TEMP_SELECT'"
               @change="change"
               v-model="inputValue"
               :disabled="labStatus === 'COMPLETED'"
               class="template-input">
      <el-option v-for="item in selectStaticMaps"
                 :key="item.id"
                 :label="item.name"
                 :value="item.name">
      </el-option>
    </el-select>

    <!--时间控件-->
    <el-date-picker v-else-if="documentType === 'TEMP_DATE_INPUT'"
                    type="datetime"
                    class="template-input"
                    @change="change"
                    placeholder="请选择日期"
                    :disabled="labStatus === 'COMPLETED'"
                    v-model="inputValue">
    </el-date-picker>

    <!--人员控件-->
    <el-input v-if="documentType === 'TEMP_USER'"
              placeholder='请输入'
              class="template-input"
              :disabled="true"
              :name="nodeCode"
              v-model="inputValue">
    </el-input>

  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    components: {},
    created () {
    },
    data () {
      return {
//        inputValue: this.value
      }
    },
    props: ['type', 'value', 'nodeCode', 'documentType', 'selectStaticMapId', 'selectStaticMaps', 'refTemplateId',
      'refTemplateData', 'labStatus'],
    mounted () {
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
      tempPropBlur (obj) {
        console.log(`tempPropBlur, obj`)
        console.log(obj)
        this.$emit('update:value', obj.target.value)
      },
      change (obj) {
        console.log(`change, obj`)
        console.log(obj)
        this.$emit('update:value', obj)
      }
    }
  }
</script>
<style scoped>
  .template-input {
    width: 300px;
  }
</style>
<style>
  input:disabled {
    color: #060786 !important;
  }
</style>
