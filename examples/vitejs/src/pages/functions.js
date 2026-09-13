const initialState = {
  loading: false,
  num: 0
}

function increment({ state, put }) {
  put({ num: state.num + 1 })
}

function decrement({ state, put }) {
  put({ num: state.num - 1 })
}

function zero({ payload, put }) {
  put({ num: payload.value })
}

export default {
  initialState,
  increment,
  decrement,
  zero
}
