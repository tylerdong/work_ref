<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%">
    <el-form :model="newSubSystem" :rules="rules" ref="newModular">
      <el-form-item label="子系统名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="newSubSystem.name" auto-complete="off" placeholder='请输入子系统名称'></el-input>
      </el-form-item>
      <el-form-item label="子系统编码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="newSubSystem.code" auto-complete="off" placeholder='请输入子系统编码'></el-input>
      </el-form-item>
      <el-form-item label="子系统描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="newSubSystem.describe" auto-complete="off"
                  placeholder='请输入子系统描述'></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sureBtn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      title: '',
      newSubSystem: {
        type: Object
      },
      btnType: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        rules: {
          name: [{ required: true, message: '请输入子系统名称', trigger: 'blur' }],
          code: [{ required: true, message: '请输入子系统编码', trigger: 'blur' }]
        },
        formLabelWidth: '120px',
        dialogFormVisible: false
      }
    },
    methods: {
      sureBtn () {
        this.$refs.newModular.validate((valid) => {
          if (valid) {
            if (this.btnType === 1) {
              this.$emit('add')
            } else {
              this.$emit('modify')
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
