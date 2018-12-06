<template>
  <div>
    <dialog-side width="550px" :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="newInfo" :rules="rules" ref="newInfo" :label-width="formLabelWidth">
        <el-form-item label="批号" prop="batchNo">
          <p>{{ newInfo.batchNo }}</p>
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <p>{{ newInfo.spec }}</p>
        </el-form-item>
        <el-form-item label="管色" prop="paperTube">
          <el-select v-model="newInfo.paperTube" placeholder="请选择管色">
            <el-option v-for="item in options.paperTube"
                       :label="item.color" :value="item.color" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毛重" prop="grossWeight">
          <el-input v-model="newInfo.grossWeight" placeholder="请输入毛重"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer tr">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="loading.submit" type="primary" @click="postUpdateList('newInfo')">保存</el-button>
      </div>
    </dialog-side>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    data () {
      return {
        loading: {
          submit: false
        },
        title: '计量',
        dialogFormVisible: false,
        options: {
          paperTube: ''
        },

        newInfo: {
          id: '',
          batchNo: '',
          spec: '',
          paperTube: '',
          boxCode: '',
          grossWeight: ''
        },
        rules: {
          grossWeight: [
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (value) {
                  callback()
                } else {
                  callback(new Error('毛重不能为空'))
                }
              }
            }
          ],
          paperTube: [
            { required: true, message: '管色不能为空', trigger: 'change blur' }
          ]
        },
        formLabelWidth: '120px'
      }
    },
    mounted () {
      // this.getPaperTubeOptions()
    },
    methods: {
      show (row) {
        console.log(row)
        this.dialogFormVisible = true
        this.newInfo.batchNo = row.batchNo
        this.newInfo.boxCode = row.singleCode
        this.newInfo.grossWeight = row.grossWeight
        this.newInfo.paperTube = row.paperTube
        this.newInfo.spec = row.spec
      },
      getPaperTubeOptions () {
        api.automatic.dictionary.getAllPaperTubeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.options.paperTube = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      postUpdateList (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              boxCode: this.newInfo.boxCode,
              paperTube: this.newInfo.paperTube,
              grossWeight: this.newInfo.grossWeight
            }
            api.automatic.barCode.unpackingMeterage(params).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialogFormVisible = false
                this.$emit('submitSuccess')
              }
            }).catch(e => {
              console.error(e)
            }).finally(() => {
              this.loading.submit = false
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
