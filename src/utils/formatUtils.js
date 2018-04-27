import { getDepartureTime, minutesToDeparture } from './calcUtils'
import { uniqWith, isEqual } from 'lodash'

export const mapStop = stop => ({
  distance: stop.node.distance,
  name: stop.node.stop.name,
  desc: stop.node.stop.desc,
  platform: stop.node.stop.platformCode,
  lat: stop.node.stop.lat,
  lon: stop.node.stop.lon,
  stopTimes: formatStopTimes(stop.node.stop.stoptimesWithoutPatterns),
  nextFiveStopTimes: formatNextFiveStopTimes(stop.node.stop.stoptimesWithoutPatterns),
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
        mode: stopTime.trip.route.mode,
        realtimeArrival: stopTime.realtimeArrival, 
        serviceDay: stopTime.serviceDay
      })
      return accumulator
    }, {})
}

const formatNextFiveStopTimes = stopTimes => {
  return Array.from(uniqWith(stopTimes, isEqual)
    .filter(stopTime => minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay) > 0)
    .slice(0, 5)
    .map(stopTime => ({
      departureTime: getDepartureTime(stopTime.realtimeArrival, stopTime.serviceDay),
      shortName: stopTime.trip.route.shortName
    }))
  )
}

export const filterStops = (stops, filterFavorites, favoriteRoutes, vehiclesToHide) => {
  return Object.keys(stops).reduce((accumulator, stop) => {
    const filteredStopTimes = filterStopTimes(stops[stop].stopTimes, filterFavorites, favoriteRoutes, vehiclesToHide)
    if (filteredStopTimes.length !== 0) accumulator[stop] = { ...stops[stop], stopTimes: filteredStopTimes } || [] 
    return accumulator
  }, {})
}

const filterStopTimes = (stopTimes, filterFavorites, favoriteRoutes, vehiclesToHide) => {
  return Object.keys(stopTimes)
    .map(stopTime => stopTimes[stopTime]
      .reduce((accumulator, st) => {
        if (minutesToDeparture(st.realtimeArrival, st.serviceDay) > 0) {
          accumulator.push({
            ...st,
            departureTime: getDepartureTime(st.realtimeArrival, st.serviceDay)
          })
        }
        return accumulator
      }, [])
      .filter(st => 
        filterFavorites 
        ? favoriteRoutes.includes(st.shortName) && !vehiclesToHide.includes(st.mode)
        : !vehiclesToHide.includes(st.mode) ))
      .filter(st => st.length !== 0)
}

export const filterStopsForMap = stops => {
  const stopsasd = Object.keys(stops).reduce((accumulator, id) => ({
    ...accumulator,
    [id]: {
      id: id,
      lat: stops[id].lat,
      lon: stops[id].lon,
      stoptimes: stops[id].nextFiveStopTimes,
      expand: 1
    }
  }), {})
  return stopsasd
}