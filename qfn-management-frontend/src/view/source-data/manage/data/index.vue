<template>
  <div>
    <Card shadow>
        <div slot="title"  style="height:30px;line-height:20px;">数据获取
          <Select v-model="priceType"   style="width:100px;margin-left:10px;height:30px;" @on-change="priceChange">
            <Option v-for="(item, index) in $store.state.app.selectPrice" :value="item" :key="index">{{ item }}</Option>
          </Select>
        </div>

      <div class="mb-20 clearfix">
        更新时间
        <DatePicker v-model="search.timeSpan"
                    format="yyyy-MM-dd"
                    transfer=transfer
                    type="daterange"
                    placement="bottom-end"
                    placeholder="请选择更新时间"
                    class="length-18rem m-r-10"></DatePicker>
        状态
        <Select v-model="search.status" placeholder="请选择状态" transfer=transfer multiple clearable class="length-18rem m-r-10">
          <Option v-for="(item, index) in option.status" :value="item.key" :key="index">{{ item.value }}</Option>
        </Select>
        来源
        <Select v-model="search.source" placeholder="请选择状态" transfer=transfer clearable class="length-230 m-r-10">
          <Option v-for="(item, index) in option.source" :value="item.key" :key="index">{{ item.name }}</Option>
        </Select>
        <Button @click="searchData" :loading="loading.search" class="getData-btn" type="primary">搜索</Button>
        <Upload v-check-promission="elements.sourceData.data.excelImport"
                class="fr m-l-10"
                :action="uploadAction"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-format-error="formatError"
                :max-size="51200"
                :format="['xlsx','xls']">
          <Button icon="ios-cloud-upload-outline" type="primary">excel导入</Button>
        </Upload>
        <Button v-check-promission="elements.sourceData.data.create" @click="maintain" class="fr m-l-10" type="success">手动维护</Button>
        <Button v-check-promission="elements.sourceData.data.batchDel"  @click="batchTrash" :loading="loading.batchTrash" class="fr m-l-10" type="error">批量废弃</Button>
        <Button v-check-promission="elements.sourceData.data.confirm"  @click="confirm" :loading="loading.confirm" class="fr" type="primary">提交审核</Button>
      </div>
      <Table :data="table.data" :columns="table.columns" @on-selection-change="selectChange" class="table-bottom-20"></Table>
      <Page class="page-bottom-1"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
            :total="page.total"
            :current="page.current"
            :page-size="page.pageSize"
            :page-size-opts="page.pageSizes"
            show-sizer
            show-total/>
    </Card>
    <dialog-maintain ref="maintain" @confirmSuccess="getData" :productType="productType" :priceType="priceType"></dialog-maintain>
  </div>
