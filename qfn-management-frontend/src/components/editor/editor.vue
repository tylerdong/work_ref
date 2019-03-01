<template>
  <div class="editor-wrapper">
    <div :id="toolbarId" class="toolbar"></div>
    <div :id="editorId" class="editor"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    },
    toolbarId () {
      return `toolbar${this._uid}`
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.toolbarId}`, `#${this.editorId}`)
    this.editor.customConfig.pasteFilterStyle = false
    this.editor.customConfig.onchange = (html) => {
      let text = this.editor.txt.text()
      // if (this.cache) localStorage.editorCache = html
      this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html, text)
    }
    // 对文本内容的处理
    this.editor.customConfig.pasteTextHandle = function (content) {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      // console.log(content)
      return content
    }
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    this.editor.customConfig.zIndex = 100
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    // 如果本地有存储加载本地存储内容
    let html = this.value
    if (html) this.editor.txt.html(html)
  }
}
</script>

<style lang="less">
  .editor-wrapper{
    background: #fff;
    p{
      img{
        margin: 0 auto !important;
        width: 100%;
      }
    }
  }
  .editor{
    height: 500px;
  }
</style>
