import React from 'react'
import vechileAssets from './vehicleAssets'
import './Vehicle.css'

const Vechile = ({ mode, love }) => {
  return mode in vechileAssets ?
    <img className="Vehicle" src={love ? vechileAssets[mode+'-LOVE'] : vechileAssets[mode]} alt="vehicle"/> :
    mode
}

export default Vechile
