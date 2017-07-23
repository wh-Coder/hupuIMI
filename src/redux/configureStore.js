/**
 * Created by busyrat on 2017/7/20.
 */
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from './reducer'
import {composeWithDevTools} from 'remote-redux-devtools';

const loggerMiddleware = createLogger()

export default configureStore = (initialState) => {
  return createStore(rootReducer, initialState,
    // composeWithDevTools(
    //   applyMiddleware(
    //     thunkMiddleware,
    //     loggerMiddleware
    //   )
    // )
  )
}
