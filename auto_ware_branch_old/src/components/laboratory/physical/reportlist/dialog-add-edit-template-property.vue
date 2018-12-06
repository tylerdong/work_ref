<!--新增，修改实验报告单模板属性-->
<template>
  <el-dialog :title="title" :visible.sync="dialogToggle" @close="close" width="60%" append-to-body modal-append-to-body>
    <el-form :model="form" :rules="rules" ref="form" label-width="96px" style="width: 100%;">
      <!--类型-->
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择" class="template-input"
                   @change="typeChange" @visible-change="typeVisibleChange">
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :disabled="item.disabled"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--输入类型:根据类型选择不同的输入类型
        常规：任意选择
        引用原始记录单：标签显示
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
                              class="tableInput"
                              size="small"></el-input>

                  </el-col>
                  <el-col :span="4">
                    <el-button v-if="colIndex === 0" size="small" @click="addCondition(index, colIndex)">添加条件
                    </el-button>
                    <el-button v-else size="small" @click="delCondition(index, colIndex)">删除</el-button>
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
                class="tableInput inputWidth">
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

      <!--引用标样：选择标样模板-->
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

      <!--table属性和引用的table：选择table节点-->
      <template
        v-if="['REF_TABLE', 'TABLE_ATTRIBUTE', 'TABLE_ATTRIBUTE_INDEX'].includes(form.type)">
        <el-form-item label="table节点" prop="refTableCode">
          <el-select v-model="form.refTableCode" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in refTableCodes"
              :key="item.id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--table：选择测试次数 -->
      <template v-if="form.type === 'TABLE'">
        <el-form-item label="测试次数" prop="testNumber">
          <el-select v-model="form.testNumber" placeholder="请选择" class="template-input">
            <el-option
              v-for="item in testNumbers"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--原始记录单：选择模板和属性-->
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
        <el-form-item>
          <template>
            <el-checkbox v-model="form.isRoutineProject" true-label="Y" false-label="N">是否常规项目</el-checkbox>
          </template>
        </el-form-item>
      </template>
      <!--根据类型设置内容结束-->

      <!--代码-->
      <el-form-item label="代码" prop="code">
        <el-input v-model="form.code" auto-complete="off" placeholder='请输入' class="template-input"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <template>
          <el-checkbox v-model="form.isSummaryDisplay" true-label="Y" false-label="N">是否汇总显示</el-checkbox>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-checkbox v-model="form.isWeekSummary" true-label="Y" false-label="N">是否周汇总显示</el-checkbox>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-checkbox v-model="form.isMonthSummary" true-label="Y" false-label="N">是否月汇总显示</el-checkbox>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="handleConfirm('form')">确 定</el-button>
    </div>
    <!--</el-form>-->
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api/index'
  import storage from 'storage'

  export default {
    created () {
      this.user = storage.getUser()
    },
    data () {
      return {
        dialogToggle: false,
        user: {},
        tempProperty: [],  // 当前所有的节点
        valType: '', // TEMP_SELECT
        selecteType: [],
        refTemplateAttributeCodes: '',
        form: {
          type: '',
          refTemplateId: '',
          name: '',
          checkedType: [],
          documentType: '',
          selectStaticMap: '',
          judgeData: [],
          selectStaticMapId: '',
          refTemplateAttributeCode: '',
          isSummaryDisplay: 'N',
          isWeekSummary: 'N',
          isMonthSummary: 'N',
          isRoutineProject: 'N',
          code: api.commom.randomString(4),
          // 新增测试次数
          testNumber: '',
          // 新增table节点
          refTableCode: '',
          // 新增是否批量审核
          isBitchAudit: false,
          // 新增是否纤度
          isFineness: false
        },
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
          {id: '10', value: '第10级'},
          {id: '1', value: '第11级'},
          {id: '2', value: '第12级'},
          {id: '3', value: '第13级'},
          {id: '4', value: '第14级'},
          {id: '5', value: '第15级'},
          {id: '6', value: '第16级'},
          {id: '7', value: '第17级'},
          {id: '8', value: '第18级'},
          {id: '9', value: '第19级'},
          {id: '10', value: '第20级'}
        ],
        testNumbers: [
          {id: '1', value: '一次'},
          {id: '2', value: '二次'}
        ],
        // table节点选择项
        refTableCodes: [],
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}
          ],
          type: [{required: true, message: '请选择类型', trigger: 'change'}],
          refTemplateId: [{required: true, message: '请选择引用模板', trigger: 'change'}],
          refTemplateAttributeCode: [{required: true, message: '请选择属性', trigger: 'change'}],
          documentType: [{required: true, message: '请选择输入类型', trigger: 'change'}],
          propertyType: [{required: true, message: '请选择属性类型', trigger: 'change'}],
          relationshipType: [{required: true, message: '请选择关系类型', trigger: 'change'}],
          conditionType: [{required: true, message: '请填写条件值', trigger: 'change'}],
          val: [{required: true, message: '请填写值', trigger: 'change'}],
          refTableCode: [{required: true, message: '请选择table节点', trigger: 'change'}],
          testNumber: [{required: true, message: '请选择测试次数', trigger: 'change'}]
        },
        // 类型下拉是否可见
        typeVisible: false,
        // 输入类型下拉是否可见
        docTypeVisible: false,
        types: [
          {id: 1, name: '常规', value: 'NORMAL', disabled: false},
          {id: 2, name: '引用原始记录单', value: 'REF_TEMP_CAL_RESULT', disabled: false},
//          {id: 3, name: '引用标样', value: 'REF_TEMP_GUIDE_SAMPLE', disabled: false},
          {id: 4, name: '引用指示评定', value: 'REF_INDEX_EVALUATION', disabled: true}, // REF_INDEX_EVALUATION
          {id: 5, name: '表格', value: 'TABLE', disabled: false},
          {id: 6, name: '表格属性', value: 'TABLE_ATTRIBUTE', disabled: false},
          {id: 7, name: '引用评定表格', value: 'REF_TABLE', disabled: false},
          {id: 8, name: '表格属性指标评定', value: 'TABLE_ATTRIBUTE_INDEX', disabled: false}
        ],
        documentTypes: [
          {id: 1, name: '输入框', value: 'TEMP_INPUT'},
          {id: 2, name: '标签显示', value: 'TEMP_LABLE'},
          {id: 3, name: '下拉框', value: 'TEMP_SELECT'},
          {id: 4, name: '时间控件', value: 'TEMP_DATE_INPUT'},
          {id: 5, name: '人员控件', value: 'TEMP_USER', disabled: false}
        ],
        relationshipType: [
          {id: 1, name: '等于', value: 'EQUAL_TO'},
          {id: 2, name: '大于', value: 'GREATER_THAN'},
          {id: 3, name: '大于等于', value: 'GREATER_OR_EQUAL_THAN'},
          {id: 4, name: '小于', value: 'LESS_THAN'},
          {id: 5, name: '小于等于', value: 'LESS_OR_EQUAL_THAN'},
          {id: 5, name: '是', value: 'IS_MY_SELF'}
        ],
        selectStaticMaps: [],
        // 模板下拉是否可见
        refTempVisible: false,
        refTemplates: [],
        // 评定节点类型
        indexEvaluationTypes: [
          {name: '自有属性', value: 'OWN_PROPERTY'},
          {name: '自定义', value: 'CUSTOM_PROPERTY'}
        ],
        dialog: {},
        fileList: [
          {name: 'pdf.png', url: ''}
        ],
        loading: false,
        sampleDemo: ''
      }
    },
    props: {
      title: {
        type: String,
        default: function () {
          return ''
        }
      }
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
      /** 选择类型  */
      typeChange (item) {
        // 选择类型为“引用原始记录”，查找模板数据
        if (item === 'REF_TEMP_CAL_RESULT') {
          if (this.typeVisible) {
            this.form.refTemplateId = ''
            this.form.refTemplateAttributeCode = ''
          }
          this.getOtherTemplate()
        }
        // 选择类型为“引用标样”，查找模板数据
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
            source: 'LAB_RPT'
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
        console.log(this.docTypeVisible)
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
            // this.loading.dic = false
          })
        }
      },
      getOtherTemplate () {
        let params = {queryLabOriginalTemplateCo: {name: '', isGuideSample: 'N'}}
        api.physicalLaboratory.originalTempManage.getLabOriginalTemplateVoList(params).then((response) => {
          let data = response.data
          if (data.success) {
            if (data.data.data.length === 0) {
              this.$message.error('没有原始记录单')
            } else {
              this.refTemplates = data.data.data
            }
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      show (data) {
        console.log('data')
        console.log(data)
        this.dialogToggle = true
        this.form.title = data.title
        this.tempProperty = data.tempProperty
        this.refTableCodes = []
        this.tempProperty.forEach(item => {
          if (item.type === 'TABLE') this.refTableCodes.push({code: item.code, name: item.name})
        })
        this.$nextTick(() => {
          this.types.forEach(item => {
            if (['REF_INDEX_EVALUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(item.value)) item.disabled = data.tempProperty.length === 0
            if (['REF_TABLE', 'TABLE_ATTRIBUTE'].includes(item.value)) item.disabled = this.refTableCodes.length === 0
          })
          if (data.title === '新增') {
            this.form.name = ''
            this.form.documentType = ''
            this.form.selectStaticMapId = ''
            this.form.code = api.commom.randomString(4)
            this.form.type = ''
            this.form.refTemplateId = ''
            this.form.judgeData = []
            this.form.priority = []
            this.form.refTemplateAttributeCode = ''
            this.form.isSummaryDisplay = 'N'
            this.form.isWeekSummary = 'N'
            this.form.isMonthSummary = 'N'
            this.form.isRoutineProject = 'N'
            this.form.testNumber = ''
            this.form.refTableCode = ''
          } else {
            this.form.name = data.row.name
            this.documentTypeChange(data.row.documentType)
            this.form.documentType = data.row.documentType
            this.form.selectStaticMapId = data.row.selectStaticMapId
            this.form.code = data.row.code
            this.form.type = data.row.type
            this.form.refTemplateId = data.row.refTemplateId
            this.form.isSummaryDisplay = data.row.isSummaryDisplay
            this.form.isWeekSummary = data.row.isWeekSummary === undefined ? 'N' : data.row.isWeekSummary
            this.form.isMonthSummary = data.row.isMonthSummary === undefined ? 'N' : data.row.isMonthSummary
            this.form.isRoutineProject = data.row.isRoutineProject
            this.form.testNumber = data.row.testNumber
            this.form.refTableCode = data.row.refTableCode
            if (['REF_INDEX_EVALUATION', 'TABLE_ATTRIBUTE_INDEX'].includes(data.row.type)) {
              data.row.labIndexEvaluationVos.map((evalVos, index) => {
                evalVos.labIndexEvaluationLineDos.map((lineDos, colIndex) => {
                  let selectList = this.getSelectList()
                  if (lineDos.indexEvaluationType === 'OWN_PROPERTY') {
                    let codeIndex = selectList.findIndex(item => item.code === lineDos.attributeCode)
                    let selectType = []
                    if (selectList[codeIndex].documentType === 'TEMP_SELECT') {
                      api.physicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: selectList[codeIndex].selectStaticMapId}).then(response => {
                        response.data.data.map(item => {
                          selectType.push({name: item.name, value: item.id})
                        })
                      })
                    }
                    this.$set(lineDos, 'selecteType', selectType)
                    this.$set(lineDos, 'attrDocumentType', selectList[codeIndex].documentType)
                  }
                  this.$set(lineDos, 'recommendTypes', selectList)
                })
              })
            }
            this.form.judgeData = data.row.labIndexEvaluationVos
            this.form.priority = data.row.priority
            this.form.refTemplateAttributeCode = data.row.refTemplateAttributeCode
            if (data.row.refTemplateId) this.getAttribute(data.row.refTemplateId)
            if (data.row.type === 'REF_TEMP_GUIDE_SAMPLE') this.showSampleData()
            if (data.row.type === 'REF_TEMP_CAL_RESULT') this.getOtherTemplate()
          }
        })
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
            this.$emit('holdReportProperty', {
              labIndexEvaluationVos: this.form.judgeData,
              type: this.form.type,
              refTemplateId: this.form.refTemplateId,
              name: this.form.name,
              documentType: this.form.documentType,
              selectStaticMapId: this.form.selectStaticMapId,
              code: this.form.code,
              refTemplateAttributeCode: this.form.refTemplateAttributeCode,
              isSummaryDisplay: this.form.isSummaryDisplay,
              isWeekSummary: this.form.isWeekSummary,
              isMonthSummary: this.form.isMonthSummary,
              isRoutineProject: this.form.isRoutineProject,
              testNumber: this.form.testNumber,
              refTableCode: this.form.refTableCode
            }, this.form.title)
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
          source: 'LAB_RPT'
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
                colItem.selecteType = []
                let len = res.data.data.length
                for (let i = 0; i < len; i++) {
                  colItem.selecteType.push({
                    name: res.data.data[i].name,
                    value: res.data.data[i].id
                  })
                }
              }
            }
          ).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
</script>
<style scope>
  label {
    font-weight: 400;
  }

  .thead {
    text-align: center;
    padding-top: 0;
  }

  .el-form-item {
    margin-bottom: 22px !important;
  }

  .template-dialog {
    /*width: 160rem;*/
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
