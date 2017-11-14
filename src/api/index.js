import fetch from './fetch'
import _ from 'lodash'
import querystring from 'querystring'

export default function fetchAPI (api, body, rest, multipartFormData = true) {
  let { url, method } = api
  let config = {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include',
    method: method
  }
  if (method === 'GET') {
    if (body) {
      if (rest) {
        url = url + `${body}`
      } else {
        // 增加对象格式的兼容 by jican@bytedance.com
        let params = _.isPlainObject(body) ? querystring.stringify(body) : body
        url = url + `?${params}`
      }
    }
  } else {
    if (multipartFormData) {
      const formData = new FormData()
      for (let name in body) {
        // stringify object by jican@bytedance.com
        let value = _.isPlainObject(body[name]) ? JSON.stringify(body[name]) : body[name]
        formData.append(name, value)
      }
      config.body = formData
    } else {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.body = querystring.stringify(body)
    }
  }
  return fetch.request(url, config)
}
