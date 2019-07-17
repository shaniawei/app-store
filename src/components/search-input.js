import React, { PureComponent } from 'react'

import SearchList from './search-list'

export default class SearchInput extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            resList: '',
            keywords: ''
        }
        this.onChange = this.onChange.bind(this)
        this.getSmartList = this.getSmartList.bind(this)
        this.goSearch = this.goSearch.bind(this)
    }
    onChange(e) {
        let a = e.persist()
        let keywords = e.target.value
        this.setState({
            keywords
        })
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            if (!keywords) return
            this.getSmartList(keywords)
        }, 300)
    }
    getSmartList(keywords) {
        console.log("keywords", keywords)
        let { appList, recommend } = this.props
        // 这里就不做分词了哈，也不做匹配的相似度排序了
        let reg = new RegExp(keywords, 'im')
        let list = [...appList.feed.entry, ...recommend.feed.entry]
        let resList = list.filter(l => {
            let attributes = l.category.attributes
            if (reg.test(attributes.label) ||
                reg.test(attributes.term) ||
                reg.test(l['im:artist'].label) ||
                reg.test(l['im:contentType'].attributes.label) ||
                reg.test(l['im:name'].label) ||
                reg.test(l['summary'].label) ||
                reg.test(l['title'].label)
            ) {
                return true
            }
            return false
        })
        this.setState({
            resList
        })
        return resList
    }
    goSearch() {
        let resList = this.getSmartList(this.state.keywords)
        this.setState({
            resList
        })
    }
    render() {
        let { appList, recommend } = this.props
        let { resList, keywords } = this.state
        return (
            <div className='input_box'>
                <div className='input_contaner'>
                    <input type='text'
                        value={keywords}
                        placeholder='搜索'
                        onChange={this.onChange}
                        id='search_input'></input>
                </div>
                {/* <div className='search_btn' onClick={this.goSearch}>搜索</div> */}
                {/* <SearchHistory></SearchHistory> */}
                {/* <SmartTips></SmartTips> */}
                {resList ? (<SearchList resList={resList}></SearchList>) : null}
            </div>
        )
    }
}