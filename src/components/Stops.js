import React from 'react'
import Routes from './Routes'
import { useAppStore } from '../hooks/useAppStore'
import { filterStops } from '../utils/formatUtils'
import './Stops.css'

const Stops = ({ onlyFavorites = false }) => {
  const stopsData = useAppStore(state => state.stopsData)
  const loading = useAppStore(state => state.loading)
  const favoriteRoutes = useAppStore(state => state.favoriteRoutes)

  const filteredStops = filterStops(
    stopsData.stops,
    onlyFavorites,
    favoriteRoutes,
    stopsData.hiddenVehicles
  )

  return (
    <div className="Stops">
      {loading && (
        <div className="Stops_loader" />
      )}

      {Object.keys(filteredStops).length === 0 && !loading && (
        <div className="Stops__empty">Ei suosikkeja</div>
      )}

      {Object.keys(filteredStops).map(key => (
        <Routes key={key} oneStopData={filteredStops[key]} />
      ))}
    </div>
  )
}

export default Stops
