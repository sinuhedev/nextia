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
  increment,
  decrement,
  zero
}
