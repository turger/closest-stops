import React from 'react'
import logo from '../assets/logo.svg'
import Menu from './Menu'
import './Header.css'

const Header = () => (
  <header className="Header">
    <img src={logo} className="Header-logo" alt="logo" />
    <h1 className="Header-title">Closest stops</h1>
    <Menu/>
  </header>
)

export default Header
