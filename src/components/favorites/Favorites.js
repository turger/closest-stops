import React from 'react'
import classnames from 'classnames'
import './Favorites.css'

const Favorites = ({ routes, routeClick, favorites }) => (
  <div className="Favorites">
    { routes.map( route =>
      <button 
        key={route}
        value={route} 
        onClick={() => routeClick(route)} 
        className={classnames('Favorites__route', { 'Favorites__route--selected': favorites.includes(route) })}
      >
        {route}
      </button>
    )}
  </div>
)

export default Favorites