const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const static = require('koa-static')

const path = require('path')

const copy = require('./modules/copy')
const { queryParse } = require('./modules/url')

const PORT = 3010

let app = new Koa()
let router = new Router()

let cachedAppList = require('./dataSouces/appListData.json')
let cachedRecommend = require('./dataSouces/recomendData.json')

let list = cachedAppList.feed.entry

delete cachedAppList.feed.entry

/**
 * [pageContext] cur=1&limit=10
 */
router.get('/appList', async ctx => {
    let { pageContext = '', limit = 10 } = ctx.query || {}
    let curr = 0
    if (pageContext) {
        pageContext = decodeURIComponent(pageContext)
        let query = queryParse(pageContext)
        curr = +query.curr
        limit = +query.limit
    }
    let res = copy(cachedAppList)
    res.feed.entry = list.slice(curr * limit, (curr + 1) * limit)
    let nextCurr = curr + 1
    let hasNextPage = true
    if (nextCurr * 10 >= list.length) {
        hasNextPage = false
    }
    res.pageContext = encodeURIComponent(`curr=${nextCurr}&limit=${limit}`)
    res.hasNextPage = hasNextPage
    console.log("$$$$$$$$$$$$$$", ctx.query)
    ctx.body = JSON.stringify(res)
})

router.get('/recommend', async ctx => {
    ctx.body = JSON.stringify(cachedRecommend)
})

const staticPath = './public'
app.use(static(
    path.join(__dirname, staticPath)
))

app.use(cors())

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(PORT)
console.log(`server is running in ${PORT}`)