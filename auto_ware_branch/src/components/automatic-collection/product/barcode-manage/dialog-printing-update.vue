<!--文档档案库-->
<template>
  <dialog-side title="批量修改" :visible.sync="dialogVisible">
    <div id="formdemo">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="班次" prop="team">
          <el-select v-loading="loading.team" v-model="form.team" placeholder="请选择班次">
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产日期" prop="productDate">
          <el-date-picker
            v-model="form.productDate"
            type="date"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading.submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </dialog-side>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  import dateFns from 'date-fns'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    props: ['classOptions'],
    data () {
      return {
        dialogVisible: false,
        teamOptions: [],
        silkCodeGroup: '',
        userInfo: {},
        form: {
          team: '',
          productDate: new Date()
        },
        loading: {
          team: false
        },
        formRules: {
          team: [
            { required: true, message: '请选择班次', trigger: 'change blur' }
          ],
          productDate: [
            { type: 'date', required: true, message: '请选择生产日期', trigger: 'change blur' }
          ]
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      show (item) {
        this.silkCodeGroup = item
        this.dialogVisible = true
        let date = new Date()
        date.setDate(date.getDate() + 1)
        this.form.productDate = date
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let silkCodeIds = []
            for (let item of this.silkCodeGroup) {
              silkCodeIds.push(item.silkCodeGroupId)
            }
            let params = {
              classesId: this.form.team,
              silkCodeGroupIds: silkCodeIds,
              sign: 'GXHY',
              productDate: dateFns.format(this.form.productDate, 'YYYY-MM-DD'),
              employeeId: this.userInfo.userId
            }
            api.automatic.barCode.bulkChangeAndCreateSilkCode(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialogVisible = false
                this.$emit('submitSuccess')
              }
            }).finally(() => {
              this.loading.submit = false
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
