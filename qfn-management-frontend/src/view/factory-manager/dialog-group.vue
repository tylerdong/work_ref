<template>
  <Modal v-model="modal.show" :title="modal.title" :draggable="true">
    <Form ref="form" :model="form" :rules="rules" :label-width="90">
      <FormItem v-if="form.code" label="编码" prop="code">
        <Input placeholder="请输入编码" v-model="form.code" disabled/>
      </FormItem>
      <FormItem label="集团名" prop="name">
        <Input placeholder="请输入类目名称" v-model="form.name" clearable/>
      </FormItem>
      <FormItem label="集团电话" prop="tel">
        <Input placeholder="请输入集团电话" v-model="form.tel" clearable/>
      </FormItem>
      <FormItem label="集团网址" prop="url">
        <Input placeholder="请输入集团网址" v-model="form.url" clearable/>
      </FormItem>
      <FormItem label="是否上市" prop="isListed">
        <RadioGroup v-model="form.isListed">
          <Radio label="N">未上市</Radio>
          <Radio label="Y">已上市</Radio>
        </RadioGroup>
      </FormItem>
      <template v-if="form.isListed === 'Y'">
        <FormItem label="上市名" prop="listName">
          <Input placeholder="请输入上市名" v-model="form.listName" clearable/>
        </FormItem>
        <FormItem label="股票代码" prop="stockCode">
          <Input placeholder="请输入股票代码" v-model="form.stockCode" clearable/>
        </FormItem>
      </template>
      <FormItem label="备注" prop="remark">
        <Input placeholder="请输入备注" v-model="form.remark" type="textarea" clearable/>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modal.show=false">取消</Button>
      <Button type="primary" size="large" @click="btnConfirm" :loading="loading.confirm">确定</Button>
    </div>
  </Modal>
</template>

<script>
import regExp from './../../components/common/regExp'
import {addManufactureGroup, updateManufactureGroup} from './../../api/data'
export default {
  data () {
    return {
      modal: {show: false, title: '新增'},
      loading: {confirm: false},
      form: {id: '', code: '', name: '', tel: '', url: '', isListed: 'N', listName: '', stockCode: '', remark: ''},
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'blur change'},
          {
            required: true,
            trigger: 'blur change',
            validator: (rule, value, callback) => {
              if (regExp.name.test(value)) {
                callback()
              } else {
                callback(new Error('名称必须2至20位字符'))
              }
            }
          }
        ],
        code: [
          {required: true, message: '请输入编码', trigger: 'blur change'},
          {
            required: true,
            trigger: 'blur change',
            validator: (rule, value, callback) => {
              if (regExp.code.test(value)) {
                callback()
              } else {
                callback(new Error('编码必须2至10位数字或字母'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    show (data) {
      this.modal.show = true
      this.$refs.form.resetFields()
      this.modal.title = data ? '编辑' : '新增'
      this.form.code = ''
      if (data) {
        this.form = this.deepClone(data)
      }
    },
    btnConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading.confirm = true
          let data = this.deepClone(this.form)
          data.id = this.modal.title === '新增' ? '' : this.form.id
          let promise = this.modal.title === '新增' ? addManufactureGroup(data) : updateManufactureGroup(data)
          promise.then(response => {
            if (response.code === 1000) {
              this.$Notice.success({desc: response.message})
              this.modal.show = false
              this.$emit('confirmSuccess')
            } else {
              this.$Notice.error({desc: response.message})
            }
          }).catch(e => {
            this.$Notice.error({desc: e.message})
          }).finally(() => {
            this.loading.confirm = false
          })
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
