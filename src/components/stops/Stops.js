import React from 'react'
import Routes from '../Routes'
import './Stops.css'

const Stops = ({ stops, loading }) =>
  <div className="Stops">
    { loading &&
      <p className="Stops__loading">Loading stops ... </p>
    }
    { Object.keys(stops).length === 0 && !loading && 
      <div className="Stops__empty">:(</div>
    }
    { Object.keys(stops)
      .map( key => 
        <Routes key={ key } {...stops[key]} />
      )
    }
  </div>
  
export default Stops
