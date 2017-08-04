import _ from 'lodash';
import queryString from 'query-string';
import md5 from 'blueimp-md5';
import config from './config';
import {dictionarySort} from './utils';
// import Mock from 'mockjs';

import Toast from 'react-native-simple-toast';

const userInfo = {
  client: 517666297116686,
  night: 0,
}

let request = {
  get(url, params = {}) {
    params = {...params, ...userInfo}
    params = dictionarySort(params)
    params.sign = md5(queryString.stringify(params,{encode: false}) + config.api.salt)
    url += '?' + queryString.stringify(params);

    return fetch(url)
      .then((response) => response.json())
      // .then((responseJson) => Mock.mock(responseJson))
      .catch((error) => {
        Toast.show('网络未连接');
      })
  },
  post(url, body, isOld){
    if(body.password){
      body.password = md5(body.password)
    }
    body = {...body, ...userInfo}
    body = dictionarySort(body)
    body.sign = md5(queryString.stringify(body,{encode: false}) + config.api.salt)
    console.log(url)
    console.log(body)
    let options = {}
    let header = []

    // 有两种 POST 方式
    if(isOld){
      header = config.header2
      options = _.extend(config.header2, {
        body: queryString.stringify(body,{encode: false})
      });
    }else{
      header = config.header
      options = _.extend(config.header2, {
        body: JSON.stringify(body)
      });
    }
    return fetch(url, options)
      .then((response) => response.json())
    // .then((responseJson)=>Mock.mock(responseJson))
  }
};

export default request;