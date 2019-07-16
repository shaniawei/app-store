
/**
 *  解析 query 字符串
 **/
function queryParse(search, spliter) {
    if (!search) return {};

    spliter = spliter || '&';

    let query = search.replace(/^\?/, ''),
        queries = {},
        splits = query ? query.split(spliter) : null;

    if (splits && splits.length > 0) {
        splits.forEach((item) => {
            item = item.split('=');
            let key = item.splice(0, 1),
                value = item.join('=');
            queries[key] = decodeURIComponent(value);
        });
    }
    return queries;
}
/**
 * URL添加query
 */
function queryJoin(api/*queries*/) {
    let args = [].slice.call(arguments)
    args[0] = {}
    let qs = queryStringify(Object.assign.apply(Object, args))
    if (!qs) return api

    let sep
    if (/[\?&]$/.test(api)) {
        sep = ''
    } else if (~api.indexOf('?')) {
        sep = '&'
    } else {
        sep = '?'
    }
    return api + sep + qs
}
/**
 * query 对象转换字符串
 */
function queryStringify(params, spliter) {
    if (!params) return ''
    return Object.keys(params).map((k) => {
        return k + '=' + encodeURIComponent(params[k])
    }).join(spliter || '&')
}


module.exports = {
    queryParse, queryJoin, queryStringify
}