<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" center>
    <el-form label-width="100px" ref="form" :model="form" :rules="rules">
      <el-form-item label="批次" prop="batch" class="input-item30">
        <el-input v-model="form.batch" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="管色" prop="tubeColourId" class="input-item30">
        <el-select v-model="form.tubeColourId" placeholder="请选择管色" class="input-item27">
          <el-option v-for="(item, index) in tubeColor" :key="index" :label="item.colour" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="btnConfirm" :loading="loading.confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as api from '../../../api/index'
export default {
  props: ['tubeColor'],
  data () {
    return {
      dialog: {
        visible: false,
        title: '新增'
      },
      formData: {},
      form: {
        batch: '',
        tubeColourId: ''
      },
      rules: {
        batch: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
        ],
        tubeColourId: [{ required: true, message: '请选择管色', trigger: 'blur' }]
      },
      loading: {confirm: false}
    }
  },
  methods: {
    show (data) {
      this.formData = data
      this.dialog.visible = true
      this.dialog.title = data && data.tubecolourid ? '编辑' : '新增'
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        if (data) {
          this.form.batch = data.batch
          this.form.tubeColourId = data.tubecolourid
        }
      })
    },
    btnConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading.confirm = true
          let param = {
            batch: this.form.batch,
            tubeColourId: this.form.tubeColourId
          }
          if (this.dialog.title === '新增') {
            api.innerDefect.insertBasicBatch(param).then(response => {
              let data = response.data
              if (data.meta.code === 100000) {
                this.$emit('confirmSucess')
                this.dialog.visible = false
              } else {
                this.$message({type: 'error', message: data.meta.message})
              }
            }).catch(e => {
              this.$message({type: 'error', message: e.message})
            }).finally(() => {
              this.loading.confirm = false
            })
          } else {
            param = Object.assign(param, {id: this.formData.id})
            api.innerDefect.updateBasicBatch(param).then(response => {
              let data = response.data
              if (data.meta.code === 100000) {
                this.$emit('confirmSucess')
                this.dialog.visible = false
              } else {
                this.$message({type: 'error', message: data.meta.message})
              }
            }).catch(e => {
              this.$message({type: 'error', message: e.message})
            }).finally(() => {
              this.loading.confirm = false
            })
          }
        }
      })
    },
    btnCancel () {
      this.dialog.visible = false
    }
  }
}
</script>

<style scoped>
  table {
    width: 100%;
  }
  table tr td span{
    display: block;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  table tr td span select {
    display: block;
  }
</style>
