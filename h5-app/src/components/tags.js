import React, { Component } from 'react'

export default class Tags extends Component {
    render() {
        let tags = ''
        if (this.props.tag && this.props.tag.length > 0) {
            tags = this.props.tag.split(',').map((tag, index) => {
                return <span key={index}>{tag}</span>
            })
        }
        return <div className="tags">{tags}</div>
    }
}
