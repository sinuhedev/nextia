import React from 'react'

export default function ({ children, href, value = {}, ...props }) {
  value = Object.keys(value).length ? '?' + new URLSearchParams(value).toString() : ''

  return (
    <a href={href + value} {...props}>
      {children}
    </a>
  )
}
