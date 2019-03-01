<template>
  <div>
    <label class="titlelabel" for="title">文章标题</label>
    <Input v-model="value" placeholder="文章标题" element-id="title" name="title" style="width: 100%;margin-bottom:30px" />
    <editor ref="editor" :value="content" @on-change="handleChange"/>
    <Button style="float:right;margin: 20px 20px 0 0;" type="primary" @click="changeContent">提交</Button>
  </div>
</template>

<script>
import Editor from '_c/editor'
export default {
  name: 'editor_page',
  components: {
    Editor
  },
  data () {
    return {
      content: '',
      value: ''
    }
  },
  methods: {
    handleChange (html, text) {
      console.log(html);
      var str = '汽车'
      var re =new RegExp(str,"g");
      html=html.replace(re,'<span style="color:red;">'+str+'</span>')
      console.log(html);
      this.content = html;
      console.log(this.content);
      // if (html) this.content = html;
    },
    changeContent () {



      // this.$refs.editor.setHtml('<p>powered by wangeditor</p>')
    }
  }
}
</script>

<style>
  .titlelabel{
    margin: 10px;
    display: block;
    font-size: 20px;
  }
</style>
