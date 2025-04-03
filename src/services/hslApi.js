export const getStopsAndSchedulesByLocation = (lat, lon, radius, startTime = getCurrentTimestamp()) =>
  doQuery(`
  {
    stopsByRadius(lat:${lat}, lon:${lon}, radius:${radius}) {
      edges {
        node {
          distance
          stop {
            gtfsId
            name
            desc
            platformCode
            lat
            lon
            patterns {
              name
              headsign
              route {
                longName
                shortName
              }
            }
            stoptimesWithoutPatterns(
              startTime: "${startTime}",
              timeRange: 7200,
              numberOfDepartures:30
            ) {
              scheduledArrival
              scheduledDeparture
              realtimeArrival
              serviceDay
              trip {
                route {
                  gtfsId
                  longName
                  shortName
                  mode
                }
              }
            }
          }
        }
      }
    }
  }`
  ).then(res => res.data.stopsByRadius.edges)

const getCurrentTimestamp = () => {
  return Math.round(new Date().getTime() / 1000)
}

const doQuery = query => new Promise(resolve => {
  fetch('https://api.digitransit.fi/routing/v2/hsl/gtfs/v1', {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql',
      'digitransit-subscription-key': process.env.REACT_APP_HSL_KEY
    },
    body: query
  })
    .then(res => {
      if (res.status !== 200) throw new Error(res.status)
      resolve(res.json())
    })
    .catch(err => {
      console.warn(err)
      setTimeout(() => {
        resolve(doQuery(query))
      }, 10000)
    })
})
