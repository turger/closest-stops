import React from 'react'
import Vehicle from './Vehicle'
import './Routes.css'

const Routes = ({stopTimes, distance, name, id, desc, directions, platform}) => (
  <div className="Routes">
    <div className="Routes__info">{name}, {distance}m</div>
    <div className="Routes__location">
      {desc} 
      { platform && <div className="Routes__location__platform">{platform}</div> }
    </div>
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

export default Routes
