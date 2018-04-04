import React from 'react'
import Stops from './Stops'
import Header from './Header'
import Menu from './Menu'
import '../firebase.js'
import './App.css'

const App = () => (
  <div className="App">
    <Header/>
    <Menu/>
    <Stops/>
  </div>
)

export default App
