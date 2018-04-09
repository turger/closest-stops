/*global google*/
import React from 'react'
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

const GoogleMaps = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ 
      height: '200px', 
      width: '80%', 
      borderRadius: '10px',
      overflow: 'hidden' 
    }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService()
      console.log('MOUNT',this.props)
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.currentLocation.lat, this.props.currentLocation.lon),
        destination: new google.maps.LatLng(this.props.destination.lat, this.props.destination.lon),
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          })
        } else {
          console.error(`error fetching directions ${result}`)
        }
      })
    }
  })
)(props =>
  <GoogleMap
      defaultZoom={5}
    >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

export default GoogleMaps