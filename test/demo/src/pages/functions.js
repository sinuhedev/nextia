import i18nFile from 'assets/i18n'

const initialState = {
  i18n: window.localStorage.getItem('i18n') || i18nFile.defaultLocale,
  loading: false,
  num: 0
}

function increment({ state, set }) {
  set({ num: state.num + 1 })
}

function decrement({ state, set }) {
  set({ num: state.num - 1 })
}

function zero({ payload, set }) {
  set({ num: payload.value })
}

export default {
  initialState,
  increment,
  decrement,
  zero
}
