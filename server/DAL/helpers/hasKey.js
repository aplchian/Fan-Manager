const {Either} = require('ramda-fantasy')
const Left = Either.Left
const Right = Either.Right

module.exports = (keys) => {
  var hasKeys = true
  var status = ''

  const missingKey = (item) => {
      if (prop(item,doc) === undefined) {
          hasKeys = false
          status = item
      }
  }

  forEach(missingKey, keys)

  if (!hasKeys) {
      return cb(new Error(`400Missing ${status} property within data`))
  }

  if (prop('_rev',doc)) {
      return cb(new Error('400 _rev not allowed'))
  }

  if (prop('_id',doc)) {
      return cb(new Error('400 _id not allowed'))
  }

}
