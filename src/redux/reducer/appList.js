import { GETAPPLIST } from '../action/appList';

/*
* 初始化state
 */

const initState = {
    appList: {}
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case GETAPPLIST:
            return {
                appList: action.payload
            }
        default:
            return state
    }
}
