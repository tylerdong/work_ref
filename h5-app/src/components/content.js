import React, {Component} from 'react'

export default class Content extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="content" dangerouslySetInnerHTML={{__html: this.props.content}}/>
    )
  }
}