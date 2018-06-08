import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Cell from 'components/Cell'
import { getRandomByRatio } from 'store/ducks/inputs';
import { hasHit } from 'store/ducks/inputs';
import { hasEat } from 'store/ducks/inputs';

const stylize = (props, state) => ({
  row: {
    display: 'flex',
  }
})

const ESCAPE_KEY = 27;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

let INTERVAL = 1000;
let GAME;

class Grid extends PureComponent {

  constructor(props) {
    super(props);
  }

  _isOpposite(keydown, props) {
    switch (keydown) {
      case UP:
        return props.lastKeyDown === DOWN;
      case DOWN:
        return props.lastKeyDown === UP;
      case LEFT:
        return props.lastKeyDown === RIGHT;
      case RIGHT:
        return props.lastKeyDown === LEFT;
      default:
        return false;
    }
  }

  _handleKeyDown(event) {
    // console.log(this.props);
    if (!this._isOpposite(event.keyCode, this.props)) {
      this.props.onInput(event.keyCode);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
    GAME = setInterval(this.gameHandler.bind(this), INTERVAL)
  }

  gameHandler() {
    if (getRandomByRatio([{ v: true, r: 0.1 }, { v: false, r: 0.9 }])) {
      const _pos = {
        x: Math.floor(Math.random() * (this.props.rows + 1)),
        y: Math.floor(Math.random() * (this.props.columns + 1))
      };
      this.props.spawnItem(_pos);
    }
    const head = this.props.snake[this.props.snake.length - 1];
    const _axe = (this.props.lastKeyDown === UP || this.props.lastKeyDown === DOWN ? 'x' : 'y');
    const _direction = (this.props.lastKeyDown === DOWN || this.props.lastKeyDown === RIGHT ? 1 : -1);
    const _newHead = { ...head, [_axe]: head[_axe] + _direction };
    if (hasHit(_newHead, this.props)) {
      console.log('GAME OVER');
      clearInterval(GAME);
    } else {
      const _eaten = hasEat(_newHead, [...this.props.item]);
      if (_eaten) {
        console.log('eaten', _eaten);
        this.props.onEat(_eaten);
      } else {
        this.props.onUpdate({ ...head, [_axe]: head[_axe] + _direction }, hasEat);
      }
      if (INTERVAL > 100) {
        if (this.props.score > 0 && this.props.score % 100 === 0) {
          INTERVAL = INTERVAL - 50 >= 100 ? INTERVAL - 50 : 100;
          clearInterval(GAME);
          console.log(INTERVAL);
          GAME = setInterval(this.gameHandler.bind(this), INTERVAL)
        }

      }
    }
  }

  render() {
    const styles = stylize(this.props, this.state)
    const { rows, columns } = this.props
    return (
      <div>
        {
          Array(rows)
            .fill(true)
            .map((foo, x) => (
              <div key={`rows-${x}`} style={styles.row}>
                {Array(columns).fill(true).map((bar, y) => <Cell key={`cell-${x}-${y}`} x={x} y={y} snake={this.props.snake} item={this.props.item}/>)}
              </div>
            ))
        }
        <pre>{this.props.score}</pre>
      </div>
    )
  }
}

Grid.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  spawnItem: PropTypes.func.isRequired,
  onEat: PropTypes.func.isRequired
}

export default Grid
