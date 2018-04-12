import React from 'react'
import Stops from './stops/StopsContainer'
import Header from './Header'
import '../services/firebase.js'
import './App.css'

const App = ({ match: { params } }) => (
  <div className="App">
    <Header/>
    <Stops filter={params.filter || 'SHOW_ALL'}/> 
  </div>
)

export default App
