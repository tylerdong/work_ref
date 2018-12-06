<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.toggle" @close="close" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="模块名称" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder='请输入模块名称'></el-input>
      </el-form-item>

      <el-form-item label="编码">
        <el-input v-model="form.code" auto-complete="off" placeholder='请输入编码'></el-input>
      </el-form-item>

      <el-form-item label="子系统" prop="subsystem">
        <el-select v-model="form.subsystem" placeholder="请选择" @change="selectChange">
          <template v-for="item in childData">
            <el-option
              :label="item.name"
              :value="item.id">
            </el-option>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item label="模块描述">
        <el-tooltip effect="dark" placement="top-start">
          <div slot="content">描述里写清除模块路径，方便查找<br/>例如：生产任务/包装计量/唛头条码</div>
          <el-input type="textarea" v-model="form.describe" auto-complete="off" placeholder='请输入模块描述'></el-input>
        </el-tooltip>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import * as api from 'api'
  export default {
    mounted () {
    },
    data () {
      return {
        dialog: {
          title: '',
          toggle: false
        },
        form: {
          id: '',
          name: '',
          code: '',
          moduleId: '',
          subsystem: '',
          describe: ''
        },
        loading: false,
        rules: {
          name: [{required: true, message: '请输入模块名', trigger: 'blur'}],
          subsystem: [{required: true, message: '请选择子系统', trigger: 'blur'}]
        }
      }
    },
    props: ['childData'],
    methods: {
      close () {
        this.form = {
          id: '',
          name: '',
          code: '',
          moduleId: '',
          subsystem: '',
          describe: ''
        }
        this.loading = false
        this.$nextTick(function () {
          this.$refs.form.resetFields()
        })
      },

      toggle (params) {
        this.dialog = {
          title: params.title,
          toggle: params.toggle
        }
        this.form = {
          id: params.id,
          name: params.name,
          code: params.code,
          describe: params.describe,
          moduleId: params.moduleId,
          subsystem: params.subsystem
        }
      },

      /* 选择子系统 */
      selectChange () {
        this.$refs.form.validateField('subsystem')
      },

      handleConfirm () {
        this.$refs.form.validate(val => {
          if (val) {
            this.loading = true
            if (this.dialog.title === '新增模块') {
              this.add()
              return true
            }
            if (this.dialog.title === '修改模块') {
              this.edit()
              return true
            }
          } else {
            this.$message.error('请检查填选项')
          }
        })
      },

      add () {
        api.marManager.superAddModule({
          name: this.form.name,
          describe: this.form.describe,
          code: this.form.code,
          subsystemId: this.form.subsystem
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.dialog.toggle = false
            this.$emit('callback')
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading = false
        })
      },

      edit () {
        console.info(this.form)
        api.marManager.superUpdateModule({
          moduleId: this.form.moduleId,
          name: this.form.name,
          code: this.form.code,
          describe: this.form.describe,
          subsystemId: this.form.subsystem
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.dialog.toggle = false
            this.$emit('callback')
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
