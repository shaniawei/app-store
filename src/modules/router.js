import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from '../pages/index'
import Search from '../pages/search'

const getRouter = () => (
    <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/search" component={Search} />
    </Switch>
)

export default getRouter