import React, { useEffect } from 'react'
import './style.css'
import { css } from 'nextia'
import { Link } from 'components'

export default function ({ className, style }) {
  return (
    <aside className={css('Menu-component', className)} style={style}>
      <Link href='/' className='mr-2'>
        /
      </Link>
      <Link href='#/' className='mr-2'>
        Home
      </Link>
      <Link href='#/Env' className='mr-2'>
        Env
      </Link>
      <Link href='#/ContextPage' className='mr-2'>
        ContextPage
      </Link>
      <Link href='#/Mockapi' className='mr-2'>
        Mockapi
      </Link>
      <Link href='#/URLSearchParams' value={{ id: 20, user: 'Sinuhe' }} className='mr-2'>
        URLSearchParams
      </Link>
      <Link href='#/SubPage/Hello' className='mr-2'>
        SubPage/Hello
      </Link>
      <Link href='#/Translate' className='mr-2'>
        Translate
      </Link>
      <Link href='#/CounterPage' className='mr-2'>
        CounterPage
      </Link>
      <Link href='#/Image' className='mr-2'>
        Image
      </Link>
      <Link href='#/MediaQuery' className='mr-2'>
        MediaQuery
      </Link>
      <Link href='#/NO' className='mr-2'>
        NO
      </Link>
    </aside>
  )
}
