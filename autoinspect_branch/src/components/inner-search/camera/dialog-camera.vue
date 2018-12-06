<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="75%" center>
    <div class="camera" v-if="Array.isArray(form.cameras) && form.cameras.length > 0">
      <div v-for="(item, index) in form.cameras" :key="index" class="item">
        <el-checkbox :label="index" name="type" v-model="item.checked" :disabled="item.disabled" @change="checkItem">
          相机{{producttype === 'DTY' ? index : ++index}}
        </el-checkbox>
        <!--<span v-if="item.disabled" @click="deleteCamera(index)"><icon name="unlock" class="icon"></icon></span>-->
        <!--<span v-else @click="deleteCamera(index)"><icon name="lock" class="icon"></icon></span>-->
      </div>
      <div class="item">
        <el-checkbox v-model="form.all" @change="checkAll">全选</el-checkbox>
      </div>
    </div>
    <span slot="footer">
      <el-button type="primary" icon="el-icon-plus" @click="addCamera">新增相机</el-button>
      <el-button type="primary" @click="saveCamera">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      dialog: {title: '相机配置', visible: false},
      form: {
        cameras: [],
        all: false
      },
      formData: {},
      formIndex: -1
    }
  },
  computed: {
    ...mapGetters(['producttype'])
  },
  methods: {
    show (data, mapIndex) {
      this.dialog.visible = true
      this.formData = data
      this.formIndex = mapIndex
      let checkedCamera = data[mapIndex].cameraNum.split(',')
      this.form.cameras = Array(parseInt(data[mapIndex].cameraMax)).fill(0).map((item, index) => {
        return {
          index: index,
          disabled: false,
          checked: checkedCamera.includes(index.toString())
        }
      })
    },
    addCamera () {
      this.form.cameras.push({
        index: this.form.cameras.length,
        disabled: false,
        checked: false
      })
    },
    saveCamera () {
      let checkedCamera = []
      for (let i = 0; i < this.form.cameras.length; i++) {
        if (this.form.cameras[i].checked) {
          checkedCamera.push(this.form.cameras[i].index)
        }
      }
      let maxNum = this.form.cameras.length.toString()
      this.formData.forEach((item, index) => {
        this.$set(item, 'cameraMax', maxNum)
        if (index === this.formIndex) {
          this.$set(item, 'cameraNum', checkedCamera.join(','))
        }
      })
      this.$emit('saveCamera', this.formData)
      this.dialog.visible = false
    },
    checkAll () {
      this.form.cameras.forEach(item => {
        this.$set(item, 'checked', this.form.all)
      })
    },
    checkItem () {
      this.form.all = this.form.cameras.every(item => item.checked)
    }
  }
}
</script>

<style scoped lang="scss">
$itemHeight: 6.5vh;
.camera {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 5%;
  div.item {
    width: 20%;
    height: $itemHeight;
    line-height: $itemHeight;
    svg {
      float: right;
      height: $itemHeight;
      margin-right: 70px;
      line-height: $itemHeight;
      font-size: 17px;
    }
  }
}
</style>
