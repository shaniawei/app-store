import dataFetch from './fetch'


export default (apiMap) => {
    let map = {}
    Object.keys(apiMap).forEach(key => {
        map[key] = (query, options, config) => {
            let payload = Object.assign({}, apiMap[key].data || {}, query)
            let url = apiMap[key].url
            url = url.replace(/\{{2}([^}]+?)\}{2}/, (all, key) => {
                return payload[key]
            })
            delete apiMap[key].url
            let reqOptions = Object.assign({ method: apiMap[key].method }, apiMap[key].options, options)
            let reqConfig = Object.assign({}, apiMap[key].config, config)
            console.log(apiMap[key])
            return dataFetch(url, payload, reqOptions, reqConfig)
        }
    })
    return map
}