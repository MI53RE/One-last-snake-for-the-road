// Actions
export const UPDATE_OPTIONS = 'OneLastSnakeForTheRoad/OPTIONS/UPDATE_OPTIONS'

// Reducer
const initial = {
  rows: 10,
  columns: 10,
}

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case UPDATE_OPTIONS:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

// Actions creators
export const updateOptions = (data) => ({
  type: UPDATE_OPTIONS,
  data,
})
