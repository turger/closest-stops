/*global google*/
import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import PropTypes from 'prop-types'
import './SearchAddress.css'

const options = {
  location: new google.maps.LatLng(60.1718730, 24.9414220),
  radius: 500,
  types: ['address'],
}

class SearchAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null
    }

    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.updatePosition(latLng.lat, latLng.lng))
      .catch(error => console.error('Error', error))
  }

  render() {
    const inputProps = {
      value: this.state.address || '',
      onChange: this.onChange,
      placeholder: 'Type your location ...',
    }

    return (
      <div className="SearchAddress">
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <PlacesAutocomplete
            inputProps={inputProps}
            options={options}
          />
          <button
            className="SearchAddress__button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

SearchAddress.propTypes = {
  updatePosition: PropTypes.func.isRequired,
}

export default SearchAddress
