import React, { Component } from 'react'
import { getStopsAndSchedulesByLocation } from '../../services/hslApi'
import SearchAddress from '../SearchAddress'
import Routes from '../Routes'
import Warning from '../Warning'
import './Stops.css'

export default class Stops extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lon: null,
      loading: false,
      radius: 1000,
      locationDenied: false,
      firstAutoLocationGet: false,
      showSearchAddress: false,
    }
  }

  componentDidMount() {
    this.getCurrentGeolocation(true)
    // for testing
    if (window.location.host.includes("localhost")) {
      this.setState({ lat: 60.168946, lon: 24.929691 }, () => this.getStopsData())
    }
  }

  getCurrentGeolocation(firstAutoLocationGet) {
    if (navigator.geolocation) {
      this.setState({ loading: true, firstAutoLocationGet: true })
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
      if (!(this.state.hasLocation && this.state.firstAutoLocationGet)) {
        this.setState({
          lat, lon, hasLocation: true
        })
      } else {
        console.log('Already has manually inputted address')
      }
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
      this.setState({
        loading: false
      })
      this.props.setStops(stops)
    })
  }

  render() {
    const stops = this.props.stops
    console.log(stops)
    return (
      <div className="Stops">
        { this.state.showSearchAddress &&
          <SearchAddress updatePosition={this.updatePositionAndGetStopsData.bind(this)} />
        }
        { this.state.locationDenied &&
          <Warning
            message="Geolocation is not enabled in your browser. Enable it if you want to find stops using your current location."
          />
        }
        { !this.state.locationDenied && !this.state.loading &&
          <div className="Stops__updatelocation">
            <button onClick={this.getCurrentGeolocation.bind(this, false)}>
              Update current location
            </button>
          </div>
        }
        { this.state.loading &&
          <p className="Stops__loading">Loading stops ... </p>
        }
        { !!Object.keys(stops).length &&
          Object.keys(stops)
          .filter(stop => stops[stop].stopTimes.length)
          .map( key =>
            <Routes key={ key } {...stops[key]} />
          )
        }
      </div>
    )
  }
}
