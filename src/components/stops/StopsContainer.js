import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { setFavoriteRoutes, setFilterFavorites } from '../favorites/favoritesActions'
import { setStops } from '../stops/stopsActions'
import { filterStops } from '../../utils/formatUtils'
import Stops from './Stops'

class StopsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationDenied: false,
      firstAutoLocationGet: false,
      hasLocation: false,
    }
  }

  componentDidMount() {
    this.props.setFavoriteRoutes(this.props.favoriteRoutes)
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 60000)   
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentWillReceiveProps(nextProps) {
    const hiddenVehiclesChanged = JSON.stringify(nextProps.hiddenVehicles) !== JSON.stringify(this.props.hiddenVehicles)
    const favoritesChanged = JSON.stringify(nextProps.favoriteRoutes) !== JSON.stringify(this.props.favoriteRoutes)
    this.props = nextProps
    if (favoritesChanged) {
      this.props.setFavoriteRoutes(this.props.favoriteRoutes)
    }
    if (hiddenVehiclesChanged) {
      this.setState({ time: Date.now() })
    }
    this.props.setFilterFavorites(this.props.location.pathname.split('/')[1] === 'favorites')
  }

  render() {
    return (
      <Stops
        stops={filterStops(this.props.stops, this.props.filterFavorites, this.props.favoriteRoutesFromState, this.props.hiddenVehicles)}
        loading={this.props.loading}
        favoriteRoutes={this.props.favoriteRoutesFromState}
        filterFavorites={this.props.filterFavorites}
      />
    )
  }
}

const mapStateToProps = state => ({
  stops: state.stops.data,
  loading: state.stops.loading,
  coords: state.location.coords,
  radius: state.location.radius,
  filterFavorites: state.favorites.filterFavorites,
  favoriteRoutesFromState: state.favorites.routes,
  hiddenVehicles: state.stops.hiddenVehicles
})

const mapDispatchToProps = dispatch => ({
  setStops: stops => dispatch(setStops(stops)),
  setFavoriteRoutes: routes => dispatch(setFavoriteRoutes(routes)),
  setFilterFavorites: filter => dispatch(setFilterFavorites(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StopsContainer))
