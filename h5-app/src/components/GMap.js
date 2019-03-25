import React, { Component } from 'react'

export default class GMap extends Component {
constructor(props){
  super(props)
  this.openMap = this.openMap.bind(this)
}

  openMap(data){

  }

  componentWillMount () {
    let coo = this.props.jobAddrMap.split(',').map(c => parseFloat(c))
    let center = {longitude: coo[0], latitude: [1]}
    let imgSrc = 'https://restapi.amap.com/v3/staticmap?'
    imgSrc += `&location=${coo[0]},${coo[1]}`
    imgSrc += '&zoom=12'
    imgSrc += '&size=750*300'
    imgSrc += `&markers=mid,,A:${coo[0]},${coo[1]}`
    imgSrc += '&key=0e4a5e7bf803339ae5ee10dd52210511'
    this.setState({
      key: '22ec7787481fea9f2192ba74ad6ea097',
      version: '1.4.13',
      zoom: 17,
      resizeEnable: true,
      center: center,
      content: `<div><h4>地址</h4><p>This is content of this info window</p></div>`,
      size: { width: 300, height: 200 },
      offset: [0, 0],
      src: imgSrc
    })
  }

  render() {
    return (
      <div className="map" >
        <img alt="地图" src={this.state.src}/>
      </div>
    )
  }
}
