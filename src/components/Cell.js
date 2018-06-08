import React from 'react'

const stylize = (props, state) => ({
  cell: {
    height: '10px',
    width: '10px',
    border: '1px solid black'
  },
  snake: {
    height: '10px',
    width: '10px',
    backgroundColor: 'green',
    border: '1px solid black'
  },
  snakeHead: {
    height: '10px',
    width: '10px',
    backgroundColor: 'darkgreen',
    border: '1px solid black'
  }
})

const Cell = (props) => (
  <div style={isSnake(props)}></div>
)

const isSnake = (props) => {
  console.log(props);
  for (let _i = 0; _i < props.snake.length; _i++) {
    if (props.y === props.snake[_i].y
      && props.x === props.snake[_i].x) {
        if (_i === props.snake.length - 1) {
          return stylize(props).snakeHead
      }
      return stylize(props).snake
    } else {
      return stylize(props).cell
    }
  }
}

export default Cell
