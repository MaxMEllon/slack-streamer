import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import { connect } from 'react-redux'
import { receiveComment } from '../actions'

import CommentStreamComponent from '../components/CommentStream'

class CommentStream extends Component {
  async componentDidMount() {
    await ipcRenderer.send('boot', 'ping')
    ipcRenderer.on('message', (e, args) => {
      console.log(args)
      this.props.receiveComment(args)
    })
  }

  render() {
    return <CommentStreamComponent comments={this.props.comments} />
  }
}

export default connect(
  state => ({ comments: state.comments }),
  { receiveComment }
)(CommentStream)
