import React from 'react'
import Routes from './Routes'
import logo from './assets/bus-stop.svg'
import './App.css'

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Closest stops</h1>
    </header>
    <Routes/>
  </div>
)

export default App