</template>
<script>
import api from '@/api/data'
import dateFns from 'date-fns'
import {source, configurations} from '@/config/option'
import elements from '@/config/elements'
export default {
  components: {
    'dialog-maintain': require('./../../dialog-maintain').default
  },
  data () {
    return {
      elements,
      proType: {},
      productType: {item: []},
      search: {timeSpan: [undefined, undefined], status: [], source: ''},
      selected: [],
      page: { total: 0, current: 1, pageSize: 20, pageSizes: [20, 30, 40, 50] },
      option: { status: [], source: source },
      loading: { search: false, batchTrash: false, confirm: false },
      table: {
        data: [],
        columns: [],
        extraColumns: [
          {type: 'selection', width: 60, align: 'center'}
        ]
      },
      priceType: '出厂价',
      uploadAction: ''
    }
  },
  props: { code: { type: String } },
  computed: { },
  watch: {
    '$route' (to, from) {
      configurations(this, this.code).then(res => {
        this.productType = res
        this.setColumns()
        this.getData()
      })
      this.clearSearch()
    }
  },
  created () {
    configurations(this, this.code).then(res => {
      this.productType = res
      this.setColumns()
    })
  },
  mounted () {
    this.getStatus(true)
    let baseUrl = this.getCurrentBaseUrl()
    this.uploadAction = `${baseUrl}pretreatment/controller/preproductmanufacturerprice/importiExcelData`
  },
  methods: {
    clearSearch () {
      this.search.timeSpan[0] = ''
      this.search.timeSpan[1] = ''
      this.search.status = [this.option.status[0].key, this.option.status[6].key]
      this.search.source = ''
    },
    getStatus (queryData) {
      api.getAllDataStatus().then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data && Array.isArray(data) && data.length > 0) {
            this.option.status = data
            this.search.status = [data[0].key, data[6].key]
            if (queryData) this.getData()
          } else {
            this.option.status = []
          }
        } else {
          this.$Message.error(response.exception)
        }
      })
    },
    selectChange (val) {
      this.selected = val
    },
    priceChange (value) {
      this.priceType = value
      this.setColumns()
      this.getData()
    },
    // 批量废弃
    batchTrash () {
      if (this.selected.length === 0) return this.$Message.warning('请选择数据')
      this.$Modal.confirm({
        title: '提示',
        closable: true,
        content: '是否批量废弃？',
        onOk: () => {
          let data = { ids: this.selected.map(item => item.id).join(','), productClassCode: this.code }
          this.loading.batchTrash = true
          api.discardPreManufacturePrice(data).then(response => {
            if (response.code === 1000) {
              this.$Message.success(response.message)
              this.getData()
            } else {
              this.$Message.error(response.message)
            }
          }).catch(e => {
            this.$Message.error(e.message)
          }).finally(() => {
            this.loading.batchTrash = false
          })
        }
      })
    },
    // 提交审核
    confirm () {
      if (this.selected.length === 0) return this.$Message.warning('请选择数据')
      let data = { ids: this.selected.map(item => item.id).join(','), productClassCode: this.code }
      this.loading.confirm = true
      api.checkPreManufacturePrice(data).then(response => {
        if (response.code === 1000) {
          this.$Message.success(response.message)
          this.getData()
        } else {
          this.$Message.error(response.message)
        }
      }).catch(e => {
        this.$Message.error(e.message)
      }).finally(() => {
        this.loading.confirm = false
      })
    },
    maintain () {
      this.$refs.maintain.show()
    },
    searchData () {
      this.page.current = 1
      this.getData()
    },
    getData () {
      this.loading.search = true
      let data = {
        status: this.search.status.join(','),
        startTime: this.search.timeSpan[0] ? dateFns.format(this.search.timeSpan[0], 'YYYY-MM-DD') : '',
        endTime: this.search.timeSpan[1] ? dateFns.format(this.search.timeSpan[1], 'YYYY-MM-DD') : '',
        source: this.search.source,
        pageIndex: this.page.current,
        pageCount: this.page.pageSize,
        productClassCode: this.code,
        priceType: this.priceType
      }
      this.selected = []
      api.getAllPreManufactureInfoForPage(data).then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data && data.list && data.list.length > 0) {
            this.page.total = data.count
            data.list.forEach(item => this.$set(item, '_disabled', !['1', '7'].includes(item.status)))
            this.table.data = data.list
          } else {
            this.table.data = []
            this.page.total = 0
          }
        } else {
          this.$Message.error(response.exception)
        }
      }).catch(e => {
        this.$Message.error(e.message)
      }).finally(() => {
        this.loading.search = false
      })
    },
    // 上传文件
    uploadSuccess (res) {
      this.$Message.success(res.message)
      this.getData()
    },
    uploadError (e, file) {
      this.$Message.error(file.message)
    },
    formatError () {
      this.$Message.error('文件格式不正确')
    },
    pageChange (index) {
      this.page.current = index
      this.getData()
    },
    pageSizeChange (size) {
      this.page.pageSize = size
      this.getData()
    },
    setColumns () {
      if (this.priceType === '市场价') {
        this.productType.item = this.productType.item2
        this.table.columns = [this.table.extraColumns[0], ...this.productType.columns2]
      } else {
        this.productType.item = this.productType.item1
        this.table.columns = [this.table.extraColumns[0], ...this.productType.columns]
      }
    }
  }
}
</script>
