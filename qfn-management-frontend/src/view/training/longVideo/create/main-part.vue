<template>
  <div class="addInformation">
    <Card shadow>
      <p slot="title">添加长视频</p>
      <div class="mb-20 clearfix">
        创建时间：
        <DatePicker :value="[search.startTime,search.endTime]"
                    format="yyyy-MM-dd"
                    transfer="transfer"
                    type="daterange"
                    placement="bottom-end"
                    placeholder="选择时间区间"
                    @on-change="handleDateChange"
                    style="margin-top:10px;"
                    class="length-16-6rem m-r-10 mt-10"></DatePicker>
        视频状态：
        <Select placeholder="请选择状态" v-model="search.status" class="length-16-6rem m-r-10" clearable>
          <Option v-for="item in status" :value="item.status" :key="item.key">{{ item.showStatus }}</Option>
        </Select>
        标题：
        <Input placeholder="请输入标题" type="text" v-model="search.title" clearable class="length-16-6rem m-r-10"/>
        <Button @click="handlerSearch" class="getData-btn" type="primary" :loading="loading.search">搜索</Button>
        <Button type="success"
                @click="btnAdd"
                class="fr mt-10"
                v-check-promission="elements.trainingManage.longVideo.main.add">添加长视频</Button>
      </div>
      <Table ref="selection"
             :data="table.data"
             :columns="table.columns"
             class="table-bottom-20"></Table>
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
    <dialog-main ref="mainPart" :userList="option.userList" :sourceType="sourceType" @confirmSuccess="getData"></dialog-main>
    <dialog-sub-video ref="subVideo"></dialog-sub-video>
    <dialog-main-detail ref="mainDetail" :status="status"></dialog-main-detail>
  </div>
</template>
<script>
import api from '@/api/index'
import dateFns from 'date-fns'
import elements from '@/config/elements'
import {sourceType} from '@/config/option'

export default {
  components: {
    'dialog-main': require('./dialog-main').default,
    'dialog-sub-video': require('./dialog-sub-video').default,
    'dialog-main-detail': require('./dialog-main-detail').default
  },
  props: ['status'],
  data () {
    return {
      elements,
      sourceType,
      page: { total: 0, current: 1, pageSize: 10, pageSizes: [10, 20, 30, 40, 50] },
      search: {startTime: '', endTime: '', status: ''},
      option: {userList: []},
      loading: {search: false},
      table: {
        data: [],
        columns: [
          {title: 'ID', key: 'id', minWidth: 80, align: 'center'},
          {title: '视频主题', key: 'title', minWidth: 80, align: 'center'},
          {title: '视频简介', key: 'videoAbout', minWidth: 80, align: 'center'},
          {title: '总集数', key: 'videoTotalNum', minWidth: 80, align: 'center'},
          {title: '已更新集数', key: 'videoCurrentNum', minWidth: 80, align: 'center'},
          {title: '创建人', key: 'author', minWidth: 80, align: 'center'},
          {title: '更新时间', minWidth: 140, render: (h, {row}) => h('span', dateFns.format(row.gmtModified, 'YYYY-MM-DD HH:mm'))},
          {title: '视频状态', minWidth: 80, align: 'center', render: (h, {row}) => h('span', this.status.find(s => s.status === row.status).showStatus)},
          {
            title: '操作',
            fixed: 'right',
            minWidth: 230,
            render: (h, {row}) => {
              let actionBtn = []
              actionBtn.push(h('Button', {props: {size: 'small'}, on: {click: () => this.btnDetail(row)}}, '查看'))
              actionBtn.push(h('Button', {props: {type: 'primary', size: 'small'}, on: {click: () => this.btnEdit(row)}}, '编辑'))
              actionBtn.push(h('Button', {props: {size: 'small'}, on: {click: () => this.btnSub(row)}}, '查看子视频'))
              return h('div', { class: {'table-div-btn': true} }, actionBtn)
            }
          }
        ]
      }
    }
  },
  mounted () {
    Promise.all([api.shortVideo.getUserList()]).then(res => {
      this.option.userList = res[0].data
    }).catch(e => {
      this.$Message.error(e.message)
    })
    this.getData()
  },
  methods: {
    handlerSearch () {
      this.page.current = 1
      this.search.pageIndex = 1
      this.getData()
    },
    pageChange (index) {
      this.page.current = index
      this.search.pageIndex = index
      this.getData()
    },
    pageSizeChange (size) {
      this.page.pageSize = size
      this.search.pageCount = size
      this.getData()
    },
    handleDateChange (dataArr) {
      this.search.startTime = dataArr[0]
      this.search.endTime = dataArr[1]
    },
    getData () {
      let data = {
        title: this.search.title,
        status: this.search.status,
        startTime: this.search.startTime,
        endTime: this.search.endTime,
        pageIndex: this.page.current,
        pageCount: this.page.pageSize
      }
      this.loading.search = true
      api.longVideo.getPreVideoThemeList(data).then(response => {
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
        this.$Message.error(e.message)
      }).finally(() => {
        this.loading.search = false
      })
    },
    btnAdd () {
      this.$refs.mainPart.show()
    },
    // 编辑
    btnEdit (data) {
      this.$refs.mainPart.show(data)
    },
    // 详情
    btnDetail (data) {
      this.$refs.mainDetail.show(data)
    },
    // 显示子视频弹窗
    btnSub ({id, title}) {
      api.longVideo.selectDetil({id}).then(res => {
        if (res.code === 1000) {
          this.$refs.subVideo.show({data: res.data, title})
        } else {
          this.$Message.error(res.message)
        }
      }).catch(e => {
        this.$Message.error(e.message)
      }).finally(() => {
        this.loading.modal = false
      })
    }
  }
}
</script>
<style lang="less">
  .n-table {
    .ivu-form-item {
      margin-bottom: 0;

    }
  }
</style>
