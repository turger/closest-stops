import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import Warning from './Warning'
import HeaderFilterMenu from './HeaderFilterMenu'
import { useAppStore } from '../hooks/useAppStore'
import { loadLocalStorage } from '../store/localStorage'
import './Header.css'
import { getCurrentGeolocation } from '../services/geolocationService'
import { getStopsAndSchedulesByLocation } from '../services/hslApi'

const Header = () => {
  const state = useAppStore.getState()

  const location = useAppStore(state => state.location)
  const setCoords = useAppStore((state) => state.setCoords)
  const setFavoriteRoutes = useAppStore((state) => state.setFavoriteRoutes)
  const setHiddenVehicles = useAppStore((state) => state.setHiddenVehicles)
  const setLoading = useAppStore((state) => state.setLoading)
  const setStopsData = useAppStore((state) => state.setStopsData)

  const [showWarning, setShowWarning] = useState()

  useEffect( () => {
    const localStorage = loadLocalStorage()
    if (localStorage) {
      setLoading(true)
      localStorage?.location?.coords && setCoords({lat: localStorage.location.coords.lat, lon: localStorage.location.coords.lon})
      setFavoriteRoutes(localStorage.favorites.toString())
      setHiddenVehicles(localStorage.hiddenVehicles)
      setLoading(false)
    }
  }, [])

  const getStopsData = async () => {
    if (!_.get(location.coords, 'lat')) return
    setLoading(true)
    const stopsDataRaw = await getStopsAndSchedulesByLocation(location.coords.lat, location.coords.lon, location.radius)
    setLoading(false)
    setStopsData(stopsDataRaw)
  }

  useEffect(() => {
    getStopsData()
  }, [])

  useEffect(() => {
    getStopsData()
  }, [location.coords])

  useEffect( () => {
    const getCoordinates = async () => {
      const position = await getCurrentGeolocation()
      setCoords(position)
    }

    getCoordinates()

    setInterval(() => {
      getCoordinates()
    }, 60000)
  }, [])

  return(
    <div className="Header">
      { state.location.locationDenied &&
        <Warning
          message="Enable geolocation in your browser if you want to find stops using your current location."
          handleClick={() => setShowWarning(!showWarning)}
          showWarning={showWarning}
        />
      }
      <img src={logo} className="Header-logo" alt="logo" />
      <h1 className="Header-title">Closest stops</h1>
      <HeaderFilterMenu />
    </div>
  )
}

export default (Header)