import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

const Notification = ({ message, notifType }) => {
  if (message === null || message.length === 0) {
    return null
  }
  return (
    <Alert message={message} type={notifType} style={{marginTop: 20, marginBottom: 20}}/>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  notifType: PropTypes.string
}

export default Notification
