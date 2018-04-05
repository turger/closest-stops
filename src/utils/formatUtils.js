import { minutesToDeparture } from './calcUtils'

export const mapStop = stop => ({
  distance: stop.node.distance,
  name: stop.node.stop.name,
  desc: stop.node.stop.desc,
  stopTimes: formatStopTimes(stop.node.stop.stoptimesWithoutPatterns),
  id: stop.node.stop.gtfsId,
  directions: mapDirections(stop.node.stop.patterns)
})

const mapDirections = directions => {
  return directions.reduce((accumulator, direction) => ({
    ...accumulator,
    [direction.name.split(" ")[0]]: {
      routeName: direction.name.split(" ")[0],
      direction: direction.name.split(" (HSL:")[0].split(" to ").splice(1).toString(),
      original: direction.name
    }
  }), {})
}

const formatStopTimes = stopTimes => {
  return stopTimes
    .filter(stopTime => {
      const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
      return(!Number.isInteger(timeToDeparture) || timeToDeparture > 0)
    })
    .slice(0, 6)
    .map(stopTime => ({
        ...stopTime,
        minutesToDeparture: minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay),
        shortName: stopTime.trip.route.shortName,
        id: `${stopTime.trip.route.gtfsId}-${stopTime.serviceDay}-${stopTime.realtimeArrival}`,
        mode: stopTime.trip.route.mode
      }))
}
