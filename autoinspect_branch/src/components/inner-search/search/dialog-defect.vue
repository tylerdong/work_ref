<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
    <el-form>
      <el-form-item label="侧面">
        <el-select v-model="form.sideDefect" multiple placeholder="请选择侧面" class="input-item30">
          <el-option v-for="(item, index) in option.sideDefect" :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="顶面">
        <el-select v-model="form.topSurfaceDefect" multiple placeholder="请选择侧面" class="input-item30">
          <el-option v-for="(item, index) in option.topSurfaceDefect" :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="底面">
        <el-select v-model="form.bottomDefect" multiple placeholder="请选择侧面" class="input-item30">
          <el-option v-for="(item, index) in option.bottomDefect" :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他">
        <el-checkbox v-model="form.isOther" style="margin-left: 1rem;"></el-checkbox>
        <el-input v-model="form.otherText" :disabled="!form.isOther" style="width: 28rem; margin-right: 1rem;margin-left: 1rem"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="btnConfirm">确认</el-button>
        <el-button plain type="warning" @click="btnCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {sideDefect, topSurfaceDefect, bottomDefect} from '../../options'
import * as api from '../../../api/index'
export default {
  data () {
    return {
      dialog: {
        visible: false,
        title: '缺陷设置'
      },
      option: {
        sideDefect: sideDefect,
        topSurfaceDefect: topSurfaceDefect,
        bottomDefect: bottomDefect
      },
      formData: {},
      form: {
        sideDefect: [],
        topSurfaceDefect: [],
        bottomDefect: [],
        isOther: false,
        otherText: ''
      },
      loading: {confirm: false}
    }
  },
  methods: {
    show (data) {
      this.formData = data
      this.dialog.visible = true
    },
    btnConfirm () {
      this.loading.confirm = true
      let param = {
        defectNum: this.formData.defectNum,
        isgood: '1',
        comment: `侧面:${this.form.sideDefect.join(',')}|顶面:${this.form.topSurfaceDefect.join(',')}|底面:${this.form.bottomDefect.join(',')}|${this.form.otherText}`
      }
      api.innerDefect.updateDefect(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.$emit('dialogClose', data.data)
          this.dialog.visible = false
        } else {
          console.log(data.meta.message)
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.confirm = false
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
