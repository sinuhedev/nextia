import { useFx } from 'nextia'

export default () => {
  const initialState = {}

  function start({ context }) {
    context.fx.put({ num: 300 })
  }

  return useFx(initialState, { start })
}
