import React, {Component} from 'react'
import {dateFormat} from '../module/common'

export default class Title extends Component {
  render() {
    return (
      <div className="head">
        <h1 className="title font-title">{this.props.title}</h1>
        <div>
          {this.props.mediaPlatform ? <span className="">{this.props.mediaPlatform}</span> : ''}
          {this.props.author ? <span className="">{this.props.author}</span> : ''}
          <span className="time">{dateFormat(this.props.modifyTime, 'YYYY/MM/DD')}</span>
        </div>
      </div>
    )
  }
}