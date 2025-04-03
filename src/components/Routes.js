import React from 'react'
import { useAppStore } from '../hooks/useAppStore'
import StopTimes from './StopTimes'
import './Routes.css'

const Routes = ({ oneStopData }) => {
  const {
    stopTimes,
    distance,
    name,
    id,
    desc,
    directions,
    platform,
  } = oneStopData

  return (
    <div className="Routes">
      <div className="Routes__location">
        <div className="Routes__location__info">
          {name}, {distance}m
          <div className="Routes__location__info__address">
            {desc}
            {platform && (
              <div className="Routes__location__info__address__platform">
                {platform}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="Routes__stopTimes">
        {Object.keys(stopTimes).map(key => (
          <StopTimes
            key={`${id}-${stopTimes[key][0].id}`}
            stopTimes={stopTimes[key]}
            directions={directions}
          />
        ))}
      </div>
    </div>
  )
}

export default Routes
