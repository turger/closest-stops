export const getCurrentCoords = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
    })

    return {
      coords: {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      },
      error: undefined
    }
  } catch (error) {
    console.error('Error getting location:', error)
    return {
      coords: {},
      error: error
    }
  }
}
