<!--新增，编辑样品分类-->
<template>
  <div>
    <jk-dialog :title="form.title" :visible.sync="dialogVisible">
      <div ref="formDom">
        <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
          <el-form-item label="含油实验模板" prop="region">
            <el-select v-model="form.newSampleId" placeholder="请选择" value-key="id" :loading="loading.list">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading.save" @click="submitSample()">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </jk-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    created () {},
    data () {
      return {
        dialogVisible: false,
        form: {
          title: '新增',
          name: '',
          newSampleId: '',
          newSampleName: ''
        },
        loading: {
          save: false,
          list: false
        },
        id: '',
        options: [],
        userInfo: '',
        formRules: {
        }
      }
    },
    props: {},
    mounted () {
      this.userInfo = storage.getUser()
    },
    computed: {},
    methods: {
      show () {
        this.dialogVisible = true
        this.form.newSampleId = ''
        this.showSampleData()
      },
      showSampleData () {
        this.loading.list = true
        api.physicalLaboratory.originalTempManage.getAllCrudeSampleTemplate().then(response => {
          const data = response.data
          if (data.success === true) {
            console.log(data)
            this.options = data.data
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.list = false
        })
      },
      submitSample () {
        if (this.form.newSampleId === '') {
          this.$message.error('请选择标样模板')
          return
        }
        for (let i = 0; i < this.options.length; i++) {
          if (this.form.newSampleId === this.options[i].id) {
            this.form.newSampleName = this.options[i].name
          }
        }
//        this.options.forEach(function (item) {
//          console.log(item)
//          if (this.form.newSampleId === item.id) {
//            console.log(item)
//            this.form.newSampleName = item.name
//          }
//        })
        let params = {
          creator: this.userInfo.userId,
          modifier: this.userInfo.userId,
          name: this.form.newSampleName,
          templateId: this.form.newSampleId
        }
        this.loading.save = true
        api.physicalLaboratory.LabOriginalPendingExperiment.createCrudeSampleLabOriginalPendingExperiment(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.dialogVisible = false
            this.$message.success('新增标样成功')
            this.$emit('submitSuccess')
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.save = false
        })
      }
    }
  }
</script>
<style scoped>
</style>
