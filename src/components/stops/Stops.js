import React, { Component } from 'react'
import Routes from '../Routes'
import { filterStops } from '../../utils/formatUtils'
import './Stops.css'

class Stops extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredStops: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    const favoritesChanged = JSON.stringify(nextProps.favoriteRoutes) !== JSON.stringify(this.props.favoriteRoutes)
    const stopsChanged = JSON.stringify(nextProps.stops) !== JSON.stringify(this.props.stops)
    this.props = nextProps
    if (favoritesChanged || stopsChanged) {
      this.setState({ filteredStops: filterStops(this.props.stops, this.props.favoriteRoutes) })
    }
  }

  render() {
    const { stops, loading, filterFavorites } = this.props
    const visibleStops = filterFavorites ? this.state.filteredStops : stops
    return(
      <div className="Stops">
        { loading &&
          <p className="Stops__loading">Loading stops ... </p>
        }
        { Object.keys(visibleStops)
          .filter(stop => Object.keys(visibleStops[stop].stopTimes).length)
          .map( key =>
            <Routes key={ key } {...visibleStops[key]} />
          )
        }
      </div>
    )
  }
}
  
export default Stops
