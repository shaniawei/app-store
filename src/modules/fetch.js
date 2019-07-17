import { SelfError, OFFLINE_CODE } from './self-error'
import { queryJoin } from './url'

/**
 * [url]请求url
 * [data]后台需要的参数
 * [options]前端请求需要的额外参数
 * [config]一些特殊配置选项
 */
export default (url, data = {}, options = { method: 'get' }, config = {}) => {
    let payloads = {
        mode: 'cors'
    }
    if (options.method.toLowerCase() === 'get') {
        if (!config.banQuery) {
            url = queryJoin(url, data)
        }
    } else {
        payloads.body = JSON.stringify(data)
    }
    Object.assign(payloads, options)
    return new Promise((resolve, reject) => {
        let message = ''
        fetch(url, payloads).then(res => {
            console.log("reqParam", url, payloads)
            if (res.ok) {
                res.json().then(data => {
                    try {
                        resolve([null, data])
                    } catch (err) {
                        message = `${url} => parse response error: ` + data
                        resolve([new SelfError({ message, raw: err })])
                    }
                }).catch(err => {
                    message = `${url} => Invalid json response: `
                    resolve([new SelfError({ message, raw: err })])
                })
            } else {
                message = `${url} => Reqeust fail: ` + res.statusText
                resolve([new SelfError({ message })])
            }
        }).catch(err => {
            message = 'network error'
            resolve([new SelfError({ message, raw: err, code: OFFLINE_CODE })])
        })
    })
}
