<template>
  <dialog-side title="修改" width="380px" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="批次" prop="batchNo">
        <el-input v-model="form.batchNo" placeholder="请输入批号"></el-input>
      </el-form-item>
      <el-form-item label="延迟天数" prop="delayDate">
        <el-input v-model="form.delayDate" placeholder="请输入延迟天数"></el-input>
      </el-form-item>
      <el-form-item label="是否自动" prop="isAuto">
        <template slot-scope="scope" >
          <el-select v-model="form.isAuto">
            <el-option
              v-for="item in isAutolist"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button type="primary" @click="btnSave" :loading="loading.btnSave">确定</el-button>
    </div>
  </dialog-side>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    mounted () {
    },
    props: ['shopList', 'forkliftTypeList'],
    data () {
      return {
        isAutolist: [
          {
            name: '是',
            value: 'Y'
          },
          {
            name: '否',
            value: 'N'
          }
        ],
        dialog: {
          visible: false
        },
        loading: {
          btnSave: false
        },
        form: {
          batchNo: '',
          delayDate: '',
          isAuto: ''
        },
        rules: {
          batchNo: [
            {required: true, message: '请输入批次', trigger: 'change'}
          ],
          delayDate: [
            {required: true, message: '请输入延迟天数', trigger: 'change'}
          ],
          isAuto: [
            {required: true, message: '请输入是否自动', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      /* 打开 */
      open (row) {
        this.dialog.visible = true
        this.loading.btnSave = false
        this.form = {
          id: row.id,
          batchNo: row.batchNo,
          delayDate: String(row.delayDate),
          isAuto: row.isAuto
        }
      },

      /* 保存 */
      btnSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading.btnSave = true
            api.storage.warehouseManagement.updateInboundRule({
              modifier: storage.getUser().account,
              id: this.form.id,
              batchNo: this.form.batchNo,
              delayDate: this.form.delayDate,
              isAuto: this.form.isAuto
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialog.visible = false
                this.$emit('submitSuccess')
              }
            }).finally(() => {
              this.loading.btnSave = false
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
