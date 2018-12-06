<template>
  <div class="topbar-dropdown-box" style="z-index: 998;top: -10px;">
    <div class="close-dropdown dropdown-ing">
      <img src="//img.alicdn.com/tps/TB1.HbsLXXXXXakXVXXXXXXXXXX-44-20.png">
    </div>
    <div class="dropdown-ing">
      <div class="y-row">
        <!-- 产品 -->
        <div style="padding-left: 180px; display: none;" class="menu-boxs" index="product">
          <span style="position: absolute;left: 0;display: inline-block;">
              <ul class="ul-move level-1">
                <li index="0">云计算基础服务</li>
                <li index="1">大数据（数加） ></li>
                <li index="2">安全（云盾） ></li>
                <li index="2">域名与网站（万网）></li>
                <li class="line" top="160"></li>
              </ul>
          </span>
          <div class="cell-level2" style="display: none;">
            <span style="position: absolute;left: 20px">
              <ul class="ul-move level-2">
                <li index="0">弹性计算</li>
                <li index="1">数据库&nbsp;&gt;</li>
                <li index="2">存储与CDN</li>
                <li index="3">分析与搜索</li>
                <li index="4">云通信</li>
                <li index="5">网络</li>
                <li index="6">管理与监控</li>
                <li index="7">应用服务</li>
                <li index="8">互联网中间件</li>
                <li index="9">移动服务</li>
                <li index="10">视频服务</li>
                <li class="line"></li>
            </ul>
        </span>
            <div class="cell-detail" style="margin-left: 140px;">
              <ul class="tpl1">
                <li>
                  <a>
                    <h3>云服务器 ECS</h3>
                    <p>从安全型到内存型、从进阶型到入门型的云服务器</p>
                  </a>
                </li>
                <li>
                  <a>
                    <h3>专有网络 VPC</h3>
                    <p>构建逻辑隔离网络，确保资源安全</p>
                  </a>
                </li>
                <li>
                  <a>
                    <h3>FPGA 云服务器（邀测中）<img style="width: 28px; margin-left: 2px;"
                                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></h3>
                    <p>FPGA实例、低时延可编程硬件加速服务</p>
                  </a>
                </li>
                <li>
                  <a>
                    <h3>高性能计算 HPC</h3>
                    <p>加速深度学习、渲染和科学计算的 GPU 物理机</p>
                  </a>
                </li>
                <li>
                  <a>
                    <h3>GPU 云服务器<img style="width: 28px; margin-left: 2px;"
                                     src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></h3>
                    <p>GPU实例、强大的计算性能、弹性按需扩展</p>
                  </a>
                </li>

                <li>
                  <a>
                    <h3>负载均衡</h3>
                    <p>对多台云服务器进行流量分发的负载均衡服务</p>
                  </a>
                </li>

                <li>
                  <a>
                    <h3>块存储</h3>
                    <p>可弹性扩展、高性能、高可靠的块级随机存储</p>
                  </a>
                </li>
                <li>
                  <a>
                    <h3>弹性伸缩</h3>
                    <p>自动调整弹性计算资源的管理服务</p>
                  </a>
                </li>
                <li>
                  <a>
                    <h3>资源编排</h3>
                    <p>复杂环境部署利器，提供资源批量复制、创建和配置</p>
                  </a>
                </li>

                <li>
                  <a>
                    <h3>容器服务</h3>
                    <p>支持微服务架构、全生命周期管理的Docker服务</p>
                  </a>
                </li>

                <!--<li>-->
                  <!--<a>-->
                    <!--<h3>批量计算</h3>-->
                    <!--<p>大规模并行批处理计算服务</p>-->
                  <!--</a>-->
                <!--</li>-->

                <!--<li>-->
                  <!--<a>-->
                    <!--<h3>函数计算<img style="width: 28px; margin-left: 2px;"-->
                                 <!--src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></h3>-->
                    <!--<p>事件驱动的全托管计算服务</p>-->
                  <!--</a>-->
                <!--</li>-->
              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li class="db-big">
                  <div>
                    <h3>关系型数据库</h3>
                    <p>支持ACID和SQL标准，拓展性能极限、保证数据安全</p>
                    <div class="child-cell"><a href="">MySQL</a> <a
                      href="">SQL Server</a> <a
                      href="">PPAS</a> <a
                      href="">PostgreSQL</a> <a
                      href="">OceanBase</a></div>
                  </div>
                  <div>
                    <h3>NoSQL数据库</h3>
                    <p>支持缓存、文档、列式存储类等数据库，轻松应对业务突发增长</p>
                    <div class="child-cell"><a href="">Redis</a> <a
                      href="">MongoDB</a> <a
                      href="">Memcache</a> <a
                      href="">TableStore</a> <a
                      href="">HBase</a></div>
                  </div>
                </li>

                <li class="db-small">
                  <a style="width: 320px;" href="">
                    <h3>HybridDB for MySQL</h3>
                    <p>兼容MySQL接口，同时支持OLTP和OLAP的PB级分布式数据库</p>
                  </a>
                  <a style="width: 320px;" href="">
                    <h3>HybridDB for PostgreSQL</h3>
                    <p>基于Greenplum Database的MPP分布式OLAP数据仓库</p>
                  </a>
                  <a style="width: 320px;" href="">
                    <h3>数据传输 DTS</h3>
                    <p>数据迁移、数据订阅及数据实时同步</p>
                  </a>
                  <a style="width: 320px;" href="">
                    <h3>数据管理 DMS</h3>
                    <p>关系型数据库和NoSQL的数据库管理工具</p>
                  </a>
                </li>

              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li>
                  <a href="">
                    <h3>对象存储 OSS</h3>
                    <p>比传统存储成本下降25%~75%的强安全企业级存储</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <h3>块存储</h3>
                    <p>随机访问能力高达2万IOPS的块级存储</p>
                  </a>
                </li>

                <li>
                  <a href="">
                    <h3>文件存储</h3>
                    <p>支持NFS、CIFS协议的可共享文件存储</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/ots">
                    <h3>表格存储</h3>
                    <p>适用于社交、金融、物联网百万并发的NoSQL</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/oas/">
                    <h3>归档存储</h3>
                    <p>适用于历史数据归档，强安全、高持久低成本存储</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/cdn">
                    <h3>CDN</h3>
                    <p>常用于视频、图片、文件加速的跨域网络分发</p>
                  </a>
                </li>

              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li>
                  <a href="https://www.aliyun.com/product/emapreduce">
                    <h3>E-MapReduce</h3>
                    <p>基于 Hadoop/Spark 的大数据处理分析服务</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/hpc">
                    <h3>高性能计算 HPC</h3>
                    <p>加速深度学习、渲染和科学计算的 GPU 物理机</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/odps">
                    <h3>大数据计算服务 MaxCompute</h3>
                    <p>TB到EB级安全稳定免运维数仓平台</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/ads">
                    <h3>分析型数据库</h3>
                    <p>千亿级记录、毫秒级查询的OLAP系统</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/opensearch">
                    <h3>开放搜索</h3>
                    <p>结构化数据搜索托管服务</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/sls">
                    <h3>日志服务</h3>
                    <p>一站式解决日志收集、存储、查询和分析</p>
                  </a>
                </li>

              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li>
                  <a href="https://www.aliyun.com/product/sms">
                    <h3>短信服务</h3>
                    <p>验证码和短信通知服务，三网合一快速到达</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/vms">
                    <h3>语音服务</h3>
                    <p>语音通知和语音验证，支持多方通话</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/cdps">
                    <h3>流量服务</h3>
                    <p>轻松玩转手机流量，物联卡专供物联终端使用</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/pls">
                    <h3>私密专线</h3>
                    <p>号码隔离，保护双方的隐私信息</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/cps">
                    <h3>移动推送</h3>
                    <p>移动应用通知与消息推送服务</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/mns">
                    <h3>消息服务</h3>
                    <p>处理应用间海量消息传递的消息队列与通知服务</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/directmail">
                    <h3>邮件推送</h3>
                    <p>事务邮件、通知邮件和批量邮件的快速发送</p>
                  </a>
                </li>

              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li>
                  <a href="//www.aliyun.com/product/slb">
                    <h3>负载均衡</h3>
                    <p>对多台云服务器进行流量分发的负载均衡服务</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/vpc">
                    <h3>专有网络 VPC</h3>
                    <p>构建逻辑隔离网络，确保资源安全</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/expressconnect">
                    <h3>高速通道</h3>
                    <p>高速稳定的 VPC 互联和专线接入服务</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/cdn">
                    <h3>CDN</h3>
                    <p>跨运营商、跨地域全网覆盖的网络加速服务</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/nat">
                    <h3>NAT网关</h3>
                    <p>支持NAT转发、共享带宽的VPC网关</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/eip">
                    <h3>弹性公网IP<img style="width: 28px; margin-left: 2px;"
                                   src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></h3>
                    <p>独立的公网IP资源，灵活绑定云资源</p>
                  </a>
                </li>


              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li>
                  <a href="//www.aliyun.com/product/jiankong">
                    <h3>云监控</h3>
                    <p>一站式监控与报警解决方案</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/ram">
                    <h3>访问控制</h3>
                    <p>管理多因素认证、子账号与授权、角色与 STS 令牌</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/ros">
                    <h3>资源编排</h3>
                    <p>复杂环境部署利器，提供资源批量复制、创建和配置</p>
                  </a>
                </li>


                <li>
                  <a href="//www.aliyun.com/product/actiontrail">
                    <h3>操作审计（公测中）</h3>
                    <p>详细记录控制台和 API 操作</p>
                  </a>
                </li>


                <li>
                  <a href="//www.aliyun.com/product/kms">
                    <h3>密钥管理服务</h3>
                    <p>安全、易用、低成本的密钥管理服务</p>
                  </a>
                </li>

              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">

                <li>
                  <a href="//www.aliyun.com/product/sls/">
                    <h3>日志服务</h3>
                    <p>一站式解决日志收集、存储、查询和分析</p>
                  </a>
                </li>


                <li>
                  <a href="//www.aliyun.com/product/opensearch">
                    <h3>开放搜索</h3>
                    <p>结构化数据搜索托管服务</p>
                  </a>
                </li>

                <li>
                  <a href="//www.aliyun.com/product/pts">
                    <h3>性能测试</h3>
                    <p>性能云测试平台，帮您轻松完成系统性能评估</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/rdc" target="_blank">
                    <h3>RDC研发协同 (公测中）<img style="width: 28px; margin-left: 2px;"
                                          src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></h3>
                    <p>云上企业级一站式智能研发协同平台</p>
                  </a>
                </li>


                <li>
                  <a href="//www.aliyun.com/product/directmail">
                    <h3>邮件推送</h3>
                    <p>事务\批量邮件推送，验证码\通知短信服务</p>
                  </a>
                </li>


                <li>
                  <a href="//www.aliyun.com/product/apigateway">
                    <h3>API 网关</h3>
                    <p>API 托管，安全防护、精准流控，降低开发成本</p>
                  </a>
                </li>


                <li>
                  <a href="//www.aliyun.com/product/iot">
                    <h3>物联网套件（公测中）</h3>
                    <p>助您快速搭建稳定可靠的物联网应用</p>
                  </a>
                </li>


                <li>
                  <a href="//www.aliyun.com/product/mns">
                    <h3>消息服务</h3>
                    <p>大规模、高可靠、高并发访问和超强消息堆积能力</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/sca">
                    <h3>智能对话分析服务（公测中）<img style="width: 28px; margin-left: 2px;"
                                          src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></h3>
                    <p>典型适用于客服质检和电销策略分析</p>
                  </a>
                </li>


              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li>
                  <a href="https://www.aliyun.com/product/edas">
                    <h3>企业级分布式应用服务 EDAS</h3>
                    <p>以应用为中心的微服务PaaS平台</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/ons">
                    <h3>消息队列 MQ</h3>
                    <p>Apache RocketMQ &amp; Kafka企业级消息中间件</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/drds">
                    <h3>分布式关系型数据库服务 DRDS</h3>
                    <p>水平拆分/读写分离的在线分布式数据库服务</p>
                  </a>
                </li>

                <li>
                  <a href="https://www.aliyun.com/product/csb">
                    <h3>云服务总线 CSB（公测中）</h3>
                    <p>企业内部跨应用的API通讯平台</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/arms">
                    <h3>业务实时监控服务 ARMS（公测中）</h3>
                    <p>可自定义的端到端应用级别实时监控</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/aliware/txc">
                    <h3>全局事务服务（公测中）</h3>
                    <p>分布式强一致事务/消息事务/服务链路事务</p>
                  </a>
                </li>


              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li>
                  <a href="https://www.aliyun.com/product/cps">
                    <h3>移动推送</h3>
                    <p>高送达，双11场景考验的移动应用内消息推送</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/sms">
                    <h3>短信服务</h3>
                    <p>验证码和短信通知服务，三网合一快速到达</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/httpdns">
                    <h3>HTTPDNS</h3>
                    <p>防劫持、就近接入、解析快</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/mobsec">
                    <h3>移动安全</h3>
                    <p>解决移动应用漏洞、仿冒、篡改、破解等安全风险</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/man">
                    <h3>移动数据分析（公测中）</h3>
                    <p>移动应用数据采集、分析及开放输出服务</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/mac">
                    <h3>移动加速（公测中）</h3>
                    <p>低侵入、高可控</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/mqc">
                    <h3>移动测试（公测中）
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>智能、深入、全面、易用的移动测试解决方案</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/hotfix">
                    <h3>移动热修复（公测中）
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>实时修复，无需发版</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/feedback">
                    <h3>
                      移动用户反馈（公测中）
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>支持图片语音，自动抓取应用市场评论</p>
                  </a>
                </li>
              </ul>
            </div>

            <div class="cell-detail" style="margin-left: 140px;display: none;">
              <ul class="tpl1">
                <li>
                  <a href="https://www.aliyun.com/product/vod">
                    <h3>视频点播</h3>
                    <p>上传、转码、存储、加速分发一体的点播服务</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/mts">
                    <h3>媒体转码</h3>
                    <p>为多媒体数据提供转码、加工、处理的计算服务</p>
                  </a>
                </li>


                <li>
                  <a href="https://www.aliyun.com/product/live">
                    <h3>视频直播</h3>
                    <p>低延时、高并发、实时多媒体处理的直播服务</p>
                  </a>
                </li>

              </ul>
            </div>

          </div>

          <div class="cell-level2" style="display: none;" tpl-key="product_database" tpl-type="tpl2">
            <ul class="tpl2">

              <li>
                <h1>数据应用</h1>
                <ul>
                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/re">
                      <h3>推荐引擎</h3>
                      <p>适用于新闻、短视频等应用场景</p>
                    </a>
                  </li>
                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/prophet">
                      <h3>公众趋势分析</h3>
                      <p>时刻关注您的口碑</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/eprofile">
                      <h3>企业图谱</h3>
                      <p>透视企业关系，洞察企业风险</p>
                    </a>
                  </li>

                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/openad">
                      <h3>营销引擎</h3>
                      <p>极速搭建高水准的DSP系统</p>
                    </a>
                  </li>

                  <li class=" big ">
                    <a href="https://market.aliyun.com/store/1334330-0.html" target="_blank">
                      <h3>API市场</h3>
                      <p>丰富的API采购服务</p>
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>数据分析展现</h1>
                <ul>
                  <li class=" big ">
                    <a href="https://data.aliyun.com/visual/datav">
                      <h3>DataV数据可视化</h3>
                      <p>做出领导惊喜的可视化大屏</p>
                    </a>
                  </li>

                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/bi">
                      <h3>Quick BI</h3>
                      <p>30分钟，老板也能上手的BI</p>
                    </a>
                  </li>

                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/porana">
                      <h3>画像分析（公测中）</h3>
                      <p>智能化的用户兴趣标签</p>
                    </a>
                  </li>

                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/graphanalytics">
                      <h3>关系网络分析</h3>
                      <p>构建万物互联，追寻业务线索</p>
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>人工智能</h1>
                <ul>

                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/learn">
                      <h3>机器学习PAI</h3>
                      <p>从BI到AI，人工智能触手可及</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/nls">
                      <h3>语音识别与合成</h3>
                      <p>录音识别为文字，文字合成为人声</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/nls">
                      <h3>人机对话</h3>
                      <p>快速构建自己的智能对话机器人</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/ocr">
                      <h3>印刷文字识别（公测中）</h3>
                      <p>高精准的图像文字解析和识别服务</p>
                    </a>
                  </li>

                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/face">
                      <h3>人脸识别（公测中）</h3>
                      <p>人脸检测、分析、和认证服务</p>
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>大数据基础服务</h1>
                <ul>
                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/ide">
                      <h3>大数据开发套件</h3>
                      <p>建设数据仓库，人省一半</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/ads">
                      <h3>分析型数据库</h3>
                      <p>眨眼间，千亿数据随意查询</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/odps">
                      <h3>MaxCompute</h3>
                      <p>建设数据仓库，钱省一半</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/cdp/">
                      <h3>数据集成</h3>
                      <p>消除数据孤岛，快速集中数据</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://data.aliyun.com/product/sc">
                      <h3>流计算（公测中）</h3>
                      <p>会写SQL的流计算</p>
                    </a>
                  </li>

                </ul>
              </li>

            </ul>
          </div>

          <div class="cell-level2" style="display: inline-block;" tpl-key="product_yundun" tpl-type="tpl3">
            <ul class="tpl3">

              <li>
                <h1>防御</h1>
                <ul>
                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/aegis">
                      <h3>服务器安全（安骑士）</h3>
                      <p>全方位服务器安全检测、响应和防护</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/waf">
                      <h3>Web应用防火墙（网络安全）</h3>
                      <p>防注入，防CC ，一站式Web安全解决方案</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/hsm">
                      <h3>加密服务（数据安全）</h3>
                      <p>加密，符合监管合规的硬件加密服务</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/antifraud">
                      <h3>数据风控（业务安全）</h3>
                      <p>实时防控垃圾注册、刷库撞库、活动作弊等风险</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/mobsec">
                      <h3>移动安全</h3>
                      <p>解决移动应用漏洞、仿冒、篡改、破解等安全风险</p>
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>&nbsp;</h1>
                <ul>

                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/ddos">
                      <h3>DDoS高防IP（网络安全）</h3>
                      <p>300G按天付费，防御超大流量DDoS攻击</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/sos">
                      <h3>安全管家（安全服务）</h3>
                      <p>专业、高效的入侵响应、安全护航、安全托管服务</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/lvwang">
                      <h3>绿网（内容安全）</h3>
                      <p>文本、图像、视频直播的内容安全检测服务</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/cas">
                      <h3>CA证书服务（数据安全）</h3>
                      <p>用国际权威CA数字证书，实现全站HTTPS化</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/sppc">
                      <h3>合作伙伴产品中心</h3>
                      <p>阿里云安全合作伙伴产品统一入口和集中管理平台</p>
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>检测</h1>
                <ul>
                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/sas">
                      <h3>态势感知（大数据安全）</h3>
                      <p>安全统一告警平台，原始日志检索和安全事件调查</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/xianzhi">
                      <h3>先知（安全情报）</h3>
                      <p>可信的安全众测服务，按效果付费</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/dbaudit">
                      <h3>数据库审计</h3>
                      <p>符合数据库合规审计要求</p>
                    </a>
                  </li>


                  <li class=" big ">
                    <a href="https://www.aliyun.com/product/bastionhost">
                      <h3>堡垒机</h3>
                      <p>运维操作记录，满足合规审计要求</p>
                    </a>
                  </li>

                </ul>
              </li>

            </ul>
          </div>

          <div class="cell-level2" style="display: none;" tpl-key="product_network" tpl-type="tpl4">
            <ul class="tpl4">
              <li>
                <h1>
                  <a href="https://wanwang.aliyun.com/domain">域名注册&nbsp;&gt;</a>
                </h1>
                <ul class="y-clear">
                  <li class="y-left half even ">
                    <a href="https://wanwang.aliyun.com/domain/com">.com</a>
                  </li>

                  <li class="y-left half  ">
                    <a href="https://wanwang.aliyun.com/domain/newgtld/?#.xin">.xin</a>
                  </li>

                  <li class="y-left half even ">
                    <a href="https://wanwang.aliyun.com/domain/cn/">.cn</a>
                  </li>

                  <li class="y-left half  ">
                    <a href="https://wanwang.aliyun.com/domain/newgtld/?spm=5176.8061372.1001.29.QgL5qZ#.shop">.shop</a>
                  </li>

                  <li class="y-left half even ">
                    <a href="https://wanwang.aliyun.com/domain/net">.net</a>
                  </li>

                  <li class="y-left half  ">
                    <a href="https://wanwang.aliyun.com/domain/newgtld/#.win">.win</a>
                  </li>

                </ul>

                <h1>
                  <a href="https://wanwang.aliyun.com/hosting">云虚拟主机&nbsp;&gt;</a>
                </h1>

                <ul class="y-clear">
                  <li class="y-left  even ">
                    <a href="https://wanwang.aliyun.com/hosting">独享云虚拟主机</a>
                  </li>

                  <li class="y-left   ">
                    <a href="https://wanwang.aliyun.com/hosting/">共享云虚拟主机</a>
                  </li>

                  <li class="y-left  even ">
                    <a href="https://wanwang.aliyun.com/hosting/elastic/">弹性Web托管</a>
                  </li>

                </ul>

              </li>


              <li>
                <h1>
                  <a href="https://mi.aliyun.com">域名交易与转入&nbsp;&gt;</a>
                </h1>

                <ul class="y-clear">
                  <li class="y-left  even ">
                    <a href="https://mi.aliyun.com">域名交易</a>
                  </li>

                  <li class="y-left   ">
                    <a href="https://wanwang.aliyun.com/domain/yuding#eyJzb3J0VHlwZSI6MX0=">域名预订</a>
                  </li>

                  <li class="y-left  even ">
                    <a href="https://wanwang.aliyun.com/domain/transfers">域名转入</a>
                  </li>
                </ul>

                <h1>
                  <a href="https://market.aliyun.com/jianzhan" target="_blank">网站建设&nbsp;&gt;</a>
                </h1>

                <ul class="y-clear">
                  <li class="y-left  even ">
                    <a href="https://market.aliyun.com/tpldns" target="_blank">模版建站</a>
                  </li>
                  <li class="y-left   ">
                    <a href="https://market.aliyun.com/products/52738005" target="_blank">企业官网</a>
                  </li>
                  <li class="y-left  even ">
                    <a href="https://market.aliyun.com/products/52750001/" target="_blank">商城网站</a>
                  </li>
                </ul>
              </li>
              <li>
                <h1>
                  <a href="https://wanwang.aliyun.com/domain/dns">域名解析&nbsp;&gt;</a>
                </h1>

                <ul class="y-clear">
                  <li class="y-left  even ">
                    <a href="https://wanwang.aliyun.com/domain/dns/">云解析DNS</a>
                  </li>
                  <li class="y-left   ">
                    <a href="https://www.aliyun.com/product/httpdns">HTTPDNS</a>
                  </li>
                </ul>
                <h1>
                  <a href="https://wanwang.aliyun.com/mail">阿里邮箱&nbsp;&gt;</a>
                </h1>

                <ul class="y-clear">
                  <li class="y-left  even ">
                    <a href="https://wanwang.aliyun.com/mail/">企业邮箱</a>
                  </li>
                  <li class="y-left   ">
                    <a href="https://www.aliyun.com/product/directmail">邮件推送</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

        </div>

        <!-- 解决方案 -->
        <div style="display: none;" class="menu-boxs" index="solution">
          <div class="cell-level2 clear-left" tpl-key="solution" tpl-type="tpl6"><span
            style="position: absolute;left: 0px">
            <ul class="ul-move level-2">
                <li index="0">行业解决方案</li>
                <li index="1">通用解决方案</li>
                <li index="2">大数据解决方案</li>
                <li index="3">DevOps解决方案</li>
                <li class="line" style="right: 0;"></li>
            </ul>
        </span>
            <div class="cell-detail" style="">
              <ul class="tpl6">

                <li>
                  <a href="https://www.aliyun.com/solution/ecommerce" target="_blank">
                    <h3>新零售解决方案</h3>
                    <p>快速搭建新零售平台，支持秒杀、视频直播等业务</p>
                  </a>
                  <div class="sub">
                    <ul class="y-clear">
                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/ecommerce/dataoperation" target="_blank">大数据运营</a></li>
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/ecommerce/https"
                                                                 target="_blank">全站HTTPS</a></li>
                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/ecommerce/imagesearch" target="_blank">以图搜图</a></li>
                    </ul>

                  </div>
                </li>

                <li>
                  <a href="https://www.aliyun.com/solution/game" target="_blank">
                    <h3>大游戏解决方案</h3>
                    <p>为手游/页游/端游开发者提供部署方案助力成长满足互联网金融/证券/银行/保险业务需求</p>
                  </a>

                  <div class="sub">
                    <ul class="y-clear">
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/game/mmo.html"
                                                                 target="_blank">MMO</a></li>
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/game/moba.html"
                                                                 target="_blank">MOBA</a></li>
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/game/mmoprg.html"
                                                                 target="_blank">MMORPG页游</a></li>
                    </ul>

                  </div>
                </li>

                <li>
                  <a href="https://www.aliyun.com/solution/media" target="_blank">
                    <h3>大视频解决方案</h3>
                    <p>一站式提供“海量存储、高效分发、极速网络”等强大服务</p>
                  </a>

                  <div class="sub">
                    <ul class="y-clear">
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/media/monitor"
                                                                 target="_blank">智能监控</a></li>
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/media/live"
                                                                 target="_blank">视频直播</a></li>
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/media/video"
                                                                 target="_blank">视频点播</a></li>
                    </ul>
                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/finance" target="_blank">
                    <h3>新金融解决方案</h3>
                    <p>满足互联网金融/证券/银行/保险业务需求</p>
                  </a>

                  <div class="sub">
                    <ul class="y-clear">
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/finance/p2p.html"
                                                                 target="_blank">互联网金融</a></li>
                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/finance/insuranceds" target="_blank">保险核心上云</a></li>
                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/finance/exchange/bijie" target="_blank">金融交易所上云</a></li>
                    </ul>

                  </div>
                </li>

                <li>
                  <a href="https://www.aliyun.com/solution/govcloud" target="_blank">
                    <h3>大政务解决方案
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>满足政府/交通/公安/税务局等业务需求</p>
                  </a>

                  <div class="sub">

                    <ul class="y-clear">

                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/govcloud/trafficbigdata.html" target="_blank">智慧交通大数据</a>
                      </li>

                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/govcloud/revenue.html" target="_blank">电子税务局</a></li>

                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/govcloud/vod.html" target="_blank">市民交通违法举报</a></li>

                    </ul>

                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/estate" target="_blank">
                    <h3>房地产解决方案
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>房地产+互联网大数据，助力房地产行业无限创新</p>
                  </a>
                  <div class="sub">

                    <ul class="y-clear">
                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/estate/exact-marketing" target="_blank">大数据营销</a></li>
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/estate/decision"
                                                                 target="_blank">土地投资决策</a></li>
                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/estate/smartpark"
                                                                 target="_blank">智能停车场</a></li>

                    </ul>

                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/energy" target="_blank">
                    <h3>新能源解决方案</h3>
                    <p>帮新运营商、服务商快速搭建标准化商业平台</p>
                  </a>

                  <div class="sub">
                    <ul class="y-clear">
                      <li style="width: 50%;"><a href="https://www.aliyun.com/solution/energy/rent_car" target="_blank">电动汽车分时租赁</a>
                      </li>
                      <li style="width: 50%;"><a href="https://www.aliyun.com/solution/energy/operation_car2"
                                                 target="_blank">充电桩运营</a></li>
                    </ul>

                  </div>
                </li>

                <li>
                  <a href="https://www.aliyun.com/solution/healthcare" target="_blank">
                    <h3>大健康解决方案
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>集合传统医疗优势，致力构建智能医疗云生态</p>
                  </a>

                  <div class="sub">
                    <ul class="y-clear">
                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/healthcare/Medical.html" target="_blank">互联网医疗</a></li>
                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/healthcare/image_cloud.html" target="_blank">影像云</a></li>
                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/healthcare/remote.html" target="_blank">远程医疗</a></li>
                    </ul>

                  </div>
                </li>

                <li>
                  <a href="https://www.aliyun.com/solution/web" target="_blank">
                    <h3>网站解决方案</h3>
                    <p>依据不同发展阶段，提供一站式建站方案</p>
                  </a>

                  <div class="sub">
                    <ul class="y-clear">
                      <li style="width: 50%;"><a
                        href="https://www.aliyun.com/solution/web/small.html?spm=5176.7996952.573293.1.DLGuBH"
                        target="_blank">小型网站</a></li>
                      <li style="width: 50%;"><a
                        href="https://www.aliyun.com/solution/web/normal.html?spm=5176.7996952.573293.2.DLGuBH"
                        target="_blank">中型网站</a></li>
                    </ul>

                  </div>
                </li>

                <li>
                  <a href="https://www.aliyun.com/solution/industry" target="_blank">
                    <h3>新制造解决方案
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>提供快速搭建一站式亿级设备接入、管理能力</p>
                  </a>

                  <div class="sub">
                    <ul class="y-clear">

                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/industry/equipment" target="_blank">智能设备互联</a></li>

                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/industry/light"
                                                                 target="_blank">光伏切片智能</a></li>

                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/industry/scada"
                                                                 target="_blank">工业控制scada</a></li>

                    </ul>

                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/iot" target="_blank">
                    <h3>大运输解决方案</h3>
                    <p>利用物联网及大数据的技术优势， 助力运输企业降本增效</p>
                  </a>

                  <div class="sub">

                    <ul class="y-clear">

                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/iot/vehicle"
                                                                 target="_blank">商用车联网</a></li>

                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/iot/routing"
                                                                 target="_blank">路径优化</a></li>

                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/transport/management.html" target="_blank">运输管理</a></li>

                    </ul>

                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/app" target="_blank">
                    <h3>移动APP解决方案</h3>
                    <p>轻松应对移动app爆发式增长</p>
                  </a>

                  <div class="sub">

                    <ul class="y-clear">

                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/app/security"
                                                                 target="_blank">移动安全</a></li>

                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/app/speedup"
                                                                 target="_blank">移动应用加速</a></li>

                      <li style="width: 33.333333333333336%;"><a href="https://www.aliyun.com/solution/app/httpdns"
                                                                 target="_blank">移动域名解析</a></li>

                    </ul>

                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/technology/new.html" target="_blank">
                    <h3>新技术解决方案</h3>
                    <p>提供“海量存储、高效分发、极速网络”等服务</p>
                  </a>

                  <div class="sub">
                    <ul class="y-clear">

                      <li style="width: 50%;"><a href="https://www.aliyun.com/solution/recovery" target="_blank">容灾</a>
                      </li>

                      <li style="width: 50%;"><a href="https://www.aliyun.com/solution/hcloud" target="_blank">混合云</a>
                      </li>

                    </ul>

                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/communication" target="_blank">
                    <h3>大传媒解决方案</h3>
                    <p>基于高性能基础架构，提供面向媒体行业的快速新闻生产、节目制作、专业直播等业务场景</p>
                  </a>

                  <div class="sub">


                    <ul class="y-clear">

                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/communication/mediapublic" target="_blank">媒体公共云</a></li>

                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/communication/mediaprivate" target="_blank">专有媒体云</a></li>

                      <li style="width: 33.333333333333336%;"><a
                        href="https://www.aliyun.com/solution/communication/live" target="_blank">专业直播</a></li>

                    </ul>

                  </div>
                </li>

              </ul>
            </div>


            <div class="cell-detail" style="display: none;">
              <ul class="tpl6">

                <li>
                  <a href="https://www.aliyun.com/solution/security" target="_blank">
                    <h3>安全解决方案</h3>
                    <p>多层防护+云端大数据，提供整套安全产品和服务</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/middleware" target="_blank">
                    <h3>企业互联网架构方案
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>经历阿里巴巴电商考验，助企业快速构建分布式应用</p>
                  </a>

                  <div class="sub">
                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/storage" target="_blank">
                    <h3>云存储解决方案</h3>
                    <p>解决海量数据存档/备份、加工，加速分发等问题</p>
                  </a>

                  <div class="sub">
                  </div>
                </li>


                <li>
                  <a href="http://www.aliyun.com/solution/enterprise/new" target="_blank">
                    <h3>央企采购电商解决方案
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>为企业提供集商流、物流、资金流三位一体的采购电商解决方案</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/corporatecloudnetwork" target="_blank">
                    <h3>企业级云上网络解决方案
                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">
                    </h3>
                    <p>帮助不同规模的用户搭建安全隔离的云上网络</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/dispatch" target="_blank">
                    <h3>智能配送调度解决方案</h3>
                    <p>高效高质输出运输方案，显著降低运输成本</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/vr">
                    <h3>
                      VR应用开发解决方案


                    </h3>
                    <p>便捷3D模型导入、ET语音交互</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/classifiedprotection.html" target="_blank">
                    <h3>
                      等级保护安全合规方案


                    </h3>
                    <p>建立等保合规生态，提供一站式等保合规方案</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>

              </ul>
            </div>


            <div class="cell-detail" style="display: none;">
              <ul class="tpl6">


                <li>
                  <a href="https://data.aliyun.com/solution/re" target="_blank">
                    <h3>
                      个性化推荐


                    </h3>
                    <p>根据用户行为，推荐用户感兴趣的信息和商品</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/base" target="_blank">
                    <h3>
                      大数据仓库


                    </h3>
                    <p>提供从数据采集、存储加工、管理等数仓解决方案</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/cdp" target="_blank">
                    <h3>
                      云上数据集成方案


                    </h3>
                    <p>提供可跨异构数据存储系统、安全可靠低成本</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/rp">
                    <h3>
                      路况预测


                    </h3>
                    <p>提供从5min到未来1h精准度92%的路况拥堵预测</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/tiqas" target="_blank">
                    <h3>
                      台风路径分析


                    </h3>
                    <p>判断台风未来的走向及汛情，帮助做出决策</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/dm" target="_blank">
                    <h3>
                      数字营销解决方案


                    </h3>
                    <p>帮助您从无到有快速搭建自有营销推广系统</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/industry" target="_blank">
                    <h3>
                      工业大数据服务解决方案


                    </h3>
                    <p>为工业客户提供基于人工智能的解决方案</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://data.aliyun.com/solution/cds" target="_blank">
                    <h3>
                      企业数据服务解决方案


                    </h3>
                    <p>多位交叉分析及智能算法</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/datawisdomtourism" target="_blank">
                    <h3>
                      智能旅游解决方案

                      <img style="width: 28px; margin-left: 2px;"
                           src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png">


                    </h3>
                    <p>通过大数据、人工智能为旅游行业提供解决方案</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>

              </ul>
            </div>


            <div class="cell-detail" style="display: none;">
              <ul class="tpl6">


                <li>
                  <a href="https://www.aliyun.com/solution/devops/yunxiao">
                    <h3>
                      企业效能解决方案


                    </h3>
                    <p>提升企业研发效能，降低研发成本</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>


                <li>
                  <a href="https://www.aliyun.com/solution/devops/opstools">
                    <h3>
                      开源自动化运维工具解决方案


                    </h3>
                    <p>实现基础设施管理和镜像制作</p>
                  </a>

                  <div class="sub">


                  </div>
                </li>

              </ul>
            </div>


          </div>
        </div>

        <!-- 云市场 -->
        <div style="display: none;" class="menu-boxs menu-boxs-market" index="market">
          <div class="cell-level2 clear-left" tpl-key="market" tpl-type="tpl2">
            <ul class="tpl2">

              <li>
                <h1>

                  <a href="https://market.aliyun.com/software" target="_blank">基础软件市场&nbsp;&gt;</a>

                </h1>
                <ul>


                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/53366009/#ymk=%7B%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0,%22categoryId%22:57742013%7D"
                      target="_blank">


                      预装操作系统

                    </a>
                  </li>


                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/53366009/#ymk=%7B%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0,%22categoryId%22:53448001%7D"
                      target="_blank">


                      预装开发语言环境

                    </a>
                  </li>


                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/53366009/#ymk=%7B%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0,%22categoryId%22:53616009%7D"
                      target="_blank">


                      预装建站系统

                    </a>
                  </li>


                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/53366009/#ymk=%7B%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0,%22categoryId%22:56024006%7D"
                      target="_blank">


                      数据库镜像软件

                    </a>
                  </li>


                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/53366009/#ymk=%7B%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0,%22categoryId%22:53690006%7D"
                      target="_blank">


                      运维工具

                    </a>
                  </li>


                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/53366009/#ymk=%7B%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0,%22categoryId%22:55530001%7D"
                      target="_blank">


                      应用开发工具

                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>
                  <a href="https://market.aliyun.com/jianzhan" target="_blank">网站建设&nbsp;&gt;</a>
                </h1>
                <ul>

                  <li class="">
                    <a href="https://market.aliyun.com/products/52738005" target="_blank">
                      企业官网定制
                    </a>
                  </li>
                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/52750001/?spm=5176.730005-52750001.313509.149.AH98VI#ymk=%7B%22categoryId%22:52750001,%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0%7D"
                      target="_blank">电商网站定制</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/tpldns" target="_blank">精美网站模板</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/marketing" target="_blank">推广与营销</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/52752001" target="_blank">手机网站定制</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/55514022" target="_blank">APP定制开发</a>
                  </li>
                </ul>
              </li>

              <li>
                <h1>
                  <a href="https://market.aliyun.com/enterprise" target="_blank">企业应用&nbsp;&gt;</a>
                </h1>
                <ul>
                  <li class="">
                    <a href="https://market.aliyun.com/eservice" target="_blank">公司/商标注册等服务</a>
                  </li>
                  <li class="">
                    <a href="https://promotion.aliyun.com/ntms/market/c-office.html?spm=5176.8142029.414693.20.GR0ks7"
                       target="_blank">阿里云办公</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56842010/?tag=&amp;keyword=&amp;saleMode="
                       target="_blank">销售管理</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56764034" target="_blank">财务管理</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56778013" target="_blank">协同办公</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56780006" target="_blank">人事管理</a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>
                  <a href="https://market.aliyun.com/service" target="_blank">服务与培训&nbsp;&gt;</a>
                </h1>
                <ul>
                  <li class="">
                    <a href="https://market.aliyun.com/products/?tag=环境配置" target="_blank">环境配置</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/?tag=阿里云产品培训" target="_blank">培训与认证</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/52732002" target="_blank">服务器代维</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/52738004" target="_blank">数据迁移</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/52740002" target="_blank">故障排查</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/solutions" target="_blank">行业解决方案</a>
                  </li>
                </ul>
              </li>

              <li>
                <h1><a href="https://market.aliyun.com/security" target="_blank">安全市场&nbsp;&gt;</a></h1>
                <ul>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56820014" target="_blank">网络安全</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56832023" target="_blank">主机安全</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56846020" target="_blank">应用安全</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56824015" target="_blank">数据安全</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/56830014" target="_blank">安全管理</a>
                  </li>
                  <li class="">
                    <a href="https://market.aliyun.com/products/57004003" target="_blank">安全服务</a>
                  </li>

                </ul>
              </li>

              <li>
                <h1><a href="https://market.aliyun.com/data" target="_blank">API市场&nbsp;&gt;</a></h1>
                <ul>
                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/56928004?spm=5176.78296.419699.1.LgXe83#ymk=%7B%22categoryId%22:57000002,%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0%7D"
                      target="_blank">金融理财</a>
                  </li>
                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/56928004?spm=5176.78296.419699.4.LgXe83#ymk=%7B%22categoryId%22:56928004,%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0%7D"
                      target="_blank">电子商务</a>
                  </li>
                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/56956004/?spm=5176.78296.419699.7.LgXe83#ymk=%7B%22categoryId%22:57124001,%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0%7D"
                      target="_blank">人工智能</a>
                  </li>
                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/56956004/?spm=5176.78296.419699.10.LgXe83#ymk=%7B%22categoryId%22:57126001,%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0%7D"
                      target="_blank">生活服务</a>
                  </li>
                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/56928004?spm=5176.78296.419699.13.LgXe83#ymk=%7B%22categoryId%22:57002002,%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0%7D"
                      target="_blank">交通地理</a>
                  </li>
                  <li class="">
                    <a
                      href="https://market.aliyun.com/products/56928005?spm=5176.78296.419699.19.LgXe83#ymk=%7B%22categoryId%22:56928005,%22pageIndex%22:1,%22pageSize%22:10,%22saleMode%22:0%7D"
                      target="_blank">企业管理</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <!-- 社区 -->
        <div style="display: none;" class="menu-boxs menu-boxs-community" index="community">
          <div class="cell-level2 clear-left" tpl-key="community" tpl-type="tpl2">
            <ul class="tpl2">

              <li>
                <h1><a href="https://yq.aliyun.com/articles" target="_blank">博客&nbsp;&gt;</a></h1>
                <ul>
                  <li class="">
                    <a href="https://yq.aliyun.com/articles" target="_blank">个人博客</a>
                  </li>
                  <li class="">
                    <a href="https://yq.aliyun.com/teams" target="_blank">公众号</a>
                  </li>
                </ul>
              </li>

              <li>
                <h1>
                  <a href="https://bbs.aliyun.com" target="_blank">论坛&nbsp;&gt;</a>
                </h1>
                <ul>
                  <li class="">
                    <a href="https://bbs.aliyun.com/fourms.php?m=bbs&amp;cateid=33" target="_blank">产品讨论</a>
                  </li>
                  <li class="">
                    <a href="https://bbs.aliyun.com/fourms.php?&amp;m=bbs&amp;cateid=228" target="_blank">开发者中心</a>
                  </li>
                  <li class="">
                    <a href="https://bbs.aliyun.com/thread/235.html" target="_blank">新手帮帮团</a>
                  </li>
                  <li class="">
                    <a href="https://bbs.aliyun.com/thread/217.html" target="_blank">域名交易专区</a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>
                  <a href="https://yq.aliyun.com/ask" target="_blank">问答&nbsp;&gt;</a>
                </h1>
                <ul>
                  <li class="">
                    <a href="https://yq.aliyun.com/ask" target="_blank">热门问答</a>
                  </li>

                  <li class="">
                    <a href="https://yq.aliyun.com/ask/type_tech" target="_blank">通用技术</a>
                  </li>


                  <li class="">
                    <a href="https://yq.aliyun.com/ask/type_aliyun" target="_blank">
                      产品求助
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>
                  <a href="https://yq.aliyun.com/edu/lesson" target="_blank">云课堂&nbsp;&gt;</a>
                </h1>
                <ul>
                  <li class="">
                    <a href="https://yq.aliyun.com/edu/lessonTagSearch/cid_695-tagid_14065" target="_blank">云栖直播</a>
                  </li>
                  <li class="">
                    <a href="https://yq.aliyun.com/edu/lessonTagSearch/cid_14053" target="_blank">产品学习</a>
                  </li>
                  <li class="">
                    <a href="http://yq.aliyun.com/edu/lessonTagSearch/cid_14061" target="_blank">开发技术</a>
                  </li>

                </ul>
              </li>
            </ul>
          </div>
        </div>

        <!-- 支持 -->
        <div style="display: none;" class="menu-boxs" index="support">
          <div class="cell-level2 clear-left" tpl-key="support" tpl-type="tpl5">
            <ul class="tpl5">

              <li>
                <h1>支持计划</h1>
                <ul>
                  <li>
                    <a href="https://www.aliyun.com/support/techsupport">售后支持计划</a>
                  </li>
                  <li>
                    <a href="https://www.aliyun.com/support/service/list">尊享服务</a>
                  </li>
                  <li>
                    <a href="https://www.aliyun.com/support/quyu">区域服务</a>
                  </li>
                  <li>
                    <a href="https://www.aliyun.com/support/jpfw">金牌服务</a>
                  </li>
                </ul>
              </li>

              <li>
                <h1>
                  <a href="https://help.aliyun.com">帮助与文档&nbsp;&gt;</a>
                </h1>
                <ul>
                  <li>
                    <a href="https://help.aliyun.com">文档</a>
                  </li>
                  <li>
                    <a href="https://help.aliyun.com/contact/school.htm">新手学堂</a>
                  </li>
                  <li>
                    <a href="https://help.aliyun.com/contact/service.htm">自助工具</a>
                  </li>
                  <li>
                    <a href="https://cloudshare.aliyun.com/"><span>云享<img
                      src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></span></a>
                  </li>
                </ul>
              </li>

              <li>
                <h1>智能服务</h1>
                <ul>
                  <li>
                    <a href="https://www.aliyun.com/support/drcloud" target="_blank">云博士</a>
                  </li>
                  <li>
                    <a href="https://www.aliyun.com/product/sca">智能对话分析服务</a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>开发者资源</h1>
                <ul>
                  <li>
                    <a href="https://develop.aliyun.com/devops">DevOps解决方案</a>
                  </li>
                  <li>
                    <a href="https://develop.aliyun.com/tools#sdk">SDK
                    </a>
                  </li>
                  <li>
                    <a href="https://develop.aliyun.com/tools#api">API</a>
                  </li>
                  <li>
                    <a href="https://develop.aliyun.com/tools#tool">开发者工具</a>
                  </li>
                  <li>
                    <a href="https://www.aliyun.com/api/"><span>API市场<img
                      src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></span></a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>建议反馈</h1>
                <ul>
                  <li>
                    <a href="https://connect.aliyun.com" target="_blank">提交建议</a>
                  </li>
                  <li>
                    <a href="https://promotion.aliyun.com/ntms/act/halloffame/detail.html">
                      <span>贡献者榜单<img src="//img.alicdn.com/tps/TB1pS2YMVXXXXcCaXXXXXXXXXXX-56-24.png"></span>
                    </a>
                  </li>

                </ul>
              </li>

            </ul>
          </div>
        </div>

        <!-- 更多 -->
        <div style="padding-left: 180px; display: none;" class="menu-boxs menu-boxs-more" index="more">
          <span style="position: absolute;left: 0;display: inline-block;">
            <ul class="ul-move level-1">
              <li index="0">重要通道</li>
              <li index="1">教育与创业孵化</li>
              <li index="2">合作与生态</li>
              <li class="line"></li>
            </ul>
           </span>

          <div class="cell-level2" tpl-key="more_passageway" tpl-type="tpl3">
            <ul class="tpl3">
              <li>
                <h1>重要频道</h1>
                <ul>
                  <li class="">
                    <a href="https://wanwang.aliyun.com/">
                      万网
                    </a>
                  </li>


                  <li class="">
                    <a href="https://yundun.aliyun.com">
                      云盾
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/chinaglobal/home">
                      阿里云全球频道
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/aliware">
                      企业级互联网架构 Aliware
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/solution/dedicatedcloud">
                      阿里云专有云
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/about/global">
                      基础设施
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/price">
                      定价
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/customer/">
                      客户案例
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>
                  快速入口
                </h1>
                <ul>


                  <li class="">
                    <a href="https://beian.aliyun.com/">
                      备案
                    </a>
                  </li>


                  <li class="">
                    <a href="https://mail.aliyun.com/" target="_blank">
                      阿里邮箱
                    </a>
                  </li>


                  <li class="">
                    <a href="https://promotion.aliyun.com/ntms/mobile.html" target="_blank">
                      手机APP
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/product/newedtion">

                      新产品发布台

                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/support/openlab" target="_blank">
                      开放实验室
                    </a>
                  </li>


                  <li class="">
                    <a href="https://brand.aliyun.com/" target="_blank">
                      阿里云品牌形象专区
                    </a>
                  </li>


                  <li class="">
                    <a href="https://connect.aliyun.com/" target="_blank">
                      提交建议
                    </a>
                  </li>

                </ul>
              </li>

            </ul>
          </div>

          <div class="cell-level2" style="display: none;" tpl-key="more_education" tpl-type="tpl3">
            <ul class="tpl3">

              <li>
                <h1>
                  <a href="https://chuangke.aliyun.com">阿里巴巴创新中心&nbsp;&gt;</a>
                </h1>
                <ul>


                  <li class="">
                    <a href="https://chuangke.aliyun.com/markets/aliyun/surpportive">
                      创业扶持-风池计划
                    </a>
                  </li>


                  <li class="">
                    <a href="https://chuangke.aliyun.com/finance">
                      融资申请
                    </a>
                  </li>


                  <li class="">
                    <a href="https://chuangke.aliyun.com/incubator">

                      孵化园/园区入驻

                    </a>
                  </li>


                  <li class="">
                    <a href="https://chuangke.aliyun.com/college">
                      创业大学
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>
                  云栖小镇
                </h1>
                <ul>


                  <li class="">
                    <a href="https://chuangke.aliyun.com/markets/aliyun/taofuchengzhen">
                      淘富成真
                    </a>
                  </li>


                  <li class="">
                    <a href="https://chuangke.aliyun.com/markets/aliyun/taofumeeting">
                      淘富成真见面会
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>

                  <a href="https://www.aliyun.com/support/training">培训认证&nbsp;&gt;</a>

                </h1>
                <ul>


                  <li class="">
                    <a href="https://www.aliyun.com/support/video">
                      视频课程
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/support/courses">
                      培训课程
                    </a>
                  </li>


                  <li class="">
                    <a href="https://www.aliyun.com/support/certification">
                      考试认证
                    </a>
                  </li>

                </ul>
              </li>

            </ul>
          </div>

          <div class="cell-level2" style="display: none;" tpl-key="more_ecology" tpl-type="tpl3">
            <ul class="tpl3">

              <li>
                <h1>云合作</h1>
                <ul>
                  <li class="">
                    <a href="https://partner.aliyun.com">加入合作伙伴</a>
                  </li>

                  <li class="">
                    <a href="https://partner.aliyun.com/shumeng">数梦工场合作</a>
                  </li>
                  <li class="">
                    <a href="https://promotion.aliyun.com/ntms/yunparter/zhaomu.html">加入阿里云推广大使</a>
                  </li>
                </ul>
              </li>

              <li>
                <h1>&nbsp;</h1>
                <ul>
                  <li class="">
                    <a href="https://promotion.aliyun.com/ntms/act/aliyun/cps.html">
                      CPS推广合作
                    </a>
                  </li>


                  <li class="">
                    <a href="https://open.alipay.com/platform/home.htm?from=aliyunshengtai20160825">
                      蚂蚁金服开放合作
                    </a>
                  </li>

                </ul>
              </li>

              <li>
                <h1>云扶持</h1>
                <ul>
                  <li class="">
                    <a href="https://promotion.aliyun.com/ntms/csr.html">
                      公益扶持
                    </a>
                  </li>


                  <li class="">
                    <a href="https://promotion.aliyun.com/ntms/campus2017.html">
                      学生扶持
                    </a>
                  </li>


                  <li class="">
                    <a href="http://dai.aliloan.com/aliyun.html" target="_blank">
                      企业小额贷款
                    </a>
                  </li>

                </ul>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>
<style>
  @import "../../../assets/css/mainMenu.css"
</style>
