<template>
  <el-dialog class="dialog" title="查看仪器" :visible.sync="dialogVisible" top="5%" width="80%">
    <el-tabs v-model="tabName">
      <el-tab-pane label="基本信息" name="1">
        <instrument-info ref="info" :groupOptions="groupOptions"></instrument-info>
      </el-tab-pane>
      <el-tab-pane label="校准记录" name="2">
        <instrument-book-view-adjusting ref="adjustingTable" :instrumentId="instrumentId"></instrument-book-view-adjusting>
      </el-tab-pane>
      <el-tab-pane label="维修记录" name="3">
        <instrument-book-view-repair ref="repairTable" :instrumentId="instrumentId"></instrument-book-view-repair>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
  import * as api from 'src/api'
  export default {
    props: ['groupOptions'],
    components: {
      'instrument-info': require('./instrument-info.vue'),
      'instrument-book-view-adjusting': require('./instrument-book-view-adjusting.vue'),
      'instrument-book-view-repair': require('./instrument-book-view-repair.vue')
    },
    data () {
      return {
        dialogVisible: false,
        instrumentId: '',
        tabName: ''
      }
    },
    mounted () {},
    computed: {},
    methods: {
      show (instrumentId) {
        this.instrumentId = instrumentId
        this.tabName = '1'
        this.dialogVisible = true
        api.chemicalLaboratory.labInstrumentManagement.getLabInstrumentManagementDoById({
          instrumentId: this.instrumentId
        }).then((response) => {
          const result = response.data
          if (result.success === true) {
            this.$refs.info.renderData('view', result.data)
          }
          if (result.success === false) {
            this.$message.error(result.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        })

        this.$nextTick(() => {
          this.$refs.adjustingTable.getListData()
          this.$refs.repairTable.getListData()
        })
      }
    }
  }
</script>
<style scoped>
  .dialog>div {
    overflow-y: auto;
    height: 650px;
  }
</style>
