<template>
  <div>
    <Card shadow>
    <p slot="title">产品管理</p>
    <MainTable
      :tableData="tableData"
      :searchParams="searchParams"
      :totalRecords="totalRecords"
      :columns="columns"
      @date-change="dataChange"
      @change-page="changePage"
      @change-page-size="changePageSize"
      @switch-model="switchModel"
      @delete-item="deleteItem"
      @on-delete="deleteItem"
      @search="getListData"
      @page-size-change="pageSizeChange"
      ></MainTable>
    <Modal
      v-model="modalshow"
      title="Title"
      :loading="loading"
      @on-ok="asyncOK"
      width="660"
    >
      <Form
        :model="form"
        label-position="left"
        :label-width="100"
        :rules="selectedNode.rules"
        ref="productForm"
      >
        <FormItem label="产品规格：" prop="spec">
          <Input
            v-model="form.spec"
            style="width:450px;margin-right:10px;"
          ></Input>
          <text-count
            :target-str="form.spec"
            :max="10"
          />
        </FormItem>
        <FormItem label="产品别名:" prop="matchName">
          <Input v-model="form.matchName" style="width:450px;margin-right:10px;"></Input>
          <text-count
            :target-str="form.matchName"
            :max="10"
          />
        </FormItem>

        <FormItem label="所属类目：" prop="productClassId">
          <Input v-model="form.productClassId" style="display:none;"></Input>
          <Card>
            <Tree
              :data="tree"
              @on-select-change="showNodeInfo"
              @on-check-change="showNodeInfo"
              show-checkbox
            ></Tree>
          </Card>
        </FormItem>
      </Form>
    </Modal>
  </Card>
  </div>
