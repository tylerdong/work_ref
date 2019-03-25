<template>
  <div class="addInformation">
    <Card shadow>
      <p slot="title">招聘信息审核</p>
      <div class="mb-20 clearfix">
        更新时间：
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
        ></DatePicker>招聘信息状态：
        <Select v-model="search.status" class="m-r-10" style="width:100px;" clearable>
          <Option v-for="item in statusList" :value="item.key" :key="item.key">{{ item.content }}</Option>
        </Select>信息来源：
        <Select
          v-model="search.source"
          class="length-16-6rem m-r-10"
          style="width:100px;"
          clearable
        >
          <Option v-for="item in sourceList" :value="item.value" :key="item.value">{{ item.key }}</Option>
        </Select>岗位名称搜索：
        <Input type="text" v-model="search.jobVacancy" style="width:220px;margin-right:10px;"></Input>
        <Button
          @click="handlerSearch"
          class="getData-btn"
          type="primary"
          :loading="loading.search"
        >搜索</Button>
      </div>
      <Table ref="selection" :data="table.data" :columns="table.columns" class="table-bottom-20"></Table>
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
    </Card>

    <Modal
      v-model="modals.audit.isShow"
      class="audit-box"
      width="800"
      :fullscreen="true"
      :loading="modals.audit.loading"
      :title="modals.audit.title"
      @on-ok="postAudit"
    >
      <Form
        class="n-table"
        ref="auditForm"
        :model="modals.audit.postData"
        :rules="modals.audit.rules"
        :label-width="120"
      >
        <ul class="form-list no-bottom-li clearfix">
          <li class="col-2"><FormItem label="ID">{{modals.audit.data.id}}</FormItem></li>
          <li class="col-2"><FormItem label="招聘岗位名称">{{modals.audit.data.jobVacancy}}</FormItem></li>
          <li class="col-2"><FormItem label="公司名称">{{modals.audit.data.facturer}}</FormItem></li>
          <li class="col-2"><FormItem label="公司简介">{{modals.audit.data.companyProfile}}</FormItem></li>
          <li class="col-2"><FormItem label="工资范围">{{modals.audit.data.salary}}</FormItem></li>
          <li class="col-2"><FormItem label="招聘联系电话">{{modals.audit.data.facturerTel}}</FormItem></li>
          <li class="col-2"><FormItem label="学历要求">{{modals.audit.data.education}}</FormItem></li>
          <li class="col-2"><FormItem label="经验要求">{{modals.audit.data.workExperience}}</FormItem></li>
          <li class="col-2"><FormItem label="福利待遇">{{modals.audit.data.welfare}}</FormItem></li>
          <li class="col-2"><FormItem label="招聘数量">{{modals.audit.data.recruitsPeople}}</FormItem></li>
          <li class="col-2"><FormItem label="职位类型">{{modals.audit.data.jobType}}</FormItem></li>
          <li class="col-2"><FormItem label="发布时间">{{modals.audit.data.publishDate}}</FormItem></li>
          <li class="col-2"><FormItem label="有效日期">{{modals.audit.data.effectiveDate}}</FormItem></li>
          <li class="col-2"><FormItem label="工作地址经纬度">{{modals.audit.data.jobAddrMap}}</FormItem></li>
          <li class="col-2"><FormItem
            v-if="modals.audit.data.auditRemark"
            label="审核备注"
          >{{modals.audit.data.auditRemark}}</FormItem></li>
        </ul>
        <FormItem label="描述">
            <div v-html="modals.audit.data.responsibilities"></div>
          </FormItem>
        <FormItem label="是否急聘">
          <Checkbox
            v-if="modals.audit.type==='audit'"
            v-model="modals.audit.postData.demandType"
            true-value="Y"
            false-value="N"
          ></Checkbox>
          <span v-else>{{modals.audit.data.demandType | booleanValue}}</span>
        </FormItem>
        <FormItem class="mb-10" prop="facturer" label="企业名称">

              <Select
                v-model="modals.audit.postData.manufacturerId"
                filterable
                remote
                :label-in-value="true"
                :remote-method="getManufacturing"
                class="length-22rem mr-20"
                @on-change="manufacturerChange"
                :loading="loading.facturer"
              >
                <Option
                  v-for="(item, index) in option.facturer"
                  :value="item.value"
                  :key="index"
                >{{item.label}}</Option>
              </Select>
              <span v-if="modals.audit.type==='audit'">{{modals.audit.data.sourceFacturer}}</span>

        </FormItem>
        <FormItem class="mb-10" prop="jobAddrArea" label="工作地点">
          <Row>
            <Col span="16">{{modals.audit.postData.jobAddrArea}}</Col>
            <Col span="8">
              <span v-if="modals.audit.type==='audit'">{{modals.audit.data.jobAddrArea}}</span>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="mb-10" label="工作具体地址" prop="jobAddr">
          <Input v-model="modals.audit.postData.jobAddr" class="length-22rem"/>
        </FormItem>
        <FormItem class="mb-10" label="月薪范围" prop="exceptedSalary">
          <Select v-model="modals.audit.postData.exceptedSalary" clearable class="length-22rem mr-20">
            <Option
              v-for="(item, index) in option.salary"
              :value="item.showexceptSlaryName"
              :key="index"
            >{{item.exceptSlaryName}}</Option>
          </Select> <span>{{modals.audit.data.salary}}</span>
        </FormItem>
        <FormItem
          class="mb-10"
          prop="auditRemark"
          v-if="modals.audit.type==='audit'"
          label="审核备注"
          style="margin-bottom: 20px;"
        >
          <Input v-model="modals.audit.postData.auditRemark" type="textarea" placeholder="备注"/>
        </FormItem>
        <FormItem class="mb-10" prop="status" v-if="modals.audit.type==='audit'" label="审核结果">
          <Select v-model="modals.audit.postData.status" class="length-22rem" filterable>
            <Option
              v-for="item in auditList[modals.audit.data.status]"
              :value="item.value"
              :key="item.value"
            >
              {{item.label }}
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {
  getRecruitmentList,
  getRecruitmentSourceList,
  getRecruitmentStatusList,
  getRecruitmentById,
  postPreRecruitment,
  postDownRecruitment,
  getMatchManufacturerByName,
  getExceptSlaryList,
  getManufacturerById
} from '@/api/training'
import elements from '@/config/elements'
import dateFns from 'date-fns'

