import React from 'react'
import Stops from './stops/StopsContainer'
import Header from './Header'
import '../services/firebase.js'
import './App.css'

const App = ({ match: { params } }) => (
  <div className="App">
    <Header/>
    <Stops favoriteRoutes={params.favoriteRoutes || ''} filterFavorites={params.filterFavorites || ''}/> 
  </div>
)

export default App
