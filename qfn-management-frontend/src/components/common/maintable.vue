<template>
  <div>
    <div class="search-bar clearfix">
        <Button
          type="success"
          style="float:right"
          @click="$emit('switch-model')"
          v-check-promission="elements.dictionary.productManager.create"
        >手动录入</Button>
        <Select
          v-if="fieldListForSearch"
          v-model="params.field"
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
          :value="[params.startTime,params.endTime]"
          @on-change="handleDateChange"
          format="yyyy-MM-dd"
          transfer = transfer
          type="daterange"
          placement="bottom-end"
          placeholder="请选择时间"
          style="width: 200px;margin-right:10px;"
        ></DatePicker>

        <Input
          @on-change="handleClear"
          clearable
          placeholder="输入规格搜索"
          class="search-input"
          style="width:250px;margin-right:10px;"
          v-model="params.spec"
        /></Input>
        <Button
          @click="handleSearch"
          class="search-btn"
          type="primary"
        >搜索</Button>

      </div>
      <div class="mb-20">
        <tables
          border
          ref="tables"
          editable
          v-model="tableData"
          :columns="columns"
          @on-delete="handleDelete"
        />
      </div>
      <Page
        @on-change="changePage"
        @on-page-size-change="pageSizeChange"
        :page-size="page.pageSize"
        :page-size-opts="page.pageSizes"
        :total="totalRecords"
        :current="params.pageIndex"
        show-total
        show-sizer
      />
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getAuditDictData } from '@/api/data'
import elements from '@/config/elements'
export default {
  name: 'main-table',
  components: {
    Tables
  },
  data () {
    return {
      elements: elements,
      modalshow: false,
      params: this.searchParams,
      transfer: true,
      page: { total: 0, current: 1, pageSize: 10, pageSizes: [10, 20, 30, 40, 50] }
    }
  },
  props: ['tableData', 'fieldListForSearch', 'searchParams', 'totalRecords', 'columns'],
  methods: {
    handleDelete (params) {
      this.$emit('delete-item', params)
    },
    handleDateChange (p) {
      this.$emit('date-change', p)
    },
    pageSizeChange (size) {
      this.$emit('page-size-change', size)
    },
    handleSearch () {
      this.$emit('search', this.params)
    },
    handleClear () {
    },
    changePage (page) {
      this.$emit('change-page', page)
    },
    changePageSize (size) {
      this.$emit('change-page-size', size)
    }
  },
  mounted () {

  }
}
</script>
<style lang="less">
.search-bar {
  margin-bottom: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>
