<style lang="less">
.c-tree {
  width: 400px;
}
.areaentry{
  .areaentry-tree{
    height: 600px;
    overflow: scroll;
  }

}
</style>

<template>
    <div class="areaentry">
      <div>
      <div class="mb-20">
        <Button
          type="primary"
          icon="md-git-pull-request"
           v-check-promission="elements.dictionary.areaManager.createTopCate"
          @click="showCreateCategoryModal(true)"
        >添加一级类目</Button>
      </div>
      <div class="clearfix">
        <div class="c-tree fl mr-30 areaentry-tree">
          <Card>
            <Tree
              :data="categoryTreeData"
              @on-select-change="showNodeInfo"
            ></Tree>
          </Card>
        </div>
        <!-- 表格的部分 -->
        <div class="fl">
          <Alert v-if="!selectedNodeData">要修改类目，请从左侧选择一个类目</Alert>
          <div v-if="selectedNodeData">
            <div class="mb-20">
              <Button
                type="success"
                icon="md-git-merge"
                @click="showCreateCategoryModal(false)"
                v-check-promission="elements.dictionary.areaManager.createSubCate"
              >添加{{selectedNodeData.title}}的子类目</Button>
            </div>
            <Card>
              <Form
                :model="selectedNodeData"
                :label-width="80"
              >
                <FormItem
                  label="类目名称"
                  prop="name"
                >
                  <Input
                    placeholder="请输入类目名称"
                    v-model="selectedNodeData.title"
                    style="width:300px;"
                  ></Input>
                </FormItem>
                <FormItem
                  label="别名"
                  prop="matchName"
                >
                  <Input
                    placeholder="请输入别名，多个英文逗号隔开"
                    v-model="selectedNodeData.matchName"
                    style="width:300px;"
                  ></Input>
                </FormItem>
                <FormItem
                  label="编码"
                  prop="description"
                >
                  <Input
                    disabled
                    placeholder="请输入描述"
                    v-model="selectedNodeData.code"
                    style="width:300px;"
                    :rows="4"
                  ></Input>
                </FormItem>
              </Form>
              <Button
                type="primary"
                icon="ios-paper-plane"
                class="mr-20"
                @click="editAreaDate"
                v-check-promission="elements.dictionary.areaManager.edit"
              >更新</Button>
              <Button
                type="error"
                icon="md-trash"
                @click="deleteAreaDate"
                v-check-promission="elements.dictionary.areaManager.del"
              >删除</Button>
            </Card>
          </div>
        </div>
      </div>

    </div>

    <!--新增一级类目-->
    <Modal
      v-model="modals.area.isShow"
      :loading="modals.area.loading"
      title="新增类目"
      @on-ok="postCategory"
      width="500"
    >
      <Form
        ref="areaForm"
        :model="modals.area.data"
        :rules="rules"
        :label-width="80"
      >
        <FormItem
          label="类目名称"
          prop="name"
        >
          <Input
            placeholder="请输入类目名称"
            v-model="modals.area.data.name"
            style="width:300px;margin-right:10px;"
          ></Input>
           <text-count
              :target-str="modals.area.data.name"
              :max="10"
            />
        </FormItem>
        <FormItem
          label="别名"
          prop="matchName"
        >
          <Input
            placeholder="请输入别名，多个英文逗号隔开"
            v-model="modals.area.data.matchName"
            style="width:300px;margin-right:10px;"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    </div>
</template>
<script>
import api from '@/api/data'
import textCount from '_c/text-count/text-count'
import elements from '@/config/elements'
export default {
  name: 'area-manager',
  components: {
    textCount
  },
  data () {
    return {
      categoryTreeData: [],
      selectedNodeData: null,
      modals: {
        area: {
          isShow: false,
          loading: true,
          isTop: true,
          data: { // 节点信息
            pid: 0,
            name: '',
            description: '',
            code: 0,
            matchName: ''
          },
          rules: {
            name: {
              required: true,
              min: 1,
              max: 10
            }
          }
        }
      },
      rules: {
        name: [{ required: true, message: '名称为必填项', trigger: 'blur' }, { max: 10, message: '名称最多10个字', trigger: 'blur' }]
      },
      elements: elements
    }
  },
  methods: {
    getCategoryTree () {
      const that = this
      api.getAreaData({expand: true}).then(res => {
        let data = JSON.stringify(res.data)
        // console.log(JSON.parse(data.replace(/name/g,"title")));
        this.categoryTreeData = JSON.parse(data.replace(/name/g, 'title'))
      })
    },
    postCategoryLoading () {
      this.modals.area.loading = true
      this.$Message.success('done')
      this.getCategoryTree()
      setTimeout(() => {
        this.modals.area.loading = false
        this.modals.area.isShow = false
      }, 1000)
    },
    postCategory () {
      this.$refs['areaForm'].validate(valid => {
        if (!valid) {
          return false
        }
        if (this.modals.area.isTop) {
          api.addTopAreaData({'name': this.modals.area.data.name, 'matchName': this.modals.area.data.matchName}).then(() => {
            this.postCategoryLoading()
          })
        } else {
          api.addSonAreaData({'name': this.modals.area.data.name, 'parentId': this.modals.area.data.id, 'matchName': this.modals.area.data.matchName}).then(res => {
            this.postCategoryLoading()
          })
        }
      })
    },
    handleResetModalForm (name) {
      this.$refs[name].resetFields()
    },
    showCreateCategoryModal (isTop) {
      this.handleResetModalForm('areaForm')
      this.modals.area.isTop = isTop
      this.modals.area.isShow = true
    },
    showNodeInfo (data) {
      this.modals.area.data.code = data[0].id
      this.modals.area.data.id = data[0].id
      this.selectedNodeData = data[0]
    },
    editAreaDate () {
      api.updateAreaData({'name': this.selectedNodeData.title, 'id': this.modals.area.data.id, 'matchName': this.selectedNodeData.matchName}).then((res) => {
        if (res.code == 1000) {
          this.postCategoryLoading()
          this.selectedNodeData = null
          this.getCategoryTree()
        }
      })
    },
    deleteAreaDate () {
      api.deleteAreaData({'id': this.modals.area.data.id}).then((res) => {
        if (res.code == 1000) {
          this.postCategoryLoading()
          this.selectedNodeData = null
          this.getCategoryTree()
        }
      })
    }
  },
  mounted () {
    console.log(elements.dictionary)

    this.getCategoryTree()
  }
}
</script>
