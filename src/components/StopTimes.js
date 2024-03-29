import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import Draggable from 'react-draggable'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Vehicle from './Vehicle'
import heart from '../assets/heart2.svg'
import remove from '../assets/remove.svg'
import './StopTimes.css'

const DISTANCE_TRESHOLD = 80
const DRAG_THRESHOLD = 10
const SCROLL_THRESHOLD = 15

class StopTimes extends Component {
  constructor() {
    super()
    this.state = {
      highlightSwipe: false,
      resetPosition: null,
      dragging: false,
      scrolling: true,
    }

    this._dragY = 0
    this._dragX = 0
  }

  handleMouseMove = () => {
    if (this._dragY > SCROLL_THRESHOLD && !this.state.dragging) {
      this.setState({ scrolling: true, dragging: false })
    } else if (this._dragX > DRAG_THRESHOLD && this._dragY < SCROLL_THRESHOLD) {
      this.setState({ scrolling: false, dragging: true })
    }
  }

  handleMouseLeave = () => {
    this.setState({ scrolling: true, dragging: false })
    this._dragY = 0
    this._dragX = 0
  }

  handleDrag = (e, ui) => {
    this._dragY += ui.deltaY
    this._dragX += Math.abs(ui.deltaX)

    if (this.state.scrolling && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.scrollBy(0, this._dragY * -1)
    }

    this.setState({
      highlightSwipe: Math.abs(ui.lastX) > DISTANCE_TRESHOLD,
    })
  }

  handleStop = (e, ui) => {
    const distance = Math.abs(ui.lastX)
    this.resetPosition(ui.node)
    if (distance < DISTANCE_TRESHOLD) return
    this.updateFavorites()
  }

  updateFavorites = () => {
    const route = this.props.stopTimes[0].shortName
    const { favorites, history } = this.props
    const rootUrl = '/' + (this.props.filterFavorites ? 'favorites' : 'all') + '/'

    if (favorites.includes(route)) {
      this.removeUrlRoute(route, favorites, history, rootUrl)
    } else {
      this.addUrlRoute(route, favorites, history, rootUrl)
    }
  }

  removeUrlRoute = (route, favorites, history, rootUrl) => {
    if (favorites.includes(route)) history.push(rootUrl + favorites.filter(e => e !== route).toString())
  }

  addUrlRoute = (route, favorites, history, rootUrl) => {
    if (!favorites.includes(route)) history.push(rootUrl + (favorites.length !== 0 ? `${favorites},` : '') + route)
  }

  resetPosition = () => {
    this.setState({
      resetPosition: { x: 0, y: 0 },
      highlightSwipe: false,
    })
  }

  render() {
    const { stopTimes, directions, favorites } = this.props

    let swipeContent
    let swipeClasses = ['StopTimes__swipe']
    const route = stopTimes[0].shortName

    if (favorites.includes(route)) {
      swipeContent = remove
      swipeClasses.push('StopTimes__swipe--remove')
    } else {
      swipeContent = heart
      swipeClasses.push('StopTimes__swipe--add')
    }

    return (
      <div
        className={classnames('StopTimes', { 'StopTimes--highlightSwipe': this.state.highlightSwipe })}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onTouchEnd={this.handleMouseLeave}
      >
        <div className={swipeClasses.join(' ')}>
          <ReactSVG
            src={swipeContent}
            beforeInjection={(svg) => {
              svg.classList.add('StopTimes__icon__svg')
            }}
            className="StopTimes__icon"
          />
        </div>
        <Draggable
          axis="x"
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          position={this.state.resetPosition}
          bounds={{ top: -50, left: 0, right: 120, bottom: 50 }}
          value={route}
        >
          <div className="StopTimes__box">
            <div className="StopTimes__box__left">
              <Vehicle mode={stopTimes[0].mode} love={favorites.includes(route)} />
              <div className="StopTimes__box__shortName">
                {route}
              </div>
              <div className="StopTimes__box__direction">
                {directions[route].headsign}
              </div>
            </div>
            <div className="StopTimes__box__right">
              <div className="StopTimes__box__time">
                {stopTimes
                  .slice(0, 2)
                  .map(stopTime =>
                    <div key={stopTime.id}> {stopTime.departureTime}</div>
                  )}
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites.routes,
  filterFavorites: state.favorites.filterFavorites
})

export default connect(mapStateToProps)(withRouter(StopTimes))