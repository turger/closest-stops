import React from 'react'
import { useAppStore } from '../hooks/useAppStore'
// import GoogleMapsDirections from './GoogleMapsDirectionsIndex'
import StopTimes from './StopTimes'
import './Routes.css'

const Routes = ({stopData}) => {
  const location = useAppStore(state => state.location)
  // const stopData = useAppStore(state => state.stopData)

  const { stopTimes, distance, name, id, desc, directions, platform, lat, lon } = stopData
  const coords = location.coords

  return(
    <div className="Routes">
      <div className="Routes__location">
        <div className="Routes__location__info">
          {name}, {distance}m
          <div className="Routes__location__info__address">
            {desc} 
            { platform && <div className="Routes__location__info__address__platform">{platform}</div> }
          </div>
        </div>
      </div>
      <div className="Routes__stopTimes">
        {Object.keys(stopTimes).map(key =>          
          <StopTimes
            key={`${id}-${stopTimes[key][0].id}`}
            stopTimes={ stopTimes[key] }
            directions={ directions }
          />
        )}
      </div>
    </div>
  )
}

export default Routes
