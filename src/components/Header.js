import logo from '../assets/logo.svg'
import { useAppStore } from '../hooks/useAppStore'
import { getStopsAndSchedulesByLocation } from '../services/hslApi'
import { getCurrentCoords } from '../services/locationService'
import { loadLocalStorage } from '../store/localStorage'
import './Header.css'
import HeaderFilterMenu from './HeaderFilterMenu'
import Warning from './Warning'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'

const getUpdatedCoords = async () => {
  const state = useAppStore.getState()
  const permissions = await navigator.permissions.query({ name: 'geolocation' })

  if (!permissions.state || permissions.state === 'denied') {
    state.setLocationDenied(true)
    return
  }

  state.setLocationDenied(false)
  const coords = await getCurrentCoords()
  state.setCoords(coords)

  return coords
}

const getStopsData = async (updatedCoords) => {
  if (!_.get(updatedCoords, 'lat')) {
    return undefined
  }

  return await getStopsAndSchedulesByLocation(updatedCoords.lat, updatedCoords.lon, location.radius)
}

const Header = () => {
  const location = useAppStore((state) => state.location)
  const setFavoriteRoutes = useAppStore((state) => state.setFavoriteRoutes)
  const setHiddenVehicles = useAppStore((state) => state.setHiddenVehicles)
  const setLoading = useAppStore((state) => state.setLoading)
  const setStopsData = useAppStore((state) => state.setStopsData)

  const [showWarning, setShowWarning] = useState(true)
  const [previousLocation, setPreviousLocation] = useState(location)

  useEffect(() => {
    const localStorage = loadLocalStorage()
    if (localStorage) {
      setFavoriteRoutes(localStorage.favorites.toString())
      setHiddenVehicles(localStorage.hiddenVehicles)
    }
  })

  useEffect(() => {
    const updateStops = async () => {
      setPreviousLocation({ ...location, coords: { lat: location.coords.lat, lon: 24.9277357 } })
      const stopsData = await getStopsData(location.coords)
      setStopsData(stopsData)
    }

    if (
      previousLocation.coords.lat !== location.coords.lat ||
      previousLocation.coords.lon !== location.coords.lon
    ) {
      updateStops()
    }
  }, [
    location,
    location.coords,
    previousLocation.coords.lat,
    previousLocation.coords.lon,
    setLoading,
    setStopsData
  ])

  useEffect(() => {
    const getLocationAndStops = async () => {
      setLoading(true)
      const updatedCoords = await getUpdatedCoords()
      const stopsData = await getStopsData(updatedCoords)
      setStopsData(stopsData)
      setLoading(false)
    }

    getLocationAndStops()

    const oneMin = 60000
    const interval = setInterval(() => {
      getLocationAndStops()
    }, oneMin)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="Header">
      {location.locationDenied && (
        <Warning
          message="Enable geolocation in your browser if you want to find stops using your current location."
          handleClick={() => setShowWarning(!showWarning)}
          showWarning={showWarning}
        />
      )}

      <img src={logo} className="Header-logo" alt="logo" />
      <h1 className="Header-title">Closest stops</h1>
      <HeaderFilterMenu />
    </div>
  )
}

export default Header
