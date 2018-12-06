<template>
  <jk-dialog :title="dialog.title" :visible.sync="dialog.visible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <!--车间-->
        <el-form-item label="车间" prop="workshopId">
          <el-select v-model="form.workshopId" clearable placeholder="请选择车间" class="margin-right-1 margin-bottom-1">
            <el-option v-for="item in workShopList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!--批号-->
        <el-form-item label="批号" prop="batchNo">
          <el-input v-model="form.batchNo"></el-input>
        </el-form-item>
        <!--规格-->
        <el-form-item label="中间值" prop="centralValue">
          <el-input v-model="form.centralValue" @change="makeppSpec"></el-input>
        </el-form-item>
        <el-form-item label="孔数" prop="holeNum">
          <el-input v-model="form.holeNum" @change="makeppSpec"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <!--<span v-if="form.centralValue">-->
            <!--{{form.centralValue}}dtex-->
          <!--</span>-->
          <!--<span v-if="form.holeNum">/{{form.holeNum}}f</span>-->
          <el-input v-model="form.spec"></el-input>
        </el-form-item>
        <!--管色-->
        <el-form-item label="管色" prop="tubeColor">
          <el-input v-model="form.tubeColor"></el-input>
        </el-form-item>
        <!--描述-->
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <!--描述-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading.confirm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
  //  import storage from 'storage'
  export default {
    props: ['typeData'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialog: { title: '新增', visible: false },
        workShopList: [],
        form: {
          action: '',
          batchId: '',
          workshopId: '',
          batchNo: '',
          centralValue: '',
          holeNum: '',
          tubeColor: '',
          spec: '',
          remark: ''
        },
        loading: { confirm: false },
        formRules: {
          workshopId: [
            {required: true, message: '请选择车间', trigger: 'change blur'}
          ],
          batchNo: [
            {required: true, message: '请填写批号', trigger: 'change blur'}
          ],
          centralValue: [
            {required: true, message: '请填写中心值', trigger: 'change blur'}
          ],
          holeNum: [
            {required: true, message: '请填写孔数', trigger: 'change blur'}
          ],
          spec: [
            {required: true, message: '请填写规格', trigger: 'change blur'}
          ],
          tubeColor: [
            {required: true, message: '请填写管色', trigger: 'change blur'}
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show (data) {
        this.$refs.ruleForm.resetFields()
        this.dialog.visible = true
        this.dialog.title = data.action === 'edit' ? '修改' : '新增'
        this.workShopList = data.workShopList
        this.form.action = data.action
        if (data.action === 'edit') {
          this.form.batchId = data.batchId
          this.form.workshopId = data.workshopId
          this.form.batchNo = data.batchNo
          this.form.centralValue = data.centralValue
          this.form.holeNum = data.holeNum
          this.form.tubeColor = data.tubeColor
          this.form.spec = data.spec
          this.form.remark = data.remark
        }
      },
      makeppSpec () {
        this.form.spec = `${this.form.centralValue}dtex/${this.form.holeNum}f`
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              workshopId: this.form.workshopId,
              batchNo: this.form.batchNo,
              centralValue: this.form.centralValue,
              holeNum: this.form.holeNum,
              tubeColor: this.form.tubeColor,
              spec: this.form.spec,
              remark: this.form.remark
            }
            if (this.form.action === 'add') {
              this.$confirm('新增之后无法删除，是否确认新增?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                    instance.confirmButtonLoading = true
                    api.automatic.dictionary.addBatch(param).then((response) => {
                      const data = response.data
                      if (data.messageType === 1) {
                        this.dialog.visible = false
                        this.$emit('submitSuccess')
                      }
                    }).finally(() => {
                      instance.confirmButtonLoading = false
                      done()
                    })
                  } else {
                    instance.confirmButtonLoading = false
                    done()
                  }
                }
              })
            } else {
              this.loading.confirm = true
              Object.assign(param, {batchId: this.form.batchId})
              api.automatic.dictionary.updateBatch(param).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                }
              }).finally(() => {
                this.loading.confirm = false
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
