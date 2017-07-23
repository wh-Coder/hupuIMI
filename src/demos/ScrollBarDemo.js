import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {HeaderBar} from '../components'
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

const FacebookTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value,}) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return <View style={[styles.faceTabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.faceTab}>
          <Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
            ref={(icon) => { this.tabIcons[i] = icon; }}
          />
        </TouchableOpacity>;
      })}
    </View>;
  },
});


class ScrollBarDemo extends Component {

  render() {
    const {goBack} = this.props.navigation
    return (
      <View style={styles.container}>
        <HeaderBar title="ScrollBarDemo" back={() => goBack()}/>
        <View style={styles.box}>
          <ScrollableTabView>
            <View tabLabel="React"/>
            <View tabLabel="Flow"/>
            <View tabLabel="Jest"/>
          </ScrollableTabView>
        </View>

        <View style={styles.box}>
          <ScrollableTabView
            style={{marginTop: 20, }}
            renderTabBar={() => <ScrollableTabBar />}>
            <Text tabLabel='Tab #1'>My</Text>
            <Text tabLabel='Tab #1'>My</Text>
            <Text tabLabel='Tab #1'>My</Text>
            <Text tabLabel='Tab #1'>My</Text>
            <Text tabLabel='Tab #2 word word'>favorite</Text>
            <Text tabLabel='Tab #3 word word word'>project</Text>
            <Text tabLabel='Tab #4 word word word word'>favorite</Text>
            <Text tabLabel='Tab #5'>project</Text>
          </ScrollableTabView>
        </View>

        <View style={[styles.box,{height: 200}]}>
          <ScrollableTabView
            style={styles.container3}
            renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
            tabBarPosition='overlayTop'
          >
            <ScrollView tabLabel='iOS'>
              <Icon name='logo-apple' color='black' size={300} style={styles.icon3}/>
              <Icon name='ios-phone-portrait' color='black' size={300} style={styles.icon3}/>
              <Icon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon3}/>
              <Icon name='ios-phone-portrait' color='#DBDDDE' size={300} style={styles.icon3}/>
            </ScrollView>
            <ScrollView tabLabel='Android'>
              <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon3}/>
              <Icon name='logo-android' color='black' size={300} style={styles.icon3}/>
              <Icon name='logo-android' color='brown' size={300} style={styles.icon3}/>
            </ScrollView>
          </ScrollableTabView>
        </View>

        <View style={[styles.box,{height: 200}]}>
          <ScrollableTabView
            style={{marginTop: 20, }}
            initialPage={1}
            renderTabBar={() => <FacebookTabBar />}
          >
            <ScrollView tabLabel="ios-paper" style={styles.tabView4}>
              <View style={styles.card4}>
                <Text>News</Text>
              </View>
            </ScrollView>
            <ScrollView tabLabel="ios-people" style={styles.tabView4}>
              <View style={styles.card4}>
                <Text>Friends</Text>
              </View>
            </ScrollView>
            <ScrollView tabLabel="ios-chatboxes" style={styles.tabView4}>
              <View style={styles.card4}>
                <Text>Messenger</Text>
              </View>
            </ScrollView>
            <ScrollView tabLabel="ios-notifications" style={styles.tabView4}>
              <View style={styles.card4}>
                <Text>Notifications</Text>
              </View>
            </ScrollView>
            <ScrollView tabLabel="ios-list" style={styles.tabView4}>
              <View style={styles.card4}>
                <Text>Other nav</Text>
              </View>
            </ScrollView>
          </ScrollableTabView>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    height: 100,
    backgroundColor: '#eee',
    borderColor: '#000',
    borderWidth: 1,
  },
  container3: {
    marginTop: 30,
  },
  icon3: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  tabView4: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card4: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2,},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  faceTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  faceTabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

module.exports = ScrollBarDemo;