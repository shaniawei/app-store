import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getAppList } from '../redux/action/appList'
import req from '../modules/fetching'

class Home extends PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getAppList({
            limit: 10
        })
    }
    render() {
        return (
            <div>
                this is home
                <Link to="/search">搜索页</Link>
                <div>
                    {this.props.count}
                </div>
                <button onClick={() => { this.props.getAppList() }}>点我</button>
            </div>
        )
    }
}

export default connect((state) => state, dispatch => ({
    async getAppList(param) {
        // let [err, data] = await req.appList(param)
        // let payload = err ? err : data
        req.appList(param).then((s) => {
            console.log("sssssssss", s)
        })
        // dispatch(getAppList({ payload }))
    }
}))(Home)