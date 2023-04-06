import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './components/App'
import store from './store/configureStore'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Provider store={store}>
  <Router>
    <Switch>
      <Route path="/favorites/:favoriteRoutes?" component={App} />
      <Route path="/all/:favoriteRoutes?" component={App} />
      <Route path="/map/:favoriteRoutes?" component={App} />
      <Redirect from="/" to="/all" />
    </Switch>
  </Router>
</Provider>)
