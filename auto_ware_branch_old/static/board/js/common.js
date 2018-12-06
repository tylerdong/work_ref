// 获取车间
function getAllWorkshopOptions () {
  $.ajax({
    type: 'POST',
    url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/dataDictionary/getAllWorkshopList',
    data: '',
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      response = JSON.parse(response)
      var workShopOptions = ''
      for (var i = 0; i < response.data.length; i++) {
        workShopOptions += '<option value="' + response.data[i].id + '">' + response.data[i].name + '</option>'
      }
      $('#workShop').html(workShopOptions)
    },
    error: function (a, b, c) {
      console.log(a, b, c)
    },
    complete: function (xhr) {
      xhr = null
    }
  })
}

// 根据车间获取线别
function getLineOptions (workShopId) {
  var params = {workShopId: workShopId}
  params = JSON.stringify(params)
  $.ajax({
    type: 'POST',
    url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/productionPlan/getAllLineList',
    data: params,
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      response = JSON.parse(response)
      var lineOptions = '<option value="0">请选择线别</option>'
      for (var i = 0; i < response.data.length; i++) {
        lineOptions += '<option value ="' + response.data[i].id + '">' + response.data[i].line + '</option>'
      }
      $('#line').html(lineOptions)
    },
    error: function (a, b, c) {
      a = null
    },
    complete: function (xhr) {
      xhr = null
    }
  })
}

// 全屏显示
function fullScreen () {
  var docElm = $('#boardContent')[0]
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  }
}

// 切换标签页
function changeTabPage (name) {
  var index = window.location.href.lastIndexOf('/')
  var currPath = window.location.href.substr(index + 1)
  if (currPath !== name + '.html') {
    var curHref = window.location.href.substr(0, index + 1) + name + '.html'
    window.location.href = curHref
  }
}

function addTabs () {
  var tabHtml = '<input id="alarm" type="radio"  name="tabs" onclick="changeTabPage(\'alarm\')"><label for="alarm">报警看板</label>' +
    '<input id="abnormal" type="radio" name="tabs" onclick="changeTabPage(\'abnormal\')"><label for="abnormal">车间异常看板</label>' +
    '<input id="auto-line" type="radio" name="tabs" onclick="changeTabPage(\'auto-line\')"><label for="auto-line">自动生产线看板</label>' +
    '<input id="largescreen" type="radio" name="tabs" onclick="changeTabPage(\'largescreen\')"><label for="largescreen">智能制造中心</label>'
  $('#tabBar').html(tabHtml)
}

function setCurrTab () {
  var firstIndex = window.location.href.lastIndexOf('/')
  var lastindex = window.location.href.lastIndexOf('.')
  var name = window.location.href.substr(firstIndex + 1, lastindex - firstIndex - 1)
  var inputArr = $('main input[type="radio"]')
  for (var i = 0; i < inputArr.length; i++) {
    if ($(inputArr[i]).attr('id') === name) {
      $(inputArr[i]).attr('checked', true)
    }
  }
}

// 添加标签
$(function () {
})
