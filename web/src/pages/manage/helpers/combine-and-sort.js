import {isEmpty,filter,map,compose,reject,concat,tap,flatten,sort,pluck,split,join} from 'ramda'

module.exports = (data,schedule) => {
  const removeColon = compose(
    join(''),
    split(':')
  )
  return compose(
    sort((a,b) => removeColon(a.starttime) - removeColon(b.starttime)),
    concat(schedule),
    flatten,
    reject(isEmpty),
    map(item => item.schedule),
    pluck('doc')
  )(data)

}
