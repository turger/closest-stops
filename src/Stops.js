import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './Stops.css'

export const getTimeIfMoreThan60min = (minutesToDeparture, departureTimestamp) => {
  if (minutesToDeparture >= 60) {
    const depDate = new Date(departureTimestamp * 1000)
    const hours = depDate.getUTCHours()
    const minutes = ('0' + depDate.getUTCMinutes()).slice(-2)
    return `${hours}:${minutes}`
  } else {
    return minutesToDeparture
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

const Stops = ({routes, distance, name}) => (
  <div className="Stops">
    {routes
      .filter(route => {
        const timeToDeparture = minutesToDeparture(route.realtimeArrival, route.serviceDay)
        return(!Number.isInteger(timeToDeparture) || timeToDeparture > 0)}
      )
      .slice(0, 3)
      .map(route => {
        const timeToDeparture = minutesToDeparture(route.realtimeArrival, route.serviceDay)
        return(
          <div className="Stops__box" key={`${route.trip.route.gtfsId}-${route.realtimeArrival}`}>
            <div className="Stops__box--name">
              {route.trip.route.shortName} {name} {distance}
              <br/>
              {route.trip.route.longName}
            </div>
            <div className={classNames('Stops__box--time',
              {'Stops__box--small': !Number.isInteger(timeToDeparture) }
            )}>
                { timeToDeparture }
            </div>
          </div>
        )
      }
    )}
  </div>
)

Stops.propTypes = {
  routes: PropTypes.array.isRequired,
  distance: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default Stops
