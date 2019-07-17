import React, { PureComponent } from 'react'
export default class RecommendList extends PureComponent {

    render() {
        console.log('this', this.props)
        let { recommend } = this.props
        let entry = recommend.feed.entry
        let getRecommendList = () => {
            return entry.map((r, index) => {
                return (
                    <div className={index ? 'item_box' : 'item_box first'} key={r.id.attributes['im:id']}>
                        <img src={r['im:image'][0].label} className='logo'></img>
                        <div className='txt tow_row_ellipsis'>{r.title.label}</div>
                        <div className='category ellipsis'>{r.category.attributes.label}</div>
                    </div>
                )
            })
        }
        return (
            <div className='recommend_wrap'>
                <div className="recommend_box">
                    <div className='title'>推荐</div>
                    <div className='items'>
                        {getRecommendList()}
                    </div>
                </div>
            </div>
        )
    }
}