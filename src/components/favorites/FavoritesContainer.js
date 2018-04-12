import { connect } from 'react-redux'
import React, { Component } from 'react'
import { addFavoriteRoute, removeFavoriteRoute } from './favoritesActions'
import Favorites from './Favorites'

class FavoritesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: []
    }
  }

  componentDidMount() {
    const stops = this.props.stops
    if (Object.keys(stops).length === 0) return
    const routes = Object.keys(stops).reduce((accumulator, key) => {
      accumulator = accumulator || []
      const directions = stops[key].directions
      accumulator.push.apply(accumulator, Object.keys(directions).map(key => directions[key].routeName))
      return accumulator
    }, [])
    this.setState({ routes: [...new Set(routes)] })
  }

  render() {
    const routes = this.state.routes
    const favorites = this.props.favorites
    return (
        routes &&
          <Favorites
            routes={ routes }
            favorites={ favorites }
        />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  favorites: state.favorites.routes,
  stops: state.stops.data
})

const mapDispatchToProps = dispatch => ({
  addFavoriteRoute: route => dispatch(addFavoriteRoute(route)),
  removeFavoriteRoute: route => dispatch(removeFavoriteRoute(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer)