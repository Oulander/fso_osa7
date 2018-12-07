import loginService from '../services/login'
import blogService from '../services/blogs'


const loggedUserReducer = (store = null, action) => {
  switch(action.type){

  case 'LOGIN': {
    return action.user
  }

  case 'LOGOUT': {
    return null
  }

  default:
    return store
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try{
      const user = await loginService.login({
        username: username,
        password: password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        user: user
      })
    } catch(exception){
      //No need to do anything here, as a failed login is handled in the App
    }
  }
}

export const initializeUserFromLocalStorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user: user
      })
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken('')
    dispatch({
      type: 'LOGOUT'
    })
  }
}


export default loggedUserReducer
