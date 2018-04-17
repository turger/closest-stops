import React, { Component } from 'react'
import store from '../store/configureStore'
import GoogleMapsDirections from './GoogleMapsDirections.js'
import locationMap from '../assets/location-map.svg'
import StopTimes from './StopTimes'
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
        <div className="Routes__location">
          <img
            className="Routes__location__showMap"
            src={locationMap}
            alt="Show map"
            onClick={this.handleMapClick.bind(this)}
          />
          <div className="Routes__location__info">
            {name}, {distance}m
            <div className="Routes__location__info__address">
              {desc} 
              { platform && <div className="Routes__location__info__address__platform">{platform}</div> }
            </div>
          </div>
        </div>
        { this.state.showMap && 
          <div className="Routes__map">
            <GoogleMapsDirections 
              origin={{lat: coords.lat, lon: coords.lon}} 
              destination={{lat: lat, lon: lon}}
              /> 
          </div>
        }
        {
          <div className="Routes__stopTimes">
          {Object.keys(stopTimes)
            .map(key =>          
              <StopTimes
                key={`${id}-${stopTimes[key][0].id}`}
                stopTimes={ stopTimes[key] }
                directions={ directions }
              />
            )
          }
        </div>
        }
      </div>
    ) 
  }
}

export default Routes
