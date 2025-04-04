const getCurrentGeolocation = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
    })

    return {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
  } catch (error) {
    console.error('Error getting location:', error)
    throw error
  }
}

export const getCurrentCoords = async () => {
  try {
    const location = await getCurrentGeolocation()

    return location
  } catch (error) {
    console.error('Error getting location:', error)
    throw error
  }
}
