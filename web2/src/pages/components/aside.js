const React = require('react')
const {style} = require('glamor')
const Logo = require('./logo')
const MenuItem = require('./menu-items.js')

const asideStyle = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 120,
  height: '100%',
  backgroundColor: 'white',
  borderRight: '1px solid #f1f1f1',
  zIndex: 4
})

const Aside = React.createClass({
  getInitialState(){
    return({
      items: [
        {name:'Fans', path:"/fans"}
      ]
    })
  },
  render(){
    const menu = (item, i) =>
      <MenuItem key={i} path={item.path} name={item.name} />
    return(
      <aside {...asideStyle}>
        <Logo />
        {this.state.items.map(menu)}
      </aside>
    )
  }
})

module.exports = Aside
