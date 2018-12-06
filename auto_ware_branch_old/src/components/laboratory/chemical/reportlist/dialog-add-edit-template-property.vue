<!--新增，修改实验报告单模板属性-->
<template>
  <el-dialog :title="title" :visible.sync="dialogToggle" @close="close"
             class="template-dialog" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="8rem">
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
        <el-select v-model="form.documentType" @change="documentTypeChange"
                   :disabled="form.type ==='REF_INDEX_EVALUATION'"
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
      <!-- 新增指示评定，类型为指示评定时显示 -->
      <el-form-item label="指示评定" v-if="form.type === 'REF_INDEX_EVALUATION' && form.judgeData.length > 0">
        <table border="1">
          <thead>
          <tr>
            <th width="450" class="thead">条件</th>
            <th width="80" class="thead">取值</th>
            <th width="100" class="thead">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in form.judgeData" :key="index">
            <td>
              <div v-for="(colItem, colIndex) in item.labIndexEvaluationLineDos" :key="colIndex">
                <!--选择评定节点，当选择的节点为下拉类型的时，评定比较类型切换成下拉，并加载选项-->
                <el-col :span="7">
                  <el-form-item>
                    <el-select
                      size="small"
                      v-model="colItem.attributeCode"
                      @change="handleSlectChange(colItem, index, colIndex, $event)"
                      class="tableInput">
                      <el-option v-for="recommendItem in colItem.recommendTypes" :key="recommendItem.code"
                                 :label="recommendItem.name"
                                 :value="recommendItem.code"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!--选择评定比较类型-->
                <el-col :span="7">
                  <el-form-item>
                    <el-select
                      size="small"
                      v-model="colItem.symbol"
                      class="tableInput">
                      <el-option v-for="typeItem in relationshipType" :key="typeItem.value" :label="typeItem.name"
                                 :value="typeItem.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!--选择评定目标-->
                <el-col :span="6">
                  <el-form-item>
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

                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button v-if="colIndex === 0" size="small" @click="addCondition(index, colIndex)">添加条件</el-button>
                  <el-button v-else size="small" @click="delCondition(index, colIndex)">删除</el-button>
                </el-col>
              </div>
            </td>
            <!--取值-->
            <td>
              <el-form-item>
                <el-input v-model="form.judgeData[index].indexValue" placeholder='请输入' class="" size="small"></el-input>
              </el-form-item>
            </td>
            <!--添加评定-->
            <td class="thead">
              <el-button size="small" @click="addJudge" v-if="index === 0">添加评定</el-button>
              <el-button size="small" @click="delJudge(index)" v-else>删除</el-button>
            </td>
          </tr>
          </tbody>
        </table>
      </el-form-item>

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
      <!--根据类型设置内容开始-->
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
      <!--根据类型设置内容结束-->

      <!--代码-->
      <el-form-item label="代码" prop="code">
        <el-input v-model="form.code" auto-complete="off" placeholder='请输入' class="template-input"
                  :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-checkbox true-label="Y" false-label="N" label="趋势图显示" v-model="form.isDisplayInMonthTrendMap">
        </el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="handleConfirm('form')">确 定</el-button>
    </div>
    <!--</el-form>-->
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
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
          isDisplayInMonthTrendMap: 'N',
          code: api.commom.randomString(4)
        },
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
          val: [{required: true, message: '请填写值', trigger: 'change'}]
        },
        // 类型下拉是否可见
        typeVisible: false,
        types: [
          {id: 1, name: '常规', value: 'NORMAL', disabled: false},
          {id: 2, name: '引用原始记录单', value: 'REF_TEMP_CAL_RESULT', disabled: false},
          {id: 3, name: '引用指示评定', value: 'REF_INDEX_EVALUATION', disabled: true}, // REF_INDEX_EVALUATION
          {id: 4, name: '引用标样', value: 'REF_TEMP_GUIDE_SAMPLE', disabled: false}
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
        if (item === 'REF_INDEX_EVALUATION' && this.form.judgeData.length === 0) {
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
                attrDocumentType: ''
              }
            ],
            indexValue: ''
          })
        }
        // 设置输入类型
        if (item === 'NORMAL') {
          this.documentTypes.map((item) => {
            item.disabled = false
          })
          // this.form.documentType = 'TEMP_INPUT'
        } else {
          this.documentTypes.map((item) => {
            item.disabled = item.value !== 'TEMP_LABLE'
          })
          this.form.documentType = 'TEMP_LABLE'
        }
      },
      // 标样模板
      showSampleData () {
        api.chemicalLaboratory.originalTempManage.getAllGuideSampleTemplate().then(response => {
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
            // this.loading.dic = false
          })
        }
      },
      getOtherTemplate () {
        let params = {queryLabOriginalTemplateCo: {name: '', isGuideSample: 'N'}}
        api.chemicalLaboratory.originalTempManage.getLabOriginalTemplateVoList(params).then((response) => {
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
      show (data, hasTempProperty) {
        this.dialogToggle = true
        this.form.title = data.title
        this.tempProperty = data.tempProperty
        this.$nextTick(() => {
          let targetIndex = this.types.findIndex(item => item.name === '引用指示评定')
          this.types[targetIndex].disabled = !hasTempProperty
          if (data.title === '新增') {
            this.form.name = ''
            this.form.documentType = ''
            this.form.selectStaticMapId = ''
            this.form.code = api.commom.randomString(4)
            this.form.isDisplayInMonthTrendMap = 'N'
            this.form.type = ''
            this.form.refTemplateId = ''
            this.form.judgeData = []
            this.form.refTemplateAttributeCode = ''
          } else {
            this.form.name = data.row.name
            this.documentTypeChange(data.row.documentType)
            this.form.documentType = data.row.documentType
            this.form.selectStaticMapId = data.row.selectStaticMapId
            this.form.code = data.row.code
            this.form.isDisplayInMonthTrendMap = (data.row.isDisplayInMonthTrendMap && data.row.isDisplayInMonthTrendMap !== '' && data.row.isDisplayInMonthTrendMap === 'Y') ? 'Y' : 'N'
            this.form.type = data.row.type
            this.form.refTemplateId = data.row.refTemplateId
            if (data.row.type === 'REF_INDEX_EVALUATION') {
              data.row.labIndexEvaluationVos.map((evalVos, index) => {
                evalVos.labIndexEvaluationLineDos.map((lineDos, colIndex) => {
                  let selectList = this.getSelectList()
                  let codeIndex = selectList.findIndex(item => item.code === lineDos.attributeCode)
                  let selectType = []
                  if (selectList[codeIndex].documentType === 'TEMP_SELECT') {
                    api.chemicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: selectList[codeIndex].selectStaticMapId}).then(response => {
                      response.data.data.map(item => {
                        selectType.push({name: item.name, value: item.id})
                      })
                    })
                  }
                  this.$set(lineDos, 'selecteType', selectType)
                  this.$set(lineDos, 'attrDocumentType', selectList[codeIndex].documentType)
                  this.$set(lineDos, 'recommendTypes', selectList)
                })
              })
            }
            this.form.judgeData = data.row.labIndexEvaluationVos
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
      handleConfirm (formName) {
        if (this.form.type === 'REF_INDEX_EVALUATION') {
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
              if (labIndexEval[j].attributeCode === '') {
                this.$message.error(`请选择${i + 1}行要评定的值！`)
              }
              if (labIndexEval[j].symbol === '') {
                this.$message.error(`请选择${i + 1}行要评定条件！`)
                return
              }
              if (labIndexEval[j].comparValue === '') {
                this.$message.error(`请选填${i + 1}行比较值！`)
                return
              }
            }
            if (judgeData[i].indexValue === '') {
              this.$message.error(`请先填写${i + 1}行取值！`)
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
              isDisplayInMonthTrendMap: this.form.isDisplayInMonthTrendMap,
              refTemplateAttributeCode: this.form.refTemplateAttributeCode
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
            attrDocumentType: ''
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
              attrDocumentType: ''
            }
          ],
          indexValue: ''
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
          api.chemicalLaboratory.labSelectStaticMap.getLabSelectStaticMapDosByParentId({parentId: selectStaticMapId}).then(
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
<style scoped>
  label {
    font-weight: 400;
  }

  .thead {
    text-align: center;
    padding-top: 0;
  }

  td {
    padding-top: 22px;
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
</style>
