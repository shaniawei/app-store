import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Loading from '../components/loading'
import SearchInput from '../components/search-input'

import { getAppList, getRecommend, } from '../redux/action/index'
import req from '../modules/fetching'

class Search extends PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getAppList({
            limit: 100
        })
        this.props.getRecommend()
    }
    render() {
        let { appList, recommend } = this.props
        if (!appList && !recommend) return (<Loading></Loading>)

        return (
            <div className='search_box'>
                {appList || recommend ? (<SearchInput appList={appList} recommend={recommend}></SearchInput>) : null}
            </div>
        )
    }
}

export default connect((state) => state, dispatch => ({
    async getAppList(param) {
        let [err, data] = await req.appList(param)
        let payload = err ? err : data
        // req.appList(param).then((s) => {
        //     console.log("sssssssss", s)
        // })
        console.log("appList", data)
        dispatch(getAppList(payload))
    },
    async getRecommend(param) {
        let [err, data] = await req.recommend(param)
        let payload = err ? err : data
        // req.appList(param).then((s) => {
        //     console.log("sssssssss", s)
        // })
        console.log("recommend", data)
        dispatch(getRecommend(payload))
    }
}))(Search)