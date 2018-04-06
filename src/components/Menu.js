import React, { Component } from 'react'
import Location from './location/LocationContainer'
import SearchAddress from './SearchAddress'
import searchLocation from '../assets/search-location.svg'
import './Menu.css'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchAddress: false,
    }
  }

  handleSearchClick() {
    this.setState({ showSearchAddress: !this.state.showSearchAddress })
  }

  render() {
    return(
    <div className="Menu">
      <div className="Menu__bar">
        <Location />
        <img
          className="Menu__search"
          src={searchLocation}
          alt="Update location"
          onClick={this.handleSearchClick.bind(this)}
        />
      </div>
      { this.state.showSearchAddress && <SearchAddress />}
    </div>
    )
  }
}

export default Menu
