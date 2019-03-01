<!--
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-01 09:37:58
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-12 13:20:54
 * @Description: file content
 -->
<template>
  <div class="tasklist">
    <div class="mb-20 clearfix">
      任务状态：
      <Select v-model="search.status" class="length-16-6rem m-r-10 " style="width:120px;" clearable>
        <Option v-for="item in nameList" :value="item" :key="item">{{ item }}</Option>
      </Select>
      <Button @click="getTableDate" class="getData-btn " icon="ios-search" type="primary" style="margin-left:10px;">搜索</Button>

      <Button @click="addTask" class="getData-btn " type="success" v-check-promission="elements.config.task.btnCreate" style="margin-left:10px;float:right;">增加任务</Button>
    </div>
    <Table :data="table.data" :columns="table.columns" class="table-bottom-20"></Table>
    <Modal
      v-model="model"
      title="新增"
      width="660"
      :loading="loading"
      @on-ok="submitForm"
      class-name="vertical-center-modal">
      <Form
        :model="Form"
        label-position="left"
        :label-width="120"
        ref="Form"
        :rules="rules"
      >
        <FormItem label="任务调度表达式:" prop="cronExpression">
          <Input v-model="Form.cronExpression" clearable style="width:450px;margin-right:10px;"></Input>
          <!-- <Input v-model="itemForm.productClassName" style="width:450px;margin-right:10px;"></Input> -->
        </FormItem>
        <FormItem label="任务描述：" prop="description">
          <Input v-model="Form.description" style="width:450px;margin-right:10px;"></Input>
        </FormItem>
        <FormItem label="任务code：" prop="jobName">
          <Input v-model="Form.jobName" style="width:450px;margin-right:10px;"></Input>
        </FormItem>
        <FormItem label="方法路径：" prop="methodPath">
          <Input v-model="Form.methodPath" style="width:450px;margin-right:10px;"></Input>
        </FormItem>
        <FormItem label="服务名称：" prop="serverName">
          <Input v-model="Form.serverName" style="width:450px;margin-right:10px;"></Input>
        </FormItem>
        <!-- <div slot="footer">
          <Button type="text" size="large" @click="model=false">取消</Button>
          <Button type="primary" size="large" @click="submitForm">确定</Button>
        </div> -->
      </Form>
    </Modal>
    <Modal
    v-model="model2"
      title="修改"
      width="660"
      @on-ok="submitForm2"
      class-name="vertical-center-modal">
      <Form
      :model="ItemInfo"
      label-position="left"
      :label-width="120"
      ref="Form">
        <FormItem label="任务描述：" prop="description">
          <Input v-model="ItemInfo.description" style="width:450px;margin-right:10px;"></Input>
        </FormItem>
        <FormItem label="任务调度表达式" prop="cron">
          <Input v-model="ItemInfo.cron" style="width:450px;margin-right:10px;"></Input>
        </FormItem>
      </Form>
    </Modal>
    <logModel :id="taskId" @on-close="closeModel" :showModal="model3"></logModel>
  </div>
