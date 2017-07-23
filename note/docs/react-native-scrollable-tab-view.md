# [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)

> 可以滑动标签栏,且滑动之间保持了自己的滚动位置

npm install react-native-scrollable-tab-view --save

## ScrollableTabView props

- renderTabBar (Function:ReactComponent)

    增加了goToPage, tabs, activeTab 和 ref 四个属性在组件内

- onChangeTab (Function)

    选择 tab 项目的回调, 接受两个参数 index ref

- children (ReactComponents)

    每个子组件都需要一个 tabLabel 属性,用来桥接两个部分, 子组件对应 key

- prerenderingSiblingsNumber (Integer)

    提前加载兄弟节点

## 自定义 tab组件

// TODO

## bug

- ScrollableTabBar 中 初始化的时候没有 下划线

    https://github.com/skv-headless/react-native-scrollable-tab-view/issues/682
