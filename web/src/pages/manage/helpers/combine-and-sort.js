import { isEmpty, map, compose, reject,
         concat, flatten, sort, pluck, type, assoc } from 'ramda'
import moment from 'moment'

module.exports = (data, schedule) => {
  const formatStartTime = (time) => {
    return type(time.starttime) === 'Number'
            ? time
            : assoc('starttime', moment(time.starttime, 'HH:mm').unix(), time)
  }

  return compose(
    sort((a, b) => a.starttime - b.starttime),
    map(formatStartTime),
    concat(schedule),
    flatten,
    reject(isEmpty),
    pluck('schedule'),
    pluck('doc')
  )(data)

}
