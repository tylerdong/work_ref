<!--工厂-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="工厂名称" prop="factoryName">
          <el-input v-model="form.factoryName" placeholder="请填写工厂名称" class="input-item-18"></el-input>
        </el-form-item>

        <el-form-item label="工厂编号" prop="factoryNo">
          <el-input v-model="form.factoryNo" placeholder="请填写工厂编号" class="input-item-18"></el-input>
        </el-form-item>

        <el-form-item label="调拨单合并">
          <el-switch v-model="form.isAutCombine" placeholder="请填写调拨单合并" inactive-value="N" active-value="Y" class="input-item-18"></el-switch>
        </el-form-item>

        <el-form-item label="共享托盘编号" prop="sharePalletCode">
          <el-input v-model="form.sharePalletCode" placeholder="请填写共享托盘编号" class="input-item-18"></el-input>
        </el-form-item>

        <el-form-item label="SAP批次" prop="sapBatchNo">
          <el-tooltip class="item" effect="dark" content="多个批次以英文逗号分隔" placement="right-start">
            <el-input type="textarea" v-model="form.sapBatchNo" placeholder="请填写SAP批次" class="input-item-28"></el-input>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="特殊批次">
          <el-input type="textarea" v-model="form.sapSpecialBatchNo" placeholder="请填写特殊批次" class="input-item-28"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="btnConfirm" type="primary" :loading="loading.confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {},
    data () {
      return {
        form: {
          id: '',
          factoryName: '',
          factoryNo: '',
          isAutCombine: '',
          sharePalletCode: '',
          sapBatchNo: '',
          sapSpecialBatchNo: ''
        },
        rules: {
          factoryName: [{type: 'string', required: true, message: '请填写工厂名称', trigger: 'blur change'}],
          factoryNo: [{type: 'string', required: true, message: '请填写工厂编号', trigger: 'blur change'}],
          sharePalletCode: [{type: 'string', required: true, message: '请填写共享托盘编号', trigger: 'blur change'}],
          sapBatchNo: [{type: 'string', required: true, message: '请填写SAP批次', trigger: 'blur change'}]
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          list: false
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        api.storage.warehouseMaintain.selectFactory().then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            let factory = data.data
            this.form.id = factory.id
            this.form.factoryName = factory.factoryName
            this.form.factoryNo = factory.factoryNo
            this.form.isAutCombine = factory.isAutCombine
            this.form.sharePalletCode = factory.sharePalletCode
            this.form.sapBatchNo = factory.sapBatchNo
            this.form.sapSpecialBatchNo = factory.sapSpecialBatchNo
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {})
      },
      btnConfirm () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.confirm = true
            api.storage.warehouseMaintain.updateFactory(this.form).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.$message({type: 'success', message: data.message})
                this.getData()
              } else {
                this.$message({type: 'error', message: data.message})
              }
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
              this.loading.confirm = false
            })
          }
        })
      }
    }
  }
</script>
