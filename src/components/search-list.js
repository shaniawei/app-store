import React, { PureComponent } from 'react'

export default class SearchList extends PureComponent {

    render() {
        let { resList } = this.props
        console.log('search_list', resList)
        // whose app name, category, author or summary contains the keyword;
        let renderSearchList = () => {
            return resList.map((l, index) => {
                return (
                    <div className='search_item' key={index}>
                        <div className='name ellipsis'>{l['im:name'].label}</div>
                        <div className='category ellipsis'>{l.category.attributes.label}</div>
                        <div className='author ellipsis'>{l['im:artist'].label}</div>
                        <div className='summary ellipsis'>{l['summary'].label}</div>
                    </div>
                )
            })
        }
        return (
            <div className='search_list'>
                {renderSearchList()}
            </div>
        )
    }
}