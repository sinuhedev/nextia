import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import image from 'assets/img/image.jpg'
import './style.css'

export default function ImagesPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ImagesPage', '')}>
      <br />
      <p>css-img</p>
      <div className="css-img" />

      <br />
      <p>img</p>
      <img src={image} alt="img" height={200} />
    </section>
  )
}
