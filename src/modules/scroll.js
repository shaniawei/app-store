const TOP_HEIGHT = 284
const ITEM_HEIGHT = 67

let isFetching
let body = (document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
const clientHeight = body.clientHeight
export default function listenScroll(cb) {
    window.onscroll = () => {
        let scrollTop = body.scrollTop
        let offsetHeight = body.offsetHeight
        let distance = offsetHeight - (scrollTop + clientHeight)
        // 距离底部还有一屏的时候，预加载下屏
        console.log('3333', distance, ITEM_HEIGHT * 10)
        if (!isFetching && distance < ITEM_HEIGHT * 10) {
            cb && cb({
                success() {
                    isFetching = false
                }
            })
            isFetching = true
        }
    }
}