import React from 'react';
import { ReactSVG } from 'react-svg';
import { updateCurrentGeoLocation } from '../services/locationService';
import updateLocation from '../assets/update-location.svg';
import './LocationUpdate.css';

const LocationUpdate = () => {
  return (
    <div className="LocationUpdate">
      <div onClick={updateCurrentGeoLocation}>
        <ReactSVG
          src={updateLocation}
          beforeInjection={(svg) => {
            svg.classList.add('LocationUpdate__locate__svg')
          }}
          className="LocationUpdate__locate__button"
        />
      </div>
    </div>
  )
}

export default LocationUpdate;
