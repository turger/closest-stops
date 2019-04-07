import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './components/App'
import store from './store/configureStore'
import './services/firebase.js'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/favorites/:favoriteRoutes?" component={App} /> 
        <Route path="/all/:favoriteRoutes?" component={App} /> 
        <Route path="/map/:favoriteRoutes?" component={App} /> 
        <Redirect from="/" to="/all"/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
