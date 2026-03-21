import i18nFile from 'assets/i18n'

const initialState = {
  i18n: {
    currentLocale:
      window.localStorage.getItem('i18n') || i18nFile.defaultLocale,
    locales: i18nFile.locales
  },
  loading: false,
  num: 0
}

function changeI18n({ payload, set }) {
  const { value } = payload.target
  set({ i18n: { currentLocale: value } })
  window.localStorage.setItem('i18n', value)
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
  changeI18n,
  increment,
  decrement,
  zero
}
