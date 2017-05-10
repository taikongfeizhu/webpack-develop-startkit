import moment from 'moment'

export function formatTrackingDate (date, format = 'YYYY/MM/DD HH:mm') {
  return moment(date).isValid() && moment(date).format(format) || '未知'
}
