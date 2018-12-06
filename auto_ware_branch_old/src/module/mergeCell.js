/**
 * Created by g on 2017/5/9.
 * $obj：操作对象
 * col：合并列
 */

export function mergeCol ($obj, col) {
  var tr = $obj.getElementsByTagName('tr')

  var arr = []
  for (let i = 1; i < tr.length; i++) {
    arr[i - 1] = tr[i]
  }

  var obj = {}
  for (let i in arr) {
    let item = arr[i].childNodes[col].innerText
    if (obj[item] == null) {
      obj[item] = 1
    } else {
      obj[item] = obj[item] + 1
      arr[i].childNodes[2].parentNode.removeChild(arr[i].childNodes[col])
    }
  }

  for (let i in obj) {
    let item = obj[i]
    if (item > 1) {
      for (let j in arr) {
        if (arr[j].childNodes[col].innerText === i) {
          arr[j].childNodes[col].setAttribute('rowspan', obj[i])
        }
      }
    }
  }
}
