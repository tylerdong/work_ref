<style lang="less">
.flash-detail-modal {
  th {
    padding: 5px;
    width: 100px;
    text-align: right;
    vertical-align: top;
  }
  td {
    padding: 5px;
  }
}
</style>
<template>
  <Card shadow>
    <p slot="title">快讯管理</p>
    <div class="search-bar mb-20 clearfix">
      <Button
        type="success"
        class="fr"
        @click="addInfomation"
        v-check-promission="elements.information.quickInformation.index.create"
      >添加快讯</Button>

      <DatePicker
        :value="searchParams.dateRange"
        format="yyyy-MM-dd"
        type="daterange"
        transfer=transfer
        placement="bottom-end"
        placeholder="选择创建时间"
        @on-change="handleChangeTime"
        style="width: 200px;margin-right:10px;"
      ></DatePicker>
      状态：<Select
        v-model="searchParams.status"
        style="width:100px;margin-right:10px;"
      >
        <Option
          v-for="item in fieldListForSearch"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</Option>
      </Select>
      <Button
        :loading="loadingSearch"
        @click="handleSearch"
        class="search-btn"
        type="primary"
      >搜索</Button>

    </div>
    <div class="mb-20">
      <Table
        :loading="loadingSearch"
        ref="tables"
        :data="tableData"
        :columns="columns"
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
      v-model="modals.flashNewsDetail.isShow"
      :width="900"
      title="快讯详情"
    >
      <div>
        <div>
          <Spin
            size="large"
            v-if="loadingDetail"
            style="width:80px;margin:10px auto;"
          ></Spin>
        </div>
        <table
          class="flash-detail-modal"
          v-if="loadingDetail==false"
        >
          <tbody>
            <tr>
              <th>快讯内容</th>
              <td>{{modals.flashNewsDetail.data.flashContent}}</td>
            </tr>
            <tr>
              <th>快讯时间</th>
              <td>{{modals.flashNewsDetail.data.formatPublishTime}}</td>
            </tr>
            <tr>
              <th>媒体平台</th>
              <td>{{modals.flashNewsDetail.data.mediaPlatform}}</td>
            </tr>
            <tr>
              <th>来源</th>
              <td>{{modals.flashNewsDetail.data.source}}</td>
            </tr>
            <tr v-if="modals.flashNewsDetail.data.isRelation =='y'">
              <th>关联资讯内容</th>
              <td>
                <div v-if="modals.flashNewsDetail.data.articleId">
                  <p>站内关联原文链接: {{modals.flashNewsDetail.data.articleTitle}}</p>
                </div>
                <div v-if="!modals.flashNewsDetail.data.articleId">
                  <div class="mb-5">
                    {{modals.flashNewsDetail.data.title}}
                  </div>
                  <div>
                    <div v-html="modals.flashNewsDetail.data.content"></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  </Card>
