import React, { useEffect } from 'react'
import { css } from 'fx1'
import './style.css'

export default function HttpNotFoundPage () {
  return (
    <section className={css('HttpNotFoundPage', 'd-flex justify-content-center')}>
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
