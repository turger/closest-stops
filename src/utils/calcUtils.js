export const getDepartureTime = (departureTimestamp, serviceDay) => {
  const minutes = minutesToDeparture(departureTimestamp, serviceDay)
  return getTimeIfMoreThan60min(minutes, departureTimestamp)
}

const minutesToDeparture = (departureTimestamp, serviceDay, currDate = new Date()) => {
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
  return minutesToDeparture
}

const getTimeIfMoreThan60min = (minutesToDeparture, departureTimestamp) => {
  if (minutesToDeparture >= 60) {
    return `${Math.floor(minutesToDeparture/60)}h ${minutesToDeparture%60}min`
  } else {
    return minutesToDeparture + ' min'
  }
}
