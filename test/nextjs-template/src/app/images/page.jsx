'use client'

import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import Image from 'next/image'
import image from 'assets/img/image.jpg'
import './style.css'

export default function ImagesPage () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ImagesPage', '')}>

      <br />
      <p>css-img</p>
      <div className='css-img' />

      <br />
      <p>img</p>
      <Image src={image} height={200} alt='image' />

    </section>
  )
}
