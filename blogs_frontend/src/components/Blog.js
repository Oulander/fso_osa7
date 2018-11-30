import React from 'react'
import PropTypes from 'prop-types'

export default class Blog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false
    }
  }

  static propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  setVisible = () => {
    this.setState({ visible: true })
  }

  handleLikeClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.handleLike(this.props.blog)
  }

  handleDeleteClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (window.confirm(`Do you really want to delete the blog "${this.props.blog.title}" by "${this.props.blog.author}"?`)){
      this.props.handleDelete(this.props.blog)
    }
  }

  render() {
    const cssToShowExtraContent = { display: this.state.visible ? '' : 'none' }
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const cssToShowDeleteButton = { display: this.props.showDeleteButton ? '' : 'none' }

    const userName = this.props.blog.user ? this.props.blog.user.name : 'unknown user'

    return (
      <div className="blog" onClick={ this.toggleVisibility } style={blogStyle}>
        <div className="blogAlwaysShownContent">
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div className="blogToggledContent" style = {cssToShowExtraContent}>
          <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>
          <div>{`${this.props.blog.likes} likes`}<button onClick={this.handleLikeClick}>like</button></div>
          <div>{`Added by ${userName}`}</div>
          <div><button onClick={this.handleDeleteClick} style={cssToShowDeleteButton}>Delete blog</button></div>
        </div>
      </div>
    )}
}
