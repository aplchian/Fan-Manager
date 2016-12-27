const React = require('react')
import {merge, select as $, style} from 'glamor'

const containerStyleLeft = style({
  float: 'left',
  width: 333,
  height: 324,
  position: 'relative',
  backgroundColor: 'white',
  borderRadius: '5px',
  padding: '5px',
  boxShadow: '0 1px 4px rgba(0,0,0,.04)'

})

const containerStyleRight = style({
  float: 'right',
  width: 333,
  height: 324,
  position: 'relative',
  backgroundColor: 'white',
  borderRadius: '5px',
  padding: '5px',
  boxShadow: '0 1px 4px rgba(0,0,0,.04)'

})


module.exports = props => {
  const float = props.float === 'left' ? containerStyleLeft : containerStyleRight
  return <div {...float}>{props.children}</div>
}
