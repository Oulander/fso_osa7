import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import alertReducer from './reducers/alertReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  loggedUser: loggedUserReducer,
  alert: alertReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
