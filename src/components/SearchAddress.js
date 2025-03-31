/* global google */
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { manualUpdateCurrentLocation } from '../services/locationService';
import searchLocation from '../assets/search-location.svg';
import locationImg from '../assets/location-map.svg';
import updateLocation from '../assets/update-location.svg';
import deleteButton from '../assets/round-delete-button.svg';
import './SearchAddress.css';
import classnames from 'classnames';

const SearchAddress = () => {
  const [address, setAddress] = useState('');
  const [showSearchAddress, setShowSearchAddress] = useState(false);
  const [errorInAddress, setErrorInAddress] = useState(false);

  const onChangeAddress = (address) => {
    setAddress(address)
    setErrorInAddress(false)
  }

  const handleSubmit = (address) => {
    setAddress(address)
    console.log('TODO geocodeByAddress refactor', address)
    // geocodeByAddress(address)
    //   .then(results => getLatLng(results[0]))
    //   .then(latLng =>
    //     state.setCoords({ lat: latLng.lat, lon: latLng.lng }),
    //     state.setManualLocationInput(true),
    //     setShowSearchAddress(false)
    //   )
    //   .catch(error => {
    //     console.log('Google Maps API returned error: ', error)
    //     setErrorInAddress(true)
    //     setShowSearchAddress(true)
    //   })
  }

  const searchOptions = {
    // location: new google.maps.LatLng(60.1718730, 24.9414220),
    // radius: 2000,
    // componentRestrictions: { country: ['fi'] }
  }

  return (
    <div className="SearchAddress">
      <div onClick={manualUpdateCurrentLocation}>
        <ReactSVG
          src={updateLocation}
          beforeInjection={(svg) => {
            svg.classList.add('SearchAddress__locate__svg')
          }}
          className="SearchAddress__locate__button"
        />
      </div>
      {showSearchAddress &&
        <div className="SearchAddress__textField">
          <ReactSVG
            src={locationImg}
            beforeInjection={(svg) => {
              svg.classList.add('SearchAddress__location__svg')
            }}
            className="SearchAddress__location"
          />
          <PlacesAutocomplete
            value={address || ''}
            onChange={onChangeAddress}
            onEnterKeyDown={handleSubmit}
            onSelect={handleSubmit}
            searchOptions={searchOptions}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search address ...',
                    className: classnames('SearchAddress__search__input', { 'SearchAddress__search__input--error': errorInAddress })

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
          <div onClick={() => setAddress(null)}>
            <ReactSVG
              src={deleteButton}
              beforeInjection={(svg) => {
                svg.classList.add('SearchAddress__delete__svg')
              }}
              className="SearchAddress__delete__button"
            />
          </div>
        </div>
      }
      <div onClick={() => setShowSearchAddress(!showSearchAddress)}>
        <ReactSVG
          src={searchLocation}
          beforeInjection={(svg) => {
            svg.classList.add('SearchAddress__manual__svg')
          }}
          className="SearchAddress__manual__button"
        />
      </div>
    </div>
  )
}

export default SearchAddress;
