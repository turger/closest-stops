import React from 'react'
import PropTypes from 'prop-types'
import ExTriangle from 'react-icons/lib/ti/warning-outline'
import './Warning.css'

const Warning = ({message}) => (
  <div className="Warning">
    <ExTriangle/>
    { message }
  </div>
)

Warning.propTypes = {
  message: PropTypes.string.isRequired
}

export default Warning
