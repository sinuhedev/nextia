import React from 'react'
import NextLink from 'next/link'

export default function Link ({ children, href, value = {}, ...props }) {
  return (
    <NextLink href={{ pathname: href, query: value }} {...props}>
      {children}
    </NextLink>
  )
}
