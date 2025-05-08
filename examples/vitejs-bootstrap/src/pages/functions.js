const initialState = {
  channel: 5
}

function increment ({ state, set }) {
  set({ channel: state.channel + 1 })
}

function decrement ({ state, set }) {
  set({ channel: state.channel - 1 })
}

export default {
  initialState,
  increment,
  decrement
}
