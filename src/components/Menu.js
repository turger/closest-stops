import React, { useMemo } from 'react'
import classnames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import heart from '../assets/heart.svg'
import list from '../assets/list.svg'
import map from '../assets/map.svg'
import './Menu.css'

const Menu = () => {
  const location = useLocation()
  const currentPath = location.pathname.slice(1)

  const isActive = (path) => 
    currentPath === path || (!currentPath && path ==='all')

  const svgInjectionHandlers = useMemo(() => ({
    favorites: (svg) => {
      svg.classList.add('Menu__favorites__svg')
    },
    list: (svg) => {
      svg.classList.add('Menu__list__svg')
    },
    map: (svg) => {
      svg.classList.add('Menu__map__svg')
    }
  }), [])

  const menuItems = useMemo(() => [
    {
      path: 'favorites',
      icon: heart,
      handler: svgInjectionHandlers.favorites,
      className: 'Menu__favorites'
    },
    {
      path: 'all',
      icon: list,
      handler: svgInjectionHandlers.list,
      className: 'Menu__list'
    },
    {
      path: 'map',
      icon: map,
      handler: svgInjectionHandlers.map,
      className: 'Menu__map'
    }
  ], [svgInjectionHandlers])

  return (
    <div className="Menu">
      {menuItems.map(({ path, icon, handler, className }) => (
        <Link
          key={path}
          to={`/${path}`}
          className={classnames('Menu__link', {
            'Menu__link--active': isActive(path)
          })}
        >
          <ReactSVG
            src={icon}
            beforeInjection={handler}
            className={className}
            wrapper="span"
            fallback={() => <span>Error loading icon</span>}
          />
        </Link>
      ))}
    </div>
  )
}

export default Menu
