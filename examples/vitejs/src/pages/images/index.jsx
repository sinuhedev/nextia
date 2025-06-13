import React, { useEffect } from 'react'
import { useFx, css } from 'fx1'
import functions from './functions'
import penguin from 'assets/img/penguin.jpg'
import './style.css'

export default function ImagesPage () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ImagesPage', '')}>

      <br />

      <div className='css-img' />

      <br />

      <img src={penguin} height={200} />

    </section>
  )
}
