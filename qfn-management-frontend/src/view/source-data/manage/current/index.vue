<template>
  <div>
    <Card shadow>
      <div slot="title"  style="height:30px;line-height:20px;">现势数据
      <Select v-model="priceType"   style="width:100px;margin-left:10px;height:30px;" @on-change="priceChange">
        <Option v-for="(item, index) in $store.state.app.selectPrice" :value="item" :key="index">{{ item }}</Option>
      </Select>
      </div>
      <div class="mb-20 clearfix">
        更新时间：
        <DatePicker
          :value="[search.startTime,search.endTime]"
          format="yyyy-MM-dd"
          transfer=transfer
          type="daterange"
          placement="bottom-end"
          placeholder="选择添加时间"
          class="mr-20"
          style="width:200px"
          @on-change="handleDateChange"
        ></DatePicker>
        价格时间：
        <DatePicker
          :value="[search.startPriceDate,search.endPriceDate]"
          format="yyyy-MM-dd"
          transfer=transfer
          type="daterange"
          placement="bottom-end"
          placeholder="选择价格时间"
          class="mr-20"
          style="width:200px"
          @on-change="handleUpdateDateChange"
        ></DatePicker>
        品名：
        <Select
          v-model="search.productClassName"
          class="length-16-6rem m-r-10"
          transfer=transfer
          clearable
        >
          <Option
            v-for="(item, index) in products"
            :value="item"
            :key="index"
          >{{ item }}</Option>
        </Select>
        <Input
          v-model="search.spec"
          placeholder="请输入规格..."
          class="mr-20"
          style="width: 300px"
        />
        <Button
          :loading="searchLoading"
          @click="handleSearch"
          class="getData-btn"
          type="primary"
        >搜索</Button>

      </div>
      <Table
        :loading="searchLoading"
        :data="table.data"
        :columns="table.columns"
        @on-sort-change="sortChange"
        class="table-bottom-20"
      ></Table>
      <Page
        class="page-bottom-1"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :total="page.total"
        :current="page.current"
        :page-size="page.pageSize"
        :page-size-opts="page.pageSizes"
        show-sizer
        show-total
      />
    </Card>
  </div>
</template>

<script>
import api from '@/api/data'
import dateFns from 'date-fns'
import {configurations} from '@/config/option'
import _ from 'lodash'
export default {
  data () {
    return {
      priceType: '出厂价',
      productType: {},
      searchLoading: true,
      search: { startTime: '', endTime: '', startPriceDate: '', endPriceDate: '', productClassName: '', spec: '', order: '' },
      page: { total: 0, current: 1, pageSize: 20, pageSizes: [20, 30, 40, 50] },
      products: [],
      option: {status: []},
      table: {
        data: [],
        columns: []
      }
    }
  },
  props: { code: { type: String } },
  watch: {
    '$route' (to, from) {
      configurations(this, this.code).then(res => {
        this.productType = res
        this.setColumns()
        this.getProductsData().then(res => {
          this.getData()
        })
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
  methods: {
    clearSearch () {
      this.search.startTime = ''
      this.search.endTime = ''
      this.search.productClassName = ''
      this.search.spec = ''
    },
    getStatus (queryData) {
      api.getAllDataStatus().then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data && Array.isArray(data) && data.length > 0) {
            this.option.status = data
          } else {
            this.option.status = []
          }
        }
      })
    },
    priceChange (value) {
      this.priceType = value
      this.setColumns()
      this.getData()
    },
    getData () {
      const query = {
        status: 6,
        pageIndex: this.page.current,
        pageCount: this.page.pageSize,
        startTime: this.search.startTime,
        endTime: this.search.endTime,
        startPriceDate: this.search.startPriceDate,
        endPriceDate: this.search.endPriceDate,
        productClassName: this.search.productClassName,
        spec: this.search.spec,
        productClassCode: this.code,
        priceType: this.priceType,
        order: this.search.order
      }
      this.searchLoading = true
      api.getAllPreManufactureInfoForPage(query).then(response => {
        this.searchLoading = false
        if (response.code === 1000) {
          const data = response.data
          this.table.data = [...data.list]
          this.page.current = data.pageIndex
          this.page.total = data.count
        } else {
          this.$Message.error(response.message)
        }
      })
    },
    getProductsData () {
      return new Promise((resolve, reject) => {
        api.getAllCondByStatus({ status: '6', productClassCode: this.code }).then(response => {
          if (response.code === 1000) {
            const data = response.data
            this.products = data
            resolve(data)
          } else {
            this.$Message.error(response.message)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSearch () {
      this.page.current = 1
      this.getData()
    },
    handleDateChange (date) {
      this.search.startTime = date[0]
      this.search.endTime = date[1]
    },
    sortChange ({order}) {
      if (order !== 'normal') {
        this.search.order = 'price_date ' + order
        this.getData()
      }
    },
    handleUpdateDateChange (date) {
      this.search.startPriceDate = date[0]
      this.search.endPriceDate = date[1]
    },
    pageChange (index) {
      this.page.current = index
      this.getData()
    },
    pageSizeChange (size) {
      this.page.pageSize = size
      this.page.current = 1
      this.getData()
    },
    initDateRange () {
      this.search.startTime = dateFns.format((new Date()), 'YYYY-MM-DD')
      this.search.endTime = dateFns.format((new Date()), 'YYYY-MM-DD')
    },
    setColumns () {
      let array = [];
      if (this.priceType === '市场价') {
        array = [ ..._.cloneDeep(this.productType.columns2), { title: '创建时间', width: 200, key: 'gmtCreate', align: 'center', render: (h, params) => { return h('span', dateFns.format(params.row.gmtCreate, 'YYYY-MM-DD HH:mm')) } } ]
      } else {
        array = [ ..._.cloneDeep(this.productType.columns), { title: '创建时间', width: 200, key: 'gmtCreate', align: 'center', render: (h, params) => { return h('span', dateFns.format(params.row.gmtCreate, 'YYYY-MM-DD HH:mm')) } } ]
      }
      let priceDateCol = array.find(item => item.key === 'priceDate')
      this.$set(priceDateCol, 'sortable', true)
      this.table.columns = array;
    }
  },
  mounted () {
    this.getStatus(true)
    this.getProductsData().then(res => {
      this.getData()
    })
  }
}
</script>

<style scoped>
</style>
