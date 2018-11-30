import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      successMessage: null,
      failureMessage: null
    }
  }

  async componentDidMount() {

    let blogs = await blogService.getAll()

    this.setState({ blogs })
    this.sortBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)

    }
  }

  sortBlogs = () => {
    let blogs = this.state.blogs
    blogs.sort((a, b) =>{
      if (a.likes < b.likes) return 1
      else if (a.likes > b.likes) return -1
      else return 0
    })
    this.setState({ blogs })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user})
      blogService.setToken(user.token)

    } catch(exception){
      this.setFailureMessage('Incorrect username or password')
    }
  }

  setSuccessMessage = (message) => {
    this.setState({successMessage: message})

    setTimeout(() => {
      this.setState({successMessage: null})
    }, 5000)
  }

  setFailureMessage = (message) => {
    this.setState({failureMessage: message})
    setTimeout(() => {
      this.setState({failureMessage: null})
    }, 5000)
  }

  handleLogout = () => {
    return () => {
      window.localStorage.removeItem('loggedBlogAppUser')
      this.setState({ user: null })
    }
  }

  handleBlogLike = async (blog) => {
    try{
      let blogs = this.state.blogs
      const updatedBlogIndex = blogs.indexOf(blog)
      blog.likes += 1

      const id = blog.id
      delete blog.id
      blog.user = blog.user ? blog.user._id : null

      const updatedBlog = await blogService.update(id, blog)
      blogs[updatedBlogIndex] = updatedBlog
      this.setState({ blogs })
      this.sortBlogs()

    } catch(exception){
      this.setFailureMessage('Liking the blog ran into an error.')
    }
  }

  handleBlogDelete = async (blog) => {
    try{
      let blogs = this.state.blogs
      const deletedBlogIndex = blogs.indexOf(blog)
      blogs.splice(deletedBlogIndex, 1)

      const id = blog.id

      const deleteSuccesful = await blogService.remove(id)

      if (deleteSuccesful) {
        this.setState({ blogs })
        this.sortBlogs()
        this.setSuccessMessage(`Successfully deleted "${blog.title}" by "${blog.author}"!`)
      }

    } catch(exception){
      this.setFailureMessage('Deleting the blog ran into an error.')
    }
  }

  addBlog = async (title, author, url) => {

    try{
      if(title.length===0||author.length===0||url.length===0){
        this.setFailureMessage('Title, author & url needed!')
        return
      }

      const addedBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      })

      this.setState({blogs: this.state.blogs.concat(addedBlog)})
      this.newBlogForm.toggleVisibility()
      this.sortBlogs()
      this.setSuccessMessage('Blog successfully created!')
    } catch(exception){
      this.setFailureMessage('Empty blog content')
    }
  }

  render() {
    if (this.state.user === null){
      return (
        <div>
          <h2>Log in</h2>
          <Login
            username={this.state.username}
            password={this.state.password}
            onChange={this.handleLoginFieldChange}
            login={this.handleLogin}
            failureMessageState = {this.state.failureMessage}
          />
        </div>
      )
    }
    return (
      <div>
        <h2>Blog App</h2>
        <p><span>{this.state.user.name} logged in</span><button onClick={this.handleLogout()}>Logout</button></p>
        <Togglable
          showButtonLabel = "Show new blog form"
          hideButtonLabel = "Hide new blog form"
          ref = {component => this.newBlogForm = component}
        >
          <AddBlogForm onSubmit={this.addBlog}/>
        </Togglable>
        <Notification message={this.state.failureMessage} notifType="failure"/>
        <Notification message={this.state.successMessage} notifType="success"/>
        <h2>List of blogs</h2>
        {this.state.blogs.map((blog) => {
          let showDeleteButton = false
          if (blog.user === null){
            showDeleteButton = true
          }
          else {
            showDeleteButton = this.state.user.username === blog.user.username
          }

          return(
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={this.handleBlogLike}
              handleDelete={this.handleBlogDelete}
              showDeleteButton={showDeleteButton}
            />)
        }
        )}
      </div>
    )
  }
}

export default App
