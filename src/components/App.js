import React from 'react'
import Stops from './stops/StopsContainer'
import Header from './Header'
import SearchAddress from './SearchAddress'
import Map from './map/MapContainer'
import Menu from './menu/MenuContainer'
import './App.css'

const App = ({ match: { params, url } }) => (
  <div className="App">
    <Header/>
    <SearchAddress/>
    { !url.includes('/map') &&
      <Stops 
        favoriteRoutes={params.favoriteRoutes || ''}
        filterFavorites={url.includes('/favorites')}
      /> 
    }
    { url.includes('/map') &&
      <Map/>
    }
    <Menu/>
  </div>
)

export default App
