/* eslint react/display-name: 0 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { Table } from 'antd'

const User = (props) => {

  const user = props.users.find(user => user.id === props.id)

  if (user) {
    return (
      <div>
        <div>Name: {user.name}</div>
        <div>Username: {user.name}</div>
        <div>Adult: {user.adult ? 'Yes' : 'No'}</div>
        <div>Blogs:</div>
        {user.blogs.map(blog => {
          return (<div key={blog._id}>{blog.title}</div>)
        })}
      </div>
    )
  } else return null
}



User.propTypes = {
  users: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
