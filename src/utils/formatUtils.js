import { minutesToDeparture, getDepartureTime } from './calcUtils'
import { uniqWith, isEqual } from 'lodash'

export const mapStop = stop => ({
  distance: stop.node.distance,
  name: stop.node.stop.name,
  desc: stop.node.stop.desc,
  platform: stop.node.stop.platformCode,
  stopTimes: formatStopTimes(stop.node.stop.stoptimesWithoutPatterns),
  id: stop.node.stop.gtfsId,
  directions: mapDirections(stop.node.stop.patterns)
})

const mapDirections = directions => {
  return directions.reduce((accumulator, direction) => ({
    ...accumulator,
    [direction.route.shortName]: {
      routeName: direction.route.shortName,
      headsign: direction.headsign,
      original: direction.name
    }
  }), {})
}

const formatStopTimes = stopTimes => {
  return uniqWith(stopTimes, isEqual)
    .filter(stopTime => {
      const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
      return(timeToDeparture > 0 && timeToDeparture < 60*2)
    })
    .reduce((accumulator, stopTime) => {
      const id = stopTime.trip.route.gtfsId
      accumulator[id] = accumulator[id] || []
      accumulator[id].push({
        departureTime: getDepartureTime(stopTime.realtimeArrival, stopTime.serviceDay),
        shortName: stopTime.trip.route.shortName,
        id: `${id}-${stopTime.serviceDay}-${stopTime.realtimeArrival}-${stopTime.scheduledArrival}`,
        mode: stopTime.trip.route.mode
      })
      return accumulator
    }, {})
}