<!--新增原始记录模板-->
<template>
  <div ref="dialogMain">
    <jk-dialog :title="form.title" :visible.sync="dialogVisible" width="1170px">
      <div style="height: 100%;width: 360px; overflow-y: auto;float: left;border: 1px solid #ddd">
        <el-button class="actionBtn" type="primary" @click="editTemplateInfo">编辑模板信息</el-button>
        <el-button class="actionBtn" type="primary" @click="addTemplateProperty">新增模板属性</el-button>
        <el-table :data="form.tempProperty" style="width: 100%"
                  v-loading="loading.list" element-loading-text="加载中">
          <el-table-column label="名称">
            <template slot-scope="scope">
              {{`${scope.row.name}(${scope.row.code})`}}<span
              style="display: none">{{JSON.stringify(scope.row)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="editProperty(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
              <el-button @click="deleteProperty(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="height: 100%;overflow: auto;margin-left: 380px;border: 1px solid #ddd">
        <div class="relativeDiv" style="position: relative;">
          <img id="template" v-show="imgSrc !== ''" :src="imgSrc"
               style="width: 735px; height: 1039px;border-bottom: 1px solid #ddd">
          <sticked-dom v-bind:domarray="form.stickedDom"></sticked-dom>
        </div>
        <el-button style="margin: 10px;" @click="save" v-loading="loading.save" type="primary">保存</el-button>
      </div>
    </jk-dialog>
    <edit-temp-dialog ref="editTempInfo" @holeTempInfo="holeTempInfo" @loadPdfImg="loadPdfImg"></edit-temp-dialog>
    <add-temp-prop-dialog ref="addTempProp" @holdTempProperty="holdTempProperty"></add-temp-prop-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  //  const WIDTH_HEIGHT_RATE = (210 / 297).toFixed(4)
  import { DragProperty } from './../../../../module/templateGenerate'
  import { eventHub } from '../../../../module/eventHub'
  import storage from 'storage'
  import * as api from 'src/api'

  export default {
    components: {
      jkDialog: require('common/dialog-side.vue'),
      editTempDialog: require('./dialog-edit-template-info.vue'),
      addTempPropDialog: require('./dialog-add-edit-template-property.vue'),
      stickedDom: require('common/stickedDom.vue')
    },
    created () {
    },
    data () {
      return {
        height: 1200,
        dialogVisible: false,
        user: null,
        imgSrc: '',
        form: {
          title: '',
          id: '',
          tempInfo: {},
          tempProperty: [],
          stickedDom: []
        },
        loading: {
          list: false,
          save: false
        },
        dragProperty: null,
        moveProperty: null
      }
    },
    props: {},
    mounted () {
      this.user = storage.getUser()
      eventHub.$on('renderStickedDom', (stickedArray) => {
        this.form.stickedDom = stickedArray
      })
      eventHub.$on('removeStickedDom', (index) => {
        this.form.stickedDom.splice(index, 1)
      })
    },
    computed: {},
    updated () {
      this.rowDragover()
    },
    methods: {
      show (formData) {
        this.dialogVisible = true
        if (formData.title === '修改') {
          Object.assign(this.form, formData)
          this.initTempData(formData)
        } else {
          this.form.title = formData.title
          this.form.id = ''
          this.form.tempInfo = {}
          this.form.tempProperty = []
          this.form.stickedDom = []
          this.imgSrc = ''
        }
      },
      // 列表页面点击修改，查询模板数据
      initTempData (data) {
        this.loading.list = true
        let promise = new Promise((resolve, reject) => {
          // pdf图片信息
          api.chemicalLaboratory.fileManage.downloadFdfToJpg({fileId: data.fileId}).then((response) => {
            let imgData = response.data
            let fileName = ''
            if (imgData.success) {
              fileName = `${imgData.data.fileName}.${imgData.data.fileType}`
              this.imgSrc = `data:image/jpeg;base64,${imgData.data.pdfImg}`
            } else {
              this.$message.error('没有上传pdf文件')
              fileName = '未上传'
            }
            // 无论是否获取成功都获取单条信息
            resolve(fileName)
          }).finally(() => {
            this.loading.list = false
          })
        })
        promise.then((fileName) => {
          api.chemicalLaboratory.originalTempManage.getLabOriginalTemplateVoById({id: data.id}).then((response) => {
            let data = response.data
            this.renderTempData(data.data, fileName)
          })
        })
      },
      imageSize () {
        let width = $('img#template').width()
        let height = $('img#template').height()
        return {width, height}
      },
      // 给模板数据赋值
      renderTempData (data, fileName) {
        // 当前编辑项的主键id
        this.form.id = data.id
        // 模板属性列表
        this.form.tempProperty = data.labOriginalTemplateAttributeDos
        // 模板信息
        let {name, groupId, fileId, calType, calOriRecordNumber, resultPricision, isGuideSample} = data
        this.form.tempInfo = {
          name,
          groupId,
          fileId,
          calType,
          calOriRecordNumber,
          fileName,
          resultPricision,
          isGuideSample
        }
        this.$refs.editTempInfo.initData(this.form.tempInfo)
        // 图片上的属性
        let fieldLocationJson = JSON.parse(data.fieldLocationJson)
        // 所有已经放在界面上的图标
        let size = this.imageSize()
        let locationArray = fieldLocationJson.map((value, index, arr) => {
          // 用百分比换算偏移
          return {
            offsetX: (value.x * size.width / 100).toFixed(2),
            offsetY: (value.y * size.height / 100).toFixed(2),
            name: value.templateName,
            nodeCode: value.nodeCode
          }
        })
        this.form.stickedDom = locationArray
        DragProperty.stickedArray = locationArray
      },
      /* 初始化拖拽 */
      rowDragover () {
        /** 从table的某一行向左边拖放 */
        let main = this.$refs.dialogMain.querySelector('.jk-dialog__main')
        let tableTR = $(main).find('table.el-table__body tr')
        let img = $(main).find('img#template')
        $(tableTR).find('td:first-child').attr('draggable', true)
        this.dragProperty = new DragProperty(tableTR, img)
        this.dragProperty.printLog()
      },
      // 编辑模板信息
      editTemplateInfo () {
        this.$refs.editTempInfo.show(this.form.tempInfo)
      },
      // 新增模板属性
      addTemplateProperty () {
        let hasOtherType = this.form.tempProperty.findIndex((value, index, arr) => {
          return value.type !== 'STATIC_MAP'
        }) > -1
        this.$refs.addTempProp.show({title: '新增', tempProperty: this.form.tempProperty}, hasOtherType)
      },
      // 编辑模板属性
      editProperty (scope) {
        scope['title'] = '修改'
        let hasOtherType = this.form.tempProperty.findIndex((value, index, arr) => {
          return value.type !== 'STATIC_MAP'
        }) > -1
        this.$refs.addTempProp.show(scope, hasOtherType)
      },
      // 删除模板属性
      deleteProperty (scope) {
        this.$confirm('确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.tempProperty.splice(scope.$index, 1)
        })
      },
      // 暂存模板信息
      holeTempInfo (tempInfo) {
        this.form.tempInfo = tempInfo
      },
      // 加载图片
      loadPdfImg (data) {
        if (data.success) {
          this.imgSrc = `data:image/jpeg;base64,${data.data.pdfImg}`
        } else {
          this.imgSrc = ''
        }
      },
      // 暂存模板属性
      holdTempProperty (property, operate) {
        let {values} = Object
        let names = []
        // 查找这个code的property索引
        let index = this.form.tempProperty.findIndex((value, index, arr) => {
          return value.code === property.code
        })
        // 操作开始
        if (operate === '修改') {
          if (index === -1) {
            this.$message.error('不存在该属性')
            return
          }
          names = []
          for (let value of values(this.form.tempProperty)) {
            if (value.code !== property.code) {
              names.push(value.name)
            }
          }
          if ((this.form.tempProperty && this.form.tempProperty.length > 0) && names.includes(property.name)) {
            this.$message.error('同名属性已经存在')
            return
          }
          this.form.tempProperty.splice(index, 1, property)
        } else {
          // 判断同名属性是否存在
          names = []
          for (let value of values(this.form.tempProperty)) {
            names.push(value.name)
          }
          if ((this.form.tempProperty && this.form.tempProperty.length > 0) && names.includes(property.name)) {
            this.$message.error('同名属性已经存在')
            return
          }
          if (index > -1) {
            this.$message.error('code重复')
            return
          }
          this.form.tempProperty.push(property)
        }
        this.$refs.addTempProp.close()
      },
      // 所有模板信息保存到数据库
      save () {
        if (this.form.tempInfo.name === '' || this.form.tempInfo.groupId === '' || this.form.tempInfo.fileId === '' ||
          this.form.tempInfo.calType === '' || this.form.tempInfo.calOriRecordNumber === '') {
          this.$message.error('模板信息不全')
          return
        }
        if (this.form.tempProperty.length === 0) {
          this.$message.error('模板属性为空')
          return
        }
        /* -------------------------模板信息-------------------------------------------- */
        let param = Object.assign({}, this.form.tempInfo, {creator: this.user.account, modifier: this.user.account})
        /* ------------------------属性坐标-------------------------------------------- */
        let size = this.imageSize()
        let fieldJson = this.form.stickedDom.map((item, index, input) => {
          // 用偏移换算百分比
          return {
            templateName: item.name,
            nodeCode: item.nodeCode,
            x: (item.offsetX * 100 / size.width).toFixed(8),
            y: (item.offsetY * 100 / size.height).toFixed(8)
          }
        })
        Object.assign(param, {fieldLocationJson: JSON.stringify(fieldJson)})
        /* ------------------------属性数组-------------------------------------------- */
        let isResultNodeIndex = this.form.tempProperty.findIndex((value, index, arr) => {
          return value.isResultNode === 'Y'
        })
        if (isResultNodeIndex === -1) {
          this.$message.error('必须添加一个结果节点属性')
          return
        }
        let attribute = this.form.tempProperty.map((item, index, input) => {
          return {
            creator: this.user.userId,
            modifier: this.user.userId,
            name: item.name,
            documentType: item.documentType,
            selectStaticMapId: item.selectStaticMapId,
            code: item.code,
            type: item.type,
            refCode: item.refCode,
            refTemplateId: item.refTemplateId,
            dicType: item.dicType,
            calculationFormula: item.calculationFormula,
            pricision: item.pricision,
            pricisionType: item.pricisionType,
            refTemplateAttributeCode: item.refTemplateAttributeCode,
            // 这里已经转换成Y，
            isResultNode: item.isResultNode
          }
        })
        Object.assign(param, {labOriginalTemplateAttributeDos: attribute})
        console.log(param)
        /* ------------------------请求原始记录单接口-------------------------------------------- */
        this.loading.save = true
        if (this.form.title === '修改') {
          Object.assign(param, {id: this.form.id})
          api.chemicalLaboratory.originalTempManage.updateLabOriginalTemplateDo(param).then((response) => {
            let data = response.data
            if (data.success) {
              this.$message.success('修改成功')
              this.$emit('getTempData')
              this.dialogVisible = false
            } else {
              this.$message.error(data.errorMsg)
            }
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.loading.save = false
          })
        } else {
          api.chemicalLaboratory.originalTempManage.createLabOriginalTemplateDo(param).then((response) => {
            let data = response.data
            if (data.success) {
              this.$message.success('新增成功')
              this.$emit('getTempData')
              this.dialogVisible = false
            } else {
              this.$message.error(data.errorMsg)
            }
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.loading.save = false
          })
        }
      }
    }
  }
</script>
<style>
  .row-select {
    background-color: #4b646f !important;
  }
</style>
<style scoped>
  .left-row {
    display: flex;
    flex-direction: column;
    padding-right: .5rem;
  }

  .row {
    margin-left: 0;
    margin-bottom: 1rem;
  }

  .grid-content {
    height: auto;
    border: 1px solid rgb(223, 230, 236);
    margin: 0 0.1rem;
  }

  .bottom-col {
    text-align: center;
    margin-top: 0.5rem;
  }
</style>
