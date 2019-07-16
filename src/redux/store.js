import { createStore } from 'redux'
import appList from './reducer/appList'

let store = createStore(appList)

export default store