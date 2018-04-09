import { connect } from 'react-redux'
import { setStops, setLoading } from './stopsActions'
import Stops from './Stops'
import React, { Component } from 'react'
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
  }

  componentWillReceiveProps(nextProps) {
    const coordsChanged = JSON.stringify(nextProps.coords) !== JSON.stringify(this.props.coords)
    this.props = nextProps
    if (coordsChanged) {
      this.getStopsData()
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
    console.log('stops', this.props.stops)
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
  setLoading: loading => dispatch(setLoading(loading))
})

export default connect(mapStateToProps, mapDispatchToProps)(StopsContainer)
