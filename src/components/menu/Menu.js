import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import heart from '../../assets/heart.svg'
import list from '../../assets/list.svg'
import map from '../../assets/map.svg'
import { ReactSVG } from 'react-svg'
import './Menu.css'

class Menu extends Component {
  isActive(path) {
    return this.props.activePath.includes(path)
  }

  render() {
    const { favorites, setActivePath } = this.props
    return (
      <div className="Menu">
        <Link
          to={'/favorites/' + favorites}
          className={classnames('Menu__link', { 'Menu__link--active': this.isActive('favorites') })}
          onClick={() => setActivePath('favorites')}
        >
          <ReactSVG
            src={heart}
            beforeInjection={(svg) => {
              svg.classList.add('Menu__favorites__svg')
            }}
            className="Menu__favorites"
          />
        </Link>
        <Link
          to={'/all/' + favorites}
          className={classnames('Menu__link', { 'Menu__link--active': this.isActive('all') })}
          onClick={() => setActivePath('all')}
        >
          <ReactSVG
            src={list}
            beforeInjection={(svg) => {
              svg.classList.add('Menu__list__svg')
            }}
            className="Menu__list"
          />
        </Link>
        <Link
          to={'/map/' + favorites}
          className={classnames('Menu__link', { 'Menu__link--active': this.isActive('map') })}
          onClick={() => setActivePath('map')}
        >
          <ReactSVG
            src={map}
            beforeInjection={(svg) => {
              svg.classList.add('Menu__map__svg')
            }}
            className="Menu__map"
          />
        </Link>
      </div>
    )
  }
}

export default Menu
