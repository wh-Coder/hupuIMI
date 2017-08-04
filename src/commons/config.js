'use strict';
const v = '1/7.1.0/'

export default {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  header2: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  },
  api: {
    salt: 'HUPU_SALT_AKJfoiwer394Jeiow4u309',
    games: 'https://games.mobileapi.hupu.com/' + v,
    bbs: 'https://bbs.mobileapi.hupu.com/' + v,
  },
  webview: {
    host: 'http://192.168.0.105:8080/'
    // host: 'http://192.168.1.7:8080'
  }
}