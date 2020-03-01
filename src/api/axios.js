import orignAxios from 'axios'
import { BaseURL } from './config'

export default function(options) {
  return new Promise((resolve, reject) => {
    orignAxios({
      baseURL: BaseURL,
      method: options.method || 'get',
      url: options.url,
      params: options.params  || {},
      headers:{'Content-Type': 'application/json;charset=UTF-8'}
    }).then(data => resolve(data)).catch(err => reject(err))
  })
}