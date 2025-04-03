import React from 'react'
// import GoogleMapsStops from '../GoogleMapsStops'
import { useAppStore } from '../../hooks/useAppStore'
import LeafLetMapStops from './LeafletMapStops'
import './Map.css'

const Map = () => {
  const location = useAppStore((state) => state.location)
  const stopsData = useAppStore((state) => state.stopsData)

  return (
    <div className="Map">
      <LeafLetMapStops
        stops={stopsData.stops}
        coords={location.coords}
      />
    </div>
)}

export default Map
