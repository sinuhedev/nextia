import React from 'react'
import { useFx, css } from 'fx1'
import { Button } from 'components'
import functions from './functions'
import './style.css'

export default function Pages () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('Pages', 'container d-flex flex-column')}>

      <div className='d-flex '>
        <Button onClick={e => fx.increment(e)}>+</Button>
        <Button onClick={e => fx.decrement(e)}>-</Button>
      </div>

      <div style={{ display: 'flex' }}>
        <pre style={{ margin: '0 50px 0 50px' }}>
          state = {JSON.stringify(state, undefined, 2)}
        </pre>
      </div>

      <div>
        <section>CSS @container </section>

        <ul>
          <li className='landscape'>landscape</li>
          <li className='portrait'>portrait</li>
          <li><br /></li>
          <li className='xs'>XS</li>
          <li className='sm'>SM</li>
          <li className='md'>MD</li>
          <li className='lg'>LG</li>
          <li className='xl'>XL</li>
          <li className='xxl'>XXL</li>
        </ul>

      </div>

      <br />
      <br />
      <br />

      <div className='container text-center'>
        <div className='row'>
          <div className='col-6'>col-6</div>
          <div className='col-6'>col-6</div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className='container text-center'>
        <div className='row'>
          <div className='col-sm-6'>col-sm-6</div>
          <div className='col-sm-6'>col-sm-6</div>
        </div>
      </div>

    </section>
  )
}
