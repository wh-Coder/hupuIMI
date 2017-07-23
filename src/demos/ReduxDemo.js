import React from 'react'
import {Text, View} from 'react-native'
import {HeaderBar} from '../components'

// 1 ----> action 一个普通的方法, 返回一个含有 type 的对象

const CHANGE = 'CHANGE'

function change() {
  return {
    type: CHANGE,
  }
}

// 2 ----> reducer , 一个普通的纯函数

function setTitleDemo(state = 'react', action) {
  switch (action.type) {
    case CHANGE:
      if (state === 'react') {
        return 'native'
      } else {
        return 'react'
      }
    default:
      return state
  }
}

// 后面的步骤抽离为公用了, 所以 3,4,5 步骤注释了, 导出一个 reducer

export {setTitleDemo}

// //<--
// // 3 ----> 把所有 reducer 合成一个, 准备送去生成 store
//
// import {combineReducers} from 'redux'
//
// const rootReducer = combineReducers({
//   setTitle
// })
//
//
// // 4 ----> 在生成 store 前可以增加一些中间件
//
// import {applyMiddleware} from 'redux'
// // 异步 action 的中间件
// import thunkMiddleware from 'redux-thunk'
// // 控制台调试的中间件
// import {createLogger} from 'redux-logger'
// const loggerMiddleware = createLogger()
// // chrome 插件
// import {composeWithDevTools} from 'remote-redux-devtools';
//
// const middleware = composeWithDevTools(
//   applyMiddleware(
//     thunkMiddleware,
//     loggerMiddleware
//   )
// )
//
// // 5 ----> 合成 store
//
// import {createStore} from 'redux'
//
// const Store = (initialState) => {
//   return createStore(rootReducer, initialState, middleware)
// }
// export {Store}
// // <--

// // 6 ----> 最外层容器装载
//
// import {Provider} from 'react-redux';
// <Provider store={Store()}>
//   <ReduxDemo />
// </Provider>

// 7 ----> container 接收数据流的容器, 通过 connect 连接
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

const ReduxDemo = ({title, change, navigation}) => (
  <View>
    <HeaderBar title='ReduxDemo' back={() => navigation.goBack()}/>
    <Text onPress={() => change()}> react to native </Text>
    <Text>{title}</Text>
  </View>
)

export default connect(state => ({
  title: state.setTitleDemo
}), dispatch => (
  bindActionCreators({change: change}, dispatch)
))(ReduxDemo);