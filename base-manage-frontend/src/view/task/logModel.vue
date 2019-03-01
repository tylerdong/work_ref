<template>
  <div class="log-model">
    <Modal
      v-model="childrenshow"
      title="任务调度情况"
      width="1200"
      @on-visible-change="watchClose"
      class-name="vertical-center-modal"
    >执行结果:
      <Select
        v-model="flag"
        class="length-16-6rem m-r-10"
        style="width:120px; margin-bottom:10px;"
        clearable
        @on-change="changeStatus"
      >
        <Option v-for="item in nameList" :value="item.key" :key="item.value">{{ item.value }}</Option>
      </Select>
      <Table :data="table.data" :columns="table.columns" class="table-bottom-20"></Table>
      <Page
        class="page-bottom-1"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :total="page.total"
        :current="page.current"
        :page-size="page.pageSize"
        :page-size-opts="page.pageSizes"
        show-sizer
        show-elevator
        :id="pageId"
        show-total
      />
      <div style="float: right;margin: -30px 350px 0 0;line-height: 24px;">
        <Button type="primary" size="small" @click="goElevatorPage">跳转</Button>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import { getTime } from '@/libs/tools'
import { getLogByJobId } from '@/api/taskManager'
export default {
  data () {
    return {
      pageId: 'targetPage',
      flag: '',
      nameList: [
        {
          key: 'SUCCESS',
          value: '成功'
        },
        {
          key: 'FAIL',
          value: '失败'
        }
      ],
      page: { total: 0, current: 1, pageSize: 10, pageSizes: [10, 20, 30, 40] },
      table: {
        data: [],
        columns: [
          { title: '序号', width: 80, key: 'id', align: 'center' },
          {
            title: '开始时间',
            width: 160,
            key: 'stime',
            align: 'center',
            render: (h, params) => {
              return h('div', getTime(new Date(params.row.stime), 'second'))
            }
          },
          {
            title: '结束时间',
            width: 160,
            key: 'etime',
            align: 'center',
            render: (h, params) => {
              return h('div', getTime(new Date(params.row.etime), 'second'))
            }
          },
          {
            title: '执行结果',
            width: 100,
            key: 'flag',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.flag == 'SUCCESS' ? '成功' : '失败')
            }
          },
          { title: '返回信息', minWidth: 150, key: 'message', align: 'center' },
          {
            title: '任务状态',
            width: 180,
            key: 'state',
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                params.row.state == 'RUNNING' ? '进行中' : '结束'
              )
            }
          },
          {
            title: '执行方式',
            width: 120,
            key: 'execute_mode',
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                params.row.executeMode == '0' ? '系统调度' : '手动触发'
              )
            }
          }
        ]
      },
      itemID: '',
      search: { pageCount: 10, pageIndex: 1 }
    }
  },
  props: {
    id: {},
    showModal: {
      type: Boolean
    }
  },
  methods: {
    changeStatus (v) {
      this.flag = v
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
    watchClose (p) {
      if (p) {
        this.itemID = this.id
        this.pageChange(1)
      }
    },
    getData () {
      this.search.id = this.itemID
      this.search.flag = this.flag
      getLogByJobId(this.search).then(res => {
        this.table.data = res.data.list
        this.page.total = res.data.count
        this.page.current = res.data.pageIndex
      })
    },
    // 点击跳转到输入的页码
    goElevatorPage () {
      var evtObj
      var thisPage = document.getElementById(this.pageId)
      var elevatorDiv = thisPage.getElementsByClassName(
        'ivu-page-options-elevator'
      )
      if (elevatorDiv && elevatorDiv.length > 0) {
        var pageInput = elevatorDiv[0].getElementsByTagName('input')[0]
        if (window.KeyEvent) {
          // firefox 浏览器下模拟事件
          evtObj = document.createEvent('KeyEvents')
          evtObj.initKeyEvent(
            'keyup',
            true,
            true,
            window,
            true,
            false,
            false,
            false,
            13,
            0
          )
        } else {
          // chrome 浏览器下模拟事件
          evtObj = document.createEvent('UIEvents')
          evtObj.initUIEvent('keyup', true, true, window, 1)
          delete evtObj.keyCode
          if (typeof evtObj.keyCode === 'undefined') {
            // 为了模拟keycode
            Object.defineProperty(evtObj, 'keyCode', { value: 13 })
          } else {
            evtObj.key = String.fromCharCode(13)
          }
        }
        pageInput.dispatchEvent(evtObj)
      }
    }
  },
  computed: {
    childrenshow: {
      get: function () {
        return this.showModal
      },
      set: function (newValue) {
        this.$emit('on-close', newValue)
      }
    }
  },
  created () {}
}
</script>
<style lang="less">
.log-model {
}
</style>
