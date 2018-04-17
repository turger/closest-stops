import { connect } from 'react-redux'
import React, { Component } from 'react'
import logo from '../assets/logo.svg'
import Warning from './Warning'
import { setStops, setLoading } from './stops/stopsActions'
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showWarning: true
    }
  }

  handleShowWarningClick() {
    this.setState({ showWarning: !this.state.showWarning })
  }

  render() {
    return (
      <header className="Header">
        { this.props.locationDenied &&
          <Warning
            message="Geolocation is not enabled in your browser. Enable it if you want to find stops using your current location."
            handleClick={this.handleShowWarningClick.bind(this)}
            showWarning={this.state.showWarning}
          />
        }
        <img src={logo} className="Header-logo" alt="logo" />
        <h1 className="Header-title">Closest stops</h1>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  locationDenied: state.location.locationDenied,
  stops: state.stops.data,
  loading: state.stops.loading,
  coords: state.location.coords,
  radius: state.location.radius,
})

const mapDispatchToProps = dispatch => ({
  setStops: stops => dispatch(setStops(stops)),
  setLoading: loading => dispatch(setLoading(loading)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)