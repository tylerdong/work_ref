<template>
  <div class="shortVideo">
    <Card shadow>
    <p slot="title">短视频审核</p>
    <div class="mb-20 clearfix">
      更新时间:
      <DatePicker :value="[search.startTime,search.endTime]"
                  format="yyyy-MM-dd"
                  transfer=transfer
                  type="daterange"
                  placement="bottom-end"
                  placeholder="请选择更新时间"
                  @on-change="handleDateChange"
                  class="length-18rem m-r-10"></DatePicker>
      状态:
      <Select v-model="search.status" placeholder="请选择状态" transfer=transfer clearable style="width:150px;">
        <Option v-for="(item, index) in option.status" :value="item.value" :key="index">{{ item.label }}</Option>
      </Select>
      来源:
      <Select v-model="search.showSource" placeholder="请选择来源" transfer=transfer clearable style="width:150px;">
        <Option v-for="(item,index) in option.source" :value="`${item.source}+${item.accessMethod}`" :source="item.source" :accessMethod="item.accessMethod" :key="index">{{ item.showSource }}</Option>
      </Select>
      标题搜索：
      <Input type="text" v-model="search.title" style="width:150px;margin-right:10px;"></Input>
      <Button @click="searchData" :loading="loading.search" class="getData-btn" type="primary" style="margin-right:10px;">搜索</Button>
      <!-- <Button @click="addVideo" :loading="loading.search" class="getData-btn" type="primary">添加短视频</Button> -->
    </div>
    <Table :data="table.data" :columns="table.columns" @on-selection-change="selectChange" class="table-bottom-20"></Table>
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
    <Modal
      v-model="modalshow"
      :title="modalTitle"
      :loading="loading.search"
      :mask-closable="false"
      @on-ok="asyncOK"
      scrollable
      width="660"
      @on-visible-change="stopPlay"
    >
      <Form
        :model="form"
        label-position="left"
        :label-width="100"
        :rules="rules"
        ref="productForm"
      >
        <FormItem label="标题:" prop="title">
          <Input
            v-model="form.title"
            style="width:450px;margin-right:10px;"
            disabled
          ></Input>
        </FormItem>
        <FormItem label="来源:" prop="showSource">
          <Input v-model="form.showSource" style="width:450px;margin-right:10px;" disabled></Input>
        </FormItem>

        <FormItem label="经纬度信息：" prop="productClassId">
          <Input v-model="form.lng" style="width:50px;margin-right:10px;" disabled></Input>
          <Input v-model="form.lat" style="width:50px;margin-right:10px;" disabled></Input>
        </FormItem>
        <FormItem label="短视频标签:" prop="matchName">
          <Tag v-for="(item,index) in form.labels" type='border' :key="index" :name="item" :checked="checked" color="primary">{{item}}</Tag>
        </FormItem>
        <FormItem label="视频作者:" prop="auth">
          <Select v-model="form.auth"  style="width:200px" v-if="form.showSource!='平台自产'">
              <Option v-for="(item,index) in authorList" :value="item.id"  :key="index">{{item.name}}</Option>
          </Select>
          <Input v-model="form.showAuth" style="width:200px;margin-right:10px;" disabled v-if="form.showSource=='平台自产'"></Input>
        </FormItem>
        <FormItem label="视频播放:" >
          <!-- <div id="qiuniu" style="width:400px;height:300px;"></div> -->
          {{form.status=='UPLOAD_PENDING'?"视频待上传":''}}
          <video ref="videoPlayer" style="width:180px;height:320px;" :src="url" controls v-if="form.status!='UPLOAD_PENDING'"></video>
        </FormItem>
        <FormItem label="审核备注:" prop="remark">
          <Input v-model="form.remark" type="textarea" :autosize="{minRows: 1,maxRows: 3}" style="width:450px;margin-right:10px;"></Input>
        </FormItem>
        <FormItem :label="modalTitle=='视频详情'?'状态:':'审核状态'" prop="status" >
          <Select v-model="form.status" style="width:200px" v-if="modalTitle!='视频详情'">
              <Option v-for="item in auditList" :value="item.value" :key="item.name">{{ item.name }}</Option>
          </Select>
          <Input v-model="form.showStatus" style="width:450px;margin-right:10px;" v-if="modalTitle=='视频详情'" disabled></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import _ from 'lodash'
