import React from 'react'
import logo from '../../assets/logo.svg'
import Warning from '../Warning'
import './Header.css'

const Header = ({ locationDenied, handleShowWarningClick, showWarning, children }) =>
  <div className="Header">
    { locationDenied &&
      <Warning
        message="Enable geolocation if you want to find stops using your current location."
        handleClick={handleShowWarningClick}
        showWarning={showWarning}
      />
    }
    <img src={logo} className="Header-logo" alt="logo" />
    <h1 className="Header-title">Closest stops</h1>
    { children }
  </div>

export default (Header)