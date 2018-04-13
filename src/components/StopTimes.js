import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Draggable from 'react-draggable'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Vehicle from './Vehicle'
import './StopTimes.css'

const DISTANCE_TRESHOLD = 80
const DRAG_THRESHOLD = 10
const SCROLL_THRESHOLD = 15

class StopTimes extends Component {
  constructor(props) {
    super()
    this.state = {
      swipingRight: 0,
      highlightSwipe: false,
      resetPosition: null,
      dragging: false,
      scrolling: true,
      showEvaluation: false,
    }

    this._dom = null
    this._dragY = 0
    this._dragX = 0

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }


  componentDidMount() {
    const dom = this._dom
    dom.addEventListener('mousemove', e => this.handleMouseMove(e))
  }

  handleMouseMove(p, e) {
    if (this._dragY > SCROLL_THRESHOLD && !this.state.dragging) {
      this.setState({ scrolling: true, dragging: false })
    } else if (this._dragX > DRAG_THRESHOLD && this._dragY < SCROLL_THRESHOLD) {
      this.setState({ scrolling: false, dragging: true })
    }
  }

  handleMouseLeave(p, e) {
    this.setState({ scrolling: true, dragging: false })
    this._dragY = 0
    this._dragX = 0
  }

  handleDrag(e, ui) {
    this._dragY += Math.abs(ui.y)
    this._dragX += Math.abs(ui.deltaX)

    if (this.state.scrolling && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.scrollBy(0, ui.y * -1)
      return false
    }

    this.setState({
      swipingRight: ui.lastX > 0,
      highlightSwipe: Math.abs(ui.lastX) > DISTANCE_TRESHOLD,
    })
  }

  handleStop(e, ui) {
    console.log(e, ui)
    const distance = Math.abs(ui.lastX)
    this.resetPosition(ui.node)
    if (distance < DISTANCE_TRESHOLD) return
    this.updateFavorites()
  }

  setEvaluationBoxVisibility(state) {
    this.setState({ showEvaluation: state })
  }

  updateFavorites() {
    const swipingRight = this.state.swipingRight

    if (swipingRight) {
      console.log('remove from favorites')
      this.removeUrlRoute()
    } else {
      console.log('add to favorites')
      this.addUrlRoute() 
    }
  }

  removeUrlRoute() {
    const route = this.props.stopTimes[0].shortName
    const { favorites, history } = this.props
    if (favorites.includes(route)) history.push(favorites.filter(e => e !== route).toString())
  }

  addUrlRoute() {
    const route = this.props.stopTimes[0].shortName
    const { favorites, history } = this.props
    if (!favorites.includes(route)) history.push((favorites.length !== 0 ? `${favorites},` : '')+route)
  }

  resetPosition(node) {
    this.setState({
      resetPosition: {x: 0, y: 0},
      highlightSwipe: false,
    })
  }

  render() {
    const { stopTimes, directions } = this.props
    const { swipingRight } = this.state

    let swipeContent
    let swipeClasses = ['StopTimes__swipe']

    if (swipingRight) {
      swipeContent = 'Remove'
      swipeClasses.push('StopTimes__swipe--remove')
    } else {
      swipeContent =  'Add'
      swipeClasses.push('StopTimes__swipe--add')
    }

    return(
      <div
        className={classnames('StopTimes', { 'StopTimes--highlightSwipe': this.state.highlightSwipe })}
        ref={ dom => this._dom = dom }
        onMouseMove={ this.handleMouseMove }
        onTouchMove={ this.handleMouseMove }
        onMouseLeave={ this.handleMouseLeave }
        onTouchEnd={ this.handleMouseLeave }
      >
        <div className={swipeClasses.join(' ')}>
          { swipeContent }
        </div>
        <Draggable 
          axis="x"
          onDrag={ this.handleDrag }
          onStop={ this.handleStop }
          position={ this.state.resetPosition }
          bounds={{top: 0, left: -120, right: 120, bottom: 0}}
          value={ stopTimes[0].shortName }
        >
          <div className="StopTimes__box" value={ stopTimes[0].shortName }>
            <div className="StopTimes__box__left">
              <Vehicle mode={ stopTimes[0].mode }/>
              <div className="StopTimes__box__shortName">
                { stopTimes[0].shortName }
              </div>
              <div className="StopTimes__box__direction">
                { directions[stopTimes[0].shortName].headsign }
              </div>
            </div>
            <div className="StopTimes__box__right">
              <div className="StopTimes__box__time">
              { stopTimes
                .slice(0,2)
                .map(stopTime => 
                  <div key={ stopTime.id }> { stopTime.departureTime }</div>
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
  favorites: state.favorites.routes
})

export default connect(mapStateToProps)(withRouter(StopTimes))