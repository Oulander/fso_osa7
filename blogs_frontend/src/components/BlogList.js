import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { castLike, deleteBlog } from '../reducers/blogReducer'
import { setAlert } from '../reducers/alertReducer'
import { Collapse, Button, Row, Col } from 'antd'

const BlogList = (props) => {
  const sortedBlogs = sortBlogs(props.blogs)

  const handleBlogLike = (blog) => (event) => {
    event.stopPropagation()
    try{
      props.castLike(blog)

    } catch(exception){
      props.setAlert('Liking the blog ran into an error.', 'failure')
    }
  }

  const handleBlogDelete = (blog) => async (event) => {
    event.stopPropagation()
    if (window.confirm(`Do you really want to delete the blog "${blog.title}" by "${blog.author}"?`)){
      try{
        await props.deleteBlog(blog)
        props.setAlert(`Successfully deleted "${blog.title}" by "${blog.author}"!`, 'success')

      } catch(exception){
        props.setAlert('Deleting the blog ran into an error.', 'failure')
      }
    }
  }


  const mapBlogToPanel = (blog) => {
    let userName = 'unknown user'
    let showDeleteButton = false
    let displayedName = userName

    if (blog.user === null){
      showDeleteButton = true
    }
    else {
      userName = blog.user.name
      showDeleteButton = props.loggedUser.username === blog.user.username
      displayedName = props.loggedUser.username === blog.user.username ? 'you' : userName
    }


    const panelHeader =
    <Row type='flex' align='middle'>
      <Col xs={12} sm={14} md={16} lg={16} xl={18}>
        <span style = {{marginRight: 5}}><strong>{blog.title}</strong></span>
        <span style = {{display: 'inline-block', marginRight: 10}}>{` by ${blog.author}`}</span>

        <Button
          onClick={handleBlogDelete(blog)}
          style={{display: showDeleteButton ? '' : 'none'}}
          shape='circle'
          icon='delete'
        />
      </Col>
      <Col style = {{float: 'right', paddingRight: 10, margin: 0}}
        xs={12} sm={10} md={8} lg={8} xl={6}>
        <span style = {{float: 'right'}}>
          <span style = {{marginRight: 10}}>
            <strong>{blog.likes}</strong> likes
          </span>
          <Button
            onClick={handleBlogLike(blog)}
            disabled = {blog.liked ? true : false}
            icon="like">
          </Button>
        </span>
      </Col>
    </Row>

    return(
      <Collapse.Panel key = {blog.id} header = {panelHeader}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{`Added by ${displayedName}`}</div>
      </Collapse.Panel>
    )
  }

  return (
    <div>
      <Collapse>
        {sortedBlogs.map(mapBlogToPanel)}
      </Collapse>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  castLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

const sortBlogs = (blogs) => {
  blogs.sort((a, b) =>{
    if (a.likes < b.likes) return 1
    else if (a.likes > b.likes) return -1
    else return 0
  })
  return blogs
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  setAlert: setAlert,
  castLike: castLike,
  deleteBlog: deleteBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
