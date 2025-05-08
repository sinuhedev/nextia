import React, { useEffect } from 'react'
import { css } from 'nextia'
import './style.css'

export default function HttpNotFound () {
  return (
    <section className={css('HttpNotFound', 'd-flex justify-content-center')}>
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <div className='text-center'>
            <h5>Not Found</h5>
          </div>
        </div>
      </div>
    </section>
  )
}
