import React, {PureComponent} from 'react';
import {
  SectionList,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import store from 'react-native-simple-store';

import {dp, theme, commonStyle} from '../commons/style'

class GamesListView extends PureComponent {

  leagues = []
  teams = []

  componentDidMount() {
    store.get('init').then((res) => {
      this.leagues = res.result.leagues
    })
  }

  renderItem = (info) => {
    let {item} = info

    // 接口没有提供球队的 LOGO
    if (!item.home_logo) {
      this.leagues.map((data) => {
        if (data.en === this.props.en) {
          this.teams = data.teams
        }
      })
      this.teams.map((data) => {
        if (data.tid === item.away_tid) {
          item.away_logo = data.logo
        }
        if (data.tid === item.home_tid) {
          item.home_logo = data.logo
        }
      })
    }
    return (
      <View style={[styles.itemBox,commonStyle.bottomLine]}>
        {item.stage ? <Text style={styles.stage}>{item.stage}</Text> : null}
        <View style={styles.infoBox}>
          <View style={styles.gameBox}>
            <View style={styles.gameItemBox}>
              <Image style={styles.gameImage} source={{uri: item.away_logo}}/>
              <Text style={styles.gameName}>{item.away_name}</Text>
              <Text style={styles.gameScore}>{item.away_score}</Text>
            </View>
            <View style={styles.gameItemBox}>
              <Image style={styles.gameImage} source={{uri: item.home_logo}}/>
              <Text style={styles.gameName}>{item.home_name}</Text>
              <Text style={styles.gameScore}>{item.home_score}</Text>
            </View>
          </View>
          <View style={styles.gameProcessBox}>
            <Text style={styles.gameProcess}>{item.process}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderSectionHeader = (info) => {
    return (
      <View style={styles.sectionHeaderBox}>
        <View style={styles.sectionSeparator}/>
        <View style={[styles.sectionHeader,commonStyle.bottomLine]}>
          <Text style={styles.sectionHeaderTitle}>{info.section.date_block}</Text>
        </View>
      </View>
    )
  }

  render() {
    console.log(this.props.gamesData)
    return (
      <View style={styles.container}>
        <SectionList
          keyExtractor={() => Math.random()}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          sections={this.props.gamesData}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColorPassive
  },
  sectionSeparator: {
    height: dp(12),
    backgroundColor: theme.bgColorPassive,
  },
  sectionHeader: {
    height: dp(70),
    backgroundColor: theme.bgColorDefault,
    paddingLeft: dp(20),
    justifyContent: 'center',
  },
  sectionHeaderTitle: {
    fontSize: dp(28),
  },
  itemBox: {
    backgroundColor: theme.bgColorDefault,

  },
  stage: {
    color: theme.fontColorPassive,
    fontSize: dp(24),
    paddingLeft: dp(20),
    paddingTop: dp(10),
  },

  infoBox: {
    height: dp(160),
    flexDirection: 'row'
  },
  gameBox: {
    flexDirection: 'column',
    width: dp(400),
    paddingLeft: dp(30),
    paddingVertical: dp(20),
    justifyContent: 'space-between'
  },
  gameItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameImage: {
    width: dp(50),
    height: dp(50),
  },
  gameName: {
    fontSize: dp(32),
    marginLeft: dp(20)
  },
  gameScore: {
    fontSize: dp(40),
    position: 'absolute',
    right: 0,
  },
  gameProcessBox: {
    width: dp(160),
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  gameProcess: {
    color: theme.fontColorPassive
  }

});

module.exports = GamesListView;