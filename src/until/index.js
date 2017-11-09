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
  let queryString = {}
  const query = window.location.search.substr(1)
  const vars = query.split('&')
  vars.forEach((v, i) => {
    const pair = v.split('=')
    if (!queryString.hasOwnProperty(pair[0])) {
      queryString[pair[0]] = decodeURIComponent(pair[1])
    } else if (typeof queryString[pair[0]] === 'string') {
      const arr = [queryString[pair[0]], decodeURIComponent(pair[1])]
      queryString[pair[0]] = arr
    } else {
      queryString[pair[0]].push(decodeURIComponent(pair[1]))
    }
  })
  return queryString
}
