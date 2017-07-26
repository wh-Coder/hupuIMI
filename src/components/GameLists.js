import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
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

  renderGameLists_1() {
    const data = this.props.gameLists[0]
    return (
      <View style={styles.cardBox_1}>
        <View style={styles.gameBox_1}>
          <Image style={styles.teamLogo_1} source={{uri: data.home_logo}}/>
          <Text style={styles.teamName_1}>{data.home_name}</Text>
        </View>
        <View style={styles.gameBox_1}>
          <Text style={styles.leagueName_1}>{data.league_name}</Text>
          <Text style={styles.dateTime_1}>{data.date_time}</Text>
        </View>
        <View style={styles.gameBox_1}>
          <Image style={styles.teamLogo_1} source={{uri: data.away_logo}}/>
          <Text style={styles.teamName_1}>{data.away_name}</Text>
        </View>
      </View>
    )
  }

  renderGameLists_2() {
    return (
      <View style={styles.cardContainer_2}>
        {
          this.props.gameLists.map((data) => {
            return (
              <View style={styles.cardBox_2}>
                <Text style={styles.leagueName_2}>{data.league_name}</Text>
                <View style={styles.gameBox_2}>
                  <Image style={styles.teamLogo_2} source={{uri: data.home_logo}}/>
                  <Text style={styles.teamName_2}>{data.home_name}</Text>
                </View>
                <View style={styles.gameBox_2}>
                  <Text style={styles.dateTime_2}>94 - 49</Text>
                </View>
                <View style={styles.gameBox_2}>
                  <Image style={styles.teamLogo_2} source={{uri: data.away_logo}}/>
                  <Text style={styles.teamName_2}>{data.away_name}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  render() {
    const gameLength = this.props.gameLists.length
    return (
      <View style={styles.container}>
        {
          gameLength === 1 ? this.renderGameLists_1()
            : gameLength === 2 ? this.renderGameLists_2()
              : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.bgColorPassive
  },
  cardBox_1: {
    height: dp(165),
    marginHorizontal: dp(20),
    marginVertical: dp(25),
    paddingVertical: dp(24),
    backgroundColor: theme.bgColorDefault,
    flexDirection: 'row'
  },
  gameBox_1: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo_1: {
    width: dp(84),
    height: dp(84),
    borderRadius: dp(42),
  },
  teamName_1: {
    fontSize: dp(24),
    paddingTop: dp(10)
  },
  leagueName_1: {
    color: theme.fontColorPassive
  },


  cardContainer_2: {
    marginHorizontal: dp(5),
    flexDirection: 'row',
  },
  cardBox_2: {
    flex: 1,
    height: dp(190),
    marginHorizontal: dp(10),
    marginVertical: dp(24),
    backgroundColor: theme.bgColorDefault,
    flexDirection: 'row',
    paddingTop: dp(20),
  },
  gameBox_2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogo_2: {
    width: dp(74),
    height: dp(74),
    borderRadius: dp(37),
  },
  teamName_2: {
    fontSize: dp(20),
    paddingTop: dp(6)
  },
  leagueName_2: {
    color: theme.fontColorPassive,
    fontSize: dp(22),
    position: 'absolute',
    top: dp(24),
    left: dp(24),
  },


});


export default GameLists;