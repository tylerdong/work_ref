<template>
  <div>
      <div class="mb-20 clearfix">更新时间：
        <DatePicker
          :value="[search.startTime,search.endTime]"
          format="yyyy-MM-dd"
          transfer="transfer"
          type="daterange"
          placement="bottom-end"
          placeholder="选择时间区间"
          @on-change="handleDateChange"
          style="margin-top:10px;"
          class="length-16-6rem m-r-10 mt-10"
        ></DatePicker>审核状态：
        <Select v-model="search.status" class="m-r-10" style="width:100px;"  v-if="statusList.length" clearable>
          <Option v-for="item in statusList" :value="item.status" :key="item.status">{{ item.showStatus }}</Option>
        </Select>来源类型：
        <Select
          v-model="search.source"
          class="length-16-6rem m-r-10"
          style="width:100px;"
          clearable
        >
          <Option v-for="item in sourceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>主题搜索：
        <Input type="text" v-model="search.jobVacancy" style="width:220px;margin-right:10px;"></Input>
        <Button @click="handlerSearch" class="getData-btn" type="primary" :loading="loading">搜索</Button>
      </div>
    <Table
      :loading="loading"
      ref="selection"
      :data="table.data"
      :columns="table.columns"
      class="table-bottom-20"
    ></Table>
    <Page
      class="page-bottom-1"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
      :total="page.total"
      :current="page.current"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      show-sizer
      show-total
    />

    <Modal v-model="modals.audit.isShow" width="800" :loading="modals.audit.loading" :title="modals.audit.title" @on-ok="postAudit">
      <Form
        class="n-table"
        ref="auditForm"
        :model="modals.audit.postData"
        :rules="modals.audit.rules"
        :label-width="120"
      >
        <FormItem label="ID">{{modals.audit.data.id}}</FormItem>
        <FormItem label="视频标题">{{modals.audit.data.detailTitle}}</FormItem>
        <FormItem label="视频更近进度">第{{modals.audit.data.videoCurrentNum}}集</FormItem>
        <FormItem label="视频提供者名称">{{modals.audit.data.author}}</FormItem>
        <FormItem label="视频"><video style="width:200px;height:358px;" :src="modals.audit.data.videoFdfsUrl" controls></video></FormItem>
        <FormItem v-if="modals.audit.data.remark" label="审核备注">{{modals.audit.data.remark}}</FormItem>
        <FormItem prop="examineComment" v-if="modals.audit.type==='audit'" label="审核备注" style="margin-bottom: 20px;">
          <Input v-model="modals.audit.postData.examineComment" type="textarea" style="width:500px" placeholder="备注"/>
        </FormItem>
        <FormItem prop="status" v-if="modals.audit.type==='audit'" label="审核结果">
          <Select v-model="modals.audit.postData.status" style="width:200px" filterable>
            <Option
              v-for="item in auditList[modals.audit.data.status]"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {
  getPreVideoDetailList,
  getVideoStatusList,
  getVideoDetail,
  downSubVideo,
  auditVideoDetailInfo
} from '@/api/longVideo'
import elements from '@/config/elements'
import dateFns from 'date-fns'
export default {
  name: 'video-tab',
  data () {
    return {
      search: {
        startTime: '',
        endTime: '',
        status: '',
        pageIndex: 1,
        pageCount: 10
      },
      loading: true,
      modals: {
        audit: {
          type: 'audit',
          isShow: false,
          loading: true,
          title: '审核',
          data: {},
          rules: {
            jobAddrArea: [{ required: true, message: '为必填项', trigger: 'blur' }],
            status: [{ required: true, message: '为必填项', trigger: 'blur' }]
          },
          postData: {
            id: null,
            examineComment: '',
            status: 'AUDIT_FAILED'
          }
        }
      },
      cities: [],
      statusList: [],
      sourceList: [{'label': '个人', 'value': '个人'}, {'label': '公司', 'value': '公司'}],
      auditList: {
        CHECK_PENDING: [
          { label: '一审通过', value: 'FIRST_AUDIT_FINISH' },
          { label: '审核不通过', value: 'AUDIT_FAILED' }
        ],
        FIRST_AUDIT_FINISH: [
          { label: '二审通过', value: 'SECOND_AUDIT_FINISH' },
          { label: '审核不通过', value: 'AUDIT_FAILED' }
        ]
      },
      table: {
        data: [],
        columns: [
          { title: '序号', width: 100, key: 'id', align: 'center' },
          {
            title: '视频主题',
            minWidth: 200,
            key: 'themeTitle',
            align: 'center'
          },
          { title: '来源类型',
            minWidth: 200,
            align: 'center',
            key: 'authorType'
          },
          { title: '子视频标题',
            minWidth: 200,
            align: 'center',
            key: 'detailTitle'
          },
          {
            title: '更新时间',
            minWidth: 200,
            align: 'center',
            render: (h, { row }) =>
              h('span', dateFns.format(row.gmtModified, 'YYYY-MM-DD HH:mm:ss'))
          },
          {
            title: '审核状态',
            width: 100,
            key: 'dateUnit',
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                this.statusList.map((v, i) => {
                  if (v.status === params.row.status) {
                    return v.showStatus
                  }
                })
              )
            }
          },
          {
            title: '审核人',
            width: 100,
            key: 'checkPerson',
            align: 'center'
          },
          // {
          //   title: '是否推荐',
          //   width: 100,
          //   key: 'is_recommend',
          //   align: 'center',
          //   render: (h, { row }) => {
          //     if (row.isRecommend === 'Y') {
          //       return h('Tag', {porps: {
          //         color: 'warning'
          //       }}, '是')
          //     } else {
          //       return h('Tag', {porps: {
          //         color: 'default'
          //       }}, '否')
          //     }
          //   }

          // },
          {
            title: '操作',
            width: 150,
            key: 'status',
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              const btnAudit = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showAuditModal(params.row.id)
                    }
                  }
                },
                '审核'
              )

              const btnDetail = h(
                'Button',
                {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showDetailModal(params.row.id)
                    }
                  }
                },
                '详情'
              )

              const btnDown = h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.confirmDown(params.row)
                    }
                  }
                },
                '下架'
              )

              // 未审核
              if (params.row.status === 'CHECK_PENDING') {
                return h('div', [btnAudit])
              }
              // 一审通过
              if (params.row.status === 'FIRST_AUDIT_FINISH') {
                return h('div', [btnAudit])
              }
              // 二审通过
              if (params.row.status === 'SECOND_AUDIT_FINISH') {
                return h('div', [btnDetail])
              }
              // 审核不通过
              if (params.row.status === 'AUDIT_FAILED') {
                return h('div', [btnAudit])
              }
              // 已发布
              if (params.row.status === 'PUBLISHED') {
                return h('div', [btnDown, btnDetail])
              }
              // 发布失败
              if (params.row.status === 'PUBLISHED_FAILED') {
                return h('div', [btnDetail])
              }
              // 已下架
              if (params.row.status === 'LOWER_SHELF') {
                return h('div', [btnDetail])
              }
            }
          }
        ]
      },
      page: { total: 0, current: 1, pageSize: 10, pageSizes: [10, 20, 30, 40, 50] },
      elements: elements
    }
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
      this.search.pageCount = size
      this.getData()
    },
    handleDateChange (dataArr) {
      this.search.startTime = dataArr[0]
      this.search.endTime = dataArr[1]
    },
    getData () {
      let params = { ...this.search }
      if (params.startTime.length !== 0) {
        params.startTime = params.startTime + ' 00:00:00'
      }
      if (params.endTime.length !== 0) {
        params.endTime = params.endTime + ' 23:59:59'
      }
      getPreVideoDetailList(params).then(res => {
        this.loading = false
        this.table.data = res.data.list
        this.page.total = res.data.count
        this.page.current = res.data.pageIndex
      })
    },
    // 显示审核弹窗
    showAuditModal (id) {
      this.$refs['auditForm'].resetFields()
      this.modals.audit.isShow = true
      this.modals.audit.type = 'audit'
      this.modals.audit.title = '审核'
      this.modals.audit.postData = {
        id: null,
        status: 'AUDIT_FAILED',
        examineComment: ''
      }
      getVideoDetail({ id: id }).then(res => {
        if (res.code === 1000) {
          const data = JSON.parse(JSON.stringify(res.data))
          this.modals.audit.data = data
          this.modals.audit.postData.examineComment = data.examineComment
        }
      })
    },
    // 显示详情弹窗
    showDetailModal (id) {
      this.modals.audit.isShow = true
      this.modals.audit.type = 'detail'
      this.modals.audit.title = '查看'
      getVideoDetail({ id: id }).then(res => {
        if (res.code === 1000) {
          this.modals.audit.data = JSON.parse(JSON.stringify(res.data))
        }
      })
    },
    // 下架确认
    confirmDown (row) {
      this.$Modal.confirm({
        title: '下架确认',
        content: `确认下架ID为 ${row.id} 的视频吗?`,
        onOk: () => {
          downSubVideo({id: row.id}).then(res => {
            if (res.code === 1000) {
              this.$Message.success(res.message)
              this.getData()
            } else {
              this.$Message.error(res.message)
            }
          })
        }
      })
    },
    // 保存
    postAudit () {
      if (this.modals.audit.type === 'audit') {
        this.$refs['auditForm'].validate(valid => {
          if (!valid) {
            this.modals.audit.loading = false
            this.$nextTick(() => {
              this.modals.audit.loading = true
            })
            return false
          }
          this.modals.audit.postData.id = this.modals.audit.data.id
          auditVideoDetailInfo(this.modals.audit.postData).then(res => {
            if (res.code === 1000) {
              this.$Message.success(res.message)
              this.getData()
              this.modals.audit.loading = false
              this.modals.audit.isShow = false
              this.$nextTick(() => {
                this.modals.audit.loading = true
              })
            } else {
              this.$Message.error(res.message)
            }
          })
        })
      } else {
        this.modals.audit.isShow = false
      }
    }
  },
  mounted () {
    Promise.all([
      getVideoStatusList()
      // getRecruitmentStatusList()
    ]).then(res => {
      // this.sourceList = res[0].data
      this.statusList = res[0].data
      // this.cities = res[2].data
      this.getData()
    })
  }
}
</script>
