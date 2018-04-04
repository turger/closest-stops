import { SET_STOPS } from '../actions/actionTypes'

const initialState = {
  data: {},
}

export default function stops(state = initialState, action) {
  switch (action.type) {
    case SET_STOPS:
      return {
        ...state,
        data: action.stops.reduce((accumulator, stop) => ({
          ...accumulator,
          [stop.node.stop.gtfsId]: mapStop(stop)}), {})
      }
    default:
      return state
  }
}

const mapStop = stop => ({
  distance: stop.node.distance,
  name: stop.node.stop.name,
  desc: stop.node.stop.desc,
  stopTimes: stop.node.stop.stoptimesWithoutPatterns,
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
