import React, { Component } from 'react'
import { getStopsAndSchedulesByLocation } from './Requests'
import SearchAddress from './SearchAddress'
import Routes from './Routes'
import Warning from './Warning'
import './Stops.css'

class Stops extends Component {
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
      stops.map( stop =>
        stopsData[stop.node.stop.gtfsId] = {
          distance: stop.node.distance,
          name: stop.node.stop.name,
          stopTimes: stop.node.stop.stoptimesWithoutPatterns,
          id: stop.node.stop.gtfsId
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
    return (
      <div className="Stops">
        <SearchAddress updatePosition={this.updatePositionAndGetStopsData.bind(this)} />
        { this.state.locationDenied &&
          <Warning
            message="Geolocation is not enabled in your browser. Enable it if you want to find stops using your current location."
          />
        }
        { !this.state.locationDenied && !this.state.loading &&
          <div className="Stops__updatelocation">
            <button onClick={this.getCurrentGeolocation.bind(this)}>
              Update current location
            </button>
          </div>
        }
        { this.state.loading &&
          <p className="Stops__loading">Loading stops ... </p>
        }
        { this.state.stops &&
          Object.keys(stops)
          .map( key =>
            <Routes
              key={ key }
              stopTimes={ stops[key].stopTimes }
              distance={ stops[key].distance }
              name={ stops[key].name }
              id={ stops[key].id }
            />
          )
        }
      </div>
    )
  }
}

export default Stops
