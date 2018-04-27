import React from 'react'
import classNames from 'classnames'
import ReactSVG from 'react-svg'
import vehicleAssets from '../vehicleAssets'
import './HeaderFilterMenu.css'

const vehicles = ['BUS', 'TRAM', 'SUBWAY', 'RAIL', 'FERRY']

const HeaderFilterMenu = ({ hiddenVehicles, handleVehicleClick }) =>
  <div className="HeaderFilterMenu">
    { vehicles.map(vehicle => 
      <div 
        key={ vehicle } 
        className={classNames(
          "HeaderFilterMenu__vehicle", 
          "HeaderFilterMenu__vehicle--"+vehicle, 
          {"HeaderFilterMenu__vehicle--hidden" : hiddenVehicles.includes(vehicle)} 
        )}
        onClick={() => handleVehicleClick(vehicle)}
      >
        <ReactSVG
          path={ vehicleAssets[vehicle] }
          className="HeaderFilterMenu__vehicle__icon__svg"
          wrapperClassName="HeaderFilterMenu__vehicle__icon"
        />
      </div>
    )}
  </div>
  
export default HeaderFilterMenu
