import React from 'react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import vehicleAssets from '../vehicleAssets'
import './HeaderFilterMenu.css'

const vehicles = ['BUS', 'TRAM', 'SUBWAY', 'RAIL', 'FERRY']

const HeaderFilterMenu = ({ hiddenVehicles, handleVehicleClick }) =>
  <div className="HeaderFilterMenu">
    { vehicles.map(vehicle => 
      <div 
        key={ vehicle } 
        className={classnames(
          "HeaderFilterMenu__vehicle", 
          "HeaderFilterMenu__vehicle--"+vehicle, 
          {"HeaderFilterMenu__vehicle--hidden" : hiddenVehicles.includes(vehicle)} 
        )}
        onClick={() => handleVehicleClick(vehicle)}
      >
        <ReactSVG
          src={ vehicleAssets[vehicle] }
          svgClassName="HeaderFilterMenu__vehicle__icon__svg"
          className="HeaderFilterMenu__vehicle__icon"
        />
      </div>
    )}
  </div>
  
export default HeaderFilterMenu
