import { getDepartureTime } from './calcUtils'
import { uniqWith, isEqual } from 'lodash'

export const mapStop = stop => ({
  distance: stop.node.distance,
  name: stop.node.stop.name,
  desc: stop.node.stop.desc,
  platform: stop.node.stop.platformCode,
  lat: stop.node.stop.lat,
  lon: stop.node.stop.lon,
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

export const filterStops = (stops, favoriteRoutes) => {
  const filteredStops = Object.keys(stops).reduce((accumulator, stop) => {
    const filteredStopTimes = filterStopTimes(stops[stop].stopTimes, favoriteRoutes)
    if (filteredStopTimes.length !== 0) accumulator[stop] = { ...stops[stop], stopTimes: filteredStopTimes } || [] 
    return accumulator
  }, {})
  return filteredStops
}

const filterStopTimes = (stopTimes, favoriteRoutes) => {
  return Object.keys(stopTimes)
    .map(stopTime => stopTimes[stopTime].filter(st => favoriteRoutes.includes(st.shortName)) )
    .filter(stopTime => stopTime.length !== 0)
}