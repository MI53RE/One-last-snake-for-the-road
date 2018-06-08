import React from 'react'

const stylize = (props, state) => ({
  cell: {
    height: '20px',
    width: '20px',
    border: '1px solid black'
  },
  snake: {
    height: '20px',
    width: '20px',
    fontSize: '15px',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'green',
    padding: '0',
    margin: '0',
    border: '1px solid blue'
  },
  snakeHead: {
    height: '20px',
    width: '20px',
    backgroundColor: 'darkgreen',
    border: '1px solid green'
  }
})

const Cell = (props) => {
  return (
  <div style={isSnake(props)}>{isNotEmpty(props)}</div>
)}

const isSnake = (props) => {
  for (let _i = 0; _i < props.snake.length; _i++) {
    if (props.y === props.snake[_i].y
      && props.x === props.snake[_i].x) {
      if (_i < props.snake.length - 1) {
        return stylize(props).snake
      }
      return stylize(props).snakeHead
    }
  }
  return stylize(props).cell
}
const isNotEmpty = (props) => {
  for (let _i = 0; _i < props.snake.length; _i++) {
    if (props.y === props.snake[_i].y
      && props.x === props.snake[_i].x) {
      if (_i < props.snake.length - 1) {
        return `❄`
      }
    }
  }
  for (let _j = 0; _j < props.item.length; _j++) {
    if (props.y === props.item[_j].y
      && props.x === props.item[_j].x) {
      return props.item[_j].data['symbole'];
    }
  }
}



export default Cell
