import React from 'react'
import PropTypes from 'prop-types'
import Direction from 'react-icons/lib/fa/long-arrow-right'
import './Routes.css'

export const getTimeIfMoreThan60min = (minutesToDeparture, departureTimestamp) => {
  if (minutesToDeparture >= 60) {
    const depDate = new Date(departureTimestamp * 1000)
    const hours = depDate.getUTCHours()
    const minutes = ('0' + depDate.getUTCMinutes()).slice(-2)
    return `${hours}:${minutes}`
  } else {
    return minutesToDeparture + ' min'
  }
}

export const minutesToDeparture = (departureTimestamp, serviceDay, currDate = new Date()) => {
  const currDateInSeconds = (currDate.getHours()*60*60)+(currDate.getMinutes()*60)+currDate.getSeconds()
  const secondsInDay = 86400
  let minutesToDeparture = Math.floor((departureTimestamp-currDateInSeconds) / 60)
  // if service day is next day
  if (serviceDay > (currDate.setHours(0,0,0,0) / 1000)) {
    minutesToDeparture = Math.floor(((departureTimestamp+secondsInDay)-currDateInSeconds) / 60)
  // else if departureTimestamp is more than 24h, this happens between 00:00-06:00
  } else if (departureTimestamp-currDateInSeconds > secondsInDay) {
    minutesToDeparture = Math.floor(((departureTimestamp-secondsInDay)-currDateInSeconds) / 60)
  }
  return getTimeIfMoreThan60min(minutesToDeparture, departureTimestamp)
}

const Routes = ({stopTimes, distance, name, id}) => (
  <div className="Routes">
    <div className="Routes__info">{name} {distance}m</div>
    <div className="Routes__times">
      {stopTimes
        .filter(stopTime => {
          const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
          return(!Number.isInteger(timeToDeparture) || timeToDeparture > 0)}
        )
        .slice(0, 6)
        .map(stopTime => {
          const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
          const route = stopTime.trip.route
          const longName = (route.longName.split("-").pop(-1)).replace(')', '')
          return(
            <div className="Routes__box" key={`${id}-${route.gtfsId}-${stopTime.realtimeArrival}`}>
              <div className="Routes__box__name__long">
                <Direction/> { longName }
              </div>
              <div className="Routes__box__bottom">
                <div className="Routes__box__name__short">
                  { route.shortName }
                </div>
                <div className="Routes__box__time">
                  { timeToDeparture }
                </div>
              </div>
            </div>
          )
        }
      )}
    </div>
  </div>
)

Routes.propTypes = {
  stopTimes: PropTypes.array.isRequired,
  distance: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Routes
