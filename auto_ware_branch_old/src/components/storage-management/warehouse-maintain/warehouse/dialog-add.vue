<template>
  <jk-dialog title="增加" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入两位字符（如FE）"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入仓库名称"></el-input>
        </el-form-item>
        <el-form-item label="仓库类型" prop="type">
          <el-select v-model="form.type" @change="handleTypechange">
            <el-option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SAP仓库点" prop="lgort">
          <el-checkbox-group v-model="form.lgort" :loading="loading.lgort">
            <template v-for="item in options.lgort">
              <el-checkbox :label="item.lgort" :key="item.lgort">{{item.lgobe}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="车间" prop="workshopList">
          <el-checkbox-group v-model="form.workshopList">
            <template v-for="item in workshopList">
              <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="库位行数" prop="categoryRow">
          <el-input-number v-model="form.categoryRow" :min="1" @change="handleRowChange"></el-input-number>
        </el-form-item>
        <el-form-item label="库位列数" prop="categoryColumn">
          <el-input-number v-model="form.categoryColumn" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="库位数" prop="categoryNum">
          <el-input-number v-model="form.categoryNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="行增长间隔" prop="rowIncrement">
          <el-select v-model="form.rowIncrement" :disabled="this.form.categoryRow % 2 === 0 ? false : true" @change="handleChangeSpace">
            <el-option v-for="item in typeLibrary.spaceType" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位顺序" prop="order">
          <el-select v-model="form.order">
            <el-option v-for="item in typeLibrary.orderType" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位编号" prop="identifier">
          <el-select v-model="form.identifier" :disabled="this.form.rowIncrement === '1' ? true : false">
            <el-option v-for="item in typeLibrary.numberType" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="全POY库容（箱）" prop="capacityPoy">-->
          <!--<el-input-number v-model="form.capacityPoy" :min="0"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="	全FDY库容（箱）" prop="capacityFdy">-->
          <!--<el-input-number v-model="form.capacityFdy" :min="0"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="全切片库容（包）" prop="capacityFullSection">-->
          <!--<el-input-number v-model="form.capacityFullSection" :min="0"></el-input-number>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading.btnSave">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    props: ['workshopList', 'typeList'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        options: {
          lgort: []
        },
        typeLibrary: {
          spaceType: [
            { id: '1', name: '1' },
            { id: '2', name: '2' }
          ],
          orderType: [
            { id: 'LEFT_RIGHT', name: '从左到右' },
            { id: 'RIGHT_LEFT', name: '从右到左' }
          ],
          numberType: [
            { id: 'CONTINUITY', name: '连续' },
            { id: 'CROSSING', name: '交叉' }
          ]
        },
        form: {
          code: '',
          name: '',
          type: '',
          lgort: [],
          workshopList: [],
          categoryRow: 0,
          categoryColumn: 0,
          categoryNum: 0,
          capacityPoy: 0,
          capacityFdy: 0,
          capacityFullSection: 0,
          identifier: 'CONTINUITY',
          order: '',
          rowIncrement: '1'
        },
        loading: {
          btnSave: false,
          lgort: false
        },
        formRules: {
          code: [
            { required: true, message: '请输入两位编号', trigger: 'change' },
            { min: 2, max: 2, message: '请输入两位字符', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'change' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择仓库类型', trigger: 'change' }
          ],
          lgort: [
            { required: true, type: 'array', message: '请选择SAP仓库点', trigger: 'change' }
          ],
          workshopList: [
            { required: true, type: 'array', message: '请选择车间', trigger: 'change' }
          ],
          identifier: [
            { required: true, message: '请选择编号类型', trigger: 'change' }
          ],
          rowIncrement: [
            { required: true, message: '请选择间隔类型', trigger: 'change' }
          ],
          order: [
            { required: true, message: '请选择顺序类型', trigger: 'change' }
          ]
        }
      }
    },
    watch: {
      'form.categoryRow': 'sumcatenum',
      'form.categoryColumn': 'sumcatenum'
    },
    mounted () {
      this.getLgortOptions()
    },
    methods: {
      sumcatenum () {
        this.form.categoryNum = this.form.categoryRow * this.form.categoryColumn
      },
      show () {
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = true
      },
      handleTypechange () {
      },
      getLgortOptions () {
        this.loading.lgort = true
        api.storage.warehouseMaintain.getLgortList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.lgort = data.data
          }
        }).finally(() => {
          this.loading.lgort = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.categoryRow * this.form.categoryColumn < this.form.categoryNum) {
              return this.$message.error('库位行数乘库位列数小于库位数')
            }
            let lgortString = JSON.stringify(this.form.lgort)
            let params = {
              creator: storage.getUser().account,
              code: this.form.code,
              name: this.form.name,
              type: this.form.type,
              lgorts: lgortString,
              categoryRow: this.form.categoryRow,
              categoryColumn: this.form.categoryColumn,
              categoryNum: this.form.categoryRow * this.form.categoryColumn,
              // capacityPoy: this.form.capacityPoy,
              // capacityFdy: this.form.capacityFdy,
              // capacityFullSection: this.form.capacityFullSection,
              workshopIds: this.form.workshopList,
              rowIncrement: this.form.rowIncrement,
              storageOrder: this.form.order,
              codeMode: this.form.identifier
            }
            this.loading.btnSave = true
            api.storage.warehouseMaintain.addWarehouse(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialogVisible = false
                this.$emit('submitSuccess')
              }
            }).finally(() => {
              this.loading.btnSave = false
            })
          }
        })
      },
      handleRowChange (val) {
        let flag = val % 2
        if (flag) {
          this.form.rowIncrement = '1'
        } else {
          this.form.rowIncrement = ''
        }
      },
      handleChangeSpace () {
        this.form.rowIncrement === '1' ? this.form.identifier = 'CONTINUITY' : this.form.identifier = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-checkbox-group {
    padding: 10px;
    border: 1px solid #bfccd9;
    border-radius: 5px;
    max-height: 250px;
    overflow: auto;
  }
  .el-checkbox{
    display: block;
    margin-left: 15px;
    font-weight: normal;
  }
</style>
