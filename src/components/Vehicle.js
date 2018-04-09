import React from 'react'
import vechileAssets from './vehicleAssets'
import './Vehicle.css'

const Vechile = ({ mode }) => {
  return mode in vechileAssets ?
    <img className="Vehicle" src={vechileAssets[mode]} alt="vehicle"/> :
    mode
}

export default Vechile
