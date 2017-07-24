
## INFO

### VirtualizedList 渲染的性能

> 官方给的提示:
VirtualizedList:You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc.

PureComponent是浅相等

相关 http://reactnative.cn/docs/0.44/flatlist.html

## IOS

### ":CFBundleIdentifier", Does Not Exist

运行 react-native run-ios 报的错误

https://github.com/facebook/react-native/issues/14423  @pampang

### Task orphaned for request <NSMutableURLRequest: 0x60000001bee0>

相关 https://stackoverflow.com/questions/39344846/task-orphaned-for-request-in-react-native-what-does-it-mean

没有解决