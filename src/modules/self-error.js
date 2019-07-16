export const OFFLINE_CODE = -1

export class SelfError {
    code = 0;
    message = '';
    raw = '';
    constructor(props) {
        Object.assign(this, props)
    }
}