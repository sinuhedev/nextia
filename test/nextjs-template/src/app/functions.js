import i18nFile from 'assets/i18n'

const initialState = {
  i18n: '',
  loading: false,
  num: 0
}

function init ({ set }) {
  set({
    i18n: window.localStorage.getItem('i18n') || i18nFile.defaultLocale
  })
}

export default {
  initialState,
  init
}
