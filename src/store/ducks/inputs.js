// Actions
export const SET_INPUT = 'OneLastSnakeForTheRoad/INPUTS/SET_INPUT'
export const SET_SNAKE = 'OneLastSnakeForTheRoad/INPUTS/SET_SNAKE'
export const SPAWN_ITEM = 'OneLastSnakeForTheRoad/INPUTS/SPAWN_ITEM'
export const EAT_ITEM = 'OneLastSnakeForTheRoad/INPUTS/EAT_ITEM'


const ESCAPE_KEY = 27;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

const PIZZA = {
  value: 10,
  symbole: `🍕`
}
const CHOCOLATE = {
  value: 50,
  symbole: `🍫`
}
const DIAMOND = {
  value: 100,
  symbole: `💎`
}

// Reducer
const initial = {
  lastKeyDown: DOWN,
  lastDirection: DOWN,
  direction: [DOWN],
  score: 0,
  itemsEaten: 0,
  difficulty: 0,
  interval: 1000,
  snake: [
    {
      x: 3,
      y: 5
    },
    {
      x: 4,
      y: 5
    },
    {
      x: 5,
      y: 5
    }
  ],
  item: [
    {
      x: 3,
      y: 2,
      data: {
        value: 10,
        symbole: `🍕`
      }
    },
    {
      x: 3,
      y: 3,
      data: {
        value: 50,
        symbole: `🍫`
      }
    },
    {
      x: 3,
      y: 4,
      data: {
        value: 100,
        symbole: `💎`
      }
    },
  ]
};

export default function reducer(state = initial, action = {}) {
  // console.log(action);
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        lastKeyDown : action.keyCode
      }
    case SET_SNAKE:
      const snake = state.snake.concat(action.snake);
      snake.shift();
      return {
        ...state,
        snake: snake
      }
    case SPAWN_ITEM:
      const item = state.item.concat(action.item);
      return {
        ...state,
        item: item
      }
    case EAT_ITEM:
      const newScore = state.score + action.value; 
      return {
        ...state,
        snake: state.snake.concat(action.snake),
        score: newScore,
        itemsEaten: state.itemsEaten + 1,
        difficulty: state.difficulty + (newScore >= 100 + state.difficulty * 100 ? 1 : 0),
        interval: (state.interval - 50 >= 100 ? state.interval - 50 : 100),
        item: state.item.filter((i) => !(i.x === action.item.x && i.y === action.item.y))
      }
    default:
      return state
  }
};
// Actions creators
export const setInput = (keyCode) => {
  console.log(keyCode);
  return ({
  type: SET_INPUT,
  keyCode: keyCode
  })
};

export const setSnake = (pos) => {
  return ({
    type: SET_SNAKE,
    snake: {
      x: pos.x,
      y: pos.y
    }
  })
};

export const spawnItem = (pos) => {
  const _item = getRandomByRatio([
    { v: DIAMOND, r: 0.10 },
    { v: CHOCOLATE, r: 0.15 },
    { v: PIZZA, r: 0.75 }
  ]);
  return ({
    type: SPAWN_ITEM,
    item: {
      ...{},
      x: pos.x,
      y: pos.y,
      data: {..._item}
    }
  })
};

export const eatItem = (item) => {
  console.log(item);
  return ({
    type: EAT_ITEM,
    item: item,
    value: item.data.value,
    snake: {
      x: item.x,
      y: item.y
    }
  })
};


/**
* function to get random value by ratio
* @param ratioValues array of value with ther ratio, value can be anything but ratio should be either a decimal or an array of integers
*                    marking a range
* @param precision base number of the ratio: by default it's in percent (100)
* @exemple getRandomByRatio([{v: 'a', r: 0.25},{v: 'b', r: 0.65},{v: 'c', r: 0.1}], 100)
*/
export const getRandomByRatio = (ratioValues, precision = 100) => {
  const _tempRatio = [];
  ratioValues.map((item, index) => {
    if (!Array.isArray(item.r)) {
      if (ratioValues[index - 1]) {
        item.r = [ratioValues[index - 1].r[1] + 1, ratioValues[index - 1].r[1] + item.r * precision];
      } else {
        item.r = [0, item.r * precision];
      }
    }
    _tempRatio.push(item);
  });
  const _idx = Math.floor(Math.random() * (precision + 1));
  for (const _item of _tempRatio) {
    // test if _idx is within the r range
    if (_idx >= _item.r[0] && _idx <= _item.r[1]) {
      // if it is return our value
      return _item.v;
    }
  }
};

export const hasHit = (newHead, props) => {
  if (newHead.x === -1 || newHead.x === props.rows
    || newHead.y === -1 || newHead.y === props.columns) {
    return true;
  }
  for (let _i =0; _i < props.snake.length; _i++) {
    if (newHead.x === props.snake[_i].x
      && newHead.y === props.snake[_i].y) {
      return true;
    }
  }
  return false;
}

export const hasEat = (newHead, item) => {
  for (let _i = 0; _i < item.length; _i++) {
    if (newHead.x === item[_i].x
      && newHead.y === item[_i].y) {
      return item[_i];
    }
  }
  return false;
}