import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import { getStopsAndSchedulesByLocation } from './Requests'
import Route from './Route'
import './Routes.css'

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stops: null,
    }
  }

  componentDidMount() {
    this.getStopsData()
    setInterval(() => {
      this.getStopsData()
    } , 60000)
  }

  getStopsData() {
    // TODO: add geolocation
    console.log(navigator.geolocation)
    getStopsAndSchedulesByLocation(60.157330, 24.877253).then(stops => {
      let stopsData = {}
      Object.keys(stops).map( key =>
        stopsData[key] = {
          distance: stops[key].node.distance,
          name: stops[key].node.stop.name,
          stopTimes: stops[key].node.stop.stoptimesWithoutPatterns
        }
      )
      this.setState({ stops: stopsData })
    })
  }

  render() {
    if (!this.state.stops) return null
    const stops = this.state.stops
    return (
      <div className="Routes">
      { Object.keys(stops)
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
