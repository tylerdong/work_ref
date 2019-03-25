<template>
  <div>
    <Form ref="form" :model="search" inline>
      <FormItem prop="timeSpan" label="创建时间" class="length-24rem">
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
        <Button type="primary" @click="getData">查询</Button>
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
                    @confirmSuccess="getData"
                    :enterpriseType="option.enterpriseType"
                    :area="option.area"
                    :category="option.category"
                    :group="option.group"
                    :industry="option.industry"></dialog-factory>
    <dialog-department ref="department" @confirmSuccess="getData"></dialog-department>
  </div>
</template>

<script>
import api from './../../api'
import dateFns from 'date-fns'
import elements from '@/config/elements'

export default {
  components: {
    'dialog-factory': require('./dialog-factory').default,
    'dialog-department': require('./dialog-department').default
  },
  data () {
    return {
      elements: elements,
      search: {timeSpan: '', groupId: '', name: '', matchName: '', fullName: ''},
      option: {area: [], category: [], group: [], enterpriseType: [], industry: []},
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
            render: (h, {row}) => {
              return h('span', `${row.hasOwnProperty('provinceName') ? row.provinceName : ''}
              ${row.hasOwnProperty('cityName') ? row.cityName : ''}
              ${row.hasOwnProperty('countyName') ? row.countyName : ''}
              ${row.hasOwnProperty('townName') ? row.townName : ''}
              ${row.hasOwnProperty('addr') ? row.addr : ''}`)
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
            minWidth: 140,
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
              const depBtn = h('Button', {
                props: {type: 'primary', size: 'small'},
                on: {
                  click: () => {
                    this.btnDepartment(params.row)
                  }
                }
              }, '部门')

              let btns = []

              if (this.hasPromission(elements.dictionary.factoryManager.factory.edit)) {
                btns.push(editBtn)
              }
              if (this.hasPromission(elements.dictionary.factoryManager.factory.department)) {
                btns.push(depBtn)
              }

              return h('div', {class: {'table-div-btn': true}}, btns)
            }
          }
        ]
      },
      loading: {table: false},
      page: {total: 0, current: 1, pageSize: 20, pageSizes: [20, 30, 40, 50]}
    }
  },
  mounted () {
    this.getData()
    let params = {expand: false}
    let data = {endTime: '', name: '', pageCount: 10000000, pageIndex: 1, startTime: ''}
    Promise.all([api.data.getCategoryTree(params),
      api.data.getAreaData(params),
      api.data.getManufactureGroupForPage(data),
      api.data.getEnterpriseTypeList(),
      api.data.getIndustryNameList()]).then(res => {
      this.option.category = res[0].data
      this.option.area = res[1].data
      this.option.group = res[2].data.list
      this.option.enterpriseType = res[3].data
      this.option.industry = res[4].data
    }).catch(e => {
      this.$Message.error(e.message)
    })
  },
  methods: {
    btnAdd () {
      this.$refs.factory.show({})
    },
    btnEdit (data) {
      this.$refs.factory.show(data)
    },
    btnDepartment (data) {
      this.$refs.department.show(data.id)
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
    getData () {
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
      api.data.getManufactureForPage(data).then(response => {
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
      this.getData()
    },
    pageSizeChange (size) {
      this.page.pageSize = size
      this.getData()
    }
  }
}
</script>
<style scoped>
</style>
