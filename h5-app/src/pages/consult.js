import React, {Component} from 'react'
import Title from './../components/title'
import Content from './../components/content'
import Tags from './../components/tags'
import * as api from './../api'
import {Toast, Modal} from 'antd-mobile'

class Consult extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount () {
    this.initData()
  }

  initData () {
    Toast.loading('loading...', 0)
    let params = this.props.match.params
    api.article({articleId: params.id}).then(response => {
      let data = response.data.data
      this.setState({...data})
    }).catch(e => {
      Modal.alert('提示', e.response.data.message)
    }).finally(() => {
      Toast.hide()
    })
  }

  render() {
    return (
      <div className="container">
        <Title title={this.state.title}
               author={this.state.author}
               mediaPlatform={this.state.mediaPlatform}
               modifyTime={this.state.modifyTime}/>
        {this.state.content ? <hr className="hr"/> : ''}
        <Content content={this.state.content}/>
        <Tags tag={this.state.tag}/>
      </div>
    )
  }
}

export default Consult