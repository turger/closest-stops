// /*global google*/
// import React, { useState, useEffect, useRef } from 'react'
// import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
// import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"
// import dot from '../assets/dot.svg'
// import currentLocation from '../assets/current-location-map.svg'
// import gmapStyle from '../styles/gmapStyle.json'
// import './GoogleMapsStops.css'
// import classnames from 'classnames'
// import PropTypes from 'prop-types'

// const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
//   const {onMapMounted, ...otherProps} = props
//   return <GoogleMap {...otherProps} ref={c => {
//       onMapMounted && onMapMounted(c)}}>{props.children}</GoogleMap>
// }))

// const GoogleMapsStops = ({ stops, coords }) => {
//   const [markers, setMarkers] = useState({})
//   const [lat, setLat] = useState(null)
//   const [lon, setLon] = useState(null)
//   const mapRef = useRef(null)

//   useEffect(() => {
//     setMarkers(stops)
//     setLat(coords.lat)
//     setLon(coords.lon)
//   }, [stops, coords])

//   const click = (id) => {
//     setMarkers(prevMarkers => 
//       Object.keys(prevMarkers).reduce((accumulator, key) => ({
//         ...accumulator,
//         [key]: {
//           ...prevMarkers[key],
//           expand: key === id ? (prevMarkers[key].expand >= 2 ? 0 : prevMarkers[key].expand+1) : prevMarkers[key].expand
//         }
//       }), {})
//     )
//     if (mapRef.current) {
//       setLat(mapRef.current.props.center.lat)
//       setLon(mapRef.current.props.center.lng)
//     }
//   }

//   const handleMapMounted = map => {
//     if (!map) return
//     mapRef.current = map
//   }

//   const handleCenterChanged = () => {
//     if (mapRef.current) {
//       setLat(mapRef.current.getCenter().lat())
//       setLon(mapRef.current.getCenter().lng())
//     }
//   }

//   if (!coords) return null
//   const currentLat = lat || coords.lat
//   const currentLon = lon || coords.lon

//   return (
//     <GoogleMapsWrapper
//       onMapMounted={handleMapMounted}
//       googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
//       loadingElement={<div style={{height: `100%`}}/>}
//       containerElement={<div style={{height: `100%`}}/>}
//       mapElement={<div style={{height: `100%`}}/>}
//       defaultZoom={16}
//       defaultClickableIcons={false}
//       center={{lat: currentLat, lng: currentLon}}
//       onCenterChanged={handleCenterChanged}
//       defaultOptions={{
//         styles: gmapStyle,
//         streetViewControl: false,
//         scaleControl: false,
//         mapTypeControl: false,
//         panControl: false,
//         zoomControl: true,
//         rotateControl: false,
//         fullscreenControl: false
//       }}
//       disableDefaultUI
//     >
//       <Marker 
//         position={{ lat: coords.lat, lng: coords.lon }} 
//         icon={new google.maps.MarkerImage(
//           currentLocation,
//           null,null,null,
//           new google.maps.Size(40, 40)
//         )}
//       />
//       { Object.keys(markers).map(key => (
//         <MarkerWithLabel
//           key={markers[key].id}
//           position={{lat: markers[key].lat, lng: markers[key].lon}}
//           onClick={() => click(key)}
//           labelAnchor={new google.maps.Point(0, markers[key].expand === 2 ? 67 : 33)}
//           icon={new google.maps.MarkerImage(
//             dot,
//             null,null,null,
//             new google.maps.Size(15, 15)
//           )}
//         >
//           <div
//             className={classnames('GoogleMapsStops__label', { 'GoogleMapsStops__label--bg': markers[key].expand !== 0 })}
//             onClick={() => click(key)}
//           >
//             { Object.keys(markers[key].stoptimes).length !== 0 && markers[key].stoptimes
//               .slice(0, markers[key].expand === 2 ? 3 : markers[key].expand)
//               .map((stopTime, i) => (
//                 <div
//                   key={markers[key].id+i}
//                   className="GoogleMapsStops__label__stopTime"
//                 >
//                   <div className="GoogleMapsStops__label__stopTime__route">
//                     {stopTime.shortName}
//                   </div>
//                   <div className="GoogleMapsStops__label__stopTime__minutes">
//                     {stopTime.departureTime}
//                   </div>
//                 </div>
//             ))}
//           </div>
//         </MarkerWithLabel>
//       ))}
//     </GoogleMapsWrapper>
//   )
// }

// GoogleMapsStops.propTypes = {
//   stops: PropTypes.object.isRequired,
//   coords: PropTypes.shape({
//     lat: PropTypes.number.isRequired,
//     lon: PropTypes.number.isRequired
//   }).isRequired
// }

// export default GoogleMapsStops
