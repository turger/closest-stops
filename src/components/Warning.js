import React from 'react'
import ExTriangle from 'react-icons/lib/ti/warning-outline'
import './Warning.css'

const Warning = ({message}) => (
  <div className="Warning">
    <ExTriangle/>
    { message }
  </div>
)

export default Warning