</template>
<script>
import api from "@/api/information";
import elements from '@/config/elements'
import dateFns from 'date-fns'
export default {
  name: 'quickInformation',
  data () {
    return {
      elements:elements,
      loadingSearch: true,
      loadingDetail: true,
      fieldListForSearch: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '待上线'
      }, {
        value: 2,
        label: '已上线'
      }, {
        value: 3,
        label: '已下架'
      }],
      searchParams: {
        dateRange: [new Date(), new Date()],
        pageIndex: 1,
        pageCount: 10,
        status: 0,
      },
      modals: {
        flashNewsDetail: {
          isShow: false,
          loading: false,
          data: {}
        }
      },
      totalRecords: 0,
      tableData: [],
      columns: [
        { title: '序号', width: 100, key: 'id', },
        { title: '快讯内容', minWidth: 300, key: 'flashContent' },
        { title: '风险等级', width: 100, key: 'riskLevel',
          render: (h, { row }) => {
            if (row.riskLevel == '1') {
              return h('Tag', {props: {color: 'red'}}, '1')
            } else if (row.status == '2') {
              return h('Tag', {props: {color: 'gold'}}, '2')
            } else {
              return h('Tag', {props: {color: 'green'}}, '3')
            }
          }
        },
        {          title: '是否有内容链接', width: 130, key: 'isRelation', render: (h, { row }) => {
            if (row.isRelation === 'y') {
              return h('span', {}, '有')
            } else {
              return h('span', {}, '无')
            }
          }        },
        { title: '来源', width: 100, key: 'mediaPlatform' },
        { title: '快讯时间', width: 180, render: (h, { row }) => h('span', dateFns.format(row.publishTime, 'YYYY-MM-DD HH:mm:ss')) },
        { title: '更新时间', width: 180, render: (h, { row }) => h('span', dateFns.format(row.gmtModified, 'YYYY-MM-DD HH:mm:ss')) },
        {          title: '状态', width: 100, key: 'status', render: (h, { row }) => {
            if (row.status == '1') {
              return h('Tag', {props: {color: 'gold'}}, '待上线')
            } else if (row.status == '2') {
              return h('Tag', {props: {color: 'green'}}, '已上线')
            } else {
              return h('Tag', {props: {color: 'red'}}, '已下架')
            }
          }        },
        {
          title: '操作',
          key: 'handle',
          width: 150,
          // options: ['delete'],
          render: (h, { row }) => {
            let actionBtn = []
            // 待上线
            if (row.status === '1') {
              if (this.hasPromission(elements.information.quickInformation.index.edit)){
                // 修改
                actionBtn.push(h('Button', {
                  props: {
                    size: 'small', type: "primary"
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.gotoEditFlashNews(row.id)
                    }
                  }
                }, '修改'))
              }

              if (this.hasPromission(elements.information.quickInformation.index.remove)){
                // 删除
                actionBtn.push(h('Button', {
                  props: {
                    type: 'error', size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delConfirm(row)
                    }
                  }
                }, '删除'))
              }


            }
            // 已上线
            if (row.status === '2') {
              // 详情
              actionBtn.push(h('Button', {
                props: {
                  size: 'small',                }, style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.showDetailModal(row.id)
                  }
                }
              }, '详情'))

              if (this.hasPromission(elements.information.quickInformation.index.downShelves)){
                // 下架
                actionBtn.push(h('Button', {
                  props: {
                    type: 'warning', size: 'small'
                  },
                  on: {
                    click: () => {
                      this.downConfirm(row)
                    }
                  }
                }, '下架'))
              }
            }
            // 已下架
            if (row.status === '3') {
              // 详情
              actionBtn.push(h('Button', {
                props: {
                  size: 'small', class: 'mr-20'
                },
                on: {
                  click: () => {
                    this.showDetailModal(row.id)
                  }
                }
              }, '详情'))

            }
            return actionBtn
          }
        }
      ],
    }
  },
  methods: {
    changePage (page) {
      this.searchParams.pageIndex = page
      this.getData()
    },
    handleSearch () {
      this.searchParams.pageIndex = 1
      this.getData()
    },
    handleClear () {

    },
    addInfomation () {
      this.$router.push({ name: 'quickInformation:create' })
    },
    getData () {
      this.loadingSearch = true
      const finalSearchParams = JSON.parse(JSON.stringify(this.searchParams))
      finalSearchParams.startTime = (this.searchParams.dateRange[0] && dateFns.format(this.searchParams.dateRange[0], 'YYYY-MM-DD')) || ''
      finalSearchParams.endTime = (this.searchParams.dateRange[1] && dateFns.format(this.searchParams.dateRange[1], 'YYYY-MM-DD')) || ''
      delete finalSearchParams.dateRange
      api.getFlashNews(finalSearchParams).then(res => {
        this.loadingSearch = false
        this.tableData = res.data.list;
        this.totalRecords = res.data.count;
        this.searchParams.pageIndex = res.data.pageIndex;
      });
    },
    showDetailModal (id) {
      this.modals.flashNewsDetail.data = {}
      this.loadingDetail = true
      this.modals.flashNewsDetail.isShow = true
      this.modals.flashNewsDetail.loading = true
      api.getFlashNewDetail(id).then(res => {
        this.loadingDetail = false
        this.modals.flashNewsDetail.data = res.data
        this.modals.flashNewsDetail.data.formatPublishTime = dateFns.format(res.data.publishTime, 'YYYY-MM-DD HH:mm:ss')
      });
    },
    handleChangeTime (date) {
      this.searchParams.dateRange = date
    },
    delConfirm (row) {
      this.$Modal.confirm({
        title: '删除确认',
        content: `确认删除快讯内容为 <strong style="color:red">${row.flashContent}</strong> 的快讯吗，删除后将不可恢复，请谨慎操作！`,
        onOk: () => {
          api.delFlashNew(row.id).then(res => {
            this.getData()
            this.$Message.success(res.message)
          })
        }
      })
    },
    downConfirm (row) {
      this.$Modal.confirm({
        title: '下架确认',
        content: `确认下架快讯内容为 <strong style="color:#ff9900">${row.flashContent}</strong> 的快讯吗，下架后将不可再上线，请谨慎操作！`,
        onOk: () => {
          api.downFlashNew(row.id).then(res => {
            this.getData()
            this.$Message.success(res.message)
          })
        }
      })
    },
    gotoEditFlashNews (id) {
      this.$router.push({ name: 'quickInformation:edit', params: { id: id } })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
