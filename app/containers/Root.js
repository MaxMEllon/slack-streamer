import React, { Component } from 'react'
import { Provider } from 'react-redux'
import CommentStream from './CommentStream'

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <CommentStream />
      </Provider>
    )
  }
}
