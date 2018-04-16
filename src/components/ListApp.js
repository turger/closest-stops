import React from 'react'
import Stops from './stops/StopsContainer'
import Header from './Header'
import SearchAddress from './SearchAddress'
import Menu from './Menu'
import './ListApp.css'

const ListApp = ({ match: { params } }) => (
  <div className="ListApp">
    <Header/>
    <SearchAddress/>
    <Stops favoriteRoutes={params.favoriteRoutes || ''}/> 
    <Menu/>
  </div>
)

export default ListApp
