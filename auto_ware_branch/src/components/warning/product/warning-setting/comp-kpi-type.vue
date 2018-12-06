<template>
  <div>
    <el-form-item label="规则类型" prop="kpiRuleTypeName">
      <el-select v-model="form.kpiRuleTypeName" @change="typeCodeChange" filterable clearable reserve-keyword
                 :loading="loading.kpiRuleTypeName"  placeholder="请输入规则类型" class="input-item-18">
        <el-option v-for="(item, index) in options.typeCodes" :key="index" :label="index"
                   :value="index"></el-option>
      </el-select>
    </el-form-item>

    <div class="kpi-comp" v-if="dimension.length > 0">
      <template v-for="item in dimension">
        <el-form-item v-if="item.dimensionEnum === 'ORGANIZATION'" label="组织机构" prop="orgId">
          <el-select v-model="form.orgId" @change="getWorkshopList" clearable placeholder="请选择组织机构"
                     class="input-item-18">
            <el-option v-for="(value, key) in options.organizations" :key="key" :label="value"
                       :value="key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="item.dimensionEnum === 'WORKSHOP'" label="车间" prop="workShopId">
          <el-select v-model="form.workShopId" @change="getLineList" clearable placeholder="请选择车间"
                     class="input-item-18">
            <el-option v-for="(value, key) in options.workshopList" :key="key" :label="value"
                       :value="key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="item.dimensionEnum === 'LINE'" label="线别" prop="lineId">
          <el-select v-model="form.lineId" @change="linIdChange" placeholder="请选择线别" filterable clearable
                     class="input-item-18">
            <el-option v-for="(value, key) in options.lineList" :key="key" :label="value"
                       :value="key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="item.dimensionEnum === 'GRADE'" label="等级" prop="silkGrade">
          <el-select v-model="form.silkGrade" @change="silkGradeChange" clearable placeholder="请选择等级"
                     class="input-item-18">
            <el-option v-for="(value, key) in options.gradeList" :key="key" :label="value"
                       :value="key"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'

  export default {
    data () {
      return {
        dimension: [],
        form: {
          kpiRuleTypeName: '',
          orgId: '',
          workShopId: '',
          lineId: '',
          silkGrade: ''
        },
        rules: {
          kpiRuleTypeName: [{required: true, message: '请选择规则类型', trigger: 'blur change'}],
          orgId: [{required: true, message: '请选择组织机构', trigger: 'blur change'}],
          workShopId: [{required: true, message: '请选择车间', trigger: 'blur change'}],
          lineId: [{required: true, message: '请选择规线别', trigger: 'blur change'}],
          silkGrade: [{required: true, message: '请选择等级', trigger: 'blur change'}]
        },
        options: {
          // 规则类型
          typeCodes: [],
          // 品名
          organizations: [],
          // 车间
          workshopList: [],
          // 线别
          lineList: [],
          // 等级
          gradeList: []
        },
        loading: { kpiRuleTypeName: false }
      }
    },
    mounted () {
      this.getOrganization()
      this.getAllSilkGradeList()
      this.getKpiType('')
    },
    methods: {
      initData (data) {
        let {kpiRuleTypeName, dimensionMap} = data
        this.dimension = this.options.typeCodes[kpiRuleTypeName]
        this.form.kpiRuleTypeName = kpiRuleTypeName
        let dimensionArray = this.dimension.map(item => { return item.dimensionEnum })

        if (dimensionArray.includes('ORGANIZATION') && dimensionMap.ORGANIZATION) {
          this.$nextTick(() => {
            this.form.orgId = dimensionMap.ORGANIZATION
            this.$emit('getSelectedValue', {orgId: dimensionMap.ORGANIZATION})
          })
        }

        if (dimensionArray.includes('WORKSHOP') && dimensionMap.WORKSHOP) {
          this.getWorkshopList(dimensionMap.ORGANIZATION)
          this.$nextTick(() => {
            this.form.workShopId = dimensionMap.WORKSHOP
            this.$emit('getSelectedValue', {workShopId: dimensionMap.WORKSHOP})
          })
        }

        if (dimensionArray.includes('LINE') && dimensionMap.LINE) {
          this.getLineList(dimensionMap.WORKSHOP)
          this.$nextTick(() => {
            this.form.lineId = dimensionMap.LINE
            this.$emit('getSelectedValue', {lineId: dimensionMap.LINE})
          })
        }

        if (dimensionArray.includes('GRADE') && dimensionMap.GRADE) {
          this.form.silkGrade = dimensionMap.GRADE
          this.$emit('getSelectedValue', {silkGrade: dimensionMap.GRADE})
        }
      },

      // 验证数据
      validate () {
        return this.$refs.form.validate()
      },

      getKpiType (val) {
        this.loading.kpiRuleTypeName = true
        this.options.typeCodes = {}
        api.dataAnalysis.getKpiType({name: val}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.typeCodes = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.kpiRuleTypeName = false
        })
      },

      // 清空数据
      clearFields () {
        this.dimension = []
        this.form.kpiRuleTypeName = ''
        this.form.orgId = ''
        this.form.workShopId = ''
        this.form.lineId = ''
        this.form.silkGrade = ''
        this.$emit('getSelectedValue', {})
      },

      resizedFields () {
        this.form.orgId = ''
        this.form.workShopId = ''
        this.form.lineId = ''
        this.form.silkGrade = ''
        this.$emit('getSelectedValue', {})
      },

      // 选择规则类型
      typeCodeChange (val) {
        this.resizedFields()
        if (val) {
          this.dimension = this.options.typeCodes[val]
          this.$emit('getSelectedValue', {kpiTypeCode: this.dimension[0].kpiTypeCode})
          this.$emit('getSelectedValue', {formatType: this.dimension[0].formatType})
          this.$emit('getSelectedValue', {timeType: this.dimension[0].timeType})
          this.$emit('getSelectedValue', {dataType: this.dimension[0].dataType})
          // // 每次规则类型变化都要清空数据重新来过
          this.dimension.forEach(item => {
            switch (item.dimensionEnum) {
              case 'ORGANIZATION':
                this.$emit('getSelectedValue', {orgId: ''})
                break
              case 'WORKSHOP':
                this.$emit('getSelectedValue', {workShopId: ''})
                break
              case 'LINE':
                this.$emit('getSelectedValue', {lineId: ''})
                break
              case 'GRADE':
                this.$emit('getSelectedValue', {silkGrade: ''})
                break
              default:
                break
            }
          })
        }
      },

      getKpiDime (dimensionEnum, id, fieldIdName) {
        api.dataAnalysis.getKpiDimensionInfo({
          dimensionEnum: dimensionEnum,
          id: id,
          fieldIdName: fieldIdName
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            switch (dimensionEnum) {
              case 'ORGANIZATION':
                this.options.organizations = data.data
                break
              case 'WORKSHOP':
                this.options.workshopList = data.data
                break
              case 'LINE':
                this.options.lineList = data.data
                break
              case 'GRADE':
                this.options.gradeList = data.data
                break
              default:
                break
            }
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },

      // 获取组织机构
      getOrganization () {
        this.getKpiDime('ORGANIZATION', '', '')
      },

      /* 获取车间下拉列表 */
      getWorkshopList (val) {
        this.form.workShopId = ''
        this.options.workshopList = []
        this.form.lineId = ''
        this.options.lineList = []
        if (val) {
          let dimeWorkShop = this.dimension.find(item => { return item.dimensionEnum === 'ORGANIZATION' })
          this.getKpiDime('WORKSHOP', val, dimeWorkShop.fieldIdName)
        }
        this.$emit('getSelectedValue', {orgId: val})
      },

      // 根据车间选择线别
      getLineList (val) {
        this.form.lineId = ''
        this.options.lineList = []
        if (val) {
          let dimeLine = this.dimension.find(item => { return item.dimensionEnum === 'WORKSHOP' })
          this.getKpiDime('LINE', val, dimeLine.fieldIdName)
        }
        this.$emit('getSelectedValue', {workShopId: val})
      },

      /* 获取等级下拉列表 */
      getAllSilkGradeList () {
        this.getKpiDime('GRADE', '', 'grade_name')
      },

      // 线别下拉
      linIdChange (val) {
        this.$emit('getSelectedValue', {lineId: val})
      },

      // 等级下拉
      silkGradeChange (val) {
        this.$emit('getSelectedValue', {silkGrade: val})
      }
    }
  }
</script>

<style scoped>
  .kpi-comp {
    border: 1px solid #b4bccc;
    padding-top: 22px;
    margin-bottom: 22px;
  }
</style>
