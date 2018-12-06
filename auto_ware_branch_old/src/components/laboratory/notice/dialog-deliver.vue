<!-- 发布消息 -->
<template>
  <dialog-side width="700px" title="发布消息" :visible.sync="dialog.visible">
    <el-form
      class="form"
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-suffix="："
      label-width="95px">

      <el-form-item
        label="主题"
        prop="theme">
        <el-input
          v-model="form.theme"></el-input>
      </el-form-item>

      <el-form-item
        label="内容"
        prop="content">
        <div id="editorElem" ref="refEditor" class="w-editorElem" style="text-align:left"></div>
      </el-form-item>

      <el-form-item
        label="接收人"
        prop="userIds">
        <div>
          <el-button type="primary" size="small" @click="btnSelectPersonnel">选择</el-button>
        </div>

        <el-tag
          class="margin-right-5"
          v-for="item in form.selectPersonnelList"
          :key="item.id"
          :closable="true"
          type="primary"
          @close="handleRemovePersonel(item)">
          {{item.name}}
        </el-tag>
      </el-form-item>

      <el-form-item
        label="发布人" prop="userName">
        <el-input
          :disabled="true"
          placeholder="请输入发布人"
          v-model="form.userName"></el-input>
      </el-form-item>

      <el-form-item
        label="发布时间">
        <el-date-picker
          :disabled="true"
          format="yyyy-MM-dd HH:mm"
          v-model="form.time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <div class="footer">
        <el-button type="primary" @click="save('form')" :loading="loading.save">发布</el-button>
      </div>
    </el-form>

    <!-- 人员选择表格 -->
    <dialog-table-select-person ref="refDialogTableSelectPerson"
                                @callback-select-data="callbackSelectData">
    </dialog-table-select-person>
  </dialog-side>
</template>
<script>
  import * as api from '../../../api'
  import storage from '../../../module/storage'
  import {editorFun} from '../../../module/editorMenus'
  //  stomp
  import {eventHub} from '../../../module/eventHub'
  export default {
    name: 'editor',
    components: {
      'dialog-side': require('../../common/dialog-side.vue'),
      'dialog-table-select-person': require('../../common/dialog-table-select-person.vue')
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.editor = editorFun('#editorElem')
    },
    data () {
      return {
        editor: '',
        dialog: {
          visible: false
        },
        loading: {
          save: false
        },
        userInfo: '',
        tags: [],
        form: {
          theme: '',
          content: '',
          userIds: [],
          userId: '',
          userName: '',
          time: '',
          selectOrganizationList: [],
          selectPersonnelList: []
        },
        rules: {
          theme: [
            {required: true, message: '请输入主题', trigger: 'blur change'}
          ],
//          content: [
//            {required: true, message: '请输入内容', trigger: 'blur change'}
//          ],
          receiveIds: [
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (this.form.selectOrganizationList.length + this.form.selectPersonnelList.length !== 0) {
                  callback()
                } else {
                  callback(new Error('请选择接收人'))
                }
              }
            }
          ]
        }
      }
    },
    computed: {},
    methods: {
      show () {
        this.$refs.form.resetFields()
        this.editor.txt.clear()// 清空编辑器内容
        this.form.userId = this.userInfo.userId
        this.form.userName = this.userInfo.name
        this.form.selectPersonnelList = []
        this.form.time = new Date()
        this.dialog.visible = true
      },

      /* 打开 选择人员组件 */
      btnSelectPersonnel () {
        this.$refs.refDialogTableSelectPerson.open(this.form.selectPersonnelList)
      },
      /* 返回 选择数据 */
      callbackSelectData (selectPersonnelList) {
        this.form.selectPersonnelList = selectPersonnelList
        this.$refs.form.validateField('userName')
      },

      /* 删除 选中的人员 */
      handleRemovePersonel (data) {
        this.form.selectPersonnelList = this.form.selectPersonnelList.filter(item => {
          return item.id !== data.id
        })
      },
      save (form) {
        this.form.content = this.editor.txt.html()
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loading.save = true
            let selectPersonnelList = this.form.selectPersonnelList.map(item => {
              return item.id
            })
            api.laboratory.notice.senderMessage({
              theme: this.form.theme,
              content: this.form.content,
              personIds: selectPersonnelList,
              userId: this.userInfo.userId,
              time: Date.parse(new Date())
            }).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialog.visible = false
//                this.startSocketService(selectPersonnelList, this.form.content)
                eventHub.$emit('callback-message')
              }
            }).finally(() => {
              this.loading.save = false
            })
          } else {
            return false
          }
        })
      }
      /* 推送订阅服务 */
//      startSocketService (selectPersonnelList, content) {
//        console.log('已经推送')
//        stomp.send('/sendMessage', {}, JSON.stringify({'userId': selectPersonnelList, 'message': ''}))
//      }
    }
  }
</script>
<style lang="scss" scoped="">
  .form {
    margin: auto;
    .el-tag {
      margin-right: 5px;
    }
  }

  .footer {
    margin-left: 95px;
    button {
      width: 120px;
      height: 40px;
      font-size: 16px;
    }
  }
</style>
