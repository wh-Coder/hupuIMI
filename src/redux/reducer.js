import {combineReducers} from 'redux'
import {setTitleDemo} from '../demos/ReduxDemo'
import store from 'react-native-simple-store';

import {LOGIN,LOGOUT} from './action'

function loginout(state = {isLogin: false}, action) {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      store.update('login', action)
      return {
        is_login: action.is_login,
        result: action.result
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  setTitleDemo,
  loginout,
})

export default rootReducer