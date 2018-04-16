import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { setStops, setLoading } from './stopsActions'
import { setFavoriteRoutes, setFilterFavorites } from '../favorites/favoritesActions'
import Stops from './Stops'
import { getStopsAndSchedulesByLocation } from '../../services/hslApi'

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
    this.props.setLoading(true)
    setInterval(() => {
      this.getStopsData()
    } , 60000)
    this.props.setFavoriteRoutes(this.props.favoriteRoutes)
  }

  componentWillReceiveProps(nextProps) {
    const coordsChanged = JSON.stringify(nextProps.coords) !== JSON.stringify(this.props.coords)
    const favoritesChanged = JSON.stringify(nextProps.favoriteRoutes) !== JSON.stringify(this.props.favoriteRoutes)
    this.props = nextProps
    if (coordsChanged) {
      this.getStopsData()
    }
    if (favoritesChanged) {
      this.props.setFavoriteRoutes(this.props.favoriteRoutes)
    }
    this.props.setFilterFavorites(this.props.location.pathname.split('/')[1] === 'favorites')
  }

  getStopsData() {
    this.props.setLoading(true)
    getStopsAndSchedulesByLocation(this.props.coords.lat, this.props.coords.lon, this.props.radius).then(stops => {
      this.props.setLoading(false)
      this.props.setStops(stops.filter(stop => stop.node.stop.stoptimesWithoutPatterns.length !== 0))
    })
  }

  render() {
    console.log('stops props', this.props)
    return (
      <Stops
        stops={this.props.stops}
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
  favoriteRoutesFromState: state.favorites.routes
})

const mapDispatchToProps = dispatch => ({
  setStops: stops => dispatch(setStops(stops)),
  setLoading: loading => dispatch(setLoading(loading)),
  setFavoriteRoutes: routes => dispatch(setFavoriteRoutes(routes)),
  setFilterFavorites: filter => dispatch(setFilterFavorites(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StopsContainer))