export default {
  data () {
    return {
      search: {
        startTime: '',
        endTime: '',
        status: '',
        pageIndex: 1,
        pageCount: 10
      },
      loading: { search: false, facturer: false },
      option: { facturer: [], salary: [] },
      modals: {
        audit: {
          type: 'audit',
          isShow: false,
          loading: true,
          title: '审核',
          data: {},
          rules: {
            jobAddr: [
              { required: true, message: '具体地址为必填项', trigger: 'blur' }
            ],
            exceptedSalary: [
              { required: true, message: '月薪范围为必填项', trigger: 'blur' }
            ],
            status: [
              { required: true, message: '状态为必填项', trigger: 'blur' }
            ],
            auditRemark: [
              { required: true, message: '备注为必填项', trigger: 'blur' }
            ]
          },
          postData: {
            id: null,
            status: '',
            auditRemark: '',
            manufacturerId: '',
            jobAddrArea: '',
            jobAddrAreaCode: '',
            jobAddr: '',
            exceptedSalary: '',
            demandType: 'N'
          }
        }
      },
      cities: [],
      statusList: [],
      sourceList: [],
      auditList: {
        '1': [
          { value: '3', label: '一审通过' },
          { value: '4', label: '二审通过' },
          { value: '5', label: '审核不通过' }
        ],
        '3': [
          { value: '4', label: '二审通过' },
          { value: '5', label: '审核不通过' }
        ]
      },
      table: {
        data: [],
        columns: [
          { title: '序号', width: 100, key: 'id', align: 'center' },
          {
            title: '岗位名称',
            minWidth: 200,
            key: 'jobType',
            align: 'center'
          },
          {
            title: '信息来源',
            minWidth: 200,
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                this.sourceList.map((v, i) => {
                  if (v.value === params.row.source) {
                    return v.key
                  }
                })
              )
            }
          },
          { title: '创建人', minWidth: 200, key: 'creator', align: 'center' },
          {
            title: '更新时间',
            minWidth: 200,
            align: 'center',
            render: (h, { row }) =>
              h('span', dateFns.format(row.gmtModified, 'YYYY-MM-DD HH:mm:ss'))
          },
          {
            title: '信息状态',
            width: 100,
            key: 'dateUnit',
            align: 'center',
            render: (h, params) => {
              return h(
                'div',
                this.statusList.map((v, i) => {
                  if (v.key === params.row.status) {
                    return v.content
                  }
                })
              )
            }
          },
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
              if (
                params.row.status === '1' &&
                this.hasPromission(elements.trainingManage.recruitment.audit)
              ) {
                return h('div', [btnAudit])
              }
              // 一审通过
              if (
                params.row.status === '3' &&
                this.hasPromission(elements.trainingManage.recruitment.audit)
              ) {
                return h('div', [btnAudit])
              }
              // 二审通过
              if (params.row.status === '4') {
                return h('div', [btnDetail])
              }
              // 已下架 审核不通过
              if (params.row.status === '7' || params.row.status === '5') {
                return h('div', [btnDetail])
              }
              // 已上架
              if (params.row.status === '6') {
                if (
                  this.hasPromission(elements.trainingManage.recruitment.down)
                ) {
                  return h('div', [btnDown, btnDetail])
                } else {
                  return h('div', [btnDetail])
                }
              }
            }
          }
        ]
      },
      page: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50]
      },
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
    getManufacturing (query) {
      if (query !== '') {
        this.loading.facturer = true
        getMatchManufacturerByName({ matchName: query })
          .then(res => {
            const list = res.data.map(i => {
              return { value: i.manufacturerId, label: i.matchName }
            })
            this.option.facturer = list.filter(
              item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            )
          })
          .finally(() => {
            this.loading.facturer = false
          })
      } else {
        this.option.facturer = []
      }
    },
    manufacturerChange (val) {
      this.modals.audit.postData.jobAddrArea = ''
      this.modals.audit.postData.jobAddrAreaCode = ''
      getManufacturerById({ manufacturerId: val.value }).then(res => {
        let data = res.data
        this.modals.audit.postData.jobAddrArea = data.jobAddrArea
        this.modals.audit.postData.jobAddrAreaCode = data.jobAddrAreaCode
      })
    },
    getData () {
      this.loading.search = true
      let params = { ...this.search }
      getRecruitmentList(params)
        .then(res => {
          this.table.data = res.data.list
          this.page.total = res.data.count
          this.page.current = res.data.pageIndex
        })
        .finally(() => {
          this.loading.search = false
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
        status: '',
        auditRemark: '',
        manufacturerId: '',
        jobAddrArea: '',
        jobAddrAreaCode: '',
        jobAddr: '',
        exceptedSalary: '',
        demandType: 'N'
      }
      getRecruitmentById({ id: id }).then(res => {
        if (res.code === 1000) {
          const data = JSON.parse(JSON.stringify(res.data))
          this.modals.audit.data = data
          this.modals.audit.data.sourceFacturer = data.facturer
          this.modals.audit.postData.jobAddrArea = data.jobAddrArea
          this.modals.audit.postData.auditRemark = data.auditRemark
          this.modals.audit.postData.demandType = data.demandType
          this.modals.audit.postData.jobAddr = data.jobAddr
        }
      })
    },
    // 显示详情弹窗
    showDetailModal (id) {
      this.modals.audit.isShow = true
      this.modals.audit.type = 'detail'
      this.modals.audit.title = '查看'
      getRecruitmentById({ id: id }).then(res => {
        if (res.code === 1000) {
          this.modals.audit.data = JSON.parse(JSON.stringify(res.data))
        }
      })
    },
    // 下架确认
    confirmDown (row) {
      this.$Modal.confirm({
        title: '下架确认',
        content: `确认下架ID为 ${row.id} 的招聘吗`,
        onOk: () => {
          postDownRecruitment({ id: row.id }).then(res => {
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
          console.log(this.modals.audit.data)
          this.modals.audit.postData.id = this.modals.audit.data.id
          postPreRecruitment(this.modals.audit.postData).then(res => {
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
      getRecruitmentSourceList(),
      getRecruitmentStatusList(),
      getExceptSlaryList()
    ]).then(res => {
      this.sourceList = res[0].data
      this.statusList = res[1].data
      this.option.salary = res[2].data
      this.getData()
    })
  }
}
</script>
<style lang="less">
.n-table {
  .ivu-form-item {
    margin-bottom: 0;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
}
.audit-box {
}
.ivu-form-item-content {
  img {
    max-width: 100%;
  }
}
.form-list {
  .col-2 {
    list-style: none;
    width: 400px;
    float: left;
    margin-bottom: 20px;
  }
  .col-100 {
    list-style: none;
    width: 100%;
    margin-bottom: 20px;
  }
}
.no-bottom-li {
  .col-2 {
    margin-bottom: 0;
  }
}
ul {
  li {
    list-style: none;
  }
}
</style>
