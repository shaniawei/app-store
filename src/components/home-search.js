import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
export default class HomeSearch extends PureComponent {

    render() {

        return (
            <div className='home_search_box'>
                <div className="home_search">
                    <Link to="/search">
                        <img className='icon' src='http://127.0.0.1:3010/images/search.svg'></img>
                        <div className='title'>搜索</div>
                    </Link>
                </div>
            </div>
        )
    }
}