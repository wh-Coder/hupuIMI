/**
 * refreshing / onRefresh / moreLoading
 */

import React, {Component} from 'react';
import {
  RefreshControl,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import {SpinLoading} from '../components'
import {dp, theme, commonStyle} from '../commons/style'

class List extends Component {

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.data.length === 0
            ? <SpinLoading/>
            : <FlatList
              {...this.props}
              extraData={this.props.data}
              onEndReachedThreshold={0.3}
              refreshControl={<RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.props.onRefresh}
                tintColor="#ff0000"
                title="正在加载"
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />}
            />
        }
        {this.props.data.length !== 0 && this.props.moreLoading
          ? <SpinLoading size={dp(40)} fullScreen={false}/> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = List;