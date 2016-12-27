const {
    prop,
    forEach,
    assoc,
    compose,
    omit,
    join,
    split,
    head,
} = require('ramda')

const id = (date,{eventtype: type,name}) =>
  compose(
    join('_'),
    split(' ')
  )(`event_${date}_${type}_${name}`)


const massage = (date,doc) =>
  compose(
    omit(['newevent','newcontact']),
    assoc('_id',id(date,doc))
  )(doc)

const formatDate = (x) =>
  compose(
    head,
    split('T'),
    prop('date')
  )(x)

module.exports = (doc) => massage(formatDate(doc),doc)
