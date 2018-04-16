import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ListApp from './components/ListApp'
import MapApp from './components/MapApp'
import store from './store/configureStore'
import './services/firebase.js'
import './index.css'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('../service-worker.js')
    .then(function(reg){
      reg.update()
      console.log('Hooray. Service worker registration successful, scope is:', reg.scope)
    }).catch(function(err) {
      console.log('Whoops. Service worker registration failed, error:', err)
    })
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/favorites/:favoriteRoutes?" component={ListApp} /> 
        <Route path="/all/:favoriteRoutes?" component={ListApp} /> 
        <Route path="/map/:favoriteRoutes?" component={MapApp} /> 
        <Redirect from="/" to="/all"/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
