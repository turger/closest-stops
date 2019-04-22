import { connect } from 'react-redux'
import React, { Component } from 'react'
import HeaderFilterMenu from './HeaderFilterMenu'
import { setHiddenVehicles } from '../stops/stopsActions'
import Header from './Header'

class HeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showWarning: true
    }
  }

  handleShowWarningClick() {
    this.setState({ showWarning: !this.state.showWarning })
  }

  handleVehicleClick(vehicle) {
    const hiddenVehicles = this.props.hiddenVehicles 
    if (hiddenVehicles.includes(vehicle)) {
      this.props.setHiddenVehicles(hiddenVehicles.filter(e => e !== vehicle.toString()))
    } else {
      this.props.setHiddenVehicles(hiddenVehicles.concat([vehicle]))
    }    
  }

  render() {
    return (
      <Header
        locationDenied={ this.props.locationDenied } 
        handleShowWarningClick={ this.handleShowWarningClick.bind(this) } 
        showWarning={ this.state.showWarning }
      >
        <HeaderFilterMenu
          hiddenVehicles={ this.props.hiddenVehicles }
          handleVehicleClick={ this.handleVehicleClick.bind(this) }
        />
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  locationDenied: state.location.locationDenied,
  stops: state.stops.data,
  loading: state.stops.loading,
  coords: state.location.coords,
  radius: state.location.radius,
  hiddenVehicles: state.stops.hiddenVehicles
})

const mapDispatchToProps = dispatch => ({
  setHiddenVehicles: vehicles => dispatch(setHiddenVehicles(vehicles))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)