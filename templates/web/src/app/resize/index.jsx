import useFunctions from './functions'

export default function ResizePage({ resize }) {
  const { state, fx } = useFunctions()

  return (
    <section>
      <pre style={{ margin: '0 50px 0 50px', width: '250px' }}>
        {JSON.stringify(resize, undefined, 2)}
      </pre>
    </section>
  )
}
