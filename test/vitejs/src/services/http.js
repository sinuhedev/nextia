function urlTemplate (url, path) {
  const params = url.match(/:\w+/g) ?? []

  return params.reduce((acc, e) => {
    const key = e.split(':')[1]
    return acc.replaceAll(e, path[key] ?? '')
  }, url)
}

/**
 * get
 */
export async function GET (url = '', path = {}, body = {}, headers = {}) {
  // url and path
  url = urlTemplate(url, path)

  // query
  const queryParameters = body ? '' : '?' + new URLSearchParams(body).toString()

  // http
  const response = await fetch(url + queryParameters, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })

  const { ok, status, statusText } = response

  if (ok) {
    const data = await response.json()
    return {
      ok,
      status,
      statusText,
      data
    }
  }

  throw new Error(`ok: ${ok} , status: ${status} , statusText: ${statusText}`)
}

/**
 * post
 */
export async function POST (url = '', path = {}, body = {}, headers = {}) {
  // url and path
  url = urlTemplate(url, path)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })

  const { ok, status, statusText } = response

  if (ok) {
    const data = await response.json()
    return {
      ok,
      status,
      statusText,
      data
    }
  }

  throw new Error(`ok: ${ok} , status: ${status} , statusText: ${statusText}`)
}

/**
 * put
 */
export async function PUT (url = '', path = {}, body = {}, headers = {}) {
  // url and path
  url = urlTemplate(url, path)

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })

  const { ok, status, statusText } = response

  if (ok) {
    const data = await response.json()
    return {
      ok,
      status,
      statusText,
      data
    }
  }

  throw new Error(`ok: ${ok} , status: ${status} , statusText: ${statusText}`)
}

/**
 * delete
 */
export async function DELETE (url = '', path = {}, body = {}, headers = {}) {
  // url and path
  url = urlTemplate(url, path)

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })

  const { ok, status, statusText } = response

  if (ok) {
    const data = await response.json()
    return {
      ok,
      status,
      statusText,
      data
    }
  }

  throw new Error(`ok: ${ok} , status: ${status} , statusText: ${statusText}`)
}
