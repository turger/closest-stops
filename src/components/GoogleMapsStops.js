import React from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer"

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
  const {onMapMounted, ...otherProps} = props
  return <GoogleMap {...otherProps} ref={c => {
    onMapMounted && onMapMounted(c)
  }}>{props.children}</GoogleMap>
}))

export default class GoogleMapsStops extends React.Component {

  state = {
    markers: [
      {id:1, lat:60.192059, lon:24.945831}, 
      {id:2, lat:60.155999376, lon:24.868663192},
      {id:3, lat:60.16225, lon:24.88728},
      {id:4, lat:60.16085, lon:24.88808}
    ],
  }

  componentDidMount() {
    //this.setState({markers: data})
  }

  _mapRef = null

  _handleMapMounted = (c) => {
    if (!c || this._mapRef) return
    this._mapRef = c
    console.log('Ref set later @ ' + Date.now())
  }

  _handleBoundsChanged = () => {
    if (!this._mapRef) return
    const center = this._mapRef.getCenter()
    const bounds = this._mapRef.getBounds()
    // console.log(center, bounds)
  }

  render() {
    console.log('MAP', this.props)
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJB_Kp1qeibdQD2Q1bRNSc8r3GW1MDGEE&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `100%`}}/>}
        mapElement={<div style={{height: `100%`}}/>}
        defaultZoom={14}
        defaultCenter={{lat: 60.155999376, lng: 24.868663192}}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}>
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              position={{lat: marker.lat, lng: marker.lon}}
            />
          ))}
        </MarkerClusterer>
      </GoogleMapsWrapper>
    )
  }
}

/*
const GoogleMapsStops = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDJB_Kp1qeibdQD2Q1bRNSc8r3GW1MDGEE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ 
      height: '100%'
    }} />,
    mapElement: <div style={{ 
      height: '100%',
     }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 41.850033, lng: -87.6500523 }}
  >
    <FusionTablesLayer
      url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
      options={{
        query: {
          select: 'Geocodable address',
          from: '1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg'
        }
      }}
    />
  </GoogleMap>
)

export default GoogleMapsStops*/