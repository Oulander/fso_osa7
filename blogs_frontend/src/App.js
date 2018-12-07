import React from 'react'
import PropTypes from 'prop-types'
import Login from './components/Login'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import Info from './components/Info'
import { connect } from 'react-redux'
import { setAlert } from './reducers/alertReducer'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { login, logout, initializeUserFromLocalStorage } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userReducer'
import { Button, Row, Col, Layout, Menu, Icon, Spin } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      blogsLoading: true,
      usersLoading: true
    }
  }

  async componentDidMount() {
    await this.props.initializeUserFromLocalStorage()
    await this.props.initializeBlogs()
    this.setState({blogsLoading: false})
    await this.props.initializeUsers()
    this.setState({usersLoading: false})
  }


  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (userName, password) => {
    //event.preventDefault()
    await this.props.login(userName, password)
    if(this.props.loggedUser === null) {
      this.props.setAlert('Incorrect username or password', 'failure')
    }
  }


  addBlog = async (title, author, url) => {
    try{
      if(title.length===0||author.length===0||url.length===0){
        this.props.setAlert('Title, author & url needed!', 'failure')
        return
      }

      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      this.props.addBlog(newBlog)

      this.newBlogForm.toggleVisibility()
      this.props.setAlert('Blog successfully created!', 'success')
    } catch(exception){
      this.props.setAlert('Blog creation failed', 'failure')
    }
  }

  renderBlogListPage = () => {
    return(
      <div>
        <Row style = {{marginBottom: marginBetweenMainComponents}}>
          <Col xs={24} sm={16} md={14} lg={12} xl={12}>
            <h2>List of blogs</h2>
            <Togglable
              showButtonLabel = "Add new blog"
              hideButtonLabel = "Hide form"
              ref = {component => this.newBlogForm = component}
            >
              <AddBlogForm
                onSubmit={this.addBlog}
              />
            </Togglable>
            <Notification message={this.props.alert.text} notifType={this.props.alert.alertType}/>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Spin tip='Loading blogs...' spinning={this.state.blogsLoading} size='large'>
              <div style={{minHeight: 200}}><BlogList/></div>
            </Spin>
          </Col>
        </Row>
      </div>
    )
  }

  renderUserListPage = () => {
    return(
      <Spin tip='Loading users...' spinning={this.state.usersLoading} size='large'>
        <div style={{minHeight: 200}}><UserList/></div>
      </Spin>
    )
  }

  renderUserPage = (match) => {
    return(
      <User id={match.params.id}/>
    )
  }

  renderInfoPage = () => {
    return(
      <Row>
        <Col xs={24} sm={24} md={20} lg={16} xl={12}>
          <Info />
        </Col>
      </Row>
    )
  }


  render() {
    const { Header, Content, Footer} = Layout

    if (this.props.loggedUser === null || this.props.loggedUser.length === 0){
      return (
        <div style = {{paddingTop: 100}}>
          <Layout style = {{maxWidth: 700, margin:'auto'}}>
            <Content style = {{padding: 100}}>
              <Row>
                <h2>Log in</h2>
              </Row>
              <Row>
                <Login
                  username={this.state.username}
                  password={this.state.password}
                  onChange={this.handleLoginFieldChange}
                  login={this.handleLogin}
                />
              </Row>
              <Row>
                <Notification message={this.props.alert.text} notifType={this.props.alert.alertType}/>
              </Row>
            </Content>
          </Layout>
        </div>
      )
    }
    return (
      <div>
        <Router>
          <Layout style = {layoutStyle}>
            <Header style = {headerStyle}>
              <Row gutter = {12}>
                <Col xs={7} sm={10} md={8} lg={7} xl={6} style = {{whiteSpace: 'nowrap'}}><h2>Blog App</h2></Col>
                <Col xs={0} sm={4} md={8} lg={10} xl={12} />
                <Col xs={17} sm={10} md={8} lg={7} xl={6}>
                  <div style = {{float: 'right', paddingRight: defaultPadding}}>
                    <span style = {{textAlign: 'right', whiteSpace: 'nowrap', paddingRight: 10}}>
                      {this.props.loggedUser.name} logged in
                    </span>
                    <Button type="primary" onClick={this.props.logout}>
                      Logout
                    </Button>
                  </div>
                </Col>
              </Row>
            </Header>
            <Content style = {contentStyle}>
              <Row style ={{marginBottom: marginBetweenMainComponents}}>
                {/* <Col xs={24} sm={10} md={8} lg={7} xl={6}> */}
                <Col>
                  <Menu mode='horizontal'>
                    <Menu.Item key='blogs'>
                      <Link to="/"><Icon type="file" />Blogs</Link>
                    </Menu.Item>
                    <Menu.Item key='users'>
                      <Link to="/users"><Icon type="user" />Users</Link>
                    </Menu.Item>
                    <Menu.Item key='info'>
                      <Link to="/info"><Icon type="info-circle" />Info</Link>
                    </Menu.Item>
                  </Menu>
                </Col>

              </Row>
              <Route exact path ='/' render = {this.renderBlogListPage}/>
              <Route exact path ='/users' render = {this.renderUserListPage}/>
              <Route exact path ="/users/:id" render={({match}) => this.renderUserPage(match)}/>
              <Route exact path ='/info' render = {this.renderInfoPage}/>
            </Content>
            <Footer style = {footerStyle}>
              <span>This is a footer yay</span>
            </Footer>
          </Layout>
        </Router>
      </div>
    )
  }
}

const marginBetweenMainComponents = 20
const defaultPadding = 20

const layoutStyle = {

}

const headerStyle = {
  marginBottom: marginBetweenMainComponents,
  paddingLeft: defaultPadding
}

const contentStyle = {
  marginBottom: marginBetweenMainComponents,
  paddingLeft: defaultPadding,
  paddingRight: defaultPadding
}

const footerStyle = {
  paddingLeft: defaultPadding,
  paddingTop: defaultPadding,
  height: 100,
  textAlign: 'center'
}

App.propTypes = {
  alert: PropTypes.object,
  blogs: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  initializeUserFromLocalStorage: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    blogs: state.blogs,
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  setAlert: setAlert,
  initializeBlogs: initializeBlogs,
  addBlog: addBlog,
  login: login,
  logout: logout,
  initializeUserFromLocalStorage: initializeUserFromLocalStorage,
  initializeUsers: initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
