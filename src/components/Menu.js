import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchAddress from './SearchAddress'
import searchLocation from '../assets/search-location.svg'
import updateLocation from '../assets/update-location.svg'
import { testing, getCurrentGeolocation, manualUpdateCurrentLocation } from '../services/locationService'
import { setLoading } from '../components/stops/stopsActions'
import ReactSVG from 'react-svg'
import './Menu.css'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchAddress: false
    }
  }

  componentDidMount() {
    this.props.setLoading()
    testing()
    getCurrentGeolocation()
    setInterval(() => {
      getCurrentGeolocation()
    } , 60000)

  }

  handleSearchClick() {
    this.setState({ showSearchAddress: !this.state.showSearchAddress })
  }

  render() {
    return(
    <div className="Menu">
      <div className="Menu__bar">
        { window.location.host.includes("localhost") && 
          <div onClick={manualUpdateCurrentLocation}>
            <ReactSVG
              path={ updateLocation }
              className="Menu__updateLocation__svg"
              wrapperClassName="Menu__updateLocation"
            />
          </div>
        }
        <div onClick={this.handleSearchClick.bind(this)}>
          <ReactSVG
            path={ searchLocation }
            className="Menu__search__svg"
            wrapperClassName="Menu__search"
          />
        </div>
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
