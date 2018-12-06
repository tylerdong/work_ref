<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" center width="70%">
    <el-form :inline="true" ref="form" :model="form" :rules="rules" >
      <el-form-item label="缺陷名称" prop="defecttype">
        <el-input v-model="form.defecttype" placeholder="请输入缺陷名称" clearable @clear="btnClear"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnSave">{{dialog.action}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="defects" border height="50vh">
      <el-table-column label="名称" prop="defecttype"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" class="inner-button" @click="btnEdit(scope.row)">修改</el-button>
          <el-button type="text" class="inner-button" @click="btnDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer">
      <el-button type="primary" @click="btnConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: { title: '缺陷类型', visible: false, action: '新增' },
      defects: [],
      rules: {
        defecttype: [
          {required: true, message: '名称不能为空', trigger: 'change'},
          {min: 2, max: 50, message: '名称只能为2-50位字符', trigger: 'blur change'},
          {
            required: true,
            trigger: 'blur change',
            validator: (rule, value, callback) => {
              console.log(this.defects)
              for (let i = 0; i < this.defects.length; i++) {
                if (value === this.defects[i].defecttype) {
                  callback(new Error('名称已经存在'))
                  break
                }
              }
              callback()
            }
          }
        ]
      },
      form: {
        defecttype: '',
        defectIndex: -1
      }
    }
  },
  methods: {
    btnSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.dialog.action === '修改') {
            this.$set(this.defects[this.form.defectIndex], 'defecttype', this.form.defecttype)
          } else {
            this.defects.push({defecttype: this.form.defecttype, cameraMax: '0', cameraNum: ''})
          }
          this.btnClear()
        }
      })
    },
    show (data) {
      this.dialog.visible = true
      this.btnClear()
      this.defects = data
    },
    btnEdit (data) {
      this.dialog.action = '修改'
      let index = this.defects.findIndex(item => item.defecttype === data.defecttype)
      this.form.defectIndex = index
      this.form.defecttype = data.defecttype
    },
    btnDelete (data) {
      this.$confirm('删除缺陷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let index = this.defects.findIndex(item => item === data.name)
        this.defects.splice(index, 1)
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'})
      })
    },
    btnConfirm () {
      this.dialog.visible = false
      this.$emit('saveDefect', this.defects)
    },
    btnClear () {
      this.dialog.action = '新增'
      this.form.defecttype = ''
      this.form.defectIndex = -1
    }
  }
}
</script>

<style scoped>

</style>
