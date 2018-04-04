import React from 'react'
import logo from '../assets/bus-stop.svg'
import './Header.css'

const Header = () => (
  <header className="Header">
    <img src={logo} className="Header-logo" alt="logo" />
    <h1 className="Header-title">Closest stops</h1>
  </header>
)

export default Header
