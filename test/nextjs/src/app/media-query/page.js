'use client'

import { useFx, css } from 'nextia'
import functions from './functions'
import { useResize } from 'utils'
import './style.css'

export default function MediaQueryPage () {
  const { state, fx } = useFx(functions)
  const resize = useResize()

  return (
    <section className={css('MediaQueryPage', '')}>
      <div>

        <ul>
          <li className='sm'>SM</li>
          <li className='md'>MD</li>
          <li className='lg'>LG</li>
          <li className='xl'>XL</li>
          <li className='xxl'>XXL</li>
        </ul>

        <pre style={{ margin: '0 50px 0 50px', width: '250px' }}>
          state = {JSON.stringify(resize, undefined, 2)}
        </pre>

      </div>

    </section>
  )
}
