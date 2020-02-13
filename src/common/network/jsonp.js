 import orignJSONP from 'jsonp'

 export default function(url, data, options) {
   //拼接完整的url
  url += (url.includes('?') ? '&' : '?') + param(data)
  return new Promise((resolve, reject) => {
    orignJSONP(url, options, (err, data)=> { 
      if(!err) {
        resolve(data)
      }else {
        reject(err)
      }
    })
  })
 }

 //拼接query参数
 function param(data) {
  let url = ''
  for(let i in data) {
   let value = data[i] !== 'undefined' ? data[i] : '' 
   /* encodeURIComponent()是对统一资源标识符（URI）的组成部分进行编码的方法。它使用一到四个转义序列来表示字符串中的每个字符的UTF-8编码（只有由两个Unicode代理区字符组成的字符才用四个转义字符编码） */
   url += `&${i}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
 }