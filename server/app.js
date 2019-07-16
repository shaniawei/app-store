const Koa = require('koa')
const Router = require('koa-router')

const copy = require('./modules/copy')
const { queryParse } = require('./modules/url')

const PORT = 3010

let app = new Koa()
let router = new Router()

let cachedAppList = require('./dataSouces/appListData.json')
let list = cachedAppList.feed.entry

delete cachedAppList.feed.entry

/**
 * [pageContext] cur=1&limit=10
 */
router.get('/appList', async ctx => {
    let { pageContext = '', limit = 10 } = ctx.query || {}
    let curr = 0
    console.log("$$$$$$$$$$$$$$", ctx.query)
    if (pageContext) {
        pageContext = decodeURIComponent(pageContext)
        let query = queryParse(pageContext)
        curr = +query.curr
        limit = +query.limit
    }
    let res = copy(cachedAppList)
    res.feed.entry = list.slice(curr, (curr + 1) * limit)
    res.pageContext = encodeURIComponent(`curr=${curr + 1}&limit=${limit}`)
    console.log("$$$$$$$$$$$$$$", ctx.query)
    ctx.body = JSON.stringify(res)
})

// router.get('/recommend')

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(PORT)
console.log(`server is running in ${PORT}`)