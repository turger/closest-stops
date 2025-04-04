import { useAppStore } from '../hooks/useAppStore'
import { filterStops } from '../utils/formatUtils'
import Routes from './Routes'
import './Stops.css'
import React from 'react'

const Stops = ({ onlyFavorites = false }) => {
  const stopsData = useAppStore((state) => state.stopsData)
  const loading = useAppStore((state) => state.loading)
  const favoriteRoutes = useAppStore((state) => state.favoriteRoutes)

  const filteredStops = filterStops(
    stopsData.stops,
    onlyFavorites,
    favoriteRoutes,
    stopsData.hiddenVehicles
  )

  return (
    <div className="Stops">
      {loading && <div className="Stops_loader" />}

      {Object.keys(filteredStops).length === 0 && !loading && (
        <div className="Stops__empty">
          {onlyFavorites ? 'No favorites' : 'No location available'}
        </div>
      )}

      {Object.keys(filteredStops).map((key) => (
        <Routes key={key} oneStopData={filteredStops[key]} />
      ))}
    </div>
  )
}

export default Stops
