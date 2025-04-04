import React from 'react'
import classnames from 'classnames'
import { ReactSVG } from 'react-svg'
import vehicleAssets from './vehicleAssets'
import heart from '../assets/love.svg'
import './Vehicle.css'

const Vehicle = ({ mode, love }) => {
  const vehicleIconSrc = love ? vehicleAssets[`${mode}-LOVE`] : vehicleAssets[mode]

  return (
    <div className={classnames('Vehicle', `Vehicle--${mode}`)}>
      {mode in vehicleAssets && (
        <ReactSVG
          src={vehicleIconSrc}
          beforeInjection={(svg) => {
            svg.classList.add('Vehicle__icon__svg')
          }}
          className="Vehicle__icon"
        />
      )}

      {love && (
        <ReactSVG
          src={heart}
          beforeInjection={(svg) => {
            svg.classList.add('Vehicle__heart__svg')
          }}
          className="Vehicle__heart"
        />
      )}

      {!(mode in vehicleAssets) && mode}
    </div>
  )
}

export default Vehicle
