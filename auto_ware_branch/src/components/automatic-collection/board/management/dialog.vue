<template>
  <dialog-side width="550px" :title="title" :visible.sync="dialogFormVisible">
    <div class="info-wrapper">
      <span class="tag"><el-tag type="gray">所属车间:</el-tag>{{info.workshopName}}</span>
      <span class="tag"><el-tag type="gray">丝绽编号:</el-tag>{{info.silkCode}}</span>
      <span class="tag"><el-tag type="gray">线别:</el-tag>{{info.lineName}}</span>
      <span class="tag"><el-tag type="gray">批号:</el-tag>{{info.batchNo}}</span>
      <span class="tag"><el-tag type="gray">规格:</el-tag>{{info.spec}}</span>

      <span class="tag"><el-tag type="gray">位号:</el-tag>{{info.item}}</span>
      <span class="tag"><el-tag type="gray">落次:</el-tag>{{info.fallNo}}</span>
      <span class="tag"><el-tag type="gray">班次:</el-tag>{{info.classesName}}</span>
      <span class="tag"><el-tag type="gray">异常原因:</el-tag>{{info.downGradeReasonName}}</span>
      <span class="tag"><el-tag type="gray">职位:</el-tag>{{info.positionName}}</span>
      <span class="tag"><el-tag type="gray">处理状态:</el-tag>{{info.status === '1'?'未处理':'已处理'}}</span>
      <span class="tag"><el-tag type="gray">操作者:</el-tag>{{info.employeeName}}</span>
    </div>
    <el-form :model="newInfo" :rules="rules" ref="newInfo" :label-width="formLabelWidth">
      <el-form-item label="丝锭等级" prop="gradeId">
        <el-select v-model="newInfo.gradeId" placeholder="丝锭等级" clearable>
          <el-option
            v-for="item in silkGradeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :rows="2" v-model="newInfo.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>

    <div class="dialog-footer tr">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button :loading="loading.submit" type="primary" @click="sureBtn('newInfo')">确 定</el-button>
    </div>
  </dialog-side>
</template>

<script>
  import * as api from 'api/index'
  import storage from '../../../../module/storage'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    data () {
      return {
        loading: {
          submit: false
        },
        disabled: true,
        title: '异常处理',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        silkGradeList: [],
        userInfo: '',
        info: {},
        newInfo: {
          id: '',
          gradeId: '',
          downGradeReasonId: '',
          silkCode: '',
          remark: ''
        },
        rules: {}
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.getDownGradeReasonList()
    },
    methods: {
      show (item) {
        this.info = item

        this.newInfo.id = item.id
        this.newInfo.gradeId = item.gradeId
        this.newInfo.downGradeReasonId = item.downGradeReasonId
        this.newInfo.silkCode = item.silkCode
        this.newInfo.remark = item.remark
        this.dialogFormVisible = true
      },
      getDownGradeReasonList () {
        let params = {}
        api.automatic.dictionary.getAllSilkGradeList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.silkGradeList = data.data
          }
        }).catch(e => {
          console.log(e)
        })
      },
      sureBtn (newInfo) {
        this.$refs[newInfo].validate(valid => {
          if (valid) {
            this.update()
          } else {
            return false
          }
        })
      },
      update () { // 异常处理接口
        this.loading.submit = true
        let params = {
          handleEmployeeId: this.userInfo.employeeId, // 1748321963509547041:人员id,不是userId
          productionProcessId: this.userInfo.productionProcessId, // 1748341198512193573:工艺id 用户属性
          id: this.newInfo.id,
          gradeId: this.newInfo.gradeId,
          downGradeReasonId: this.newInfo.downGradeReasonId,
          silkCode: this.newInfo.silkCode,
          remark: this.newInfo.remark
        }
        api.automatic.board.updateSilkAlarm(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.$emit('callback')
            this.dialogFormVisible = false
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.submit = false
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .info-wrapper{
    padding: 0 40px;
    .tag{display: inline-block;margin: 0 10px 10px 0;
      .el-tag{margin-right: 10px}
    }
  }
</style>
