<!--新增，修改模板属性 class="template-dialog" size="tiny"-->
<template>
  <el-dialog :title="form.title" :visible.sync="dialogToggle" @close="close" size="medium" append-to-body
             modal-append-to-body width="60%">
    <el-form :model="form" :rules="rules" ref="form" label-width="96px" style="width: 100%;">
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
      引用标样：标签显示
      -->
      <el-form-item label="输入类型" prop="documentType">
        <el-select v-model="form.documentType" @change="documentTypeChange" @visible-change="documentTypeVisibleChange"
                   class="template-input">
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

      <!-- 指示评定：类型为指示评定时显示，填写指标和条件 -->
      <el-form-item label="指示评定"
                    v-if="['REF_INDEX_EVALUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(form.type) && form.judgeData.length > 0">
        <table border="1">
          <thead>
          <tr>
            <th width="52%">条件</th>
            <th width="12%">取值</th>
            <th width="12%">标准值</th>
            <th width="12%">优先级</th>
            <th width="12%">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in form.judgeData" :key="index">
            <!--条件-->
            <td>
              <div v-for="(colItem, colIndex) in item.labIndexEvaluationLineDos" :key="colIndex">
                <!--选择评定节点，当选择的节点为下拉类型的时，评定比较类型切换成下拉，并加载选项-->
                <el-row>
                  <template v-if="form.type === 'REF_INDEX_EVALUATION'">
                    <el-col :span="5">
                      <el-select size="small" v-model="colItem.indexEvaluationType" class="tableInput">
                        <el-option v-for="item in indexEvaluationTypes"
                                   :key="item.value"
                                   :label="item.name"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-if="colItem.indexEvaluationType === 'CUSTOM_PROPERTY'" v-model="colItem.attributeName"
                                placeholder='请输入'
                                class="tableInput inputWidth"
                                size="small"></el-input>
                      <el-select v-else-if="colItem.indexEvaluationType === 'OWN_PROPERTY'"
                                 size="small"
                                 v-model="colItem.attributeCode"
                                 @change="handleSlectChange(colItem, index, colIndex, $event)"
                                 class="tableInput">
                        <el-option v-for="recommendItem in colItem.recommendTypes" :key="recommendItem.code"
                                   :label="recommendItem.name"
                                   :value="recommendItem.code"></el-option>
                      </el-select>
                    </el-col>
                  </template>
                  <template v-else>
                    <el-col :span="10">
                      <el-select size="small"
                                 v-model="colItem.attributeCode"
                                 @change="handleSlectChange(colItem, index, colIndex, $event)"
                                 class="tableInput">
                        <el-option v-for="recommendItem in colItem.recommendTypes" :key="recommendItem.code"
                                   :label="recommendItem.name"
                                   :value="recommendItem.code"></el-option>
                      </el-select>
                    </el-col>
                  </template>
                  <!--选择评定比较类型-->
                  <el-col :span="5">
                    <el-select
                      size="small"
                      v-model="colItem.symbol"
                      class="tableInput">
                      <el-option v-for="typeItem in relationshipType" :key="typeItem.value" :label="typeItem.name"
                                 :value="typeItem.value"></el-option>
                    </el-select>
                  </el-col>
                  <!--选择评定目标-->
                  <el-col :span="5">
                    <el-select
                      v-if="colItem.attrDocumentType === 'TEMP_SELECT'"
                      size="small"
                      v-model="colItem.comparValue"
                      placeholder='请选择类型'
                      class="tableInput">
                      <el-option
                        v-for="selecteItem in colItem.selecteType"
                        :key="selecteItem.value"
                        :value="selecteItem.name"
                        :label="selecteItem.name"></el-option>
                    </el-select>
                    <el-input v-else
                              v-model="colItem.comparValue"
                              placeholder='请输入'
                              class="tableInput inputWidth"
                              size="small"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button class="tableInput" v-if="colIndex === 0" size="small"
                               @click="addCondition(index, colIndex)">添加条件
                    </el-button>
                    <el-button class="tableInput" v-else size="small" @click="delCondition(index, colIndex)">删除
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </td>
            <!--取值-->
            <td>
              <el-input class="tableInput inputWidth" v-model="form.judgeData[index].indexValue" placeholder='请输入'
                        size="small"></el-input>
            </td>
            <!--标准值-->
            <td>
              <el-input class="tableInput inputWidth" v-model="form.judgeData[index].standardValue" placeholder='请输入'
                        size="small"></el-input>
            </td>
            <!--是否优先级-->
            <td>
              <el-select
                size="small"
                v-model="form.judgeData[index].priority"
                placeholder='请选择类型'
                class="tableInput">
                <el-option
                  v-for="item in selePriority"
                  :key="item.id"
                  :value="item.id"
                  :label="item.value"></el-option>
              </el-select>
            </td>
            <!--添加评定-->
            <td class="thead">
              <el-button class="tableInput" size="small" @click="addJudge" v-if="index === 0">添加评定</el-button>
              <el-button class="tableInput" size="small" @click="delJudge(index)" v-else>删除</el-button>
            </td>
          </tr>
          </tbody>
        </table>
      </el-form-item>

      <!--根据类型设置内容开始-->
      <!--EQUATION：输入公式-->
      <template v-if="['EQUATION', 'TABLE_EQUATION', 'TABLE_AVE', 'TABLE_STANDARD_DEVIATION'].includes(form.type)">
        <!--公式-->
        <el-form-item v-if="['EQUATION', 'TABLE_EQUATION'].includes(form.type)" label="公式" prop="calculation_formula">
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
            <el-option v-for="item in dicTypes" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--根据类型设置内容结束-->
      <!--TABLE的所有节点-->
      <template
        v-if="['REF_TABLE', 'TABLE_ATTRIBUTE', 'TABLE_ATTRIBUTE_INDEX', 'TABLE_AVE', 'TABLE_STANDARD_DEVIATION', 'TABLE_EQUATION'].includes(form.type)">
        <el-form-item label="表格" prop="refTableCode">
          <el-select v-model="form.refTableCode" placeholder="请选择" class="template-input" @change="changeRefTableCode">
            <el-option
              v-for="item in refTableCodes"
              :key="item.id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="['TABLE_AVE', 'TABLE_STANDARD_DEVIATION'].includes(form.type)">
        <el-form-item label="表格属性" prop="refCode">
          <el-select v-model="form.refCode" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in tableRefs"
              :key="item.id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>

      <!--测试次数 -->
      <template v-if="form.type === 'TABLE'">
        <el-form-item label="测试次数" prop="testNumber">
          <el-select v-model="form.testNumber" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in testTime"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--代码code-->
      <el-form-item label="代码" prop="code">
        <el-input v-model="form.code" auto-complete="off" placeholder='请输入' class="template-input"
                  :disabled="true"></el-input>
      </el-form-item>

      <!--是否设备采集-->
      <el-form-item label="是否设备采集" prop="isEquipmentCollection">
        <el-checkbox v-model="form.isEquipmentCollection" true-label="Y" false-label="N"></el-checkbox>
      </el-form-item>
      <el-form-item v-if="form.isEquipmentCollection === 'Y'" label="设备" prop="deviceId">
        <el-select v-model="form.deviceId" placeholder="请选择" class="template-input">
          <el-option v-for="item in devices" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否结果节点" prop="isResultNode">
        <el-checkbox v-model="form.isResultNode" true-label="Y" false-label="N"></el-checkbox>
      </el-form-item>

      <!--<div slot="footer" class="dialog-footer">-->
      <el-form-item class="fr">
        <el-button type="primary" @click="handleConfirm('form')">确 定</el-button>
      </el-form-item>
      <!--</div>-->
    </el-form>
    <formula-alert-dialog ref="formulaDialog"></formula-alert-dialog>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api/index'
  import storage from 'storage'

  export default {
    components: {},
    created () {
      this.user = storage.getUser()
    },
    data () {
      return {
        dialogToggle: false,
        user: {},
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
          isResultNode: 'N',
          refTemplateAttributeCode: '',
          // 新增测试次数
          testNumber: '',
          // 新增table节点
          refTableCode: '',
          // 指标评定
          judgeData: [],
          // 是否设备采集
          isEquipmentCollection: '',
          // 设备ID
          deviceId: ''
        },
        // 评定级别
        selePriority: [
          {id: '1', value: '第1级'},
          {id: '2', value: '第2级'},
          {id: '3', value: '第3级'},
          {id: '4', value: '第4级'},
          {id: '5', value: '第5级'},
          {id: '6', value: '第6级'},
          {id: '7', value: '第7级'},
          {id: '8', value: '第8级'},
          {id: '9', value: '第9级'},
          {id: '10', value: '第10级'}
        ],
        refTableCodes: [],
        testTime: [
          {
            id: '1',
            value: '一次'
          },
          {
            id: '2',
            value: '二次'
          }
        ],
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
          ],
          refTableCode: [{required: true, message: '请选择table节点', trigger: 'change'}],
          testNumber: [{required: true, message: '请选择测试次数', trigger: 'change'}]
        },
        // 类型下拉是否可见
        typeVisible: false,
        // 输入类型下拉是否可见
        docTypeVisible: false,
        // 类型
        types: [
          // 通过输入获取
          {id: 1, name: '常规', value: 'NORMAL', disabled: false},
          {id: 2, name: '引用模板', value: 'REF_TEMP_CAL_RESULT', disabled: false},
          // 通过“计算”获取
          {id: 3, name: '公式', value: 'EQUATION', disabled: false},
//          {id: 4, name: '引用标样', value: 'REF_TEMP_GUIDE_SAMPLE', disabled: false},
          // 通过“获取F值”获取
//          {id: 5, name: '静态字典', value: 'STATIC_MAP', disabled: true},
          {id: 6, name: '引用指示评定', value: 'REF_INDEX_EVALUATION', disabled: true},
          {id: 7, name: '表格', value: 'TABLE', disabled: false},
          {id: 8, name: '表格属性', value: 'TABLE_ATTRIBUTE', disabled: false},
          {id: 9, name: '引用评定表格', value: 'REF_TABLE', disabled: false},
          {id: 10, name: '表格属性指标评定', value: 'TABLE_ATTRIBUTE_INDEX', disabled: false},
          {id: 12, name: '表格内平均数', value: 'TABLE_AVE', disabled: false},  // 表格内平均数
          {id: 13, name: '表格内标准偏差', value: 'TABLE_STANDARD_DEVIATION', disabled: false},  // 表格内标准偏差
          {id: 14, name: '表格内公式', value: 'TABLE_EQUATION', disabled: false}  // 表格内公式
        ],
        // 输入类型
        documentTypes: [
          {id: 1, name: '输入框', value: 'TEMP_INPUT', disabled: false},
          {id: 2, name: '标签显示', value: 'TEMP_LABLE', disabled: false},
          {id: 3, name: '下拉框', value: 'TEMP_SELECT', disabled: false},
          {id: 4, name: '时间控件', value: 'TEMP_DATE_INPUT', disabled: false},
          {id: 5, name: '人员控件', value: 'TEMP_USER', disabled: false}
        ],
        // 指标评定比较关系
        relationshipType: [
          {id: 1, name: '等于', value: 'EQUAL_TO'},
          {id: 2, name: '大于', value: 'GREATER_THAN'},
          {id: 3, name: '大于等于', value: 'GREATER_OR_EQUAL_THAN'},
          {id: 4, name: '小于', value: 'LESS_THAN'},
          {id: 5, name: '小于等于', value: 'LESS_OR_EQUAL_THAN'},
          {id: 5, name: '是', value: 'IS_MY_SELF'}
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
        // 表格属性集合
        tableRefs: [],
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
        // 评定节点类型
        indexEvaluationTypes: [
          {name: '自有属性', value: 'OWN_PROPERTY'},
          {name: '自定义', value: 'CUSTOM_PROPERTY'}
        ],
        // 设备
        devices: [],
        dialog: {},
        loading: {dic: false},
        sampleDemo: ''
      }
    },
    props: {},
    mounted () {
      this.getDevices()
    },
    computed: {},
    methods: {
      // 类型下拉可视之后
      typeVisibleChange (visible) {
        this.typeVisible = visible
      },
      // 输入类型下拉可视之后
      documentTypeVisibleChange (visible) {
        this.docTypeVisible = visible
      },
      // 选择类型
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
        // 选择类型为“引用指示评定”
        if (['REF_INDEX_EVALUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(item) && this.form.judgeData.length === 0) {
          this.form.judgeData.push({
            creator: this.user.userId,
            modifier: this.user.userId,
            attributeCode: this.form.code,
            labIndexEvaluationLineDos: [
              {
                creator: this.user.userId,
                modifier: this.user.userId,
                attributeCode: '',
                symbol: '',
                comparValue: '',
                recommendTypes: this.getSelectList(),
                selecteType: [],
                attrDocumentType: '',
                indexEvaluationType: 'OWN_PROPERTY',
                attributeName: ''
              }
            ],
            indexValue: '',
            standardValue: '',
            priority: '',
            source: 'LAB_ORIGINAL'
          })
        }
        // 设置输入类型
        if (['NORMAL', 'TABLE_ATTRIBUTE'].includes(item)) {
          this.form.documentType = 'TEMP_INPUT'
          this.documentTypes.map((item) => {
            item.disabled = false
          })
        } else {
          this.form.documentType = 'TEMP_LABLE'
          this.documentTypes.map((item) => {
            item.disabled = item.value !== 'TEMP_LABLE'
          })
        }
      },
      // 标样模板
      showSampleData () {
        api.physicalLaboratory.originalTempManage.getAllGuideSampleTemplate().then(response => {
          const data = response.data
          if (data.success === true) {
            this.sampleDemo = data.data
            return true
          } else {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      },
      documentTypeChange (item) {
        if (this.docTypeVisible) {
          let selectList = this.getSelectList()
          // 禁止修改被指标评定引用的下拉属性
          this.tempProperty.forEach(prop => {
            if (['REF_INDEX_EVALUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(prop.type)) {
              prop.labIndexEvaluationVos.forEach(evalVos => {
                evalVos.labIndexEvaluationLineDos.forEach(lins => {
                  let property = selectList.find(list => {
                    return list.code === lins.attributeCode
                  })
                  if (property && (property.documentType === 'TEMP_SELECT' || item === 'TEMP_SELECT')) {
                    this.$message({message: '该属性在引用指标中被引用，请重新设置', type: 'warning'})
                  }
                })
              })
            }
          })
        }

        if (item === 'TEMP_SELECT') {
          this.loading.dic = true
          api.physicalLaboratory.labSelectStaticMap.getAllParentDos().then((response) => {
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
      show (data) {
        this.dialogToggle = true
        this.form.title = data.title
        this.tempProperty = data.tempProperty
        this.refTableCodes = []
        this.tempProperty.forEach(item => {
          if (item.type === 'TABLE') this.refTableCodes.push({code: item.code, name: item.name})
        })
        this.types.forEach(item => {
          if (item.value === 'STATIC_MAP') {
            item.disabled = this.tempProperty.findIndex((value) => {
              return value.type !== 'STATIC_MAP'
            }) === -1
          }
          if (['REF_INDEX_EVALUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(item.value)) item.disabled = data.tempProperty.length === 0
          if (['REF_TABLE', 'TABLE_ATTRIBUTE'].includes(item.value)) item.disabled = this.refTableCodes.length === 0
        })
        if (data.title === '新增') {
          this.$nextTick(() => {
            this.form.type = 'NORMAL'
            this.form.pricisionType = ''
            this.form.pricision = ''
            this.form.refTemplateId = ''
            this.form.judgeData = []
            this.form.refTemplateAttributeCode = ''
            this.form.dicType = ''
            this.form.refCode = ''
            this.form.calculation_formula = ''
            this.form.name = ''
            this.form.documentType = 'TEMP_INPUT'
            this.form.selectStaticMapId = ''
            this.form.testNumber = ''
            this.form.refTableCode = ''
            this.form.code = api.commom.randomString(4)
            // checkbox绑定值
            this.form.isResultNode = 'N'
            // 编辑的时候新增
            this.dicTypes = []
            if (data.tempProperty.length > 0) {
              for (let i = 0; i < data.tempProperty.length; i++) {
                // 添加静态字典类型
                if (data.tempProperty[i].type !== 'STATIC_MAP') {
                  this.dicTypes.push(data.tempProperty[i])
                }
              }
            }
            // 是否设备采集
            this.form.isEquipmentCollection = 'N'
            this.form.deviceId = ''
          })
        } else {
          console.log(data)
          // 把数据库里的值转换成checkbox绑定值
          this.form.isResultNode = data.row.isResultNode
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
          this.form.testNumber = data.row.testNumber
          if (['TABLE_AVE', 'TABLE_STANDARD_DEVIATION'].includes(data.row.type)) this.changeRefTableCode(data.row.refTableCode)
          this.form.refTableCode = data.row.refTableCode
          if (['REF_INDEX_EVALUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(data.row.type)) {
            data.row.labIndexEvaluationVos.map((evalVos, index) => {
              evalVos.labIndexEvaluationLineDos.map((lineDos, colIndex) => {
                let selectList = this.getSelectList()
                if (lineDos.indexEvaluationType === 'OWN_PROPERTY') {
                  let codeIndex = selectList.findIndex(item => item.code === lineDos.attributeCode)
                  let selectType = []
                  if (!Object.is(codeIndex, -1)) {
                    if (selectList[codeIndex].documentType === 'TEMP_SELECT') {
                      api.physicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: selectList[codeIndex].selectStaticMapId}).then(response => {
                        response.data.data.map(item => {
                          selectType.push({name: item.name, value: item.id})
                        })
                      })
                    }
                    this.$set(lineDos, 'attrDocumentType', selectList[codeIndex].documentType)
                  }
                  this.$set(lineDos, 'selecteType', selectType)
                }
                this.$set(lineDos, 'recommendTypes', selectList)
              })
            })
          }
          this.form.judgeData = data.row.labIndexEvaluationVos
          Object.assign(this.form, {index: data.$index})
          if (data.row.refTemplateId) this.getAttribute(data.row.refTemplateId)
          if (data.row.type === 'REF_TEMP_GUIDE_SAMPLE') this.showSampleData()
          if (data.row.type === 'REF_TEMP_CAL_RESULT') this.getOtherTemplate()
          // 是否设备采集
          this.form.isEquipmentCollection = data.row.isEquipmentCollection
          // 设备ID
          this.form.deviceId = data.row.deviceId
        }
      },
      getSelectList () {
        return this.tempProperty.map((property, propIndex) => {
          return {
            name: property.name,
            code: property.code,
            selectStaticMapId: property.selectStaticMapId,
            documentType: property.documentType
          }
        })
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
          api.physicalLaboratory.originalTempManage.getLabOriginalTemplateAttributeDosByTemplateId({id: refTemplateId}).then((response) => {
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
        api.physicalLaboratory.originalTempManage.getLabOriginalTemplateVoList(params).then((response) => {
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
        if (['REF_INDEX_EVALUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(this.form.type)) {
          let judgeData = this.form.judgeData
          let judgeLen = judgeData.length
          if (judgeLen === 0) {
            this.$message.error('请添加评定')
            return
          }
          for (let i = 0; i < judgeLen; i++) {
            let labLen = judgeData[i].labIndexEvaluationLineDos.length
            if (labLen === 0) {
              this.$message.error(`请添加${i}行评定`)
            }
            for (let j = 0; j < labLen; j++) {
              let labIndexEval = judgeData[i].labIndexEvaluationLineDos
              if (labIndexEval[j].indexEvaluationType === 'OWN_PROPERTY' && labIndexEval[j].attributeCode === '') {
                this.$message.error(`请选择${i + 1}行${j + 1}条要评定的值！`)
                return
              }
              if (labIndexEval[j].indexEvaluationType === 'CUSTOM_PROPERTY' && labIndexEval[j].attributeName === '') {
                this.$message.error(`请填写${i + 1}行${j + 1}条要评定的值！`)
                return
              }
              if (labIndexEval[j].symbol === '') {
                this.$message.error(`请选择${i + 1}行${j + 1}条要评定条件！`)
                return
              }
              if (labIndexEval[j].comparValue === '') {
                this.$message.error(`请选填${i + 1}行${j + 1}条比较值！`)
                return
              }
            }
            if (judgeData[i].indexValue === '') {
              this.$message.error(`请先填写${i + 1}行取值！`)
              return
            }
            if (judgeData[i].standardValue === '') {
              this.$message.error(`请先填写${i + 1}行标准值！`)
              return
            }
            if (judgeData[i].priority === '') {
              this.$message.error(`请先填写${i + 1}行优先级！`)
              return
            }
          }
        } else {
          this.form.judgeData = []
        }
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
              isResultNode: this.form.isResultNode,
              testNumber: this.form.testNumber,
              refTableCode: this.form.refTableCode,
              labIndexEvaluationVos: this.form.judgeData,
              // 是否设备采集
              isEquipmentCollection: this.form.isEquipmentCollection,
              // 设备ID
              deviceId: this.form.deviceId
            }
            // 引用非字典类型，添加静态字典类型
            if (this.form.type !== 'STATIC_MAP' && this.form.title === '新增') {
              this.dicTypes.push(property)
            }
            this.$emit('holdTempProperty', property, this.form.title)
          }
        })
      },
      addCondition (index, colIndex) {
        this.form.judgeData[index].labIndexEvaluationLineDos.push(
          {
            creator: this.user.userId,
            modifier: this.userId,
            attributeCode: '',
            symbol: '',
            comparValue: '',
            recommendTypes: this.getSelectList(),
            selecteType: [],
            attrDocumentType: '',
            indexEvaluationType: 'OWN_PROPERTY',
            attributeName: ''
          }
        )
      },
      delCondition (index, colIndex) {
        this.form.judgeData[index].labIndexEvaluationLineDos.splice(colIndex, 1)
      },
      addJudge () {
        this.form.judgeData.push({
          creator: this.user.userId,
          modifier: this.user.userId,
          attributeCode: this.form.code,
          labIndexEvaluationLineDos: [
            {
              creator: this.user.userId,
              modifier: this.userId,
              attributeCode: '',
              symbol: '',
              comparValue: '',
              recommendTypes: this.getSelectList(),
              selecteType: [],
              attrDocumentType: '',
              indexEvaluationType: 'OWN_PROPERTY',
              attributeName: ''
            }
          ],
          indexValue: '',
          standardValue: '',
          priority: '',
          source: 'LAB_ORIGINAL'
        })
      },
      delJudge (index) {
        this.form.judgeData.splice(index, 1)
      },
      handleSlectChange (colItem, index, colIndex, event) {
        let codeIndex = colItem.recommendTypes.findIndex(item => item.code === event)
        let {documentType, selectStaticMapId} = colItem.recommendTypes[codeIndex]
        colItem.attrDocumentType = (documentType === 'TEMP_SELECT') ? 'TEMP_SELECT' : ''
        colItem.comparValue = (documentType === 'TEMP_SELECT') ? '' : colItem.comparValue
        if (documentType === 'TEMP_SELECT') {
          api.physicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: selectStaticMapId}).then(
            res => {
              if (res.data.success) {
                if (res.data.data.length > 0) {
                  colItem.selecteType = []
                  res.data.data.forEach(item => {
                    colItem.selecteType.push({name: item.name, value: item.id})
                  })
                } else {
                  this.$message.error('没有评定数据')
                }
              }
            }
          ).catch(err => {
            console.log(err)
          })
        }
      },
      changeRefTableCode (code) {
        this.tableRefs = []
        this.tempProperty.forEach(item => {
          if (['TABLE_ATTRIBUTE', 'TABLE_EQUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(item.type) && item.refTableCode === code) {
            this.tableRefs.push(item)
          }
        })
      },
      // 获取设备列表
      getDevices () {
        let params = {queryLabDeviceManagementCo: {type: 'SERIAL_PORT'}, page: {current: 1, length: 10000}}
        api.physicalLaboratory.labDeviceManagementController.getLabDeviceManagementDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.devices = data.data.data
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
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

  .el-dialog--medium {
    width: 80%;
  }

  th, td {
    text-align: center;
  }

  .inputWidth {
    width: 100px;
  }

  .tableInput {
    margin: 0 2px;
  }
</style>
