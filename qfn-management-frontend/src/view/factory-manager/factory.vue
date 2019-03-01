<template>
  <div>
    <Form ref="form" :model="search" inline>
      <FormItem prop="timeSpan" label="创建时间" class="length-20rem">
        <DatePicker type="datetimerange" v-model="search.timeSpan" placeholder="请选择创建时间" class="length-18rem" clearable
                    :transfer="true"></DatePicker>
      </FormItem>
      <FormItem prop="groupId" label="集团" class="length-16-6rem">
        <Select v-model="search.groupId" placeholder="请选择集团" :transfer="true" class="length-10rem" clearable>
          <Option v-for="(item, index) in option.group" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="fullName" label="企业名称" class="length-16-6rem">
        <Input v-model="search.fullName" placeholder="请输入企业名称" class="length-10rem" clearable/>
      </FormItem>
      <FormItem prop="name" label="企业简称" class="length-16-6rem">
        <Input v-model="search.name" placeholder="请输入企业简称" class="length-10rem" clearable/>
      </FormItem>
      <FormItem prop="matchName" label="企业别名" class="length-16-6rem">
        <Input v-model="search.matchName" placeholder="请输入企业别名" class="length-10rem" clearable/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="getDate">查询</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="btnAdd" v-check-promission="elements.dictionary.factoryManager.factory.create">添加厂家</Button>
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
    <dialog-factory ref="factory"
                    @confirmSuccess="getDate"
                    :area="option.area"
                    :category="option.category"
                    :group="option.group"></dialog-factory>
  </div>
</template>

<script>
import {getManufactureForPage, getCategoryTree, getAreaData, getManufactureGroupForPage} from './../../api/data'
import dateFns from 'date-fns'
import elements from '@/config/elements'

export default {
  components: {
    'dialog-factory': require('./dialog-factory').default
  },
  data () {
    return {
      elements: elements,
      search: {timeSpan: '', groupId: '', name: '', matchName: '', fullName: ''},
      option: {area: [], category: [], group: []},
      table: {
        data: [],
        columns: [
          {title: '编码', key: 'code', minWidth: 60},
          {title: '企业名称', key: 'fullName', minWidth: 250},
          {title: '企业简称', key: 'name', minWidth: 100},
          {title: '企业别名', key: 'matchName', minWidth: 160},
          {title: '所属集团', key: 'groupName', minWidth: 150},
          {
            title: '公司地址',
            minWidth: 400,
            render: (h, params) => {
              return h('span', `${params.row.hasOwnProperty('provinceName') ? params.row.provinceName : ''}
              ${params.row.hasOwnProperty('cityName') ? params.row.cityName : ''}
              ${params.row.hasOwnProperty('countyName') ? params.row.countyName : ''}
              ${params.row.hasOwnProperty('addr') ? params.row.addr : ''}`)
            }
          },
          {title: '电话', key: 'tel', minWidth: 150},
          {
            title: '创建时间',
            minWidth: 150,
            key: 'gmtCreate',
            render: (h, params) => {
              return h('span', dateFns.format(params.row.gmtCreate, 'YYYY-MM-DD HH:mm:ss'))
            }
          },
          {title: '创建人', key: 'creator', minWidth: 100},
          {
            title: '操作',
            align: 'center',
            minWidth: 90,
            fixed: 'right',
            render: (h, params) => {
              const editBtn = h('Button', {
                props: {type: 'primary', size: 'small'},
                on: {
                  click: () => {
                    this.btnEdit(params.row)
                  }
                }
              }, '编辑')

              let btns = []

              if (this.hasPromission(elements.dictionary.factoryManager.factory.edit)) {
                btns.push(editBtn)
              }

              return h('div',
                {class: {'table-div-btn': true}},
                btns
                //   ,
                // h('Button', {props: {type: 'error', size: 'small', class: 'table-button'}},
                //   [h('Poptip', {
                //     props: {
                //       confirm: true,
                //       transfer: true,
                //       placement: 'left-end',
                //       title: '确定要删除吗！',
                //       type: 'error',
                //       size: 'small',
                //       minWidth: '200'
                //     },
                //     on: {
                //       'on-ok': () => {
                //         this.btnDelete(params.row.id)
                //       }
                //     }
                //   }, '删除')])
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
    this.getCategoryTree()
    this.getAreaData()
    this.getGroup()
  },
  methods: {
    btnAdd () {
      this.$refs.factory.show({})
    },
    btnEdit (data) {
      this.$refs.factory.show(data)
    },
    btnDelete (data) {
      this.getDate()
    },
    // 品类
    getCategoryTree () {
      getCategoryTree({expand: false}).then(response => {
        if (response.data && response.data.length > 0) {
          this.option.category = [...response.data]
        } else {
          this.option.category = []
        }
      })
    },
    // 销售区域
    getAreaData () {
      getAreaData({expand: false}).then(response => {
        if (response.code === 1000) {
          if (response.data && response.data && response.data.length > 0) {
            this.option.area = response.data
          } else {
            this.option.area = []
          }
        }
      })
    },
    renderRadioForArea (data) {
      data.forEach(item => {
        this.$set(item, 'checked', true)
        this.$set(item, 'render', (h, {root, node, data}) => {
          return h('radio', item.fullName, {props: Object.assign({}, {'v-model': true})})
        })
        if (item.hasOwnProperty('children') && item.children.length > 0) {
          this.renderRadioForArea(item.children)
        }
      })
      return data
    },
    getGroup () {
      let data = {endTime: '', name: '', pageCount: 10000000, pageIndex: 1, startTime: ''}
      getManufactureGroupForPage(data).then(response => {
        if (response.code === 1000) {
          let data = response.data
          if (data && data.list && data.list.length > 0) {
            this.option.group = data.list
          } else {
            this.option.group = []
          }
        } else {
          this.$Notice.error({desc: response.exception})
        }
      })
    },
    getDate () {
      this.loading.table = true
      let data = {
        startTime: this.search.timeSpan[0] ? this.search.timeSpan[0].getTime() : '',
        endTime: this.search.timeSpan[1] ? this.search.timeSpan[1].getTime() : '',
        groupId: this.search.groupId,
        name: this.search.name,
        matchName: this.search.matchName,
        fullName: this.search.fullName,
        pageIndex: this.page.current,
        pageCount: this.page.pageSize
      }
      getManufactureForPage(data).then(response => {
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
