export const GETAPPLIST = "getAppList";
export const GETRECOMMEND = "getRecommend";

export const GETRNETXAPPLIST = "getNextAppList";



export function getAppList(payload) {
    return { type: GETAPPLIST, payload }
}

export function getRecommend(payload) {
    return { type: GETRECOMMEND, payload }
}

export function getNextAppList(payload) {
    return { type: GETRNETXAPPLIST, payload }
}

