const getCurrentTimestamp = () => {
  return Math.round( new Date().getTime() / 1000)
}

const doQuery = query => new Promise(resolve => {
  fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql'
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

export const getStopsAndSchedulesByLocation = (lat, lon, radius, startTime = getCurrentTimestamp()) => doQuery(`
  {
    stopsByRadius(lat:${lat}, lon:${lon}, radius:${radius}) {
      edges {
        node {
          distance
          stop {
            gtfsId
            name
            stoptimesWithoutPatterns(
              startTime: "${startTime}",
              timeRange: 180000,
              numberOfDepartures:15
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
                }
              }
            }
          }
        }
      }
    }
  }`
).then(res => res.data.stopsByRadius.edges)
