import { connect } from 'react-redux'
import React, { Component } from 'react'
import { setStops, setLoading } from './stopsActions'
import { setFavoriteRoutes } from '../favorites/favoritesActions'
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
    setInterval(() => {
      this.getStopsData()
    } , 60000)
    if (this.props.filter !== 'SHOW_ALL') this.props.setFavoriteRoutes(this.props.filter)
  }

  componentWillReceiveProps(nextProps) {
    const coordsChanged = JSON.stringify(nextProps.coords) !== JSON.stringify(this.props.coords)
    const favoritesChanged = JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter)
    this.props = nextProps
    if (coordsChanged) {
      this.getStopsData()
    }
    if (favoritesChanged && this.props.filter !== 'SHOW_ALL') {
      this.props.setFavoriteRoutes(this.props.filter)
    }
  }

  getStopsData() {
    this.props.setLoading(true)
    getStopsAndSchedulesByLocation(this.props.coords.lat, this.props.coords.lon, this.props.radius).then(stops => {
      this.props.setLoading(false)
      this.props.setStops(stops)
    })
  }

  render() {
    console.log('stops props', this.props)
    return (
      <Stops
        stops={this.props.stops}
        loading={this.props.loading}
      />
    )
  }
}

const mapStateToProps = state => ({
  stops: state.stops.data,
  loading: state.stops.loading,
  coords: state.location.coords,
  radius: state.location.radius
})

const mapDispatchToProps = dispatch => ({
  setStops: stops => dispatch(setStops(stops)),
  setLoading: loading => dispatch(setLoading(loading)),
  setFavoriteRoutes: route => dispatch(setFavoriteRoutes(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(StopsContainer)