import textCount from '_c/text-count/text-count'
import {getshortList, getVideoSourceList, auditVideo, unloadVideo, getUserList, getTestAuth} from '@/api/shortVideo'
import dateFns from 'date-fns'
import QPlayer from '@/libs/qiuniu'
import {source, configurations} from '@/config/option'
import elements from '@/config/elements'
export default {
  data () {
    return {
      elements,
      proType: {},
      modalTitle: '',
      modalshow: false,
      productType: {item: []},
      auditId: '',
      search: {startTime: '', endTime: '', status: '', showSource: '', title: ''},
      auditList: [{name: '一审通过', value: 'FIRST_AUDIT_FINISH'}, {name: '二审通过', value: 'SECOND_AUDIT_FINISH'}, {name: '审核不通过', value: 'AUDIT_FAILED'}],
      selected: [],
      authorList: [ {id: 5339, name: 'CallMe'}],
      rules: {auth:[{ required: true, message: '为必填项', trigger: 'blur' }]},
      form: {},
      TagList: [1, 2, 3, 4],
      checked: false,
      page: { total: 0, current: 1, pageSize: 20, pageSizes: [20, 30, 40, 50] },
      option: { status: [{label: '待审核', value: 'CHECK_PENDING'}, {label: '一审完成', value: 'TO_BE_EDITED'}, {label: '二审完成', value: 'SECOND_AUDIT_FINISH'}, {label: '审核不通过', value: 'AUDIT_FAILED'}, {label: '已发布', value: 'PUBLISHED'}], source: '' },
      loading: { search: false, batchTrash: false, confirm: false },
      table: {
        data: [],
        columns: [{ title: '序号', width: 100, key: 'id', align: 'center' },
          { title: '短视频标题', minWidth: 200, key: 'title', align: 'center' },
          { title: '视频来源', width: 120, key: 'showSource', align: 'center'},
          { title: '视频作者名', width: 100, key: 'showAuth', align: 'center'},
          { title: '视频状态', width: 100, key: 'showStatus', align: 'center'},
          { title: '更新时间',
            width: 200,
            key: 'gmtModified',
            align: 'center',
            render: (h, params) => {
              return h('div',
                dateFns.format(params.row.gmtModified, 'YYYY-MM-DD HH:mm')
              )
            }},
          { title: '创建人', width: 100, key: 'creator', align: 'center' },
          { title: '操作',
            width: 150,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              let status = params.row.status
              const audit = h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modalshow = true
                    this.form = JSON.parse(JSON.stringify(params.row))
                    getTestAuth().then(res => {
                      if (res.code == 1000) this.url = params.row.videoUrl + '?' + res.data
                    })
                    this.modalTitle = '审核视频'
                    this.auditId = params.row.id

                    if (params.row.status == 'CHECK_PENDING') {
                      this.auditList = [{name: '一审通过', value: 'FIRST_AUDIT_FINISH'}, {name: '二审通过', value: 'SECOND_AUDIT_FINISH'}, {name: '审核不通过', value: 'AUDIT_FAILED'}]
                    } else {
                      this.auditList = [{name: '二审通过', value: 'SECOND_AUDIT_FINISH'}, {name: '审核不通过', value: 'AUDIT_FAILED'}]
                    }
                  }
                }
              }, '审核')
              const unload = h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }
              }, [h('Poptip', {
                props: {
                  confirm: true,
                  transfer: true,
                  placement: 'left-end',
                  title: '确定是否下架？',
                  type: 'error',
                  size: 'small',
                  width: '200'
                },
                on: { 'on-ok': () => {
                  unloadVideo({id: params.row.id}).then(res => {
                    if (res.code == 1000) {
                      this.$Message.success('done')
                      this.getData()
                    }
                  })
                } }
              }, '下架')])
              const release = h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    auditVideo({id: params.row.id, status: 'SECOND_AUDIT_FINISH', remark: params.row.remark}).then(res => {
                      if (res.code == 1000) {
                        this.getData()
                      }
                    })
                  }
                }
              }, '再次发布')
              const detail = h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log('详情', params.row.status)
                    getTestAuth().then(res => {
                      if (res.code == 1000) this.url = params.row.videoUrl + '?' + res.data
                    })
                    this.modalshow = true
                    this.form = JSON.parse(JSON.stringify(params.row))
                    this.modalTitle = '视频详情'
                  }
                }

              }, '详情')

              if ((status == 'CHECK_PENDING' || status == 'FIRST_AUDIT_FINISH') && this.hasPromission(elements.shortVideo.audit)) {
                return h('div', [
                  audit
                ])
              } else if (status == 'AUDIT_FAILED') {
                return h('div', [
                  detail
                ])
              } else if (status == 'PUBLISHED') {
                if (this.hasPromission(elements.shortVideo.down)) {
                  return h('div', [ detail, unload ])
                } else {
                  return h('div', [ detail ])
                }
              } else if (status == 'PUBLISHED_FAILED') {
                if (this.hasPromission(elements.shortVideo.release)) {
                  return h('div', [
                    detail, release
                  ])
                } else {
                  return h('div', [
                    detail
                  ])
                }
              } else {
                return h('div', [
                  detail
                ])
              }
            }
          }
        ]
      },
      url: ''
    }
  },
  methods: {
    searchData () {
      this.page.current = 1
      this.getData()
    },
    stopPlay (data) {
      if (data === false) {
        this.$refs['videoPlayer'].pause()
      }
    },
    handleDateChange(dataArr){
      this.search.startTime=dataArr[0];
      this.search.endTime=dataArr[1];
    },
    getData () {
      let source = ''
      let accessMethod = ''
      if (this.search.showSource) {
        source = this.search.showSource.split('+')[0]
        accessMethod = this.search.showSource.split('+')[1]
      } else {
        source = ''
        accessMethod = ''
      }
      getshortList({pageIndex: this.page.current,
        pageCount: this.page.pageSize,
        status: this.search.status || '',
        source: source,
        title: '',
        accessMethod: accessMethod,
        startTime: this.search.startTime || '',
        endTime: this.search.endTime || ''}).then(res => {
        if (res.code == 1000) {
          this.table.data = res.data.list
          this.page.total = res.data.count
        }
      })
    },
    addVideo () {
      this.modalshow = true
    },
    asyncOK () {
      if (this.modalTitle = '审核视频') {
        auditVideo({id: this.auditId, status: this.form.status, remark: this.form.remark || '', auth: this.form.auth}).then(res => {
          if (res.code == 1000) {
            this.getData()
          }
        })
      }
    },
    selectChange (val) {
      this.selected = val
    },
    pageChange (index) {
      this.page.current = index
      this.getData()
    },
    pageSizeChange (size) {
      this.page.pageSize = size
      this.getData()
    }
  },
  mounted () {
    // const player = new QPlayer({
    //   url: 'http://192.168.36.113/group1/M00/00/01/wKgkcVxuRDOAUPkeAEJN9LiG50E846.mp4',
    //   container: document.getElementById("qiuniu"),
    // });
  },
  created () {
    Promise.all([getVideoSourceList(), this.getData(), getUserList()]).then(res => {
      this.option.source = [...res[0].data]
      let arr = []
      res[2].data.map((v, i) => {
        v.id = '' + v.id
        arr.push(v)
      })
      this.authorList = arr
    })
  }
}
</script>
<style lang="less">
  .shortVideo{

  }
</style>
