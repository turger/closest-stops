import React from 'react'
import Warning from '../Warning'
import updateLocation from '../../assets/update-location.svg'

const Location = ({ locationDenied, manualUpdateCurrentLocation }) => (
  <div className="Location">
    { !locationDenied &&
      <img
        className="Location__update"
        src={updateLocation}
        alt="Update location"
        onClick={manualUpdateCurrentLocation}
      />
    }
    { locationDenied &&
      <Warning
        message="Geolocation is not enabled in your browser. Enable it if you want to find stops using your current location."
      />
    }
  </div>
)

export default Location
