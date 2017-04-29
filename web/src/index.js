import React from 'react'
import ReactDOM from 'react-dom'
import '../public/styles/custom.css'
const App = require('./App')
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const MainApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
)

ReactDOM.render(
  <MainApp />,
  document.getElementById('root')
);
