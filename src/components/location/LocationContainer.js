import { connect } from 'react-redux'
import { setCoords, setRadius, setManualLocationInput } from './locationActions'
import { setLoading } from '../stops/stopsActions'
import React, { Component } from 'react'
import Location from './Location'

class LocationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationDenied: false,
    }
  }

  componentDidMount() {
    this.getCurrentGeolocation()
    this.props.setRadius(1000)
    setInterval(() => {
      this.getCurrentGeolocation()
    } , 60000)

    this.testing()
  }

  testing() { // set some default location for testing
    if (window.location.host.includes("localhost")) {
      setTimeout(() => {
        this.updatePosition(60.168946, 24.929691)
      }, 2000)
    }
  }

  manualUpdateCurrentLocation() {
    console.log('manual update location')
    this.props.setManualLocationInput(false)
    this.getCurrentGeolocation()
  }

  getCurrentGeolocation() {
    if (navigator.geolocation) {
      this.props.setLoading(true)
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError)
    } else {
      console.warn("Cannot get geolocation")
    }
  }

  onError = (e) => {
    console.warn(e)
    this.setState({ locationDenied: true })
    this.props.setLoading(false)
  }

  onSuccess = (position) => {
    if (position) {
      if (!this.props.manualLocationInput) {
          this.updatePosition(position.coords.latitude, position.coords.longitude)
      } else {
        console.log('Already has manually inputted address')
      }
    } else {
      console.error("No position")
    }
  }

  updatePosition = (lat, lon) =>
    new Promise(resolve => {
      this.props.setCoords({lat: lat, lon: lon})
      resolve()
    })

  render() {
    return (
      <Location
        locationDenied={this.state.locationDenied}
        manualUpdateCurrentLocation={this.manualUpdateCurrentLocation.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => ({
  coords: state.location.coords,
  radius: state.location.radius,
  manualLocationInput: state.location.manualLocationInput,
  loading: state.stops.loading
})

const mapDispatchToProps = dispatch => ({
  setCoords: coords => dispatch(setCoords(coords)),
  setRadius: radius => dispatch(setRadius(radius)),
  setManualLocationInput: manualLocationInput => dispatch(setManualLocationInput(manualLocationInput)),
  setLoading: loading => dispatch(setLoading(loading))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
