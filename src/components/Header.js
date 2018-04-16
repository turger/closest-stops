import { connect } from 'react-redux'
import React, { Component } from 'react'
import logo from '../assets/logo.svg'
import Warning from './Warning'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <header className="Header">
        { this.props.locationDenied &&
          <Warning
            message="Geolocation is not enabled in your browser. Enable it if you want to find stops using your current location."
          />
        }
        <img src={logo} className="Header-logo" alt="logo" />
        <h1 className="Header-title">Closest stops</h1>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  locationDenied: state.location.locationDenied
})

export default connect(mapStateToProps)(Header)
