import React from 'react'
import classNames from 'classnames'
import ReactSVG from 'react-svg'
import vehicleAssets from './vehicleAssets'
import heart from '../assets/love.svg'
import './Vehicle.css'

const Vehicle = ({ mode, love }) => {
  return (
    <div className={classNames("Vehicle", "Vehicle--"+mode)}>
    { mode in vehicleAssets &&
      <ReactSVG
        path={ love ? vehicleAssets[mode+'-LOVE'] : vehicleAssets[mode] }
        className="Vehicle__icon__svg"
        wrapperClassName="Vehicle__icon"
      /> 
    }
    { love &&  
      <ReactSVG
        path={ heart }
        className="Vehicle__heart__svg"
        wrapperClassName="Vehicle__heart"
      /> 
    }
    { !(mode in vehicleAssets) && mode }
    </div>
  ) 
}

export default Vehicle
