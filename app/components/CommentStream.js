import React from 'react'
import styled from 'styled-components'

import Comment from './Comment'

const List = styled.div`
  width: 100%;
  height: 100%:
`

export default function commentStream({ comments }) {
  return (
    <List>{comments.map((c, index) => <Comment key={index} index={index} comment={c} />)}</List>
  )
}
