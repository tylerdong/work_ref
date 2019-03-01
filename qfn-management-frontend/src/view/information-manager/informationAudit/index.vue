<template>
  <div>
    <Card shadow>
      <p slot="title">资询审核</p>
      <div class="mb-20 clearfix">
        更新时间
        <DatePicker v-model="search.timeSpan"
                    format="yyyy-MM-dd HH:mm:ss"
                    transfer=transfer
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="请选择更新时间"
                    class="length-300 m-r-10"></DatePicker>
        文章类型
        <Select v-model="search.type" placeholder="请选择文章类型" transfer=transfer clearable class="length-200 m-r-10">
          <Option v-for="(item, index) in option.types" :value="item.key" :key="index">{{ item.content }}</Option>
        </Select>
        文章状态
        <Select v-model="search.status" placeholder="请选择文章状态" transfer=transfer clearable class="length-200 m-r-10">
          <Option v-for="(item, index) in option.status" v-if="!['1', '7'].includes(item.key)"  :value="item.key" :key="index">{{ item.content }}</Option>
        </Select>
        文章来源
        <Select v-model="search.source" placeholder="请选择文章来源" transfer=transfer clearable class="length-200 m-r-10">
          <Option v-for="(item, index) in option.source" :value="item.key" :key="index">{{ item.content }}</Option>
        </Select>
        <Button @click="getData" :loading="loading.search" class="getData-btn" type="primary">搜索</Button>
      </div>
      <Table :data="table.data" :columns="table.columns" :loading="loading.search" class="table-bottom-20">

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
    </Card>
  </div>
</template>
<script>
import api from '@/api/information'
import elements from '@/config/elements'
import dateFns from 'date-fns'
export default {
  components: {
  },
  data () {
    return {
      search: {timeSpan: [undefined, undefined], type: '', status: '', source: ''},
      selected: [],
      page: { total: 0, current: 1, pageSize: 20, pageSizes: [20, 30, 40, 50] },
      option: { types: [], status: [], source: [] },
      loading: { search: false, batchTrash: false, confirm: false },
      table: {
        data: [],
        columns: [
          {title: 'ID', minWidth: 80, key: 'id', align: 'center'},
          {title: '标题', minWidth: 240, key: 'title', align: 'center'},
          {title: '文章类型', minWidth: 50, align: 'center', render: (h, {row}) => h('span', this.option.types.find(item => item.key === row.type).content)},
          {title: '文章来源', minWidth: 50, align: 'center', render: (h, {row}) => h('span', this.option.source.find(item => item.key === row.source).content)},
          {title: '创建人', minWidth: 50, key: 'creator', align: 'center'},
          {title: '更新时间', minWidth: 50, align: 'center', render: (h, {row}) => h('span', dateFns.format(row.gmtModified, 'YYYY-MM-DD HH:mm:ss'))},
          {
            title: '文章状态',
            minWidth: 50,
            align: 'center',
            render: (h, {row}) => h('Tag', { props:
            {color: this.statusColor[Number.parseInt(row.status)].color, type: 'border'}}, this.option.status.find(item => item.key === row.status).content)
          },
          {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 140,
            render: (h, {row}) => {
              let actionBtn = []
              // 编辑
              if (['2', '8', '6'].includes(row.status)) {
                if (this.hasPromission(elements.information.informationAudit.index.edit)){
                  actionBtn.push(h('Button', { props: {
                    type: 'primary', size: 'small'},
                  on: { click: () => this.btnEdit(row) } }, '编辑'))
                }

              }
              // 废弃
              if (['2', '8', '6'].includes(row.status)) {
                if (this.hasPromission(elements.information.informationAudit.index.remove)){
                  actionBtn.push(
                    h('Button', { props:
                        {type: 'error', size: 'small', class: 'table-button'}
                    },
                    [h('Poptip', {
                      props: {confirm: true, transfer: true, placement: 'left-end', title: '确定是否废弃？', type: 'Error', size: 'small', width: '200'},
                      on: { 'on-ok': () => this.btnDiscard(row) }
                    }, '废弃')]))
                }

              }
              // 审核
              if (['3', '4'].includes(row.status)) {
                if (this.hasPromission(elements.information.informationAudit.index.audit)){
                  actionBtn.push(h('Button', { props: {type: 'success', size: 'small'}, on: { click: () => this.btnVerify(row) } }, '审核'))
                }

              }
              // 下架
              if (['5'].includes(row.status)) {
                if (this.hasPromission(elements.information.informationAudit.index.downShelves)){
                  actionBtn.push(
                  h('Button', { props:
                    {type: 'warning', size: 'small', class: 'table-button'}
                  },
                  [h('Poptip', {
                    props: { confirm: true, transfer: true, placement: 'left-end', title: '确定是否下架？', type: 'Warning', size: 'small', width: '200' },
                    on: { 'on-ok': () => this.btnSoldOut(row) }
                  }, '下架')]))
                }

              }
              // 详情
              if (['5'].includes(row.status)) {
                actionBtn.push(h('Button', { props:
                  {size: 'small'},
                on: { click: () => this.btnDetail(row) } }, '详情'))
              }
              return h('div', {class: {'table-div-btn': true}}, actionBtn)
            }
          }
        ]
      }
    }
  },
  mounted () {
    Promise.all([api.getAllArticleSource(), api.getAllArticleStatus(), api.getAllArticleType()]).then(res => {
      let data = []
      for (let i = 0; i < res.length; i++) {
        if (res[i].code === 1000) {
          data = res[i].data
          if (i === 0) this.option.source = data
          if (i === 1) this.option.status = data
          if (i === 2) this.option.types = data
        }
      }
      this.getData()
    }).catch(e => {
      this.$Message.error(e.message)
    })
  },
  methods: {
    // 编辑
    btnEdit (data) {
      this.goToTab('informationAudit:edit', data)
    },
    // 详情
    btnDetail (data) {
      // this.$router.push({ path: `../informationDetail/${data.id}` })
      this.goToTab('informationDetail', data)
    },
    // 废弃
    btnDiscard (data) {
      api.discardPrePreArticleById({id: data.id}).then(response => {
        if (response.code === 1000) {
          this.$Message.success(response.message)
          this.getData()
        } else {
          this.$Message.error(response.message)
        }
      }).catch(e => {
        this.$Message.error(e.message)
      })
    },
    // 下架
    btnSoldOut ({id, status}) {
      api.articleSoldOut({id, status}).then(response => {
        if (response.code === 1000) {
          this.$Message.success(response.message)
          this.getData()
        } else {
          this.$Message.error(response.message)
        }
      }).catch(e => {
        this.$Message.error(e.message)
      })
    },
    // 审核
    btnVerify (data) {
      this.goToTab('informationAudit:audit', data)
    },
    searchData () {
      this.page.current = 1
      this.getData()
    },
    getData () {
      this.loading.search = true
      let data = {
        type: this.search.type,
        status: this.search.status,
        source: this.search.source,
        startTime: this.search.timeSpan[0] ? dateFns.format(this.search.timeSpan[0], 'YYYY-MM-DD HH:mm:ss') : '',
        endTime: this.search.timeSpan[1] ? dateFns.format(this.search.timeSpan[1], 'YYYY-MM-DD HH:mm:ss') : '',
        sign: 'audit',
        pageIndex: this.page.current,
        pageCount: this.page.pageSize
      }
      this.selected = []
      api.getAllPreArticleForPage(data).then(response => {
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