</template>
<script>
import textCount from '_c/text-count/text-count'
import MainTable from '_c/common/maintable.vue'
import {getProductData, addProductData, editProductData, deleteProductData, editGetTreeData, getCategoryTree} from '@/api/data'
import { getTime } from '@/libs/tools'
import elements from '@/config/elements'
export default {
  name: 'product-manager',
  components: {
    MainTable,
    textCount
  },
  data () {
    return {
      fieldListForSearch: [{
        value: 'a',
        label: '产品名'
      }, {
        value: 'b',
        label: '所属类目'
      }, {
        value: 'c',
        label: '产品编码'
      }, {
        value: 'd',
        label: '产品规格'
      }, {
        value: 'e',
        label: '创建人'
      }, {
        value: 'f',
        label: '添加时间'
      }],
      searchParams: {
        spec: '',
        pageIndex: 1,
        pageCount: 10,
        startTime: '',
        endTime: ''
      },
      totalRecords: 0,
      columns: [
        { title: '序号', width: 80, key: 'id', align: 'center' },
        { title: '产品规格', width: 150, key: 'spec', align: 'center' },
        { title: '规格别名', width: 150, key: 'matchName', align: 'center' },
        { title: '所属品名', minWidth: 250, key: 'gategoryNameList', align: 'center' },
        { title: '产品编码', width: 150, key: 'code', align: 'center' },
        { title: '创建人', width: 100, key: 'creator', align: 'center' },
        { title: '添加时间', width: 200, key: 'gmtCreate', align: 'center' },
        { title: '操作',
          fixed: 'right',
          width: 150,
          key: 'h',
          align: 'center',
          render: (h, params) => {
            const btnDel = h('Poptip', {
              props: {
                confirm: true,
                transfer: true,
                placement: 'left-end',
                title: '确定要删除吗！',
                type: 'error',
                size: 'small',
                width: '200'

              },
              on: {
                'on-ok': () => {
                  this.deleteItem(params.row.id)
                },
                'on-cancel': function () {
                  // this.$Message.info('点击了取消')
                }
              }
            }, [h('Button', {props: {type: 'error', size: 'small'}}, '删除')])

            const btnEdit = h('Button', {
              style: {
                float: 'left',
                marginRight: '10px'
              },
              props: {type: 'primary', size: 'small'},
              on: {
                click: () => {
                  this.modalshow = true
                  this.isedit = true
                  let rowdata = this.getItemDate(params.index)
                  // let productId = params.row.id;
                  editGetTreeData(params.row.productClassId).then(res => {
                    this.tree = res.data
                    this.treenode = {'getNode': 1}
                    let data = res.data
                    // while(this.getChildren(data)){
                    //     data = this.getChildren(data);
                    // }
                  })

                  this.form = {...rowdata}
                  this.isedit = true
                }
              }
            }, '修改')

            const btns = []

            if (this.hasPromission(elements.dictionary.productManager.edit)) {
              btns.push(btnEdit)
            }

            if (this.hasPromission(elements.dictionary.productManager.del)) {
              btns.push(btnDel)
            }
            return h('div', { class: 'action-group' }, btns)
          }}

      ],
      tableData: [],
      tree: [],
      form: {
        id: '',
        name: '',
        matchName: '',
        productClassId: '',
        spec: ''
      },
      modalshow: false,
      loading: true,
      isedit: false,
      treenode: '',
      selectedNode: {
        data: null,
        rules: {
          spec: [{ required: true, message: '名称为必填项', trigger: 'blur' }, { max: 10, message: '名称最多10个字', trigger: 'blur' }],
          matchName: [{ max: 10, message: '最多为10个字', trigger: 'blur' }],
          productClassId: [{ required: true, message: '名称为必填项', trigger: 'blur' }]
        }
      }
    }
  },
  methods: {
    // 获取筛选条件的数据
    getListData (searchParams) {
      if (searchParams) this.searchParams = searchParams
      getProductData(this.searchParams).then(res => {
        this.tableData = res.data.list
        this.tableData.map((v, i) => {
          v.gmtCreate = getTime(v.gmtCreate)
          v.gategoryNameList = v.gategoryNameList.reverse().toString()
          return v
        })
        this.totalRecords = res.data.count
      })
    },
    // 日期改变
    dataChange (dataArr) {
      this.searchParams.startTime = dataArr[0]
      this.searchParams.endTime = dataArr[1]
    },
    // 页数获取页面的数据
    changePage (pageIndex) {
      this.searchParams.pageIndex = pageIndex
      // getProductData(this.searchParams).then(res => {
      //   this.tableData = res.data.list
      //   this.totalRecords = res.data.page.total
      // })
      this.getListData(this.searchParams)
    },
    pageSizeChange (size) {
      this.searchParams.pageIndex = 1
      this.searchParams.pageCount = size
      this.getListData(this.searchParams)
    },
    // 异步提交
    asyncOK () {
      this.$refs['productForm'].validate(valid => {
        if (!valid) {
          // return this.postCategoryLoading()
          this.loading = false
        }
        if (this.treenode.children || this.treenode.getNode !== 1) {
          this.$Message.error('error')
        } else {
          if (this.isedit) {
            // 修改的接口
            editProductData(this.form).then(res => {
              this.postCategoryLoading()
              this.modalshow = false
            })
          } else {
            // 添加的接口
            addProductData(this.form).then(res => {
              this.postCategoryLoading()
              this.modalshow = false
            })
          }
        }
      })
    },
    // 开关model(添加)
    switchModel () {
      this.form = {}
      getCategoryTree().then(res => {
        this.tree = res.data
      })
      this.isedit = false
      this.modalshow = true
    },
    changePageSize (pageCount) {
      this.searchParams.pageIndex = 1
      this.searchParams.pageCount = pageCount
      this.getListData(this.searchParams)
    },
    // 获取修改的当前列的数据
    getItemDate (index) {
      return {
        'id': this.tableData[index].id,
        'name': this.tableData[index].name,
        'matchName': this.tableData[index].matchName,
        'productClassId': this.tableData[index].productClassId,
        'spec': this.tableData[index].spec
      }
    },
    deleteItem (id) {
      deleteProductData(id).then(res => {
        this.postCategoryLoading()
      })
    },
    // 获取节点数据
    showNodeInfo (p) {
      if (p.length == 1) {
        this.treenode = p[0]
        this.treenode.getNode = 1
        this.form.productClassId = p[0].id
        this.treenode.getNode = p.length
      } else {
        this.treenode.getNode = p.length
      }
    },
    // 操作后的展示
    postCategoryLoading () {
      this.loading = true
      this.$Message.success('done')
      this.getListData()
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  },
  mounted () {
    this.getListData()
  }
}
</script>
