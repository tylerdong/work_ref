<!--组件名-->
<template>
  <div>
    <jk-dialog
      title="物检降等"
      width="450px"
      :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="丝锭等级" prop="spindleLevel">
          <el-select v-model="form.spindleLevel" placeholder="请选择">
            <el-option
              v-for="item in spindleLevelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dyeSubmit">确定</el-button>
          <el-button @click="clearClick">清空</el-button>
        </el-form-item>
      </el-form>
    </jk-dialog>
  </div>
</template>
<script>
  export default {
    components: {
      'jk-dialog': require('common/dialog-side.vue')
    },
    props: ['spindleLevelOptions'],
    data () {
      return {
        form: {
          spindleLevel: ''
        },
        workTypeDetail: null,
        nowItem: null,
        isAll: '',
        rules: {
          spindleLevel: [
            { required: true, message: '请选择丝锭等级', trigger: 'blur' }
          ]
        },
        dialogVisible: false
      }
    },
    mounted () {
    },
    methods: {
      show (item, isAll) {
        this.$refs.form.resetFields()
        this.isAll = isAll
        if (isAll) {
          this.form.spindleLevel = this.spindleLevelOptions[0].id
        } else {
          this.form.spindleLevel = item.spindleLevel ? item.spindleLevel : this.spindleLevelOptions[0].id
        }
        this.nowItem = item
        this.dialogVisible = true
      },
      dyeSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let spindleLevelName = ''
            for (let item of this.spindleLevelOptions) {
              if (item.id === this.form.spindleLevel) {
                spindleLevelName = item.name
              }
            }
            if (this.isAll) {
              for (let item of this.nowItem.spindles) {
                item.spindleLevelName = spindleLevelName
                item.spindleLevel = this.form.spindleLevel
              }
            } else {
              this.nowItem.spindleLevelName = spindleLevelName
              this.nowItem.spindleLevel = this.form.spindleLevel
            }
            this.dialogVisible = false
          }
        })
      },
      clearClick () {
        if (this.isAll) {
          for (let item of this.nowItem.spindles) {
            item.spindleLevelName = ''
            item.spindleLevel = ''
          }
        } else {
          this.nowItem.spindleLevelName = ''
          this.nowItem.spindleLevel = ''
        }
        this.dialogVisible = false
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
