// Actions
export const SET_INPUT = 'snakator/INPUTS/SET_INPUT'

// Reducer
const initial = {
  lastKeyDown: null,
  snake: [
    {
      x: 3,
      y: 5
    },
    {
      x: 3,
      y: 5
    },
    {
      x: 5,
      y: 5
    }
  ]
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        ...action.keyCode
      }
    default:
      return state
  }
};

// Actions creators
export const setInput = (keyCode) => ({
  type: SET_INPUT,
  keyCode: keyCode
});

export const setSnake = (pos) => ({
  type: SET_INPUT,
  keyCode
});

// KeyCode Validator

const keyCodeValidator = (keyCode) => {}