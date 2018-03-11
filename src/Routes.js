import React, { Component } from 'react'
import { getStopsAndSchedulesByLocation } from './Requests'
import SearchAddress from './SearchAddress'
import Stops from './Stops'
import './Routes.css'

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stops: null,
      lat: null,
      lon: null,
      loading: false,
      radius: 1000,
      locationDenied: false
    }
  }

  componentDidMount() {
    this.getCurrentGeolocation()
  }

  getCurrentGeolocation() {
    if (navigator.geolocation) {
      this.setState({ loading: true })
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError)
    } else {
      console.warn("Cannot get geolocation")
    }
  }

  onError = (e) => {
    console.warn(e)
    this.setState({ locationDenied: true, loading: false })
  }

  onSuccess = (position) => {
    if (position) {
      this.updatePositionAndGetStopsData(position.coords.latitude, position.coords.longitude)
    } else {
      console.error("No position")
    }
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

  getStopsData() {
    this.setState({ loading: true })
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

  render() {
    const stops = this.state.stops
    console.log(this.state)
    return (
      <div className="Routes">
        <SearchAddress updatePosition={this.updatePositionAndGetStopsData.bind(this)} />
        { this.state.locationDenied ?
          <p>Geolocation is denied in your browser. Enable it if you want to find stops by your current location.</p>
          :
          <button onClick={this.getCurrentGeolocation.bind(this)}>Update current location</button>
        }
        { this.state.loading && <p>Loading stops ... </p> }
        { this.state.stops &&
          Object.keys(stops)
          .map( key =>
            <Stops
              key={key}
              routes={ stops[key].stopTimes }
              distance={ stops[key].distance }
              name={ stops[key].name }
            />
          )
        }
      </div>
    )
  }
}

export default Routes
