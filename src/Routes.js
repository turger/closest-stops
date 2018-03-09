/*global google*/
import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { getStopsAndSchedulesByLocation } from './Requests'
import Route from './Route'
import './Routes.css'

const options = {
  location: new google.maps.LatLng(60.1718730, 24.9414220),
  radius: 2000,
  types: ['address'],
}

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stops: null,
      lat: null,
      lon: null,
      address: null,
      loading: true,
      radius: 1000,
      hasLocation: false
    }

    this.onChange = (address) => this.setState({ address })
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError)
    } else {
      console.warn("Cannot get geolocation")
    }
  }

  onError = (e) => {
    console.error(e)
  }

  onSuccess = (position) => {
    if (position) {
      this.updatePositionAndGetStopsData(position.coords.latitude, position.coords.longitude)
    } else {
      console.error("No position")
    }
  }

  getStopsData() {
    getStopsAndSchedulesByLocation(this.state.lat, this.state.lon, this.state.radius).then(stops => {
      let stopsData = {}
      Object.keys(stops).map( key =>
        stopsData[key] = {
          distance: stops[key].node.distance,
          name: stops[key].node.stop.name,
          stopTimes: stops[key].node.stop.stoptimesWithoutPatterns
        }
      )
      this.setState({
        stops: stopsData,
        loading: false
       })
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.updatePositionAndGetStopsData(latLng.lat, latLng.lng))
      .catch(error => console.error('Error', error))
  }

  updatePositionAndGetStopsData = (lat, lon) =>
    new Promise(resolve => {
      this.setState({
        lat, lon, hasLocation: true
      })
      resolve()
    }).then(res => {
      this.getStopsData()
      setInterval(() => {
        this.getStopsData()
      } , 60000)
    })

  render() {
    const stops = this.state.stops
    console.log(this.state)

    const inputProps = {
      value: this.state.address || '',
      onChange: this.onChange,
    }

    return (
      <div className="Routes">
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <PlacesAutocomplete
            inputProps={inputProps}
            options={options}
          />
          <button type="submit">Submit</button>
        </form>
      { this.state.loading && <p>Loading stops from your location ... </p> }
      { !this.state.loading && this.state.hasLocation &&
        Object.keys(stops)
        .map( key =>
        <div className="Routes" key={key}>
          <Route
            routes={ stops[key].stopTimes }
            distance={ stops[key].distance }
            name={ stops[key].name }
          />
        </div>
        )
      }
      </div>
    )
  }
}

export default Routes
