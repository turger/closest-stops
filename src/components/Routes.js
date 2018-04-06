import React from 'react'
import Vehicle from './Vehicle'
import './Routes.css'

const Routes = ({stopTimes, distance, name, id, desc, directions}) => (
  <div className="Routes">
    <div className="Routes__info">{name}, {desc} [{distance}m]</div>
    <div className="Routes__times">
      {stopTimes
        .map(stopTime =>
          <div className="Routes__times__box" key={`${id}-${stopTime.id}`}>
            <div className="Routes__times__box__left">
              <Vehicle mode={stopTime.mode}/>
              <div className="Routes__times__box__shortName">
                { stopTime.shortName }
                { directions[stopTime.shortName] ? ` > ${directions[stopTime.shortName].direction}` : '' }
              </div>
            </div>
            <div className="Routes__times__box__right">
              <div className="Routes__times__box__time">
                { stopTime.departureTime }
              </div>
            </div>
          </div>
        )
      }
    </div>
  </div>
)

export default Routes
