import React from 'react'
import PropTypes from 'prop-types'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="content">
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button className="button" onClick={onClick}>like</button>
    </div>
  </div>
)

SimpleBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SimpleBlog
