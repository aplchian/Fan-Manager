const {map,pluck,compose} = require('ramda')

const formatUsers = compose(
  map(item => ({user: item.nickname, id: item._id})),
  pluck('data')
)

function buildPromises(fn,item){
  return function(item){
    return fn(item)
  }
}

module.exports = {
  buildPromises,
  formatUsers
}
