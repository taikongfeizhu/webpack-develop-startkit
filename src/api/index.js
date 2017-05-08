import fetch from './fetch'
import { apis } from './config'
import querystring from 'querystring'

export default function fetchAPI (type, body, multipartFormData = true) {
  var url = apis[type].url
  var config = {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include',
    method: apis[type].method
  }
  if (apis[type].method === 'GET') {
    if (body) {
      url = apis[type].url + `?${body}`
    }
  } else {
    if (multipartFormData) {
      const formData = new FormData()
      for (let name in body) {
        formData.append(name, body[name])
      }
      config.body = formData
    } else {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.body = querystring.stringify(body)
    }
  }
  return fetch.request(url, config)
}
