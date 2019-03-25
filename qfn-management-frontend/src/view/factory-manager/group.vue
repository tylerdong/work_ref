<template>
  <div>
    <Form ref="form" :model="search" inline>
      <FormItem prop="timeSpan" label="创建时间" class="length-24rem">
        <DatePicker type="datetimerange" v-model="search.timeSpan" placeholder="请选择创建时间" class="length-18rem" clearable :transfer="true"></DatePicker>
      </FormItem>
      <FormItem prop="name" label="集团名称" class="length-16-8rem">
        <Input v-model="search.name" placeholder="请输入集团名称" class="length-10rem" clearable/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="getDate">查询</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="btnAdd"  v-check-promission="elements.dictionary.factoryManager.group.create">添加集团</Button>
      </FormItem>
    </Form>
    <Table :data="table.data" :columns="table.columns" :loading="loading.table" class="table-bottom-20"></Table>
    <Page class="page-bottom-1"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          :total="page.total"
          :current="page.current"
          :page-size="page.pageSize"
          :page-size-opts="page.pageSizes"
          show-sizer
          show-total/>
    <dialog-group ref="group" @confirmSuccess="getDate"></dialog-group>
  </div>
</template>

<script>
import {getManufactureGroupForPage} from './../../api/data'
import dateFns from 'date-fns'
import elements from '@/config/elements'
export default {
  components: {
    'dialog-group': require('./dialog-group').default
  },
  data () {
    return {
      elements: elements,
      search: {timeSpan: '', name: ''},
      table: {
        data: [],
        columns: [
          {title: '编码', key: 'code'},
          {title: '名称', key: 'name'},
          {title: '集团网址', key: 'name'},
          {title: '是否上市', key: 'name'},
          {title: '上市名', key: 'name'},
          {title: '股票代码', key: 'name'},
          {title: '电话', key: 'tel'},
          {
            title: '创建时间',
            key: 'gmtCreate',
            render: (h, params) => {
              return h('span', dateFns.format(params.row.gmtCreate, 'YYYY-MM-DD HH:mm:ss'))
            }
          },
          {title: '创建人', key: 'creator'},
          {
            title: '操作',
            align: 'center',
            width: 90,
            render: (h, params) => {
              const editBtn = h('Button', {
                props: {type: 'primary', size: 'small'},
                on: { click: () => { this.btnEdit(params.row) } }
              }, '编辑')

              let btns = []

              if (this.hasPromission(elements.dictionary.factoryManager.group.edit)) {
                btns.push(editBtn)
              }

              return h('div',
                {class: {'table-div-btn': true}},
                btns
              )
            }
          }
        ]
      },
      loading: {table: false},
      page: {total: 0, current: 1, pageSize: 20, pageSizes: [20, 30, 40, 50]}
    }
  },
  mounted () {
    this.getDate()
  },
  methods: {
    btnAdd () {
      this.$refs.group.show()
    },
    btnEdit (data) {
      this.$refs.group.show(data)
    },
    btnDelete (data) {
      console.log(data)
      this.getDate()
    },
    getDate () {
      this.loading.table = true
      let data = {
        startTime: this.search.timeSpan[0] ? this.search.timeSpan[0].getTime() : '',
        endTime: this.search.timeSpan[1] ? this.search.timeSpan[1].getTime() : '',
        name: this.search.name,
        pageIndex: this.page.current,
        pageCount: this.page.pageSize
      }
      getManufactureGroupForPage(data).then(response => {
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
          this.$Notice.error({desc: response.exception})
        }
      }).catch(e => {
        this.$Notice.error({desc: e.message})
      }).finally(() => {
        this.loading.table = false
      })
    },
    pageChange (current) {
      this.page.current = current
      this.getDate()
    },
    pageSizeChange (size) {
      this.page.pageSize = size
      this.getDate()
    }
  }
}
</script>
<style scoped>
</style>
