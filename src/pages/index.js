import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Loading from '../components/loading'
import HomeSearch from '../components/home-search'
import RecommendList from '../components/recommend-list'
import TopRankList from '../components/top-rank-list'
import GlobalLine from '../components/line';

import { getAppList, getRecommend, getNextAppList } from '../redux/action/index'
import req from '../modules/fetching'
import listenScroll from '../modules/scroll'


class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.getNextPage = this.getNextPage.bind(this)
    }
    componentDidMount() {
        this.props.getAppList({
            limit: 10
        }, {
                success: () => {
                    // 预加载一屏数据
                    setTimeout(() => {
                        this.getNextPage()
                    })
                }
            })
        this.props.getRecommend()
        listenScroll(this.getNextPage)
    }
    getNextPage(opts) {
        let { appList } = this.props
        if (!appList.hasNextPage) return
        this.props.getNextAppList({
            pageContext: appList.pageContext
        }, opts)
    }
    render() {
        let { appList, recommend } = this.props
        if (!appList && !recommend) return (<Loading></Loading>)
        console.log("aaaaaaaaaa", appList, recommend)
        return (
            <div>
                <HomeSearch></HomeSearch>
                <GlobalLine></GlobalLine>
                {recommend ? (<RecommendList recommend={recommend}></RecommendList>) : null}
                <div className='line_box'>
                    <GlobalLine></GlobalLine>
                </div>
                {appList ? (<TopRankList appList={appList}></TopRankList>) : null}
            </div>
        )
    }
}

export default connect((state) => state, dispatch => ({
    async getAppList(param, opts = {}) {
        let [err, data] = await req.appList(param)
        let payload = err ? err : data
        // req.appList(param).then((s) => {
        //     console.log("sssssssss", s)
        // })
        console.log("appList", data)
        dispatch(getAppList(payload))
        opts.success && opts.success()
    },
    async getRecommend(param) {
        let [err, data] = await req.recommend(param)
        let payload = err ? err : data
        // req.appList(param).then((s) => {
        //     console.log("sssssssss", s)
        // })
        console.log("recommend", data)
        dispatch(getRecommend(payload))
    },
    async getNextAppList(param, opts = {}) {
        let [err, data] = await req.appList(param)
        let payload = err ? err : data
        // req.appList(param).then((s) => {
        //     console.log("sssssssss", s)
        // })
        console.log("getNextAppList", data)
        dispatch(getNextAppList(payload))
        opts.success && opts.success()
    }
}))(Home)