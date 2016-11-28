const React = require('react')
const {style} = require('glamor')
const SubMenuItem = require('./sub-menu-item')

const subNavStyle = style({
  width: '100%',
  height: 34,
  backgroundColor: 'white',
  // 'boxShadow': '0 2px 2px -2px rgba(0,0,0,.15)'
})

const ulStyle = style({
  margin: '0 auto',
  display: 'block',
  paddingLeft: 0,
  width: '80%'

})


const SubNav = React.createClass({
  getInitialState(){
    return{
      links: [
        {to: '/search/fans', name: 'Search'},
        {to: '/streetteam/fans', name: 'Street Team'},
        {to: '/fans/add', name: 'Add Fan'}
      ]
    }
  },
  render(){
    const li = (item,i) => <SubMenuItem key={i} to={item.to} name={item.name}/>
    return(
      <div {...subNavStyle}>
        <ul {...ulStyle}>
          {this.state.links.map(li)}
          {this.props.children}
        </ul>
      </div>
    )
  }
})

module.exports = SubNav
