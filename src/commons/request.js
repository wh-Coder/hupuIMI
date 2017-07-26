import _ from 'lodash';
import queryString from 'query-string';
import md5 from 'blueimp-md5';
import config from './config';
import {dictionarySort} from './utils';
// import Mock from 'mockjs';

import Toast from 'react-native-simple-toast';

const userInfo = {
  client: 512442764036786,
  night: 0
}

let request = {
  get(url, params = {}) {
    params = {...params, ...userInfo}
    params = dictionarySort(params)
    params.sign = md5(queryString.stringify(params) + config.api.salt)
    url += '?' + queryString.stringify(params);

    return fetch(url)
      .then((response) => response.json())
      // .then((responseJson) => Mock.mock(responseJson))
      .catch((error) => {
        Toast.show('网络未连接');
      })
  },
  post(url, body){
    let options = _.extend(config.header, {
      body: JSON.stringify(body)
    });
    return fetch(url, options)
      .then((response) => response.json())
    // .then((responseJson)=>Mock.mock(responseJson))
  }
};

export default request;