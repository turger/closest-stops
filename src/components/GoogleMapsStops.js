/*global google*/
import React, { Component } from 'react'
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps'
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"
import dot from '../assets/dot.svg'
import './GoogleMapsStops.css'

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
  const {onMapMounted, ...otherProps} = props
  return <GoogleMap {...otherProps} ref={c => {
      onMapMounted && onMapMounted(c)}}>{props.children}</GoogleMap>
}))


export default class GoogleMapsStops extends Component {
  constructor(props) {
    super()
    this.state = {
      markers: {},
      lat: null,
      lon: null,
    }

    this._map = null
  }

  componentDidMount() {
    this.setState({ markers: this.props.stops })
  }

  componentWillReceiveProps(nextProps) {
    const stopsChanged = JSON.stringify(nextProps.stops) !== JSON.stringify(this.props.stops)
    const coordsChanged = JSON.stringify(nextProps.coords) !== JSON.stringify(this.props.coords)
    this.props = nextProps
    if (stopsChanged) {
      this.setState({markers: this.props.stops})
    }
    if (coordsChanged && (this.props.manualLocationInput || !this.state.lat)) {
      this.setState({ lat: this.props.coords.lat, lon: this.props.coords.lon })
    }
  }

  click(id) {
    const markers = this.state.markers
    this.setState({ 
      markers: Object.keys(markers).reduce((accumulator, key) => ({
        ...accumulator,
        [key]: {
          ...markers[key],
          expand: key===id ? (markers[key].expand >= 2 ? 0 : markers[key].expand+1) : markers[key].expand
        }
      }), {}),
      lat: this._map.props.center.lat,
      lon: this._map.props.center.lng
    })
  }

  handleMapMounted = map => {
    if (!map) return
    this._map = map
  }

  handleCenterChanged() {
    this.setState({ lat: this._map.getCenter().lat(), lon: this._map.getCenter().lng() })
  }

  render() {
    const markers = this.state.markers
    if (!this.props.coords) return null
    const lat = this.state.lat || this.props.coords.lat
    const lon = this.state.lon || this.props.coords.lon
    return (
      <GoogleMapsWrapper
        onMapMounted={this.handleMapMounted}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJB_Kp1qeibdQD2Q1bRNSc8r3GW1MDGEE&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `100%`}}/>}
        mapElement={<div style={{height: `100%`}}/>}
        defaultZoom={16}
        defaultClickableIcons={false}
        center={{lat: lat, lng: lon}}
        onCenterChanged={this.handleCenterChanged.bind(this)}
      >
          { Object.keys(markers).map(key => (
            <MarkerWithLabel
              key={markers[key].id}
              position={{lat: markers[key].lat, lng: markers[key].lon}}
              onClick={this.click.bind(this, key)}
              labelAnchor={new google.maps.Point(0, markers[key].expand === 2 ? 71 : 37)}
              icon={new google.maps.MarkerImage(
                dot,
                null,null,null,
                new google.maps.Size(25, 25)
              )}
            >
              <div 
                className="GoogleMapsStops__label"
                onClick={this.click.bind(this, key)}
              >
                { Object.keys(this.props.stops).length !== 0 && markers[key].stoptimes
                .slice(0, markers[key].expand === 2 ? 3 : markers[key].expand)
                .map((stopTime, i) => (
                  <div 
                    key={markers[key].id+i} 
                    className="GoogleMapsStops__label__stopTime"
                  > 
                    <div className="GoogleMapsStops__label__stopTime__route">
                      {stopTime.shortName}
                    </div> 
                    <div className="GoogleMapsStops__label__stopTime__minutes">
                      {stopTime.departureTime}
                    </div> 
                  </div>
                ))}
              </div>
            </MarkerWithLabel>
          ))}
      </GoogleMapsWrapper>
    )
  }
}
