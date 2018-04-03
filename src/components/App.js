import React from 'react'
import Stops from './Stops'
import logo from '../assets/bus-stop.svg'
import '../firebase.js'
import './App.css'

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Closest stops</h1>
    </header>
    <Stops/>
  </div>
)

export default App
