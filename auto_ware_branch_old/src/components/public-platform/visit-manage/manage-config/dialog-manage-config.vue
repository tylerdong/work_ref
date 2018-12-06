<template>
  <el-dialog title="绑定模块" :visible.sync="dialogShow" width="60%">
    <div class="dialog-content" v-loading="dialogLoading">
      <div class="dialog-left">
        <ul>
          <li
            v-for="(item, index) in moduleData"
            :key="item.getSubSystemName"
            @click="systemClick(index)" :class="{ active: index === nowIndex }">{{item.getSubSystemName}}</li>
        </ul>
      </div>
      <div class="dialog-right">
        <ul>
          <li v-for="item in nowModuleData" :key="item.subsystemModuleId">
            <!--{{JSON.stringify(item)}}-->
            <el-switch v-model="item.checked" @change="moduleChange(item)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            {{item.modeuleName}}</li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  // import * as api from 'src/api'
  export default {
    props: {
      moduleData: {
        type: Array
      },
      nowUserID: '',
      nowModuleData: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        dialogShow: false,
        dialogLoading: false,
        nowIndex: 0
      }
    },
    methods: {
      systemClick (index) {
        this.nowModuleData = this.moduleData[index].moduleList
        this.nowIndex = index
      },
      moduleChange (item) {
        console.log(item)
        if (item.checked) {
          let param = {
            subsystemId: this.moduleData[this.nowIndex].subSystemId,
            subsystemModuleId: item.subsystemModuleId
          }
          console.log(param)
          // api.marManager.unBindSubSystemAndModule(param).then(response => {
          //   const data = response.data
          //   if (data.messageType === 2) {
          //     this.$message.error(data.message)
          //     item.checked = false
          //   }
          // }).catch(e => {
          // }).finally(() => {
          // })
        } else {
          let param = {
            subsystemId: this.moduleData[this.nowIndex].subSystemId,
            subsystemModuleId: item.subsystemModuleId
          }
          console.log(param)
          // api.marManager.bindingSubsystemsAndModules(param).then(response => {
          //   const data = response.data
          //   if (data.messageType === 2) {
          //     this.$message.error(data.message)
          //     item.checked = false
          //   }
          // }).catch(e => {
          // }).finally(() => {
          // })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .dialog-content{
    display: flex;
    border: 1px solid #ddd;
    padding: 10px 0;
    .dialog-left{
      flex: 1;
      padding: 0 10px;
      height: 300px;
      overflow-y: auto;
      .active{
        background-color: rgb(19, 206, 102);
        color: #fff;
      }
      li{
        padding: 8px;
      }
      li:hover{
        background-color: rgb(19, 206, 102);
        color: #fff;
        cursor: pointer;
      }
    }
    .dialog-right{
      flex: 1;
      padding: 0 10px;
      height: 300px;
      overflow-y: auto;
      li{
        padding: 8px;
      }
    }
  }
</style>
