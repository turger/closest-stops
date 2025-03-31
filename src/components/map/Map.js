import React from 'react'
// import GoogleMapsStops from '../GoogleMapsStops'
import { useAppStore } from '../../hooks/useAppStore';
import './Map.css'

const Map = () => {
  const state = useAppStore.getState()

  const { coords } = state.location
  const { stops } = state.stopsData

  return (
    <div className="Map">
      Map is coming here later
      {/* <GoogleMapsStops
        stops={stops}
        coords={coords}
        manualLocationInput={state.manualLocationInput}
      /> */}
    </div>
)}

export default Map
