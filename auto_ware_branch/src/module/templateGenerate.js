import {eventHub} from '../../src/module/eventHub'

class DragProperty {
  static stickedArray = []

  constructor (origin, target) {
    this.origin = origin
    this.target = target
    this.log = ''
    /** 拖拽源拖动时触发 */
    $(this.origin).off('drag').on('drag', this.onDrag)
    /** 为拖拽源监听dragstart，设置关联数据 */
    $(this.origin).off('dragstart').on('dragstart', this.onDragStart)
    /** 拖拽鼠标移入元素，在拖拽目标上设置视觉反馈 */
    $(this.target).off('dragenter').on('dragenter', this.onDragEnter)
    /** 取消元素dragover默认行为，使其可以拖放 */
    $(this.target).off('dragover').on('dragover', this.onDragOver)
    /** 拖拽移除元素，清除视觉反馈 */
    $(this.target).off('dragleave').on('dragleave', this.onDragLeave)
    /** 鼠标释放，在拖放目标上接收数据并处理 */
    $(this.target).off('drop').on('drop', this.onDrop)
  }

  onDrag (e) {
    console.log('drag')
    return false
  }

  onDragStart (e) {
    if (e.target.children[0].children[0]) {
      let bindedData = e.target.children[0].children[0].innerText
      e.originalEvent.dataTransfer.setData('text/plain', bindedData)
    }
    console.log('dragstart')
  }

  onDragEnter (e) {
    console.log('dragenter')
  }

  onDragOver (e) {
    e.preventDefault()
    console.log('dragover')
  }

  onDragLeave (e) {
    console.log('dragleave')
  }

  onDrop (e) {
    console.log('drop')
    let jsonStr = e.originalEvent.dataTransfer.getData('text/plain')
    if (jsonStr) {
      let data = JSON.parse()
      // 添加或拖动dom元素
      if (data) {
        if (data.offsetX) {
          DragProperty.stickedArray[data.index].offsetX = e.offsetX
          DragProperty.stickedArray[data.index].offsetY = e.offsetY
        } else {
          DragProperty.stickedArray.push({
            offsetY: e.offsetY,
            offsetX: e.offsetX,
            name: data.name,
            nodeCode: data.code,
            index: data.index
          })
        }
      }
    } else {
      DragProperty.stickedArray.push({ offsetY: e.offsetY, offsetX: e.offsetX, name: '', nodeCode: '', index: '' })
    }
    eventHub.$emit('renderStickedDom', DragProperty.stickedArray)
  }

  getOffsetTop (obj) {
    let top = obj.offsetTop
    let parent = obj.offsetParent
    while (parent) {
      top += parent.offsetTop
      parent = parent.offsetParent
    }
    return top
  }

  getOffsetLeft (obj) {
    let left = obj.offsetLeft
    let parent = obj.offsetParent
    while (parent) {
      left += parent.offsetLeft
      parent = parent.offsetParent
    }
    return left
  }

  printLog () {
    console.log(this.log)
  }
}

export {DragProperty}
