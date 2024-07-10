export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(
  name: string,
  value: string | null,
  props: {
    expires: number | string | Date
    secure?: boolean
    domain?: string
    path?: string
  }
) {
  props = props || {}
  let exp = props.expires

  if (typeof exp == 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }

  if (exp && typeof exp === 'object' && exp.toUTCString) {
    props.expires = exp.toUTCString()
  }

  value = encodeURIComponent(String(value))
  let updatedCookie = name + '=' + value
  let propName: keyof typeof props

  for (propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]

    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }

  document.cookie = updatedCookie
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 })
}

/*

Arguments:

- name: cookie name
- value: cookie value (string)
- props: object with additional properties to set the cookie:
  - expires: cookie expiration time. Interpreted differently depending on the type:
    - number: the number of seconds until expiration.
    - Date: the exact date of expiration.
  - path: the path for the cookie.
  - domain: domain for the cookie.
  - secure: only send the cookie over a secure connection.

If expires in the past, the cookie will be deleted.
If expires is missing or equal to 0, the cookie will be set as a session cookie and will disappear when the browser is closed.

*/
