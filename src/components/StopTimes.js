import React, { useState, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import Draggable from 'react-draggable'
import classnames from 'classnames'
import Vehicle from './Vehicle'
import heart from '../assets/heart2.svg'
import remove from '../assets/remove.svg'
import './StopTimes.css'
import { loadLocalStorage, saveLocalStorage } from '../store/localStorage'
import { useAppStore } from '../hooks/useAppStore'

const DISTANCE_TRESHOLD = 80
const DRAG_THRESHOLD = 10
const SCROLL_THRESHOLD = 15

const StopTimes = ({stopTimes, directions}) => {
  const favoriteRoutes = useAppStore(state => state.favoriteRoutes)
  const addFavoriteRoute = useAppStore(state => state.addFavoriteRoute)
  const removeFavoriteRoute = useAppStore(state => state.removeFavoriteRoute)
  const draggableRef = useRef(null)

  const [highlightSwipe, setHighlightSwipe] = useState()
  const [resetPosition, setResetPosition] = useState()
  const [dragging, setDragging] = useState()
  const [scrolling, setScrolling] = useState()

  
  let _dragY = 0
  let _dragX = 0

  const handleMouseMove = () => {
    if (_dragY > SCROLL_THRESHOLD && !dragging) {
      setScrolling(true)
      setDragging(false)
    } else if (_dragX > DRAG_THRESHOLD && _dragY < SCROLL_THRESHOLD) {
      setScrolling(false)
      setDragging(true)
    }
  }

  const handleMouseLeave = () => {
    setScrolling(true)
    setDragging(false)
    _dragY = 0
    _dragX = 0
  }

  const handleDrag = (e, ui) => {
    _dragY += ui.deltaY
    _dragX += Math.abs(ui.deltaX)

    if (scrolling && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.scrollBy(0, _dragY * -1)
    }

    setHighlightSwipe(Math.abs(ui.lastX) > DISTANCE_TRESHOLD)
  }

  const handleStop = (e, ui) => {
    const distance = Math.abs(ui.lastX)
    setResetPosition({ x: 0, y: 0 })
    setHighlightSwipe(false)
    if (distance < DISTANCE_TRESHOLD) return
    updateFavorites()
  }

  const updateFavorites = () => {
    const route = stopTimes[0].shortName
    if (favoriteRoutes.includes(route)) {
      removeFavoriteRoute(route)
    } else {
      addFavoriteRoute(route)
    }
  }

  let swipeContent
  let swipeClasses = ['StopTimes__swipe']
  const route = stopTimes[0].shortName

  if (favoriteRoutes.includes(route)) {
    swipeContent = remove
    swipeClasses.push('StopTimes__swipe--remove')
  } else {
    swipeContent = heart
    swipeClasses.push('StopTimes__swipe--add')
  }

  return (
    <div
      className={classnames('StopTimes', { 'StopTimes--highlightSwipe': highlightSwipe })}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
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
        onDrag={handleDrag}
        onStop={handleStop}
        position={resetPosition}
        bounds={{ top: -50, left: 0, right: 120, bottom: 50 }}
        value={route}
        nodeRef={draggableRef}
      >
        <div ref={draggableRef} className="StopTimes__box">
          <div className="StopTimes__box__left">
            <Vehicle mode={stopTimes[0].mode} love={favoriteRoutes.includes(route)} />
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

export default StopTimes