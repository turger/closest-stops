import React from 'react'
import GoogleMapsStops from '../GoogleMapsStops'
import './Map.css'

const Map = ({ stops, coords, manualLocationInput }) => (
  <div className="Map">
    <GoogleMapsStops
      stops={stops}
      coords={coords}
      manualLocationInput={manualLocationInput}
    />
  </div>
)

export default Map
