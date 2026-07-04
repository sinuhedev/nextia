import { useFx } from 'nextia'

export default () => {
  const initialState = {}

  function init({ context }) {
    context.fx.put({ num: 300 })
  }

  return useFx({ initialState, init })
}
