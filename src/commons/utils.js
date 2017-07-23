/*
 * @ param: obj,一个普通的数组
 * @ return: 按照字典排序的新数组
 */
exports.dictionarySort = (obj) => {
  let ret = {}
  let temp = Object.keys(obj).sort()

  for (let i in temp) {
    ret[temp[i]] = obj[temp[i]]
  }
  return ret
}

/*
 * @ param: obj,一个普通的数组
 * @ return: 连接请求成字符串
 */
exports.queryString = (params) => {
  let str = ''
  for (let key in params) {
    str += ((str.indexOf("=") !== -1) ? "&" : "") + key + "=" + params[key]
  }
  return str
}

/*
 * @ url：一段地址字符串
 * @ return: https请求
 */
exports.http2https = (url) => {
  if (Object.prototype.toString.call(url) === '[object String]') {
    if (url.search('https') === -1) {
      return url.replace('http', 'https')
    }
  }
  return url
}

/*
 * @ fns：一组异步请求数据的函数名
 * @ return: 返回多组数据集合
 */
exports.requestAll = (fns, callback) => {
  let cache = []
  let status = 0
  fns.map((fn, index) => {
    status++
    fn().then((res) => {
      status--
      cache[index] = res
      if (!status) {
        return callback(cache)
      }
    }).done()
  })
}

exports.wrapHTML = (html, params) => {

  let customStyle = `
     <style>
      * {padding: 0;margin: 0} 
      body {font-family: sans-serif;font-size: ${params.fontSize};
    </style>
  `
  let htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
      </head>
      <body>
        <div>
        ${html}
        </div>
      </body>
    </html>
  `

  return customStyle + htmlContent
}