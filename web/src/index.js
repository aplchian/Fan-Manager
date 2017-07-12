import React from 'react'
import ReactDOM from 'react-dom'
import '../public/styles/custom.css'
const Main = require('./App')
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

const App = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
