<style lang="less" scoped>
.search-bar {
  margin-bottom: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>

<template>
  <div>
    <div>
      <div class="search-bar clearfix">
        <Button
          type="success"
          style="float:right"
          @click="modalshow = true"
        >手动录入</Button>
        <Select
          v-model="searchParams.field"
          style="width:200px;margin-right:10px;"
        >
          <Option
            v-for="item in fieldListForSearch"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
        添加时间：
        <DatePicker
          :value="searchParams.dateRange"
          format="yyyy/MM/dd"
          type="daterange"
          placement="bottom-end"
          placeholder="请选择时间"
          style="width: 200px;margin-right:10px;"
        ></DatePicker>

        <Input
          @on-change="handleClear"
          clearable
          placeholder="输入关键字搜索"
          class="search-input"
          style="width:250px;margin-right:10px;"
          v-model="searchParams.keywords"
        /></Input>
        <Button
          @click="handleSearch"
          class="search-btn"
          type="primary"
        >搜索</Button>

      </div>
      <div class="mb-20">
        <tables
          ref="tables"
          editable
          v-model="tableData"
          :columns="columns"
          @on-delete="handleDelete"
        />
      </div>
      <Page
        @on-change="changePage"
        :total="totalRecords"
        :current="searchParams.page"
        show-total
      />
    </div>
    <Modal
      v-model="modalshow"
      title="Title"
      :loading="loading"
      @on-ok="asyncOK"
    >
      <Form
        :model="form"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="字段名：">
          <Input v-model="form.input1"></Input>
        </FormItem>
        <FormItem label="类目名称：">
          <Input v-model="form.input2"></Input>
        </FormItem>
        <FormItem label="别名备注：">
          <Input
            type="textarea"
            v-model="form.input3"
          ></Input>
        </FormItem>
        <FormItem label="来源渠道备注：">
          <Input v-model="form.input4"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getAuditDictData } from '@/api/data'
export default {
  name: 'dict-manager-audit',
  components: {
    Tables
  },
  data () {
    return {
      fieldListForSearch: [{
        value: 'a',
        label: '价格类型'
      }, {
        value: 'b',
        label: '价格条件'
      }, {
        value: 'c',
        label: '结算方式'
      }, {
        value: 'd',
        label: '字段名称'
      }],
      searchParams: {
        dateRange: ['2016-01-01', '2016-02-15'],
        field: 'd',
        keywords: '',
        page: 1,
        size: 10
      },
      totalRecords: 0,
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '序号', key: 'serial', sortable: true },
        { title: '字段名', key: 'name' },
        { title: '类目名称', key: 'category' },
        { title: '别名备注', key: 'alias' },
        { title: '添加类型', key: 'addType' },
        { title: '来源渠道备注', key: 'source' },
        { title: '创建人', key: 'creator' },
        { title: '添加时间', key: 'createtime' },
        { title: '备注', key: 'note' },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return [h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }),
              h('Button', {
                style: {
                  float: 'left'
                },
                on: {
                  click: () => {
                    this.modalshow = true
                    console.log(params.index)
                  }
                }
              }, '修改')
              ]
            }
          ]
        }
      ],
      tableData: [],
      modalshow: false,
      loading: true,
      form: {
        input1: '',
        input2: '',
        input3: '',
        input4: ''
      }
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    handleSearch () { },
    handleClear () { },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    getListData () {
      getAuditDictData(this.searchParams).then(res => {
        this.tableData = res.data.list
        console.log('res.data.page.total', res.data.page.total)

        this.totalRecords = res.data.page.total
      })
    },
    changePage (page) {
      this.searchParams.page = page
      getAuditDictData(this.searchParams).then(res => {
        this.tableData = res.data.list
        this.totalRecords = res.data.page.total
      })
    },
    asyncOK () {
      setTimeout(() => {
        this.modalshow = false
      }, 1500)
    },
    changePageSize (size) {
      this.searchParams.page = 1
      this.searchParams.size = size
      getAuditDictData(this.searchParams).then(res => {
        this.tableData = res.data.list
        this.totalRecords = res.data.page.total
      })
    }
  },
  mounted () {
    getAuditDictData(this.searchParams).then(res => {
      console.log('res.data', res.data)
      this.tableData = res.data.list
      this.totalRecords = res.data.page.total
    })
  }
}
</script>
