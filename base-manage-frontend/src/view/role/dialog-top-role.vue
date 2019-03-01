<template>
  <!--新增顶级角色-->
  <Modal v-model="modal.show" :title="modal.title" @on-ok="postRole">
    <Form ref="form" :model="form" :rules="rules" :label-width="80">
      <FormItem label="名称" prop="name">
        <Input placeholder="请输入" v-model="form.name"/>
      </FormItem>
      <FormItem label="编码" prop="code">
        <Input placeholder="请输入" v-model="form.code"/>
      </FormItem>
      <!-- <FormItem label="描述" prop="description">
        <Input placeholder="请输入" v-model="form.description"/>
      </FormItem> -->
    </Form>
  </Modal>
</template>

<script>
  import api from '@/api/roleManager'
  export default {
    data() {
      return {
        modal: { show: false, title: '添加角色' },
        form: {
          name: '',
          code: '',
          // description:'',
          systemId:''
        },
        rules: {
          // TODO
        }
      }
    },
    methods: {
      show(systemId) {
        // TODO
        this.form={}
        this.form.systemId=systemId;
        this.modal.show = true
      },
      postRole() {
        // TODO
        api.addRole(this.form).then(res=>{
          this.$emit('addRole');
        })
      }
    }
  }
</script>

<style scoped>

</style>
