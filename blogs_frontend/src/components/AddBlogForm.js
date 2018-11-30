import React from 'react'
import PropTypes from 'prop-types'

class AddBlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handleClick = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.title, this.state.author, this.state.url)
  }

  listenTitle = (event) => {
    event.preventDefault()
    this.setState({title: event.target.value})
  }

  listenAuthor = (event) => {
    event.preventDefault()
    this.setState({author: event.target.value})
  }

  listenUrl = (event) => {
    event.preventDefault()
    this.setState({url: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Add new blog</h2>
        <form onSubmit={this.handleClick}>
          <table><tbody>
            <tr>
              <td>
                Title:
              </td>
              <td>
                <input
                  value={this.state.title}
                  onChange={this.listenTitle}
                />
              </td>
            </tr>
            <tr>
              <td>
                Author:
              </td>
              <td>
                <input
                  value={this.state.author}
                  onChange={this.listenAuthor}
                />
              </td>
            </tr>
            <tr>
              <td>
                URL:
              </td>
              <td>
                <input
                  value={this.state.url}
                  onChange={this.listenUrl}
                />
              </td>
            </tr>
          </tbody></table>
          <div>
            <button type="submit">Add blog</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddBlogForm
