import { useAppStore } from '../hooks/useAppStore'
import './HeaderFilterMenu.css'
import vehicleAssets from './vehicleAssets'
import classnames from 'classnames'
import React from 'react'
import { ReactSVG } from 'react-svg'

const vehicles = ['BUS', 'TRAM', 'SUBWAY', 'RAIL', 'FERRY']

const HeaderFilterMenu = () => {
  const state = useAppStore.getState()
  const { hiddenVehicles } = useAppStore((state) => state.stopsData)

  const handleVehicleClick = (vehicle) => {
    if (hiddenVehicles?.includes(vehicle)) {
      state.setHiddenVehicles(hiddenVehicles.filter((e) => e !== vehicle.toString()))
    } else {
      state.setHiddenVehicles(hiddenVehicles.concat([vehicle]))
    }
  }

  return (
    <div className="HeaderFilterMenu">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle}
          className={classnames(
            'HeaderFilterMenu__vehicle',
            `HeaderFilterMenu__vehicle--${vehicle}`,
            {
              'HeaderFilterMenu__vehicle--hidden': hiddenVehicles?.includes(vehicle)
            }
          )}
          onClick={() => handleVehicleClick(vehicle)}
        >
          <ReactSVG
            src={vehicleAssets[vehicle]}
            beforeInjection={(svg) => {
              svg.classList.add('HeaderFilterMenu__vehicle__icon__svg')
            }}
            className="HeaderFilterMenu__vehicle__icon"
          />
        </div>
      ))}
    </div>
  )
}

export default HeaderFilterMenu
