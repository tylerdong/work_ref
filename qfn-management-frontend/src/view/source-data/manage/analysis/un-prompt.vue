<template>
  <div>
    <div class="mb-20 clearfix">
      品名
      <Select v-model="search.product" clearable class="length-16-6rem m-r-10">
        <Option v-for="(item, index) in product" :value="item" :key="index">{{ item }}</Option>
      </Select>
      <Button @click="btnSearch" :loading="loading.search" class="getData-btn" type="primary">搜索</Button>
    </div>
    <Table :data="table.data" :columns="pPromtPrice === '出厂价' ? promtColums : promtColums2" class="table-bottom-20">
    </Table>
    <Page class="page-bottom-1"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          :total="page.total"
          :current="page.current"
          :page-size="page.pageSize"
          :page-size-opts="page.pageSizes"
          show-sizer
          show-total/>
    <dialog-maintain ref="maintain" @confirmSuccess="getData" :productType="dialogModel" :priceType="priceType"></dialog-maintain>
    <dialog-detail ref="detail" :status="status"></dialog-detail>
  </div>
</template>

<script>
import api from '@/api/data'
import dateFns from 'date-fns'
import elements from '@/config/elements'
export default {
  props: ['product', 'status', 'currStatus', 'productType', 'code', 'priceType'],
  components: {
    'dialog-maintain': require('./../../dialog-maintain').default,
    'dialog-detail': require('./../../dialog-detail').default
  },
  data () {
    return {
      elements,
      search: {timeSpan: [], product: '', status: this.currStatus},
      loading: {search: false},
      page: {total: 0, current: 1, pageSize: 20, pageSizes: [20, 30, 40, 50]},
      table: {
        data: [],
        columns: [],
        extraColumns: [
          {
            title: 'ID',
            width: 80,
            align: 'center',
            render: (h, {row}) => h('a', {on: {click: () => this.showDetail(row)}}, row.id)
          },
          {
            title: '更新时间',
            width: 140,
            render: (h, {row}) => h('span', dateFns.format(row.gmtModified, 'YYYY-MM-DD HH:mm'))
          },
          {
            title: '操作',
            fixed: 'right',
            width: 140,
            render: (h, {row}) => {
              let actionBtn = []
              if (this.hasPromission(elements.sourceData.analysis.unPrompt.edit)) {
                actionBtn.push(h('Button', {props: {type: 'primary', size: 'small'}, on: {click: () => this.btnEdit(row)}}, '修改'))
              }
              if (this.hasPromission(elements.sourceData.analysis.unPrompt.del)) {
                actionBtn.push(h('Button', {props: {type: 'error', size: 'small', class: 'table-button'}},
                  [h('Poptip', {
                    props: {confirm: true, transfer: true, placement: 'left-end', title: '确定是否遗弃？', type: 'error', size: 'small', width: '200'},
                    on: {'on-ok': () => this.btnDelete(row.id)}
                  }, '废弃')]))
              }
              return h('div', { class: {'table-div-btn': true} }, actionBtn)
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    dialogModel: function () {
      if (this.productType.item) {
        return this.productType
      } else {
        return { item: [] }
      }
    },
    promtColums: function () {
      return [this.table.extraColumns[0], ...this.productType.columns, this.table.extraColumns[1], this.table.extraColumns[2]]
    },
    promtColums2: function () {
      return [this.table.extraColumns[0], ...this.productType.columns2, this.table.extraColumns[1], this.table.extraColumns[2]]
    },
    pPromtPrice: function () {
      return this.priceType
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    pPromtPrice: function (newValue, oldValue) {
      this.getData()
    },
    '$route' (to, from) {
      this.search.product = ''
      this.getData()
    }
  },
  methods: {
    btnSearch () {
      this.page.current = 1
      this.getData()
    },
    getColumns () {
      this.table.columns.push(this.table.extraColumns[0])
      if (this.priceType === '出厂价') {
        this.table.columns.push(...this.productType.columns)
      } else {
        this.table.columns.push(...this.productType.columns2)
      }
      this.table.columns.push(this.table.extraColumns[2])
    },
    getData () {
      this.getColumns()
      this.loading.search = true
      let data = {
        productClassName: this.search.product,
        status: this.currStatus,
        startTime: this.search.timeSpan[0] ? this.search.timeSpan[0].getTime() : '',
        endTime: this.search.timeSpan[1] ? this.search.timeSpan[1].getTime() : '',
        pageIndex: this.page.current,
        pageCount: this.page.pageSize,
        productClassCode: this.code,
        priceType: this.pPromtPrice
      }
      api.getAllPreManufactureInfoForPage(data).then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data && data.list && data.list.length > 0) {
            this.page.total = data.count
            this.table.data = data.list
          } else {
            this.table.data = []
            this.page.total = 0
          }
        } else {
          this.$Message.error(response.exception)
        }
      }).catch(e => {
        this.$Message.error(e.response.data.message)
      }).finally(() => {
        this.loading.search = false
      })
    },
    btnEdit (data) {
      this.$refs.maintain.show(data)
    },
    btnDelete (id) {
      this.loading.batchTrash = true
      api.discardPreManufacturePrice({ids: id}).then(response => {
        if (response.code === 1000) {
          this.$Message.success(response.message)
          this.getData()
        } else {
          this.$Message.error(response.message)
        }
      }).catch(e => {
        this.$Message.error(e.response.data.message)
      })
    },
    showDetail (data) {
      this.$refs.detail.show(data)
    },
    pageChange (index) {
      this.page.current = index
      this.getData()
    },
    pageSizeChange (size) {
      this.page.current = 1
      this.page.pageSize = size
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
