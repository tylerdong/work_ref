<template>
  <div>
    <div class="search-bar clearfix">
        <Button
          type="success"
          style="float:right"
          @click="$emit('switch-model')"
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
          format="yyyy/MM/dd"
          transfer = transfer
          type="daterange"
          placement="bottom-end"
          placeholder="Select date"
          style="width: 200px;margin-right:10px;"
        ></DatePicker>

        <Input
          @on-change="handleClear"
          clearable
          placeholder="输入产品名搜索"
          class="search-input"
          style="width:250px;margin-right:10px;"
          v-model="params.productName"
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
        :current="params.page"
        show-total
      />
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getAuditDictData } from '@/api/data'
export default {
  name: 'main-table',
  components: {
    Tables
  },
  data () {
    return {
      modalshow: false,
      params: this.searchParams,
      transfer: true
    }
  },
  props: ['tableData', 'fieldListForSearch', 'searchParams', 'totalRecords', 'columns'],
  methods: {
    handleDelete (params) {
      console.log('iddddddddddddddddd')
      this.$emit('delete-item', params)
    },
    handleSearch () {
      this.$emit('search', this.params)
    },
    handleClear () {
      console.log('handleClear')
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
