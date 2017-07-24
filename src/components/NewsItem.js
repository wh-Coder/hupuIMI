import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {dp, theme, commonStyle} from '../commons/style'
import {IconCount} from '../components'

class NewItem extends PureComponent {

  constructor(props) {
    super(props)
  }

  _splitImgSrc(item) {
    // https://i1.hoopchina.com.cn/blogfile/201707/23/BbsImg150078926332717_150x130.jpg?x-oss-process=image/resize,w_180/sharpen,100/format,webp
    if (item.img) {
      return item.img.split('?')[0]
    }
    if (item.cover) {
      return item.cover.split('?')[0]
    }
    if (item.thumbs) {
      return item.thumbs.map(img => img.split('?')[0])
    }
  }

  render() {
    let {title, type, playtime, viewnum, nid, lights, replies} = this.props.item
    let {onPress} = this.props
    let img = this._splitImgSrc(this.props.item)

    return (
      <TouchableHighlight
        style={[styles.container,commonStyle.bottomLine]}
        onPress={() => onPress()}
        underlayColor={theme.bgColorPassive}>
        {type === 3
          ? <View style={styles.itemBox}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.imgBox}>
              {img.map((item, index) => (
                <Image style={styles.img3} key={index} source={{uri: item}} />
              ))}
            </View>
            <View style={styles.relatedCount}>
              <IconCount type="lights" count={lights}/>
              <IconCount type="replies" count={replies}/>
            </View>
          </View>
          : <View style={[styles.itemBox,styles.row]}>
            <Image style={styles.img} source={{uri: img}} />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.relatedCount}>
              <IconCount type="lights" count={lights + ''}/>
              <IconCount type="replies" count={replies + ''}/>
              <IconCount type="playtime" count={playtime + ''}/>
              <IconCount type="viewnum" count={viewnum + ''}/>
            </View>
          </View>
        }
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  itemBox: {
    padding: dp(20),
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    width: dp(172),
    height: dp(130),
    backgroundColor: theme.bgColorPassive,
    marginRight: dp(20)
  },
  imgBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dp(40)
  },
  img3: {
    width: (theme.screenWidth - 30) / 3,
    height: (theme.screenWidth - 30) / 4,
  },
  title: {
    fontSize: dp(32),
    lineHeight: dp(44),
    flex: 1,
    paddingBottom: dp(20),
  },
  relatedCount: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: dp(5),
    right: dp(20),
  }
});

export default NewItem;