import React from 'react'
import Routes from '../Routes'
import './Stops.css'

const Stops = ({ stops, loading }) => (
  <div className="Stops">
    { loading &&
      <p className="Stops__loading">Loading stops ... </p>
    }
    { Object.keys(stops)
      .filter(stop => Object.keys(stops[stop].stopTimes).length)
      .map( key =>
        <Routes key={ key } {...stops[key]} />
      )
    }
  </div>
)

export default Stops
