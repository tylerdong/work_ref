<!--新增，修改模板属性 class="template-dialog" size="tiny"-->
<template>
  <el-dialog :title="form.title" :visible.sync="dialogToggle" @close="close" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="10rem">
      <!--类型-->
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" @change="typeChange" @visible-change="typeVisibleChange"
                   placeholder="请选择" class="template-input">
          <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>

      <!--输入类型：根据类型选择不同的输入类型
      常规：任意选择
      引用模板：标签显示
      公式：标签显示
      静态字典：标签显示
      引用标样：TODO
      -->
      <el-form-item label="输入类型" prop="documentType">
        <el-select v-model="form.documentType" @change="documentTypeChange" class="template-input">
          <el-option v-for="item in documentTypes" :key="item.id" :label="item.name" :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>

      <!--输入类型为下拉框的时候选择字典类型-->
      <el-form-item v-if="form.documentType === 'TEMP_SELECT'" label="字典类型" prop="documentType">
        <el-select v-model="form.selectStaticMapId" class="template-input">
          <el-option v-for="item in selectStaticMaps" :key="item.id" :label="item.name" :value="item.id"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>

      <!--名称-->
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder='请输入' class="template-input"></el-input>
      </el-form-item>

      <!--根据类型设置内容开始-->
      <!--EQUATION：输入公式-->
      <template v-if="form.type === 'EQUATION'">
        <!--公式-->
        <el-form-item label="公式" prop="calculation_formula">
          <el-select v-model="formula" placeholder="请选择" class="template-input" @change="formulaChange">
            <el-option v-for="item in formulas" :key="item.value" :label="item.name" :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
          <el-input v-model="form.calculation_formula" auto-complete="off" placeholder='请输入'
                    class="template-input">
          </el-input>
        </el-form-item>

        <!--精度类型-->
        <el-form-item label="精度类型" prop="pricisionType">
          <el-select v-model="form.pricisionType" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in pricTypes"
              :key="item.id"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <!--精度-->
        <el-form-item label="精度" prop="pricision">
          <el-select v-model="form.pricision" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in pricisions"
              :key="item.id"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-if="form.type === 'REF_TEMP_GUIDE_SAMPLE'">
        <el-form-item label="标样模板" prop="refTemplateId">
          <el-select v-model="form.refTemplateId" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in sampleDemo"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--REF_TEMP_CAL_RESULT：引用其他记录，选择模板-->
      <template v-if="form.type === 'REF_TEMP_CAL_RESULT'">
        <el-form-item label="模板" prop="refTemplateId">
          <el-select v-model="form.refTemplateId" placeholder="请选择" class="template-input"
                     @change="changeSele" @visible-change="refTempVisibleChange">
            <el-option
              v-for="item in refTemplates"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性" prop="refTemplateAttributeCode">
          <el-select v-model="form.refTemplateAttributeCode" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in refTemplateAttributeCodes"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--STATIC_MAP：静态字典，选择属性-->
      <template v-if="form.type === 'STATIC_MAP'">
        <el-form-item label="业务类型" prop="dicType">
          <el-select v-model="form.dicType" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in properties"
              :key="item.id"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="引用属性" prop="refCode">
          <el-select v-model="form.refCode" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in dicTypes"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--根据类型设置内容结束-->

      <el-form-item label="代码" prop="code">
        <el-input v-model="form.code" auto-complete="off" placeholder='请输入' class="template-input"
                  :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="是否结果节点" prop="isResultNode">
        <el-checkbox v-model="form.isResultNode"></el-checkbox>
      </el-form-item>

      <!--<div slot="footer" class="dialog-footer">-->
      <el-form-item class="fr">
        <el-button :loading="loading" type="primary" @click="handleConfirm('form')">确 定</el-button>
      </el-form-item>
      <!--</div>-->
    </el-form>
    <formula-alert-dialog ref="formulaDialog"></formula-alert-dialog>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'

  export default {
    components: {
      formulaAlertDialog: require('./../../../common/dialog-formula-tips.vue')
    },
    created () {
    },
    data () {
      return {
        dialogToggle: false,
        form: {
          index: 0,
          type: '',
          documentType: '',
          selectStaticMapId: '',
          refTemplateId: '',
          dicType: '',
          refCode: '',
          calculation_formula: '',
          name: '',
          code: api.commom.randomString(4),
          pricisionType: '',
          pricision: '',
          // 初始化checkbox绑定值
          isResultNode: false,
          refTemplateAttributeCode: ''
        },
        rules: {
          type: [{required: true, message: '请选择类型', trigger: 'change'}],
          refTemplateId: [{required: true, message: '请选择引用模板', trigger: 'change'}],
          name: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}
          ],
          documentType: [{required: true, message: '请选择输入类型', trigger: 'change'}],
          calculation_formula: [
            {required: true, message: '请填写公式', trigger: 'change blur'}
          ],
          pricisionType: [
            {required: true, message: '请选择精度类型', trigger: 'change'}
          ],
          refTemplateAttributeCode: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ],
          pricision: [
            {type: 'number', required: true, message: '请选择精度', trigger: 'change'}
          ],
          dicType: [
            {required: true, message: '请选择业务类型', trigger: 'change'}
          ],
          refCode: [
            {required: true, message: '请选择引用属性', trigger: 'change'}
          ]
        },
        // 类型下拉是否可见
        typeVisible: false,
        // 类型
        types: [
          // 通过输入获取
          {id: 1, name: '常规', value: 'NORMAL', disabled: false},
          {id: 2, name: '引用模板', value: 'REF_TEMP_CAL_RESULT', disabled: false},
          // 通过“计算”获取
          {id: 3, name: '公式', value: 'EQUATION', disabled: false},
          {id: 4, name: '引用标样', value: 'REF_TEMP_GUIDE_SAMPLE', disabled: false},
          // 通过“获取F值”获取
          {id: 5, name: '静态字典', value: 'STATIC_MAP', disabled: true}
        ],
        // 输入类型
        documentTypes: [
          {id: 1, name: '输入框', value: 'TEMP_INPUT', disabled: false},
          {id: 2, name: '标签显示', value: 'TEMP_LABLE', disabled: false},
          {id: 3, name: '下拉框', value: 'TEMP_SELECT', disabled: false},
          {id: 4, name: '时间控件', value: 'TEMP_DATE_INPUT', disabled: false},
          {id: 5, name: '人员控件', value: 'TEMP_USER', disabled: false}
        ],
        // 选择下拉框字典类型
        selectStaticMaps: [],
        // 模板下拉是否可见
        refTempVisible: false,
        // 引用其他的模板
        refTemplates: [],
        refTemplateAttributeCodes: [],
        // 静态字典的业务类型
        properties: [
          {id: 1, name: '特性粘度', value: 'INTRINSIC_VISCOSITY'},
          {id: 2, name: '二氧化钛含量', value: 'TITANIUM_DIOXIDE_CONTENT'}],
        // 静态字典的引用属性
        dicTypes: [],
        // 公式的精度类型
        pricTypes: [
          {name: '四舍五入', value: 'ROUND_HALF_UP'},
          {name: '舍去尾数', value: 'ROUND_DOWN'},
          {name: '四舍六入五成双', value: 'ROUND_HALF_EVEN'}
        ],
        // 公式的精度
        pricisions: [
          {id: 0, name: '0', value: 0},
          {id: 1, name: '1', value: 1},
          {id: 2, name: '2', value: 2},
          {id: 3, name: '3', value: 3},
          {id: 4, name: '4', value: 4},
          {id: 5, name: '5', value: 5},
          {id: 6, name: '6', value: 6},
          {id: 7, name: '7', value: 7},
          {id: 8, name: '8', value: 8},
          {id: 9, name: '9', value: 9},
          {id: 10, name: '10', value: 10}
        ],
        formula: '',
        // 公式的类型
        formulas: [
          {name: '正弦函数', value: 'sin(x)'},
          {name: '余弦函数', value: 'cos(x)'},
          {name: '正切函数', value: 'tan(x)'},
          {name: '双曲正弦函数', value: 'sinh(x)'},
          {name: '双曲余弦函数', value: 'cosh(x)'},
          {name: '双曲正切函数', value: 'tanh(x)'},
          {name: '反正弦函数', value: 'asin(x)'},
          {name: '反余弦函数', value: 'acos(x)'},
          {name: '反正切函数', value: 'atan(x)'},
          {name: '方位角函数', value: 'atan2(x,y)'},
          {name: '弧度换角度函数', value: 'deg(x)'},
          {name: '角度换弧度函数', value: 'rad(x)'},
          {name: '绝对值函数', value: 'abs(x)'},
          {name: '对数函数(底数是e(2.7182818284590452354))', value: 'ln(x)'},
          {name: '对数函数(底数为10)', value: 'log(x)'},
          {name: '开平方函数', value: 'sqrt(x)'},
          {name: '冥函数', value: 'pow(x,y)'},
          {name: '取小值函数', value: 'min(x,y)'},
          {name: '取大值函数', value: 'max(x,y)'},
          {name: '取随机数函数', value: 'rnd(x)'}
        ],
        dialog: {},
        loading: false,
        sampleDemo: ''
      }
    },
    props: {},
    mounted () {
    },
    computed: {},
    methods: {
      // 类型下拉可视之后
      typeVisibleChange (visible) {
        this.typeVisible = visible
      },
      /** 选择类型  */
      typeChange (item) {
        // 查找引用模板
        if (item === 'REF_TEMP_CAL_RESULT') {
          if (this.typeVisible) {
            this.form.refTemplateId = ''
            this.form.refTemplateAttributeCode = ''
          }
          this.getOtherTemplate()
        }
        if (item === 'REF_TEMP_GUIDE_SAMPLE') {
          if (this.typeVisible) this.form.refTemplateId = ''
          this.showSampleData()
        }
        // 设置输入类型
        if (item === 'NORMAL') {
          // this.form.documentType = 'TEMP_INPUT'
          this.documentTypes.map((item) => {
            item.disabled = false
          })
        } else {
          // this.form.documentType = 'TEMP_LABLE'
          this.documentTypes.map((item) => {
            item.disabled = item.value !== 'TEMP_LABLE'
          })
        }
      },
      showSampleData () { // 标样模板
        api.chemicalLaboratory.originalTempManage.getAllGuideSampleTemplate().then(response => {
          const data = response.data
          if (data.success === true) {
            console.log(data)
            this.sampleDemo = data.data
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      },
      documentTypeChange (item) {
        if (item === 'TEMP_SELECT') {
          api.chemicalLaboratory.labSelectStaticMap.getAllParentDos().then((response) => {
            let data = response.data
            if (data.success) {
              this.selectStaticMaps = data.data
            } else {
              this.$message.error(data.errorMsg)
            }
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.loading.dic = false
          })
        }
      },
      show (data, hasOtherType) {
        this.dialogToggle = true
        this.form.title = data.title
        let staticDicIndex = this.types.findIndex(item => item.value === 'STATIC_MAP')
        this.types[staticDicIndex].disabled = !hasOtherType
        if (data.title === '新增') {
          this.$nextTick(() => {
            this.form.isResultNode = ''
            this.form.type = 'NORMAL'
            this.form.pricisionType = ''
            this.form.pricision = ''
            this.form.refTemplateId = ''
            this.form.refTemplateAttributeCode = ''
            this.form.dicType = ''
            this.form.refCode = ''
            this.form.calculation_formula = ''
            this.form.name = ''
            this.form.documentType = 'TEMP_INPUT'
            this.form.selectStaticMapId = ''
            this.form.code = api.commom.randomString(4)
            // checkbox绑定值
            this.form.isResultNode = false
            // 编辑的时候新增，添加静态字典类型
            this.dicTypes = []
            if (data.tempProperty.length > 0) {
              for (let i = 0; i < data.tempProperty.length; i++) {
                if (data.tempProperty[i].type !== 'STATIC_MAP') {
                  this.dicTypes.push(data.tempProperty[i])
                }
              }
            }
          })
        } else {
          console.log(data)
          // 把数据库里的值转换成checkbox绑定值
          this.form.isResultNode = data.row.isResultNode === 'Y'
          this.form.type = data.row.type
          this.form.pricisionType = data.row.pricisionType
          this.form.pricision = data.row.pricision
          this.form.refTemplateId = data.row.refTemplateId
          this.form.dicType = data.row.dicType
          this.form.refCode = data.row.refCode
          this.form.calculation_formula = data.row.calculationFormula
          this.form.name = data.row.name
          this.documentTypeChange(data.row.documentType)
          this.form.documentType = data.row.documentType
          this.form.selectStaticMapId = data.row.selectStaticMapId
          this.form.code = data.row.code
          this.form.refTemplateAttributeCode = data.row.refTemplateAttributeCode
          Object.assign(this.form, {index: data.$index})
          if (data.row.refTemplateId) this.getAttribute(data.row.refTemplateId)
          if (data.row.type === 'REF_TEMP_GUIDE_SAMPLE') this.showSampleData()
          if (data.row.type === 'REF_TEMP_CAL_RESULT') this.getOtherTemplate()
        }
      },
      close () {
        this.dialogToggle = false
      },
      refTempVisibleChange (visible) {
        this.refTempVisible = visible
      },
      // 根据模板ID查找原始记录单模板属性信息
      changeSele () {
        if (this.refTempVisible) this.form.refTemplateAttributeCode = ''
        this.getAttribute(this.form.refTemplateId)
      },
      getAttribute (refTemplateId) {
        this.refTemplateAttributeCodes = []
        if (refTemplateId) {
          api.chemicalLaboratory.originalTempManage.getLabOriginalTemplateAttributeDosByTemplateId({id: refTemplateId}).then((response) => {
            let data = response.data
            if (data.success) {
              this.refTemplateAttributeCodes = data.data
              if (data.data.length === 0) {
                this.$message.error('没有属性数据')
              }
            }
          })
        }
      },
      getOtherTemplate () {
        let params = {queryLabOriginalTemplateCo: {name: '', isGuideSample: 'N'}}
        api.chemicalLaboratory.originalTempManage.getLabOriginalTemplateVoList(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.refTemplates = data.data.data
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      formulaChange (selectedValue) {
        // this.$set(this.form, 'calculation_formula', this.form.calculation_formula + selectedValue)
        this.form.calculation_formula = this.form.calculation_formula + selectedValue
      },
      handleConfirm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let property = {
              index: this.form.index,
              type: this.form.type,
              refTemplateId: this.form.refTemplateId,
              dicType: this.form.dicType,
              refCode: this.form.refCode,
              calculationFormula: this.form.calculation_formula,
              name: this.form.name,
              documentType: this.form.documentType,
              selectStaticMapId: this.form.selectStaticMapId,
              code: this.form.code,
              pricision: this.form.pricision,
              pricisionType: this.form.pricisionType,
              refTemplateAttributeCode: this.form.refTemplateAttributeCode,
              // 把checkbox绑定值转换为数据库的值
              isResultNode: this.form.isResultNode ? 'Y' : 'N'
            }
            // 引用非字典类型，添加静态字典类型
            if (this.form.type !== 'STATIC_MAP' && this.form.title === '新增') {
              this.dicTypes.push(property)
            }
            this.$emit('holdTempProperty', property, this.form.title)
          }
        })
      }
    }
  }
</script>
<style scope>
  .template-dialog {
    width: 160rem;
  }

  .template-input {
    width: 30rem;
  }

  .template-input input[type=file] {
    display: none !important;
  }
</style>
