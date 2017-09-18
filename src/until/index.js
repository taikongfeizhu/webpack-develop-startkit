import moment from 'moment'

export function formatTrackingDate (date, format = 'YYYY/MM/DD HH:mm') {
  return moment(date).isValid() && moment(date).format(format) || '未知'
}

export function formatRemainTime (time, format = 'MM/DD') {
  let seconds = parseInt(time, 10)
  if (seconds > 86400) {
    return moment().seconds(parseInt(time)).format(format)
  }
  return moment().seconds(parseInt(time)).format(format)
}

// 获取url的参数
export const queryString = () => {
  let _queryString = {}
  const _query = window.location.search.substr(1)
  const _vars = _query.split('&')
  _vars.forEach((v, i) => {
    const _pair = v.split('=')
    if (!_queryString.hasOwnProperty(_pair[0])) {
      _queryString[_pair[0]] = decodeURIComponent(_pair[1])
    } else if (typeof _queryString[_pair[0]] === 'string') {
      const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])]
      _queryString[_pair[0]] = _arr
    } else {
      _queryString[_pair[0]].push(decodeURIComponent(_pair[1]))
    }
  })
  return _queryString
}
