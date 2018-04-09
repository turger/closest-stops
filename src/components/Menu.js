import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchAddress from './SearchAddress'
import searchLocation from '../assets/search-location.svg'
import updateLocation from '../assets/update-location.svg'
import './Menu.css'
import { testing, getCurrentGeolocation, manualUpdateCurrentLocation } from '../services/locationService'
import { setLoading } from '../components/stops/stopsActions'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchAddress: false,
    }
  }

  componentDidMount() {
    this.props.setLoading()
    testing()
    //getCurrentGeolocation()
    setInterval(() => {
      //getCurrentGeolocation()
    } , 60000)

  }

  handleSearchClick() {
    this.setState({ showSearchAddress: !this.state.showSearchAddress })
  }

  render() {
    return(
    <div className="Menu">
      <div className="Menu__bar">
        <img
            className="Menu__updateLocation"
            src={updateLocation}
            alt="Update location"
            onClick={manualUpdateCurrentLocation}
          />
        <img
          className="Menu__search"
          src={searchLocation}
          alt="Search location"
          onClick={this.handleSearchClick.bind(this)}
        />
      </div>
      { this.state.showSearchAddress && <SearchAddress />}
    </div>
    )
  }
}


const mapStateToProps = state => ({
  locationDenied: state.location.locationDenied
})

export default connect(mapStateToProps, {
  setLoading
})(Menu)
