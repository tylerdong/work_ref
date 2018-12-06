<template>
  <div class="topbar-body black-cell" id="J_topbar">
    <div class="topbar-box">
      <div class="y-clear" style="margin: auto;max-width: 1440px;">
        <a class="logo-cell y-left" style="margin-left: 20px;" href="/#/index">
          <img class="black" style="z-index: 2;" src="../../../assets/images/logo.png">
        </a>
        <div class="menu-body y-left">
          <ul class="y-clear" id="J_topbar_menu">
            <template v-for="(item, index) in menu">
              <li :index="item.index" :dropdown="item.dropdown" :width="item.width" :left="item.left">
                <a :href="item.href">{{item.title}}</a>
              </li>
            </template>
            <li class="line"></li>
          </ul>
        </div>
        <div class="tool-body y-right">
          <div class="y-clear">

            <!--<a class="login-cell y-right register" href="/#/index">免费注册</a>-->
            <div class="user-info-cell">
              <div>
                <img class="topbar-use-head-img" src="//oss.aliyuncs.com/aliyun_id_photo_bucket/default_family.jpg">
                <span class="count-message">
                <span>12</span>
              </span>

                <div class="user-info-dropdown">
                  <div class="info-cell">
                    <a>
                      <img class="topbar-use-head-img" src="//oss.aliyuncs.com/aliyun_id_photo_bucket/default_family.jpg">
                    </a>
                    <ul>
                      <li class="user-uid"><a href="/"></a></li>
                      <li>会员等级：<a href="/"><span id="J_user_level">L0</span>会员</a></li>
                      <li>余额：<a href="/"><span
                        id="J_mPrepayMoney">0.00</span></a></li>
                    </ul>
                  </div>
                  <ul class="info-list">
                    <li>
                      <a>
                        <img class="white" src="//img.alicdn.com/tps/TB1b7jCLXXXXXcFXVXXXXXXXXXX-40-40.png">
                        <img class="blue" src="//img.alicdn.com/tps/TB1IZG8NXXXXXXQXpXXXXXXXXXX-40-40.png">
                        <span>产品续费<span class="count" id="J_mInstanceCount"></span></span>
                      </a>
                      <a>
                        <img class="white" src="//img.alicdn.com/tps/TB1jCLqLXXXXXXEapXXXXXXXXXX-40-40.png">
                        <img class="blue" src="//img.alicdn.com/tps/TB1SFuVNXXXXXafXVXXXXXXXXXX-40-40.png">
                        <span>实名认证</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <img class="white" src="//img.alicdn.com/tps/TB11k_sLXXXXXXHapXXXXXXXXXX-40-40.png">
                        <img class="blue" src="//img.alicdn.com/tps/TB1q9mWNXXXXXc_XFXXXXXXXXXX-40-40.png">
                        <span>未支付订单<span class="count" id="J_upPayedOrderCount"></span></span>
                      </a>
                      <a>
                        <img class="white">
                        <img class="blue">
                        <span>未读消息<span class="count" id="J_mMessageCount"></span></span>
                      </a>
                    </li>
                    <li style="margin: 0px 22px;">
                      <a class="logout-box" style="float: left;"  target="_blank">工单管理</a>
                      <a class="logout logout-box" style="float: right;" >退出</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <ul class="y-right tips-box">
              <li class="tips-item">
                <a
                  class="login"
                  @click="loginClick">登录</a>
              </li>
 <!--             <li class="tips-item">
                <a href="/#/index">备案</a>
              </li>-->
              <!--<li class="tips-item">-->
                <!--<a href="/#/index">控制台</a>-->
              <!--</li>-->
            </ul>


            <!--<div class="topbar-search-box">-->

              <!--<div class="frm-search">-->
                <!--<i class="el-icon-search"></i>-->
                <!--<input class="search-input" placeholder="搜索" name="k" autocomplete="OFF" id="search-input">-->
              <!--</div>-->
            <!--</div>-->


          </div>

        </div>
      </div>
    </div>
    <sub-menu></sub-menu>
    <login-dialog ref="login"></login-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
