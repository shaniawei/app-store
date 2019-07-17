import React, { PureComponent } from 'react'
export default class TopRankList extends PureComponent {

    render() {
        console.log('this', this.props)
        let { appList } = this.props
        let entry = appList.feed.entry
        let getAppList = () => {
            return entry.map((r, index) => {
                return (
                    <div className={index ? 'item_box' : 'item_box first'} key={index}>
                        <div className='num'>{index + 1}</div>
                        <img className={index % 2 == 0 ? 'icon_radius icon' : 'icon_circle icon'}
                            src={r['im:image'][0].label}></img>
                        <div className='content'>
                            <div className='title ellipsis'>{r.title.label}</div>
                            <div className='category ellipsis'>{r.category.attributes.label}</div>
                            <div className='star ellipsis'>没有看到评分数据</div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className='rank_wrap'>
                <div className="rank_box">
                    {getAppList()}
                </div>
            </div>
        )
    }
}