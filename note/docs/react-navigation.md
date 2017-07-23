# [react navigation](https://github.com/react-community/react-navigation)

> 社区推荐导航器

npm install --save react-navigation

## [StackNavigator](https://reactnavigation.org/docs/navigators/stack)

```
// 引入
import {StackNavigator} from 'react-navigation';


// 生成一个导航组件, 直接放在根组件上
const ModalStack = StackNavigator(RouteConfigs, StackNavigatorConfig)

// 配置路由
const RouteConfigs = {

    // 配置路由的名字
    Profile: {

        // 配置显示的组件
        screen: ProfileScreen,

        // 重置导航的默认属性
        navigationOptions: ({navigation}) => ({

          // 更改标题
          title: `${navigation.state.params.name}'s Profile'`,

          // 直接把默认 header 删除了
          header: null
        }),
    }

    // 其他路由
    ...MyOtherRoutes,
}

// 配置所有路由
const StackNavigatorConfig = {
    //
    navigationOptions: {}

    ...
}
```

## [Screen Navigation Prop](https://reactnavigation.org/docs/navigators/navigation-prop)

在 StackNavigator 配置的路由都会在 props 上绑定 navigation 属性,

挂载在 navigation 上的有以下功能

- navigate - (helper) link to other screens

    navigate('Profile', {name: 'Brent'}) // 可以带参数

- state - screen's current state/routes

    - routeName: 'profile', // 路由名字

    - key: 'main0',

    - params: { hello: 'world' }  // 路由传来的参数

- setParams - (helper) make changes to route's params

- goBack - (helper) close active screen and move back

- dispatch - send an action to router

