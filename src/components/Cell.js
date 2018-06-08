import React from 'react'

const stylize = (props, state) => ({
  cell: {
    height: '10px',
    width: '10px',
    border: '1px solid black'
  }
})

const Cell = (props) => (
  <div style={stylize(props).cell}></div>
)

export default Cell
