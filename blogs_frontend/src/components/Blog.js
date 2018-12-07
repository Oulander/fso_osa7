import React from 'react'
import PropTypes from 'prop-types'
import { Button, Collapse } from 'antd'

export default class Blog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false,
      likeDisabled: false
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
    this.setState({likeDisabled: true})
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
    const cssToShowDeleteButton = { display: this.props.showDeleteButton ? '' : 'none' }

    const userName = this.props.blog.user ? this.props.blog.user.name : 'unknown user'

    return (
      <div className="blog" onClick={ this.toggleVisibility }>
        <div className="blogAlwaysShownContent">
          <strong>{`"${this.props.blog.title}"`}</strong> {`by ${this.props.blog.author}`}
        </div>
        <div className="blogToggledContent" style = {cssToShowExtraContent}>

          <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>

          <div>{`Added by ${userName}`}</div>
          <Button onClick={this.handleDeleteClick} style={cssToShowDeleteButton}>Delete blog</Button>

          <div style = {{paddingTop: 10}}><Button onClick={this.handleLikeClick} disabled = {this.state.likeDisabled} icon="like">Like</Button><span style = {{marginLeft: 20}}><strong>{this.props.blog.likes}</strong> likes</span></div>

        </div>
      </div>
      // <Collapse bordered={false}>
      //   <Collapse.Panel header={`"${this.props.blog.title}" by ${this.props.blog.author}`}>
      //     <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>
      //
      //     <div>{`Added by ${userName}`}</div>
      //     <Button onClick={this.handleDeleteClick} style={cssToShowDeleteButton}>Delete blog</Button>
      //
      //     <div style = {{paddingTop: 10}}><Button onClick={this.handleLikeClick} disabled = {this.state.likeDisabled} icon="like">Like</Button><span style = {{marginLeft: 20}}><strong>{this.props.blog.likes}</strong> likes</span></div>
      //   </Collapse.Panel>
      // </Collapse>
    )}
}
