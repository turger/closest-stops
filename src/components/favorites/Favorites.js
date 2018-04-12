import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './Favorites.css'

const Favorites = ({ routes, routeClick, favorites }) => (
  <div className="Favorites">
    { routes.map( route =>
      <Link key={route} to={favorites.includes(route) ? favorites.filter(e => e !== route).toString() : (favorites.length !== 0 ? `${favorites},` : '')+route }>
        <button 
          key={route}
          value={route} 
          className={classnames('Favorites__route', { 'Favorites__route--selected': favorites.includes(route) })}
        >
          {route}
        </button>
      </Link>
    )}
  </div>
)

export default Favorites