</template>
<script>
import logModel from './logModel.vue'
import {checkElementPermission} from '@/libs/resources'
import elements from '@/config/elements'
import { getAllJob,getRunningJob,addJob,deleteJob,pauseJob,resumeJob,updateJobCron,execute } from '@/api/taskManager'
import { getTime } from '@/libs/tools'
export default {
  components: {
    'logModel': require('./logModel').default
  },
  data () {
    return {
      search: { status: '计划中的' },
      table: {
        data: [],
        columns: [
          { title: '序号', width: 80, key: 'id', align: 'center' },
          { title: '任务code', width: 200, key: 'jobName', align: 'left', render: (h, params) => h('a', { on: { click: () => this.showDetail(params.row.id) } }, params.row.jobName) },
          { title: '创建者', width: 80, key: 'creator', align: 'center' },
          { title: '任务状态',
            minWidth: 120,
            key: 'jobStatus',
            align: 'center',
            render: (h, params) => {
              if (params.row.jobStatus == 'START') {
                return h('Tag',
                  {
                    props: {
                      color: 'green'
                    }
                  }, params.row.jobStatus)
              } else {
                return h('Tag',
                  {
                    props: {
                      color: 'orange'
                    }
                  }, params.row.jobStatus)
              }
            }},
          { title: '方法路径', width: 150, key: 'methodPath', align: 'center' },
          { title: '修改人', width: 100, key: 'modifier', align: 'center' },
          { title: '服务', width: 120, key: 'serverName', align: 'center' },
          { title: '任务描述', width: 120, key: 'description', align: 'center' },
          { title: '任务调度表达式', width: 150, key: 'cronExpression', align: 'center' },
          { title: '创建时间',
            width: 150,
            key: 'gmtCreate',
            align: 'center',
            render: (h, params) => {
              return h('div',
                getTime(new Date(params.row.gmtModified), 'second')
              )
            } },
          { title: '更新时间',
            width: 150,
            key: 'gmtModified',
            align: 'center',
            render: (h, params) => {
              return h('div',
                getTime(new Date(params.row.gmtModified), 'second')
              )
            }},
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 250,
            align: 'center',
            render: (h, params) => {
              const btnPause = h('Button', {
                        props: {
                            size: 'small',
                        },
                        style: {
                          marginTop:'5px',
                          marginRight: '5px'
                        },
                        on: {
                            click: () => {
                              pauseJob({id:params.row.id}).then(res=>{
                                  this.getTableDate()
                              })
                            }
                        }
                    }, '暂停')
                const btnDel  = h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                          marginTop:'5px',
                          marginRight: '5px'
                        },
                    }, [h('Poptip', {
                      props: {
                        confirm: true,
                        transfer: true,
                        placement: 'left-end',
                        title: '确定是否删除？',
                        type: 'error',
                        size: 'small',
                        width: '200'
                      },
                      on: { 'on-ok': () => {
                                deleteJob({id:params.row.id}).then(res=>{
                                  this.getTableDate();
                                })
                              } }
                    }, '删除')])
                const btnEdit = h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginTop:'5px',
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                              this.model2=true;
                              this.ItemInfo={
                                id:params.row.id,
                                cron:params.row.cronExpression,
                                description:params.row.description
                              }
                            }
                        }
                    }, '修改')
                const btnExecuted = h('Button', {
                        props: {
                            type: 'success',
                            size: 'small'
                        },
                        style: {
                            marginTop:'5px'
                        },
                        on: {
                            click: () => {
                              execute({id:params.row.id}).then(res=>{
                                this.getTableDate();
                              })
                            }
                        }
                    }, '立即执行')
                const btnStart = h('Button', {
                        props: {
                            type: 'success',
                            size: 'small'
                        },
                        style: {
                            marginTop: '5px',
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                              resumeJob({id:params.row.id}).then(res=>{
                                this.getTableDate();
                              })
                            }
                        }
                    }, '恢复')

              if(params.row.jobStatus=="START"){
                let btns = []
                if (checkElementPermission(elements.config.task.btnPause)) btns.push(btnPause)
                if (checkElementPermission(elements.config.task.btnDel)) btns.push(btnDel)
                if (checkElementPermission(elements.config.task.btnEdit)) btns.push(btnEdit)
                if (checkElementPermission(elements.config.task.btnExecuted)) btns.push(btnExecuted)
                return h('div', btns)
              }else{
                let btns = []
                if (checkElementPermission(elements.config.task.btnStart)) btns.push(btnStart)
                if (checkElementPermission(elements.config.task.btnDel)) btns.push(btnDel)
                if (checkElementPermission(elements.config.task.btnEdit)) btns.push(btnEdit)
                if (checkElementPermission(elements.config.task.btnExecuted)) btns.push(btnExecuted)
                return h('div', btns)
              }
            }
          }
        ]
      },
      nameList: ['计划中的', '正在运行'],
      model: false,
      Form: {},
      rules: {
        cronExpression: [ { required: true, message: '调度表达式为必填项', trigger: 'blur' }],
        description: [ { required: true, message: '描述为必填项', trigger: 'blur' }],
        jobName: [ { required: true, message: '任务code为必填项', trigger: 'blur' }],
        methodPath: [ { required: true, message: '路径为必填项', trigger: 'blur' }],
        serverName: [ { required: true, message: '服务为必填项', trigger: 'blur' }]
      },
      loading: true,
      ItemInfo: {},
      model2: false,
      model3: false,
      taskId: '',
      elements: elements
    }
  },
  methods: {
    getTableDate () {
      if (this.search.status == '计划中的') {
        getAllJob().then(res => {
          this.table.data = res.data
        })
      } else {
        getRunningJob().then(res => {
          this.table.data = res.data
        })
      }
    },
    addTask () {
      this.model = true
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    submitForm () {
      let that = this
      this.$refs['Form'].validate(valid => {
        if (!valid) {
          return this.changeLoading()
        } else {
          addJob(this.Form).then(res => {
            this.model = false
            this.getTableDate()
          })
        }
      })
    },
    submitForm2 () {
      updateJobCron(this.ItemInfo).then(res => {
        this.getTableDate()
      })
    },
    closeModel () {
      this.model3 = false
    },
    showDetail (id) {
      this.model3 = true
      this.taskId = id
    }
  },
  created(){
    this.getTableDate();
  }
}
</script>
<style lang="less">

</style>
