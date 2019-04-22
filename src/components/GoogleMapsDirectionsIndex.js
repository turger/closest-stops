import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import GoogleMapsDirections from './GoogleMapsDirections'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import gmapStyle from '../styles/gmapStyle.json'

class Directions extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultOptions={{
          styles: gmapStyle,
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          rotateControl: false,
          fullscreenControl: false
        }}
        disableDefaultUI
      >
        <GoogleMapsDirections
          origin={this.props.origin}
          destination={this.props.destination}
        />
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{
      height: '200px',
      width: '80%',
      borderRadius: '10px',
      overflow: 'hidden'
    }}
    />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Directions)