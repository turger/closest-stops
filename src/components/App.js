import React from 'react'
import Stops from './stops/StopsContainer'
import Header from './Header'
import '../services/firebase.js'
import './App.css'

const App = () => (
  <div className="App">
    <Header/>
    <Stops/>
  </div>
)

export default App
