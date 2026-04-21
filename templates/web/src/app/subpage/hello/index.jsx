import { useFx } from 'nextia'
import functions from './functions'

export default function SubpageHelloPage() {
  const { state, fx } = useFx(functions)

  return <section>/subpage/hello</section>
}
