import React from 'react'
import ReactSVG from 'react-svg'
import warning from '../assets/warning.svg'
import './Warning.css'

const Warning = ({message, handleClick, showWarning}) =>
  <div className="Warning">
    { !showWarning && 
      <div onClick={handleClick}>
      <ReactSVG
        path={ warning }
        className="Warning__button__svg"
        wrapperClassName="Warning__button"
      />
    </div>
    }
    { showWarning && 
    <div className="Warning__box" onClick={handleClick}>
      <div className="Warning__box__content">
        <ReactSVG
          path={ warning }
          className="Warning__icon__svg"
          wrapperClassName="Warning__icon"
        />
      { message }
      </div>
    </div>
    }
  </div>

export default Warning