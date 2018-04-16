/*global google*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { setCoords, setManualLocationInput } from './location/locationActions'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import searchLocation from '../assets/search-location.svg'
import location from '../assets/location-map.svg'
import './SearchAddress.css'

class SearchAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null,
      showSearchAddress: false
    }

    this.onChange = (address) => this.setState({ address })
  }

  handleSearchClick() {
    this.setState({ 
      showSearchAddress: !this.state.showSearchAddress,
    })
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
        { this.state.showSearchAddress && 
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
        }
        <div onClick={this.handleSearchClick.bind(this)}>
          <ReactSVG
            path={ searchLocation }
            className="SearchAddress__button__svg"
            wrapperClassName="SearchAddress__button"
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
