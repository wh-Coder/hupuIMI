import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollTabBar, SpinLoading} from '../components'
import config from '../commons/config'
import request from '../commons/request'
import GamesListView from './GamesListView'

class KanqiuListView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gamesData: [],
      type: '',
    }
  }

  componentDidMount() {
    this._getGamesData()

  }

  _getGamesData() {
    request.get(config.api.games + this.props.en + '/getGames')
      .then((res) => {
        console.log(res)
        this.setState({
          type: 'games',
          gamesData: res.result.games
        })
      })
  }

  _onTabChange(index) {
    this.currentCat = this.props.item.child_nav[index]
    this.setState({
      type: this.currentCat.type,
    })
  }

  render() {
    const cate = this.props.item.child_nav.map(item => item.name)
    return (
      <View style={styles.container}>
        <ScrollTabBar tabList={cate} onTabChange={(index) => this._onTabChange(index)}/>
        <View style={styles.container}>
          {
            this.state.type === 'games'
              ? <GamesListView en={this.props.en} gamesData={this.state.gamesData}/>
              : this.state.type === 'h5'
                ? <Text>HEllo</Text>
                : <SpinLoading/>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = KanqiuListView;