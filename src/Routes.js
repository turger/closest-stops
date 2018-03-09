import React, { Component } from 'react'
import { getStopsAndSchedulesByLocation } from './Requests'
import Route from './Route'
import './Routes.css'

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stops: null,
      lat: null,
      lon: null,
      loading: true
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updatePositionAndGetStopsData, this.onError)
    } else {
      console.error("Cannot get geolocation")
    }
  }

  onError = (e) => {
    console.error(e)
  }

  updatePositionAndGetStopsData = position =>
  new Promise(resolve => {
    if (position) {
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
      resolve(position)
    } else {
      console.error("No position")
    }
  }).then(res => {
    this.getStopsData()
    setInterval(() => {
      this.getStopsData()
    } , 60000)
  })

  getStopsData() {
    getStopsAndSchedulesByLocation(this.state.lat, this.state.lon).then(stops => {
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
      { this.state.loading && <p>Loading ... </p> }
      { !this.state.loading && Object.keys(stops)
        .sort((a, b) => a > b)
        .map( key =>
        <div className="Routes" key={key}>
          <Route routes={ stops[key].stopTimes } distance={ stops[key].distance }/>
        </div>
        )
      }
      </div>
    )
  }
}

export default Routes
