import { GETAPPLIST, GETRECOMMEND, GETRNETXAPPLIST } from '../action/index';

/*
* 初始化state
 */

const initState = {
    appList: '',
    recommend: ''
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    console.log("reducer", action, state)
    switch (action.type) {
        case GETAPPLIST:
            return Object.assign({}, state, {
                appList: action.payload
            })
        case GETRECOMMEND:
            return Object.assign({}, state, {
                recommend: action.payload
            })
        case GETRNETXAPPLIST:
            console.log("4444", state.appList.feed.entry, action.payload.feed.entry)
            action.payload.feed.entry = state.appList.feed.entry.concat(action.payload.feed.entry)
            console.log("4343434343434343434343", action.payload.feed.entry)
            return Object.assign({}, state, { appList: action.payload })
        default:
            return state
    }
}
