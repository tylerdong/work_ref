<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" center width="70%" label-width="100px">
    <el-form :inline="true" ref="form" :model="form" :rules="rules">
      <el-form-item label="名称" prop="parallelLineName">
        <el-input v-model="form.parallelLineName" placeholder="请输入缺陷名称" clearable class="input-item-m"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="parallelLineCode">
        <el-input v-model="form.parallelLineCode" placeholder="请输入缺陷名称" clearable class="input-item-m"></el-input>
      </el-form-item>
      <el-form-item label="访问地址" prop="parallelLineIp">
        <el-input v-model="form.parallelLineIp" placeholder="请输入缺陷名称" clearable class="input-item-l"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnSave">{{dialog.action}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="form.lineConfig" border height="50vh">
      <el-table-column label="名称" prop="parallelLineName"></el-table-column>
      <el-table-column label="编码" prop="parallelLineCode"></el-table-column>
      <el-table-column label="ip" prop="parallelLineIp"></el-table-column>
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
      dialog: { title: '并行线', visible: false, action: '新增' },
      form: {
        lineConfig: [],
        index: -1,
        parallelLineCode: '',
        parallelLineIp: '',
        parallelLineName: ''
      },
      rules: {
        parallelLineName: [
          {required: true, message: '名称不能为空', trigger: 'blur'},
          {min: 2, max: 50, message: '名称只能为2-50位字符', trigger: 'blur change'},
          {
            required: true,
            validator: (rule, value, callback) => {
              // 判断相同名称是否存在
              if (this.dialog.action === '新增') {
                for (let i = 0; i < this.form.lineConfig.length; i++) {
                  if (value === this.form.lineConfig[i].parallelLineName) {
                    callback(new Error('相同名称的已经存在'))
                    break
                  }
                }
                callback()
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        parallelLineCode: [
          {required: true, message: '编码不能为空', trigger: 'blur'},
          {min: 2, max: 50, message: '编码只能为2-50位字符', trigger: 'blur change'},
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.dialog.action === '新增') {
                for (let i = 0; i < this.form.lineConfig.length; i++) {
                  if (value === this.form.lineConfig[i].parallelLineCode) {
                    callback(new Error('相同编码已经存在'))
                    break
                  }
                }
                callback()
              } else {
                callback()
              }
            }
          }
        ],
        parallelLineIp: [
          {required: true, message: '访问地址不能为空', trigger: 'blur'},
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.dialog.action === '新增') {
                for (let i = 0; i < this.form.lineConfig.length; i++) {
                  if (value === this.form.lineConfig[i].parallelLineIp) {
                    callback(new Error('相同访问地址已经存在'))
                    break
                  }
                }
                callback()
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    btnSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.dialog.action === '修改') {
            this.form.lineConfig[this.form.index].parallelLineCode = this.form.parallelLineCode
            this.form.lineConfig[this.form.index].parallelLineName = this.form.parallelLineName
            this.form.lineConfig[this.form.index].parallelLineIp = this.form.parallelLineIp
          } else {
            this.form.lineConfig.push({
              parallelLineCode: this.form.parallelLineCode,
              parallelLineIp: this.form.parallelLineIp,
              parallelLineName: this.form.parallelLineName})
          }
          this.btnClear()
        }
      })
    },
    show (data) {
      this.dialog.visible = true
      this.btnClear()
      this.form.lineConfig = data
    },
    btnEdit (data) {
      this.dialog.action = '修改'
      this.form.index = this.form.lineConfig.findIndex(item => item.parallelLineCode === data.parallelLineCode)
      this.form.parallelLineIp = data.parallelLineIp
      this.form.parallelLineName = data.parallelLineName
      this.form.parallelLineCode = data.parallelLineCode
    },
    btnDelete (data) {
      this.$confirm('删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let index = this.form.lineConfig.findIndex(item => item.parallelLineCode === data.parallelLineCode)
        this.form.lineConfig.splice(index, 1)
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'})
      })
    },
    btnConfirm () {
      this.dialog.visible = false
      this.$emit('saveConfig', this.form.lineConfig)
    },
    btnClear () {
      this.dialog.action = '新增'
      this.form.parallelLineCode = ''
      this.form.parallelLineIp = ''
      this.form.parallelLineName = ''
      this.form.index = -1
    }
  }
}
</script>

<style scoped>

</style>
