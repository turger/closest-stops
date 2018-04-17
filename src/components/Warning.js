import React from 'react'
import ExTriangle from 'react-icons/lib/ti/warning-outline'
import './Warning.css'

const Warning = ({message, handleClick, showWarning}) =>
  <div className="Warning">
    <ExTriangle onClick={handleClick}/>
    { showWarning && 
    <div className="Warning__box" onClick={handleClick}>
      <ExTriangle/>
      { message }
    </div>
    }
  </div>

export default Warning