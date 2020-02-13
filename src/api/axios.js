import orignAxios from 'axios'
import { BaseURL } from './config'

export default function(options) {
  return new Promise((resolve, reject) => {
    orignAxios({
      baseURL: BaseURL,
      method: options.method,
      url: options.url,
      data: options.data  || {}
    }).then(data => resolve(data)).catch(err => reject(err))
  })
}