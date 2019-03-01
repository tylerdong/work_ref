import React, {Component} from 'react'
import {Toast, Tag} from 'antd-mobile'
import * as api from './../api'
import {Modal} from 'antd-mobile/lib/index'
import GMap from './../components/GMap'
import {dateFormat} from './../module/common'

class Job extends Component {
  constructor() {
    super()
    this.state = {
      job: []
    }
  }

  componentDidMount () {
    this.initData()
  }

  initData () {
    Toast.loading('loading...')
    let params = this.props.match.params
    if (!params.id) params.id = 1249
    api.getPreRecruitmentById({id: params.id}).then(response => {
      let job = this.getJobMessage(response.data.data)
      let data = response.data.data
      if (data) {
        this.setState({...data, job})
      } else {
        Modal.alert('提示', '没有数据')
      }
    }).catch(e => {
      Modal.alert('提示', e.message)
    }).finally(() => {
      Toast.hide()
    })
  }

  getJobMessage (data) {
    let job = []
    if (data.jobType) job.push({name: '职位类型', value: data.jobType})
    if (data.gmtCreate) job.push({name: '发布时间', value: this.dateFormat(data.gmtCreate, 'YYYY/MM/DD')})
    if (data.effectiveDate) job.push({name: '有效时间', value: this.dateFormat(data.effectiveDate, 'YYYY/MM/DD')})
    if (data.ageRequirement) job.push({name: '基本要求', value: data.ageRequirement})
    if (data.jobAddrArea) job.push({name: '工作地点', value: data.jobAddrArea})
    if (data.welfare) job.push({name: '福利待遇', value: data.welfare})
    if (data.responsibilities) job.push({name: '岗位要求', value: data.responsibilities})
    return job
  }

  render() {
    let tels = this.state.facturerTel ? (this.state.facturerTel.includes('/') ? this.state.facturerTel.split('/') : [this.state.facturerTel]) : []
    return (
      <div className="job">
        <div className="container">
          <h1 className="job-title flex-row">
            <b>{this.state.jobVacancy}</b>
            {this.state.salary ? <b>{this.state.salary}<small>元/月</small></b> : ''}
          </h1>
          <div className="short-msg flex-row">
            {this.state.jobAddr ? <Tag>{this.state.jobAddr}</Tag> : ''}
            {this.state.workExperience ? <Tag>{this.state.workExperience}</Tag>: ''}
            {this.state.education ? <Tag>{this.state.education}</Tag> : ''}
            {this.state.recruitsPeople? <Tag>{this.state.recruitsPeople}</Tag> : ''}
          </div>
          <table className="job">
            <tbody>
              {this.state.job.map((j, key) => <tr key={key}><td>{`${j.name}:`}<div className="item-div" dangerouslySetInnerHTML={{__html: j.value}}/></td></tr>)}
            </tbody>
          </table>
        </div>
        {this.state.jobAddrMap ? <div className="map-div">
          {this.state.jobAddr ? <h2 className="addr">{this.state.jobAddr}</h2> : ''}
          <GMap jobAddrMap={this.state.jobAddrMap}/>
          {tels.length > 0
            ? tels.map((t, key) => <ul className="tel" key={key}><li><span>{t}</span><a className="tel-phone" href={'tel:' + t}>马上联系</a></li></ul>)
            : ''}
        </div> : ''}
      </div>
    )
  }
}

export default Job