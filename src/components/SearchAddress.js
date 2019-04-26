/* global google */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { setCoords, setManualLocationInput } from './location/locationActions'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { manualUpdateCurrentLocation } from '../services/locationService'
import searchLocation from '../assets/search-location.svg'
import location from '../assets/location-map.svg'
import updateLocation from '../assets/update-location.svg'
import deleteButton from '../assets/round-delete-button.svg'
import './SearchAddress.css'
import classnames from 'classnames'

class SearchAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null,
      showSearchAddress: false,
      errorInAddress: false
    }
  }

  onChange = (address) => this.setState({ address, errorInAddress: false })

  handleSearchClick = () => {
    this.setState({
      showSearchAddress: !this.state.showSearchAddress
    })
  }

  handleSubmit = (address) => {
    this.setState({ address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.props.setCoords({lat: latLng.lat, lon: latLng.lng}),
        this.props.setManualLocationInput(true),
        this.setState({showSearchAddress: false})
      )
      .catch(error => {
        console.log('Google Maps API returned error: ', error)
        this.setState({errorInAddress: true, showSearchAddress: true})
      })
  }

  render() {
    const searchOptions = {
      location: new google.maps.LatLng(60.1718730, 24.9414220),
      radius: 2000,
      componentRestrictions: { country: ['fi'] }
    }
    return (
      <div className="SearchAddress">
        <div onClick={manualUpdateCurrentLocation}>
          <ReactSVG
            src={ updateLocation }
            svgClassName="SearchAddress__locate__svg"
            className="SearchAddress__locate__button"
          />
        </div>
        { this.state.showSearchAddress && 
          <div className="SearchAddress__textField">
            <ReactSVG
              src={ location }
              svgClassName="SearchAddress__location__svg"
              className="SearchAddress__location"
            />
            <PlacesAutocomplete
              value={this.state.address || ''}
              onChange={this.onChange}
              onEnterKeyDown={this.handleSubmit}
              onSelect={this.handleSubmit}
              searchOptions={searchOptions}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search address ...',
                      className: classnames('SearchAddress__search__input', {'SearchAddress__search__input--error': this.state.errorInAddress} )

                    })}
                  />
                  <div className="SearchAddress__dropdown__container">
                    {loading && <div>...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item'
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <div onClick={() => this.setState({address: null})}>
              <ReactSVG
                src={ deleteButton }
                svgClassName="SearchAddress__delete__svg"
                className="SearchAddress__delete__button"
              />
            </div>
          </div>
        }
        <div onClick={() => this.handleSearchClick()}>
          <ReactSVG
            src={ searchLocation }
            svgClassName="SearchAddress__manual__svg"
            className="SearchAddress__manual__button"
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
