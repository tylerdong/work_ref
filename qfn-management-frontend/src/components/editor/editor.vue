<template>
  <div class="editor-wrapper">
    <div :id="toolbarId" class="toolbar"></div>
    <div :id="editorId" class="editor" :style="{height: contentHeight}"></div>
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
    },
    /**
     * 内容高度
     */
    contentHeight: {
      type: String,
      default: '500px'
    },
    contentEnable: {
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

    // 图片
    const baseUrl = this.getCurrentBaseUrl()
    this.editor.customConfig.uploadImgServer = `${baseUrl}pretreatment/controller/common/file/uploadToQn` // 图片上传
    this.editor.customConfig.uploadFileName = 'file' // 后台代码接收文件的字段名称
    this.editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        this.imgUrl = Object.values(result.data).toString()
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        if (result.code === 1000) {
          insertImg(result.data)
        } else {
          this.$Message.error('插入图片失败')
        }
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        // let url = Object.values(result.data) // result.data就是服务器返回的图片名字和链接
        // JSON.stringify(url) // 在这里转成JSON格式

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
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
    this.editor.$textElem.attr('contenteditable', this.contentEnable)
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
        max-width: 100%;
      }
    }
  }
  .editor{
    /*height: 500px;*/
  }
</style>
