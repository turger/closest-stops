import React from 'react'
import Header from './Header'
import Menu from './Menu'
import './MapApp.css'

const MapApp = ({ match: { params } }) => (
  <div className="MapApp">
    <Header/>
    <div>Map</div>
    <Menu/>
  </div>
)

export default MapApp
