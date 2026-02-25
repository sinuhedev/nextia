import i18nFile from 'assets/i18n'
import { i18n, useFx } from 'nextia'

export default function I18n({ value, args = [] }) {
  const { context } = useFx()

  return i18n(value, args, i18nFile, context.state.i18n.value)
}
