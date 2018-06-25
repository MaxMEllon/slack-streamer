import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  color: pink;
  animation: moveToLeft 35s linear 0s 1;
  position: absolute;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  text-shadow: 1px -1px gray;
  top: calc(${({ index }) => (index * 10) % 100}vh);
  height: 10vh;
  font-size: 7vh;
  line-height: 10vh;
  width: 500vw;
  left: -100%;
  @keyframes moveToLeft {
    0% {
      left: 100%;
    }
    100% {
      left: -300vw;
    }
  }
`

export default function Comment({ comment, index }) {
  return <Box index={index}>{comment.text}</Box>
}
