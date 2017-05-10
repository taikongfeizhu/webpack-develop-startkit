import _ from 'lodash'
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

export function formatCustomerData (list, track) {
  if (!_.isArray(list) || !list.length) {
    return []
  }
  const result = []
  _.map(list, (o) => {
    if (track) {
      result.push({
        id: o.id,
        time: moment(o.visit_time).isValid() && moment(o.visit_time).format('MM/DD HH:mm') || '暂无跟进计划',
        remain_time: moment(o.remain_time).isValid() && formatRemainTime(o.remain_time),
        name: o.name,
        type: o.type ? o.type + ' ' : ''
      })
    } else {
      result.push({
        id: o.id,
        time: moment(o.os_claimed_time).isValid() && moment(o.os_claimed_time).format('MM/DD HH:mm') || '暂无跟进计划',
        remain_time: moment(o.remain_time).isValid() && formatRemainTime(o.remain_time),
        name: o.name,
        type: ''
      })
    }
  })
  return result
}
