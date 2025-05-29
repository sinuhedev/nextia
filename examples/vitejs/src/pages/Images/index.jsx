import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import penguin from 'assets/img/penguin.jpg'
import './style.css'

export default function Images () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('Images', '')}>

      <br />

      <div className='css-img' />

      <br />

      <img src={penguin} height={200} />

    </section>
  )
}
