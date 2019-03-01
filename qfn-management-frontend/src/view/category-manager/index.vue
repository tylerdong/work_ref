<style lang="less">
.c-tree {
  width: 400px;
}
</style>

<template>
  <Card
    shadow
    style="min-width:1000px"
  >
    <p slot="title">品名管理</p>
    <div>
      <div class="mb-20">
        <Button
          type="primary"
          icon="md-git-pull-request"
          @click="showCreateCategoryModal(true)"
          v-check-promission="elements.dictionary.categoryManager.createTopCate"
        >添加一级类目</Button>
      </div>
      <div class="clearfix">
        <div class="c-tree fl mr-30">
          <Card>
            <Tree
              :data="categoryTreeData"
              @on-select-change="showNodeInfo"
            ></Tree>
          </Card>
        </div>

        <div class="fl">
          <Alert v-if="!selectedNode.data">要修改类目，请从左侧选择一个类目</Alert>
          <div v-if="selectedNode.data">
            <div class="mb-20">
              <Button
                type="success"
                icon="md-git-merge"
                @click="showCreateCategoryModal(false)"
                v-check-promission="elements.dictionary.categoryManager.createSubCate"
              >添加子类目</Button>
            </div>
            <Card>
              <Form
                :model="selectedNode.data"
                :rules="selectedNode.rules"
                :label-width="80"
                ref="selectNodeForm"
              >
                <FormItem
                  label="类目名称"
                  prop="title"
                >
                  <Input
                    placeholder="请输入类目名称"
                    v-model="selectedNode.data.title"
                    style="width:300px;margin-right:10px;"
                  ></Input>
                  <text-count
                    :target-str="selectedNode.data.title"
                    :max="10"
                  />
                </FormItem>
                <FormItem
                  label="类目别名"
                  prop="matchName"
                >
                  <Input
                    placeholder="请输入类目别名"
                    v-model="selectedNode.data.matchName"
                    style="width:300px;margin-right:10px;"
                    type="textarea"
                    :rows="4"
                  ></Input>
                  <text-count
                    :target-str="selectedNode.data.matchName"
                    :max="255"
                  />
                </FormItem>
                <FormItem
                  label="描述"
                  prop="description"
                >
                  <Input
                    placeholder="请输入描述"
                    v-model="selectedNode.data.description"
                    style="width:300px;margin-right:10px;"
                    type="textarea"
                    :rows="4"
                  ></Input>
                  <text-count
                    :target-str="selectedNode.data.description"
                    :max="255"
                  />
                </FormItem>
                <FormItem
                  label="编码"
                  prop="code"
                >
                  <Input
                    disabled
                    placeholder="请输入类目名称"
                    v-model="selectedNode.data.code"
                    style="width:300px;margin-right:10px;"
                  ></Input>
                  <text-count
                    :target-str="selectedNode.data.code"
                    :max="10"
                  />
                </FormItem>
              </Form>
              <Button
                type="primary"
                icon="ios-paper-plane"
                class="mr-20"
                @click="updateCategory"
                v-check-promission="elements.dictionary.categoryManager.edit"
              >更新</Button>
              <Button
                type="error"
                icon="md-trash"
                @click="delCategory"
                v-check-promission="elements.dictionary.categoryManager.del"
              >删除</Button>
            </Card>
          </div>
        </div>
      </div>

    </div>

    <!--新增一级类目-->
    <Modal
      v-model="modals.category.isShow"
      :loading="modals.category.loading"
      title="新增类目"
      @on-ok="postCategory"
    >
      <Form
        ref="categoryForm"
        :model="modals.category.data"
        :rules="modals.category.rules"
        :label-width="80"
      >
        <FormItem
          label="类目名称"
          prop="name"
        >
          <Input
            placeholder="请输入类目名称"
            v-model="modals.category.data.name"
            style="width:300px;margin-right:10px;"
          ></Input>
          <text-count
            :target-str="modals.category.data.name"
            :max="10"
          />
        </FormItem>
        <FormItem
          label="类目别名"
          prop="matchName"
        >
          <Input
            placeholder="请输入类目别名, 请用逗号隔开"
            v-model="modals.category.data.matchName"
            type="textarea"
            :rows="4"
            style="width:300px;margin-right:10px;"
          ></Input>
          <text-count
            :target-str="modals.category.data.matchName"
            :max="255"
          />
        </FormItem>
        <FormItem
          label="描述"
          prop="description"
        >
          <Input
            placeholder="请输入描述"
            v-model="modals.category.data.description"
            style="width:300px;margin-right:10px;"
            type="textarea"
            :rows="4"
          ></Input>
          <text-count
            :target-str="modals.category.data.description"
            :max="255"
          />
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>
<script>
import api from '@/api/data'
import textCount from '_c/text-count/text-count'
import elements from '@/config/elements'
export default {
  name: 'category-manager',
  components: {
    textCount
  },
  data () {
    return {
      categoryTreeData: [],
      selectedNode: {
        data: null,
        rules: {
          title: [{ required: true, message: '名称为必填项', trigger: 'blur' }, { max: 10, message: '名称最多10个字', trigger: 'blur' }],
          matchName: [{ max: 255, message: '最多为255个字', trigger: 'blur' }],
          description: [{ max: 255, message: '最多为255个字', trigger: 'blur' }]
        }
      },
      modals: {
        category: {
          isShow: false,
          loading: true,
          isTop: true,
          data: {
            parentId: 0,
            name: '',
            description: '',
            matchName: ''
          },
          rules: {
            name: [{ required: true, message: '名称为必填项', trigger: 'blur' }, { max: 10, message: '名称最多10个字', trigger: 'blur' }],
            matchName: [{ max: 255, message: '最多为255个字', trigger: 'blur' }],
            description: [{ max: 255, message: '最多为255个字', trigger: 'blur' }]
          }
        }
      },
      elements: elements
    }
  },
  methods: {
    // 获取菜单树数据
    getCategoryTree () {
      const that = this
      api.getCategoryTree().then(res => {
        this.categoryTreeData = [...res.data]
        this.selectedNode.data = null
      })
    },
    getCodeForCreateCategory () {},
    postCategoryLoading () {
      this.modals.category.loading = false
      this.$nextTick(() => {
        this.modals.category.loading = true
      })
    },
    // 提交类目数据
    postCategory () {
      const that = this
      this.$refs['categoryForm'].validate(valid => {
        if (!valid) {
          return this.postCategoryLoading()
        }
        this.$Modal.remove()
        api.postCategoryTree(this.modals.category.data).then(res => {
          this.modals.category.isShow = false
          this.postCategoryLoading()
          this.getCategoryTree()
          this.$Message.success(res.message)
        }).catch(err => {
          this.$Message.error(res.message)
        })
      })
    },
    // 重置表单样式
    handleResetModalForm (name) {
      setTimeout(() => {
        this.$refs[name].resetFields()
      }, 10)
    },
    // 显示新增表单弹窗
    showCreateCategoryModal (isTop) {
      this.handleResetModalForm('categoryForm')
      this.modals.category.data.parentId = 0
      this.modals.category.data.code = this.categoryTreeData[this.categoryTreeData.length - 1]['code']

      if (!isTop) {
        this.modals.category.data.parentId = this.selectedNode.data.id
        this.modals.category.data.code = this.selectedNode.data.children ? this.selectedNode.data.children[this.selectedNode.data.children.length - 1]['code'] : this.selectedNode.data.code + '00'
      }
      this.modals.category.isTop = isTop
      this.modals.category.isShow = true
    },
    // 选中节点获取节点信息
    showNodeInfo (data) {
      this.selectedNode.data = JSON.parse(JSON.stringify(data[0]))
      if (this.$refs['selectNodeForm']) {
        this.$refs['selectNodeForm'].resetFields()
      }
    },
    // 删除类目
    delCategory () {
      this.$Modal.confirm({
        title: '删除确认',
        content: `确认删除类目为 <strong style="color:red">${this.selectedNode.data.title}</strong> 的类目吗，删除后将不可恢复，请谨慎操作！`,
        onOk: () => {
          api.delCategoryTree(this.selectedNode.data.id, {code: this.selectedNode.data.code}).then(res => {
            this.getCategoryTree()
            this.$Message.success(res.message)
          })
        }
      })
    },
    // 更新类目
    updateCategory () {
      let nodeData = JSON.parse(JSON.stringify(this.selectedNode.data))
      nodeData.name = nodeData.title
      api.updateCategoryTree(nodeData.id, nodeData).then(res => {
        this.getCategoryTree()
        this.$Message.success(res.message)
      })
    }
  },
  mounted () {
    this.getCategoryTree()
  }
}
</script>
