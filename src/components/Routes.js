import React, { Component } from 'react'
import Vehicle from './Vehicle'
import store from '../store/configureStore'
import GoogleMaps from './GoogleMaps.js'
import locationMap from '../assets/location-map.svg'
import './Routes.css'

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMap: false,
    }
  }

  handleMapClick(id) {
    this.setState({ showMap: !this.state.showMap })
  }

  render() {
    const {stopTimes, distance, name, id, desc, directions, platform, lat, lon} = this.props
    const coords = store.getState().location.coords
    return(
      <div className="Routes">
        <div className="Routes__info">{name}, {distance}m</div>
        <div className="Routes__location">
          {desc} 
          { platform && <div className="Routes__location__platform">{platform}</div> }
          <img
            className="Routes__location__showMap"
            src={locationMap}
            alt="Show map"
            onClick={this.handleMapClick.bind(this)}
          />
        </div>
        
        { this.state.showMap && 
          <div className="Routes__map">
            <GoogleMaps 
              currentLocation={{lat: coords.lat, lon: coords.lon}} 
              destination={{lat: lat, lon: lon}}
              /> 
          </div>
        }
        <div className="Routes__times">
          {Object.keys(stopTimes)
            .map(key =>
              <div className="Routes__times__box" key={`${id}-${stopTimes[key][0].id}`}>
                <div className="Routes__times__box__left">
                  <Vehicle mode={stopTimes[key][0].mode}/>
                  <div className="Routes__times__box__shortName">
                    { stopTimes[key][0].shortName }
                  </div>
                  <div className="Routes__times__box__direction">
                    { directions[stopTimes[key][0].shortName].headsign }
                  </div>
                </div>
                <div className="Routes__times__box__right">
                  <div className="Routes__times__box__time">
                  { stopTimes[key]
                    .slice(0,2)
                    .map(stopTime => 
                      <div key={stopTime.id}> { stopTime.departureTime }</div>
                  )}
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    ) 
  }
}

export default Routes