//  import loginDialog from '../../user/login/login.vue'
  export default {
    components: {
      'sub-menu': require('./subMenu.vue'),
      'login-dialog': require('../../user/login/login.vue')
    },
    data () {
      return {
        menu: [
          {
            title: '首页',
            index: 'home',
            dropdown: 'hide',
            width: '60',
            left: '0',
            href: '/#/index'
          },
          {
            title: '产品',
            index: 'product',
            dropdown: 'hide',
            width: '60',
            left: '60',
            href: '/#/index',
            children: [
              {
                index: '',
                text: '用户配置'
              },
              {
                index: '',
                text: '管理员配置'
              }
            ]
          },
          {
            title: '活动',
            index: 'activity',
            dropdown: 'hide',
            width: '60',
            left: '120',
            href: '/#/index',
            children: [
              {
                index: '',
                text: '用户列表'
              },
              {
                index: '',
                text: '管理员列表'
              }
            ]
          },
          {
            title: '案例',
            index: 'market',
            dropdown: 'hide',
            width: '60',
            left: '180',
            href: '/#/index',
            children: [
              {
                index: '',
                text: '角色管理'
              },
              {
                index: '',
                text: '权限管理'
              },
              {
                index: '',
                text: '模块管理'
              },
              {
                index: '',
                text: '子系统管理'
              },
              {
                index: '',
                text: '组织管理'
              }
            ]
          },
          {
            title: '方案',
            index: 'data',
            dropdown: 'hide',
            width: '60',
            left: '240',
            href: '/#/index'
          },
          {
            title: '支持',
            index: 'support',
            dropdown: 'hide',
            width: '60',
            left: '300',
            href: '/#/index'
          },
          {
            title: '合作',
            index: 'partner',
            dropdown: 'hide',
            width: '60',
            left: '360',
            href: '/#/index'
          },
          {
            title: '看板',
            index: 'partner',
            dropdown: 'hide',
            width: '60',
            left: '420',
            href: 'static/board/auto-line.html'
          }
        ],
//        menu: [
//          {
//            title: '最新活动',
//            index: 'activity',
//            dropdown: 'hide',
//            width: '88',
//            left: '0',
//            href: '/#/index'
//          },
//          {
//            title: '产品',
//            index: 'product',
//            dropdown: 'show',
//            width: '60',
//            left: '88',
//            href: '/#/index',
//            children: [
//              {
//                index: '',
//                text: '用户配置'
//              },
//              {
//                index: '',
//                text: '管理员配置'
//              }
//            ]
//          },
//          {
//            title: '解决方案',
//            index: 'solution',
//            dropdown: 'show',
//            width: '88',
//            left: '148',
//            href: '/#/index',
//            children: [
//              {
//                index: '',
//                text: '用户列表'
//              },
//              {
//                index: '',
//                text: '管理员列表'
//              }
//            ]
//          },
//          {
//            title: '云市场',
//            index: 'market',
//            dropdown: 'show',
//            width: '74',
//            left: '236',
//            href: '/#/index',
//            children: [
//              {
//                index: '',
//                text: '角色管理'
//              },
//              {
//                index: '',
//                text: '权限管理'
//              },
//              {
//                index: '',
//                text: '模块管理'
//              },
//              {
//                index: '',
//                text: '子系统管理'
//              },
//              {
//                index: '',
//                text: '组织管理'
//              }
//            ]
//          },
//          {
//            title: '大数据',
//            index: 'data',
//            dropdown: 'hide',
//            width: '74',
//            left: '310',
//            href: '/#/index'
//          },
//          {
//            title: '社区',
//            index: 'community',
//            dropdown: 'show',
//            width: '60',
//            left: '384',
//            href: '/#/index',
//            children: [
//              {
//                index: '',
//                text: '角色管理'
//              },
//              {
//                index: '',
//                text: '权限管理'
//              },
//              {
//                index: '',
//                text: '模块管理'
//              },
//              {
//                index: '',
//                text: '子系统管理'
//              },
//              {
//                index: '',
//                text: '组织管理'
//              }
//            ]
//          },
//          {
//            title: '支持',
//            index: 'support',
//            dropdown: 'show',
//            width: '60',
//            left: '444',
//            href: '/#/index'
//          },
//          {
//            title: '合作伙伴',
//            index: 'partner',
//            dropdown: 'hide',
//            width: '88',
//            left: '504',
//            href: '/#/index'
//          },
//          {
//            title: '更多',
//            index: 'more',
//            dropdown: 'show',
//            width: '60',
//            left: '592',
//            href: '/#/index'
//          }
//        ],
        defaultActive: '1',
        subMenu: {
          product: {
            class: '',
            index: 'product',
            menu: [
              {
                title: '云计算基础服务',
                children: [
                  {
                    title: '弹性计算',
                    href: '',
                    children: [
                      {
                        title: '云服务器 ECS',
                        desc: '从安全型到内存型、从进阶型到入门型的云服务器'
                      },
                      {
                        title: '专有网络 VPC',
                        desc: '构建逻辑隔离网络，确保资源安全'
                      },
                      {
                        title: 'FPGA 云服务器（邀测中）',
                        desc: 'FPGA实例、低时延可编程硬件加速服务'
                      },
                      {
                        title: '高性能计算 HPC',
                        desc: '加速深度学习、渲染和科学计算的 GPU 物理机'
                      },
                      {
                        title: 'GPU 云服务器',
                        desc: 'GPU实例、强大的计算性能、弹性按需扩展'
                      },
                      {
                        title: '负载均衡',
                        desc: '对多台云服务器进行流量分发的负载均衡服务'
                      },
                      {
                        title: '块存储',
                        desc: '可弹性扩展、高性能、高可靠的块级随机存储'
                      },
                      {
                        title: '弹性伸缩',
                        desc: '自动调整弹性计算资源的管理服务'
                      },
                      {
                        title: '资源编排',
                        desc: '复杂环境部署利器，提供资源批量复制、创建和配置'
                      },
                      {
                        title: '容器服务',
                        desc: '支持微服务架构、全生命周期管理的Docker服务'
                      },
                      {
                        title: '批量计算',
                        desc: '大规模并行批处理计算服务'
                      },
                      {
                        title: '函数计算',
                        desc: '事件驱动的全托管计算服务'
                      }
                    ]
                  },
                  {title: '数据库', href: '#'},
                  {title: '存储与CDN', href: '#'},
                  {title: '分析与搜索', href: '#'},
                  {title: '云通信', href: '#'},
                  {title: '网络', href: '#'},
                  {title: '管理与监控', href: '#'},
                  {title: '应用服务', href: '#'},
                  {title: '互联网中间件', href: '#'},
                  {title: '移动服务', href: '#'},
                  {title: '视频服务', href: '#'}
                ]
              },
              {title: '大数据（数加） >'},
              {title: '安全（云盾） >'},
              {title: '域名与网站（万网）>'}
            ]
          }
        }
      }
    },
    mounted () {
      this.showDropDown()
      this.subMenuTab()
    },
    methods: {
      loginClick () {
        this.$refs.login.show()
      },
      showDropDown () {
        const vm = this
        $('#J_topbar_menu li:not(.line)').mouseenter(function () {
          let index = $('#J_topbar_menu li').index($(this))
          vm.changeTab($(this), index)
          if ($(this).attr('dropdown') === 'show') {
            $('.topbar-dropdown-box').css('overflow", "visible')
            $('.topbar-dropdown-box').addClass('show')
            $('.topbar-dropdown-box div[index=' + $(this).attr('index') + ']').show().siblings('div[index]').hide()
            $('.topbar-dropdown-box>div').removeClass('dropdown-ing')
          } else {
            $('.topbar-dropdown-box>div').addClass('dropdown-ing')
            $('.topbar-dropdown-box').removeClass('show')
            $('.topbar-dropdown-box div[index]').hide()
          }
        })

        let moveUl = $('#J_topbar').find('.ul-move')
        moveUl.each(function () {
          let moveLi = $(this).find('li')
          moveLi.each(function () {
            let index = moveLi.index($(this))
            $(this).attr('top', index * 40)
          })
        })

        $('.topbar-dropdown-box > .close-dropdown').click(function () {
          vm.hideDropDown()
        })
        $('#J_topbar').mouseleave(function () {
          setTimeout(function () {
            vm.hideDropDown()
          }, 100)
        })

        $('.el-icon-search').click(function () {
          let dom = $(this).siblings('input')
          if (dom.width() > 0) {
          //  vm.colseSearch(dom)
          } else {
            dom.css({
              'width': '170px',
              'opacity': 1
            })
            $('.topbar-search-box').addClass('hover')
          }
        })
        $('body').click(function (event) {
          if (event.target.id !== 'search-input' && $('#J_topbar .search-input').width() > 0) {
            setTimeout(function () {
              vm.colseSearch($('#J_topbar .search-input'))
            }, 100)
          }
        })
      },
      colseSearch (dom) {
        dom.css({
          'width': '0',
          'opacity': 0
        })
        $('.topbar-search-box').removeClass('hover')
      },
      changeTab (li, index) {
        if (index != null) {
          var o = li
          $('#J_topbar_menu .line').css({
            width: o.attr('width'),
            left: o.attr('left') + 'px'
          })
        }
      },
      hideDropDown () {
        $('.topbar-dropdown-box>div').addClass('dropdown-ing')
        $('.topbar-dropdown-box').removeClass('show')
        $('#J_topbar_menu li.line').css('width', 0)
        $('.topbar-dropdown-box div[index]').hide()
      },
      subMenuTab () {
        let moveLi = $('#J_topbar').find('.ul-move li')
        moveLi.mouseenter(function () {
          let _this = $(this)
          if (!_this.hasClass('line')) {
            _this.siblings('.line').css({
              top: _this.attr('top') + 'px'
            })
            _this.parent().parent().siblings('div').eq(_this.attr('index')).show().siblings('div').hide()
          }
        })
      }
    }
  }
</script>
<style>
  @import "../../../assets/css/mainMenu.css"
</style>
