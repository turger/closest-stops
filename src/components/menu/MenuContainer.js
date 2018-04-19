import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { testing, getCurrentGeolocation, setLocation } from '../../services/locationService'
import { setStops, setLoading } from '../stops/stopsActions'
import { setFavoriteRoutes } from '../favorites/favoritesActions'
import { loadState } from '../../store/localStorage'
import { getStopsAndSchedulesByLocation } from '../../services/hslApi'
import Menu from './Menu'

class MenuContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePath: this.props.location.pathname
    }

    this.setActivePath = this.setActivePath.bind(this)
  }

  componentDidMount() {
    const state = loadState()
    if (state) {
      setLocation(state.location.coords.lat, state.location.coords.lon)
      this.props.setFavoriteRoutes(state.favorites.toString())
    }
    testing()
    this.props.setLoading(true)
    this.getStopsData()
    getCurrentGeolocation()
    setInterval(() => {
      getCurrentGeolocation()
    } , 60000)
    setInterval(() => {
      this.getStopsData()
    } , 60000)
  }

  componentWillReceiveProps(nextProps) {
    const coordsChanged = JSON.stringify(nextProps.coords) !== JSON.stringify(this.props.coords)
    this.props = nextProps
    if (coordsChanged) {
      this.getStopsData()
    }
  }

  getStopsData() {
    if (Object.keys(this.props.coords).length === 0) return
    this.props.setLoading(true)
    getStopsAndSchedulesByLocation(this.props.coords.lat, this.props.coords.lon, this.props.radius).then(stops => {
      this.props.setLoading(false)
      this.props.setStops(stops.filter(stop => stop.node.stop.stoptimesWithoutPatterns.length !== 0))
    })
  }

  setActivePath(activePath) {
    this.setState({ activePath })
  }

  render() {
    return(
      <Menu
        favorites={this.props.favorites}
        setActivePath={this.setActivePath}
        activePath={this.state.activePath}
      />
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites.routes,
  loading: state.stops.loading,
  coords: state.location.coords,
  radius: state.location.radius
})

const mapDispatchToProps = dispatch => ({
  setStops: stops => dispatch(setStops(stops)),
  setLoading: loading => dispatch(setLoading(loading)),
  setFavoriteRoutes: routes => dispatch(setFavoriteRoutes(routes))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuContainer))
