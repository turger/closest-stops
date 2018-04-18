import { connect } from 'react-redux'
import React, { Component } from 'react'
import { setStops } from '../stops/stopsActions'
import { filterStopsForMap } from '../../utils/formatUtils'
import Map from './Map'

class MapContainer extends Component {
  render() {
    return (
      <Map
        stops={filterStopsForMap(this.props.stops)}
        coords={this.props.coords}
        manualLocationInput={this.props.manualLocationInput}
      />
    )
  }
}

const mapStateToProps = state => ({
  stops: state.stops.data,
  loading: state.stops.loading,
  coords: state.location.coords,
  radius: state.location.radius,
  manualLocationInput: state.location.manualLocationInput
})

const mapDispatchToProps = dispatch => ({
  setStops: stops => dispatch(setStops(stops))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
