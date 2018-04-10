/*global google*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { setCoords, setManualLocationInput } from './location/locationActions'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import location from '../assets/location-map.svg'
import './SearchAddress.css'

class SearchAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null
    }

    this.onChange = (address) => this.setState({ address })
  }

  handleSubmit = (event) => {
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.props.setCoords({lat: latLng.lat, lon: latLng.lng}),
        this.props.setManualLocationInput(true)
      )
      .catch(error => console.error('Error', error))
  }

  render() {
    const inputProps = {
      value: this.state.address || '',
      onChange: this.onChange,
      placeholder: 'Type your location ...',
    }

    const options = {
      location: new google.maps.LatLng(60.1718730, 24.9414220),
      radius: 500,
      types: ['address'],
    }

    return (
      <div className="SearchAddress">
        <div className="SearchAddress__textField">
          <ReactSVG
            path={ location }
            className="SearchAddress__location__svg"
            wrapperClassName="SearchAddress__location"
          />
          <PlacesAutocomplete
            inputProps={inputProps}
            options={options}
            onEnterKeyDown={this.handleSubmit.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  coords: state.location.coords
})

const mapDispatchToProps = dispatch => ({
  setCoords: coords => dispatch(setCoords(coords)),
  setManualLocationInput: manualLocationInput => dispatch(setManualLocationInput(manualLocationInput))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAddress)
