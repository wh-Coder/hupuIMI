# [Animated](http://reactnative.cn/docs/0.44/animated.html#content)

绑定一个简单动画的步骤:

1. 先定义一个动画对象值

```
    tabSelectPageAm = new Animated.Value(0);
```

2. 绑定相关的属性

```
    // render()
    <View> --> <Animated.View>

    // style
    {
      bottom: this.tabSelectPageAm.interpolate({
        inputRange: [0, 1],
        outputRange: [-theme.screenHeight, 0]
      }
    }
```

3. 开启动画:

```
    Animated.timing(
      this.tabSelectPageAm,
      {toValue: 1},
    ).start();
```



