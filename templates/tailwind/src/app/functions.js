import { useFx } from 'nextia'

export default () => {
  const initialState = {
    channel: 7
  }

  function increment({ state, set }) {
    set({ channel: state.channel + 1 })
  }

  function decrement({ state, set }) {
    set({ channel: state.channel - 1 })
  }

  return useFx({
    initialState,
    increment,
    decrement
  })
}
