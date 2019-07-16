import React, { PureComponent } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import getRouter from './modules/router'
import store from './redux/store'

import Index from './pages/index'

export default class App extends PureComponent {

  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            {getRouter()}
          </Router>
        </Provider>
      </div>
    )
  }
}
