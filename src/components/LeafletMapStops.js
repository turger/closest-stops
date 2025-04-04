import dotRed from '../assets/dot-red.svg'
import { useAppStore } from '../hooks/useAppStore'
import './LeafletMapStops.css'
import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const hereIcon = L.icon({
  iconUrl: dotRed,
  iconSize: [20, 20]
})

const LeafletMapStops = () => {
  const location = useAppStore((state) => state.location)
  const stopsData = useAppStore((state) => state.stopsData)
  const stops = stopsData.stops

  const [markers, setMarkers] = useState({})
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)

  useEffect(() => {
    setLat(location.coords.lat)
    setLon(location.coords.lon)
  }, [location])

  useEffect(() => {
    setMarkers(stops)
  }, [stops])

  if (!lat || !lon || !Object.keys(stops).length) {
    return (
      <div className="LeafletMapStops">
        <div className="LeafletMapStops-nodata">No location available</div>
      </div>
    )
  }

  const getNextThreeStops = (stopTimesArray) =>
    stopTimesArray
      .flat()
      .sort((a, b) => a.realtimeArrival - b.realtimeArrival)
      .slice(0, 3)

  const markersWithLabels = Object.keys(markers).map((key) => {
    const stopMarker = markers[key]
    const stopTimesArray = Object.keys(stopMarker.stopTimes).map((key) => stopMarker.stopTimes[key])
    const nextThreeStops = getNextThreeStops(stopTimesArray)

    return (
      <Marker key={stopMarker.id} position={{ lat: stopMarker.lat, lng: stopMarker.lon }}>
        <Popup>
          {nextThreeStops.map((stopTimes) => (
            <div key={`${stopTimes.shortName}-${stopTimes.departureTime}`}>
              {stopTimes.shortName} - {stopTimes.departureTime}
            </div>
          ))}
        </Popup>
      </Marker>
    )
  })

  return (
    <div className="LeafletMapStops">
      <MapContainer center={[lat, lon]} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker key={lat} position={{ lat: lat, lng: lon }} icon={hereIcon}>
          <Popup>Your are here</Popup>
        </Marker>
        {markersWithLabels}
      </MapContainer>
    </div>
  )
}

export default LeafletMapStops
