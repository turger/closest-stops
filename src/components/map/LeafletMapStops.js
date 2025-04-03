import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import './LeafletMapStops.css'

const LeafletMapStops = ({stops, coords}) => {
  const [markers, setMarkers] = useState({})
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)

  useEffect(() => {
    setLat(coords.lat)
    setLon(coords.lon)
  }, [coords])

  useEffect(() => {
    setMarkers(stops)
  }, [stops])

  if (!coords || !Object.keys(stops).length) return null

  const currentLat = lat || coords.lat
  const currentLon = lon || coords.lon

  const getNextThreeStops = (stopTimesArray) =>
    stopTimesArray
    .flat()
    .sort((a,b) => a.realtimeArrival - b.realtimeArrival)
    .slice(0,3)
  
  const markersWithLabels = Object.keys(markers).map(key => {
    const stopMarker = markers[key]
    const stopTimesArray = Object.keys(stopMarker.stopTimes).map(key => stopMarker.stopTimes[key])
    const nextThreeStops = getNextThreeStops(stopTimesArray)
    return (
      <Marker
        key={stopMarker.id}
        position={{lat: stopMarker.lat, lng: stopMarker.lon}}
      >
        <Popup>
          {nextThreeStops.map((stopTimes, i) => 
            <div key={stopTimes.shortName+stopTimes.departureTime}>{stopTimes.shortName} - {stopTimes.departureTime}</div>
          )}
        </Popup>
      </Marker>
    )
  })

  return (
    <div className='LeafletMapStops'>
      <MapContainer center={[currentLat, currentLon]} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersWithLabels}
      </MapContainer>
    </div>
  )
}

export default LeafletMapStops