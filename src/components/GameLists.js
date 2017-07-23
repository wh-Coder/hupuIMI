import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {dp, theme, commonStyle} from '../commons/style'
import Avatar from '../components/basic/avatar'

class GameLists extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.gameLists.map((list, i) => {
            return (
              <View style={styles.gameList} key={i}>
                <Text style={styles.leagueName}>{list.league_name}</Text>
                <View style={styles.gameInfo}>
                  <View style={styles.gameBox}>
                    <Avatar size={38} source={{uri: list.home_logo}}/>
                    <Text style={styles.homeName}>{list.home_name}</Text>
                  </View>
                  <View style={styles.status}/>
                  <View style={styles.gameBox}>
                    <Avatar size={38} source={{uri: list.away_logo}}/>
                    <Text style={styles.awayName}>{list.away_name}</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: dp(24),
    paddingHorizontal: dp(6),
    backgroundColor: theme.hpBgGray,
    flexDirection: 'row'
  },
  gameList: {
    backgroundColor: '#fff',
    marginHorizontal: dp(10),
    padding: dp(24),
    flex: 1,
  },
  leagueName: {
    fontSize: dp(22),
    color: theme.hpGray,
    marginBottom: dp(20),
    // backgroundColor: 'blue',
  },
  gameInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    width: dp(60),
    height: dp(60),
    backgroundColor: 'red'
  },
  homeName: {
    marginTop: dp(10),
    fontSize: dp(20),
    textAlign: 'left'
  },
  awayName: {
    marginTop: dp(10),
    fontSize: dp(20),
    textAlign: 'right'
  }
});

export default GameLists;