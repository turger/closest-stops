import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import heart from '../assets/heart.svg'
import list from '../assets/list.svg'
import map from '../assets/map.svg'
import { testing, getCurrentGeolocation } from '../services/locationService'
import { setLoading } from './stops/stopsActions'
import ReactSVG from 'react-svg'
import { setFilterFavorites } from './favorites/favoritesActions'
import './Menu.css'

class Menu extends Component {
  componentDidMount() {
    testing()
    getCurrentGeolocation()
    setInterval(() => {
      getCurrentGeolocation()
    } , 60000)

  }

  handleFavoritesClick(filter) {
    this.props.setFilterFavorites(filter)
  }

  isActive(path) {
    return this.props.location.pathname.includes('/'+path)
  }

  render() {
    return(
    <div className="Menu">
      <Link 
        to={'/favorites/'+this.props.favorites.toString()}
        className={classnames('Menu__link', {'Menu__link--active': this.isActive('favorites')} )}
      >
        <div onClick={this.handleFavoritesClick.bind(this, true)}>
          <ReactSVG
            path={ heart }
            className="Menu__favorites__svg"
            wrapperClassName="Menu__favorites"
          />
        </div>
      </Link>
      <Link 
        to={'/all/'+this.props.favorites.toString()}
        className={classnames('Menu__link', {'Menu__link--active': this.isActive('all')} )}
      >
        <div onClick={this.handleFavoritesClick.bind(this, false)}>
          <ReactSVG
            path={ list }
            className="Menu__list__svg"
            wrapperClassName="Menu__list"
          />
        </div>
      </Link>
      <Link 
        to={'/map/'+this.props.favorites.toString()}
        className={classnames('Menu__link', {'Menu__link--active': this.isActive('map')} )}
      >
        <ReactSVG
          path={ map }
          className="Menu__map__svg"
          wrapperClassName="Menu__map"
        />
      </Link>
    </div>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.stops.loading,
  locationDenied: state.location.locationDenied,
  filterFavorites: state.favorites.filterFavorites,
  favorites: state.favorites.routes
})

const mapDispatchToProps = dispatch => ({
  setLoading: loading => dispatch(setLoading(loading)),
  setFilterFavorites: favorites => dispatch(setFilterFavorites(favorites))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu))
