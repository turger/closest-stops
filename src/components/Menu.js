import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchAddress from './SearchAddress'
import searchLocation from '../assets/search-location.svg'
import updateLocation from '../assets/update-location.svg'
import heart from '../assets/heart.svg'
import { testing, getCurrentGeolocation, manualUpdateCurrentLocation } from '../services/locationService'
import { setLoading } from './stops/stopsActions'
import ReactSVG from 'react-svg'
import { setFilterFavorites } from './favorites/favoritesActions'
import './Menu.css'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchAddress: false
    }
  }

  componentDidMount() {
    testing()
    getCurrentGeolocation()
    setInterval(() => {
      getCurrentGeolocation()
    } , 60000)

  }

  handleSearchClick() {
    this.setState({ 
      showSearchAddress: !this.state.showSearchAddress,
      showFavorites: false
    })
    this.props.setFilterFavorites(false)
  }

  handleFavoritesClick() {
    this.setState({ 
      showSearchAddress: false
    })    
    this.props.setFilterFavorites(!this.props.filterFavorites)
  }

  render() {
    return(
    <div className="Menu">
      <div className="Menu__bar">
        { window.location.host.includes("localhost") && 
          <div onClick={manualUpdateCurrentLocation}>
            <ReactSVG
              path={ updateLocation }
              className="Menu__updateLocation__svg"
              wrapperClassName="Menu__updateLocation"
            />
          </div>
        }

        <Link to={'/'+(!this.props.filterFavorites ? 'favorites' : 'all')+'/'+this.props.favorites.toString()}>
          <div onClick={this.handleFavoritesClick.bind(this)}>
            <ReactSVG
              path={ heart }
              className="Menu__favorites__svg"
              wrapperClassName="Menu__favorites"
            />
          </div>
        </Link>

        <div onClick={this.handleSearchClick.bind(this)}>
          <ReactSVG
            path={ searchLocation }
            className="Menu__search__svg"
            wrapperClassName="Menu__search"
          />
        </div>
      </div>
      { this.state.showSearchAddress && <SearchAddress/> }
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
