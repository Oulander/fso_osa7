import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const Login = ({ login, username, password, onChange, failureMessageState }) => (
  <form onSubmit={login}>
    <div>
      Username
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
    </div>
    <button type="submit">Log in</button>
    <Notification message={failureMessageState} notifType="failure"/>
  </form>
)

Login.propTypes = {
  login: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  failureMessageState: PropTypes.string
}

export default Login
