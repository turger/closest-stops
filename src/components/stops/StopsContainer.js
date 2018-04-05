import { connect } from 'react-redux'
import { setStops } from './stopsActions'
import Stops from './Stops'

// todo: kaikki toiminnallisuudet tänne
// siirrä myös state stopsista

const mapStateToProps = state => ({
  stops: state.stops.data
})

const mapDispatchToProps = dispatch => ({
  setStops: stops => dispatch(setStops(stops))
})

export default connect(mapStateToProps, mapDispatchToProps)(Stops)
