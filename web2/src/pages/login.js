const React = require('react')
import {map,tail,split,join} from 'ramda'
const axios = require('axios')
const url = process.env.REACT_APP_XHR


const Home = React.createClass({
  getInitialState(){
    return({
      bands: []
    })
  },
  componentDidMount(){

    // this.props.auth.notify(profile => {
    //   axios.get(`${url}bands?userId=user_${profile.user_id}`)
    //     .then(res => {
    //       this.setState({
    //         bands: res.data[0].key[1]
    //       })
    //     })
    // })

    if(!this.props.auth.loggedIn() && this.props.location.hash.indexOf('access_token') === -1){
      this.props.auth.login()
    }


    if(localStorage.getItem('profile')){
      let profile = JSON.parse(localStorage.getItem('profile'))
      this.props.setUser(profile)
      this.setState({
        profile: `${url}bands?userId=user_${profile.user_id}`
      })
      axios.get(`${url}bands?userId=user_${profile.user_id}`)
        .then(res => {
          console.log('data2',res.data[0].key[1])
          this.setState({
            bands: res.data[0].key[1]
          })
        })
    }
  },
  render(){
    console.log('state',this.state)
    return(
      <div>
        <pre>
          {JSON.stringify(this.state,null,2)}
        </pre>
      </div>
    )
  }
})

module.exports = Home
