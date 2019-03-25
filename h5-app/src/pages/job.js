import React, {Component} from 'react'
import {Toast, Tag} from 'antd-mobile'
import * as api from './../api'
import {Modal} from 'antd-mobile/lib/index'
import GMap from './../components/GMap'
import axios from 'axios'
import Qs from 'qs';

class Job extends Component {
  constructor(props) {
    super(props)
    this.state = {
      job: []
    }
    this.openMap = this.openMap.bind(this)
  }

  componentDidMount () {
    window.document.title = '招聘详情'
    this.initData()
    

    // var instanceAxios = axios.create({
    //   baseURL: '',
    //   timeout: 1000,
    //   headers: {'X-Custom-Header': 'foobar'},
    //   withCredentials: false,
    // });
   
    
  }


  configWx(resData){
    const url = window.location.href
    axios.defaults.withCredentials = false
    axios({
      method: 'post',
      url: 'http://www.qthmedia.com/wiki/index.20190312.php?api-wxsharetoken',
      data: Qs.stringify({
        posturl: window.location.href
      })
    }).then( res => {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名
        jsApiList: ['onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo', 'openLocation'] // 必填，需要使用的JS接口列表
    });

      window.wx.ready(function () {
        var shareData = {
          title: `${resData.jobVacancy}`,
          desc:  `${resData.responsibilities}`,
          link: url,
          imgUrl: 'http://qfnapp.qtbigdata.com/ic_icon.png',
          success: function () {
            //这是成功的回调

          }
        };
          
          
        window.wx.onMenuShareAppMessage(shareData);
        window.wx.onMenuShareTimeline(shareData);
        window.wx.onMenuShareQQ(shareData);
    });
  }).catch( err => {
    console.log('err', err)
  })
  }
  

  initData () {
    Toast.loading('loading...', 0)
    let params = this.props.match.params
    if (!params.id) params.id = 1249
    api.getPreRecruitmentById({id: params.id}).then(response => {
      let job = this.getJobMessage(response.data.data)
      let data = response.data.data
      if (data) {
        this.setState({...data, job})
        window.document.title = data.jobVacancy;
        this.configWx(data)
        // this.openMap(data)
        this.getMapSrc(data)
      } else {
        Modal.alert('提示', '没有数据')
      }
    }).catch(e => {
      Modal.alert('提示', e.message)
    }).finally(() => {
      Toast.hide()
    })
  }

  getMapSrc(dataRes){
    const mapArr = dataRes.jobAddrMap || '120.19,30.26'
    let coo = mapArr.split(',').map(c => parseFloat(c))
    let center = {longitude: coo[0], latitude: coo[1]}
    let imgSrc = 'https://restapi.amap.com/v3/staticmap?'
    imgSrc += `&location=${coo[0]},${coo[1]}`
    imgSrc += '&zoom=14'
    imgSrc += '&size=750*300'
    imgSrc += `&markers=mid,,A:${coo[0]},${coo[1]}`
    imgSrc += '&key=0e4a5e7bf803339ae5ee10dd52210511'
    this.setState({
      key: '22ec7787481fea9f2192ba74ad6ea097',
      version: '1.4.13',
      zoom: 17,
      resizeEnable: true,
      center: center,
      // content: `<div><h4>地址</h4><p>This is content of this info window</p></div>`,
      size: { width: 300, height: 200 },
      offset: [0, 0],
      src: imgSrc
    })
  }

  getJobMessage (data) {
    let job = []
    if (data.facturer) job.push({name: '公司名称', value: data.facturer})
    if (data.jobType) job.push({name: '职位类型', value: data.jobType})
    if (data.publishDate) job.push({name: '发布时间', value: data.publishDate})
    if (data.effectiveDate) job.push({name: '有效时间', value: data.effectiveDate})
    if (data.ageRequirement) job.push({name: '基本要求', value: data.ageRequirement})
    if (data.jobAddrArea) job.push({name: '工作地点', value: data.jobAddrArea})
    if (data.companyWelfare) job.push({name: '福利待遇', value: data.companyWelfare})
    if (data.responsibilities) job.push({name: '岗位要求', value: data.responsibilities})
    return job
  }

  openMap(){
    const jobAddrMapStr = this.state.jobAddrMap ? this.state.jobAddrMap : '120.19,30.26'
    const latLog = jobAddrMapStr.split(',')
    window.wx.openLocation({
      latitude: parseFloat(latLog[1]), // 纬度，浮点数，范围为90 ~ -90
      longitude: parseFloat(latLog[0]), // 经度，浮点数，范围为180 ~ -180。
      name: this.state.jobAddrArea, // 位置名
      address: this.state.jobAddr, // 地址详情说明
      scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
  });
  }

  render() {
    let tels = this.state.facturerTel
      ? (this.state.facturerTel.includes('/')
        ? this.state.facturerTel.split('/')
        : [this.state.facturerTel]) : []
    return (
      <div className="job">
        <div className="container">
          <h1 className="job-title flex-row">
            <b>{this.state.jobVacancy}</b>
            {this.state.salary ? <b>{this.state.salary}<small /></b> : ''}
          </h1>
          <div className="short-msg flex-row">
            {this.state.jobAddr ? <Tag>{this.state.jobAddr}</Tag> : ''}
            {this.state.workExperience ? <Tag>{this.state.workExperience}</Tag>: ''}
            {this.state.education ? <Tag>{this.state.education}</Tag> : ''}
            {this.state.recruitsPeople? <Tag>{this.state.recruitsPeople}</Tag> : ''}
          </div>
          <table className="job">
            <tbody>
              {this.state.job.map((j, key) =>
                <tr key={key}>
                  <td>{`${j.name}:`}
                    <div className="item-div" dangerouslySetInnerHTML={{__html: j.value}}/>
                  </td>
                </tr>)}
            </tbody>
          </table>
          {this.state.jobAddr ? <h2 className="addr">{this.state.jobAddr}</h2> : ''}
          {this.state.jobAddrMap ?
          <div style={{marginBottom: `${(tels.length * 1.5)}rem`}}>
          <div className="map" onClick={this.openMap} >
        <img alt="地图" src={this.state.src}/>
      </div>
            {/* <GMap jobAddrMap={this.state.jobAddrMap} onClick={this.openMap} /> */}
          </div>
          : ''}
        </div>
        {tels.length > 0 ?
          <ul className="tel">
            {tels.map((t, key) =>
              <li key={key}><span>{t}</span><a className="tel-phone" href={'tel:' + t}>马上联系</a></li>)}
          </ul> : ''}
      </div>
    )
  }
}

export default Job