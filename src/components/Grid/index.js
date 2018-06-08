import { connect } from 'react-redux'
import Grid from './presentational'
import { setSnake } from 'store/ducks/inputs';
import { setInput } from 'store/ducks/inputs';
import { spawnItem } from 'store/ducks/inputs';
import { eatItem } from 'store/ducks/inputs';

const mapStateToProps = (state) => ({
  rows: state.options.rows,
  columns: state.options.columns,
  snake: state.inputs.snake,
  score: state.inputs.score,
  itemsEaten: state.inputs.itemsEaten,
  difficulty: state.inputs.difficulty,
  interval: state.inputs.interval,
  item: state.inputs.item,
  lastKeyDown: state.inputs.lastKeyDown,
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (snake) => dispatch(setSnake(snake)),
  onInput: (keyCode) => dispatch(setInput(keyCode)),
  spawnItem: (keyCode) => dispatch(spawnItem(keyCode)),
  onEat: (item) => dispatch(eatItem(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Grid)
