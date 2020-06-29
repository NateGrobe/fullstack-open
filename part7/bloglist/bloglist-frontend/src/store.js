import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import blogFormReducer from './reducers/blogFormReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  login: loginReducer,
  notification: notificationReducer,
  blogForm: blogFormReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
