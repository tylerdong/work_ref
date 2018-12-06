<!--组件名-->
<template>
  <div>
    <dialog-side title="库位详情" :visible.sync="dialogVisible">
      <div  v-loading="loading.content">
        <ul class="area2">
          <li>
            <div class="label-text">当前状态：</div>
            <el-radio-group @change="statusChange" size="small" v-model="status">
              <el-radio-button label="BAN">禁用</el-radio-button>
              <el-radio-button label="LOCAKING">锁定</el-radio-button>
              <el-radio-button label="USING">使用中</el-radio-button>
            </el-radio-group>
          </li>
          <li>
            <div class="label-text">使用车间：</div>
            <span class="content-text">{{workshops | workshop}}</span>
          </li>
          <li>
            <div class="label-text">POY最大容量：</div>
            <span class="content-text">{{planPoyNum}}</span>
          </li>
          <li>
            <div class="label-text">FDY最大容量：</div>
            <span class="content-text">{{planFdyNum}}</span>
          </li>
          <li>
            <div class="label-text">聚酯切片最大容量：</div>
            <span class="content-text">{{planPChipNum}}</span>
          </li>
        </ul>
        <el-form :model="form" ref="ruleForm" label-width="130px">
          <el-form-item label="编号" prop="storageName">
            <el-input disabled v-model="form.storageName"></el-input>
          </el-form-item>
          <el-form-item label="成品名称" prop="productName">
            <el-input :disabled="isEmpty" v-model="form.productName"></el-input>
          </el-form-item>
          <el-form-item label="批号" prop="batchNoList">
            <!--<span v-for="batchNo in form.batchNoList">{{batchNo}}</span>-->
            <el-input :disabled="isEmpty" v-model="form.batchStr"></el-input>
          </el-form-item>
          <el-form-item label="规格" prop="spec">
            <el-input :disabled="isEmpty" v-model="form.spec"></el-input>
          </el-form-item>
          <el-form-item label="等级" prop="level">
            <el-input :disabled="isEmpty" v-model="form.level"></el-input>
          </el-form-item>
          <el-form-item label="托盘类型" prop="yoke">
            <el-input :disabled="isEmpty" v-model="form.yoke"></el-input>
          </el-form-item>
          <el-form-item label="包装类型" prop="packageType">
            <el-input :disabled="isEmpty" v-model="form.packageType"></el-input>
          </el-form-item>
          <el-form-item label="当前箱数">
            <el-input v-model="form.num" disabled></el-input>
          </el-form-item>
          <!--<el-form-item label="单箱净重">-->
            <!--<el-input v-model="form.singleBoxNetWeight" disabled></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="当前总净重">
            <el-input v-model="form.totalWeight" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </dialog-side>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    props: ['warehouseId'],
    components: {
      'dialog-side': require('src/components/common/dialog-side.vue')
    },
    data () {
      return {
        isEmpty: true,
        status: '',
        statusCanChange: false,
        workshops: [],
        planFdyNum: '',
        planPChipNum: '',
        planPoyNum: '',
        form: {
          batchNoList: [],
          batchStr: '',
          storageName: '',
          productName: '',
          batchNo: '',
          spec: '',
          level: '',
          yoke: '',
          packageType: '',
          num: '',
          singleBoxNetWeight: '',
          totalWeight: ''
        },
        nowData: null,
        dialogVisible: false,
        loading: {
          submit: false,
          content: false
        }
      }
    },
    mounted () {
    },
    methods: {
      statusChange (val) {
        if (!this.statusCanChange) {
          return
        }
        console.log(val)
        api.storage.warehouseManagement.changeStorageStatus({
          storageId: this.nowData.storageId,
          status: val
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.dialogVisible = false
            this.$emit('list-update')
          }
        }).finally(() => {
          this.loading.content = false
        })
      },
      show (item) {
        this.statusCanChange = false
        this.status = ''
        this.workshops = ''
        this.planFdyNum = ''
        this.planPChipNum = ''
        this.planPoyNum = ''
        this.nowData = item
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = true
        this.loading.content = true
        api.storage.warehouseManagement.getStorageInfo({
          id: item.storageId
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.form.productName = data.data.productName
            this.form.batchNo = data.data.batchNo
            this.form.spec = data.data.spec
            this.form.level = data.data.level
            this.form.yoke = data.data.yoke
            this.form.packageType = data.data.packageType
            this.form.num = data.data.num
            this.form.singleBoxNetWeight = data.data.singleBoxNetWeight
            this.form.totalWeight = data.data.totalWeight
            this.status = data.data.status
            this.planFdyNum = data.data.planFdyNum
            this.planPChipNum = data.data.planPChipNum
            this.planPoyNum = data.data.planPoyNum
            this.form.storageName = data.data.storageName
            this.form.batchNoList = data.data.batchNoList
            this.form.batchStr = this.form.batchNoList.join(',')
            this.workshops = data.data.workshopIds ? JSON.parse(data.data.workshopIds) : ''
            this.$nextTick(() => {
              this.statusCanChange = true
            })
          }
        }).finally(() => {
          this.loading.content = false
        })
      }
    },
    filters: {
      workshop: function (val) {
        let temp = ''
        if (val) {
          temp = val.join('、')
        }
        return temp
      }
    }
  }
</script>
<style lang="scss" scoped>
  .label-text{
    text-align: right;
    width: 130px;
    display: inline-block;
    padding-right: 10px;
    color: rgb(72, 88, 106);
  }
  .area2 li{
    margin-bottom: 20px;
  }
</style>
