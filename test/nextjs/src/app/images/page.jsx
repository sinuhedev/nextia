'use client'

import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import Image from 'next/image'
import penguin from 'assets/img/penguin.jpg'
import './style.css'

export default function ImagesPage () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ImagesPage', '')}>

      <br />

      <div className='css-img' />

      <br />

      <Image src={penguin} height={200} />

    </section>
  )
}
